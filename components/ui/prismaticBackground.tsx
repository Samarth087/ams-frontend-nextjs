"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface PrismaticBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function PrismaticBackground({
  children,
  className = "",
}: PrismaticBackgroundProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div
        className={`min-h-screen w-full relative bg-background ${className}`}
      >
        {children}
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className={`min-h-screen w-full relative bg-background ${className}`}>
      {/* Prismatic Aurora Burst - Multi-layered Gradient */}
      <div
        className="absolute inset-0 z-0 prismatic-shift"
        style={{
          background: isDark
            ? `
              radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
              radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
              radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
              radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
              #000000
            `
            : `
              radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.08), transparent 50%),
              radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.06), transparent 60%),
              radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.1), transparent 65%),
              radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.05), transparent 40%),
              #ffffff
            `,
        }}
      />

      {/* Animated floating orbs for extra visual appeal */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-400/30 rounded-full floating-orb"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-cyan-400/40 rounded-full floating-orb"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-400/50 rounded-full floating-orb"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-2.5 h-2.5 bg-yellow-400/20 rounded-full floating-orb"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-3/4 left-1/2 w-1.5 h-1.5 bg-blue-400/25 rounded-full floating-orb"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/6 w-1 h-1 bg-green-400/35 rounded-full floating-orb"
          style={{ animationDelay: "5s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
