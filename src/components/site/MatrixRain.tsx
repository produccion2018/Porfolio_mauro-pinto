import { useEffect, useRef } from "react";

const CHARS =
  "アイウエオカキクケコサシスセソタチツテト0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const fontSize = 18;
    let columns = 0;
    let drops: number[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;

    const setup = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      columns = Math.floor(width / fontSize);
      drops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * height) / fontSize) * -1,
      );
    };

    setup();

    const draw = () => {
      // trail fade over the site background (lower alpha = longer, slower trails)
      ctx.fillStyle = "oklch(0.13 0.004 260 / 10%)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < columns; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // leading character: brighter
        ctx.fillStyle = "oklch(0.92 0.09 195 / 95%)";
        ctx.fillText(char, x, y);

        // trailing glow tint
        ctx.fillStyle = "oklch(0.83 0.11 195 / 35%)";
        ctx.fillText(char, x, y - fontSize);

        if (y > height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    let rafId: number;

    if (reduceMotion) {
      // static single faint frame, no animation loop
      ctx.fillStyle = "oklch(0.13 0.004 260)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = "oklch(0.83 0.11 195 / 20%)";
      for (let i = 0; i < columns; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(char, i * fontSize, (drops[i] % height) * fontSize);
      }
    } else {
      const loop = () => {
        // slow, deliberate fall — redraw every 4th frame (~15fps)
        if (frame % 4 === 0) draw();
        frame++;
        rafId = window.requestAnimationFrame(loop);
      };
      rafId = window.requestAnimationFrame(loop);
    }

    const onResize = () => setup();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-[0.28]"
    />
  );
}