import { readDB, writeDB, setCors } from './_db.js';

export default function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, email, phone, company, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'Name, email, and message required' });

    const entry = {
      id: Date.now().toString(),
      name, email,
      phone: phone || '', company: company || '',
      message,
      date: new Date().toISOString(),
    };

    const data = readDB('contacts');
    data.push(entry);
    writeDB('contacts', data);

    res.status(201).json({ success: true, id: entry.id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
