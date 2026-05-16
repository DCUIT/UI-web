export function health(_req, res) {
  res.json({ ok: true, service: 'auth' });
}

