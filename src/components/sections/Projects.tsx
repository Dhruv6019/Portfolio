import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../ui/MagneticButton';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import type { ProjectItem } from '../../data/projects';
import { projectsData } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

// Visual panel component
const ProjectVisual: React.FC<{ project: ProjectItem }> = ({ project }) => {
  const isLight =
    project.bg.startsWith('#F') ||
    project.bg.startsWith('#f') ||
    project.id === 'carvo' ||
    project.id === 'loop' ||
    project.id === 'petsphere';

  return (
    <div
      className="w-full h-full relative overflow-hidden flex items-center justify-center min-h-[380px] md:min-h-full border-l border-grid"
      style={{ background: project.bg }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `radial-gradient(circle, ${isLight ? '#0F0E0B' : project.accentColor} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />
      {/* Radial glow */}
      {!isLight && (
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            background: `radial-gradient(ellipse at 60% 40%, ${project.accentColor}, transparent 65%)`,
          }}
        />
      )}
      {/* Horizontal accent line */}
      <div
        className="absolute left-0 right-0 h-px opacity-[0.15]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${isLight ? '#0F0E0B' : project.accentColor} 50%, transparent 100%)`,
        }}
      />

      {/* Preview screenshot/logo (if provided) */}
      {project.previewImage ? (
        project.previewStyle === 'contain' ? (
          // Logo illustration centered seamlessly inside the panel
          <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12 z-0">
            <img
              src={project.previewImage}
              alt={`${project.name} logo`}
              className="max-w-[90%] max-h-[82%] sm:max-w-[440px] md:max-w-[500px] w-auto h-auto object-contain
                         group-hover:scale-[1.04] transition-transform duration-700 select-none pointer-events-none"
            />
          </div>
        ) : (
          // Full-cover screenshot — focus right where content usually lives
          <div className="absolute inset-0">
            <img
              src={project.previewImage}
              alt={`${project.name} preview`}
              className="w-full h-full object-cover object-right-top
                         group-hover:scale-[1.04] transition-all duration-700"
            />
            {/* Multi-direction overlay: dark on edges, clear in center */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0) 70%)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 40%)',
              }}
            />
          </div>
        )
      ) : null}

      {/* Top-left tag */}
      <div className="absolute top-8 left-8 flex flex-col gap-1.5 z-10">
        <span
          className="font-body text-[0.52rem] tracking-[0.28em] uppercase font-semibold"
          style={{
            color: isLight
              ? 'rgba(15,14,11,0.55)'
              : project.previewImage
              ? 'rgba(255,255,255,0.7)'
              : `${project.accentColor}85`,
          }}
        >
          PROJECT {project.number}
        </span>
        <span
          className="font-display text-base tracking-wider leading-none"
          style={{
            color: isLight ? '#0F0E0B' : project.previewImage ? '#ffffff' : `${project.accentColor}65`,
          }}
        >
          {project.name}
        </span>
      </div>

      {/* Ghost number watermark */}
      <span
        className="absolute select-none font-display leading-none pointer-events-none z-0"
        style={{
          fontSize: 'clamp(6rem, 18vw, 20rem)',
          letterSpacing: '-0.05em',
          color: 'transparent',
          WebkitTextStroke: isLight ? '1px rgba(15,14,11,0.06)' : `1px ${project.accentColor}25`,
          bottom: '-0.1em',
          right: '-0.02em',
        }}
        aria-hidden
      >
        {project.number}
      </span>

      {/* Tech count */}
      <div className="absolute bottom-8 right-8 text-right z-10">
        <span
          className="font-body text-[0.52rem] tracking-[0.28em] uppercase font-semibold"
          style={{
            color: isLight
              ? 'rgba(15,14,11,0.45)'
              : project.previewImage
              ? 'rgba(255,255,255,0.7)'
              : `${project.accentColor}60`,
          }}
        >
          {project.tech.length} TECHNOLOGIES
        </span>
      </div>
    </div>
  );
};

interface ProjectsProps {
  onExploreProject?: (id: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onExploreProject }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showAll, setShowAll] = React.useState(false);

  const visibleProjects = showAll ? projectsData : projectsData.slice(0, 3);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        projectRefs.current.forEach((el) => {
          if (!el) return;

          const imageEl = el.querySelector<HTMLElement>('.proj-image');
          const numEl = el.querySelector<HTMLElement>('.proj-number');
          const titleEl = el.querySelector<HTMLElement>('.proj-title');
          const taglineEl = el.querySelector<HTMLElement>('.proj-tagline');
          const descEl = el.querySelector<HTMLElement>('.proj-desc');
          const techEl = el.querySelector<HTMLElement>('.proj-tech');
          const btnEl = el.querySelector<HTMLElement>('.proj-btn');

          // Smooth reveal as the card scrolls into view (no blank gaps)
          ScrollTrigger.create({
            trigger: el,
            start: 'top 80%',
            onEnter: () => {
              gsap.fromTo(
                [numEl, titleEl],
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1 }
              );
              gsap.fromTo(
                imageEl,
                { clipPath: 'inset(20% 0 0 0)', opacity: 0.8 },
                { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 0.9, ease: 'power3.out' }
              );
              gsap.fromTo(
                [taglineEl, descEl, techEl, btnEl],
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.08, delay: 0.2 }
              );
            },
          });
        });
      }, sectionRef.current || undefined);

      return () => ctx.revert();
    });

    return () => cancelAnimationFrame(frameId);
  }, [showAll]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 border-t border-grid"
      style={{ scrollMarginTop: '72px' }}
    >
      {/* Editorial Section Header with Project Index Matrix (No Blank Space) */}
      <div className="px-6 md:px-12 pt-20 pb-16 bg-canvas">
        <div className="max-w-7xl mx-auto">
          {/* Label + Count */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="section-number">03</span>
              <div className="w-8 h-px bg-muted" />
              <span className="section-number">FEATURED WORK</span>
            </div>
            <span className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-muted">
              {projectsData.length} PRODUCTION BUILDS
            </span>
          </div>

          {/* Main Headline */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pb-12 border-b border-grid">
            <div className="md:col-span-8">
              <h2
                className="font-display text-ink leading-[0.88]"
                style={{ fontSize: 'clamp(3rem, 7.5vw, 8.5rem)', letterSpacing: '-0.025em' }}
              >
                SELECTED
                <br />
                <span
                  style={{
                    WebkitTextStroke: '2px #0F0E0B',
                    color: 'transparent',
                  }}
                >
                  PROJECTS
                </span>
              </h2>
            </div>

            <div className="md:col-span-4 flex flex-col justify-end space-y-4">
              <p className="font-body text-xs md:text-sm text-ink-light leading-relaxed">
                A curation of machine learning systems, 3D WebGL architectures, and full-stack software products built for performance.
              </p>
              <div className="flex items-center gap-2 text-accent font-body text-[0.6rem] tracking-[0.2em] uppercase font-semibold">
                <span>SCROLL TO EXPLORE ARCHITECTURE</span>
                <ArrowDown size={12} className="animate-bounce" />
              </div>
            </div>
          </div>

          {/* Quick Project Directory Index Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-6">
            {projectsData.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  if (onExploreProject) {
                    onExploreProject(p.id);
                  } else {
                    window.location.hash = `/project/${p.id}`;
                  }
                }}
                className="group border border-grid p-4 text-left hover:border-ink hover:bg-ink/[0.02] transition-all duration-300 cursor-none"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-lg text-grid group-hover:text-accent transition-colors">
                    {p.number}
                  </span>
                  <span className="font-body text-[0.55rem] text-muted uppercase tracking-wider group-hover:text-accent transition-colors">
                    <ArrowUpRight size={10} className="inline opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </div>
                <span className="font-display text-sm text-ink block truncate group-hover:text-accent transition-colors">
                  {p.name}
                </span>
                <span className="font-body text-[0.58rem] text-muted block truncate mt-1">
                  {p.category.split('/')[0]}
                </span>
              </button>
            ))}

            {/* Coming Soon placeholder cards to fill remaining grid slots */}
            {[
              { label: 'IN DEVELOPMENT', hint: 'Next full-stack build' },
              { label: 'COMING SOON', hint: 'AI / ML experiment' },
              { label: 'COMING SOON', hint: 'Mobile-first product' },
            ].map((slot, i) => (
              <div
                key={`soon-${i}`}
                className="border border-dashed border-grid p-4 flex flex-col justify-between opacity-50"
                style={{ borderStyle: 'dashed' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted animate-pulse" />
                  </span>
                  <span className="font-body text-[0.5rem] tracking-[0.2em] uppercase text-muted">
                    {slot.label}
                  </span>
                </div>
                <span className="font-display text-sm text-muted block">
                  TBA
                </span>
                <span className="font-body text-[0.55rem] text-muted block mt-1 italic">
                  {slot.hint}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Panels */}
      <div className="space-y-0">
        {visibleProjects.map((project, idx) => (
          <div
            key={project.name}
            ref={(el) => { projectRefs.current[idx] = el; }}
            className="relative w-full border-t border-grid min-h-[90vh] md:min-h-screen flex items-center bg-canvas"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full min-h-[90vh] md:min-h-screen">

              {/* Left — Info panel */}
              <div className="flex flex-col justify-between px-8 md:px-16 py-12 md:py-16 z-10 bg-canvas">

                {/* Number */}
                <div className="proj-number">
                  <span
                    className="font-display leading-none text-grid select-none block"
                    style={{ fontSize: 'clamp(3.5rem, 8vw, 7.5rem)', letterSpacing: '-0.03em' }}
                  >
                    {project.number}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="flex-1 flex flex-col justify-center py-6">
                  <h3
                    className="proj-title font-display text-ink leading-[0.88]"
                    style={{
                      fontSize: 'clamp(2.8rem, 5.5vw, 6.5rem)',
                      letterSpacing: '-0.025em',
                    }}
                  >
                    {project.name}
                  </h3>

                  <p
                    className="proj-tagline font-body text-[0.62rem] tracking-[0.22em] uppercase mt-3 mb-5 font-semibold"
                    style={{ color: project.accentColor }}
                  >
                    {project.tagline}
                  </p>

                  <p className="proj-desc font-body text-[0.88rem] text-ink-light leading-[1.75] max-w-md">
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags + CTA Button */}
                <div className="space-y-5">
                  <div className="proj-tech flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-body text-[0.58rem] font-medium tracking-[0.14em] uppercase border px-2.5 py-1 text-muted"
                        style={{ borderColor: '#D9D5CA' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="proj-btn pt-2">
                    <MagneticButton
                      id={`project-btn-${idx}`}
                      onClick={() => {
                        if (onExploreProject) {
                          onExploreProject(project.id);
                        } else {
                          window.location.hash = `/project/${project.id}`;
                        }
                      }}
                    >
                      EXPLORE PROJECT <ArrowUpRight size={12} />
                    </MagneticButton>
                  </div>
                </div>
              </div>

              {/* Right — Visual Graphic Panel */}
              <div
                className="proj-image relative overflow-hidden"
              >
                <ProjectVisual project={project} />
              </div>
            </div>

            {/* Bottom border separator */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-grid" />
          </div>
        ))}
      </div>

      {/* View All / Show Less Toggle */}
      <div className="border-t border-grid px-6 md:px-12 py-16 bg-canvas">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-body text-[0.62rem] tracking-[0.25em] font-semibold uppercase text-accent block mb-1">
              {showAll ? 'SHOWING ALL PROJECTS' : `+${projectsData.length - 3} MORE PROJECTS`}
            </span>
            <p className="font-body text-xs text-muted max-w-md">
              {showAll
                ? 'Scroll up to revisit any project or explore the full case study.'
                : 'BrickByBrick, Fixora, Votely, MetaCal and more — full-stack, real estate, home services & AI.'}
            </p>
          </div>
          <MagneticButton
            id="view-all-projects-btn"
            onClick={() => {
              setShowAll((prev) => !prev);
              if (showAll) {
                // Scroll back to projects section top when collapsing
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {showAll ? 'SHOW LESS' : `VIEW ALL ${projectsData.length} PROJECTS`} <ArrowUpRight size={12} />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default Projects;
