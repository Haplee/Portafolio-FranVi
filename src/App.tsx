import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import SetupSection from '@/components/SetupSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
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
    </div>
  );
}

