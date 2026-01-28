import React, { memo } from 'react';
import { Github, GitBranch, HelpCircle, Scale } from 'lucide-react';

interface FooterProps {
    handleSetHovered: (element: string | null) => void;
}

export const Footer = memo(function Footer({ handleSetHovered }: FooterProps) {
    return (
        <footer className="relative z-10 backdrop-blur-2xl bg-white/6 border-t border-white/12 py-12">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
                    <div
                        className="flex items-center space-x-2 group cursor-pointer"
                        onMouseEnter={() => handleSetHovered('link')}
                        onMouseLeave={() => handleSetHovered(null)}
                    >
                        <div className="w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                            <img
                                src="/logo.png"
                                alt="Clippy Logo"
                                loading="eager"
                                fetchPriority="high"
                                decoding="async"
                                className="w-12 h-12 group-hover:rotate-6 transition-transform duration-300"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-2xl font-black inline-block text-white tracking-tight font-display clippy-text">Clippy</span>
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <a
                            href="https://github.com/Jnani-Smart/Clippy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-300"
                            onMouseEnter={() => handleSetHovered('link')}
                            onMouseLeave={() => handleSetHovered(null)}
                        >
                            <Github className="w-5 h-5" />
                            <span className="text-sm font-medium">GitHub</span>
                        </a>

                        <a
                            href="https://github.com/Jnani-Smart/Clippy/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-300"
                            onMouseEnter={() => handleSetHovered('link')}
                            onMouseLeave={() => handleSetHovered(null)}
                        >
                            <GitBranch className="w-5 h-5" />
                            <span className="text-sm font-medium">Releases</span>
                        </a>

                        <a
                            href="https://github.com/Jnani-Smart/Clippy/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-300"
                            onMouseEnter={() => handleSetHovered('link')}
                            onMouseLeave={() => handleSetHovered(null)}
                        >
                            <HelpCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">Support</span>
                        </a>

                        <a
                            href="https://github.com/Jnani-Smart/Clippy/blob/main/LICENSE"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-300"
                            onMouseEnter={() => handleSetHovered('link')}
                            onMouseLeave={() => handleSetHovered(null)}
                        >
                            <Scale className="w-5 h-5" />
                            <span className="text-sm font-medium">License</span>
                        </a>
                    </div>

                    <div className="text-center lg:text-right">
                        <div className="text-white/70 text-sm font-light mb-1">
                            © 2025 Jnani Smart. All rights reserved.
                        </div>
                        <div className="text-white/50 text-xs">
                            Open source under MIT License
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
});
