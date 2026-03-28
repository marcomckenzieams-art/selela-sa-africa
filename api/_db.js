import fs from 'fs';
import path from 'path';

// In Vercel serverless, /tmp is the writable directory
// For persistent storage, consider upgrading to Vercel KV or a database
// This file-based approach works for demos and low traffic
const DATA_DIR = '/tmp/selela-data';

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function readDB(type) {
  ensureDir();
  const file = path.join(DATA_DIR, `${type}.json`);
  try {
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return [];
  }
}

export function writeDB(type, data) {
  ensureDir();
  const file = path.join(DATA_DIR, `${type}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'selelasaafrica101!';

export function checkAuth(req) {
  const auth = req.headers.authorization;
  return auth === `Bearer ${ADMIN_PASSWORD}`;
}

// CORS headers helper
export function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}
