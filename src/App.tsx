import { MotionConfig } from 'motion/react';
import Navbar from '@/components/Navbar';
import Opening from '@/components/Opening';
import CaseStudy from '@/components/CaseStudy';
import Competencies from '@/components/Competencies';
import Path from '@/components/Path';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Cinco secciones, en el orden en que un jefe de sistemas se hace las
// preguntas: qué eres → qué has construido → qué sabes hacer → de dónde
// vienes → cómo te escribo. Sin preloader (bloqueaba 4,4 s), sin divisores
// (la separación la hace el espacio) y sin scroll sintético.
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div id="top" className="min-h-screen bg-ink-900 text-fg">
        <Navbar />
        <main id="main">
          <Opening />
          <CaseStudy />
          <Competencies />
          <Path />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
