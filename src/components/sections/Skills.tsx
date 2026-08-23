import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Ticker from '../ui/Ticker';

gsap.registerPlugin(ScrollTrigger);

const disciplines = [
  { num: '01', title: 'ARTIFICIAL INTELLIGENCE', sub: 'Neural nets · Model training · Inference pipelines' },
  { num: '02', title: 'MACHINE LEARNING', sub: 'Supervised · Unsupervised · Computer vision · NLP' },
  { num: '03', title: 'WEB DEVELOPMENT', sub: 'React · PHP · Full-stack platforms · REST APIs' },
  { num: '04', title: 'SOFTWARE DEVELOPMENT', sub: 'C · Python · System design · CLI tooling' },
  { num: '05', title: 'DATABASES', sub: 'MySQL · PostgreSQL · Schema design · Optimisation' },
];

const techTicker = [
  'PYTHON', 'REACT', 'JAVASCRIPT', 'PHP', 'MYSQL',
  'HTML', 'CSS', 'GIT', 'TENSORFLOW', 'OPENCV',
  'FASTAPI', 'FLASK', 'C', 'SQL',
];

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(
            [labelRef.current, headRef.current],
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }
          );
        },
      });

      // Each row — staggered slide
      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          onEnter: () => {
            gsap.fromTo(
              el,
              { y: 32, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out', delay: idx * 0.06 }
            );
          },
        });
      });
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative z-10 pt-28 md:pt-40 px-6 md:px-12 border-t border-grid"
      style={{ scrollMarginTop: '72px' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header row */}
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 md:col-span-5">
            <div ref={labelRef} className="flex items-center gap-4 mb-5 opacity-0">
              <span className="section-number">04</span>
              <div className="w-8 h-px bg-muted" />
              <span className="section-number">WHAT I WORK WITH</span>
            </div>
            <div ref={headRef} className="opacity-0">
              <h2
                className="font-display text-ink leading-[0.9]"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 6.5rem)', letterSpacing: '-0.025em' }}
              >
                SKILLS &<br />
                <span
                  style={{
                    WebkitTextStroke: '1.5px #0F0E0B',
                    color: 'transparent',
                  }}
                >
                  EXPERTISE
                </span>
              </h2>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 md:pl-8 flex items-end">
            <p className="font-body text-sm text-muted leading-relaxed max-w-md">
              Focused on AI/ML engineering and full-stack development,
              with a practical approach to building useful, scalable products.
            </p>
          </div>
        </div>

        {/* Discipline list */}
        <div>
          {disciplines.map((d, i) => (
            <div
              key={d.num}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="group border-t border-grid py-6 md:py-8 grid grid-cols-12 items-center gap-4 cursor-none opacity-0 transition-colors duration-300 hover:bg-ink/[0.015]"
            >
              {/* Number */}
              <div className="col-span-1 md:col-span-1">
                <span
                  className="font-display leading-none text-grid group-hover:text-accent transition-colors duration-300"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)', letterSpacing: '-0.02em' }}
                >
                  {d.num}
                </span>
              </div>

              {/* Title */}
              <div className="col-span-8 md:col-span-6">
                <h3
                  className="font-display text-ink leading-none group-hover:translate-x-3 transition-transform duration-300"
                  style={{ fontSize: 'clamp(1.4rem, 3vw, 3.8rem)', letterSpacing: '-0.015em' }}
                >
                  {d.title}
                </h3>
              </div>

              {/* Sub — visible only on md+ */}
              <div className="hidden md:flex col-span-5 items-center justify-end">
                <p className="font-body text-[0.7rem] text-muted leading-relaxed text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-48">
                  {d.sub}
                </p>
                {/* Arrow */}
                <span className="ml-4 text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  →
                </span>
              </div>

              {/* Mobile sub */}
              <p className="col-span-3 md:hidden font-body text-[0.6rem] text-muted leading-relaxed">
                {d.sub}
              </p>
            </div>
          ))}
          <div className="border-t border-grid" />
        </div>

        {/* Tech ticker */}
        <div className="mt-16 border-t border-b border-grid py-4">
          <Ticker
            items={techTicker}
            speed="normal"
            reverse
            className="font-body text-[0.62rem] font-medium tracking-[0.2em] uppercase text-muted"
            separator="—"
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;
