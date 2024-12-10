import { NextResponse } from "next/server";
import { getFrameMessage } from "frames.js";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const frameMessage = await getFrameMessage(body);

    if (!frameMessage) {
      return NextResponse.json({ error: "Invalid frame message" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Frame added successfully"
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 