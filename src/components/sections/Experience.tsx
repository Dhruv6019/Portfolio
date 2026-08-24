import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import MagneticButton from '../ui/MagneticButton';
import { ArrowUpRight, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    period: 'AUG 2026 → AUG 2029',
    title: 'B.Tech — Computer Science & Engineering (AI & ML)',
    institution: 'Adani University',
    type: 'Education',
  },
  {
    period: 'JUN 2023 → JUN 2026',
    title: 'Diploma — Information Technology',
    institution: 'L J Institute of Engineering and Technology (LJIET)',
    type: 'Education',
  },
];

const experience = [
  {
    period: 'Aug 2026 – Present',
    title: 'Web Development Intern',
    institution: 'Zidio Development · Remote, India',
    type: 'Internship',
    bullets: [
      'Building and improving responsive web applications',
      'Collaborating with the dev team on real-world projects',
      'Enhancing frontend/backend development skills',
    ],
  },
  {
    period: 'May 2025 – Jun 2025',
    title: 'React JS Trainee',
    institution: 'Elsner Technologies / ELDI · Hybrid, Ahmedabad',
    type: 'Internship',
    bullets: [
      '45-day React JS training at Elsner Learning & Development Institute',
      'Built interactive UIs; component-based & responsive design',
      'Completed with internship certificate',
    ],
  },
];

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          onEnter: () => {
            gsap.fromTo(
              el,
              { x: -30, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.07 }
            );
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderRows = (items: typeof experience | typeof education, offset: number) =>
    items.map((item, i) => (
      <div
        key={`${item.title}-${i}`}
        ref={(el) => { rowRefs.current[offset + i] = el; }}
        className="group border-t border-grid py-7 grid grid-cols-12 gap-4 items-start opacity-0"
      >
        <span className="col-span-3 font-body text-xs tracking-widest uppercase text-muted pt-1">
          {item.period}
        </span>
        <div className="col-span-7">
          <h4 className="font-display text-xl md:text-2xl text-ink leading-tight" style={{ letterSpacing: '-0.01em' }}>
            {item.title}
          </h4>
          <p className="font-body text-xs text-muted mt-2 tracking-wide">
            {item.institution}
          </p>
          {'bullets' in item && item.bullets && (
            <ul className="mt-3 space-y-1">
              {item.bullets.map((b) => (
                <li key={b} className="font-body text-[0.72rem] text-muted leading-relaxed flex items-start gap-2">
                  <span className="mt-[0.35rem] w-1 h-1 rounded-full bg-muted flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
        <span className="col-span-2 font-body text-[0.6rem] tracking-widest uppercase text-muted text-right pt-1">
          {item.type}
        </span>
      </div>
    ));

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative z-10 py-32 md:py-40 px-6 md:px-12 border-t border-grid"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-20">
          <span className="section-number">05</span>
          <div className="w-8 h-px bg-muted" />
          <span className="section-number">EDUCATION & EXPERIENCE</span>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Education */}
          <div>
            <h3 className="font-body text-[0.6rem] tracking-[0.3em] uppercase text-muted mb-6">
              EDUCATION
            </h3>
            {renderRows(education, 0)}
            <div className="border-t border-grid" />
          </div>

          {/* Experience */}
          <div>
            <h3 className="font-body text-[0.6rem] tracking-[0.3em] uppercase text-muted mb-6">
              WORK EXPERIENCE
            </h3>
            {renderRows(experience, education.length)}
            <div className="border-t border-grid" />
          </div>
        </div>

        {/* Premium Architectural Curriculum Vitae Card */}
        <div className="mt-20 relative overflow-hidden border border-grid bg-ink/[0.015] hover:bg-ink/[0.03] p-8 sm:p-10 md:p-12 transition-all duration-500 group">
          {/* Architectural corner crosshair accents */}
          <span className="absolute top-2 left-2 text-[0.65rem] font-mono text-muted/40 select-none">+</span>
          <span className="absolute top-2 right-2 text-[0.65rem] font-mono text-muted/40 select-none">+</span>
          <span className="absolute bottom-2 left-2 text-[0.65rem] font-mono text-muted/40 select-none">+</span>
          <span className="absolute bottom-2 right-2 text-[0.65rem] font-mono text-muted/40 select-none">+</span>

          {/* Subtle background texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #0F0E0B 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              {/* Header Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-emerald-600/30 bg-emerald-500/10 text-emerald-700 text-[0.58rem] font-mono tracking-widest uppercase font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  AVAILABLE FOR ROLES · 2026
                </span>
                <span className="font-body text-[0.58rem] tracking-[0.25em] uppercase text-accent font-semibold">
                  OFFICIAL DOSSIER
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-display text-2xl sm:text-3xl md:text-4xl text-ink leading-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                CURRICULUM VITAE & TECHNICAL DOSSIER
              </h3>

              {/* Description */}
              <p className="font-body text-xs sm:text-sm text-muted leading-relaxed max-w-2xl">
                Comprehensive profile covering B.Tech (AI & ML) at Adani University, Diploma IT at LJIET, industry experience at Zidio Development & Elsner, full-stack architectures, and verified credentials.
              </p>

              {/* Credential Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  'B.Tech AI & ML (Adani)',
                  'Diploma IT (LJIET)',
                  'Zidio Dev Intern',
                  'Elsner React Trainee',
                  'ATS-Optimized View',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[0.55rem] tracking-wider uppercase border border-grid px-2 py-0.5 text-muted bg-canvas/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Action Block */}
            <div className="lg:col-span-4 flex flex-col lg:items-end justify-center space-y-3 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-grid lg:pl-8">
              <span className="font-body text-[0.55rem] tracking-[0.2em] uppercase text-muted hidden lg:block">
                VERIFIED CANDIDATE PROFILE
              </span>

              <MagneticButton
                id="view-cv-button"
                onClick={() => {
                  window.location.hash = '/resume';
                }}
              >
                <FileText size={13} className="mr-1.5" />
                VIEW FULL RESUME / CV <ArrowUpRight size={12} className="ml-1" />
              </MagneticButton>

              <span className="font-body text-[0.55rem] text-muted tracking-wide flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-accent" />
                Interactive web view + formatted CV layout
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
