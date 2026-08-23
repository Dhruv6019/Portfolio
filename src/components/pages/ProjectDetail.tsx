import React, { useState, useEffect } from 'react';
import type { ProjectItem } from '../../data/projects';
import { projectsData } from '../../data/projects';
import {
  ArrowLeft,
  ArrowRight,
  GitBranch,
  CheckCircle2,
  Zap,
  Activity,
  Terminal
} from 'lucide-react';

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
  onSelectProject: (id: string) => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  projectId,
  onBack,
  onSelectProject,
}) => {
  const projectIndex = projectsData.findIndex((p) => p.id === projectId);
  const project: ProjectItem = projectIndex !== -1 ? projectsData[projectIndex] : projectsData[0];
  const prevProject = projectsData[(projectIndex - 1 + projectsData.length) % projectsData.length];
  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];

  // Interactive demo states
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'code'>('overview');
  const [copiedCode, setCopiedCode] = useState(false);

  // Project LOOP interactive simulator state
  const [loopChannel, setLoopChannel] = useState<'appstore' | 'zendesk' | 'intercom' | 'nps'>('appstore');
  const [loopModel, setLoopModel] = useState<'claude' | 'gpt4o' | 'gemini'>('claude');

  // Carvo interactive simulator state
  const [carColor, setCarColor] = useState('#E8432D');
  const [carFinish, setCarFinish] = useState<'metallic' | 'matte' | 'carbon'>('metallic');

  // PetSphere interactive simulator state
  const [petRole, setPetRole] = useState<'buyer' | 'doctor' | 'delivery'>('buyer');
  const [petVerified, setPetVerified] = useState<boolean>(false);

  // Votely interactive simulator state
  const [votes, setVotes] = useState({ optionA: 142, optionB: 89, optionC: 64 });
  const [hasVoted, setHasVoted] = useState<string | null>(null);

  // Scroll to top on project switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectId]);

  const handleCopyCode = () => {
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleSimulatedVote = (option: 'optionA' | 'optionB' | 'optionC') => {
    if (hasVoted) return;
    setVotes((prev) => ({ ...prev, [option]: prev[option] + 1 }));
    setHasVoted(option);
  };

  const totalVotes = votes.optionA + votes.optionB + votes.optionC;

  return (
    <div className="relative min-h-screen bg-canvas text-ink selection:bg-accent selection:text-canvas">
      {/* Sticky Top Header */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-canvas/95 backdrop-blur-md border-b border-grid">
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          {/* Back button */}
          <button
            onClick={onBack}
            className="group flex items-center gap-2.5 font-body text-xs font-semibold tracking-widest uppercase text-ink hover:text-accent transition-colors duration-200 cursor-none"
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span>BACK TO PORTFOLIO</span>
          </button>

          {/* Quick Project Switcher */}
          <div className="hidden md:flex items-center gap-1.5 bg-ink/[0.04] p-1 border border-grid">
            {projectsData.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectProject(p.id)}
                className={`px-3 py-1 font-body text-[0.65rem] tracking-wider uppercase transition-all duration-200 cursor-none ${p.id === project.id
                  ? 'bg-ink text-canvas font-semibold shadow-sm'
                  : 'text-muted hover:text-ink hover:bg-ink/[0.05]'
                  }`}
              >
                {p.number} {p.name.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 font-body text-xs tracking-wider uppercase text-muted hover:text-ink transition-colors duration-200 cursor-none"
            >
              <GitBranch size={14} />
              <span>SOURCE</span>
            </a>
            <a
              href="mailto:dhruv.teli@example.com"
              className="magnetic-btn text-[0.65rem] !py-2 !px-4"
            >
              HIRE DHRUV
            </a>
          </div>
        </div>
      </header>

      {/* Main Case Study Container */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-32">
        {/* Project Header Meta */}
        <section className="mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="font-body text-[0.65rem] tracking-[0.25em] font-semibold uppercase px-3 py-1 border border-grid text-accent">
              PROJECT {project.number}
            </span>
            <span className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-muted">
              {project.category}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-ink-light">
              {project.status}
            </span>
          </div>

          {/* Giant Title */}
          <h1
            className="font-display leading-[0.85] text-ink mb-6"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 9.5rem)', letterSpacing: '-0.03em' }}
          >
            {project.name}
          </h1>

          <p
            className="font-body text-base md:text-xl font-medium tracking-wide uppercase text-accent mb-12 max-w-3xl"
          >
            {project.tagline}
          </p>

          {/* Metadata Specs Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-b border-grid py-6">
            <div>
              <span className="section-number block mb-1">YEAR</span>
              <span className="font-body text-sm font-semibold tracking-wider text-ink">
                {project.year}
              </span>
            </div>
            <div>
              <span className="section-number block mb-1">ROLE</span>
              <span className="font-body text-sm font-semibold tracking-wider text-ink">
                {project.role}
              </span>
            </div>
            <div>
              <span className="section-number block mb-1">DURATION</span>
              <span className="font-body text-sm font-semibold tracking-wider text-ink">
                {project.duration}
              </span>
            </div>
            <div>
              <span className="section-number block mb-1">CORE STACK</span>
              <span className="font-body text-sm font-semibold tracking-wider text-ink truncate block">
                {project.tech.slice(0, 3).join(', ')}
              </span>
            </div>
          </div>
        </section>

        {/* Interactive Visual Showcase / Live Simulation Sandbox */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="section-number">INTERACTIVE ARCHITECTURE SANDBOX</span>
            </div>
            <span className="font-body text-[0.6rem] tracking-widest uppercase text-muted">
              LIVE SIMULATION
            </span>
          </div>

          <div
            className="relative border border-grid overflow-hidden min-h-[480px] flex flex-col justify-between p-6 md:p-10"
            style={{ background: project.bg }}
          >
            {/* Top Toolbar */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-canvas/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="font-display text-2xl text-canvas tracking-wider">
                  {project.name}
                </span>
                <span className="font-body text-[0.6rem] tracking-widest uppercase px-2 py-0.5 border border-canvas/20 text-canvas/70">
                  v2.4 STABLE
                </span>
              </div>

              {/* Project-specific demo controls */}
              {(project.id === 'loop' || project.id === 'neural-lens') && (
                <div className="flex items-center gap-2">
                  <span className="font-body text-[0.55rem] tracking-wider uppercase text-canvas/50 hidden sm:inline">AI MODEL:</span>
                  {([
                    { id: 'claude', name: 'Claude Sonnet' },
                    { id: 'gpt4o', name: 'GPT-4o' },
                    { id: 'gemini', name: 'Gemini 2.0' },
                  ] as const).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setLoopModel(m.id)}
                      className={`px-2.5 py-1 font-body text-[0.6rem] tracking-wider uppercase transition-all duration-200 cursor-none ${loopModel === m.id
                        ? 'bg-accent text-canvas font-semibold shadow-sm'
                        : 'border border-canvas/20 text-canvas/70 hover:text-canvas'
                        }`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              )}

              {project.id === 'carvo' && (
                <div className="flex items-center gap-2">
                  {['#E8432D', '#3B82F6', '#10B981', '#F59E0B', '#111827'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setCarColor(c)}
                      className="w-5 h-5 rounded-full border border-canvas/40 transition-transform hover:scale-110 cursor-none"
                      style={{
                        background: c,
                        boxShadow: carColor === c ? `0 0 0 2px #F2EFE6, 0 0 10px ${c}` : 'none'
                      }}
                      title={`Select Color ${c}`}
                    />
                  ))}
                </div>
              )}

              {(project.id === 'petsphere' || project.id === 'brickbybrick') && (
                <div className="flex items-center gap-2">
                  <span className="font-body text-[0.55rem] tracking-wider uppercase text-canvas/50 hidden sm:inline">RBAC ROLE:</span>
                  {([
                    { id: 'buyer', name: 'Buyer' },
                    { id: 'doctor', name: 'Vet Doctor' },
                    { id: 'delivery', name: 'Delivery OTP' },
                  ] as const).map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setPetRole(r.id)}
                      className={`px-2.5 py-1 font-body text-[0.6rem] tracking-wider uppercase transition-all duration-200 cursor-none ${petRole === r.id
                        ? 'bg-accent text-canvas font-semibold shadow-sm'
                        : 'border border-canvas/20 text-canvas/70 hover:text-canvas'
                        }`}
                    >
                      {r.name}
                    </button>
                  ))}
                </div>
              )}

              {project.id === 'votely' && (
                <div className="flex items-center gap-2">
                  <span className="font-body text-[0.65rem] tracking-widest uppercase text-canvas/70">
                    TOTAL VOTES: <strong className="text-canvas">{totalVotes}</strong>
                  </span>
                </div>
              )}
            </div>

            {/* Middle Simulator Content */}
            <div className="relative z-10 my-8 flex items-center justify-center min-h-[260px]">
              {/* PetSphere 5-Role Ecosystem & Delivery OTP Simulator */}
              {(project.id === 'petsphere' || project.id === 'brickbybrick') && (
                <div className="w-full max-w-2xl bg-black/40 border border-canvas/10 p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4 border-b border-canvas/10 pb-3">
                    <span className="font-body text-[0.65rem] tracking-widest uppercase text-accent font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      PETSPHERE // {petRole.toUpperCase()} PORTAL
                    </span>
                    <span className="text-[0.55rem] font-mono text-canvas/60">
                      STACK: REACT 19 · NODE · MYSQL · RBAC
                    </span>
                  </div>

                  {petRole === 'buyer' && (
                    <div className="bg-black/60 border border-canvas/20 p-4 space-y-3">
                      <div className="flex justify-between items-center text-xs font-mono text-canvas/80">
                        <span>AI MATCH: GOLDEN RETRIEVER PUPPY</span>
                        <span className="text-accent">98.4% COMPATIBLE</span>
                      </div>
                      <p className="font-body text-xs text-canvas/70 leading-relaxed">
                        Matchmaking based on your daily activity profile, apartment square footage, and lifestyle preferences.
                      </p>
                      <div className="pt-2 flex items-center justify-between border-t border-canvas/10 text-[0.6rem] font-mono text-canvas/60">
                        <span>PRICE: ₹18,500</span>
                        <span className="text-green-400">INSTANT UPI CHECKOUT AVAILABLE</span>
                      </div>
                    </div>
                  )}

                  {petRole === 'doctor' && (
                    <div className="bg-black/60 border border-canvas/20 p-4 space-y-3">
                      <div className="flex justify-between items-center text-xs font-mono text-canvas/80">
                        <span>CLINICAL QUEUE: 4 APPOINTMENTS TODAY</span>
                        <span className="text-green-400">VET DR. MEHTA (DVM)</span>
                      </div>
                      <div className="p-2.5 bg-canvas/5 border border-canvas/10 text-xs font-body text-canvas/90 flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-canvas">Bruno (German Shepherd) · Annual Vaccination</p>
                          <p className="text-[0.6rem] text-canvas/60 font-mono">15:30 HRS · CONFIRMED WITH PDF PRESCRIPTION</p>
                        </div>
                        <span className="px-2 py-0.5 bg-accent/20 border border-accent text-accent text-[0.55rem] font-mono">
                          ACTIVE
                        </span>
                      </div>
                    </div>
                  )}

                  {petRole === 'delivery' && (
                    <div className="bg-black/60 border border-canvas/20 p-4 space-y-3">
                      <div className="flex justify-between items-center text-xs font-mono text-canvas/80">
                        <span>ORDER #PS-9482 · ROYAL CANIN ADULT 10KG</span>
                        <span className="text-accent">STATUS: OUT FOR DELIVERY</span>
                      </div>
                      <div className="flex items-center gap-3 pt-2">
                        <input
                          type="text"
                          readOnly
                          value={petVerified ? 'OTP VERIFIED: 849201' : 'ENTER OTP: 849201'}
                          className="bg-black/80 border border-canvas/30 px-3 py-1.5 font-mono text-xs text-canvas w-48"
                        />
                        <button
                          onClick={() => setPetVerified(!petVerified)}
                          className={`px-4 py-1.5 font-body text-xs font-semibold tracking-wider uppercase transition-colors cursor-none ${petVerified ? 'bg-green-600 text-canvas' : 'bg-accent text-canvas hover:bg-accent/80'
                            }`}
                        >
                          {petVerified ? '✓ DELIVERED (PDF INVOICE DISPATCHED)' : 'VERIFY & COMPLETE'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* Project LOOP Interactive Multi-Channel AI Ingestion Simulator */}
              {(project.id === 'loop' || project.id === 'neural-lens') && (
                <div className="w-full max-w-2xl bg-black/40 border border-canvas/10 p-6 backdrop-blur-sm">
                  {/* Ingestion Channels */}
                  <div className="flex items-center justify-between mb-4 border-b border-canvas/10 pb-3">
                    <div className="flex items-center gap-2">
                      {(['appstore', 'zendesk', 'intercom', 'nps'] as const).map((ch) => (
                        <button
                          key={ch}
                          onClick={() => setLoopChannel(ch)}
                          className={`px-2.5 py-0.5 font-body text-[0.55rem] tracking-wider uppercase transition-all duration-200 cursor-none ${loopChannel === ch
                            ? 'bg-canvas text-ink font-semibold'
                            : 'text-canvas/60 hover:text-canvas'
                            }`}
                        >
                          {ch.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    <span className="text-[0.55rem] font-mono text-accent flex items-center gap-1">
                      <Activity size={10} className="animate-pulse" />
                      LLM LATENCY: 1.4s
                    </span>
                  </div>

                  {/* Feedback Card with Live NLP Classification */}
                  <div className="bg-black/60 border border-canvas/20 p-4 relative overflow-hidden">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <span className="font-body text-[0.6rem] tracking-widest uppercase text-accent font-semibold">
                        SOURCE: {loopChannel.toUpperCase()} STREAM
                      </span>
                      <span className={`font-mono text-xs px-2 py-0.5 ${loopChannel === 'zendesk'
                        ? 'bg-red-900/60 text-red-300 border border-red-500/40'
                        : 'bg-green-900/60 text-green-300 border border-green-500/40'
                        }`}>
                        SENTIMENT: {loopChannel === 'zendesk' ? '-0.89 (CRITICAL)' : loopChannel === 'nps' ? '+0.98 (PROMOTER)' : '+0.82 (POSITIVE)'}
                      </span>
                    </div>

                    <p className="font-body text-xs md:text-sm text-canvas/90 leading-relaxed my-2 italic">
                      {loopChannel === 'appstore' && '"The new analytics dashboard loads instantly, but export to CSV takes 3 clicks. Love the speed!"'}
                      {loopChannel === 'zendesk' && '"Payment failed twice during checkout using UPI gateway. Need urgent assistance with invoice."'}
                      {loopChannel === 'intercom' && '"Can we invite 15+ analysts with custom RBAC permissions across separate client workspaces?"'}
                      {loopChannel === 'nps' && '"Best Voice-of-Customer intelligence platform our engineering team has used. Real-time RAG answers are spot on."'}
                    </p>

                    {/* Extracted Theme Tags & Vector Distance */}
                    <div className="mt-4 pt-3 border-t border-canvas/10 flex flex-wrap items-center justify-between gap-2 text-[0.58rem] font-mono text-canvas/60">
                      <div className="flex items-center gap-2">
                        <span className="text-canvas/40">THEME:</span>
                        <span className="px-1.5 py-0.5 bg-canvas/10 text-canvas">
                          {loopChannel === 'zendesk' ? 'Billing & UPI' : loopChannel === 'intercom' ? 'RBAC Governance' : 'VoC Analytics'}
                        </span>
                        <span className="px-1.5 py-0.5 bg-canvas/10 text-accent">
                          Vector Sim: 0.94
                        </span>
                      </div>
                      <span className="text-canvas/40">ENGINE: {loopModel.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Carvo Simulator */}
              {project.id === 'carvo' && (
                <div className="w-full max-w-xl text-center">
                  <div
                    className="w-44 h-44 mx-auto rounded-full transition-all duration-700 flex items-center justify-center relative shadow-2xl"
                    style={{
                      background: `radial-gradient(circle at 35% 35%, #fff, ${carColor} 60%, #000 100%)`,
                      border: '2px solid rgba(255,255,255,0.2)'
                    }}
                  >
                    <span className="font-display text-4xl text-canvas tracking-wider mix-blend-overlay">
                      3D PBR
                    </span>
                    {/* Ring orbit effect */}
                    <div className="absolute inset-[-12px] border border-canvas/20 rounded-full animate-spin" style={{ animationDuration: '12s' }} />
                  </div>

                  <p className="mt-6 font-body text-xs tracking-widest uppercase text-canvas/80">
                    REAL-TIME PHYSICALLY BASED SHADER ENGINE
                  </p>
                  <div className="mt-4 flex justify-center gap-2">
                    {(['metallic', 'matte', 'carbon'] as const).map((finish) => (
                      <button
                        key={finish}
                        onClick={() => setCarFinish(finish)}
                        className={`px-3 py-1 font-body text-[0.6rem] tracking-widest uppercase transition-all duration-200 cursor-none ${carFinish === finish
                          ? 'bg-canvas text-ink font-semibold'
                          : 'border border-canvas/20 text-canvas/70 hover:text-canvas'
                          }`}
                      >
                        {finish}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Votely Simulator */}
              {project.id === 'votely' && (
                <div className="w-full max-w-lg bg-black/40 border border-canvas/10 p-6 backdrop-blur-sm">
                  <h3 className="font-display text-xl text-canvas mb-4 tracking-wider text-center">
                    WHICH CAPABILITY MATTERS MOST?
                  </h3>
                  <div className="space-y-3">
                    {[
                      { key: 'optionA' as const, label: 'Real-Time Edge Computer Vision', count: votes.optionA, color: '#E8432D' },
                      { key: 'optionB' as const, label: 'Creative WebGL & 3D Interactive', count: votes.optionB, color: '#3B82F6' },
                      { key: 'optionC' as const, label: 'High-Throughput Full-Stack APIs', count: votes.optionC, color: '#10B981' },
                    ].map((opt) => {
                      const pct = Math.round((opt.count / totalVotes) * 100);
                      return (
                        <div key={opt.key} className="space-y-1">
                          <div className="flex justify-between text-xs font-body text-canvas/80">
                            <span>{opt.label}</span>
                            <span className="font-mono font-semibold">{pct}% ({opt.count})</span>
                          </div>
                          <div className="h-4 bg-canvas/10 border border-canvas/20 overflow-hidden relative">
                            <div
                              className="h-full transition-all duration-500"
                              style={{ width: `${pct}%`, background: opt.color }}
                            />
                          </div>
                          <button
                            onClick={() => handleSimulatedVote(opt.key)}
                            disabled={hasVoted !== null}
                            className={`w-full text-center py-1 text-[0.6rem] font-body tracking-wider uppercase border border-canvas/20 transition-colors cursor-none ${hasVoted === opt.key ? 'bg-canvas text-ink font-semibold' : 'text-canvas/70 hover:bg-canvas/10'
                              }`}
                          >
                            {hasVoted === opt.key ? '✓ YOUR VOTE CAST' : 'TAP TO VOTE'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Default Simulator for BrickByBrick / MetaCal */}
              {(project.id === 'brickbybrick' || project.id === 'metacal') && (
                <div className="w-full max-w-xl text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-canvas/30 bg-canvas/5">
                    <Zap size={32} className="text-canvas animate-pulse" />
                  </div>
                  <h3 className="font-display text-3xl text-canvas tracking-wider">
                    {project.tagline}
                  </h3>
                  <p className="font-body text-xs text-canvas/70 max-w-md mx-auto leading-relaxed">
                    {project.description}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Status Ticker */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-canvas/10 pt-4 text-canvas/60 font-body text-[0.6rem] tracking-widest uppercase">
              <span>LATENCY: &lt; 25MS</span>
              <span>TEST SUITE: 100% PASSING</span>
              <span>ARCHITECTURE: HYBRID PIPELINE</span>
            </div>
          </div>
        </section>

        {/* Narrative & Deep-Dive Tabs */}
        <section className="mb-24">
          <div className="flex border-b border-grid mb-12">
            {[
              { id: 'overview' as const, label: '01. OVERVIEW & CHALLENGE' },
              { id: 'architecture' as const, label: '02. SYSTEM ARCHITECTURE' },
              { id: 'code' as const, label: '03. CODE IMPLEMENTATION' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 font-body text-xs font-semibold tracking-widest uppercase transition-all duration-200 cursor-none border-b-2 -mb-px ${activeTab === tab.id
                  ? 'border-ink text-ink bg-ink/[0.02]'
                  : 'border-transparent text-muted hover:text-ink'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Overview & Problem / Solution */}
          {activeTab === 'overview' && (
            <div className="space-y-16">
              {/* Problem & Solution 2-Column */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="border-t border-grid pt-6">
                  <span className="section-number block mb-3 text-accent">THE CHALLENGE</span>
                  <h3
                    className="font-display text-3xl text-ink mb-4 leading-tight"
                    style={{ letterSpacing: '-0.01em' }}
                  >
                    IDENTIFYING THE BOTTLENECK
                  </h3>
                  <p className="font-body text-sm md:text-base text-ink-light leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="border-t border-grid pt-6">
                  <span className="section-number block mb-3 text-ink">THE SOLUTION</span>
                  <h3
                    className="font-display text-3xl text-ink mb-4 leading-tight"
                    style={{ letterSpacing: '-0.01em' }}
                  >
                    ENGINEERED PRECISION
                  </h3>
                  <p className="font-body text-sm md:text-base text-ink-light leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Extended narrative paragraphs */}
              <div className="border-t border-grid pt-8 space-y-4 max-w-4xl">
                <span className="section-number block text-muted">DETAILED NARRATIVE</span>
                {project.overview.map((para, i) => (
                  <p key={i} className="font-body text-base text-ink leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Key Features Grid */}
              <div className="border-t border-grid pt-8">
                <span className="section-number block mb-8">STANDOUT CAPABILITIES</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.keyFeatures.map((feat) => (
                    <div
                      key={feat.title}
                      className="border border-grid p-6 hover:border-ink transition-colors duration-300 bg-ink/[0.01]"
                    >
                      <span className="font-body text-[0.55rem] tracking-[0.2em] font-semibold uppercase text-accent mb-2 block">
                        {feat.tag}
                      </span>
                      <h4 className="font-display text-2xl text-ink mb-2">
                        {feat.title}
                      </h4>
                      <p className="font-body text-xs text-ink-light leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Architecture & Pipeline */}
          {activeTab === 'architecture' && (
            <div className="space-y-12">
              <div className="max-w-3xl">
                <span className="section-number block mb-2">DATA FLOW & PIPELINE</span>
                <h3
                  className="font-display text-4xl text-ink leading-tight mb-4"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  END-TO-END SYSTEM PIPELINE
                </h3>
                <p className="font-body text-sm text-ink-light leading-relaxed">
                  Every stage of the pipeline is engineered for low latency, deterministic execution, and resilient error recovery.
                </p>
              </div>

              {/* Step by Step Pipeline */}
              <div className="space-y-4">
                {project.architecture.map((arch) => (
                  <div
                    key={arch.step}
                    className="border border-grid p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-ink/[0.02] transition-colors duration-300"
                  >
                    <div className="flex items-center gap-6">
                      <span className="font-display text-4xl md:text-5xl text-grid select-none">
                        {arch.step}
                      </span>
                      <div>
                        <h4 className="font-display text-2xl text-ink mb-1">
                          {arch.title}
                        </h4>
                        <p className="font-body text-xs md:text-sm text-ink-light max-w-xl leading-relaxed">
                          {arch.desc}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-accent font-body text-[0.65rem] tracking-widest uppercase font-semibold self-end md:self-center">
                      <span>VERIFIED STEP</span>
                      <CheckCircle2 size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Code Implementation */}
          {activeTab === 'code' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="section-number block mb-1">SOURCE CODE SNIPPET</span>
                  <span className="font-body text-xs font-mono text-ink-light">
                    {project.codeSnippet?.filename || 'core_engine.py'}
                  </span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="magnetic-btn text-[0.65rem] !py-1.5 !px-3.5"
                >
                  {copiedCode ? 'COPIED TO CLIPBOARD' : 'COPY SNIPPET'}
                </button>
              </div>

              {project.codeSnippet && (
                <div className="border border-grid bg-ink text-canvas font-mono text-xs md:text-sm p-6 overflow-x-auto">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-canvas/10 text-canvas/40 text-[0.65rem]">
                    <Terminal size={14} />
                    <span>{project.codeSnippet.filename} — {project.codeSnippet.language.toUpperCase()}</span>
                  </div>
                  <pre className="leading-relaxed whitespace-pre font-mono">
                    <code>{project.codeSnippet.code}</code>
                  </pre>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Brutalist Performance Metrics */}
        <section className="mb-24 border-t border-b border-grid py-12">
          <span className="section-number block mb-8">MEASURED IMPACT & BENCHMARKS</span>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {project.metrics.map((m) => (
              <div key={m.label} className="space-y-2">
                <div
                  className="font-display text-5xl md:text-6xl text-ink leading-none"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  {m.value}
                </div>
                <div className="font-body text-xs font-semibold tracking-wider uppercase text-accent">
                  {m.label}
                </div>
                <p className="font-body text-[0.7rem] text-muted">
                  {m.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Complete Technology Matrix */}
        <section className="mb-28">
          <span className="section-number block mb-8">COMPLETE TECHNICAL ARSENAL</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.techCategories.map((cat) => (
              <div key={cat.category} className="border border-grid p-6 bg-canvas">
                <h4 className="font-body text-[0.65rem] tracking-[0.2em] font-semibold uppercase text-muted mb-4 border-b border-grid pb-2">
                  {cat.category}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      className="font-body text-[0.6rem] font-medium tracking-wider uppercase border border-grid px-2.5 py-1 text-ink"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Next / Previous Project Navigation */}
        <section className="border-t border-grid pt-12">
          <span className="section-number block mb-8">CONTINUE EXPLORING</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Previous Project Card */}
            <button
              onClick={() => onSelectProject(prevProject.id)}
              className="group border border-grid p-8 text-left hover:border-ink hover:bg-ink/[0.02] transition-all duration-300 cursor-none"
            >
              <div className="flex items-center gap-2 text-muted font-body text-[0.6rem] tracking-widest uppercase mb-3">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span>PREVIOUS PROJECT</span>
              </div>
              <span className="font-display text-3xl md:text-4xl text-ink block leading-none mb-2">
                {prevProject.number} — {prevProject.name}
              </span>
              <p className="font-body text-xs text-accent tracking-wider uppercase">
                {prevProject.tagline}
              </p>
            </button>

            {/* Next Project Card */}
            <button
              onClick={() => onSelectProject(nextProject.id)}
              className="group border border-grid p-8 text-left md:text-right hover:border-ink hover:bg-ink/[0.02] transition-all duration-300 cursor-none"
            >
              <div className="flex items-center justify-start md:justify-end gap-2 text-muted font-body text-[0.6rem] tracking-widest uppercase mb-3">
                <span>NEXT PROJECT</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="font-display text-3xl md:text-4xl text-ink block leading-none mb-2">
                {nextProject.number} — {nextProject.name}
              </span>
              <p className="font-body text-xs text-accent tracking-wider uppercase">
                {nextProject.tagline}
              </p>
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-grid py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-muted font-body text-xs tracking-widest uppercase">
          <span>© 2026 DHRUV TELI</span>
          <button onClick={onBack} className="hover:text-ink cursor-none">
            RETURN TO HOME ↑
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetail;
