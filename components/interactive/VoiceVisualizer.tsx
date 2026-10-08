"use client";

import { useEffect, useRef, useState } from "react";

export default function VoiceVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [amplitude, setAmplitude] = useState(60);
  const [speaking, setSpeaking] = useState(true);
  const ampRef = useRef(amplitude);
  const speakingRef = useRef(speaking);

  useEffect(() => {
    ampRef.current = amplitude;
  }, [amplitude]);
  useEffect(() => {
    speakingRef.current = speaking;
  }, [speaking]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let t = 0;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const mid = height / 2;
      const amp = (ampRef.current / 100) * (height / 2) * 0.85;
      const active = speakingRef.current;

      // centre line
      ctx.strokeStyle = "#27272a";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, mid);
      ctx.lineTo(width, mid);
      ctx.stroke();

      // waveform: sum of sines = layered voice-ish signal
      ctx.beginPath();
      for (let x = 0; x <= width; x += 2) {
        const p = x / width;
        const env = Math.sin(p * Math.PI); // envelope so it tapers at edges
        const y =
          mid +
          env *
            amp *
            (active ? 1 : 0.08) *
            (Math.sin(p * 14 + t * 2.2) * 0.6 +
              Math.sin(p * 31 - t * 3.1) * 0.3 +
              Math.sin(p * 57 + t * 1.3) * 0.1);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "#7c3aed");
      gradient.addColorStop(0.5, "#06b6d4");
      gradient.addColorStop(1, "#7c3aed");
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();

      // mirrored soft copy
      ctx.globalAlpha = 0.25;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 3) {
        const p = x / width;
        const env = Math.sin(p * Math.PI);
        const y =
          mid -
          env *
            amp *
            (active ? 1 : 0.08) *
            Math.sin(p * 21 - t * 2.6);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "#06b6d4";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.globalAlpha = 1;

      if (!reduceMotion) t += 0.045;
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-[11px] tracking-[0.25em] text-cyan">
            VOICE PERFORMANCE — LIVE WAVEFORM
          </p>
          <button
            onClick={() => setSpeaking((s) => !s)}
            data-cursor="link"
            className={`rounded border px-3 py-1.5 font-mono text-[10px] tracking-widest transition-colors ${
              speaking
                ? "border-cyan text-cyan"
                : "border-line text-secondary hover:text-primary"
            }`}
          >
            {speaking ? "● SPEAKING" : "○ PAUSED"}
          </button>
        </div>
        <canvas
          ref={canvasRef}
          className="h-56 w-full rounded-lg border border-line bg-ink"
        />
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between font-mono text-xs">
            <span className="text-secondary">Amplitude</span>
            <span className="text-primary">{amplitude}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={amplitude}
            aria-label="Amplitude"
            onChange={(e) => setAmplitude(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center space-y-3 rounded-lg border border-line bg-ink p-5">
        <p className="font-mono text-[11px] tracking-[0.25em] text-secondary">
          PIPELINE STAGES
        </p>
        {[
          "Speech Recognition",
          "Internal State",
          "Voice Director",
          "Performance Plan",
          "TTS",
          "Streaming Audio",
        ].map((stage, i) => (
          <div
            key={stage}
            className="flex items-center gap-3 font-mono text-xs text-secondary"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                speaking && i <= 4 ? "bg-cyan" : "bg-line"
              }`}
            />
            {stage}
          </div>
        ))}
        <p className="border-t border-line pt-4 text-[11px] leading-relaxed text-secondary/70">
          Audio streams to both the React web client and the Flutter mobile app
          over WebSockets.
        </p>
      </div>
    </div>
  );
}
