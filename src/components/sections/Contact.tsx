import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Mail } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../ui/Icons';

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  {
    label: 'EMAIL',
    value: 'dhruvteli6019@gmail.com',
    href: 'mailto:dhruvteli6019@gmail.com',
    icon: Mail,
    id: 'contact-email',
  },
  {
    label: 'LINKEDIN',
    value: '/in/dhruvteli6019',
    href: 'https://www.linkedin.com/in/dhruvteli6019/',
    icon: LinkedinIcon,
    id: 'contact-linkedin',
  },
  {
    label: 'GITHUB',
    value: '/Dhruv6019',
    href: 'https://github.com/Dhruv6019',
    icon: GithubIcon,
    id: 'contact-github',
  },
];

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);
  const linksRef = useRef<HTMLDivElement>(null);

  const words = ["LET'S BUILD", 'SOMETHING', 'USEFUL.'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      words.forEach((_, i) => {
        const el = wordRefs.current[i];
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              el,
              { y: 80, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
              {
                y: 0,
                opacity: 1,
                clipPath: 'inset(0% 0 0 0)',
                duration: 1,
                ease: 'power4.out',
                delay: i * 0.12,
              }
            );
          },
        });
      });

      ScrollTrigger.create({
        trigger: linksRef.current,
        start: 'top 88%',
        onEnter: () => {
          gsap.fromTo(
            linksRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
          );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 pt-32 md:pt-40 border-t border-grid"
    >
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-20">
          <span className="section-number">06</span>
          <div className="w-8 h-px bg-muted" />
          <span className="section-number">CONTACT</span>
        </div>

        {/* Giant CTA words */}
        <div className="space-y-[-0.1em]">
          {words.map((word, i) => (
            <div
              key={word}
              ref={(el) => { wordRefs.current[i] = el; }}
              className="overflow-hidden opacity-0"
            >
              <div
                className="font-display text-ink leading-[0.88]"
                style={{
                  fontSize: 'clamp(4rem, 13vw, 16rem)',
                  letterSpacing: '-0.03em',
                  ...(word === 'USEFUL.' ? {
                    WebkitTextStroke: '2px #0F0E0B',
                    color: 'transparent',
                  } : {}),
                }}
              >
                {word}
              </div>
            </div>
          ))}
        </div>

        {/* Contact links */}
        <div ref={linksRef} className="mt-20 space-y-0 opacity-0">
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                id={link.id}
                href={link.href}
                target={link.label !== 'EMAIL' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between border-t border-grid py-6 md:py-8 transition-colors duration-300 cursor-none overflow-hidden"
              >
                {/* Hover fill from left */}
                <div className="absolute inset-0 bg-ink translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]" />

                <div className="relative z-10 flex items-center gap-6">
                  <span className="font-body text-[0.58rem] tracking-[0.22em] uppercase text-muted group-hover:text-canvas/60 transition-colors duration-300 w-20">
                    {link.label}
                  </span>
                  <span
                    className="font-display text-2xl md:text-4xl text-ink group-hover:text-canvas transition-colors duration-300"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {link.value}
                  </span>
                </div>
                <div className="relative z-10 flex items-center gap-3">
                  <Icon size={15} className="text-muted group-hover:text-canvas/60 transition-colors duration-300" />
                  <ArrowUpRight
                    size={20}
                    className="text-muted group-hover:text-canvas group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"

                  />
                </div>
              </a>
            );
          })}
          <div className="border-t border-grid" />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 px-6 md:px-12 py-8 border-t border-grid">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="font-body text-xs tracking-widest uppercase text-muted">
            © 2026 DHRUV TELI
          </span>
          <span className="font-body text-xs tracking-widest uppercase text-muted hidden md:block">
            AHMEDABAD, INDIA
          </span>
          <span className="font-display text-sm tracking-widest text-muted">
            DT
          </span>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
