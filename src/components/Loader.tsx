import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const wipeRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const duration = 1600;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // Small pause at 100
        setTimeout(() => {
          // Wipe line grows up
          gsap.to(wipeRef.current, {
            height: '100%',
            duration: 0.65,
            ease: 'power3.inOut',
            onComplete: () => {
              gsap.to(loaderRef.current, {
                yPercent: -100,
                duration: 0.55,
                ease: 'power3.inOut',
                onComplete,
              });
            },
          });
        }, 180);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="loader">
      {/* Top left label */}
      <div className="absolute top-8 left-8 flex flex-col gap-1">
        <span className="font-body text-[0.6rem] tracking-[0.3em] uppercase opacity-30 text-canvas">
          PORTFOLIO
        </span>
        <span className="font-body text-[0.6rem] tracking-[0.3em] uppercase opacity-30 text-canvas">
          DHRUV TELI
        </span>
      </div>

      {/* Count */}
      <div className="loader-count" style={{ letterSpacing: '-0.03em' }}>
        {String(count).padStart(3, '0')}
      </div>

      {/* Thin progress bar at bottom */}
      <div
        ref={lineRef}
        className="absolute bottom-0 left-0 h-px bg-accent"
        style={{ width: `${count}%`, transition: 'width 0.05s linear' }}
      />

      {/* Bottom right label */}
      <div className="absolute bottom-8 right-8 text-right">
        <span className="font-body text-[0.6rem] tracking-[0.3em] uppercase opacity-30 text-canvas">
          AI/ML ENGINEER
        </span>
      </div>

      {/* Wipe reveal */}
      <div ref={wipeRef} className="loader-wipe" style={{ height: 0 }} />
    </div>
  );
};

export default Loader;
