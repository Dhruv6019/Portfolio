import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certs', href: '#certificates' },
  { label: 'Resume', href: '#/resume' },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 60);
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('#/')) {
      window.location.hash = href.replace('#', '');
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-canvas/95 backdrop-blur-md' : ''
        }`}
      >
        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-px bg-accent transition-none"
          style={{ width: `${progress}%`, opacity: scrolled ? 1 : 0 }}
        />

        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          {/* Logo */}
          <a
            href="#hero"
            className="font-display text-lg tracking-[0.12em] text-ink cursor-none flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            DT
            <span className="hidden md:block w-px h-3.5 bg-muted/40 mx-1" />
            <span className="hidden md:block font-body text-[0.55rem] tracking-[0.2em] uppercase text-muted font-medium">
              Portfolio
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="font-body text-[0.68rem] font-medium tracking-[0.18em] uppercase text-muted hover:text-ink transition-colors duration-200 cursor-none"
              >
                {item.label}
              </a>
            ))}

            {/* Hire Me button */}
            <a
              id="nav-hire-btn"
              href="mailto:dhruvteli6019@gmail.com"
              className="group relative overflow-hidden font-body text-[0.62rem] font-semibold tracking-[0.18em] uppercase px-5 py-2.5 border border-ink cursor-none"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-canvas">
                HIRE ME
              </span>
              <div className="absolute inset-0 bg-ink translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.77,0,0.175,1)]" />
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            id="menu-toggle"
            className="md:hidden flex flex-col gap-[5px] cursor-none p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-px bg-ink transition-all duration-400 ${menuOpen ? 'w-5 rotate-45 translate-y-[7px]' : 'w-5'}`}
            />
            <span
              className={`block h-px bg-ink transition-all duration-400 ${menuOpen ? 'opacity-0 w-0' : 'w-3'}`}
            />
            <span
              className={`block h-px bg-ink transition-all duration-400 ${menuOpen ? 'w-5 -rotate-45 -translate-y-[7px]' : 'w-5'}`}
            />
          </button>
        </div>

        {/* Bottom border — only when scrolled */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px bg-grid transition-opacity duration-500"
          style={{ opacity: scrolled ? 1 : 0 }}
        />
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-40 bg-ink flex flex-col items-start justify-end pb-16 pl-8"
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.5 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="font-display text-canvas leading-none cursor-none hover:text-accent transition-colors duration-200"
                style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', letterSpacing: '-0.02em' }}
              >
                {item.label}
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="mt-10 font-body text-[0.6rem] tracking-[0.25em] uppercase text-canvas/30"
            >
              DHRUV TELI — AI/ML ENGINEER
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
