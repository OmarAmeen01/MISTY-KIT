"use client";

import React, { useRef } from "react";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  useStartAudio,
} from "@livekit/components-react";
import { ConfigurationForm } from "@/components/configuration-form";
import { Chat } from "@/components/chat";
import { Transcript } from "@/components/transcript";
import { useConnection } from "@/hooks/use-connection";
import { AgentProvider } from "@/hooks/use-agent";
import { ChevronDown } from 'lucide-react';

export function RoomComponent() {
  const { shouldConnect, wsUrl, token } = useConnection();
  const transcriptContainerRef = useRef<HTMLDivElement>(null);
  const scrollButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <LiveKitRoom
      serverUrl={wsUrl}
      token={token}
      connect={shouldConnect}
      audio={true}
      className="flex flex-col md:grid md:grid-cols-[1fr_360px] lg:grid-cols-[300px_1fr_300px] xl:grid-cols-[360px_1fr_360px] flex-grow overflow-hidden rounded-lg shadow-lg bg-white"
      style={{ "--lk-bg": "white" } as React.CSSProperties}
      options={{
        publishDefaults: {
          stopMicTrackOnMute: true,
        },
      }}
    >
      <AgentProvider>
        <div className="hidden lg:block h-full overflow-y-auto relative border-r border-gray-200">
          <ConfigurationForm />
        </div>
        <div className="flex flex-col justify-center w-full max-w-3xl mx-auto p-6">
          <Chat />
        </div>
        <div className="hidden md:flex flex-col h-full overflow-y-hidden border-l border-gray-200 relative">
          <div
            className="flex-grow overflow-y-auto p-4"
            ref={transcriptContainerRef}
          >
            <Transcript
              scrollContainerRef={transcriptContainerRef}
              scrollButtonRef={scrollButtonRef}
            />
          </div>
          <div className="absolute bottom-4 right-4">
            <button
              ref={scrollButtonRef}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-md flex items-center"
            >
              <ChevronDown className="mr-1 h-4 w-4" />
              <span className="text-xs pr-1">View latest</span>
            </button>
          </div>
        </div>
        <RoomAudioRenderer />
        <AudioStartButton />
      </AgentProvider>
    </LiveKitRoom>
  );
}

function AudioStartButton() {
  const { mergedProps, canPlayAudio } = useStartAudio({
    props: {
      className: "absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors shadow-md text-sm",
    },
  });

  if (canPlayAudio) return null;

  return (
    <button {...mergedProps}>
      Allow audio playback
    </button>
  );
}

