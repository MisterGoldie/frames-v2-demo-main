import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { token, url, targetUrl } = await req.json();

  try {
    // Here you would implement your notification logic
    // For demo purposes, we'll just return success
    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to send notification" }),
      { status: 500 }
    );
  }
} 