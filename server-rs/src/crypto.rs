use aes_gcm::aead::Aead;
use aes_gcm::{Aes256Gcm, Key, KeyInit, Nonce};
use sha2::{Digest, Sha256};

pub fn clientId(secret: &str, ip: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(format!("{}|{}", secret, ip).as_bytes());
    hex::encode(hasher.finalize())[..32].to_string()
}

pub fn decryptPayload(key: &[u8], ivHex: &str, dataHex: &str) -> Option<String> {
    if key.len() != 32 {
        return None;
    }
    let iv = hex::decode(ivHex).ok()?;
    let data = hex::decode(dataHex).ok()?;
    if iv.len() != 12 || data.len() < 16 {
        return None;
    }
    let cipher = Aes256Gcm::new(Key::<Aes256Gcm>::from_slice(key));
    let plain = cipher.decrypt(Nonce::from_slice(&iv), data.as_ref()).ok()?;
    String::from_utf8(plain).ok()
}
