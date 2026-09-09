import { Header } from "@/components/layout/Header";
import { MainContainer } from "@/components/layout/MainContainer";
import { HeroSection } from "@/components/hero/HeroSection";
import { IntroLoader } from "@/components/ui/IntroLoader";
import { MouseTrail } from "@/components/ui/MouseTrail";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ServicesSection } from "@/components/services/ServicesSection";

export default function Home() {
  return (
    <>
      <IntroLoader />
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
