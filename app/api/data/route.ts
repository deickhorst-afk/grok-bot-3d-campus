import { sampleSnapshot } from "../../../lib/demo-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Cached sample snapshot only. This route does not collect data and does not call out.
export async function GET() {
  const body = sampleSnapshot();
  return Response.json(body, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "X-Campus-Snapshot": body.provenance.revision,
      "X-Campus-Kind": "sample",
    },
  });
}
