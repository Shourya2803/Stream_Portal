'use client';

import { Button } from "@/components/ui/button";
import { GraduationCap, ShieldCheck, Sparkles, Users, ArrowRight, Code, Cpu } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    { icon: Code, title: "CSE Stream", desc: "Computer Science & Engineering program management" },
    { icon: Cpu, title: "ECE Stream", desc: "Electronics & Communication Engineering programs" },
    { icon: Users, title: "Student Management", desc: "Comprehensive student data and progress tracking" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <div className="h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Professional Gradient Orbs */}
        <motion.div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-600/20 to-slate-600/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
            scale: [1, 1.1, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 50, damping: 30 },
            y: { type: "spring", stiffness: 50, damping: 30 },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.div 
          className="absolute w-80 h-80 bg-gradient-to-r from-slate-600/15 to-blue-600/15 rounded-full blur-2xl"
          animate={{
            x: -mousePosition.x * 0.015,
            y: -mousePosition.y * 0.015,
            scale: [1, 1.2, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 50, damping: 30 },
            y: { type: "spring", stiffness: 50, damping: 30 },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 },
          }}
          style={{ right: 0, bottom: 0 }}
        />
        
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/60 to-slate-400/60 rounded-full"
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Professional Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgb3BhY2l0eT0iMC4xIj4KPHBhdGggZD0iTTQwIDBMMCAwTDAgNDAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIi8+CjwvZz4KPHN2Zz4K')] opacity-5"></div>

      <main className="relative z-10 h-screen flex flex-col items-center justify-center p-4">
        <motion.div 
          className="text-center space-y-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-700/40 to-slate-600/40 border border-slate-500/30 backdrop-blur-sm"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div variants={floatingVariants} animate="animate">
              <Sparkles className="w-4 h-4 text-blue-400" />
            </motion.div>
            <span className="text-sm font-medium text-slate-200">Advanced Student Management System</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight"
            variants={itemVariants}
          >
            <motion.span 
              className="bg-gradient-to-r from-blue-400 via-slate-300 to-blue-400 bg-clip-text text-transparent bg-size-200"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Stream
            </motion.span>
            <br />
            <motion.span 
              className="text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Portal
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Streamline your engineering education management with our comprehensive platform for 
            <motion.span 
              className="text-blue-400 font-semibold"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            > CSE</motion.span> and 
            <motion.span 
              className="text-blue-400 font-semibold"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            > ECE</motion.span> programs
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                onClick={() => handleNavigation("/student/login")}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-4 rounded-xl text-lg font-semibold shadow-2xl shadow-blue-900/25 border-0"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-slate-500 opacity-0 group-hover:opacity-20"
                  whileHover={{ opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: 12 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <GraduationCap className="w-5 h-5" />
                  </motion.div>
                  <span>Login as Student</span>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                onClick={() => handleNavigation("/admin/login")}
                className="group relative overflow-hidden bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white px-6 py-4 rounded-xl text-lg font-semibold shadow-2xl shadow-slate-900/25 border-0"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-slate-500 to-blue-500 opacity-0 group-hover:opacity-20"
                  whileHover={{ opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: 12 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ShieldCheck className="w-5 h-5" />
                  </motion.div>
                  <span>Login as Admin</span>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={itemVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative p-4 rounded-xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-slate-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ opacity: 1 }}
                />
                <div className="relative text-center space-y-3">
                  <motion.div 
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-slate-700/40 to-slate-600/40 group-hover:from-blue-600/30 group-hover:to-slate-600/30 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div 
            className="mt-8 text-center"
            variants={itemVariants}
          >
            <p className="text-slate-400 text-sm mb-3">
              Trusted by engineering colleges and students
            </p>
            <motion.div 
              className="flex justify-center items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-slate-500 border-2 border-slate-800 opacity-80"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.8 }}
                    transition={{ 
                      delay: 1.4 + i * 0.1, 
                      type: "spring", 
                      stiffness: 300 
                    }}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
              <span className="text-slate-300 text-sm">+5,000 students</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      {/* Custom CSS for background animations */}
      <style jsx>{`
        .bg-size-200 {
          background-size: 200% 200%;
        }
        
        * {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}