import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/* =====================================================
   MÚSICA DE FONDO DEL PORTFOLIO
   -----------------------------------------------------
   Por defecto suena una pista electrónica generada con código
   (Web Audio), así no hay problemas de derechos de autor.

   ¿Querés usar tu propia canción?
     1. Copiá el archivo .mp3 a la carpeta  public/  (ej. public/musica.mp3)
     2. Cambiá MUSIC_FILE abajo a  "/musica.mp3"
   Para volver a la pista generada, dejá MUSIC_FILE en null.

   VOLUME: volumen de 0 a 1 (0.12 = bajito).
   ===================================================== */
const MUSIC_FILE: string | null = null;
const VOLUME = 0.12;

const STORAGE_KEY = "nodo.music.muted";

/* ───────── Pista electrónica generada (122 BPM, Am–F–C–G) ───────── */
export function createSynthTrack(ctx: AudioContext, out: AudioNode) {
  const BPM = 122;
  const step = 60 / BPM / 4; // semicorchea
  // Raíces de los acordes (Hz): La, Fa, Do, Sol
  const chords = [
    { root: 55.0, notes: [220.0, 261.63, 329.63] }, // Am
    { root: 43.65, notes: [174.61, 220.0, 261.63] }, // F
    { root: 65.41, notes: [261.63, 329.63, 392.0] }, // C
    { root: 49.0, notes: [196.0, 246.94, 293.66] }, // G
  ];

  // Ruido para hi-hats y clap
  const noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const data = noiseBuf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  // "Sidechain": el resto baja un poco en cada bombo para que respire
  const duck = ctx.createGain();
  duck.connect(out);

  // Eco suave para el arpegio
  const delay = ctx.createDelay();
  delay.delayTime.value = step * 3;
  const fb = ctx.createGain();
  fb.gain.value = 0.28;
  delay.connect(fb).connect(delay);
  delay.connect(duck);

  const kick = (t: number) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.12);
    g.gain.setValueAtTime(0.9, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    o.connect(g).connect(out);
    o.start(t);
    o.stop(t + 0.36);
    duck.gain.setValueAtTime(0.45, t);
    duck.gain.linearRampToValueAtTime(1, t + 0.22);
  };

  const noise = (t: number, dur: number, freq: number, vol: number) => {
    const s = ctx.createBufferSource();
    s.buffer = noiseBuf;
    const f = ctx.createBiquadFilter();
    f.type = "highpass";
    f.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    s.connect(f).connect(g).connect(duck);
    s.start(t);
    s.stop(t + dur + 0.01);
  };

  const bass = (t: number, freq: number) => {
    const o = ctx.createOscillator();
    o.type = "sawtooth";
    o.frequency.value = freq;
    const f = ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.setValueAtTime(700, t);
    f.frequency.exponentialRampToValueAtTime(160, t + step * 1.8);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.32, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + step * 1.9);
    o.connect(f).connect(g).connect(duck);
    o.start(t);
    o.stop(t + step * 2);
  };

  const pluck = (t: number, freq: number) => {
    const o = ctx.createOscillator();
    o.type = "square";
    o.frequency.value = freq;
    const f = ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.setValueAtTime(2400, t);
    f.frequency.exponentialRampToValueAtTime(500, t + 0.18);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.06, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    o.connect(f).connect(g);
    g.connect(duck);
    g.connect(delay);
    o.start(t);
    o.stop(t + 0.24);
  };

  const pad = (t: number, notes: number[], dur: number) => {
    notes.forEach((n) => {
      const o = ctx.createOscillator();
      o.type = "triangle";
      o.frequency.value = n / 2;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.035, t + 0.6);
      g.gain.linearRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(duck);
      o.start(t);
      o.stop(t + dur + 0.05);
    });
  };

  let current = 0; // semicorchea actual
  let nextTime = ctx.currentTime + 0.1;
  const arp = [0, 1, 2, 1, 2, 0, 1, 2];

  const schedule = () => {
    while (nextTime < ctx.currentTime + 0.12) {
      const s = current % 16; // posición en el compás
      const bar = Math.floor(current / 16);
      const chord = chords[bar % chords.length]!;
      const section = Math.floor(bar / 8) % 2; // cada 8 compases alterna intensidad

      if (s % 4 === 0) kick(nextTime);
      if (s % 4 === 2) noise(nextTime, 0.05, 8000, 0.12); // hi-hat abierto a contratiempo
      if (section === 1 && s % 2 === 1) noise(nextTime, 0.02, 10000, 0.05);
      if (s === 4 || s === 12) noise(nextTime, 0.12, 1500, 0.1); // clap
      if (s % 2 === 0 && s % 4 !== 0) bass(nextTime, chord.root * 2);
      if (s === 3 || s === 11) bass(nextTime, chord.root);
      if (s % 2 === 0) pluck(nextTime, chord.notes[arp[(s / 2) % arp.length]!]! * 2);
      if (s === 0) pad(nextTime, chord.notes, step * 16);

      nextTime += step;
      current++;
    }
  };

  const id = window.setInterval(schedule, 25);
  schedule();
  return () => window.clearInterval(id);
}

/** Botón flotante de música: arranca bajito con la primera interacción del visitante. */
export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const stopSynthRef = useRef<(() => void) | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoStartOffRef = useRef<() => void>(() => {});

  const start = useCallback(async () => {
    try {
      if (MUSIC_FILE) {
        if (!audioRef.current) {
          const a = new Audio(MUSIC_FILE);
          a.loop = true;
          a.volume = VOLUME;
          audioRef.current = a;
        }
        await audioRef.current.play();
      } else {
        if (!ctxRef.current) {
          const Ctx =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const ctx = new Ctx();
          const master = ctx.createGain();
          master.gain.value = 0;
          master.connect(ctx.destination);
          ctxRef.current = ctx;
          masterRef.current = master;
          stopSynthRef.current = createSynthTrack(ctx, master);
        }
        const ctx = ctxRef.current;
        await ctx.resume();
        masterRef.current!.gain.cancelScheduledValues(ctx.currentTime);
        masterRef.current!.gain.setTargetAtTime(VOLUME, ctx.currentTime, 0.8); // entrada suave
      }
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) audioRef.current.pause();
    const ctx = ctxRef.current;
    if (ctx && masterRef.current) {
      masterRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.2);
      window.setTimeout(() => void ctx.suspend(), 600);
    }
    setPlaying(false);
  }, []);

  // Arranca con el primer clic / tecla / toque del visitante (los navegadores
  // no dejan reproducir sonido antes), salvo que la haya silenciado antes.
  useEffect(() => {
    let muted = false;
    try {
      muted = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* sin acceso a localStorage */
    }
    if (muted) return;
    const evs = ["pointerdown", "keydown", "touchend"] as const;
    const cleanup = () => evs.forEach((ev) => window.removeEventListener(ev, first));
    const first = (e: Event) => {
      cleanup();
      // Si tocó el botón de música, el propio botón decide
      if ((e.target as HTMLElement | null)?.closest?.("[data-music-toggle]")) return;
      void start();
    };
    autoStartOffRef.current = cleanup;
    evs.forEach((ev) => window.addEventListener(ev, first));
    return cleanup;
  }, [start]);

  useEffect(
    () => () => {
      stopSynthRef.current?.();
      void ctxRef.current?.close();
      audioRef.current?.pause();
    },
    [],
  );

  const toggle = () => {
    autoStartOffRef.current();
    try {
      localStorage.setItem(STORAGE_KEY, playing ? "1" : "0");
    } catch {
      /* sin acceso a localStorage */
    }
    if (playing) stop();
    else void start();
  };

  return (
    <button
      type="button"
      data-music-toggle
      onClick={toggle}
      aria-label={playing ? "Pausar música" : "Activar música"}
      title={playing ? "Pausar música" : "Activar música"}
      className="group fixed bottom-6 left-6 z-50 flex h-11 items-center gap-2 rounded-full border border-accent bg-background/70 px-3.5 text-accent shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-background"
    >
      {playing ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
      <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-[3px] rounded-full bg-current ${playing ? "pf-eq" : "h-1"}`}
            style={playing ? { animationDelay: `${i * 0.15}s` } : undefined}
          />
        ))}
      </span>
    </button>
  );
}
