import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Ticker from '../ui/Ticker';

gsap.registerPlugin(ScrollTrigger);

const heroTicker = [
  'AI/ML', 'WEB DEVELOPMENT', 'REACT', 'PYTHON',
  'COMPUTER VISION', 'SOFTWARE', 'AI ENGINEERING',
  'MACHINE LEARNING', 'JAVASCRIPT', 'DATABASES',
];

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitCardRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const dhruRef = useRef<HTMLDivElement>(null);
  const teliRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const corner1Ref = useRef<HTMLDivElement>(null);
  const corner2Ref = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Ambient mouse coordinate for subtle lighting
  const [mouseCoord, setMouseCoord] = useState({ x: 50, y: 50 });

  // DOM Refs for high-performance 90+ FPS direct hardware acceleration
  const photoContainerRef = useRef<HTMLDivElement>(null);
  const colorLayerRef = useRef<HTMLDivElement>(null);
  const lensRingRef = useRef<HTMLDivElement>(null);
  const coordTagRef = useRef<HTMLDivElement>(null);
  const badgeDotRef = useRef<HTMLSpanElement>(null);
  const badgeTextRef = useRef<HTMLSpanElement>(null);

  // 90+ FPS requestAnimationFrame LERP motion loop
  useEffect(() => {
    const container = photoContainerRef.current;
    if (!container) return;

    let targetX = 160;
    let targetY = 200;
    let currentX = 160;
    let currentY = 200;
    let targetRadius = 0;
    let currentRadius = 0;
    let isHovered = false;
    let animationFrameId: number;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      targetX = clientX - rect.left;
      targetY = clientY - rect.top;
      targetRadius = 100; // Lens radius

      if (!isHovered) {
        isHovered = true;
        if (badgeDotRef.current) {
          badgeDotRef.current.className = 'w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse';
        }
        if (badgeTextRef.current) {
          badgeTextRef.current.textContent = 'SPECTRUM LENS // 90FPS ACTIVE';
        }
        if (coordTagRef.current) {
          coordTagRef.current.style.opacity = '1';
        }
      }
    };

    const onPointerLeave = () => {
      targetRadius = 0;
      isHovered = false;
      if (badgeDotRef.current) {
        badgeDotRef.current.className = 'w-1.5 h-1.5 rounded-full bg-accent';
      }
      if (badgeTextRef.current) {
        badgeTextRef.current.textContent = 'DHRUV TELI // 2026';
      }
      if (coordTagRef.current) {
        coordTagRef.current.style.opacity = '0';
      }
    };

    // Buttery 90+ FPS LERP render loop with sub-pixel interpolation
    const renderLoop = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      currentRadius += (targetRadius - currentRadius) * 0.14;

      if (colorLayerRef.current) {
        if (currentRadius > 0.5) {
          colorLayerRef.current.style.clipPath = `circle(${currentRadius.toFixed(2)}px at ${currentX.toFixed(2)}px ${currentY.toFixed(2)}px)`;
        } else {
          colorLayerRef.current.style.clipPath = 'circle(0px at 50% 50%)';
        }
      }

      if (lensRingRef.current) {
        const ringOpacity = Math.min(1, Math.max(0, currentRadius / 60));
        lensRingRef.current.style.transform = `translate3d(${(currentX - 100).toFixed(2)}px, ${(currentY - 100).toFixed(2)}px, 0)`;
        lensRingRef.current.style.opacity = ringOpacity.toFixed(3);
      }

      if (coordTagRef.current && isHovered) {
        coordTagRef.current.textContent = `RGB LENS · X:${Math.round(currentX)} Y:${Math.round(currentY)}`;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    container.addEventListener('mousemove', onPointerMove, { passive: true });
    container.addEventListener('mouseenter', onPointerMove, { passive: true });
    container.addEventListener('mouseleave', onPointerLeave, { passive: true });
    container.addEventListener('touchstart', onPointerMove, { passive: true });
    container.addEventListener('touchmove', onPointerMove, { passive: true });
    container.addEventListener('touchend', onPointerLeave, { passive: true });

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mouseenter', onPointerMove);
      container.removeEventListener('mouseleave', onPointerLeave);
      container.removeEventListener('touchstart', onPointerMove);
      container.removeEventListener('touchmove', onPointerMove);
      container.removeEventListener('touchend', onPointerLeave);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation timeline
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(
        corner1Ref.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
        .fromTo(
          corner2Ref.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          dhruRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out' },
          '-=0.3'
        )
        .fromTo(
          teliRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out' },
          '-=0.9'
        )
        .fromTo(
          subRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          portraitCardRef.current,
          { opacity: 0, scale: 0.95, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' },
          '-=0.8'
        )
        .fromTo(
          scrollLineRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          { scaleY: 1, duration: 0.8, ease: 'power3.inOut' },
          '-=0.3'
        );

      // Scroll-driven parallax on scroll
      if (sectionRef.current && leftColRef.current && portraitCardRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          onUpdate: (self) => {
            const p = self.progress;
            if (leftColRef.current) {
              gsap.set(leftColRef.current, { x: -p * 100, opacity: Math.max(0, 1 - p * 1.8) });
            }
            if (portraitCardRef.current) {
              gsap.set(portraitCardRef.current, {
                x: p * 60,
                y: p * 40,
                opacity: Math.max(0, 1 - p * 1.5),
              });
            }
          },
        });
      }
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  // Mouse move handler for ambient light and magnetic text
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    setMouseCoord({ x: xPct, y: yPct });

    // Magnetic physics on left-side typography letters
    const chars = sectionRef.current.querySelectorAll<HTMLElement>('.hero-interactive-char');
    chars.forEach((char) => {
      const charRect = char.getBoundingClientRect();
      const charCenterX = charRect.left + charRect.width / 2;
      const charCenterY = charRect.top + charRect.height / 2;

      const distX = e.clientX - charCenterX;
      const distY = e.clientY - charCenterY;
      const distance = Math.hypot(distX, distY);

      if (distance < 200) {
        const force = (1 - distance / 200) * 16;
        const angle = Math.atan2(distY, distX);
        const moveX = Math.cos(angle) * -force;
        const moveY = Math.sin(angle) * -force;
        const rotate = (distX / 200) * 6;
        char.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotate(${rotate}deg)`;
      } else {
        char.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
      }
    });
  };

  const handleMouseLeave = () => {
    if (!sectionRef.current) return;
    const chars = sectionRef.current.querySelectorAll<HTMLElement>('.hero-interactive-char');
    chars.forEach((char) => {
      char.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
    });
  };

  const renderSplitLetters = (word: string, isOutlined: boolean = false) => {
    return word.split('').map((char, i) => (
      <span
        key={i}
        className={`hero-interactive-char ${
          isOutlined
            ? 'hover:text-accent transition-colors duration-300'
            : 'hover:text-accent transition-colors duration-300'
        }`}
      >
        {char}
      </span>
    ));
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen flex flex-col justify-between overflow-hidden z-10 bg-canvas"
      style={{ scrollMarginTop: '0px' }}
    >
      {/* Dynamic Ambient Cursor Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-60"
        style={{
          background: `radial-gradient(700px circle at ${mouseCoord.x}% ${mouseCoord.y}%, rgba(232, 67, 45, 0.04), transparent 70%)`,
        }}
      />

      {/* Top row — corners + nav gap */}
      <div className="relative flex items-start justify-between px-6 md:px-12 pt-28 flex-shrink-0 z-20">
        {/* Corner info — left */}
        <div ref={corner1Ref} className="flex flex-col gap-1 opacity-0">
          <span className="section-number">LOCATION</span>
          <span className="font-body text-[0.7rem] font-medium tracking-[0.18em] uppercase text-ink">
            AHMEDABAD, INDIA
          </span>
        </div>

        {/* Corner info — right */}
        <div ref={corner2Ref} className="flex flex-col gap-1 text-right opacity-0">
          <span className="section-number">STATUS</span>
          <span className="font-body text-[0.7rem] font-medium tracking-[0.18em] uppercase text-accent font-semibold">
            AVAILABLE FOR INTERNSHIPS
          </span>
        </div>
      </div>

      {/* ─── MAIN 2-COLUMN STAGE (TEXT LEFT // STRAIGHT IMAGE RIGHT) ─── */}
      <div className="relative flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 flex items-center justify-center z-10 min-h-0 py-2">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center w-full">

          {/* ─── LEFT COLUMN: GIANT TYPOGRAPHY & ROLE ─── */}
          <div
            ref={leftColRef}
            className="md:col-span-7 flex flex-col justify-center select-none"
          >
            {/* DHRUV - Solid Ink */}
            <div
              ref={dhruRef}
              data-cursor-hero="✦ DHRUV"
              className="hero-interactive-word font-display leading-[0.82] text-ink opacity-0 will-change-transform"
              style={{ fontSize: 'clamp(4.2rem, 13vw, 12.5rem)', letterSpacing: '-0.03em' }}
              aria-label="Dhruv"
            >
              {renderSplitLetters('DHRUV', false)}
            </div>

            {/* TELI - Outlined Text */}
            <div
              ref={teliRef}
              data-cursor-hero="AI/ML"
              className="hero-interactive-word font-display leading-[0.82] opacity-0 will-change-transform mt-[-0.04em]"
              style={{
                fontSize: 'clamp(4.2rem, 13vw, 12.5rem)',
                letterSpacing: '-0.03em',
                WebkitTextStroke: '2.5px #0F0E0B',
                color: 'transparent',
              }}
              aria-label="Teli"
            >
              {renderSplitLetters('TELI', true)}
            </div>

            {/* Role string + Multipliers */}
            <div ref={subRef} className="mt-5 md:mt-8 space-y-3 opacity-0">
              <p className="font-body text-[0.65rem] md:text-xs font-semibold tracking-[0.22em] uppercase text-ink">
                AI/ML ENGINEER
                <span className="text-accent mx-2.5">×</span>
                SOFTWARE DEVELOPER
                <span className="text-accent mx-2.5">×</span>
                CREATIVE BUILDER
              </p>

              {/* Editorial capability badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  'Computer Vision',
                  'Edge Inference',
                  'Full-Stack Web',
                  '3D WebGL',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-[0.55rem] tracking-[0.18em] uppercase border border-grid px-2.5 py-1 text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: EDITORIAL PORTRAIT WITH CIRCULAR SPOTLIGHT COLOR REVEAL ─── */}
          <div className="md:col-span-5 flex items-center justify-center md:justify-end">
            <div
              ref={portraitCardRef}
              className="relative border border-grid p-2.5 sm:p-3 bg-canvas shadow-[0_15px_40px_rgba(15,14,11,0.06)] group overflow-hidden transition-all duration-500 hover:border-ink/40"
              style={{
                width: 'clamp(260px, 30vw, 380px)',
                height: 'clamp(320px, 40vw, 480px)',
              }}
            >
              {/* Corner Metadata Coordinates */}
              <div className="absolute top-4 left-4 z-30 flex items-center gap-1.5 font-body text-[0.52rem] tracking-[0.25em] uppercase text-muted bg-canvas/90 px-2 py-0.5 border border-grid backdrop-blur-sm pointer-events-none">
                <span ref={badgeDotRef} className="w-1.5 h-1.5 rounded-full bg-accent transition-colors" />
                <span ref={badgeTextRef}>DHRUV TELI // 2026</span>
              </div>

              {/* Inner Portrait Canvas with 90FPS GPU Accelerated Lens */}
              <div
                ref={photoContainerRef}
                className="relative w-full h-full overflow-hidden bg-[#161412] select-none cursor-none will-change-transform"
              >
                {/* Subtle dot grid background */}
                <div
                  className="absolute inset-0 opacity-[0.05] pointer-events-none z-10"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #FAF8F5 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Base Layer: Black & White / Monochrome Image */}
                <img
                  src="/images/dhruv-hero.png"
                  alt="Dhruv Teli (Monochrome)"
                  className="w-full h-full object-cover object-center select-none filter grayscale contrast-[1.2] brightness-[0.92] transition-transform duration-700 group-hover:scale-[1.02]"
                  draggable={false}
                />

                {/* Top Layer: Full Vibrant Color Image with 90FPS Direct Clip-Path */}
                <div
                  ref={colorLayerRef}
                  className="absolute inset-0 pointer-events-none will-change-[clip-path]"
                  style={{
                    clipPath: 'circle(0px at 50% 50%)',
                  }}
                >
                  <img
                    src="/images/dhruv-hero.png"
                    alt="Dhruv Teli (Color Spotlight)"
                    className="w-full h-full object-cover object-center select-none filter contrast-[1.08] brightness-[1.02] transition-transform duration-700 group-hover:scale-[1.02]"
                    draggable={false}
                  />
                </div>

                {/* Glowing Spotlight Ring with 90FPS Direct Transform */}
                <div
                  ref={lensRingRef}
                  className="absolute top-0 left-0 pointer-events-none rounded-full border border-accent/80 shadow-[0_0_28px_rgba(232,67,45,0.4)] z-20 will-change-transform opacity-0"
                  style={{
                    width: 200,
                    height: 200,
                    transform: 'translate3d(0, 0, 0)',
                  }}
                >
                  {/* Center Crosshair Lens */}
                  <span className="absolute inset-0 flex items-center justify-center text-[0.65rem] font-mono text-accent/60 font-bold">+</span>
                </div>

                {/* Real-Time Coordinate Tag */}
                <div
                  ref={coordTagRef}
                  className="absolute bottom-3 right-3 z-30 font-mono text-[0.5rem] tracking-wider uppercase px-2 py-0.5 border border-white/20 bg-black/75 backdrop-blur-sm text-white/90 opacity-0 transition-opacity duration-300 pointer-events-none"
                >
                  RGB LENS · X:0 Y:0
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ─── BOTTOM STRIP: MARQUEE TICKER ─── */}
      <div className="flex-shrink-0 border-t border-grid z-20">
        <div className="py-4 bg-canvas/90 backdrop-blur-sm">
          <Ticker
            items={heroTicker}
            speed="normal"
            className="font-body text-[0.6rem] font-medium tracking-[0.18em] uppercase text-muted"
            separator="•"
          />
        </div>
      </div>

      {/* Left Scroll Indicator */}
      <div className="absolute left-6 md:left-12 bottom-20 flex flex-col items-center gap-2 opacity-50 z-20">
        <div
          ref={scrollLineRef}
          className="w-px h-10 bg-muted origin-top"
          style={{ transform: 'scaleY(0)' }}
        />
        <span
          className="font-body text-[0.55rem] tracking-[0.25em] uppercase text-muted"
          style={{ writingMode: 'vertical-rl' }}
        >
          SCROLL
        </span>
      </div>

      {/* Right 2026 Label */}
      <div className="absolute right-6 md:right-12 bottom-20 opacity-30 z-20">
        <span
          className="font-body text-[0.55rem] tracking-[0.25em] uppercase text-muted"
          style={{ writingMode: 'vertical-rl' }}
        >
          2026
        </span>
      </div>
    </section>
  );
};

export default Hero;
