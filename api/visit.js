import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const count = await kv.incr('srm_menu_visitors');
    return res.status(200).json({ count });
  } catch (error) {
    // If KV is not configured, return null gracefully
    return res.status(200).json({ count: null });
  }
}
