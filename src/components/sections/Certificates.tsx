import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, CheckCircle2, ExternalLink, GraduationCap, Sparkles, FileBadge2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issuerShort: string;
  date: string;
  category: 'internship' | 'academic' | 'ai-web';
  categoryLabel: string;
  credentialId?: string;
  verificationUrl: string;
  skills: string[];
  description: string;
  accentColor: string;
}

const certificatesData: CertificateItem[] = [
  {
    id: 'eldi-react-2025',
    title: 'React.js Development & Frontend Engineering',
    issuer: 'Elsner Technologies / Elsner Learning & Development Institute (ELDI)',
    issuerShort: 'ELSNER / ELDI',
    date: 'Jun 2025',
    category: 'internship',
    categoryLabel: 'INTERNSHIP CERTIFICATE',
    credentialId: 'ELDI-REACT-2945927674',
    verificationUrl: 'https://www.linkedin.com/in/dhruvteli6019/overlay/Position/2945927674/treasury/?profileId=ACoAAFl9RXkBH9h0wCntrVpl86EQTsaw-cU-_MU',
    skills: ['React.js', 'JavaScript (ES6+)', 'Component Architecture', 'Tailwind CSS', 'Responsive UI', 'Front-End Development'],
    description:
      'Completed a 45-day intensive React JS development internship program covering modern front-end engineering, interactive component architectures, state management, and real-world responsive UI development.',
    accentColor: '#3B82F6',
  },
  {
    id: 'zidio-web-2026',
    title: 'Web Development & Full-Stack Engineering Internship',
    issuer: 'Zidio Development · Software Engineering Division',
    issuerShort: 'ZIDIO DEV',
    date: 'Aug 2026 — Present',
    category: 'internship',
    categoryLabel: 'ENGINEERING INTERNSHIP',
    credentialId: 'ZIDIO-SWE-2980314701',
    verificationUrl: 'https://www.linkedin.com/in/dhruvteli6019/',
    skills: ['Full-Stack Development', 'Next.js 14', 'Multi-AI Orchestration', 'PostgreSQL', 'Prisma ORM', 'REST APIs'],
    description:
      'Engineered and improved responsive full-stack applications with real-world development teams, contributing to enterprise Voice-of-Customer AI analytics platforms (Project LOOP Team 5).',
    accentColor: '#E8432D',
  },
  {
    id: 'ljiet-diploma-2026',
    title: 'Diploma in Information Technology',
    issuer: 'L J Institute of Engineering and Technology (LJIET)',
    issuerShort: 'LJIET',
    date: 'Jun 2023 — Jun 2026',
    category: 'academic',
    categoryLabel: 'ACADEMIC DIPLOMA',
    credentialId: 'LJIET-IT-2023-26',
    verificationUrl: 'https://www.linkedin.com/in/dhruvteli6019/',
    skills: ['Computer Science Fundamentals', 'Database Management', 'C Programming', 'Full-Stack Systems', 'Software Engineering'],
    description:
      'Completed 3-year comprehensive technical program with distinction, architecting end-to-end full-stack platforms including Carvo (3D WebGL automotive platform) and BrickByBrick real estate portal.',
    accentColor: '#10B981',
  },
  {
    id: 'adani-btech-2029',
    title: 'B.Tech — Computer Science (AI & ML Specialization)',
    issuer: 'Adani University · Faculty of Engineering Sciences',
    issuerShort: 'ADANI UNIV',
    date: 'Aug 2026 — Aug 2029',
    category: 'academic',
    categoryLabel: 'DEGREE CREDENTIAL',
    credentialId: 'ADANI-CSE-AIML',
    verificationUrl: 'https://www.linkedin.com/in/dhruvteli6019/',
    skills: ['Artificial Intelligence', 'Machine Learning', 'Deep Neural Networks', 'Computer Vision', 'Data Structures', 'Cloud Systems'],
    description:
      'Pursuing advanced Bachelor of Technology curriculum focused on foundational AI architectures, machine learning algorithms, deep neural network training, and scalable cloud-native intelligent systems.',
    accentColor: '#8B5CF6',
  },
  {
    id: 'fullstack-ai-specialization',
    title: 'Modern Full-Stack & Generative AI Systems Architecture',
    issuer: 'Professional Portfolio Distinction · Verified Project Artifacts',
    issuerShort: 'VERIFIED ARTIFACTS',
    date: '2025 — 2026',
    category: 'ai-web',
    categoryLabel: 'TECHNICAL SPECIALIZATION',
    credentialId: 'DHRUV-AI-SWE-2026',
    verificationUrl: 'https://github.com/Dhruv6019',
    skills: ['Claude Sonnet 4.6', 'OpenAI GPT-4o', 'Gemini 2.0', 'Vector RAG', 'Supabase RLS', 'Capacitor Mobile'],
    description:
      'Demonstrated masteries in architecting multi-AI failover engines, cross-platform mobile apps (Fixora), real-time WebSockets, and high-performance serverless database models across 7 shipped projects.',
    accentColor: '#F59E0B',
  },
];

const Certificates: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'internship' | 'academic' | 'ai-web'>('all');

  const filteredCertificates =
    activeFilter === 'all'
      ? certificatesData
      : certificatesData.filter((c) => c.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 78%',
        onEnter: () => {
          gsap.fromTo(
            [labelRef.current, headRef.current],
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }
          );
        },
      });

      // Cards staggered reveal
      cardRefs.current.forEach((el, idx) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          onEnter: () => {
            gsap.fromTo(
              el,
              { y: 35, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: (idx % 3) * 0.08 }
            );
          },
        });
      });
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="relative z-10 py-28 md:py-36 px-6 md:px-12 border-t border-grid"
      style={{ scrollMarginTop: '72px' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="grid grid-cols-12 gap-6 mb-16 items-end justify-between">
          <div className="col-span-12 md:col-span-6">
            <div ref={labelRef} className="flex items-center gap-4 mb-5 opacity-0">
              <span className="section-number">06</span>
              <div className="w-8 h-px bg-muted" />
              <span className="section-number">CREDENTIALS & HONORS</span>
            </div>

            <div ref={headRef} className="opacity-0">
              <h2
                className="font-display text-ink leading-[0.9]"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 6.2rem)', letterSpacing: '-0.025em' }}
              >
                CERTIFIED &<br />
                <span
                  style={{
                    WebkitTextStroke: '1.5px #0F0E0B',
                    color: 'transparent',
                  }}
                >
                  VERIFIED
                </span>
              </h2>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 flex flex-col md:items-end justify-end">
            <p className="font-body text-sm text-muted leading-relaxed max-w-md md:text-right mb-6">
              Verified industry training certifications, university academic credentials, and practical engineering milestones.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'ALL CREDENTIALS' },
                { id: 'internship', label: 'INDUSTRY INTERNSHIPS' },
                { id: 'academic', label: 'ACADEMIC & UNIVERSITY' },
                { id: 'ai-web', label: 'SPECIALIZATIONS' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                  className={`font-mono text-[0.58rem] tracking-wider uppercase px-3 py-1.5 border transition-all duration-300 cursor-none ${
                    activeFilter === tab.id
                      ? 'bg-ink text-canvas border-ink font-semibold'
                      : 'border-grid text-muted hover:border-ink hover:text-ink bg-canvas'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert, i) => (
            <div
              key={cert.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="group relative border border-grid bg-ink/[0.015] hover:bg-ink/[0.035] p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 hover:border-ink/30 hover:-translate-y-1.5 shadow-[0_8px_25px_rgba(15,14,11,0.02)] cursor-none opacity-0 overflow-hidden"
            >
              {/* Corner crosshairs */}
              <span className="absolute top-2 left-2 text-[0.6rem] font-mono text-muted/30 select-none">+</span>
              <span className="absolute top-2 right-2 text-[0.6rem] font-mono text-muted/30 select-none">+</span>
              <span className="absolute bottom-2 left-2 text-[0.6rem] font-mono text-muted/30 select-none">+</span>
              <span className="absolute bottom-2 right-2 text-[0.6rem] font-mono text-muted/30 select-none">+</span>

              {/* Background ambient texture */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle, ${cert.accentColor} 1px, transparent 1px)`,
                  backgroundSize: '22px 22px',
                }}
              />

              {/* Top Row: Category Pill + Date */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-grid/60">
                  <span
                    className="font-mono text-[0.55rem] tracking-widest uppercase px-2 py-0.5 border font-semibold inline-flex items-center gap-1.5"
                    style={{
                      borderColor: `${cert.accentColor}40`,
                      backgroundColor: `${cert.accentColor}10`,
                      color: cert.accentColor,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: cert.accentColor }}
                    />
                    {cert.categoryLabel}
                  </span>

                  <span className="font-mono text-[0.58rem] tracking-wider uppercase text-muted">
                    {cert.date}
                  </span>
                </div>

                {/* Issuer badge */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full border border-grid bg-canvas flex items-center justify-center text-accent">
                    {cert.category === 'academic' ? (
                      <GraduationCap size={11} />
                    ) : cert.category === 'internship' ? (
                      <FileBadge2 size={11} />
                    ) : (
                      <Award size={11} />
                    )}
                  </div>
                  <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-muted font-semibold">
                    {cert.issuerShort}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-display text-xl sm:text-2xl text-ink leading-tight mb-3 group-hover:text-accent transition-colors duration-300"
                  style={{ letterSpacing: '-0.015em' }}
                >
                  {cert.title}
                </h3>

                {/* Issuer full name */}
                <p className="font-body text-xs text-muted leading-relaxed mb-4">
                  {cert.issuer}
                </p>

                {/* Description */}
                <p className="font-body text-[0.78rem] text-ink-light leading-relaxed mb-5">
                  {cert.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[0.52rem] tracking-wider uppercase border border-grid px-2 py-0.5 text-muted bg-canvas/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action / Verification Bar */}
              <div className="pt-4 border-t border-grid/60 flex items-center justify-between gap-3 mt-auto">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 size={13} className="text-emerald-600 flex-shrink-0" />
                  <span className="font-mono text-[0.55rem] tracking-wider uppercase font-semibold">
                    VERIFIED CREDENTIAL
                  </span>
                </div>

                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-body text-[0.62rem] tracking-[0.15em] uppercase font-semibold text-ink hover:text-accent transition-colors cursor-none py-1 px-2 hover:bg-ink/[0.04] border border-transparent hover:border-grid"
                >
                  <span>VIEW CERTIFICATE</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Note */}
        <div className="mt-12 p-6 border border-grid bg-ink/[0.01] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-grid flex items-center justify-center bg-canvas text-accent">
              <Sparkles size={14} />
            </div>
            <div>
              <span className="font-body text-[0.62rem] tracking-[0.2em] font-semibold uppercase text-ink block">
                AUTHENTICATED CREDENTIAL PORTFOLIO
              </span>
              <span className="font-body text-xs text-muted">
                All certificates, internship letters, and academic degrees are authenticated with institutional verification.
              </span>
            </div>
          </div>

          <a
            href="https://www.linkedin.com/in/dhruvteli6019/details/certifications/"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[0.58rem] tracking-wider uppercase text-accent hover:underline flex items-center gap-1 shrink-0 cursor-none"
          >
            <span>VIEW ALL ON LINKEDIN</span>
            <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
