use std::collections::HashMap;

use crate::config::CHALLENGE_TTL_MS;

pub struct ChallengeStore {
    items: HashMap<String, (Vec<u8>, u128)>,
}

impl ChallengeStore {
    pub fn new() -> Self {
        Self {
            items: HashMap::new(),
        }
    }

    pub fn create(&mut self, id: String, key: Vec<u8>, now: u128) {
        self.items
            .retain(|_, (_, createdAt)| now.saturating_sub(*createdAt) <= CHALLENGE_TTL_MS);
        self.items.insert(id, (key, now));
    }

    pub fn consume(&mut self, id: &str, now: u128) -> Option<Vec<u8>> {
        let (key, createdAt) = self.items.remove(id)?;
        if now.saturating_sub(createdAt) > CHALLENGE_TTL_MS {
            None
        } else {
            Some(key)
        }
    }
}
