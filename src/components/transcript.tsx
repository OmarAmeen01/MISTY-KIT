import { cn } from "@/lib/utils";
import { useAgent } from "@/hooks/use-agent";
import { useEffect, useRef, RefObject, useState } from "react";
import { ChevronDown } from 'lucide-react';

export function Transcript({
  scrollContainerRef,
  scrollButtonRef,
}: {
  scrollContainerRef: RefObject<HTMLElement>;
  scrollButtonRef: RefObject<HTMLButtonElement>;
}) {
  const { displayTranscriptions } = useAgent();
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const calculateDistanceFromBottom = (container: HTMLElement) => {
    const { scrollHeight, scrollTop, clientHeight } = container;
    return scrollHeight - scrollTop - clientHeight;
  };

  const handleScrollVisibility = (
    container: HTMLElement,
    scrollButton: HTMLButtonElement,
  ) => {
    const distanceFromBottom = calculateDistanceFromBottom(container);
    const shouldShowButton = distanceFromBottom > 100;
    setShowScrollButton(shouldShowButton);
    scrollButton.style.display = shouldShowButton ? "flex" : "none";
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    const scrollButton = scrollButtonRef.current;
    if (container && scrollButton) {
      const handleScroll = () =>
        handleScrollVisibility(container, scrollButton);

      handleScroll(); // Check initial state
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [
    scrollContainerRef,
    scrollButtonRef,
    displayTranscriptions,
    handleScrollVisibility,
  ]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const distanceFromBottom = calculateDistanceFromBottom(container);
      const isNearBottom = distanceFromBottom < 100;

      if (isNearBottom) {
        transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [displayTranscriptions, scrollContainerRef, transcriptEndRef]);

  const scrollToBottom = () => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const scrollButton = scrollButtonRef.current;
    if (scrollButton) {
      scrollButton.addEventListener("click", scrollToBottom);
      return () => scrollButton.removeEventListener("click", scrollToBottom);
    }
  }, [scrollButtonRef]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center text-sm font-semibold uppercase tracking-wide sticky top-0 left-0 bg-white w-full p-4 border-b border-gray-200 text-gray-700">
        Transcript
      </div>
      <div className="flex-grow overflow-y-auto p-4 relative">
        {displayTranscriptions.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Get talking to start the conversation!
          </div>
        ) : (
          <div className="space-y-4">
            {displayTranscriptions.map(
              ({ segment, participant, publication }) =>
                segment.text.trim() !== "" && (
                  <div
                    key={segment.id}
                    className={cn(
                      "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-4 py-3 text-sm shadow-sm",
                      participant?.isAgent
                        ? "bg-blue-100 text-blue-800"
                        : "ml-auto bg-green-100 text-green-800",
                    )}
                  >
                    {segment.text.trim()}
                  </div>
                ),
            )}
            <div ref={transcriptEndRef} />
          </div>
        )}
      </div>
      {showScrollButton && (
        <button
          ref={scrollButtonRef}
          onClick={scrollToBottom}
          className="absolute bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

