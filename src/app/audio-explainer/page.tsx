import { Header } from "@/components/header";
import { RoomComponent } from "@/components/room-component";
// import { Navbar } from "@/components/auth";
import { defaultPresets } from "@/data/presets";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  let title = "Existence Co's BETA TEST";
  let description =
    "There is more to just studying online ";

  const presetId = searchParams?.preset;
  if (presetId) {
    const selectedPreset = defaultPresets.find(
      (preset) => preset.id === presetId,
    );
    if (selectedPreset) {
      title = `Realtime Playground`;
      description = `Speak to a "${selectedPreset.name}" in a speech-to-speech playground for OpenAI's new Realtime API. Built on LiveKitAgents.`;
    }
  }
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: "https://atia.whiteye.in/",
      images: [
        {
          url: "https://atia.whiteye.in/exodus.jpg",
          width: 1200,
          height: 675,
          type: "image/png",
          alt: title,
        },
      ],
    },
  };
}

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full bg-neutral-100">
      <header className="flex flex-shrink-0 h-8 items-center justify-between md:mx-auto"/>
      <main className="flex flex-col flex-grow overflow-hidden p-0 md:p-2 md:pt-0 w-full md:mx-auto">
        <Header />
        <RoomComponent />
      </main>
      <footer className="hidden md:flex md:items-center md:gap-2 md:justify-end font-mono uppercase text-right pt-1 pb-2 px-8 text-xs text-gray-600 w-full md:mx-auto">
        Beta users only
        • © 2024 Existence 
      </footer>
    </div>
  );
}
