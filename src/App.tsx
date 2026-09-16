import { MotionConfig } from 'motion/react';
import Navbar from '@/components/Navbar';
import BentoGrid from '@/components/BentoGrid';
import Footer from '@/components/Footer';

// Arquitectura Bento Grid de Ingeniería:
// En lugar de una plantilla lineal de 5 secciones verticales separadas,
// todos los módulos clave (Identidad & Spec, Caso Insignia ResolveCore,
// Catálogo de Proyectos, Competencias, Trayectoria y Mapa de Disponibilidad)
// conviven en una cuadrícula asimétrica de alta densidad técnica con bordes planos de 1 px.
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div id="top" className="min-h-screen bg-ink-900 text-fg selection:bg-accent selection:text-ink-900">
        <Navbar />
        <main id="main">
          <BentoGrid />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
