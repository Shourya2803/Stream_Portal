"use client";
import { UserButton } from "@clerk/nextjs";
import { Bell, Menu, X, BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm dark:shadow-lg dark:shadow-black/5">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity duration-200"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              Stream Portal
            </span>
          </div>
        </div>

        {/* Desktop Navigation - Simple student-focused options */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="/student/dashboard" className="text-foreground/80 hover:text-foreground transition-colors hover:scale-105 transform duration-200">
            Dashboard
          </a>
          <a href="/student/browse" className="text-foreground/80 hover:text-foreground transition-colors hover:scale-105 transform duration-200">
            Browse
          </a>
          <a href="#" className="text-foreground/80 hover:text-foreground transition-colors hover:scale-105 transform duration-200">
            Help
          </a>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <button 
              className="p-2 hover:bg-muted rounded-full transition-all duration-200 hover:scale-105"
              onClick={() => setHasNotifications(false)}
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              {hasNotifications && (
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full animate-pulse">
                  <span className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                </span>
              )}
            </button>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Button */}
          <div className="ml-1">
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 ring-2 ring-border hover:ring-primary/50 transition-all duration-200",
                  userButtonPopoverCard: "bg-background border border-border shadow-lg",
                  userButtonPopoverActions: "bg-background"
                }
              }}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-full transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Simple and clean */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="container px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-foreground/80 hover:text-foreground transition-colors py-2 text-base">
                My Streams
              </a>
              <a href="#" className="text-foreground/80 hover:text-foreground transition-colors py-2 text-base">
                Browse
              </a>
              <a href="#" className="text-foreground/80 hover:text-foreground transition-colors py-2 text-base">
                Help
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}