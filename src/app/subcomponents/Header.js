"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/app/subcomponents/ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/#faqs", label: "Faqs" },
  { href: "/#features", label: "Features" },
];

export default function Header() {
  const isMobile = useIsMobile();

  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`w-full px-8 py-3 bg-white dark:bg-black flex items-center justify-between md:px-4 sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className='flex items-center gap-1'>
        <Image src='/icon.png' alt='App logo' width={32} height={32} priority />
        <span className='font-bold text-2xl dark:text-white'>YouTube Downloader</span>
      </div>

      <div className='flex items-center gap-3 md:gap-2'>
        <NavigationMenu viewport={isMobile}>
          <NavigationMenuList className='flex-wrap'>
            {links.map(({ href, label }) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href={href}>{label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Button asChild>
          <a href='https://www.socialdownloader.in?ref=ytdl' target='_blank'>
            Social Video Downloader
          </a>
        </Button>

        <ThemeToggle />
      </div>
    </header>
  );
}
