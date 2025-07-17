"use client";
import { UserButton } from "@clerk/nextjs";
import { Menu, X, Search, Settings, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  // Animation variants
  const navbarVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const logoVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2
      }
    }
  };

  const navItemVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.4 + i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  };

  const mobileMenuVariants: Variants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: { 
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: { 
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const mobileItemVariants: Variants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  };

  const buttonVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.6
      }
    }
  };

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/stream", label: "Stream" },
    { href: "/admin/analytics", label: "Analytics" },
    { href: "/admin/community", label: "Community" }
  ];

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* Logo Section */}
        <motion.div 
          className="flex items-center gap-2 mr-4"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="flex items-center gap-2 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <motion.div 
                className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Zap className="w-4 h-4 text-white" />
              </motion.div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity duration-200"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
              Stream Portal
            </span>
          </motion.div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="relative text-foreground/80 hover:text-foreground transition-colors duration-300 group"
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              custom={i}
              whileHover={{ 
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {item.label}
              </span>
              <motion.div
                className="absolute -inset-x-2 -inset-y-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.1 }}
              />
            </motion.a>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <motion.div 
            className="hidden sm:block group"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <ThemeToggle />
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.1 }}
              />
            </div>
          </motion.div>

          {/* User Button */}
          <motion.div 
            className="ml-2 group"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 ring-2 ring-border hover:ring-pink-500/50 transition-all duration-300",
                    userButtonPopoverCard: "bg-background border border-border shadow-lg",
                    userButtonPopoverActions: "bg-background"
                  }
                }}
              />
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.2 }}
              />
            </div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-purple-500/20 rounded-full transition-all duration-300 group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5 text-muted-foreground group-hover:text-pink-500 transition-colors duration-300" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5 text-muted-foreground group-hover:text-purple-500 transition-colors duration-300" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-border bg-background/95 backdrop-blur overflow-hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="container px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <motion.div 
                className="relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-pink-500 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="Search streams, users..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-muted/50 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 hover:border-purple-500/50 transition-all duration-300"
                />
              </motion.div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-3">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="relative text-foreground/80 hover:text-foreground transition-colors py-2 group"
                    variants={mobileItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {item.label}
                    </span>
                    <motion.div
                      className="absolute -inset-x-2 -inset-y-1 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.02 }}
                    />
                  </motion.a>
                ))}
              </nav>

              {/* Mobile Actions */}
              <motion.div 
                className="flex items-center justify-between pt-4 border-t border-border"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2">
                  <motion.button 
                    className="p-2 hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-purple-500/20 rounded-full transition-all duration-300 group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Settings className="w-5 h-5 text-muted-foreground group-hover:text-pink-500 transition-colors duration-300" />
                  </motion.button>
                  <div className="group">
                    <div className="relative">
                      <ThemeToggle />
                      <motion.div
                        className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}