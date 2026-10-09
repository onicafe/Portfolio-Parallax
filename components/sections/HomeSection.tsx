'use client';

import { useEffect, useState, useRef } from 'react';
import ScrollSequenceBackground from '../sequence/ScrollSequenceBackground';

export default function HomeSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    // Total frames for background
    const totalFrames = 192;

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate progress based on how far we've scrolled into the 400vh container
            // Start: top touches top (0)
            // End: bottom touches bottom (or creates enough room for full sequence)
            // The container is large (e.g. 400vh). 
            // Sticky element stays fixed for (ContainerHeight - ViewportHeight).
            // Progress = (ScrolledAmount) / (ScrollableDistance)
            // ScrolledAmount = -rect.top
            // ScrollableDistance = rect.height - viewportHeight

            const scrollableDistance = rect.height - viewportHeight;
            const scrolled = -rect.top;

            let p = scrolled / scrollableDistance;
            p = Math.max(0, Math.min(1, p));

            setProgress(p);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Init
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Text Opacity Logic
    // Divide progress (0..1) into 4 sections
    // 0.00 - 0.25: Hero
    // 0.25 - 0.50: Section 2
    // 0.50 - 0.75: Section 3
    // 0.75 - 1.00: Section 4

    const getOpacity = (start: number, end: number) => {
        // Fade in during first 20% of the segment, Fade out during last 20%? 
        // Or just simple crossfade?
        // Let's do a bell curve or simple window.
        // Active if within range.
        if (progress >= start && progress < end) return 1;
        return 0;
    };

    // Smoother crossfade:
    // peak at center of segment?
    // Let's just hard switch or smooth transition with CSS.
    // We'll set a class 'opacity-100' or 'opacity-0' based on active segment.
    const activeSegment = Math.floor(progress * 4); // 0, 1, 2, 3 (or 4 at very end)

    return (
        <section ref={containerRef} id="home" className="relative h-[400vh] w-full bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* Controlled Background Sequence */}
                <ScrollSequenceBackground
                    folder="/assets/001"
                    totalFrames={totalFrames}
                    scrollProgress={progress}
                />

                {/* Text Overlay Container */}
                <div className="absolute inset-0 z-10 pointer-events-none">

                    {/* HERO (Segment 0) */}
                    <div
                        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${activeSegment === 0 ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="absolute top-[20%] text-center">
                            <h2 className="text-orange-500 font-bold tracking-[0.2em] text-sm md:text-xl uppercase drop-shadow-md">
                                Portfolio 2026
                            </h2>
                        </div>
                        <h1 className="font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-none mix-blend-difference text-white text-center">
                            CREATIVE<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                                DEVELOPER
                            </span>
                        </h1>
                        <div className="absolute bottom-[20%] pointer-events-auto">
                            <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                                Explore
                            </button>
                        </div>
                    </div>

                    {/* SECTION 2 (Segment 1) */}
                    <div
                        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${activeSegment === 1 ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">Selected Work</h2>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl text-center leading-relaxed">
                            A collection of digital experiences crafted with precision and passion.
                        </p>
                    </div>

                    {/* SECTION 3 (Segment 2) */}
                    <div
                        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${activeSegment === 2 ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">Capabilities</h2>
                        <ul className="text-xl md:text-3xl text-gray-300 space-y-4 text-center font-light">
                            <li>Creative Direction</li>
                            <li>3D Motion Design</li>
                            <li>Full Stack Development</li>
                            <li>Brand Identity</li>
                        </ul>
                    </div>

                    {/* SECTION 4 (Segment 3+) */}
                    <div
                        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${activeSegment >= 3 ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">Let's Connect</h2>
                        <a href="mailto:hello@example.com" className="text-3xl md:text-5xl text-blue-500 hover:text-white transition-colors underline decoration-1 underline-offset-8 pointer-events-auto">
                            hello@example.com
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}
