"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
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
import Image from "next/image"
import {
  Key,
  Menu,
  X,
} from "lucide-react";
import Dropbar from "./ui/ShiftingDropDown";

// importing the logo 


const AuthFormSchema = z.object({
  openaiAPIKey: z.string().min(1, { message: "API key is required" }),
});

export function Navbar() {
  const { pgState, dispatch, showAuthDialog, setShowAuthDialog } = usePlaygroundState();
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const onLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_API_KEY", payload: null });
    setShowAuthDialog(true);
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const NavLinks = () => (
    <>
      <Dropbar />
      {!session ? (
        <div className="sm:flex-col flex-col flex md:hidden items-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => signIn()}
            className="text-white rounded-full bg-gray-600 hover:bg-gray-800 hover:text-white sm:w-full w-full my-2"
          >
            Login
          </Button>
          <Button
            onClick={() => signIn()}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 sm:px-6 sm:w-full w-full my-2"
          >
            Sign up
          </Button>
        </div>
      ) : (
        <div className="sm:flex-col flex-col md:hidden flex items-center space-x-2 sm:space-x-4">
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
            className="text-gray-600 hover:text-gray-900"
          >
            Sign Out
          </Button>
        </div>
      )}
    </>
  );

  return (
    <div className="flex flex-col w-full">
      {/* Announcement Banner */}


      {/* Navbar with Framer Motion */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="border-b bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex  justify-between md:justify-center h-16 ">
            {/* Logo */}
            <div >
             
              <Link href="/" className="flex items-center  font-sans mx-2 text-2xl font-semibold">
              <Image
                       src="/logo_misty_ai.jpeg"
                       alt="Misty ai"
                       width={70}
                       height={70}
                       className=""
                     />  Misty 
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <Button variant="ghost" onClick={toggleMobileMenu} className="p-2">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex mx-12 items-center space-x-8">
              <NavLinks />
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  className="absolute top-0 left-0 w-full h-full bg-white md:hidden shadow-lg z-50 flex flex-col items-center justify-center"
                  initial={{ opacity: 0, y: -50 }}   // Start with opacity 0 and slightly above
                  animate={{ opacity: 1, y: 0 }}     // Fade in and move to original position
                  exit={{ opacity: 0, y: 50 }}       // Fade out and move slightly down when closed
                  transition={{ duration: 0.3, ease: "easeOut" }}  // Smooth transition
                >
                  <div className="absolute top-4 right-4">
                    <Button variant="ghost" onClick={toggleMobileMenu}>
                      <X className="w-6 h-6 text-gray-900" />
                    </Button>
                  </div>
                  <div className="flex flex-col items-center space-y-6 p-4">
                    <NavLinks />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
              {!session ? (
                <div className="sm:flex-col flex md:flex-row items-center space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => signIn()}
                    className="text-white rounded-full bg-gray-600 hover:bg-gray-800 hover:text-white sm:w-full w-full my-2"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => signIn()}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 sm:px-6 sm:w-full w-full my-2"
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
                    className="text-gray-600 hover:text-gray-900"
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
      </motion.nav>

      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        onAuthComplete={() => setShowAuthDialog(false)}
      />
       <div className="w-full bg-orange-500 text-white text-center py-2 text-sm">
        Misty is currently in beta. We're working hard to improve your experience. Enjoy the futue of learning.
      </div>
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
