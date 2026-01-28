import React, { RefObject, memo } from 'react';
import { Download as DownloadIcon, Loader, ArrowRight, Github, ExternalLink, Shield, Zap, HelpCircle } from 'lucide-react';

interface DownloadProps {
    downloadRef: RefObject<HTMLDivElement>;
    visibleSections: Set<string>;
    releaseData: {
        version: string;
        downloadUrl: string;
        fileSize: string;
        publishedAt: string;
        isLoading: boolean;
        error: string | null;
    };
    handleSetHovered: (element: string | null) => void;
}

export const Download = memo(function Download({ downloadRef, visibleSections, releaseData, handleSetHovered }: DownloadProps) {
    return (
        <section ref={downloadRef} id="download" className="relative z-10 py-16 px-6 sm:px-8 lg:px-12">
            <div className="max-w-5xl mx-auto">
                <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/12 to-white/6 border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-purple-500/6 to-cyan-500/8"></div>

                    <div className={`relative z-10 p-6 sm:p-8 md:p-12 text-center transition-all duration-1000 ${visibleSections.has('download') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                        {/* Download Icon */}
                        <div className={`flex justify-center mb-4 sm:mb-6 transition-all duration-700 delay-200 ${visibleSections.has('download') ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                            }`}>
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-2xl border border-blue-500/30 rounded-xl sm:rounded-2xl flex items-center justify-center">
                                <DownloadIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                        </div>

                        <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 tracking-tight font-display px-2 transition-all duration-700 delay-300 ${visibleSections.has('download') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}>
                            <span className="inline-block text-white">Ready to Transform Your Workflow?</span>
                        </h2>

                        <p className={`text-base sm:text-lg md:text-xl text-white/80 mb-6 max-w-3xl mx-auto font-light leading-relaxed px-2 transition-all duration-700 delay-400 ${visibleSections.has('download') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            Join thousands of developers and power users who have upgraded their clipboard experience.
                        </p>

                        {releaseData.error && (
                            <div className="mb-8 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-white">
                                <p className="font-medium">Could not fetch the latest release. Using default download link.</p>
                                <p className="text-sm text-white/80 mt-1">{releaseData.error}</p>
                            </div>
                        )}

                        {/* Version Info */}
                        <div className={`flex justify-center mb-6 sm:mb-8 transition-all duration-700 delay-500 ${visibleSections.has('download') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}>
                            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 p-4 sm:p-6 backdrop-blur-2xl bg-white/8 border border-white/15 rounded-xl sm:rounded-2xl w-full sm:w-auto">
                                <div className="text-center">
                                    <div className="text-white/70 text-xs sm:text-sm uppercase tracking-wide mb-1">Version</div>
                                    <div className="text-white font-bold text-base sm:text-lg flex items-center justify-center">
                                        {releaseData.isLoading ? (
                                            <div className="flex items-center space-x-2">
                                                <Loader className="w-4 h-4 animate-spin" />
                                                <span className="text-white/70 text-sm">Loading...</span>
                                            </div>
                                        ) : (
                                            releaseData.version
                                        )}
                                    </div>
                                </div>
                                <div className="hidden sm:block w-px h-8 bg-white/20"></div>
                                <div className="text-center">
                                    <div className="text-white/70 text-xs sm:text-sm uppercase tracking-wide mb-1">Size</div>
                                    <div className="text-white font-bold text-base sm:text-lg">
                                        {releaseData.isLoading ? "—" : releaseData.fileSize}
                                    </div>
                                </div>
                                <div className="hidden sm:block w-px h-8 bg-white/20"></div>
                                <div className="text-center">
                                    <div className="text-white/70 text-xs sm:text-sm uppercase tracking-wide mb-1">Requirements</div>
                                    <div className="text-white font-bold text-base sm:text-lg">macOS 11.0+</div>
                                </div>
                                {releaseData.publishedAt && (
                                    <>
                                        <div className="hidden sm:block w-px h-8 bg-white/20"></div>
                                        <div className="text-center">
                                            <div className="text-white/70 text-xs sm:text-sm uppercase tracking-wide mb-1">Released</div>
                                            <div className="text-white font-bold text-base sm:text-lg">{releaseData.publishedAt}</div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Download Actions */}
                        <div className={`flex flex-col gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 transition-all duration-700 delay-600 ${visibleSections.has('download') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}>
                            <a
                                href={releaseData.downloadUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-br from-blue-500/80 to-purple-500/80 backdrop-blur-2xl border border-blue-500/60 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-400 hover:scale-105 hover:shadow-xl text-white w-full sm:w-auto"
                                onMouseEnter={() => handleSetHovered('button')}
                                onMouseLeave={() => handleSetHovered(null)}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/15 to-cyan-400/20 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative flex items-center justify-center space-x-3">
                                    {releaseData.isLoading ? (
                                        <Loader className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                                    ) : (
                                        <DownloadIcon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
                                    )}
                                    <span>{releaseData.isLoading ? "Fetching latest release..." : "Download for macOS"}</span>
                                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </div>
                            </a>

                            <a
                                href="https://github.com/Jnani-Smart/Clippy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-br from-white/15 to-white/8 backdrop-blur-2xl border border-white/25 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-400 hover:scale-105 hover:shadow-xl text-white w-full sm:w-auto"
                                onMouseEnter={() => handleSetHovered('button')}
                                onMouseLeave={() => handleSetHovered(null)}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative flex items-center justify-center space-x-3">
                                    <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                                    <span>View Source</span>
                                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </div>
                            </a>
                        </div>

                        {/* Trust Indicators */}
                        <div className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/70 mb-6 sm:mb-8 transition-all duration-700 delay-700 ${visibleSections.has('download') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <div className="flex items-center space-x-3">
                                <Shield className="w-5 h-5 text-green-400" />
                                <span className="text-sm font-semibold">100% Secure</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Zap className="w-5 h-5 text-blue-400" />
                                <span className="text-sm font-semibold">Instant Setup</span>
                            </div>
                        </div>

                        {/* Download Note */}
                        <div className={`flex flex-col items-center justify-center space-y-3 transition-all duration-700 delay-800 ${visibleSections.has('download') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <div className="flex items-center justify-center space-x-2 text-white text-sm sm:text-base">
                                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>Free and open source. No registration required.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});
