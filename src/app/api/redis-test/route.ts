import { createClient } from "redis";
import { NextResponse } from "next/server";

export async function GET() {
  const client = createClient({
    url: process.env.REDIS_URL,
  });

  try {
    await client.connect();

    await client.set("redis_test", "Redis connected successfully");
    const value = await client.get("redis_test");

    return NextResponse.json({
      success: true,
      message: value,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Redis connection failed",
      },
      { status: 500 }
    );
  } finally {
    if (client.isOpen) {
      await client.quit();
    }
  }
}
