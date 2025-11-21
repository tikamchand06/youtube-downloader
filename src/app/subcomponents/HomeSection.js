"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useReducer } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Download, Loader2 } from "lucide-react";
import Faqs from "@/app/subcomponents/Faqs";
import Features from "@/app/subcomponents/Features";
import VideoInfo from "@/app/subcomponents/VideoInfo";

export default function HomeSection() {
  const [state, setState] = useReducer((prev, next) => ({ ...prev, ...next }), { url: "", loading: false, videoInfo: null });
  const { url = "", loading = false, videoInfo = null } = state;

  const handleDownload = async () => {
    if (!url) return;
    setState({ loading: true, videoInfo: null });

    axios
      .get("/api/getinfo", { params: { url } })
      .then(({ data }) => setState({ videoInfo: data }))
      .catch((error) => toast.error(error?.response?.data?.error || error?.message))
      .finally(() => setState({ loading: false }));
  };

  return (
    <>
      <section className='py-10 pt-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-3xl mx-auto text-center'>
          <div className='mb-8'>
            <h2 className='text-4xl sm:text-5xl font-bold mb-4 text-foreground text-balance'>Download Any YouTube Video</h2>

            <Image width={160} height={160} src='/youtube.gif' alt='YouTube Downloader' className='mx-auto' />
          </div>

          <div className='flex flex-col sm:flex-row gap-3 mb-2'>
            <Input
              value={url}
              autoComplete='on'
              className='flex-1 px-4 py-3 text-base dark:bg-gray-900 dark:text-white'
              placeholder='Paste YouTube link here...'
              onChange={(e) => setState({ url: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && handleDownload()}
            />

            <Button variant='default' onClick={handleDownload} disabled={loading || !url}>
              {loading ? <Loader2 className='w-4 h-4 animate-spin' /> : <Download className='w-4 h-4' />}
              Download
            </Button>
          </div>

          <p className='text-sm text-muted-foreground mb-8 dark:text-foreground/80'>
            This website does not belong to and is not supported by YouTube in any manner. Downloading videos from YouTube is strictly
            prohibited. Please use it at your own risk.
          </p>

          <div className='border border-border rounded-md p-4 text-sm text-foreground/80 bg-background/50 font-medium bg-gray-50 dark:bg-gray-800'>
            Looking for a video downloader for other social video platforms like Facebook, Twitter, Instagram or Vimeo? Try our{" "}
            <Link
              target='_blank'
              href='https://www.socialdownloader.in?ref=ytdl'
              className='text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 font-semibold'
            >
              Social Video Downloader
            </Link>
          </div>
        </div>
      </section>

      <VideoInfo videoInfo={videoInfo} />
      <Divider />
      <Features />
      <Divider />
      <Faqs />
    </>
  );
}
