"use client";

import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Bell, Menu, X, BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [student, setStudent] = useState<any>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch("/api/students/me");
        if (res.ok) {
          const data = await res.json();
          setStudent(data);
          // console.log("Student data:", data); // Debug log
        } else {
          console.error("Failed to fetch student:", res.status, res.statusText);
        }
      } catch (error) {
        console.error("Error fetching student:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, []);

  const handleAccept = async () => {
    if (!student || accepting) return;
    
    setAccepting(true);
    try {
      const res = await fetch(`/api/students/${student.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seatAccepted: true, // Set the boolean field to true
          notification: null,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setStudent(updated);
        setShowNotification(false);
        // console.log("Seat accepted successfully:", updated);
      } else {
        console.error("Failed to accept seat:", res.status, res.statusText);
        const errorData = await res.json();
        console.error("Error details:", errorData);
      }
    } catch (error) {
      console.error("Error accepting seat:", error);
    } finally {
      setAccepting(false);
    }
  };

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

        {/* Desktop Nav */}
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
          <a href="/student/payment" className="text-foreground/80 hover:text-foreground transition-colors hover:scale-105 transform duration-200">
            Payment
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3 relative">
          {/* Notification */}
         <div className="relative">
  <button
    className="p-2 hover:bg-muted rounded-full transition-all duration-200 hover:scale-105 relative"
    onClick={() => setShowNotification(!showNotification)}
  >
    <Bell className="w-5 h-5 text-muted-foreground" />
    {student?.notification && (
      <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full animate-pulse">
        <span className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
      </span>
    )}
  </button>

  {showNotification && student?.notification && (
    <div className="absolute right-0 mt-2 w-72 p-4 bg-white dark:bg-gray-900 border border-border rounded shadow-lg z-50 space-y-4">
      {/* Notification text */}
      <p className="text-sm text-foreground">{student.notification}</p>

      {/* Offer Letter Download */}
      {student.offerLetterUrl && (
        <a
          href={student.offerLetterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button
            variant="secondary"
            size="sm"
            className="w-full"
          >
            📄 Download Offer Letter
          </Button>
        </a>
      )}

      {/* Accept Seat */}
      {!student.seatAccepted && (
        <Button
          size="sm"
          className="w-full"
          onClick={handleAccept}
          disabled={accepting}
        >
          {accepting ? "Accepting..." : "Accept Seat"}
        </Button>
      )}
    </div>
  )}
</div>


          {/* Theme & User */}
          <ThemeToggle />
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

          {/* Mobile Menu Toggle */}
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

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="container px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="/student/dashboard" className="text-foreground/80 hover:text-foreground transition-colors py-2 text-base">
                Dashboard
              </a>
              <a href="/student/browse" className="text-foreground/80 hover:text-foreground transition-colors py-2 text-base">
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