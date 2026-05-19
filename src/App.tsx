import { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import TimelineSection from '@/components/TimelineSection';
import SetupSection from '@/components/SetupSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import BackToTop from '@/components/BackToTop';
import Preloader from '@/components/Preloader';
import SoundToggle from '@/components/SoundToggle';
import ProjectOverlay from '@/components/ProjectOverlay';
import { useLenis } from '@/hooks/useLenis';
import type { GitHubRepo } from '@/hooks/useGitHubData';

function Portfolio() {
  useLenis();
  const [loaded, setLoaded] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />

      {loaded && (
        <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
          <ScrollProgressBar />
          <Navbar />
          <main>
            <HeroSection />
            <AboutSection />
            <TimelineSection />
            <SkillsSection />
            <ProjectsSection onSelectRepo={setSelectedRepo} />
            <SetupSection />
            <ContactSection />
          </main>
          <Footer />
          <BackToTop />
          <SoundToggle />
          <ProjectOverlay repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
}
