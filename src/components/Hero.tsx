import React, { RefObject, MutableRefObject, memo } from 'react';
import { Download, ArrowRight, Play } from 'lucide-react';
import { features } from '../data';
import { getBorderColor } from '../utils/theme';

interface HeroProps {
    heroRef: RefObject<HTMLDivElement>;
    isVisible: boolean;
    launchAnimationComplete: boolean;
    handleSetHovered: (element: string | null) => void;
    featureCardRefs: MutableRefObject<(HTMLDivElement | null)[]>;
    activeFeature: number;
    visibleFeatureCards: Set<number>;
    isMobile: boolean;
}

export const Hero = memo(function Hero({
    heroRef,
    isVisible,
    launchAnimationComplete,
    handleSetHovered,
    featureCardRefs,
    activeFeature,
    visibleFeatureCards,
    isMobile
}: HeroProps) {
    return (
        <section ref={heroRef} id="hero" className="relative z-10 pt-16 pb-16 px-6 sm:px-8 lg:px-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <div className={`transition-all duration-1200 ${isVisible && launchAnimationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        {/* Hero Icon */}
                        <div className="flex justify-center mb-4">
                            <div
                                className={`relative group cursor-pointer transition-all duration-1000 ${launchAnimationComplete ? 'animate-hero-logo-entrance' : ''}`}
                                style={{ willChange: 'transform, opacity, filter' }}
                                onMouseEnter={() => handleSetHovered('card')}
                                onMouseLeave={() => handleSetHovered(null)}
                            >
                                <div
                                    className={`w-64 h-64 flex items-center justify-center group-hover:scale-105 transition-all duration-500 ${launchAnimationComplete ? 'animate-pulse-subtle' : ''}`}
                                >
                                    <img
                                        src="/logo.png"
                                        alt="Clippy Logo"
                                        loading="eager"
                                        fetchPriority="high"
                                        decoding="async"
                                        className="w-56 h-56 group-hover:rotate-6 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Hero Title */}
                        <div className="mb-4">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-2 tracking-tight leading-none font-display">
                                <span className="inline-block text-white clippy-text">
                                    Clippy
                                </span>
                            </h1>
                            <div className="text-lg md:text-xl text-white/50 font-light tracking-wide uppercase mt-2 mb-3">
                                Clipboard Manager Reimagined
                            </div>
                        </div>

                        {/* Hero Description */}
                        <p className="text-xl md:text-2xl lg:text-2xl text-white/80 mb-6 max-w-4xl mx-auto font-light leading-relaxed">
                            The most elegant clipboard manager for macOS with a stunning
                            <span className="text-white font-medium inline-block"> VisionOS-inspired interface</span>
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="#download"
                                aria-label="Download for macOS"
                                className={`group relative px-12 py-4 bg-gradient-to-br from-white/15 to-white/8 backdrop-blur-2xl border border-white/20 rounded-2xl font-bold text-lg transition-all duration-400 hover:scale-105 hover:shadow-xl hover:bg-white/20`}
                                onMouseEnter={() => handleSetHovered('button')}
                                onMouseLeave={() => handleSetHovered(null)}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/15 via-purple-400/10 to-cyan-400/15 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative flex items-center space-x-3">
                                    <Download className="w-7 h-7 group-hover:animate-bounce" />
                                    <span>Download for macOS</span>
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                                </div>
                            </a>

                            <button
                                aria-label="Watch Demo"
                                className={`group px-12 py-4 backdrop-blur-2xl bg-white/8 border border-white/15 rounded-2xl font-bold text-lg transition-all duration-400 hover:bg-white/12 hover:scale-105`}
                                onMouseEnter={() => handleSetHovered('button')}
                                onMouseLeave={() => handleSetHovered(null)}
                            >
                                <div className="flex items-center space-x-3">
                                    <Play className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
                                    <span>Watch Demo</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            ref={el => (featureCardRefs.current[index] = el)}
                            data-idx={index}
                            className={`group relative p-6 backdrop-blur-2xl bg-gradient-to-br ${feature.gradient} border border-white/12 rounded-2xl transition-all duration-500 cursor-pointer
                ${activeFeature === index ? `ring-2 ring-white/30 ${getBorderColor(feature.accent)}` : ''}
                ${isMobile && visibleFeatureCards.has(index) ? 'hover:scale-105 group-hover:scale-110 group-hover:rotate-6' : ''}
                ${!isMobile ? 'hover:scale-105' : ''}
              `}
                            onMouseEnter={() => handleSetHovered('card')}
                            onMouseLeave={() => handleSetHovered(null)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/8 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className={`w-16 h-16 bg-gradient-to-br from-white/20 to-white/8 backdrop-blur-2xl border border-white/25 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300
                  ${isMobile && visibleFeatureCards.has(index) ? 'scale-110 rotate-6' : ''}
                  ${!isMobile ? 'group-hover:scale-110 group-hover:rotate-6' : ''}
                `}>
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                                <p className="text-white/70 text-base leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});
