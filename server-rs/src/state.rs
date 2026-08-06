use std::sync::{Arc, Mutex};

use crate::challenge::ChallengeStore;
use crate::limiter::Limiter;
use crate::store::VisitStore;

#[derive(Clone)]
pub struct AppState {
    pub challenges: Arc<Mutex<ChallengeStore>>,
    pub visits: Arc<Mutex<VisitStore>>,
    pub limiter: Arc<Mutex<Limiter>>,
}

impl AppState {
    pub fn new() -> Self {
        Self {
            challenges: Arc::new(Mutex::new(ChallengeStore::new())),
            visits: Arc::new(Mutex::new(VisitStore::load())),
            limiter: Arc::new(Mutex::new(Limiter::new())),
        }
    }
}
