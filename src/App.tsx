import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import StatsSection from '@/components/StatsSection';
import NowSection from '@/components/NowSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import TimelineSection from '@/components/TimelineSection';
import AchievementsSection from '@/components/AchievementsSection';
import SetupSection from '@/components/SetupSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import BackToTop from '@/components/BackToTop';
import Preloader from '@/components/Preloader';
import KonamiEffect from '@/components/KonamiEffect';
import ProjectOverlay from '@/components/ProjectOverlay';
import SectionDivider from '@/components/ui/SectionDivider';
import { useLenis } from '@/hooks/useLenis';
import type { GitHubRepo } from '@/hooks/useGitHubData';

export default function App() {
  useLenis();
  const [loaded, setLoaded] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <Preloader onComplete={() => setLoaded(true)} />

      {loaded && (
        <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
          <ScrollProgressBar />
          <Navbar />
          <main>
            <HeroSection />
            <SectionDivider variant="cancer" />
            <AboutSection />
            <SectionDivider variant="star" />
            <StatsSection />
            <SectionDivider variant="star" />
            <TimelineSection />
            <SectionDivider variant="line" />
            <NowSection />
            <SectionDivider variant="star" />
            <SkillsSection />
            <SectionDivider variant="line" />
            <ProjectsSection onSelectRepo={setSelectedRepo} />
            <SectionDivider variant="cancer" />
            <AchievementsSection />
            <SectionDivider variant="star" />
            <SetupSection />
            <SectionDivider variant="star" />
            <ContactSection />
          </main>
          <Footer />
          <BackToTop />
          <KonamiEffect />
          <ProjectOverlay repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
        </div>
      )}
    </MotionConfig>
  );
}
