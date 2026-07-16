import { Header } from "@/components/layout/Header";
import { MainContainer } from "@/components/layout/MainContainer";
import { HeroSection } from "@/components/hero/HeroSection";
import { MouseTrail } from "@/components/ui/MouseTrail";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ServicesSection } from "@/components/services/ServicesSection";

export default function Home() {
  return (
    <>
      <MouseTrail />
      <MainContainer>
        <Header />
        <HeroSection />
        <SkillsSection />
        <ServicesSection />
      </MainContainer>
    </>
  );
}
