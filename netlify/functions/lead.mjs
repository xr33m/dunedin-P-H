// Website enquiry → Airtable ("Website lead → Leads + email Kevin" automation).
// The browser posts to /api/lead (see netlify.toml); this function validates
// the enquiry and forwards it server-side, so there are no CORS issues and the
// Airtable webhook URL never appears in the page source.
//
// Override the destination with the AIRTABLE_LEAD_WEBHOOK environment variable
// in Netlify (Site settings → Environment variables) if the automation changes.
const DEFAULT_WEBHOOK =
  'https://hooks.airtable.com/workflows/v1/genericWebhook/appvDHO853vl1JkVW/wflN5Vap1Zq2EqY7X/wtrsQ2KTZvsKPn5M7';

const FIELDS = ['name', 'phone', 'email', 'postcode', 'urgency', 'service', 'day', 'date', 'time', 'message', 'page', 'lead_source', 'submitted_at'];
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

export default async (request) => {
  if (request.method !== 'POST') return json(405, { ok: false, error: 'Method not allowed' });

  let input;
  try {
    input = await request.json();
  } catch {
    return json(400, { ok: false, error: 'Invalid JSON' });
  }

  // Honeypot: real visitors never fill this in. Pretend success to bots.
  if (input.company) return json(200, { ok: true });

  // Every key always present as a short string, so the Airtable mapping never breaks.
  const lead = Object.fromEntries(FIELDS.map((k) => [k, String(input[k] ?? '').trim().slice(0, k === 'message' ? 2000 : 200)]));
  const digits = lead.phone.replace(/\D/g, '');
  if (!lead.name || digits.length < 10 || digits.length > 13) {
    return json(422, { ok: false, error: 'Name and a valid phone number are required' });
  }
  lead.lead_source = lead.lead_source || 'Website form';
  lead.submitted_at = new Date().toISOString();

  const res = await fetch(process.env.AIRTABLE_LEAD_WEBHOOK || DEFAULT_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });
  if (!res.ok) return json(502, { ok: false, error: 'Could not save enquiry' });
  return json(200, { ok: true });
};
