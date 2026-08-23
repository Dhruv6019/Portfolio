import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import MagneticButton from '../ui/MagneticButton';
import { ArrowUpRight, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    period: '2026 → NOW',
    title: 'B.Tech — Artificial Intelligence & Machine Learning',
    institution: 'Gujarat Technological University',
    type: 'Education',
  },
  {
    period: '2023 → 2026',
    title: 'Diploma — Information Technology',
    institution: 'Gujarat Technological University',
    type: 'Education',
  },
];

const experience = [
  {
    period: '2025',
    title: 'Full-Stack Development Projects',
    institution: 'Independent / Freelance',
    type: 'Projects',
  },
  {
    period: '2024',
    title: 'AI/ML Application Development',
    institution: 'Academic Projects',
    type: 'Projects',
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

  const renderRows = (items: typeof education, offset: number) =>
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
              PROJECTS & EXPERIENCE
            </h3>
            {renderRows(experience, education.length)}
            <div className="border-t border-grid" />
          </div>
        </div>

        {/* View Full Curriculum Vitae Button */}
        <div className="mt-16 pt-10 border-t border-grid flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="font-body text-[0.62rem] tracking-[0.25em] font-semibold uppercase text-accent block mb-1">
              CURRICULUM VITAE
            </span>
            <p className="font-body text-xs text-muted max-w-md">
              Complete academic history, technical proficiencies, project architectures, and certifications.
            </p>
          </div>

          <div>
            <MagneticButton
              onClick={() => {
                window.location.hash = '/resume';
              }}
            >
              <FileText size={13} className="mr-1" />
              VIEW FULL RESUME / CV <ArrowUpRight size={12} />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
