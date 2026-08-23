import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Ticker from '../ui/Ticker';

gsap.registerPlugin(ScrollTrigger);

const stackItems = [
  'PYTHON', 'C', 'PHP', 'JAVASCRIPT',
  'REACT', 'SQL', 'AI', 'ML',
  'HTML', 'CSS', 'GIT', 'MYSQL',
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

          tl.fromTo(labelRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 0)
            .fromTo(line1Ref.current, { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, 0.1)
            .fromTo(line2Ref.current, { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, 0.18)
            .fromTo(line3Ref.current, { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, 0.26)
            .fromTo(dividerRef.current, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 0.8 }, 0.5)
            .fromTo(paraRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, 0.65)
            .fromTo(statsRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, 0.75);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 pt-28 md:pt-40 pb-0 px-6 md:px-12 border-t border-grid"
      style={{ scrollMarginTop: '72px' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div ref={labelRef} className="flex items-center gap-4 mb-14 opacity-0">
          <span className="section-number">02</span>
          <div className="w-8 h-px bg-muted" />
          <span className="section-number">ABOUT</span>
        </div>

        {/* Main layout — statement left, stats right */}
        <div className="grid grid-cols-12 gap-6">
          {/* Statement — spans 8 cols */}
          <div className="col-span-12 md:col-span-8">
            {/* Each line clips independently for a staggered feel */}
            <div className="overflow-hidden">
              <div
                ref={line1Ref}
                className="font-display text-ink leading-[0.88] opacity-0"
                style={{ fontSize: 'clamp(2.8rem, 7.5vw, 9.5rem)', letterSpacing: '-0.025em' }}
              >
                I BUILD
              </div>
            </div>
            <div className="overflow-hidden">
              <div
                ref={line2Ref}
                className="font-display leading-[0.88] opacity-0"
                style={{
                  fontSize: 'clamp(2.8rem, 7.5vw, 9.5rem)',
                  letterSpacing: '-0.025em',
                  WebkitTextStroke: '2px #0F0E0B',
                  color: 'transparent',
                }}
              >
                SOFTWARE
              </div>
            </div>
            <div className="overflow-hidden">
              <div
                ref={line3Ref}
                className="font-display text-ink leading-[0.88] opacity-0"
                style={{ fontSize: 'clamp(2.8rem, 7.5vw, 9.5rem)', letterSpacing: '-0.025em' }}
              >
                THAT MATTERS.
              </div>
            </div>

            <div
              ref={dividerRef}
              className="w-full h-px bg-grid mt-10 mb-8 origin-left"
              style={{ transform: 'scaleX(0)' }}
            />

            <p
              ref={paraRef}
              className="font-body text-base md:text-[1.05rem] text-ink-light leading-[1.75] max-w-lg opacity-0"
            >
              Diploma-to-degree AI/ML student focused on building intelligent
              applications, web platforms and practical software products.
              I care deeply about the intersection of engineering precision
              and thoughtful product design.
            </p>
          </div>

          {/* Stats — spans 4 cols, right-aligned */}
          <div
            ref={statsRef}
            className="col-span-12 md:col-span-4 flex flex-col justify-end gap-0 opacity-0 md:pl-8"
          >
            {[
              { val: '5+', label: 'Projects Shipped' },
              { val: '3+', label: 'Years Building' },
              { val: 'GTU', label: 'B.Tech AI & ML' },
            ].map((stat, j) => (
              <div
                key={j}
                className="border-t border-grid py-7 group hover:border-accent transition-colors duration-300"
              >
                <div
                  className="font-display text-ink leading-none mb-1 group-hover:text-accent transition-colors duration-300"
                  style={{ fontSize: 'clamp(2.8rem, 5vw, 5.5rem)', letterSpacing: '-0.03em' }}
                >
                  {stat.val}
                </div>
                <div className="font-body text-[0.62rem] tracking-[0.18em] uppercase text-muted">
                  {stat.label}
                </div>
              </div>
            ))}

            <div className="border-t border-grid pt-5">
              <a
                href="#/resume"
                className="font-body text-[0.65rem] tracking-[0.2em] font-semibold uppercase text-ink hover:text-accent transition-colors inline-flex items-center gap-1.5 cursor-none"
              >
                <span>VIEW FULL RESUME / CV</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Stack ticker — full width below */}
        <div className="mt-16 border-t border-b border-grid py-4">
          <div className="flex items-center gap-4 mb-0">
          </div>
          <Ticker
            items={stackItems}
            speed="normal"
            className="font-display text-2xl md:text-3xl text-ink tracking-wider"
            separator="/"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
