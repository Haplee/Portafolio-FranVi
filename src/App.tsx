import { MotionConfig } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Opening from '@/components/Opening';
import ResolveCore from '@/components/ResolveCore';
import ProjectCatalog from '@/components/ProjectCatalog';
import Competencies from '@/components/Competencies';
import Timeline from '@/components/Timeline';
import Contact from '@/components/Contact';
import Closing from '@/components/Closing';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';
import BackToTop from '@/components/ui/BackToTop';

export default function App() {
    return (
        <MotionConfig reducedMotion="user">
            <ScrollProgressBar />
            <div id="top" className="min-h-screen bg-ink-900 text-fg">
                <Navbar />
                <main id="main">
                    <Opening />
                    <ResolveCore />
                    <ProjectCatalog />
                    <Competencies />
                    <Timeline />
                    <Contact />
                    <Closing />
                </main>
                <Footer />
                <BackToTop />
            </div>
        </MotionConfig>
    );
}
