import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// Allow Upstash Redis client to be created automatically if UPSTASH_REDIS_REST_URL is set in Vercel
const redis = Redis.fromEnv();

export async function POST(req: Request) {
  try {
    const subscription = await req.json();

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
    }

    // Add subscription to a Redis Set (to avoid duplicates)
    await redis.sadd("push_subscriptions", JSON.stringify(subscription));

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    console.error("Error saving subscription:", error);
    return NextResponse.json({ error: "Failed to save subscription" }, { status: 500 });
  }
}
