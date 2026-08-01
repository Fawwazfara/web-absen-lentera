import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import webPush from "web-push";

const redis = Redis.fromEnv();

// Configure web-push with VAPID keys only if they are available
if (process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webPush.setVapidDetails(
    process.env.VAPID_SUBJECT || "mailto:admin@lentera-sukahaji.com",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

export async function GET(req: Request) {
  try {
    // Check auth header to ensure only Vercel Cron can trigger this (optional but recommended)
    const authHeader = req.headers.get("authorization");
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all subscriptions from Redis Set
    const subscriptions: string[] = await redis.smembers("push_subscriptions");

    if (!subscriptions || subscriptions.length === 0) {
      return NextResponse.json({ success: true, message: "No subscriptions found" });
    }

    const payload = JSON.stringify({
      title: "Waktunya Absen!",
      body: "hayu euy gera absen nanti nisa marah",
    });

    let successCount = 0;
    let failCount = 0;

    // Send push notification to all subscribers
    const pushPromises = subscriptions.map(async (subString) => {
      try {
        const subscription = typeof subString === "string" ? JSON.parse(subString) : subString;
        await webPush.sendNotification(subscription, payload);
        successCount++;
      } catch (error: any) {
        console.error("Error sending push notification to a subscriber:", error);
        
        // If the subscription is gone or expired (status 410 or 404), remove it from Redis
        if (error.statusCode === 410 || error.statusCode === 404) {
          await redis.srem("push_subscriptions", subString);
        }
        failCount++;
      }
    });

    await Promise.all(pushPromises);

    return NextResponse.json({ 
      success: true, 
      message: `Push sent. Success: ${successCount}, Failed: ${failCount}` 
    });

  } catch (error) {
    console.error("Cron Job Error:", error);
    return NextResponse.json({ error: "Failed to run cron job" }, { status: 500 });
  }
}
