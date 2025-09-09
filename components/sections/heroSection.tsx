"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TextEffect } from "../ui/textEffect";
import { AnimatedGroup } from "../ui/animatedGroup";
import { useTheme } from "next-themes";
import LaserFlow from "../LaserFlow";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function HeroSection() {
  const { theme } = useTheme();
  const revealImgRef = useRef<HTMLImageElement>(null);

  return (
    <>
      <main className="overflow-hidden">
        <section
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const el = revealImgRef.current;
            if (el) {
              el.style.setProperty("--mx", `${x}px`);
              el.style.setProperty("--my", `${y + rect.height * 0.5}px`);
            }
          }}
          onMouseLeave={() => {
            const el = revealImgRef.current;
            if (el) {
              el.style.setProperty("--mx", "-9999px");
              el.style.setProperty("--my", "-9999px");
            }
          }}
        >
          <div className="relative pt-24 md:pt-36">
            {/* LaserFlow Background */}
            <div className="absolute inset-0 -z-20">
              <LaserFlow
                horizontalBeamOffset={0.1}
                verticalBeamOffset={0.07}
                color="#FF79C6"
                wispDensity={1.8}
                fogIntensity={1.0}
                flowSpeed={0.5}
                verticalSizing={1.5}
                horizontalSizing={0.6}
              />
            </div>

            {/* Background gradient overlay */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full bg-gradient-to-b from-transparent from-35% to-background"
            />
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <Link
                    href="#link"
                    className="bg-muted hover:bg-muted/80 border-border/50 group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-foreground/5 transition-colors duration-300"
                  >
                    <span className="text-foreground text-sm">
                      Introducing Support for AI Models
                    </span>
                    <span className="border-border block h-4 w-0.5 border-l bg-foreground/20"></span>

                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3 text-foreground" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3 text-foreground" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedGroup>

                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="mx-auto mt-8 max-w-4xl text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem] text-foreground"
                >
                  Modern Solutions for Customer Engagement
                </TextEffect>
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground"
                >
                  Highly customizable components for building modern websites
                  and applications that look and feel the way you mean it.
                </TextEffect>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  <div
                    key={1}
                    className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border border-border/50 p-0.5"
                  >
                    <Button
                      asChild
                      size="lg"
                      className="rounded-xl px-5 text-base"
                    >
                      <Link href="#link">
                        <span className="text-nowrap">Start Building</span>
                      </Link>
                    </Button>
                  </div>
                  <Button
                    key={2}
                    asChild
                    size="lg"
                    variant="ghost"
                    className="h-10.5 rounded-xl px-5"
                  >
                    <Link href="#link">
                      <span className="text-nowrap">Request a demo</span>
                    </Link>
                  </Button>
                </AnimatedGroup>
              </div>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className=" relative -mr-56 overflow-hidden px-2 sm:mr-0 ">
                <div
                  aria-hidden
                  className="bg-gradient-to-b from-transparent from-35% to-background absolute inset-0 z-10"
                />
                <div
                  className="bg-background relative mx-auto w-full max-w-none overflow-hidden rounded-2xl  p-4 shadow-lg shadow-foreground/10 ring-1 ring-border/50 border-4 border-[#FF79C6] mt-[7.8%]"
                  style={{ maxWidth: "65vw" }}
                >
                  <Image
                    className="bg-background relative rounded-2xl"
                    src={
                      theme === "dark"
                        ? "/assets/images/dashboard-image-dark.svg"
                        : "/assets/images/dashboard-image-light.svg"
                    }
                    alt="Dashboard preview"
                    width="8000"
                    height="1200"
                  />
                </div>
              </div>
            </AnimatedGroup>

            {/* Reveal Image for LaserFlow effect - showing hero dashboard images */}
            <img
              ref={revealImgRef}
              src={
                theme === "dark"
                  ? "/assets/images/dashboard-image-dark.svg"
                  : "/assets/images/dashboard-image-light.svg"
              }
              alt="Dashboard reveal effect"
              style={
                {
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  top: "-50%",
                  left: "0",
                  zIndex: 5,
                  mixBlendMode: "lighten",
                  opacity: 0.4,
                  pointerEvents: "none",
                  "--mx": "-9999px",
                  "--my": "-9999px",
                  WebkitMaskImage:
                    "radial-gradient(circle at var(--mx) var(--my), rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.4) 60px, rgba(0,0,0,0.3) 120px, rgba(0,0,0,0.1) 180px, rgba(0,0,0,0) 240px)",
                  maskImage:
                    "radial-gradient(circle at var(--mx) var(--my), rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.4) 60px, rgba(0,0,0,0.3) 120px, rgba(0,0,0,0.1) 180px, rgba(0,0,0,0) 240px)",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                } as React.CSSProperties
              }
            />
          </div>
        </section>
        <section className="bg-background pb-16 pt-16 md:pb-32">
          <div className="group relative m-auto max-w-5xl px-6">
            <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
              <Link
                href="/"
                className="block text-sm text-muted-foreground duration-150 hover:opacity-75"
              >
                <span> Meet Our Customers</span>

                <ChevronRight className="ml-1 inline-block size-3" />
              </Link>
            </div>
            <div className="group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14">
              <div className="flex">
                <img
                  className="mx-auto h-5 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/nvidia.svg"
                  alt="Nvidia Logo"
                  height="20"
                  width="auto"
                />
              </div>

              <div className="flex">
                <img
                  className="mx-auto h-4 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/column.svg"
                  alt="Column Logo"
                  height="16"
                  width="auto"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-4 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/github.svg"
                  alt="GitHub Logo"
                  height="16"
                  width="auto"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-5 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/nike.svg"
                  alt="Nike Logo"
                  height="20"
                  width="auto"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-5 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                  alt="Lemon Squeezy Logo"
                  height="20"
                  width="auto"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-4 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/laravel.svg"
                  alt="Laravel Logo"
                  height="16"
                  width="auto"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-7 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/lilly.svg"
                  alt="Lilly Logo"
                  height="28"
                  width="auto"
                />
              </div>

              <div className="flex">
                <img
                  className="mx-auto h-6 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/openai.svg"
                  alt="OpenAI Logo"
                  height="24"
                  width="auto"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
