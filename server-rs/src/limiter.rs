use std::collections::HashMap;

use crate::config::{RATE_WINDOW_MS, WRITE_LIMIT};

pub struct Limiter {
    hits: HashMap<String, Vec<u128>>,
}

impl Limiter {
    pub fn new() -> Self {
        Self {
            hits: HashMap::new(),
        }
    }

    pub fn allow(&mut self, ip: &str, now: u128) -> bool {
        let stamps = self.hits.entry(ip.to_string()).or_default();
        stamps.retain(|t| now.saturating_sub(*t) < RATE_WINDOW_MS);
        if stamps.len() >= WRITE_LIMIT {
            return false;
        }
        stamps.push(now);
        true
    }
}
