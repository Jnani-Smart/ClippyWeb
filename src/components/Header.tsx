import React, { memo } from 'react';
import { Github, GitBranch, HelpCircle, Menu, X } from 'lucide-react';

interface HeaderProps {
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
    handleSetHovered: (element: string | null) => void;
    isMobile: boolean;
}

export const Header = memo(function Header({ isMenuOpen, setIsMenuOpen, handleSetHovered, isMobile }: HeaderProps) {
    const navItems = [
        { name: 'Features', href: '#features' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Download', href: '#download' }
    ];

    return (
        <header className="relative z-40 backdrop-blur-2xl bg-white/[0.03] border-b border-white/[0.08]">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
                <div className="flex items-center justify-between">
                    <div
                        className="flex items-center space-x-2 group cursor-pointer"
                        onMouseEnter={() => handleSetHovered('link')}
                        onMouseLeave={() => handleSetHovered(null)}
                    >
                        <div className="relative">
                            <div className="w-14 h-14 flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                                <img
                                    src="/logo.png"
                                    alt="Clippy Logo"
                                    loading="eager"
                                    fetchPriority="high"
                                    decoding="async"
                                    className="w-12 h-12 group-hover:rotate-6 transition-transform duration-300"
                                />
                            </div>
                        </div>
                        <div className="flex items-center h-full">
                            <span className="text-2xl font-black inline-block text-white tracking-tight font-display clippy-text">Clippy</span>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                aria-label={item.name}
                                className={`relative group px-5 py-2 rounded-xl transition-all duration-300 hover:bg-white/8${isMobile ? ' pressed min-w-[44px] min-h-[44px]' : ''}`}
                                onMouseEnter={() => handleSetHovered('link')}
                                onMouseLeave={() => handleSetHovered(null)}
                            >
                                <span className="relative z-10 text-white/90 font-medium text-base">{item.name}</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/8 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </a>
                        ))}

                        {/* External Links */}
                        <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-white/10">
                            <a
                                href="https://github.com/Jnani-Smart/Clippy"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="View on GitHub"
                                className={`relative group p-2 rounded-xl transition-all duration-300 hover:bg-white/8${isMobile ? ' pressed min-w-[44px] min-h-[44px]' : ''}`}
                                onMouseEnter={() => handleSetHovered('link')}
                                onMouseLeave={() => handleSetHovered(null)}
                                title="View on GitHub"
                            >
                                <Github className="w-6 h-6 text-white/70 group-hover:text-white transition-colors duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/8 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </a>

                            <a
                                href="https://github.com/Jnani-Smart/Clippy/releases"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Releases"
                                className={`relative group p-2 rounded-xl transition-all duration-300 hover:bg-white/8${isMobile ? ' pressed min-w-[44px] min-h-[44px]' : ''}`}
                                onMouseEnter={() => handleSetHovered('link')}
                                onMouseLeave={() => handleSetHovered(null)}
                                title="Releases"
                            >
                                <GitBranch className="w-6 h-6 text-white/70 group-hover:text-white transition-colors duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/8 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </a>

                            <a
                                href="https://github.com/Jnani-Smart/Clippy/issues"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Support"
                                className={`relative group p-2 rounded-xl transition-all duration-300 hover:bg-white/8${isMobile ? ' pressed min-w-[44px] min-h-[44px]' : ''}`}
                                onMouseEnter={() => handleSetHovered('link')}
                                onMouseLeave={() => handleSetHovered(null)}
                                title="Support"
                            >
                                <HelpCircle className="w-6 h-6 text-white/70 group-hover:text-white transition-colors duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/8 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </a>
                        </div>
                    </nav>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                aria-label={item.name}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-white hover:bg-white/10"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-white/10">
                        <div className="flex items-center justify-center px-5 space-x-4">
                            <a
                                href="https://github.com/Jnani-Smart/Clippy"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="View on GitHub"
                                className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10"
                                title="View on GitHub"
                            >
                                <Github className="w-6 h-6" />
                            </a>
                            <a
                                href="https://github.com/Jnani-Smart/Clippy/releases"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Releases"
                                className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10"
                                title="Releases"
                            >
                                <GitBranch className="w-6 h-6" />
                            </a>
                            <a
                                href="https://github.com/Jnani-Smart/Clippy/issues"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Support"
                                className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10"
                                title="Support"
                            >
                                <HelpCircle className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
});
