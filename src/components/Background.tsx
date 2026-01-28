import React from 'react';

export function Background() {
    return (
        <div className="fixed inset-0 overflow-hidden">
            <div
                className="absolute inset-0 opacity-30"
            >
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/8 via-cyan-500/6 to-blue-600/8 rounded-full blur-3xl animate-float-bg"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/8 via-violet-500/6 to-purple-600/8 rounded-full blur-3xl animate-float-bg" style={{ animationDelay: '5s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/8 via-green-500/6 to-emerald-600/8 rounded-full blur-3xl animate-float-bg" style={{ animationDelay: '10s' }}></div>
            </div>

            {/* Enhanced Floating Particles */}
            <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/15 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${4 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>
        </div>
    );
}
