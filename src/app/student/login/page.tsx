"use client";
import React, { useEffect, useState } from "react";
import { SignIn } from "@clerk/nextjs";

interface MousePosition {
  x: number;
  y: number;
}

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

interface Wave {
  id: number;
  amplitude: number;
  frequency: number;
  phase: number;
  speed: number;
  color: string;
}

export default function StudentLoginPage(): React.JSX.Element {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
  const [waves, setWaves] = useState<Wave[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    setIsLoaded(true);
    
    // Create floating academic elements (books, pencils, atoms, etc.)
    const newElements: FloatingElement[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
      color: ['#60A5FA', '#34D399', '#A78BFA', '#F472B6', '#FBBF24'][Math.floor(Math.random() * 5)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
    }));
    setFloatingElements(newElements);

    // Create wave patterns
    const newWaves: Wave[] = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      amplitude: 20 + Math.random() * 30,
      frequency: 0.01 + Math.random() * 0.02,
      phase: Math.random() * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.01,
      color: ['rgba(96, 165, 250, 0.1)', 'rgba(52, 211, 153, 0.1)', 'rgba(167, 139, 250, 0.1)'][i],
    }));
    setWaves(newWaves);

    // Animate floating elements
    const animateElements = (): void => {
      setFloatingElements((prev: FloatingElement[]) => prev.map((element: FloatingElement) => ({
        ...element,
        x: (element.x + element.speedX + window.innerWidth) % window.innerWidth,
        y: (element.y + element.speedY + window.innerHeight) % window.innerHeight,
        rotation: element.rotation + element.rotationSpeed,
      })));
    };

    // Update time for wave animation
    const updateTime = (): void => {
      setTime(prev => prev + 0.016);
    };

    const elementInterval = setInterval(animateElements, 16);
    const timeInterval = setInterval(updateTime, 16);
    
    return () => {
      clearInterval(elementInterval);
      clearInterval(timeInterval);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-900 to-teal-900">
      {/* Animated wave background */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
          {waves.map((wave: Wave, index: number) => {
            const pathData = Array.from({ length: 50 }, (_, i) => {
              const x = (i / 49) * 1200;
              const y = 400 + Math.sin(x * wave.frequency + wave.phase + time * wave.speed) * wave.amplitude;
              return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
            }).join(' ');
            
            return (
              <path
                key={wave.id}
                d={`${pathData} L 1200,800 L 0,800 Z`}
                fill={wave.color}
                opacity={0.3}
                style={{
                  transform: `translateY(${index * 20}px)`,
                }}
              />
            );
          })}
        </svg>
      </div>

      {/* Floating academic elements */}
      {floatingElements.map((element: FloatingElement) => (
        <div
          key={element.id}
          className="absolute pointer-events-none"
          style={{
            left: `${element.x}px`,
            top: `${element.y}px`,
            opacity: element.opacity,
            transform: `scale(${element.size}) rotate(${element.rotation}deg)`,
            color: element.color,
          }}
        >
          {/* Different academic symbols */}
          {element.id % 5 === 0 && <div className="text-lg">📚</div>}
          {element.id % 5 === 1 && <div className="text-lg">✏️</div>}
          {element.id % 5 === 2 && <div className="text-lg">🔬</div>}
          {element.id % 5 === 3 && <div className="text-lg">🎓</div>}
          {element.id % 5 === 4 && <div className="w-2 h-2 bg-current rounded-full"></div>}
        </div>
      ))}

      {/* Mouse interaction light */}
      <div
        className="absolute w-80 h-80 bg-gradient-radial from-cyan-400/20 to-transparent rounded-full pointer-events-none blur-2xl transition-all duration-500"
        style={{
          left: mousePosition.x - 160,
          top: mousePosition.y - 160,
        }}
      />

      {/* Geometric grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 right-10 w-12 h-12 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div 
          className={`transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Student portal title */}
          <div className="text-center mb-12">
            <h1 className="text-7xl font-bold bg-gradient-to-r from-cyan-200 via-blue-200 to-teal-200 bg-clip-text text-transparent mb-4">
              STUDENT
            </h1>
            <div className="flex justify-center items-center space-x-4 mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
              <div className="text-2xl">🎓</div>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full"></div>
            </div>
            <p className="text-white/80 text-lg tracking-wider">LEARNING PORTAL</p>
          </div>

          {/* Login card */}
          <div className="relative group">
            {/* Outer glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 animate-pulse"></div>
            
            {/* Card shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse"></div>
            
            {/* Main card */}
            <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Card header effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
              
              {/* Inner gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-teal-500/5 rounded-2xl"></div>
              
              {/* Knowledge symbols decoration */}
              <div className="absolute top-4 left-4 text-cyan-300/20 text-sm">📖</div>
              <div className="absolute top-4 right-4 text-teal-300/20 text-sm">🔬</div>
              <div className="absolute bottom-4 left-4 text-blue-300/20 text-sm">✏️</div>
              <div className="absolute bottom-4 right-4 text-purple-300/20 text-sm">🎯</div>
              
              {/* Content */}
              <div className="relative p-8">
                <SignIn
                  routing="hash"
                  afterSignInUrl="/student/dashboard"
                  appearance={{
                    elements: {
                      card: "bg-transparent shadow-none border-none",
                      headerTitle: "text-white font-bold text-2xl",
                      headerSubtitle: "text-white/70",
                      socialButtonsBlockButton: "bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-sm hover:scale-105 transform",
                      socialButtonsBlockButtonText: "text-white font-medium",
                      dividerLine: "bg-white/20",
                      dividerText: "text-white/60",
                      formFieldLabel: "text-white/90 font-medium",
                      formFieldInput: "bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-cyan-400 focus:ring-cyan-400/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/15",
                      formButtonPrimary: "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-cyan-500/25",
                      footerActionLink: "text-cyan-300 hover:text-cyan-200 transition-colors duration-300",
                      identityPreviewText: "text-white/80",
                      identityPreviewEditButton: "text-cyan-300 hover:text-cyan-200",
                      formFieldSuccessText: "text-green-300",
                      formFieldErrorText: "text-red-300",
                      alertText: "text-red-300",
                      formFieldHintText: "text-white/60",
                      otpCodeFieldInput: "bg-white/10 border-white/20 text-white focus:border-cyan-400 focus:ring-cyan-400/50",
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

          {/* Progress indicators */}
          <div className="flex justify-center mt-8 space-x-6">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="text-white/40 text-xs mt-1">LEARN</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="text-white/40 text-xs mt-1">GROW</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="text-white/40 text-xs mt-1">SUCCEED</div>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient knowledge particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-2/3 left-1/4 w-40 h-40 bg-teal-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Inspirational light rays */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-cyan-400 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-blue-400 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-teal-400 to-transparent animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        @keyframes knowledge-pulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.3),
                        0 0 40px rgba(59, 130, 246, 0.2),
                        0 0 60px rgba(20, 184, 166, 0.1);
          }
          50% { 
            box-shadow: 0 0 30px rgba(34, 211, 238, 0.5),
                        0 0 60px rgba(59, 130, 246, 0.3),
                        0 0 90px rgba(20, 184, 166, 0.2);
          }
        }
        
        .animate-knowledge-glow {
          animation: knowledge-pulse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}