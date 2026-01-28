import { useState, useEffect, useRef, useCallback } from 'react';
import { LaunchAnimation } from './components/LaunchAnimation';
import { Background } from './components/Background';
import { AdaptiveCursor } from './components/AdaptiveCursor';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ContentTypes } from './components/ContentTypes';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { Download } from './components/Download';
import { Footer } from './components/Footer';
import { cursorSizeMap } from './utils/theme';
// features, contentTypes, testimonials are used in components, not here


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  // Cursor refs for rAF-powered updates (no React re-renders)
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const lastMouseXRef = useRef(0);
  const lastMouseYRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(1); // Start with middle image
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [showLaunchAnimation, setShowLaunchAnimation] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [launchAnimationComplete, setLaunchAnimationComplete] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  // Intersection observer states for scroll animations
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  // Track which feature cards are in view (for mobile scroll animation)
  const [visibleFeatureCards, setVisibleFeatureCards] = useState<Set<number>>(new Set());
  const featureCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Track which content type cards are in view (for mobile scroll animation)
  const [visibleContentTypeCards, setVisibleContentTypeCards] = useState<Set<number>>(new Set());
  const contentTypeCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Track which testimonial cards are in view (for mobile scroll animation)
  const [visibleTestimonialCards, setVisibleTestimonialCards] = useState<Set<number>>(new Set());
  const testimonialCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Helper to detect mobile
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);

  const [releaseData, setReleaseData] = useState<{
    version: string;
    downloadUrl: string;
    fileSize: string;
    publishedAt: string;
    isLoading: boolean;
    error: string | null;
  }>({
    version: "1.6.0", // Default fallback version
    downloadUrl: "https://github.com/Jnani-Smart/Clippy/releases/latest",
    fileSize: "8.2 MB", // Default fallback size
    publishedAt: "",
    isLoading: true,
    error: null
  });

  // Detect reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  // App ready check - ensure all resources are loaded
  useEffect(() => {
    const checkAppReady = async () => {
      // Wait for images to load
      const imagePromises = [
        '/logo.png',
        '/Assets/1.png',
        '/Assets/2.png',
        '/Assets/3.png',
        '/Assets/4.png'
      ].map(src => {
        return new Promise((resolve) => {
          const img = document.createElement('img');
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false); // Continue even if image fails
          img.src = src;
        });
      });

      // Wait for all images to load with a minimum delay
      await Promise.all([
        Promise.all(imagePromises),
        new Promise(resolve => setTimeout(resolve, prefersReducedMotion ? 300 : 1000))
      ]);

      setIsAppReady(true);
    };

    checkAppReady();
  }, [prefersReducedMotion]);

  // Launch animation effect

  useEffect(() => {
    // Use sessionStorage to show animation once per tab/window session
    const hasSeenLaunchAnimation = sessionStorage.getItem('clippy-launch-animation-seen');
    let minDurationTimeout: NodeJS.Timeout | null = null;
    let fallbackTimeout: NodeJS.Timeout | null = null;
    let checkReady: NodeJS.Timeout | null = null;
    let minDurationPassed = false;

    if (!hasSeenLaunchAnimation) {
      setShowLaunchAnimation(true);
      setLaunchAnimationComplete(false);
      // Minimum duration for the animation (e.g., 3 seconds)
      minDurationTimeout = setTimeout(() => {
        minDurationPassed = true;
      }, 3000);

      // Fallback timeout to prevent getting stuck (e.g., 8 seconds)
      fallbackTimeout = setTimeout(() => {
        setShowLaunchAnimation(false);
        // Use double requestAnimationFrame for smooth hero animation
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setLaunchAnimationComplete(true);
          });
        });
        sessionStorage.setItem('clippy-launch-animation-seen', 'true');
      }, 8000);

      // Wait for app to be ready and minimum duration to pass
      checkReady = setInterval(() => {
        if (isAppReady && minDurationPassed) {
          clearInterval(checkReady!);
          clearTimeout(fallbackTimeout!);
          setTimeout(() => {
            setShowLaunchAnimation(false);
            // Use double requestAnimationFrame for smooth hero animation
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setLaunchAnimationComplete(true);
              });
            });
            sessionStorage.setItem('clippy-launch-animation-seen', 'true');
          }, 500); // Small delay for smoothness
        }
      }, 100);
    } else {
      setShowLaunchAnimation(false);
      setLaunchAnimationComplete(true);
      setIsAppReady(true);
    }

    return () => {
      if (checkReady) clearInterval(checkReady);
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
      if (minDurationTimeout) clearTimeout(minDurationTimeout);
    };
  }, [isAppReady]);

  // Fetch latest release data
  useEffect(() => {
    const fetchLatestRelease = async () => {
      try {
        const cachedData = localStorage.getItem('clippy-release-data');
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          const cacheAge = Date.now() - parsed.timestamp;
          if (cacheAge < 60 * 60 * 1000) { // 1 hour
            setReleaseData({
              ...parsed.data,
              isLoading: false,
              error: null
            });
            return;
          }
        }

        const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
        const headers: HeadersInit = {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Clippy-Web-App'
        };

        if (githubToken) {
          headers['Authorization'] = `token ${githubToken}`;
        }

        const response = await fetch('https://api.github.com/repos/Jnani-Smart/Clippy/releases/latest', {
          headers
        });

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();

        const macAsset = data.assets.find((asset: { name: string; size: number; browser_download_url: string }) =>
          asset.name.toLowerCase().includes('mac') ||
          asset.name.toLowerCase().includes('dmg')
        );

        if (!macAsset) {
          throw new Error('No macOS download found in this release');
        }

        const fileSizeInMB = (macAsset.size / (1024 * 1024)).toFixed(1);

        const publishDate = new Date(data.published_at);
        const day = String(publishDate.getDate()).padStart(2, '0');
        const month = String(publishDate.getMonth() + 1).padStart(2, '0');
        const year = publishDate.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        const releaseInfo = {
          version: data.tag_name.replace('v', ''),
          downloadUrl: macAsset.browser_download_url,
          fileSize: `${fileSizeInMB} MB`,
          publishedAt: formattedDate,
          isLoading: false,
          error: null
        };

        localStorage.setItem('clippy-release-data', JSON.stringify({
          data: releaseInfo,
          timestamp: Date.now()
        }));

        setReleaseData(releaseInfo);
      } catch (error) {
        const cachedData = localStorage.getItem('clippy-release-data');
        if (cachedData) {
          try {
            const parsed = JSON.parse(cachedData);
            setReleaseData({
              ...parsed.data,
              isLoading: false,
              error: 'Using cached data due to API error'
            });
            return;
          } catch { /* ignore */ }
        }

        setReleaseData(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        }));
      }
    };
    fetchLatestRelease();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, prefersReducedMotion ? 6000 : 4000);

    const carouselInterval = setInterval(() => {
      if (!isCarouselPaused) {
        setActiveCarouselIndex((prev) => (prev + 1) % 4);
      }
    }, prefersReducedMotion ? 7000 : 4000);

    const handleMouseMove = (e: MouseEvent) => {
      lastMouseXRef.current = e.clientX;
      lastMouseYRef.current = e.clientY;
      if (rafIdRef.current == null) {
        rafIdRef.current = requestAnimationFrame(() => {
          rafIdRef.current = null;
          const el = cursorRef.current;
          if (!el) return;
          const width = el.offsetWidth || 0;
          const height = el.offsetHeight || 0;
          const x = lastMouseXRef.current - width / 2;
          const y = lastMouseYRef.current - height / 2;
          el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
      }
    };

    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    if (isDesktop) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      clearInterval(carouselInterval);
      if (isDesktop) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [prefersReducedMotion, isCarouselPaused]);

  // Handle manual image selection with auto-pause
  const handleImageSelect = useCallback((index: number) => {
    setActiveCarouselIndex(index);
    setIsCarouselPaused(true);
    setTimeout(() => {
      setIsCarouselPaused(false);
    }, 30000);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentSections = [heroRef.current, featuresRef.current, galleryRef.current, downloadRef.current];
    currentSections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      currentSections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);


  // Intersection Observers for cards (mobile)
  useEffect(() => {
    if (!isMobile) return;

    // Capture refs to variables for cleanup safety
    const currentFeatureRefs = featureCardRefs.current;
    const currentContentRefs = contentTypeCardRefs.current;
    const currentTestimonialRefs = testimonialCardRefs.current;

    const createObserver = (
      setParams: React.Dispatch<React.SetStateAction<Set<number>>>
    ) => new window.IntersectionObserver(
      (entries) => {
        setParams((prev) => {
          const updated = new Set(prev);
          entries.forEach((entry) => {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            if (entry.isIntersecting) updated.add(idx);
            else updated.delete(idx);
          });
          return updated;
        });
      },
      { threshold: 0.3 }
    );

    const featureObserver = createObserver(setVisibleFeatureCards);
    currentFeatureRefs.forEach((ref) => { if (ref) featureObserver.observe(ref); });

    const contentObserver = createObserver(setVisibleContentTypeCards);
    currentContentRefs.forEach((ref) => { if (ref) contentObserver.observe(ref); });

    const testimonialObserver = createObserver(setVisibleTestimonialCards);
    currentTestimonialRefs.forEach((ref) => { if (ref) testimonialObserver.observe(ref); });

    return () => {
      currentFeatureRefs.forEach((ref) => { if (ref) featureObserver.unobserve(ref); });
      currentContentRefs.forEach((ref) => { if (ref) contentObserver.unobserve(ref); });
      currentTestimonialRefs.forEach((ref) => { if (ref) testimonialObserver.unobserve(ref); });
    };
  }, [isMobile]); // features.length etc are stable or ref-managed

  const handleSetHovered = useCallback((element: string | null) => {
    if (window.matchMedia('(pointer: fine)').matches) {
      setHoveredElement(element);
    }
  }, []);

  const cursorSize = cursorSizeMap[hoveredElement || 'default'] || cursorSizeMap.default;

  return (
    <div className="min-h-screen w-screen bg-black text-white font-inter antialiased overflow-y-auto overflow-x-hidden">
      {showLaunchAnimation && <LaunchAnimation isAppReady={isAppReady} />}

      <AdaptiveCursor
        ref={cursorRef}
        cursorSize={cursorSize}
        hoveredElement={hoveredElement}
      />

      <Background />

      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        handleSetHovered={handleSetHovered}
        isMobile={isMobile}
      />

      <Hero
        heroRef={heroRef}
        isVisible={isVisible}
        launchAnimationComplete={launchAnimationComplete}
        handleSetHovered={handleSetHovered}
        featureCardRefs={featureCardRefs}
        activeFeature={activeFeature}
        visibleFeatureCards={visibleFeatureCards}
        isMobile={isMobile}
      />

      <Features
        featuresRef={featuresRef}
        visibleSections={visibleSections}
        handleSetHovered={handleSetHovered}
      />

      <ContentTypes
        contentTypeCardRefs={contentTypeCardRefs}
        isMobile={isMobile}
        visibleContentTypeCards={visibleContentTypeCards}
        handleSetHovered={handleSetHovered}
      />

      <Gallery
        galleryRef={galleryRef}
        activeCarouselIndex={activeCarouselIndex}
        setActiveCarouselIndex={setActiveCarouselIndex}
        handleImageSelect={handleImageSelect}
        visibleSections={visibleSections}
        isMobile={isMobile}
      />

      <Testimonials
        testimonialCardRefs={testimonialCardRefs}
        isMobile={isMobile}
        visibleTestimonialCards={visibleTestimonialCards}
        handleSetHovered={handleSetHovered}
      />

      <Download
        downloadRef={downloadRef}
        visibleSections={visibleSections}
        releaseData={releaseData}
        handleSetHovered={handleSetHovered}
      />

      <Footer handleSetHovered={handleSetHovered} />
    </div>
  );
}

export default App;