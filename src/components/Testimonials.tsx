import React, { MutableRefObject, memo } from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '../data';

interface TestimonialsProps {
    testimonialCardRefs: MutableRefObject<(HTMLDivElement | null)[]>;
    isMobile: boolean;
    visibleTestimonialCards: Set<number>;
    handleSetHovered: (element: string | null) => void;
}

export const Testimonials = memo(function Testimonials({
    testimonialCardRefs,
    isMobile,
    visibleTestimonialCards,
    handleSetHovered
}: TestimonialsProps) {
    return (
        <section id="testimonials" className="relative z-10 py-16 px-6 sm:px-8 lg:px-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight font-display">
                        <span className="inline-block text-white">Loved by Professionals</span>
                    </h2>
                    <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
                        Join thousands of developers, designers, and creators who trust Clippy
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            ref={el => (testimonialCardRefs.current[index] = el)}
                            data-idx={index}
                            className={`group relative p-6 backdrop-blur-2xl bg-gradient-to-br from-white/8 to-white/4 border border-white/15 rounded-2xl transition-all duration-500 cursor-pointer
                ${isMobile && visibleTestimonialCards.has(index) ? 'hover:scale-105 group-hover:scale-110 group-hover:rotate-6' : ''}
                ${!isMobile ? 'hover:scale-105' : ''}
              `}
                            onMouseEnter={() => handleSetHovered('card')}
                            onMouseLeave={() => handleSetHovered(null)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/12 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                            <div className="relative z-10">
                                <div className="flex items-center space-x-1 mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-white/90 text-base leading-relaxed mb-6 font-light">
                                    "{testimonial.content}"
                                </p>
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-2xl border border-white/25 rounded-xl flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-base">{testimonial.name}</div>
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
