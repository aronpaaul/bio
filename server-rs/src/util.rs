use std::time::{SystemTime, UNIX_EPOCH};

pub fn nowMs() -> u128 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_millis()
}

pub fn validHex(value: &str, min: usize, max: usize) -> bool {
    let len = value.len();
    len >= min && len <= max && len % 2 == 0 && value.bytes().all(|b| b.is_ascii_hexdigit())
}
