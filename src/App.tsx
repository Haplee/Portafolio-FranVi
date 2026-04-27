import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import SetupSection from '@/components/SetupSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import BackToTop from '@/components/BackToTop';
import { useLenis } from '@/hooks/useLenis';

export default function App() {
  useLenis();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <ScrollProgressBar />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <SetupSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
