// import ytdl from "ytdl-core";
import ytdl from "@distube/ytdl-core";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req?.url);
    const url = searchParams.get("url");

    if (!url || !ytdl.validateURL(url)) {
      return Response.json({ error: "Please enter the valid video URL" }, { status: 400 });
    }

    // Fetch the info
    const result = await ytdl.getBasicInfo(url);
    const { videoDetails = {}, player_response = {} } = result || {};
    const { captions = {}, streamingData = {} } = player_response || {};
    const { adaptiveFormats = [], formats = [] } = streamingData || {};
    const { captionTracks = [] } = captions?.playerCaptionsTracklistRenderer || {};

    // Basic Info
    const { thumbnails = [] } = videoDetails;
    const thumbnail = thumbnails[thumbnails.length - 1]?.url || "";

    // Filter formats
    const audioOnly = adaptiveFormats.filter((item) => item.mimeType.includes("audio"));
    const videoOnly = adaptiveFormats.filter((item) => item.mimeType.includes("video"));
    const uniqueAudios = audioOnly.reduce((acc, item) => ({ ...acc, [item?.itag]: item }), {});
    const uniqueVideos = videoOnly.reduce((acc, item) => ({ ...acc, [item?.quality]: item }), {});

    // Filtered medias
    const medias = {
      files: formats,
      videoOnly: Object.values(uniqueVideos),
      audioOnly: Object.values(uniqueAudios)?.map((file) => ({ ...file, container: file.mimeType.split(";")[0] })),
    };

    // You can parse metadata, og tags, etc. here
    return Response.json({ medias, captionTracks, videoDetails: { ...videoDetails, thumbnail } });
  } catch (err) {
    return Response.json({ error: "Failed to fetch URL", details: err.message }, { status: 500 });
  }
}
