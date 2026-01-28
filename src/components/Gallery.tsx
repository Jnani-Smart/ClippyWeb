import React, { useRef, RefObject, memo } from 'react';
import { AssetPicture } from './AssetPicture';

interface GalleryProps {
    galleryRef: RefObject<HTMLDivElement>;
    activeCarouselIndex: number;
    setActiveCarouselIndex: (index: number) => void;
    handleImageSelect: (index: number) => void;
    visibleSections: Set<string>;
    isMobile: boolean;
}

export const Gallery = memo(function Gallery({
    galleryRef,
    activeCarouselIndex,
    setActiveCarouselIndex,
    handleImageSelect,
    visibleSections,
    isMobile
}: GalleryProps) {
    // Mobile gallery swipe state
    const touchStartX = useRef<number | null>(null);
    const touchDeltaX = useRef<number>(0);

    // Handle touch start for mobile gallery
    const handleGalleryTouchStart = (e: React.TouchEvent) => {
        if (!isMobile) return;
        touchStartX.current = e.touches[0].clientX;
        touchDeltaX.current = 0;
    };

    // Handle touch move for mobile gallery
    const handleGalleryTouchMove = (e: React.TouchEvent) => {
        if (!isMobile || touchStartX.current === null) return;
        touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    };

    // Handle touch end for mobile gallery
    const handleGalleryTouchEnd = () => {
        if (!isMobile || touchStartX.current === null) return;
        if (touchDeltaX.current > 40 && activeCarouselIndex > 0) {
            setActiveCarouselIndex(activeCarouselIndex - 1);
        } else if (touchDeltaX.current < -40 && activeCarouselIndex < 3) {
            setActiveCarouselIndex(activeCarouselIndex + 1);
        }
        touchStartX.current = null;
        touchDeltaX.current = 0;
    };

    return (
        <section ref={galleryRef} id="gallery" className="relative z-10 py-12 sm:py-16 px-4 sm:px-6 lg:px-12 overscroll-contain">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight font-display">
                        <span className="inline-block text-white">See It in Action</span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed px-4 sm:px-0">
                        Experience the beautiful interface and powerful features
                    </p>
                </div>

                <div className="relative overflow-hidden gallery-container">
                    {/* Mobile-First Carousel Container */}
                    <div className="block sm:hidden">
                        {/* Mobile: Single Large Image Display */}
                        <div
                            className="flex justify-center py-8 relative"
                            onTouchStart={handleGalleryTouchStart}
                            onTouchMove={handleGalleryTouchMove}
                            onTouchEnd={handleGalleryTouchEnd}
                        >
                            {/* Peek previous image */}
                            {activeCarouselIndex > 0 && (
                                <AssetPicture
                                    index={activeCarouselIndex}
                                    alt="Peek Previous"
                                    className="w-20 h-32 object-cover rounded-2xl absolute left-0 top-1/2 -translate-y-1/2 opacity-50 scale-90 z-0 pointer-events-none transition-all duration-300"
                                    style={{ left: '0.5rem' }}
                                />
                            )}
                            {/* Main image */}
                            <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl overflow-hidden shadow-xl shadow-black/30 z-10">
                                <AssetPicture
                                    index={activeCarouselIndex + 1}
                                    alt={`Clippy Interface ${activeCarouselIndex + 1}`}
                                    className="w-80 h-auto object-cover rounded-3xl select-none"
                                    draggable={false}
                                />

                                {/* Mobile gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-3xl"></div>

                                {/* Mobile featured label */}
                                <div className="absolute bottom-4 left-4">
                                    <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-full px-4 py-2">
                                        <span className="text-white text-sm font-medium">Featured</span>
                                    </div>
                                </div>
                            </div>
                            {/* Peek next image */}
                            {activeCarouselIndex < 3 && (
                                <img
                                    src={`/Assets/${activeCarouselIndex + 2}.png`}
                                    loading="lazy"
                                    decoding="async"
                                    alt="Peek Next"
                                    className="w-20 h-32 object-cover rounded-2xl absolute right-0 top-1/2 -translate-y-1/2 opacity-50 scale-90 z-0 pointer-events-none transition-all duration-300"
                                    style={{ right: '0.5rem' }}
                                />
                            )}
                        </div>

                        {/* Mobile: Thumbnail Strip */}
                        <div className="flex justify-center space-x-3 px-4 overflow-x-auto">
                            {[1, 2, 3, 4].map((num, index) => (
                                <div
                                    key={num}
                                    className={`
                    flex-shrink-0 relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 
                    border rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer
                    ${index === activeCarouselIndex
                                            ? 'border-blue-400 shadow-lg shadow-blue-400/20 scale-105'
                                            : 'border-white/20 opacity-70 hover:opacity-90'
                                        }
                  `}
                                    onClick={() => handleImageSelect(index)}
                                >
                                    <img
                                        src={`/Assets/${num}.png`}
                                        loading="lazy"
                                        decoding="async"
                                        alt={`Clippy Interface ${num}`}
                                        className="w-16 h-16 object-cover rounded-2xl"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Desktop: Original Multi-Image Layout */}
                    <div className="hidden sm:flex items-center justify-center space-x-4 sm:space-x-6 lg:space-x-8 py-8 sm:py-12">
                        {/* Images */}
                        {[1, 2, 3, 4].map((num, index) => {
                            const isCenter = index === activeCarouselIndex;
                            return (
                                <div
                                    key={num}
                                    className={`
                    relative backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 
                    border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-700 ease-in-out
                    cursor-pointer touch-manipulation
                    ${isCenter
                                            ? 'scale-105 sm:scale-110 z-20 shadow-xl shadow-black/30'
                                            : 'scale-85 sm:scale-90 opacity-70 hover:opacity-90 hover:scale-95'
                                        }
                    ${visibleSections.has('gallery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  `}
                                    style={{
                                        animation: `float ${4 + index * 0.3}s ease-in-out infinite alternate`,
                                        animationDelay: `${index * 0.15}s`,
                                        transitionDelay: `${index * 100}ms`
                                    }}
                                    onClick={() => handleImageSelect(index)}
                                >
                                    <div className="relative">
                                        <img
                                            src={`/Assets/${num}.png`}
                                            loading={isCenter ? 'eager' : 'lazy'}
                                            decoding="async"
                                            alt={`Clippy Interface ${num}`}
                                            className={`
                        w-full h-auto object-cover rounded-2xl sm:rounded-3xl transition-all duration-700 ease-in-out
                        ${isCenter
                                                    ? 'w-48 md:w-64 lg:w-80 xl:w-96'
                                                    : 'w-32 md:w-48 lg:w-64 xl:w-72'
                                                }
                      `}
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-2xl sm:rounded-3xl"></div>

                                        {isCenter && (
                                            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
                                                <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-full px-2 sm:px-4 py-1 sm:py-2">
                                                    <span className="text-white text-xs sm:text-sm font-medium">Featured</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Universal Indicators */}
                    <div className="flex justify-center space-x-3 sm:space-x-4 mt-8 sm:mt-12 mb-4 sm:mb-6">
                        {[1, 2, 3, 4].map((_, index) => (
                            <div
                                key={index}
                                className={`
                  w-4 h-4 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ease-in-out cursor-pointer
                  touch-manipulation
                  ${index === activeCarouselIndex
                                        ? 'bg-white/90 backdrop-blur-xl border border-white/40 shadow-lg shadow-white/20'
                                        : 'bg-gray-600/80 border border-gray-500/50 backdrop-blur-sm hover:bg-gray-500/80'
                                    }
                `}
                                style={{ transform: 'none' }}
                                onClick={() => handleImageSelect(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});
