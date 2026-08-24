import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Ticker from '../ui/Ticker';
import { ChevronRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Discipline {
  num: string;
  title: string;
  sub: string;
  description: string;
  tools: string[];
  highlight: string;
}

const disciplines: Discipline[] = [
  {
    num: '01',
    title: 'ARTIFICIAL INTELLIGENCE',
    sub: 'Neural nets · Model training · Inference pipelines',
    description:
      'Designing and deploying intelligent systems utilizing large language models, retrieval-augmented generation (RAG), vector embeddings, and real-time inference workflows with automated multi-provider failovers.',
    tools: ['Claude Sonnet', 'OpenAI GPT-4o', 'Google Gemini 2.0', 'Vector Embeddings', 'RAG Pipelines', 'Prompt Engineering'],
    highlight: 'Engineered multi-AI provider failover architecture in Project LOOP (T5)',
  },
  {
    num: '02',
    title: 'MACHINE LEARNING',
    sub: 'Supervised · Unsupervised · Computer vision · NLP',
    description:
      'Developing production-grade ML pipelines, NLP sentiment classification, theme clustering, and computer vision models for automated pattern detection and analytics.',
    tools: ['TensorFlow', 'PyTorch', 'Scikit-Learn', 'OpenCV', 'NLP Sentiment', 'Cosine Similarity', 'Python'],
    highlight: 'Continuous VoC sentiment scoring (-1.0 to +1.0) and clustering algorithms',
  },
  {
    num: '03',
    title: 'WEB DEVELOPMENT',
    sub: 'React · PHP · Full-stack platforms · REST APIs',
    description:
      'Building high-velocity, mobile-first web applications, real-time dashboards, and custom design systems with modern frameworks and robust backend services.',
    tools: ['React 19', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'PHP', 'Node.js', 'Express', 'ShadcnUI'],
    highlight: 'Shipped production platforms: PetSphere, Fixora, BrickByBrick, and Carvo',
  },
  {
    num: '04',
    title: 'SOFTWARE DEVELOPMENT',
    sub: 'C · Python · System design · CLI tooling',
    description:
      'Engineering reliable software architectures, clean design patterns, cross-platform mobile compilation with Capacitor, and optimized data structures.',
    tools: ['C', 'Python', 'TypeScript', 'Capacitor (Android & iOS)', 'System Design', 'Git / GitHub', 'RESTful APIs'],
    highlight: 'Packaged cross-platform mobile apps for Android & iOS via Capacitor',
  },
  {
    num: '05',
    title: 'DATABASES',
    sub: 'MySQL · PostgreSQL · Schema design · Optimisation',
    description:
      'Architecting relational databases, schema normalization, Row Level Security (RLS) policies, TypeORM migrations, and high-concurrency query optimization.',
    tools: ['PostgreSQL', 'Neon Serverless', 'MySQL', 'Prisma ORM', 'TypeORM', 'Supabase Realtime', 'Row Level Security'],
    highlight: 'Multi-tenant database isolation and real-time OTP delivery tracking state machines',
  },
];

const techTicker = [
  'PYTHON', 'REACT', 'JAVASCRIPT', 'PHP', 'MYSQL',
  'HTML', 'CSS', 'GIT', 'TENSORFLOW', 'OPENCV',
  'FASTAPI', 'FLASK', 'C', 'SQL', 'SUPABASE', 'NEXT.JS',
];

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

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

          <div className="col-span-12 md:col-span-7 md:pl-8 flex flex-col justify-end">
            <p className="font-body text-sm text-muted leading-relaxed max-w-md">
              Focused on AI/ML engineering and full-stack development,
              with a practical approach to building useful, scalable products.
            </p>
            <span className="font-mono text-[0.58rem] tracking-widest uppercase text-accent mt-3 flex items-center gap-1.5 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              HOVER OR TAP ANY DISCIPLINE TO EXPAND DETAILS
            </span>
          </div>
        </div>

        {/* Discipline Accordion List */}
        <div>
          {disciplines.map((d, i) => {
            const isExpanded = expandedIndex === i;

            return (
              <div
                key={d.num}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                onMouseEnter={() => setExpandedIndex(i)}
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                className={`group border-t border-grid py-6 md:py-7 transition-all duration-300 cursor-none opacity-0 ${
                  isExpanded ? 'bg-ink/[0.025]' : 'hover:bg-ink/[0.01]'
                }`}
              >
                {/* Main Row Header */}
                <div className="grid grid-cols-12 items-center gap-4">
                  {/* Number */}
                  <div className="col-span-2 sm:col-span-1">
                    <span
                      className={`font-display leading-none transition-colors duration-300 select-none block ${
                        isExpanded ? 'text-accent' : 'text-grid group-hover:text-ink'
                      }`}
                      style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)', letterSpacing: '-0.02em' }}
                    >
                      {d.num}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="col-span-8 sm:col-span-7 md:col-span-6">
                    <h3
                      className={`font-display leading-none transition-all duration-300 ${
                        isExpanded
                          ? 'text-ink translate-x-2'
                          : 'text-ink group-hover:translate-x-2 group-hover:text-ink'
                      }`}
                      style={{ fontSize: 'clamp(1.3rem, 2.8vw, 3.2rem)', letterSpacing: '-0.015em' }}
                    >
                      {d.title}
                    </h3>
                  </div>

                  {/* Sub / Expand Indicator */}
                  <div className="col-span-2 sm:col-span-4 md:col-span-5 flex items-center justify-end gap-3">
                    <p className="hidden md:block font-body text-[0.68rem] text-muted leading-relaxed text-right max-w-xs truncate">
                      {d.sub}
                    </p>
                    <div
                      className={`w-8 h-8 rounded-full border border-grid flex items-center justify-center transition-all duration-300 ${
                        isExpanded
                          ? 'bg-ink text-canvas border-ink rotate-90'
                          : 'text-muted group-hover:border-ink group-hover:text-ink'
                      }`}
                    >
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </div>

                {/* Smooth Expandable Content Panel */}
                <div
                  className={`grid transition-all duration-500 ease-out overflow-hidden ${
                    isExpanded ? 'grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-grid/50' : 'grid-rows-[0fr] opacity-0 mt-0 pt-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      {/* Left: Description & Project Highlight */}
                      <div className="md:col-span-7 space-y-4">
                        <p className="font-body text-xs sm:text-sm text-ink-light leading-relaxed">
                          {d.description}
                        </p>

                        {/* Practical implementation highlight badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-grid bg-canvas text-xs font-body text-muted">
                          <Sparkles size={12} className="text-accent flex-shrink-0" />
                          <span className="text-[0.68rem] font-mono tracking-wide text-ink">
                            {d.highlight}
                          </span>
                        </div>
                      </div>

                      {/* Right: Technical Stack Pill Grid */}
                      <div className="md:col-span-5 flex flex-col justify-between space-y-3">
                        <span className="font-body text-[0.55rem] tracking-[0.2em] uppercase text-muted font-semibold">
                          PROFICIENCIES & FRAMEWORKS
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {d.tools.map((tool) => (
                            <span
                              key={tool}
                              className="font-mono text-[0.58rem] tracking-wider uppercase border border-grid px-2.5 py-1 text-muted bg-canvas/80 hover:border-ink hover:text-ink transition-colors"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
