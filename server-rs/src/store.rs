use std::collections::HashMap;
use std::fs;
use std::path::PathBuf;

use serde::{Deserialize, Serialize};

use crate::config::{visitsFile, VISIT_WINDOW_MS};

#[derive(Serialize, Deserialize, Default)]
pub struct VisitDb {
    pub total: u64,
    pub lastVisit: Option<u128>,
    pub seen: HashMap<String, u128>,
}

#[derive(Serialize)]
pub struct Stats {
    pub visitors: u64,
    pub lastVisit: Option<u128>,
}

pub struct VisitStore {
    db: VisitDb,
    path: PathBuf,
}

impl VisitStore {
    pub fn load() -> Self {
        let path = visitsFile();
        let db = fs::read_to_string(&path)
            .ok()
            .and_then(|raw| serde_json::from_str(&raw).ok())
            .unwrap_or_default();
        Self { db, path }
    }

    pub fn register(&mut self, clientId: String, now: u128) -> Stats {
        let previous = self.db.lastVisit;
        let fresh = self
            .db
            .seen
            .get(&clientId)
            .map_or(true, |last| now.saturating_sub(*last) > VISIT_WINDOW_MS);
        if fresh {
            self.db.total += 1;
        }
        self.db.seen.insert(clientId, now);
        self.db.lastVisit = Some(now);
        self.save();
        Stats {
            visitors: self.db.total,
            lastVisit: previous,
        }
    }

    pub fn stats(&self) -> Stats {
        Stats {
            visitors: self.db.total,
            lastVisit: self.db.lastVisit,
        }
    }

    fn save(&self) {
        if let Ok(raw) = serde_json::to_string(&self.db) {
            let _ = fs::write(&self.path, raw);
        }
    }
}
