import ytdl from "ytdl-core";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req?.url);
    const url = searchParams.get("url");
    const quality = searchParams.get("quality") || "18";

    if (!url || !ytdl.validateURL(url)) {
      return NextResponse.json({ error: "Please enter the valid video URL" }, { status: 400 });
    }

    // Fetch the info
    const info = await ytdl.getBasicInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality });

    if (!format) {
      return NextResponse.json({ error: "Requested quality not available" }, { status: 400 });
    }

    // Download the video
    return NextResponse.redirect(format?.url, { status: 302 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch URL", details: err.message }, { status: 500 });
  }
}
