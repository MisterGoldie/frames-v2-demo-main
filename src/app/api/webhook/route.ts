import { getFrameMessage } from "frames.js";
import type { FrameMessage } from "~/lib/connector";
import { NextRequest } from "next/server";
import { z } from "zod";

const FrameRequest = z.object({
  header: z.string(),
  payload: z.string(),
  event: z.enum(["frame-added", "frame-removed", "notifications-enabled", "notifications-disabled"]),
  notificationDetails: z.object({
    token: z.string(),
    url: z.string()
  }).optional(),
  fid: z.number()
});

export async function POST(request: NextRequest) {
  const requestJson = await request.json();

  const requestBody = FrameRequest.safeParse(requestJson);

  if (requestBody.success === false) {
    return Response.json(
      { success: false, errors: requestBody.error.errors },
      { status: 400 }
    );
  }

  // TODO: verify signature

  const headerData = JSON.parse(
    Buffer.from(requestBody.data.header, "base64url").toString("utf-8")
  );
  const header = FrameRequest.safeParse(headerData);
  if (header.success === false) {
    return Response.json(
      { success: false, errors: header.error.errors },
      { status: 400 }
    );
  }
  const fid = header.data.fid;

  const payloadData = JSON.parse(
    Buffer.from(requestBody.data.payload, "base64url").toString("utf-8")
  );
  const payload = FrameRequest.safeParse(payloadData);

  if (payload.success === false) {
    return Response.json(
      { success: false, errors: payload.error.errors },
      { status: 400 }
    );
  }

  switch (payload.data.event) {
    case "frame-added":
      console.log(
        payload.data.notificationDetails
          ? `Got frame-added event for fid ${fid} with notification token ${payload.data.notificationDetails.token} and url ${payload.data.notificationDetails.url}`
          : `Got frame-added event for fid ${fid} with no notification details`
      );
      break;
    case "frame-removed":
      console.log(`Got frame-removed event for fid ${fid}`);
      break;
    case "notifications-enabled":
      if (payload.data.notificationDetails) {
        console.log(
          `Got notifications-enabled event for fid ${fid} with token ${
            payload.data.notificationDetails.token
          } and url ${payload.data.notificationDetails.url} ${JSON.stringify(
            payload.data
          )}`
        );
      } else {
        console.log(`Got notifications-enabled event for fid ${fid} with no notification details`);
      }
      break;
    case "notifications-disabled":
      console.log(`Got notifications-disabled event for fid ${fid}`);
      break;
  }

  return Response.json({ success: true });
}
