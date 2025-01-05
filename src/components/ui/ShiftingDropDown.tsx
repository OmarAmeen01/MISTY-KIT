"use client"

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Bot, Brain, FileText, Video } from "lucide-react";
import { QuestionMarkIcon } from "@radix-ui/react-icons";

const Dropbar = () => {
    return (
        <div className="flex flex-col sm:flex-col md:flex-row relative space-x-3">
            <div className="flex h-auto justify-center bg-transparent text-black px-3 py-2">
                <FlyoutLink href="#" FlyoutContent={AppsContent}>
                    <div className="text-black">Apps</div>
                </FlyoutLink>
            </div>
            <div className="flex h-auto justify-center bg-transparent text-black px-3 py-2 z-10">
                <FlyoutLink href="/tutoring">
                    <div className="text-black">Tutoring</div>
                </FlyoutLink>
            </div>
            {/* <div className="flex h-auto justify-center bg-transparent text-black px-3 py-2 z-10">
                <FlyoutLink href="/vision">
                    <div className="text-blue-700 font-bold font-serif">Vision</div>
                </FlyoutLink>
            </div> */}
            <div className="flex h-auto justify-center bg-transparent text-black px-3 py-2">
                <FlyoutLink href="#" FlyoutContent={ResourceContent}>
                    <div className="text-black">Resources</div>
                </FlyoutLink>
            </div>
        </div>
    );
};

const FlyoutLink = ({
    children,
    href,
    FlyoutContent,
}: {
    children: React.ReactNode;
    href: string;
    FlyoutContent?: React.ElementType;
}) => {
    const [open, setOpen] = useState(false);

    const showFlyout = FlyoutContent && open;

    return (
        <div
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className="relative w-fit h-fit group"
        >
            <Link href={href} className="relative text-black group-hover:text-black">
                {children}
                <span
                    className={`absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-black transition-transform duration-300 ease-out ${open ? "scale-x-100" : ""
                        }`}
                />
            </Link>
            <AnimatePresence>
                {showFlyout && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        style={{ translateX: "-50%" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute left-1/2 top-12 bg-white text-black shadow-lg rounded-md w-64 z-50"
                    >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45" />
                        <FlyoutContent />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const AppsContent = () => {
    return (
        <div className="w-64 p-4 z-50">
            <div className="space-y-3">
                <Link href="/audio-explainer" className="block text-sm text-gray-800 hover:underline">
                    <Bot className="w-6 h-6 mr-3 text-blue-500" />
                    <div>
                        <div className="font-medium">Meet Misty</div>
                        <div className="text-sm text-gray-500">
                            Try the best conversational AI Teacher at the palm of your hands.
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};
const ResourceContent = () => {
    return (
        <div className="w-64 p-4 z-50">
            <div className="space-y-3">
                <Link href="/resources/question-bank" className="block text-sm text-gray-800 hover:underline">
                    <FileText className="w-6 h-6 mr-3 text-blue-500" />
                    <div>
                        <div className="font-medium">Question Bank</div>
                        <div className="text-sm text-gray-500">
                            Exam-style questions sorted by topic
                        </div>
                    </div>
                </Link>
                <Link href="/resources/video-lessons" className="block text-sm text-gray-800 hover:underline">
                    <Video className="w-6 h-6 mr-3 text-blue-500" />
                    <div>
                        <div className="font-medium">Video Lessons</div>
                        <div className="text-sm text-gray-500">
                            Watch expert-led video tutorials
                        </div>
                    </div>
                </Link>
                <Link
                    href="/neet" className="block text-sm text-gray-800 hover:underline">
                    <QuestionMarkIcon className="w-6 h-6 mr-3 text-blue-500" />
                    <div>
                        <div className="font-medium">Question paper generator</div>
                        <div className="text-sm text-gray-500">
                            Let's study differently.
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Dropbar;
