import React, { forwardRef } from 'react';

interface AdaptiveCursorProps {
    cursorSize: string;
    hoveredElement: string | null;
}

export const AdaptiveCursor = forwardRef<HTMLDivElement, AdaptiveCursorProps>(({ cursorSize, hoveredElement }, ref) => {
    return (
        <div
            ref={ref}
            className="fixed pointer-events-none z-50 transition-all duration-300 ease-out hidden md:block will-change-transform"
            style={{
                width: cursorSize,
                height: cursorSize,
                left: 0,
                top: 0,
                minWidth: '1rem',
                minHeight: '1rem',
                maxWidth: '3.5rem',
                maxHeight: '3.5rem',
                transform: 'translate3d(-9999px, -9999px, 0)'
            }}
        >
            <div className={`w-full h-full rounded-full transition-all duration-300 ${hoveredElement === 'button' ? 'bg-gradient-to-r from-gray-300 to-gray-500 opacity-80' :
                    hoveredElement === 'card' ? 'bg-gray-200 opacity-60' :
                        hoveredElement === 'link' ? 'bg-gray-300 opacity-70' :
                            'bg-gray-400 opacity-50'
                }`}></div>
            <div className={`absolute inset-1 rounded-full transition-all duration-300 ${hoveredElement === 'button' ? 'bg-white opacity-20' :
                    hoveredElement === 'card' ? 'bg-white opacity-30' :
                        hoveredElement === 'link' ? 'bg-white opacity-40' :
                            'bg-white opacity-20'
                }`}></div>
        </div>
    );
});
