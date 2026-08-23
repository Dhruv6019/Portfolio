import React, { useEffect, useRef, useState } from 'react';

const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  const [cursorText, setCursorText] = useState<string>('');

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animateRing = () => {
      const dx = mousePos.current.x - ringPos.current.x;
      const dy = mousePos.current.y - ringPos.current.y;
      ringPos.current.x += dx * 0.15;
      ringPos.current.y += dy * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animateRing);
    };

    const onMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      
      // Check for hero name hover
      const heroTarget = target.closest('[data-cursor-hero]');
      if (heroTarget) {
        const text = heroTarget.getAttribute('data-cursor-hero') || '✦ DHRUV';
        setCursorText(text);
        dotRef.current?.classList.add('cursor-hero-active');
        ringRef.current?.classList.add('cursor-hero-ring-active');
        return;
      }

      // Check for custom cursor text
      const textTarget = target.closest('[data-cursor-text]');
      if (textTarget) {
        const text = textTarget.getAttribute('data-cursor-text') || 'VIEW';
        setCursorText(text);
        dotRef.current?.classList.add('cursor-text-active');
        ringRef.current?.classList.add('cursor-text-ring-active');
        return;
      }

      // Standard interactive elements hover
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('magnetic-btn') ||
        target.closest('.magnetic-btn') ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setCursorText('');
        dotRef.current?.classList.add('hovering');
        ringRef.current?.classList.add('ring-hovering');
      }
    };

    const onMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor-hero]')) {
        setCursorText('');
        dotRef.current?.classList.remove('cursor-hero-active');
        ringRef.current?.classList.remove('cursor-hero-ring-active');
      }
      if (target.closest('[data-cursor-text]')) {
        setCursorText('');
        dotRef.current?.classList.remove('cursor-text-active');
        ringRef.current?.classList.remove('cursor-text-ring-active');
      }
      dotRef.current?.classList.remove('hovering');
      ringRef.current?.classList.remove('ring-hovering');
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseEnter);
    document.addEventListener('mouseout', onMouseLeave);
    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseEnter);
      document.removeEventListener('mouseout', onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor flex items-center justify-center">
        <span
          ref={labelRef}
          className="cursor-label font-body text-[0.55rem] font-bold tracking-widest text-canvas pointer-events-none select-none uppercase text-center px-1"
        >
          {cursorText}
        </span>
      </div>
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

export default Cursor;
