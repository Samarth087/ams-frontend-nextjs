// components/AuthPageWrapperWithTransition.tsx
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const backgroundVariants = {
  hidden: { y: "-100%", opacity: 0 },
  enter: { y: 0, opacity: 1 },
  exit: { y: "-100%", opacity: 0 },
};

const drawerVariants = {
  hidden: { x: "-100%", opacity: 0 },
  enter: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

const contentVariants = {
  hidden: { opacity: 0, x: 20 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export default function AuthPageWrapperWithTransition({
  children,
  onTransitionTo,
}: {
  children: React.ReactNode;
  onTransitionTo?: (route: string) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Handle browser back button
  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsExiting(true);
      setIsVisible(false);
    };

    const handlePopState = () => {
      setIsExiting(true);
      setIsVisible(false);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleExit = () => {
    setIsExiting(true);
    // Start exit animations
    setIsVisible(false);

    // Navigate back after animations complete
    setTimeout(() => {
      router.push("/");
    }, 1500); // Total exit animation duration
  };

  const handleTransitionTo = (route: string) => {
    if (onTransitionTo) {
      setIsTransitioning(true);
      // Start transition animations
      setIsVisible(false);

      // Navigate after animations complete
      setTimeout(() => {
        onTransitionTo(route);
      }, 800); // Transition duration
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 80,
        mass: 0.8,
        duration: 1.2,
      }}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Image Animation - slides from top */}
      <motion.div
        variants={backgroundVariants}
        initial="hidden"
        animate={isVisible ? "enter" : "hidden"}
        exit="exit"
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 70,
          mass: 1.0,
          duration: 1.2,
          delay: isExiting ? 0.5 : 0, // Background exits after drawer when leaving
        }}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')",
          backgroundPosition: "center center",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Login Drawer Animation - slides from left after background */}
      <motion.div
        variants={drawerVariants}
        initial="hidden"
        animate={isVisible ? "enter" : "hidden"}
        exit="exit"
        transition={{
          type: "spring",
          damping: 18,
          stiffness: 75,
          mass: 0.8,
          delay: isExiting ? 0 : 0.6, // Drawer exits first when leaving, enters after background when arriving
          duration: 1.2,
        }}
        className="absolute top-0 left-0 w-[40%] h-full bg-white/95 backdrop-blur-sm shadow-2xl border-r border-gray-200"
      >
        <div className="h-full flex flex-col">
          {/* Add exit button */}
          <div className="p-4">
            <button
              onClick={handleExit}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back
            </button>
          </div>
          <div className="flex-1">
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate={isVisible ? "enter" : "hidden"}
              exit="exit"
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 80,
                mass: 0.9,
                delay: isVisible ? 0.8 : 0,
                duration: 1.2,
              }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
