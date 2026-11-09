export const dynamic = "force-dynamic";

const BODY = {
  ok: false,
  demo: true,
  sent: false,
  contacted: false,
  error: "Sample preview: commands, approvals, refresh wakes, and webhooks are disabled.",
};
const HEADERS = { "Cache-Control": "no-store" };

// Disabled on purpose. The handler does not read a webhook, does not fetch, and does not wake anything.
export async function POST() {
  return Response.json(BODY, { status: 403, headers: HEADERS });
}

export async function GET() {
  return Response.json(BODY, { status: 405, headers: HEADERS });
}
