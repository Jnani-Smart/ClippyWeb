import React from 'react';

interface LaunchAnimationProps {
    isAppReady: boolean;
}

export function LaunchAnimation({ isAppReady }: LaunchAnimationProps) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
            <div className="relative">
                {/* Animated Background */}
                <div className="absolute inset-0 -m-40">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-purple-500/12 to-cyan-500/8 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/6 via-pink-500/10 to-blue-500/6 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/4 via-blue-500/8 to-purple-500/6 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.2s' }}></div>
                </div>

                {/* Main Logo */}
                <div className="relative z-10">
                    <div className="w-96 h-96 flex items-center justify-center">
                        <img
                            src="/logo.png"
                            alt="Clippy Logo"
                            className="w-80 h-80 animate-launch-float"
                        />
                    </div>

                    {/* Elegant Text Below */}
                    <div className="text-center mt-8">
                        <h1 className="text-6xl font-black mb-4 tracking-tight leading-none font-display">
                            <span className="inline-block text-white clippy-text">
                                Clippy
                            </span>
                        </h1>
                        <div className="text-xl text-white/60 font-light tracking-wide uppercase">
                            Clipboard Manager Reimagined
                        </div>
                    </div>
                </div>

                {/* Elegant Loading Indicator - Positioned Much Lower */}
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2">
                    <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce-smooth"></div>
                        <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce-smooth" style={{ animationDelay: '0.15s' }}></div>
                        <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce-smooth" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                    <div className="text-white/40 text-xs font-light">
                        {isAppReady ? 'Ready!' : 'Loading...'}
                    </div>
                </div>
            </div>
        </div>
    );
}
