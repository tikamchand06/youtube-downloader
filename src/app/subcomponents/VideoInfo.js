"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart, ClockFading, MonitorUp } from "lucide-react";

const shortFormat = (n) => {
  const num = Number(n);
  if (isNaN(num)) return n;

  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num;
};

const formatBytes = (bytes) => {
  const sizes = ["Bytes", "KB", "MB", "GB"];
  if (!bytes) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
};

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

export default function VideoInfo({ videoInfo = null }) {
  const {
    title = "",
    video_url = "",
    thumbnail = "",
    likeCount = 0,
    viewCount = 0,
    uploadDate = "",
    lengthSeconds = 0,
  } = videoInfo?.videoDetails || {};
  const { files = [], videoOnly = [], audioOnly = [] } = videoInfo?.medias || {};

  if (!videoInfo) return null;

  console.log("Video Info:", videoInfo);

  return (
    <section className='video-info p-5'>
      <Card className='max-w-5xl mx-auto p-4 gap-3'>
        <h3 className='text-2xl font-bold text-foreground mb-1'>Video Details</h3>

        <div className='flex items-start gap-4 mb-4'>
          <Image src={thumbnail} width={160} height={120} alt='Video Thumbnail' className='rounded-sm' />
          <div className='flex-1 flex flex-col gap-2'>
            <Link target='_blank' href={video_url} className='text-lg font-semibold text-blue-500 hover:text-blue-600'>
              {title}
            </Link>

            <div className='flex items-center gap-2'>
              {Number(viewCount) >= 0 && (
                <Badge className='bg-green-500 text-white dark:bg-green-600 font-semibold px-2 py-1'>
                  <Eye />
                  {shortFormat(viewCount)} Views
                </Badge>
              )}

              {Number(likeCount) >= 0 && (
                <Badge className='bg-yellow-500 text-white dark:bg-yellow-600 font-semibold px-2 py-1'>
                  <Heart />
                  {shortFormat(likeCount)} Likes
                </Badge>
              )}

              {Number(lengthSeconds) >= 0 && (
                <Badge className='bg-purple-500 text-white dark:bg-purple-600 font-semibold px-2 py-1'>
                  <ClockFading />
                  {formatDuration(lengthSeconds)}
                </Badge>
              )}

              {uploadDate && (
                <Badge className='bg-gray-500 text-white dark:bg-gray-600 font-semibold px-2 py-1'>
                  <MonitorUp />
                  Uploaded on {new Date(uploadDate).toLocaleDateString()}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <h3 className='text-2xl font-bold text-foreground'>Downloading Options</h3>
        <div className='flex flex-col gap-4'>
          {files?.length && (
            <div className='flex flex-col items-start gap-2'>
              <h3 className='font-bold'>With Audio & Video</h3>
              <div className='flex items-center gap-2 flex-wrap'>
                {files.map(({ itag, url, qualityLabel, contentLength }) => (
                  <a
                    key={itag}
                    // href={url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='border px-3 py-2 rounded-sm hover:bg-blue-600 text-sm font-medium cursor-pointer hover:shadow-lg transition-shadow hover:text-white'
                    href={`/api/download?url=${encodeURIComponent(video_url)}&quality=${itag}`}
                  >
                    Download in {qualityLabel} ({formatBytes(contentLength)})
                  </a>
                ))}
              </div>
            </div>
          )}

          {videoOnly?.length && (
            <div className='flex flex-col items-start gap-2'>
              <h3 className='font-bold'>With Video Only</h3>
              <div className='flex items-center gap-2 flex-wrap'>
                {videoOnly.map(({ itag, url, qualityLabel, contentLength }) => (
                  <a
                    key={itag}
                    // href={url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='border px-3 py-2 rounded-sm hover:bg-blue-600 text-sm font-medium cursor-pointer hover:shadow-lg transition-shadow hover:text-white'
                    href={`/api/download?url=${encodeURIComponent(video_url)}&quality=${itag}`}
                  >
                    Download in {qualityLabel} ({formatBytes(contentLength)})
                  </a>
                ))}
              </div>
            </div>
          )}

          {audioOnly?.length && (
            <div className='flex flex-col items-start gap-2'>
              <h3 className='font-bold'>With Audio Only</h3>
              <div className='flex items-center gap-2 flex-wrap'>
                {audioOnly.map(({ itag, url, container = "", qualityLabel, contentLength }) => (
                  <a
                    key={itag}
                    // href={url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='border px-3 py-2 rounded-sm hover:bg-blue-600 text-sm font-medium cursor-pointer hover:shadow-lg transition-shadow hover:text-white'
                    href={`/api/download?url=${encodeURIComponent(video_url)}&quality=${itag}`}
                  >
                    Download Audio - {qualityLabel || container?.split("/")?.pop()} ({formatBytes(contentLength)})
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </section>
  );
}
