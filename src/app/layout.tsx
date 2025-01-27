import "./globals.css";
import { PlaygroundStateProvider } from "@/hooks/use-playground-state";
import { ConnectionProvider } from "@/hooks/use-connection";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { PHProvider } from "@/hooks/posthog-provider";
import { Public_Sans,Manrope } from "next/font/google";
import dynamic from "next/dynamic";
import { Analytics } from "@vercel/analytics/react";
const PostHogPageView = dynamic(
  () => import("../components/posthog-pageview"),
  {
    ssr: false,
  }
);

// Configure the Public Sans font
const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope= Manrope({
  subsets:["cyrillic"],
  weight: [ "200", "300", "400", "500", "600", "700", "800",],
  variable:"--font-manrope",
  style:["normal"]
})

import "@livekit/components-styles";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/components/auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-sans `}>
        <SessionProvider>
          <PHProvider>
            <PlaygroundStateProvider>
              <ConnectionProvider>
                <TooltipProvider>
                  <PostHogPageView />
                  <Analytics />
                  <Navbar/>
                  {children}
                  <Toaster />
                </TooltipProvider>
              </ConnectionProvider>
            </PlaygroundStateProvider>
          </PHProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
