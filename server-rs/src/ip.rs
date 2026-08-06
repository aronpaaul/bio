use std::net::IpAddr;

use axum::http::HeaderMap;

pub fn realIp(trust: bool, peer: IpAddr, headers: &HeaderMap) -> String {
    if trust {
        if let Some(value) = headers.get("x-real-ip").and_then(|h| h.to_str().ok()) {
            let ip = value.trim();
            if !ip.is_empty() {
                return ip.to_string();
            }
        }
    }
    peer.to_string()
}
