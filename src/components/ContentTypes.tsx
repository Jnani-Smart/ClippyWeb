import React, { MutableRefObject, memo } from 'react';
import { contentTypes } from '../data';
import { getAccentColor } from '../utils/theme';

interface ContentTypesProps {
    contentTypeCardRefs: MutableRefObject<(HTMLDivElement | null)[]>;
    isMobile: boolean;
    visibleContentTypeCards: Set<number>;
    handleSetHovered: (element: string | null) => void;
}

export const ContentTypes = memo(function ContentTypes({
    contentTypeCardRefs,
    isMobile,
    visibleContentTypeCards,
    handleSetHovered
}: ContentTypesProps) {
    return (
        <section className="relative z-10 py-16 px-6 sm:px-8 lg:px-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight font-display">
                        <span className="inline-block text-white">Handle Any Content</span>
                    </h2>
                    <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
                        Intelligent categorization and management for all clipboard content types
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contentTypes.map((type, index) => (
                        <div
                            key={index}
                            ref={el => (contentTypeCardRefs.current[index] = el)}
                            data-idx={index}
                            className={`group relative p-6 backdrop-blur-2xl bg-gradient-to-br from-white/6 to-white/3 border border-white/12 rounded-2xl transition-all duration-500 cursor-pointer min-h-[280px] flex flex-col
                ${isMobile && visibleContentTypeCards.has(index) ? 'hover:scale-105 group-hover:scale-110 group-hover:rotate-6' : ''}
                ${!isMobile ? 'hover:scale-105' : ''}
              `}
                            onMouseEnter={() => handleSetHovered('card')}
                            onMouseLeave={() => handleSetHovered(null)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/12 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                            <div className="relative z-10 text-center flex-1 flex flex-col">
                                <div className={`w-16 h-16 bg-gradient-to-br from-white/20 to-white/8 backdrop-blur-2xl border border-white/25 rounded-2xl flex items-center justify-center mb-6 mx-auto transition-all duration-400
                  ${isMobile && visibleContentTypeCards.has(index) ? 'scale-110 rotate-6' : ''}
                  ${!isMobile ? 'group-hover:scale-110 group-hover:rotate-6' : ''}
                `}>
                                    <type.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">{type.title}</h3>
                                <p className="text-white/70 text-sm mb-4 leading-relaxed flex-1">{type.description}</p>
                                <div className="space-y-2 mt-auto">
                                    <div className={`inline-block px-3 py-1 rounded-xl text-xs font-bold ${getAccentColor(type.color)} bg-white/8 border border-white/15`}>
                                        {type.stats}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});
