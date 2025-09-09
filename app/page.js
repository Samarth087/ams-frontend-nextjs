import HeroSection from "@/components/sections/heroSection";
import { PrismaticBackground } from "@/components/ui/prismaticBackground";

export default function HomePage() {
  return (
    <PrismaticBackground>
      <HeroSection />
    </PrismaticBackground>
  );
}
