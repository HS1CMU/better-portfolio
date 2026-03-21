import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const upstream = "https://assets.hypercue.ai/assets/Script-Mode.mp4";

  const headers: HeadersInit = {};
  const range = req.headers.get("range");
  if (range) headers["Range"] = range;

  const res = await fetch(upstream, { headers });

  const responseHeaders = new Headers();
  responseHeaders.set("Access-Control-Allow-Origin", "*");
  responseHeaders.set("Content-Type", res.headers.get("Content-Type") ?? "video/mp4");
  const contentLength = res.headers.get("Content-Length");
  if (contentLength) responseHeaders.set("Content-Length", contentLength);
  const contentRange = res.headers.get("Content-Range");
  if (contentRange) responseHeaders.set("Content-Range", contentRange);
  const acceptRanges = res.headers.get("Accept-Ranges");
  if (acceptRanges) responseHeaders.set("Accept-Ranges", acceptRanges);

  return new NextResponse(res.body, {
    status: res.status,
    headers: responseHeaders,
  });
}
