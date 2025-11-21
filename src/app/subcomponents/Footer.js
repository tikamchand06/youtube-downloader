"use client";

import * as React from "react";
import Link from "next/link";
import { Copyright, Info, BookLock, Handshake, Phone } from "lucide-react";

const links = [
  { href: "/about", label: "About", Icon: Info },
  { href: "/contact", label: "Contact", Icon: Phone },
  { href: "/privacy", label: "Privacy Policy", Icon: BookLock },
  { href: "/terms", label: "Terms of Service", Icon: Handshake },
];

export default function Footer() {
  return (
    <footer className='w-full bg-white dark:bg-black border-t border-t-black/[.08] dark:border-t-white/[.145] px-8 py-4 flex items-center justify-between'>
      <div className='flex items-center gap-1 text-sm text-black/60 dark:text-white/60'>
        <Copyright height={16} width={16} /> {new Date().getFullYear()}
        <Link
          target='_blank'
          href='https://tcmhack.in?ref=ytdl'
          className='text-sm font-semibold text-black/60 dark:text-white/60 hover:text-blue-600 dark:hover:text-blue-400'
        >
          TCMHACK
        </Link>
        <span>All rights reserved.</span>
      </div>

      <div className='flex items-center gap-4'>
        {links.map(({ Icon, href, label }) => (
          <Link
            key={href}
            href={href}
            className='flex items-center gap-1 text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
          >
            <Icon height={16} width={16} />
            {label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
