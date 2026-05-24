import { useCallback } from "react";
import FloatingScene from "../components/FloatingScene";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";
import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";
import Navbar from "../components/Navbar";

const Index = () => {
  const handleGetStarted = useCallback(() => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <div className="fixed inset-0 z-0">
        <FloatingScene />
      </div>

      <Navbar />

      <div id="home">
        <HeroSection onGetStarted={handleGetStarted} />
      </div>

      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

export default Index;