import { readDB, writeDB, checkAuth, ADMIN_PASSWORD, setCors } from '../_db.js';

export default function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Route: /api/admin/login
  const { slug } = req.query;
  const parts = Array.isArray(slug) ? slug : [slug];
  const route = parts[0]; // login | bookings | contacts | associates
  const id = parts[1];    // optional ID for delete/patch

  // ── LOGIN ──
  if (route === 'login' && req.method === 'POST') {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      return res.json({ success: true, token: ADMIN_PASSWORD });
    }
    return res.status(401).json({ error: 'Invalid password' });
  }

  // ── STATS ──
  if (route === 'stats' && req.method === 'GET') {
    if (!checkAuth(req)) return res.status(401).json({ error: 'Unauthorized' });
    return res.json({
      bookings: readDB('bookings').length,
      contacts: readDB('contacts').length,
      associates: readDB('associates').length,
    });
  }

  // All other admin routes need auth
  if (!checkAuth(req)) return res.status(401).json({ error: 'Unauthorized' });

  const validTypes = ['bookings', 'contacts', 'associates'];
  if (!validTypes.includes(route)) return res.status(400).json({ error: 'Invalid type' });

  // ── GET all entries ──
  if (req.method === 'GET') {
    return res.json(readDB(route));
  }

  // ── DELETE an entry ──
  if (req.method === 'DELETE' && id) {
    const data = readDB(route);
    const filtered = data.filter(e => e.id !== id);
    if (filtered.length === data.length) return res.status(404).json({ error: 'Not found' });
    writeDB(route, filtered);
    return res.json({ success: true });
  }

  // ── PATCH (update status) ──
  if (req.method === 'PATCH' && id) {
    const { status } = req.body;
    const data = readDB(route);
    const entry = data.find(e => e.id === id);
    if (!entry) return res.status(404).json({ error: 'Not found' });
    entry.status = status;
    writeDB(route, data);
    return res.json({ success: true });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
