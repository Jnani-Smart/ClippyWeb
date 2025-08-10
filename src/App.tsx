import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Command, 
  Search, 
  Pin, 
  Filter, 
  Moon, 
  Shield, 
  Zap, 
  Download, 
  Star,
  Loader,
  Play,
  Image,
  FileText,
  Link,
  Code,
  Eye,
  Settings,
  ArrowRight,
  Clipboard,
  Github,
  ExternalLink,
  HelpCircle,
  Scale,
  GitBranch,
  Menu,
  X
} from 'lucide-react';

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

  const features = [
    {
      icon: Command,
      title: "Instant Access",
      description: "Summon Clippy with ⌘+⇧+V from anywhere on your Mac",
      gradient: "from-blue-500/20 via-cyan-500/15 to-blue-600/20",
      accent: "blue"
    },
    {
      icon: Search,
      title: "Intelligent Search",
      description: "Find any clipboard item with lightning-fast fuzzy search",
      gradient: "from-purple-500/20 via-violet-500/15 to-purple-600/20",
      accent: "purple"
    },
    {
      icon: Pin,
      title: "Smart Pinning",
      description: "Keep your most important clips always within reach",
      gradient: "from-emerald-500/20 via-green-500/15 to-emerald-600/20",
      accent: "emerald"
    },
    {
      icon: Filter,
      title: "Advanced Filtering",
      description: "Organize by content type with intelligent categorization",
      gradient: "from-orange-500/20 via-amber-500/15 to-orange-600/20",
      accent: "orange"
    }
  ];

  const contentTypes = [
    { 
      icon: FileText, 
      title: "Rich Text", 
      description: "Plain text, formatted content, and rich media with full styling preservation across devices",
      color: "emerald",
      stats: "Perfect Formatting",
      usage: "85%"
    },
    { 
      icon: Code, 
      title: "Code Snippets", 
      description: "Syntax highlighting for 200+ programming languages with intelligent code detection",
      color: "purple",
      stats: "200+ Languages",
      usage: "65%"
    },
    { 
      icon: Link, 
      title: "Smart URLs", 
      description: "Store and organize URLs with quick preview options when you need to check content",
      color: "blue",
      stats: "Quick Preview",
      usage: "78%"
    },
    { 
      icon: Image, 
      title: "Visual Content", 
      description: "Screenshots, images, and visual assets with quick preview and easy access",
      color: "orange",
      stats: "Any Format",
      usage: "45%"
    }
  ];

  const testimonials = [
    {
      name: "Saran Kathiravan",
      role: "Senior Developer at Apple",
      content: "Clippy has revolutionized my development workflow. The VisionOS-inspired interface is absolutely stunning.",
      rating: 5,
      avatar: "SK"
    },
    {
      name: "Khyathi Jain",
      role: "Design Lead at Figma",
      content: "The attention to detail in Clippy's interface is incredible. It feels like a native Apple application.",
      rating: 5,
      avatar: "KJ"
    },
    {
      name: "Srikar K",
      role: "Product Manager at Stripe",
      content: "I can't imagine working without Clippy now. It's become an essential part of my daily workflow.",
      rating: 5,
      avatar: "SR"
    }
  ];

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
  }, []);

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

  // Fetch latest release data from GitHub with improved error handling and caching
  // Note: Set VITE_GITHUB_TOKEN environment variable for authenticated API access
  useEffect(() => {
    const fetchLatestRelease = async () => {
      try {
        // Check if we have cached data and it's not too old (cache for 1 hour)
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

        // Try to fetch from GitHub API with authentication
        const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
        const headers: HeadersInit = {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Clippy-Web-App'
        };
        
        // Only add authorization header if token is available
        if (githubToken) {
          headers['Authorization'] = `token ${githubToken}`;
        }
        
        const response = await fetch('https://api.github.com/repos/Jnani-Smart/Clippy/releases/latest', {
          headers
        });
        
        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('GitHub API rate limit exceeded or authentication failed. Please check your token.');
          } else if (response.status === 401) {
            throw new Error('GitHub authentication failed. Please check your access token.');
          } else if (response.status === 404) {
            throw new Error('Repository not found or access denied.');
          } else {
            throw new Error(`GitHub API error: ${response.status} - ${response.statusText}`);
          }
        }
        
        const data = await response.json();
        
        // Find the macOS asset (assuming it has "mac" or "dmg" in the name)
        const macAsset = data.assets.find((asset: any) => 
          asset.name.toLowerCase().includes('mac') || 
          asset.name.toLowerCase().includes('dmg')
        );
        
        if (!macAsset) {
          throw new Error('No macOS download found in this release');
        }
        
        // Convert bytes to MB
        const fileSizeInMB = (macAsset.size / (1024 * 1024)).toFixed(1);
        
        // Format date as DD/MM/YYYY
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

        // Cache the successful response
        localStorage.setItem('clippy-release-data', JSON.stringify({
          data: releaseInfo,
          timestamp: Date.now()
        }));

        setReleaseData(releaseInfo);
      } catch (error) {
        console.error('Failed to fetch release data:', error);
        
        // Try to use cached data even if expired as fallback
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
          } catch (cacheError) {
            console.error('Failed to parse cached data:', cacheError);
          }
        }

        // Set error state with helpful message
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

    // Carousel auto-scroll
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

    // Only track mouse movement on desktop devices (not mobile)
    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    
    if (isDesktop) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      clearInterval(carouselInterval);
      if (isDesktop) {
        window.removeEventListener('mousemove', handleMouseMove as any);
      }
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [prefersReducedMotion]);

  // Handle manual image selection with auto-pause
  const handleImageSelect = (index: number) => {
    setActiveCarouselIndex(index);
    setIsCarouselPaused(true);
    
    // Resume auto-scrolling after 30 seconds
    setTimeout(() => {
      setIsCarouselPaused(false);
    }, 30000);
  };

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

    const sections = [heroRef, featuresRef, galleryRef, downloadRef];
    sections.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sections.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  // Intersection Observer for feature cards (mobile scroll animation)
  useEffect(() => {
    if (!isMobile) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        setVisibleFeatureCards((prev) => {
          const updated = new Set(prev);
          entries.forEach((entry) => {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            if (entry.isIntersecting) {
              updated.add(idx);
            } else {
              updated.delete(idx);
            }
          });
          return updated;
        });
      },
      { threshold: 0.3 }
    );
    featureCardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => {
      featureCardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [isMobile, features.length]);

  // Intersection Observer for content type cards (mobile scroll animation)
  useEffect(() => {
    if (!isMobile) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        setVisibleContentTypeCards((prev) => {
          const updated = new Set(prev);
          entries.forEach((entry) => {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            if (entry.isIntersecting) {
              updated.add(idx);
            } else {
              updated.delete(idx);
            }
          });
          return updated;
        });
      },
      { threshold: 0.3 }
    );
    contentTypeCardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => {
      contentTypeCardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [isMobile, contentTypes.length]);

  // Intersection Observer for testimonial cards (mobile scroll animation)
  useEffect(() => {
    if (!isMobile) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        setVisibleTestimonialCards((prev) => {
          const updated = new Set(prev);
          entries.forEach((entry) => {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            if (entry.isIntersecting) {
              updated.add(idx);
            } else {
              updated.delete(idx);
            }
          });
          return updated;
        });
      },
      { threshold: 0.3 }
    );
    testimonialCardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => {
      testimonialCardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [isMobile, testimonials.length]);

  const detailedFeatures = [
    {
      icon: Clipboard,
      title: "Unlimited History",
      description: "Store unlimited clipboard items with intelligent memory management. Never lose important content again with our advanced storage system.",
      highlight: "∞ Storage",
      accent: "blue",
      stats: "99.9% Reliability"
    },
    {
      icon: Eye,
      title: "Universal Clipboard",
      description: "Seamlessly sync clipboard items across all your Apple devices with the same iCloud account. Copy on your iPhone, paste on your Mac.",
      highlight: "Cross-Device",
      accent: "purple",
      stats: "iCloud Sync"
    },
    {
      icon: Moon,
      title: "Adaptive Interface",
      description: "Seamlessly adapts to your macOS appearance with pixel-perfect dark and light themes that feel truly native.",
      highlight: "Native Feel",
      accent: "indigo",
      stats: "Perfect Integration"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your clipboard data never leaves your device. End-to-end encryption ensures your sensitive information stays secure.",
      highlight: "Zero Cloud",
      accent: "green",
      stats: "256-bit Encryption"
    },
    {
      icon: Zap,
      title: "Ultra Performance",
      description: "Optimized for Apple Silicon with minimal resource usage. Lightning-fast search through thousands of clipboard items.",
      highlight: "Apple Silicon",
      accent: "yellow",
      stats: "<1% CPU Usage"
    },
    {
      icon: Settings,
      title: "Power User Tools",
      description: "Advanced customization options, keyboard shortcuts, data export, and workflow automation for professional users.",
      highlight: "Pro Features",
      accent: "pink",
      stats: "50+ Settings"
    }
  ];

  const getAccentColor = (accent: string) => {
    const colors = {
      blue: 'text-blue-400',
      purple: 'text-purple-400',
      indigo: 'text-indigo-400',
      green: 'text-green-400',
      yellow: 'text-yellow-400',
      pink: 'text-pink-400',
      emerald: 'text-emerald-400',
      orange: 'text-orange-400'
    };
    return colors[accent as keyof typeof colors] || 'text-blue-400';
  };

  const getBorderColor = (accent: string) => {
    const colors = {
      blue: 'border-blue-500/30',
      purple: 'border-purple-500/30',
      indigo: 'border-indigo-500/30',
      green: 'border-green-500/30',
      yellow: 'border-yellow-500/30',
      pink: 'border-pink-500/30',
      emerald: 'border-emerald-500/30',
      orange: 'border-orange-500/30'
    };
    return colors[accent as keyof typeof colors] || 'border-blue-500/30';
  };

  function AssetPicture({ index, sizes, className, alt, eager = false, style, draggable }: { index: number; sizes?: string; className?: string; alt: string; eager?: boolean; style?: React.CSSProperties; draggable?: boolean }) {
    const png = `/Assets/${index}.png`;
    const webp = `/Assets/${index}.webp`;
    const avif = `/Assets/${index}.avif`;
    const loading = eager ? 'eager' : 'lazy';
    const fetchPriority = eager ? 'high' : undefined;
    return (
      <picture>
        <source srcSet={avif} type="image/avif" />
        <source srcSet={webp} type="image/webp" />
        <img src={png} alt={alt} loading={loading as any} decoding="async" fetchPriority={fetchPriority as any} sizes={sizes} className={className} style={style} draggable={draggable} />
      </picture>
    );
  }

  // Helper functions for desktop-only hover effects
  const handleSetHovered = (element: string | null) => {
    // Only set hover state on desktop devices
    if (window.matchMedia('(pointer: fine)').matches) {
      setHoveredElement(element);
    }
  };

  // Professional cursor sizing logic
  const cursorSizeMap: Record<string, string> = {
    button: 'clamp(2.2rem, 3vw, 2.8rem)', // 35-45px
    card: 'clamp(1.7rem, 2.5vw, 2.2rem)', // 27-35px
    link: 'clamp(1.3rem, 2vw, 1.7rem)', // 21-27px
    default: 'clamp(1rem, 1.5vw, 1.3rem)', // 16-21px
  };
  const cursorSize = cursorSizeMap[hoveredElement || 'default'] || cursorSizeMap.default;

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
    <div className="min-h-screen w-screen bg-black text-white font-inter antialiased overflow-y-auto overflow-x-hidden">
      {/* Launch Animation Overlay */}
      {showLaunchAnimation && (
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
      )}

      {/* Advanced Adaptive Cursor - Hidden on mobile */}
      <div 
        ref={cursorRef}
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
        <div className={`w-full h-full rounded-full transition-all duration-300 ${
          hoveredElement === 'button' ? 'bg-gradient-to-r from-gray-300 to-gray-500 opacity-80' :
          hoveredElement === 'card' ? 'bg-gray-200 opacity-60' :
          hoveredElement === 'link' ? 'bg-gray-300 opacity-70' :
          'bg-gray-400 opacity-50'
        }`}></div>
        <div className={`absolute inset-1 rounded-full transition-all duration-300 ${
          hoveredElement === 'button' ? 'bg-white opacity-20' :
          hoveredElement === 'card' ? 'bg-white opacity-30' :
          hoveredElement === 'link' ? 'bg-white opacity-40' :
          'bg-white opacity-20'
        }`}></div>
      </div>

      {/* Enhanced Dynamic Background */}
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

      {/* Premium Header */}
      <header className="relative z-40 backdrop-blur-2xl bg-white/[0.03] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-2 group cursor-pointer"
              onMouseEnter={() => handleSetHovered('link')}
              onMouseLeave={() => handleSetHovered(null)}
            >
              <div className="relative">
                <div className="w-14 h-14 flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                  <img 
                    src="/logo.png" 
                    alt="Clippy Logo" 
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-12 h-12 group-hover:rotate-6 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="flex items-center h-full">
                <span className="text-2xl font-black inline-block text-white tracking-tight font-display clippy-text">Clippy</span>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-1">
              {[
                { name: 'Features', href: '#features' },
                { name: 'Gallery', href: '#gallery' },
                { name: 'Testimonials', href: '#testimonials' },
                { name: 'Download', href: '#download' }
              ].map((item) => (
                <a 
                  key={item.name}
                  href={item.href} 
                  aria-label={item.name}
                  className={`relative group px-5 py-2 rounded-xl transition-all duration-300 hover:bg-white/8${isMobile ? ' pressed min-w-[44px] min-h-[44px]' : ''}`}
                  onMouseEnter={() => handleSetHovered('link')}
                  onMouseLeave={() => handleSetHovered(null)}
                >
                  <span className="relative z-10 text-white/90 font-medium text-base">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/8 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              ))}
              
              {/* External Links */}
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-white/10">
                <a 
                  href="https://github.com/Jnani-Smart/Clippy" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View on GitHub"
                  className={`relative group p-2 rounded-xl transition-all duration-300 hover:bg-white/8${isMobile ? ' pressed min-w-[44px] min-h-[44px]' : ''}`}
                  onMouseEnter={() => handleSetHovered('link')}
                  onMouseLeave={() => handleSetHovered(null)}
                  title="View on GitHub"
                >
                  <Github className="w-6 h-6 text-white/70 group-hover:text-white transition-colors duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/8 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                
                <a 
                  href="https://github.com/Jnani-Smart/Clippy/releases" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Releases"
                  className={`relative group p-2 rounded-xl transition-all duration-300 hover:bg-white/8${isMobile ? ' pressed min-w-[44px] min-h-[44px]' : ''}`}
                  onMouseEnter={() => handleSetHovered('link')}
                  onMouseLeave={() => handleSetHovered(null)}
                  title="Releases"
                >
                  <GitBranch className="w-6 h-6 text-white/70 group-hover:text-white transition-colors duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/8 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                
                <a 
                  href="https://github.com/Jnani-Smart/Clippy/issues" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Support"
                  className={`relative group p-2 rounded-xl transition-all duration-300 hover:bg-white/8${isMobile ? ' pressed min-w-[44px] min-h-[44px]' : ''}`}
                  onMouseEnter={() => handleSetHovered('link')}
                  onMouseLeave={() => handleSetHovered(null)}
                  title="Support"
                >
                  <HelpCircle className="w-6 h-6 text-white/70 group-hover:text-white transition-colors duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/8 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
            </nav>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="inline-flex items-center justify-center p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {[
                { name: 'Features', href: '#features' },
                { name: 'Gallery', href: '#gallery' },
                { name: 'Testimonials', href: '#testimonials' },
                { name: 'Download', href: '#download' }
              ].map((item) => (
                <a 
                  key={item.name}
                  href={item.href} 
                  aria-label={item.name}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-white hover:bg-white/10"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-white/10">
              <div className="flex items-center justify-center px-5 space-x-4">
                <a 
                  href="https://github.com/Jnani-Smart/Clippy" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View on GitHub"
                  className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10"
                  title="View on GitHub"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a 
                  href="https://github.com/Jnani-Smart/Clippy/releases" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Releases"
                  className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10"
                  title="Releases"
                >
                  <GitBranch className="w-6 h-6" />
                </a>
                <a 
                  href="https://github.com/Jnani-Smart/Clippy/issues" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Support"
                  className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10"
                  title="Support"
                >
                  <HelpCircle className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - Redesigned */}
      <section ref={heroRef} id="hero" className="relative z-10 pt-16 pb-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className={`transition-all duration-1200 ${isVisible && launchAnimationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              {/* Hero Icon */}
              <div className="flex justify-center mb-4">
                <div 
                  className={`relative group cursor-pointer transition-all duration-1000 ${
                    launchAnimationComplete ? 'animate-hero-logo-entrance' : ''
                  }`}
                  style={{ willChange: 'transform, opacity, filter' }}
                  onMouseEnter={() => handleSetHovered('card')}
                  onMouseLeave={() => handleSetHovered(null)}
                >
                  <div 
                    className={`w-64 h-64 flex items-center justify-center group-hover:scale-105 transition-all duration-500 ${
                      launchAnimationComplete ? 'animate-pulse-subtle' : ''
                    }`}
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
                ref={el => featureCardRefs.current[index] = el}
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

      {/* Detailed Features Section */}
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
                className={`group relative p-6 backdrop-blur-2xl bg-gradient-to-br from-white/6 to-white/3 border border-white/12 rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer ${
                  visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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

      {/* Content Types Section */}
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
                ref={el => contentTypeCardRefs.current[index] = el}
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

      {/* Gallery Section */}
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

      {/* Testimonials Section */}
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
                ref={el => testimonialCardRefs.current[index] = el}
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

      {/* Download Section */}
      <section ref={downloadRef} id="download" className="relative z-10 py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/12 to-white/6 border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-purple-500/6 to-cyan-500/8"></div>
            
            <div className={`relative z-10 p-6 sm:p-8 md:p-12 text-center transition-all duration-1000 ${
              visibleSections.has('download') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Download Icon */}
              <div className={`flex justify-center mb-4 sm:mb-6 transition-all duration-700 delay-200 ${
                visibleSections.has('download') ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-2xl border border-blue-500/30 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <Download className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
              
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 tracking-tight font-display px-2 transition-all duration-700 delay-300 ${
                visibleSections.has('download') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                <span className="inline-block text-white">Ready to Transform Your Workflow?</span>
              </h2>
              
              <p className={`text-base sm:text-lg md:text-xl text-white/80 mb-6 max-w-3xl mx-auto font-light leading-relaxed px-2 transition-all duration-700 delay-400 ${
                visibleSections.has('download') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
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
              <div className={`flex justify-center mb-6 sm:mb-8 transition-all duration-700 delay-500 ${
                visibleSections.has('download') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
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
              <div className={`flex flex-col gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 transition-all duration-700 delay-600 ${
                visibleSections.has('download') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
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
                      <Download className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
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
              <div className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/70 mb-6 sm:mb-8 transition-all duration-700 delay-700 ${
                visibleSections.has('download') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
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
              <div className={`flex flex-col items-center justify-center space-y-3 transition-all duration-700 delay-800 ${
                visibleSections.has('download') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
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

      {/* Premium Footer */}
      <footer className="relative z-10 backdrop-blur-2xl bg-white/6 border-t border-white/12 py-12">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div 
              className="flex items-center space-x-2 group cursor-pointer"
              onMouseEnter={() => handleSetHovered('link')}
              onMouseLeave={() => handleSetHovered(null)}
            >
              <div className="w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <img 
                  src="/logo.png" 
                  alt="Clippy Logo" 
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-12 h-12 group-hover:rotate-6 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-2xl font-black inline-block text-white tracking-tight font-display clippy-text">Clippy</span>
              </div>
            </div>
            
            {/* Footer Links */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href="https://github.com/Jnani-Smart/Clippy"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-300"
                onMouseEnter={() => handleSetHovered('link')}
                onMouseLeave={() => handleSetHovered(null)}
              >
                <Github className="w-5 h-5" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              
              <a
                href="https://github.com/Jnani-Smart/Clippy/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-300"
                onMouseEnter={() => handleSetHovered('link')}
                onMouseLeave={() => handleSetHovered(null)}
              >
                <GitBranch className="w-5 h-5" />
                <span className="text-sm font-medium">Releases</span>
              </a>
              
              <a
                href="https://github.com/Jnani-Smart/Clippy/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-300"
                onMouseEnter={() => handleSetHovered('link')}
                onMouseLeave={() => handleSetHovered(null)}
              >
                <HelpCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Support</span>
              </a>
              
              <a
                href="https://github.com/Jnani-Smart/Clippy/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-300"
                onMouseEnter={() => handleSetHovered('link')}
                onMouseLeave={() => handleSetHovered(null)}
              >
                <Scale className="w-5 h-5" />
                <span className="text-sm font-medium">License</span>
              </a>
            </div>
            
            <div className="text-center lg:text-right">
              <div className="text-white/70 text-sm font-light mb-1">
                © 2025 Jnani Smart. All rights reserved.
              </div>
              <div className="text-white/50 text-xs">
                Open source under MIT License
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;