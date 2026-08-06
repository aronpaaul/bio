#![allow(non_snake_case)]

mod challenge;
mod config;
mod crypto;
mod ip;
mod limiter;
mod routes;
mod state;
mod store;
mod util;

use std::net::SocketAddr;

use axum::http::{header, HeaderValue};
use axum::routing::get;
use axum::Router;
use tower_http::cors::CorsLayer;
use tower_http::services::{ServeDir, ServeFile};
use tower_http::set_header::SetResponseHeaderLayer;

use state::AppState;

const CSP: &str = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self'; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'self'";

#[tokio::main]
async fn main() {
    let dist = config::distDir();
    let staticFiles = ServeDir::new(&dist).fallback(ServeFile::new(dist.join("index.html")));

    let app = Router::new()
        .route("/api/visit", get(routes::getStats).post(routes::postVisit))
        .route("/api/visit/challenge", get(routes::getChallenge))
        .with_state(AppState::new())
        .fallback_service(staticFiles)
        .layer(SetResponseHeaderLayer::overriding(
            header::CONTENT_SECURITY_POLICY,
            HeaderValue::from_static(CSP),
        ))
        .layer(CorsLayer::very_permissive());

    let addr = SocketAddr::from(([127, 0, 0, 1], config::port()));
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    println!("visits (rust) on http://{}", addr);
    axum::serve(
        listener,
        app.into_make_service_with_connect_info::<SocketAddr>(),
    )
    .await
    .unwrap();
}
