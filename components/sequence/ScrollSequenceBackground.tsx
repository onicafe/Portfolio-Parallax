'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface ScrollSequenceBackgroundProps {
  folder: string;
  totalFrames: number;
  /**
   * External scroll progress 0..1
   * If provided, the component will be controlled and won't attach its own scroll listener.
   */
  scrollProgress?: number;
}

export default function ScrollSequenceBackground({
  folder,
  totalFrames,
  scrollProgress,
}: ScrollSequenceBackgroundProps) {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Use refs for animation loop to avoid dependency staleness
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync external progress to currentFrame
  useEffect(() => {
    if (scrollProgress !== undefined) {
      const p = Math.max(0, Math.min(1, scrollProgress));
      const frameIndex = 1 + Math.floor(p * (totalFrames - 1));
      setCurrentFrame(frameIndex);
    }
  }, [scrollProgress, totalFrames]);


  // Preload images
  useEffect(() => {
    let loadedCount = 0;

    let active = true;
    const preloadAll = async () => {
      const promises = [];
      for (let i = 1; i <= totalFrames; i++) {
        promises.push(
          new Promise<void>((resolve) => {
            const img = new window.Image();
            img.src = `${folder}/frame_${String(i).padStart(4, '0')}.webp`;
            img.onload = () => {
              if (active) {
                loadedCount++;
                setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
              }
              resolve();
            };
            img.onerror = () => {
              if (active) loadedCount++;
              resolve();
            };
          })
        );
      }
      await Promise.all(promises);
      if (active) setLoading(false);
    };

    preloadAll();

    return () => {
      active = false;
    };
  }, [folder, totalFrames]);

  // Scroll logic (Internal Mode)
  useEffect(() => {
    // If controlled, skip internal logic
    if (scrollProgress !== undefined) return;
    if (loading) return;

    let rafId: number;

    const handleScroll = () => {
      const section = containerRef.current?.parentElement;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const distance = rect.height;
      const travelled = -rect.top;

      let p = travelled / distance;
      p = Math.max(0, Math.min(1, p));

      const frameIndex = 1 + Math.floor(p * (totalFrames - 1));
      setCurrentFrame(frameIndex);
    };

    const loop = () => {
      handleScroll();
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [loading, totalFrames, scrollProgress]);

  // Double-buffer logic
  const [activeSlot, setActiveSlot] = useState<0 | 1>(0);
  const [slotSrcs, setSlotSrcs] = useState<[string, string]>([
    `${folder}/frame_0001.webp`,
    `${folder}/frame_0001.webp`
  ]);

  const lastRenderedFrame = useRef(1);

  useEffect(() => {
    if (currentFrame === lastRenderedFrame.current) return;

    const newSrc = `${folder}/frame_${String(currentFrame).padStart(4, '0')}.webp`;
    const nextSlot = activeSlot === 0 ? 1 : 0;

    setSlotSrcs(prev => {
      const next = [...prev] as [string, string];
      next[nextSlot] = newSrc;
      return next;
    });

    setActiveSlot(nextSlot);
    lastRenderedFrame.current = currentFrame;

  }, [currentFrame, activeSlot, folder]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 bg-black overflow-hidden pointer-events-none">
      {/* Loading Overlay */}
      <div
        className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-black text-white transition-opacity duration-500 pointer-events-auto ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="text-2xl font-bold mb-4 tracking-widest uppercase">Loading</div>
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-100 ease-out"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
        <div className="mt-2 text-xs font-mono text-gray-400">{loadProgress}%</div>
      </div>

      {/* Layers */}
      <div className="relative w-full h-full">
        {[0, 1].map((index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-300 ease-linear`}
            style={{ opacity: (!loading && activeSlot === index) ? 1 : 0 }}
          >
            <Image
              src={slotSrcs[index]}
              alt="Sequence Frame"
              fill
              priority
              unoptimized
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
