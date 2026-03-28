import { readDB, writeDB, setCors } from './_db.js';

export default function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, email, phone, company, date, time, notes, type } = req.body;
    if (!name || !email || !type) return res.status(400).json({ error: 'Name, email, and type required' });

    const entry = {
      id: Date.now().toString(),
      name, email,
      phone: phone || '', company: company || '',
      preferred_date: date || '', preferred_time: time || '',
      notes: notes || '', type,
      status: 'pending',
      date_submitted: new Date().toISOString(),
    };

    const data = readDB('bookings');
    data.push(entry);
    writeDB('bookings', data);

    res.status(201).json({ success: true, id: entry.id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
