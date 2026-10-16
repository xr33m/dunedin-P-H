// Vercel serverless function: POST /api/lead
// Website enquiry → Airtable automation "Website lead → Leads + email Kevin",
// which saves the lead and emails dunedinph@gmail.com. Forwarding happens
// server-side, so there are no CORS issues and the webhook URL never appears
// in the page source. Override with the AIRTABLE_LEAD_WEBHOOK environment
// variable in Vercel (Project → Settings → Environment Variables).
const DEFAULT_WEBHOOK =
  'https://hooks.airtable.com/workflows/v1/genericWebhook/appvDHO853vl1JkVW/wflN5Vap1Zq2EqY7X/wtrsQ2KTZvsKPn5M7';

const FIELDS = ['name', 'phone', 'email', 'postcode', 'urgency', 'service', 'day', 'date', 'time', 'message', 'page', 'lead_source', 'submitted_at'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  let input = req.body;
  if (typeof input === 'string') {
    try { input = JSON.parse(input); } catch { input = null; }
  }
  if (!input || typeof input !== 'object') return res.status(400).json({ ok: false, error: 'Invalid JSON' });

  // Honeypot: real visitors never fill this in. Pretend success to bots.
  if (input.company) return res.status(200).json({ ok: true });

  // Every key always present as a trimmed string, so the Airtable mapping never breaks.
  const lead = Object.fromEntries(FIELDS.map((k) => [k, String(input[k] ?? '').trim().slice(0, k === 'message' ? 2000 : 200)]));
  const digits = lead.phone.replace(/\D/g, '');
  if (!lead.name || digits.length < 10 || digits.length > 13) {
    return res.status(422).json({ ok: false, error: 'Name and a valid phone number are required' });
  }
  lead.lead_source = lead.lead_source || 'Website form';
  lead.submitted_at = new Date().toISOString();

  try {
    const r = await fetch(process.env.AIRTABLE_LEAD_WEBHOOK || DEFAULT_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
    if (!r.ok) throw new Error(`Airtable responded ${r.status}`);
  } catch (err) {
    console.error('Lead forward failed:', err.message);
    return res.status(502).json({ ok: false, error: 'Could not save enquiry' });
  }
  return res.status(200).json({ ok: true });
}
