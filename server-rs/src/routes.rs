use std::net::SocketAddr;

use axum::extract::{ConnectInfo, State};
use axum::http::{HeaderMap, StatusCode};
use axum::response::{IntoResponse, Response};
use axum::Json;
use rand::RngCore;
use serde::Deserialize;
use serde_json::{json, Value};
use uuid::Uuid;

use crate::config::{secret, trustProxy};
use crate::crypto::{clientId, decryptPayload};
use crate::ip::realIp;
use crate::state::AppState;
use crate::util::{nowMs, validHex};

pub async fn getStats(State(st): State<AppState>) -> Response {
    Json(st.visits.lock().unwrap().stats()).into_response()
}

pub async fn getChallenge(State(st): State<AppState>) -> Response {
    let id = Uuid::new_v4().to_string();
    let mut key = vec![0u8; 32];
    rand::thread_rng().fill_bytes(&mut key);
    st.challenges
        .lock()
        .unwrap()
        .create(id.clone(), key.clone(), nowMs());
    Json(json!({ "challengeId": id, "key": hex::encode(key) })).into_response()
}

#[derive(Deserialize)]
#[serde(deny_unknown_fields)]
pub struct VisitBody {
    challengeId: String,
    iv: String,
    data: String,
}

fn fail(code: StatusCode, msg: &str) -> Response {
    (code, Json(json!({ "error": msg }))).into_response()
}

pub async fn postVisit(
    State(st): State<AppState>,
    ConnectInfo(addr): ConnectInfo<SocketAddr>,
    headers: HeaderMap,
    Json(body): Json<VisitBody>,
) -> Response {
    let now = nowMs();
    let ip = realIp(trustProxy(), addr.ip(), &headers);
    if Uuid::parse_str(&body.challengeId).is_err()
        || !validHex(&body.iv, 24, 24)
        || !validHex(&body.data, 32, 8192)
    {
        return fail(StatusCode::BAD_REQUEST, "Кривой запрос захода.");
    }
    if !st.limiter.lock().unwrap().allow(&ip, now) {
        return fail(StatusCode::TOO_MANY_REQUESTS, "Не части — дай серверу вздохнуть.");
    }
    let key = match st.challenges.lock().unwrap().consume(&body.challengeId, now) {
        Some(k) => k,
        None => return fail(StatusCode::FORBIDDEN, "Челлендж недействителен или просрочен."),
    };
    let plain = match decryptPayload(&key, &body.iv, &body.data) {
        Some(p) => p,
        None => return fail(StatusCode::BAD_REQUEST, "Расшифровка не удалась."),
    };
    let payload: Value = match serde_json::from_str(&plain) {
        Ok(v) => v,
        Err(_) => return fail(StatusCode::BAD_REQUEST, "Расшифровка не удалась."),
    };
    if payload.get("challengeId").and_then(|v| v.as_str()) != Some(body.challengeId.as_str()) {
        return fail(StatusCode::FORBIDDEN, "Подделка пресечена.");
    }
    let stats = st
        .visits
        .lock()
        .unwrap()
        .register(clientId(&secret(), &ip), now);
    Json(stats).into_response()
}
