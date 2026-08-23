import React, { useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import GridLines from './components/ui/GridLines';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import ProjectDetail from './components/pages/ProjectDetail';
import NotFoundGame from './components/pages/NotFoundGame';
import ResumeView from './components/pages/ResumeView';
import { projectsData } from './data/projects';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [is404, setIs404] = useState<boolean>(false);
  const [isResume, setIsResume] = useState<boolean>(false);

  // Sync with URL hash for deep linking, resume, and 404 error catch-all
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash || '';
      const cleanHash = rawHash.replace(/^#\/?/, '').trim();

      // Empty or standard in-page anchor navigation (Home sections)
      const validAnchors = ['', 'hero', 'about', 'projects', 'skills', 'experience', 'contact'];
      if (validAnchors.includes(cleanHash)) {
        setActiveProjectId(null);
        setIs404(false);
        setIsResume(false);
        return;
      }

      // Resume route
      if (cleanHash === 'resume') {
        setActiveProjectId(null);
        setIs404(false);
        setIsResume(true);
        return;
      }

      // Explore shortcut
      if (cleanHash === 'explore') {
        setActiveProjectId('loop');
        setIs404(false);
        setIsResume(false);
        return;
      }

      // Valid project detail route (e.g. project/loop or project/petsphere)
      if (cleanHash.startsWith('project/')) {
        let id = cleanHash.replace('project/', '').replace(/\/$/, '').trim();
        if (id === 'neural-lens') id = 'loop';
        if (id === 'brickbybrick') id = 'petsphere';

        const exists = projectsData.some((p) => p.id === id);
        if (exists) {
          setActiveProjectId(id);
          setIs404(false);
          setIsResume(false);
        } else {
          setActiveProjectId(null);
          setIsResume(false);
          setIs404(true);
        }
        return;
      }

      // Any other unknown route / broken link -> Show Gaming 404
      setActiveProjectId(null);
      setIsResume(false);
      setIs404(true);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  const handleExploreProject = (id: string) => {
    let targetId = id;
    if (targetId === 'neural-lens') targetId = 'loop';
    if (targetId === 'brickbybrick') targetId = 'petsphere';
    setActiveProjectId(targetId);
    setIs404(false);
    setIsResume(false);
    window.location.hash = `/project/${targetId}`;
  };

  const handleBackToPortfolio = () => {
    window.location.hash = '';
    setActiveProjectId(null);
    setIs404(false);
    setIsResume(false);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  useEffect(() => {
    if (!loaded || activeProjectId || is404 || isResume) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const rafFn = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafFn);
    };
  }, [loaded, activeProjectId, is404, isResume]);

  return (
    <>
      <Cursor />
      {!loaded && <Loader onComplete={handleLoaderComplete} />}

      {loaded && (
        <>
          {isResume ? (
            <ResumeView onBack={handleBackToPortfolio} />
          ) : is404 ? (
            <NotFoundGame onGoHome={handleBackToPortfolio} />
          ) : activeProjectId ? (
            <ProjectDetail
              projectId={activeProjectId}
              onBack={handleBackToPortfolio}
              onSelectProject={handleExploreProject}
            />
          ) : (
            <div className="relative bg-canvas min-h-screen">
              <GridLines />
              <Navbar />

              <main>
                <Hero />
                <About />
                <Projects onExploreProject={handleExploreProject} />
                <Skills />
                <Experience />
                <Contact />
              </main>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default App;
