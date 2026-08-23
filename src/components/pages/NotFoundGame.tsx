import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowLeft, Volume2, VolumeX, RotateCcw, Play, Pause, Trophy, Sparkles, Moon, Sun } from 'lucide-react';

interface NotFoundGameProps {
  onGoHome: () => void;
}

export const NotFoundGame: React.FC<NotFoundGameProps> = ({ onGoHome }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [rally, setRally] = useState(0);
  const [bestRally, setBestRally] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'pro'>('normal');
  const [themeMode, setThemeMode] = useState<'cream' | 'ink'>('cream');

  // Web Audio Context for retro sound synthesis
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playTone = useCallback((freq: number, type: OscillatorType = 'square', duration: number = 0.08) => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio fallback
    }
  }, [isMuted]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const width = 900;
    const height = 520;
    canvas.width = width;
    canvas.height = height;

    const paddleWidth = 12;
    const paddleHeight = 90;
    const paddleMargin = 28;

    const player = {
      x: paddleMargin,
      y: height / 2 - paddleHeight / 2,
      vy: 0,
      targetY: height / 2 - paddleHeight / 2,
    };

    const ai = {
      x: width - paddleMargin - paddleWidth,
      y: height / 2 - paddleHeight / 2,
      vy: 0,
      speed: difficulty === 'easy' ? 4.0 : difficulty === 'normal' ? 5.5 : 7.5,
    };

    const ball = {
      x: width / 2,
      y: height / 2,
      size: 14,
      vx: 6.0 * (Math.random() > 0.5 ? 1 : -1),
      vy: (Math.random() * 4 - 2),
      trail: [] as { x: number; y: number; alpha: number }[],
    };

    const resetBall = (directionToPlayer: boolean) => {
      ball.x = width / 2;
      ball.y = height / 2;
      const speed = 6.0;
      const angle = (Math.random() * Math.PI) / 3 - Math.PI / 6;
      ball.vx = (directionToPlayer ? -1 : 1) * speed * Math.cos(angle);
      ball.vy = speed * Math.sin(angle);
      ball.trail = [];
      setRally(0);
    };

    const handleCanvasMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleY = height / rect.height;
      const clientY = (e.clientY - rect.top) * scaleY;
      player.targetY = Math.max(12, Math.min(height - paddleHeight - 12, clientY - paddleHeight / 2));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const scaleY = height / rect.height;
        const clientY = (e.touches[0].clientY - rect.top) * scaleY;
        player.targetY = Math.max(12, Math.min(height - paddleHeight - 12, clientY - paddleHeight / 2));
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        player.targetY = Math.max(12, player.targetY - 40);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        player.targetY = Math.min(height - paddleHeight - 12, player.targetY + 40);
      } else if (e.key === ' ') {
        setIsPaused((p) => !p);
      }
    };

    window.addEventListener('mousemove', handleCanvasMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    const particles: { x: number; y: number; vx: number; vy: number; life: number; color: string }[] = [];

    const createSparks = (x: number, y: number, color: string = '#E8432D') => {
      for (let i = 0; i < 10; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 7,
          vy: (Math.random() - 0.5) * 7,
          life: 1.0,
          color,
        });
      }
    };

    const isCream = themeMode === 'cream';

    const render = () => {
      if (!isPaused) {
        player.y += (player.targetY - player.y) * 0.25;

        const aiCenter = ai.y + paddleHeight / 2;
        if (Math.abs(aiCenter - ball.y) > 10) {
          if (aiCenter < ball.y) {
            ai.y += Math.min(ai.speed, ball.y - aiCenter);
          } else {
            ai.y -= Math.min(ai.speed, aiCenter - ball.y);
          }
        }
        ai.y = Math.max(12, Math.min(height - paddleHeight - 12, ai.y));

        ball.trail.push({ x: ball.x, y: ball.y, alpha: 0.65 });
        if (ball.trail.length > 8) ball.trail.shift();
        ball.trail.forEach((t) => (t.alpha *= 0.8));

        ball.x += ball.vx;
        ball.y += ball.vy;

        // Wall collisions
        if (ball.y <= 12 || ball.y >= height - 12 - ball.size) {
          ball.vy *= -1;
          ball.y = ball.y <= 12 ? 12 : height - 12 - ball.size;
          playTone(380, 'sine', 0.05);
          createSparks(ball.x, ball.y, '#E8432D');
        }

        // Player paddle collision
        if (
          ball.x <= player.x + paddleWidth &&
          ball.x >= player.x &&
          ball.y + ball.size >= player.y &&
          ball.y <= player.y + paddleHeight &&
          ball.vx < 0
        ) {
          const hitOffset = (ball.y + ball.size / 2 - (player.y + paddleHeight / 2)) / (paddleHeight / 2);
          const maxAngle = Math.PI / 3;
          const currentSpeed = Math.min(Math.hypot(ball.vx, ball.vy) * 1.06, 15);
          const angle = hitOffset * maxAngle;

          ball.vx = Math.abs(currentSpeed * Math.cos(angle));
          ball.vy = currentSpeed * Math.sin(angle);
          ball.x = player.x + paddleWidth + 1;

          setRally((r) => {
            const next = r + 1;
            setBestRally((b) => Math.max(b, next));
            return next;
          });
          playTone(587, 'square', 0.08);
          createSparks(ball.x, ball.y, '#E8432D');
        }

        // AI paddle collision
        if (
          ball.x + ball.size >= ai.x &&
          ball.x <= ai.x + paddleWidth &&
          ball.y + ball.size >= ai.y &&
          ball.y <= ai.y + paddleHeight &&
          ball.vx > 0
        ) {
          const hitOffset = (ball.y + ball.size / 2 - (ai.y + paddleHeight / 2)) / (paddleHeight / 2);
          const maxAngle = Math.PI / 3;
          const currentSpeed = Math.min(Math.hypot(ball.vx, ball.vy) * 1.05, 15);
          const angle = hitOffset * maxAngle;

          ball.vx = -Math.abs(currentSpeed * Math.cos(angle));
          ball.vy = currentSpeed * Math.sin(angle);
          ball.x = ai.x - ball.size - 1;

          setRally((r) => {
            const next = r + 1;
            setBestRally((b) => Math.max(b, next));
            return next;
          });
          playTone(523, 'square', 0.08);
          createSparks(ball.x, ball.y, '#0F0E0B');
        }

        // Scoring
        if (ball.x > width + 20) {
          setPlayerScore((s) => s + 1);
          playTone(880, 'triangle', 0.2);
          createSparks(width - 20, height / 2, '#E8432D');
          resetBall(false);
        }

        if (ball.x < -20) {
          setAiScore((s) => s + 1);
          playTone(220, 'sawtooth', 0.25);
          createSparks(20, height / 2, '#0F0E0B');
          resetBall(true);
        }
      }

      // ─── RENDERING THEMED STAGE ───
      ctx.clearRect(0, 0, width, height);

      // Background Theme
      ctx.fillStyle = isCream ? '#F2EFE6' : '#0F0E0B';
      ctx.fillRect(0, 0, width, height);

      // 12-column editorial grid lines
      ctx.strokeStyle = isCream ? 'rgba(217, 213, 202, 0.6)' : 'rgba(242, 239, 230, 0.06)';
      ctx.lineWidth = 1;
      const colWidth = width / 12;
      for (let i = 1; i < 12; i++) {
        ctx.beginPath();
        ctx.moveTo(i * colWidth, 0);
        ctx.lineTo(i * colWidth, height);
        ctx.stroke();
      }

      // Dashed Centerline
      ctx.setLineDash([8, 8]);
      ctx.strokeStyle = isCream ? 'rgba(15, 14, 11, 0.25)' : 'rgba(242, 239, 230, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Ball Trails (Coral Accent)
      ball.trail.forEach((t) => {
        ctx.fillStyle = `rgba(232, 67, 45, ${t.alpha * 0.4})`;
        ctx.fillRect(t.x, t.y, ball.size, ball.size);
      });

      // Ball (Coral Accent #E8432D with subtle glow)
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#E8432D';
      ctx.fillStyle = '#E8432D';
      ctx.fillRect(ball.x, ball.y, ball.size, ball.size);
      ctx.shadowBlur = 0;

      // Player Paddle (Ink #0F0E0B / Canvas)
      ctx.fillStyle = isCream ? '#0F0E0B' : '#F2EFE6';
      ctx.fillRect(player.x, player.y, paddleWidth, paddleHeight);

      // AI Paddle
      ctx.fillStyle = isCream ? '#0F0E0B' : '#F2EFE6';
      ctx.fillRect(ai.x, ai.y, paddleWidth, paddleHeight);

      // Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.035;
        if (p.life <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.fillRect(p.x, p.y, 3, 3);
          ctx.globalAlpha = 1.0;
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleCanvasMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [difficulty, isPaused, playTone, themeMode]);

  const handleReset = () => {
    setPlayerScore(0);
    setAiScore(0);
    setRally(0);
  };

  const isCream = themeMode === 'cream';

  return (
    <div
      className={`relative min-h-screen flex flex-col justify-between selection:bg-[#E8432D] selection:text-white transition-colors duration-500 font-body ${
        isCream ? 'bg-canvas text-ink' : 'bg-ink text-canvas'
      }`}
    >
      {/* Editorial Top Navigation */}
      <header
        className={`px-6 md:px-12 py-5 border-b flex items-center justify-between z-20 backdrop-blur-md transition-colors duration-500 ${
          isCream ? 'border-grid bg-canvas/90' : 'border-canvas/10 bg-ink/90'
        }`}
      >
        {/* Back Button */}
        <button
          onClick={onGoHome}
          className={`group flex items-center gap-2 font-body text-xs font-semibold tracking-widest uppercase transition-colors cursor-none ${
            isCream ? 'text-ink hover:text-accent' : 'text-canvas hover:text-accent'
          }`}
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>RETURN TO PORTFOLIO</span>
        </button>

        {/* Status / Score matrix */}
        <div className="flex items-center gap-6 text-xs tracking-widest uppercase">
          <div className="hidden sm:flex items-center gap-2">
            <span className={isCream ? 'text-muted' : 'text-canvas/40'}>SCORE:</span>
            <span className="font-mono font-bold text-sm">YOU {playerScore} : {aiScore} AI</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-accent">
            <Trophy size={13} />
            <span className="font-mono text-xs">RALLY: {rally} (BEST: {bestRally})</span>
          </div>

          {/* Theme Switcher Toggle */}
          <button
            onClick={() => setThemeMode((m) => (m === 'cream' ? 'ink' : 'cream'))}
            className={`p-1.5 border transition-colors cursor-none ${
              isCream ? 'border-grid text-ink hover:border-ink' : 'border-canvas/20 text-canvas hover:border-canvas'
            }`}
            title={`Switch to ${isCream ? 'Dark Ink' : 'Cream Canvas'} Theme`}
          >
            {isCream ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          {/* Mute Audio Toggle */}
          <button
            onClick={() => setIsMuted((m) => !m)}
            className={`transition-colors p-1 cursor-none ${
              isCream ? 'text-muted hover:text-ink' : 'text-canvas/60 hover:text-canvas'
            }`}
            title={isMuted ? 'Unmute 8-Bit Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </header>

      {/* Main Themed Pong Arcade Stage */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative z-10">
        {/* Subtle Label Matrix Above Cabinet */}
        <div className="w-full max-w-4xl flex items-center justify-between mb-3 text-[0.62rem] tracking-[0.25em] uppercase text-muted">
          <span>SYSTEM // ERROR 404</span>
          <span className="text-accent font-semibold flex items-center gap-1">
            <Sparkles size={11} />
            <span>INTERACTIVE PONG PROTOCOL</span>
          </span>
          <span>LOCATION: [404, NULL]</span>
        </div>

        {/* Outer Brutalist Frame Container */}
        <div
          className={`relative w-full max-w-4xl border-2 rounded-xl overflow-hidden transition-colors duration-500 shadow-xl ${
            isCream
              ? 'border-grid bg-[#EFECE3] shadow-[0_10px_35px_rgba(15,14,11,0.06)]'
              : 'border-canvas/15 bg-[#09090b] shadow-[0_15px_40px_rgba(0,0,0,0.7)]'
          }`}
        >
          {/* Centered Editorial 404 Headline & Button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10">
            {/* Giant 404 in Bebas Neue Style */}
            <div
              className={`font-display leading-none text-center select-none ${
                isCream ? 'text-ink drop-shadow-[0_4px_15px_rgba(15,14,11,0.1)]' : 'text-canvas drop-shadow-[0_4px_20px_rgba(255,255,255,0.3)]'
              }`}
              style={{ fontSize: 'clamp(6rem, 18vw, 14rem)', letterSpacing: '-0.02em' }}
            >
              404
            </div>

            {/* Editorial Subtitle */}
            <p
              className={`font-body text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mt-1 text-center ${
                isCream ? 'text-ink' : 'text-canvas'
              }`}
            >
              Oops! Looks Like You Are Lost
            </p>

            {/* Brutalist Magnetic Return Home Pill Button */}
            <div className="pointer-events-auto mt-6">
              <button
                onClick={onGoHome}
                className="group relative overflow-hidden px-8 py-3 rounded-full font-body text-xs font-bold tracking-[0.2em] uppercase border border-ink bg-ink text-canvas hover:border-accent hover:bg-accent transition-all duration-300 transform hover:scale-105 shadow-md cursor-none"
              >
                <span className="relative z-10">HOME</span>
              </button>
            </div>
          </div>

          {/* HTML5 Canvas Themed Engine */}
          <canvas
            ref={canvasRef}
            className="w-full aspect-[900/520] block cursor-none"
          />

          {/* Bottom Game Controls */}
          <div
            className={`absolute bottom-3 left-4 right-4 flex items-center justify-between text-[0.6rem] font-body tracking-[0.2em] uppercase pointer-events-none ${
              isCream ? 'text-muted' : 'text-canvas/40'
            }`}
          >
            <span className="hidden sm:block">MOUSE MOVE / W-S KEYS TO DEFEND</span>
            <div className="pointer-events-auto flex items-center gap-4">
              <button
                onClick={() => setIsPaused((p) => !p)}
                className={`transition-colors cursor-none flex items-center gap-1 ${
                  isCream ? 'hover:text-ink' : 'hover:text-canvas'
                }`}
              >
                {isPaused ? <Play size={11} /> : <Pause size={11} />}
                <span>{isPaused ? 'RESUME' : 'PAUSE'}</span>
              </button>
              <button
                onClick={handleReset}
                className={`transition-colors cursor-none flex items-center gap-1 ${
                  isCream ? 'hover:text-ink' : 'hover:text-canvas'
                }`}
              >
                <RotateCcw size={11} />
                <span>RESET SCORE</span>
              </button>
            </div>
          </div>
        </div>

        {/* Difficulty Controls */}
        <div className="mt-6 flex items-center gap-3">
          <span className={`text-[0.65rem] font-body tracking-[0.2em] uppercase ${isCream ? 'text-muted' : 'text-canvas/40'}`}>
            AI DIFFICULTY:
          </span>
          {(['easy', 'normal', 'pro'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setDifficulty(lvl)}
              className={`px-3 py-1 text-[0.65rem] font-body tracking-widest uppercase transition-all duration-200 cursor-none border ${
                difficulty === lvl
                  ? isCream
                    ? 'border-ink bg-ink text-canvas font-bold'
                    : 'border-canvas bg-canvas text-ink font-bold'
                  : isCream
                  ? 'border-grid text-muted hover:text-ink hover:border-ink'
                  : 'border-canvas/20 text-canvas/60 hover:text-canvas hover:border-canvas'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`px-6 md:px-12 py-5 border-t flex items-center justify-between text-[0.65rem] tracking-widest uppercase transition-colors duration-500 z-20 ${
          isCream ? 'border-grid text-muted' : 'border-canvas/10 text-canvas/40'
        }`}
      >
        <span>© 2026 DHRUV TELI // 404 ARCHIVE</span>
        <span className="hidden sm:inline">EDITORIAL BRUTALIST PONG ENGINE</span>
        <button onClick={onGoHome} className="hover:text-accent transition-colors cursor-none">
          RETURN TO HOME ↑
        </button>
      </footer>
    </div>
  );
};

export default NotFoundGame;
