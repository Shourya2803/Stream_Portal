"use client";
import React, { useEffect, useState } from "react";
import { SignIn } from "@clerk/nextjs";

interface MousePosition {
  x: number;
  y: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export default function AdminLoginPage(): React.JSX.Element {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Create floating particles
    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setParticles(newParticles);

    // Animate particles
    const animateParticles = (): void => {
      setParticles((prev: Particle[]) => prev.map((particle: Particle) => ({
        ...particle,
        x: (particle.x + particle.speedX + window.innerWidth) % window.innerWidth,
        y: (particle.y + particle.speedY + window.innerHeight) % window.innerHeight,
      })));
    };

    const interval = setInterval(animateParticles, 16);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background with CSS gradients */}
      <div className="absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.2),rgba(255,255,255,0))]"></div>
      </div>

      {/* Floating particles */}
      {particles.map((particle: Particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            opacity: particle.opacity,
            transform: `scale(${particle.size})`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      {/* Mouse follower effect */}
      <div
        className="absolute w-96 h-96 bg-gradient-radial from-blue-400/20 to-transparent rounded-full pointer-events-none blur-3xl transition-all duration-300"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Geometric shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 border border-white/10 rotate-45 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 border border-purple-300/20 rotate-12 animate-bounce"></div>
      <div className="absolute top-1/2 left-10 w-16 h-16 border border-blue-300/20 rotate-45 animate-spin"></div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div 
          className={`transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Glowing title */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4 animate-pulse">
              ADMIN
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full animate-pulse"></div>
            <p className="text-white/70 mt-4 text-lg tracking-widest">NEURAL INTERFACE</p>
          </div>

          {/* Login card with enhanced styling */}
          <div className="relative group">
            {/* Card glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            
            {/* Main card */}
            <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
              {/* Card header glow */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
              
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl"></div>
              
              {/* Content */}
              <div className="relative p-8">
                <SignIn
                  routing="hash"
                  afterSignInUrl="/admin/dashboard"
                  appearance={{
                    elements: {
                      card: "bg-transparent shadow-none border-none",
                      headerTitle: "text-white font-bold text-2xl",
                      headerSubtitle: "text-white/70",
                      socialButtonsBlockButton: "bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-sm",
                      socialButtonsBlockButtonText: "text-white font-medium",
                      dividerLine: "bg-white/20",
                      dividerText: "text-white/60",
                      formFieldLabel: "text-white/80 font-medium",
                      formFieldInput: "bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-purple-400 focus:ring-purple-400/50 backdrop-blur-sm transition-all duration-300",
                      formButtonPrimary: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",
                      footerActionLink: "text-purple-300 hover:text-purple-200 transition-colors duration-300",
                      identityPreviewText: "text-white/80",
                      identityPreviewEditButton: "text-purple-300 hover:text-purple-200",
                      formFieldSuccessText: "text-green-300",
                      formFieldErrorText: "text-red-300",
                      alertText: "text-red-300",
                      formFieldHintText: "text-white/60",
                      otpCodeFieldInput: "bg-white/10 border-white/20 text-white focus:border-purple-400 focus:ring-purple-400/50",
                      formFieldInputShowPasswordButton: "text-white/60 hover:text-white/80",
                    },
                    layout: {
                      socialButtonsPlacement: "top",
                      showOptionalFields: false,
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bottom decorative elements */}
          <div className="flex justify-center mt-8 space-x-4">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>

      {/* Ambient lighting effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Scan lines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" style={{top: '20%'}}></div>
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" style={{top: '40%', animationDelay: '1s'}}></div>
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" style={{top: '60%', animationDelay: '2s'}}></div>
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" style={{top: '80%', animationDelay: '3s'}}></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
          50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.6); }
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}