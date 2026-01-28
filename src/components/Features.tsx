import React, { RefObject, memo } from 'react';
import { detailedFeatures } from '../data';
import { getAccentColor } from '../utils/theme';

interface FeaturesProps {
    featuresRef: RefObject<HTMLDivElement>;
    visibleSections: Set<string>;
    handleSetHovered: (element: string | null) => void;
}

export const Features = memo(function Features({ featuresRef, visibleSections, handleSetHovered }: FeaturesProps) {
    return (
        <section ref={featuresRef} id="features" className="relative z-10 py-12 px-6 sm:px-8 lg:px-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight font-display">
                        <span className="inline-block text-white">Powerful Features</span>
                    </h2>
                    <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
                        Every detail crafted for the perfect clipboard management experience
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {detailedFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className={`group relative p-6 backdrop-blur-2xl bg-gradient-to-br from-white/6 to-white/3 border border-white/12 rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer ${visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                            onMouseEnter={() => handleSetHovered('card')}
                            onMouseLeave={() => handleSetHovered(null)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/12 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                            <div className="relative z-10">
                                <div className="flex items-start space-x-6 mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/8 backdrop-blur-2xl border border-white/25 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-400">
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                        <div className="flex items-center space-x-3 mb-3">
                                            <span className={`text-sm font-bold ${getAccentColor(feature.accent)}`}>
                                                {feature.highlight}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-white/80 leading-relaxed text-base">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});
