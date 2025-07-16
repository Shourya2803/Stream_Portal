"use client";
import { UserButton } from "@clerk/nextjs";
import {  Menu, X, Search, Settings, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";




export default function Navbar( ) {{
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-2 mr-4">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity duration-200"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
              Stream Portal
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="/admin/dashboard" className="text-foreground/80 hover:text-foreground transition-colors hover:scale-105 transform duration-200">
            Dashboard
          </a>
          <a href="#" className="text-foreground/80 hover:text-foreground transition-colors hover:scale-105 transform duration-200">
            Streams
          </a>
          <a href="/admin/analytics" className="text-foreground/80 hover:text-foreground transition-colors hover:scale-105 transform duration-200">
            Analytics
          </a>
          <a href="/admin/community" className="text-foreground/80 hover:text-foreground transition-colors hover:scale-105 transform duration-200">
            Community
          </a>
        </nav>

      

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
        

          {/* Notifications */}
        

         
          {/* Theme Toggle */}
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          {/* User Button */}
          <div className="ml-2">
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="container px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search streams, users..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-muted/50 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              />
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-3">
              <a href="#" className="text-foreground/80 hover:text-foreground transition-colors py-2">
                Dashboard
              </a>
              <a href="#" className="text-foreground/80 hover:text-foreground transition-colors py-2">
                Streams
              </a>
              <a href="#" className="text-foreground/80 hover:text-foreground transition-colors py-2">
                Analytics
              </a>
              <a href="#" className="text-foreground/80 hover:text-foreground transition-colors py-2">
                Community
              </a>
            </nav>

            {/* Mobile Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-muted rounded-full transition-colors duration-200">
                  <Settings className="w-5 h-5 text-muted-foreground" />
                </button>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
}