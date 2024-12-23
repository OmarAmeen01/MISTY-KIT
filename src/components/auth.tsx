"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlaygroundState } from "@/hooks/use-playground-state";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSession, signIn, signOut } from "next-auth/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ellipsisMiddle } from "@/lib/utils";
import {
  ChevronDown,
  Key,
  Bot,
  FileText,
  Brain,
  Video,
  Menu,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AuthFormSchema = z.object({
  openaiAPIKey: z.string().min(1, { message: "API key is required" }),
});

export function Navbar() {
  const { pgState, dispatch, showAuthDialog, setShowAuthDialog } =
    usePlaygroundState();
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const onLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_API_KEY", payload: null });
    setShowAuthDialog(true);
  };

  // Helper function to check if a path is active
  const isActive = (path: string) => pathname.startsWith(path);

  // Mobile menu toggle
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const NavLinks = () => (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`font-serif text-xl flex items-center hover:text-gray-900 ${
            isActive("/audio-explainer") ? "text-sky-500" : "text-gray-600"
          }`}
        >
          Apps <ChevronDown className="ml-1 w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px] p-3">
          <Link href="/audio-explainer" onClick={toggleMobileMenu}>
            <DropdownMenuItem className="flex items-start p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Bot className="w-6 h-6 mr-3 text-blue-500" />
              <div>
                <div className="font-medium">Live AI Teacher</div>
                <div className="text-sm text-gray-500">
                  AI powered AUDIO to AUDIO based live teacher.
                </div>
              </div>
            </DropdownMenuItem>
          </Link>
          <Link href="/apps/flashcards" onClick={toggleMobileMenu}>
            <DropdownMenuItem className="flex items-start p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Brain className="w-6 h-6 mr-3 text-blue-500" />
              <div>
                <div className="font-medium">Flashcards</div>
                <div className="text-sm text-gray-500">
                  Active recall + Spaced repetition
                </div>
              </div>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link
        href="/tutoring"
        className={`hover:text-gray-900 ${
          pathname === "/tutoring" ? "text-sky-500" : "text-gray-600"
        }`}
        onClick={toggleMobileMenu}
      >
        Tutoring
      </Link>
      <Link
        href="/for-schools"
        className={`hover:text-gray-900 ${
          pathname === "/for-schools" ? "text-sky-500" : "text-gray-600"
        }`}
        onClick={toggleMobileMenu}
      >
        For schools
      </Link>
      <Link
        href="/vision"
        className={`px-3 py-1 rounded-lg bg-blue-200 font-semibold shadow-md transform transition-all hover:scale-96 hover:shadow-lg ${
          pathname === "/vision" ? "text-sky-800" : "text-blue-800"
        }`}
        onClick={toggleMobileMenu}
      >
        Vision
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`flex items-center hover:text-gray-900 ${
            isActive("/resources") ? "text-sky-500" : "text-gray-600"
          }`}
        >
          Resources <ChevronDown className="ml-1 w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px] p-3">
          <Link href="/resources/question-bank" onClick={toggleMobileMenu}>
            <DropdownMenuItem className="flex items-start p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <FileText className="w-6 h-6 mr-3 text-blue-500" />
              <div>
                <div className="font-medium">Question Bank</div>
                <div className="text-sm text-gray-500">
                  Exam-style questions sorted by topic
                </div>
              </div>
            </DropdownMenuItem>
          </Link>
          <Link href="/resources/video-lessons" onClick={toggleMobileMenu}>
            <DropdownMenuItem className="flex items-start p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Video className="w-6 h-6 mr-3 text-blue-500" />
              <div>
                <div className="font-medium">Video Lessons</div>
                <div className="text-sm text-gray-500">
                  Watch expert-led video tutorials
                </div>
              </div>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );

  return (
    <div className="flex flex-col w-full">
      {/* Announcement Banner */}
      <div className="w-full bg-orange-500 text-white text-center py-2 text-sm">
        We are currently in alpha! We haven&apos;t launched and are still under a lot
        of development changes.
      </div>
      
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div>
              <Link href="/" className="font-sans text-xl font-semibold">
                ΣClassroom
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                onClick={toggleMobileMenu} 
                className="p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLinks />
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="absolute top-full left-0 w-full bg-white md:hidden shadow-lg z-50">
                <div className="flex flex-col space-y-4 p-4">
                  <NavLinks />
                </div>
              </div>
            )}

            {/* Auth Section */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {!session ? (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => signIn()}
                    className="text-gray-600 hover:text-gray-900 hidden sm:block"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => signIn()}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 sm:px-6"
                  >
                    Sign up
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className="relative group">
                    <img
                      src={session.user?.image || "/default-avatar.png"}
                      alt="User Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                      {session.user?.email}
                    </span> 
                  </div>
                  <Button
                    onClick={() => signOut()}
                    variant="ghost"
                    className="text-gray-600 hover:text-gray-900 hidden sm:block"
                  >
                    Sign Out
                  </Button>
                </div>
              )}

              {pgState.openaiAPIKey && (
                <div 
                  className="flex items-center space-x-1 text-xs sm:text-sm text-gray-600 
                  border rounded-full px-2 sm:px-3 py-1"
                >
                  <Key className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{ellipsisMiddle(pgState.openaiAPIKey, 3, 3)}</span>
                  <button
                    onClick={onLogout}
                    className="text-blue-500 hover:text-blue-600 font-medium text-xs sm:text-sm"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        onAuthComplete={() => setShowAuthDialog(false)}
      />
    </div>
  );
}

// AuthDialog component remains the same as in the original code
export function AuthDialog({
  open,
  onOpenChange,
  onAuthComplete,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthComplete: () => void;
}) {
  const { pgState, dispatch } = usePlaygroundState();
  const form = useForm<z.infer<typeof AuthFormSchema>>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      openaiAPIKey: pgState.openaiAPIKey || "",
    },
  });

  useEffect(() => {
    form.setValue("openaiAPIKey", pgState.openaiAPIKey || "");
  }, [pgState.openaiAPIKey, form]);

  function onSubmit(values: z.infer<typeof AuthFormSchema>) {
    dispatch({ type: "SET_API_KEY", payload: values.openaiAPIKey || null });
    onOpenChange(false);
    onAuthComplete();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Enter API Key</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="openaiAPIKey"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="OpenAI API Key"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2"
              >
                Connect
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
