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

export default function App() {
    return (
        <MotionConfig reducedMotion="user">
            <div id="top" className="min-h-screen bg-ink-900 text-fg selection:bg-accent selection:text-ink-900">
                <Navbar />
                <main id="main" className="pb-24 md:pb-0">
                    <Opening />
                    <ResolveCore />
                    <ProjectCatalog />
                    <Competencies />
                    <Timeline />
                    <Contact />
                    <Closing />
                </main>
                <Footer />
            </div>
        </MotionConfig>
    );
}
