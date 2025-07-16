'use client';

import { Button } from "@/components/ui/button";
import { GraduationCap, ShieldCheck, Sparkles, Users, ArrowRight, Code, Cpu } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

  return (
    <div className="h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x * 0.02}px`,
            top: `${mousePosition.y * 0.02}px`,
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse"
          style={{
            right: `${mousePosition.x * 0.015}px`,
            bottom: `${mousePosition.y * 0.015}px`,
            animation: 'float 8s ease-in-out infinite reverse'
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgb3BhY2l0eT0iMC4xIj4KPHBhdGggZD0iTTQwIDBMMCAwTDAgNDAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIi8+CjwvZz4KPHN2Zz4K')] opacity-10"></div>

      <main className="relative z-10 h-screen flex flex-col items-center justify-center p-4">
        {/* Header Section */}
        <div className={`text-center space-y-6 max-w-6xl mx-auto transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-pink-500/20 border border-blue-500/30 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-medium text-blue-100">Advanced Student Management System</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-pink-400 to-blue-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
              Stream
            </span>
            <br />
            <span className="text-white">Portal</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Streamline your engineering education management with our comprehensive platform for 
            <span className="text-pink-400 font-semibold"> CSE</span> and 
            <span className="text-blue-400 font-semibold"> ECE</span> programs
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mt-8 transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Button
              onClick={() => handleNavigation("/student/login")}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-4 rounded-2xl text-lg font-semibold shadow-2xl shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 border-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-3">
                <GraduationCap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Login as Student</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Button>

            <Button
              onClick={() => handleNavigation("/admin/login")}
              className="group relative overflow-hidden bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-500 hover:to-pink-600 text-white px-6 py-4 rounded-2xl text-lg font-semibold shadow-2xl shadow-pink-500/25 transform hover:scale-105 transition-all duration-300 border-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Login as Admin</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Button>
          </div>

          {/* Features Section */}
          <div className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-pink-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-pink-500/20 group-hover:from-blue-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-blue-400 group-hover:text-pink-400 transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className={`mt-8 text-center transform transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-gray-400 text-sm mb-3">
              Trusted by engineering colleges and students
            </p>
            <div className="flex justify-center items-center gap-4">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-pink-400 border-2 border-gray-800 opacity-80"
                  />
                ))}
              </div>
              <span className="text-gray-300 text-sm">+5,000 students</span>
            </div>
          </div>
        </div>
      </main>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
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