import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  { label: 'Computer Vision', num: '01' },
  { label: 'Machine Learning', num: '02' },
  { label: 'Generative AI', num: '03' },
  { label: 'API Development', num: '04' },
  { label: 'Data Pipelines', num: '05' },
  { label: 'Intelligent Automation', num: '06' },
];

const AIIdentity: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Single unified timeline with single pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      });

      tl.fromTo(line1Ref.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, 0)
        .fromTo(line2Ref.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, 0.15)
        .fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.25, ease: 'power2.out' }, 0.35)
        .fromTo(capRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35 }, 0.45);
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ai-identity"
      ref={sectionRef}
      className="relative z-10 h-screen flex flex-col items-start justify-center overflow-hidden bg-ink px-8 md:px-16"
      style={{ scrollMarginTop: '72px' }}
      aria-label="AI identity"
    >
      {/* Faint vertical grid on dark background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 border-r border-canvas/[0.04]"
            style={{ left: `${(i + 1) * (100 / 12)}%` }}
          />
        ))}
      </div>

      {/* Subtle accent glow — top right */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle at top right, #E8432D, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl w-full">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-body text-[0.55rem] tracking-[0.3em] uppercase text-canvas/30">05</span>
          <div className="w-6 h-px bg-canvas/20" />
          <span className="font-body text-[0.55rem] tracking-[0.3em] uppercase text-canvas/30">AI IDENTITY</span>
        </div>

        {/* Line 1 — solid */}
        <div
          ref={line1Ref}
          className="font-display text-canvas leading-[0.85] opacity-0"
          style={{ fontSize: 'clamp(3rem, 8.5vw, 11rem)', letterSpacing: '-0.025em' }}
        >
          I DON'T JUST
        </div>

        {/* Line 2 — outline accent */}
        <div
          ref={line2Ref}
          className="font-display leading-[0.85] opacity-0"
          style={{
            fontSize: 'clamp(3rem, 8.5vw, 11rem)',
            letterSpacing: '-0.025em',
            WebkitTextStroke: '2px #E8432D',
            color: 'transparent',
          }}
        >
          USE AI. I BUILD WITH IT.
        </div>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="w-full h-px bg-canvas/15 mt-12 mb-10 origin-left"
          style={{ transform: 'scaleX(0)' }}
        />

        {/* Capabilities grid */}
        <div
          ref={capRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-0 opacity-0"
        >
          {capabilities.map((cap) => (
            <div
              key={cap.label}
              className="group flex items-center gap-3 py-3.5 border-t border-canvas/[0.08] hover:border-accent transition-colors duration-300"
            >
              <span className="font-body text-[0.52rem] tracking-[0.2em] text-canvas/25 group-hover:text-accent/60 transition-colors duration-300">
                {cap.num}
              </span>
              <span className="font-body text-[0.72rem] tracking-[0.12em] uppercase font-medium text-canvas/60 group-hover:text-canvas transition-colors duration-300">
                {cap.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-canvas/10" />
    </section>
  );
};

export default AIIdentity;
