import { readDB, writeDB, setCors } from './_db.js';

export default function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, company, email, phone, sector, experience, message } = req.body;
    if (!name || !company || !email || !sector) return res.status(400).json({ error: 'Name, company, email, and sector required' });

    const entry = {
      id: Date.now().toString(),
      name, company, email,
      phone: phone || '', sector,
      experience: experience || '', message: message || '',
      status: 'pending',
      date: new Date().toISOString(),
    };

    const data = readDB('associates');
    data.push(entry);
    writeDB('associates', data);

    res.status(201).json({ success: true, id: entry.id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
