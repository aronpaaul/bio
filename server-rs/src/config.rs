use std::path::PathBuf;

pub const CHALLENGE_TTL_MS: u128 = 30_000;
pub const VISIT_WINDOW_MS: u128 = 21_600_000;
pub const WRITE_LIMIT: usize = 30;
pub const RATE_WINDOW_MS: u128 = 60_000;

pub fn port() -> u16 {
    std::env::var("PORT")
        .ok()
        .and_then(|value| value.parse().ok())
        .unwrap_or(3001)
}

pub fn trustProxy() -> bool {
    std::env::var("TRUST_PROXY").map(|v| v == "1").unwrap_or(false)
}

pub fn secret() -> String {
    std::env::var("GUESTBOOK_SECRET").unwrap_or_else(|_| "dev-secret-paul-1999".into())
}

pub fn distDir() -> PathBuf {
    PathBuf::from(std::env::var("DIST_DIR").unwrap_or_else(|_| "dist".into()))
}

pub fn visitsFile() -> PathBuf {
    if let Ok(path) = std::env::var("VISITS_FILE") {
        return PathBuf::from(path);
    }
    let dir = PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("data");
    let _ = std::fs::create_dir_all(&dir);
    dir.join("visits.json")
}
