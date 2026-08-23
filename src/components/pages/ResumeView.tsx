import React, { useState } from 'react';
import { ArrowLeft, Printer, Share2, Check, Mail, MapPin } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../ui/Icons';
import { projectsData } from '../../data/projects';

interface ResumeViewProps {
  onBack: () => void;
}

export const ResumeView: React.FC<ResumeViewProps> = ({ onBack }) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-canvas text-ink selection:bg-accent selection:text-canvas print:bg-white print:text-black">
      {/* Sticky Action Header (Hidden in Print) */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-canvas/95 backdrop-blur-md border-b border-grid print:hidden">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 font-body text-xs font-semibold tracking-widest uppercase text-ink hover:text-accent transition-colors cursor-none"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO PORTFOLIO</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-grid font-body text-xs tracking-wider uppercase text-muted hover:text-ink hover:border-ink transition-colors cursor-none"
              title="Copy link to resume"
            >
              {copied ? <Check size={14} className="text-accent" /> : <Share2 size={14} />}
              <span>{copied ? 'COPIED' : 'SHARE'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 border border-ink bg-ink text-canvas font-body text-xs font-semibold tracking-wider uppercase hover:bg-accent hover:border-accent transition-colors cursor-none shadow-sm"
              title="Print or Save as PDF"
            >
              <Printer size={14} />
              <span>PRINT / PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Resume Document Canvas */}
      <main className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Printable Paper Card Container */}
        <div className="bg-canvas border border-grid p-8 md:p-14 shadow-[0_10px_35px_rgba(15,14,11,0.04)] print:border-none print:shadow-none print:p-0">
          
          {/* Header & Identity */}
          <section className="border-b border-grid pb-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
              <div>
                <span className="font-body text-[0.65rem] tracking-[0.28em] font-semibold uppercase text-accent block mb-1">
                  CURRICULUM VITAE
                </span>
                <h1
                  className="font-display text-5xl md:text-7xl text-ink leading-none"
                  style={{ letterSpacing: '-0.025em' }}
                >
                  DHRUV TELI
                </h1>
                <p className="font-body text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-muted mt-2">
                  AI/ML ENGINEER & SOFTWARE DEVELOPER
                </p>
              </div>

              {/* Quick Contact Badges */}
              <div className="flex flex-col md:items-end gap-1.5 text-xs font-body text-ink-light">
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-accent" />
                  <span>Ahmedabad, Gujarat, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-accent" />
                  <a href="mailto:dhruv.teli@example.com" className="hover:text-accent transition-colors">
                    dhruvteli.dev@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <LinkedinIcon size={13} className="text-accent" />
                  <a href="https://www.linkedin.com/in/dhruvteli6019/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                    linkedin.com/in/dhruvteli6019
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <GithubIcon size={13} className="text-accent" />
                  <a href="https://github.com/Dhruv6019" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                    github.com/Dhruv6019
                  </a>
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <p className="font-body text-xs md:text-sm text-ink-light leading-relaxed max-w-3xl pt-4 border-t border-grid/60">
              Passionate AI/ML Engineer and Full-Stack Developer with deep expertise in building computer vision pipelines, real-time WebSockets engines, and production web platforms. Proven record of developing scalable applications with sub-25ms inference latencies, interactive 3D WebGL graphics, and robust database architectures.
            </p>
          </section>

          {/* Education Section */}
          <section className="mb-10">
            <h2 className="font-body text-xs tracking-[0.25em] font-bold uppercase text-accent mb-4 flex items-center gap-2">
              <span>01 // EDUCATION</span>
              <div className="flex-1 h-px bg-grid" />
            </h2>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h3 className="font-display text-2xl text-ink leading-tight">
                    BACHELOR OF TECHNOLOGY (B.TECH) IN AI & ML
                  </h3>
                  <p className="font-body text-xs text-muted">
                    Gujarat Technological University (GTU) · Ahmedabad, India
                  </p>
                </div>
                <span className="font-body text-xs font-semibold tracking-wider text-accent shrink-0">
                  2023 — 2026 (PURSUING)
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pt-3 border-t border-grid/50">
                <div>
                  <h3 className="font-display text-2xl text-ink leading-tight">
                    DIPLOMA IN COMPUTER ENGINEERING
                  </h3>
                  <p className="font-body text-xs text-muted">
                    Government Polytechnic / Technical Board · Gujarat, India
                  </p>
                </div>
                <span className="font-body text-xs font-semibold tracking-wider text-muted shrink-0">
                  2020 — 2023 · FIRST CLASS WITH DISTINCTION
                </span>
              </div>
            </div>
          </section>

          {/* Technical Arsenal Skills Matrix */}
          <section className="mb-10">
            <h2 className="font-body text-xs tracking-[0.25em] font-bold uppercase text-accent mb-4 flex items-center gap-2">
              <span>02 // TECHNICAL SKILLS</span>
              <div className="flex-1 h-px bg-grid" />
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-body">
              <div className="border border-grid p-4 bg-ink/[0.01]">
                <span className="font-semibold text-ink block mb-1">AI, Machine Learning & Vision</span>
                <p className="text-muted leading-relaxed">
                  Python, OpenCV, TensorFlow, PyTorch, TensorRT, YOLOv8, Scikit-learn, CNNs, Image Segmentation, Edge Inference
                </p>
              </div>

              <div className="border border-grid p-4 bg-ink/[0.01]">
                <span className="font-semibold text-ink block mb-1">Full-Stack & Web Development</span>
                <p className="text-muted leading-relaxed">
                  React, TypeScript, JavaScript (ES6+), Node.js, FastAPI, Flask, PHP, Three.js, WebGL, WebSockets, Tailwind CSS, HTML5/CSS3
                </p>
              </div>

              <div className="border border-grid p-4 bg-ink/[0.01]">
                <span className="font-semibold text-ink block mb-1">Databases & State Management</span>
                <p className="text-muted leading-relaxed">
                  PostgreSQL, MySQL (Relational Modeling, Indexing, PDO Prepared Statements), Redis Cache
                </p>
              </div>

              <div className="border border-grid p-4 bg-ink/[0.01]">
                <span className="font-semibold text-ink block mb-1">Tools, Architecture & DevOps</span>
                <p className="text-muted leading-relaxed">
                  Git, Docker, Linux CLI, REST APIs, Object-Oriented Architecture, WebGL Shaders, Performance Profiling
                </p>
              </div>
            </div>
          </section>

          {/* Featured Engineering Projects */}
          <section className="mb-10">
            <h2 className="font-body text-xs tracking-[0.25em] font-bold uppercase text-accent mb-4 flex items-center gap-2">
              <span>03 // FEATURED ENGINEERING PROJECTS</span>
              <div className="flex-1 h-px bg-grid" />
            </h2>

            <div className="space-y-6">
              {projectsData.map((project) => (
                <div key={project.id} className="border-b border-grid/60 pb-5 last:border-none">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-display text-2xl text-ink leading-tight">
                        {project.number}. {project.name}
                      </h3>
                      <span className="font-body text-[0.62rem] text-accent uppercase tracking-wider font-semibold">
                        · {project.category.split('/')[0]}
                      </span>
                    </div>
                    <span className="font-body text-[0.65rem] text-muted font-mono">
                      {project.year}
                    </span>
                  </div>

                  <p className="font-body text-xs text-ink-light leading-relaxed mb-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="font-body text-[0.58rem] text-muted tracking-wider uppercase font-semibold mr-1">
                      STACK:
                    </span>
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-body text-[0.58rem] px-2 py-0.5 border border-grid text-ink bg-canvas"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Key Achievements & Honors */}
          <section>
            <h2 className="font-body text-xs tracking-[0.25em] font-bold uppercase text-accent mb-4 flex items-center gap-2">
              <span>04 // HIGHLIGHTS & COMPETENCIES</span>
              <div className="flex-1 h-px bg-grid" />
            </h2>

            <ul className="space-y-2 font-body text-xs text-ink-light list-disc list-inside leading-relaxed">
              <li>
                <strong className="text-ink">High-Throughput Inference:</strong> Built computer vision inference pipelines achieving sub-25ms per-frame latencies with zero frame drops.
              </li>
              <li>
                <strong className="text-ink">Interactive WebGL & 3D:</strong> Developed full 60 FPS real-time 3D PBR shader models utilizing Three.js and custom GLSL lighting models.
              </li>
              <li>
                <strong className="text-ink">Full-Stack Database Architecture:</strong> Designed normalized SQL schemas with zero injection vulnerabilities using prepared statements.
              </li>
            </ul>
          </section>
        </div>
      </main>

      {/* Footer (Hidden in Print) */}
      <footer className="max-w-4xl mx-auto px-6 md:px-12 py-8 border-t border-grid text-center font-body text-xs tracking-widest uppercase text-muted print:hidden">
        <span>© 2026 DHRUV TELI // RESUME DOSSIER</span>
      </footer>
    </div>
  );
};

export default ResumeView;
