'use client';

import { useEffect, useState } from 'react';

// Using percentage offsets for single-page scroll sections
// 400vh total height.
// Hero: 0%
// Works: 25% (at 100vh point)
// Capabilities: 50% (at 200vh point)
// Contact: 75% (at 300vh point)
const navLinks = [
    { label: 'Home', percent: 0 },
    { label: 'Works', percent: 0.25 },
    { label: 'Capabilities', percent: 0.50 },
    { label: 'Contact', percent: 0.75 },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, percent: number) => {
        e.preventDefault();
        const section = document.getElementById('home');
        if (section) {
            const rect = section.getBoundingClientRect();
            const scrollableHeight = section.scrollHeight - window.innerHeight;

            // Calculate target scroll position relative to document
            // Actually simpler: 
            // The total scroll distance is roughly (400vh - 100vh) = 300vh of scrollable range?
            // Wait, standard document scroll.
            // 400vh container.
            // 0% -> top = 0
            // 25% progress -> scrollY = 0.25 * (ScrollableDistance)

            // Actually, rect.height is 400vh.
            // Scrollable distance = rect.height - window.innerHeight.
            const targetY = percent * (section.scrollHeight - window.innerHeight);

            window.scrollTo({
                top: targetY,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 backdrop-blur-md bg-black/30' : 'py-6 bg-transparent'
                }`}
        >
            <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <a
                    href="#"
                    onClick={(e) => handleScrollTo(e, 0)}
                    className="text-white hover:text-gray-200 transition-colors"
                    aria-label="Goto Home"
                >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0zm0 36c-8.837 0-16-7.163-16-16S11.163 4 20 4s16 7.163 16 16-7.163 16-16 16z" fill="currentColor" />
                        <path d="M20 10v20M10 20h20" stroke="currentColor" strokeWidth="4" />
                    </svg>
                </a>

                {/* Links */}
                <div className="hidden md:flex space-x-6">
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            onClick={(e) => handleScrollTo(e as any, link.percent)}
                            className="text-sm font-medium text-gray-300 hover:text-white uppercase tracking-wider transition-colors bg-transparent border-none cursor-pointer"
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                {/* Mobile Menu Icon (Stub) */}
                <div className="md:hidden text-white">
                    <div className="space-y-2">
                        <div className="w-8 h-0.5 bg-white"></div>
                        <div className="w-8 h-0.5 bg-white"></div>
                        <div className="w-8 h-0.5 bg-white"></div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
