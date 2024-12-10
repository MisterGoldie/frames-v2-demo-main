import { NextRequest } from "next/server";
import { getFrameMessage } from "frames.js";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const frameMessage = await getFrameMessage(body);

  if (!frameMessage) {
    return new Response("Invalid frame message", { status: 400 });
  }

  return new Response(
    JSON.stringify({
      image: `${process.env.NEXT_PUBLIC_URL}/opengraph-image`,
      buttons: [
        { label: "Open YouTube" },
        { label: "Open Warpcast" },
        { label: "Add Frame" }
      ],
    })
  );
} 