import { useState, useEffect, useRef } from 'react';
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(1); // Start with middle image
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
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

  // Fetch latest release data from GitHub
  useEffect(() => {
    const fetchLatestRelease = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/Jnani-Smart/Clippy/releases/latest');
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Find the macOS asset (assuming it has "mac" or "dmg" in the name)
        const macAsset = data.assets.find((asset: any) => 
          asset.name.toLowerCase().includes('mac') || 
          asset.name.toLowerCase().includes('dmg')
        );
        
        if (!macAsset) {
          throw new Error('No macOS download found');
        }
        
        // Convert bytes to MB
        const fileSizeInMB = (macAsset.size / (1024 * 1024)).toFixed(1);
        
        // Format date as DD/MM/YYYY
        const publishDate = new Date(data.published_at);
        const day = String(publishDate.getDate()).padStart(2, '0');
        const month = String(publishDate.getMonth() + 1).padStart(2, '0');
        const year = publishDate.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        
        setReleaseData({
          version: data.tag_name.replace('v', ''),
          downloadUrl: macAsset.browser_download_url,
          fileSize: `${fileSizeInMB} MB`,
          publishedAt: formattedDate,
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error('Failed to fetch release data:', error);
        setReleaseData(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error'
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
    }, 4000);

    // Carousel auto-scroll
    const carouselInterval = setInterval(() => {
      if (!isCarouselPaused) {
        setActiveCarouselIndex((prev) => (prev + 1) % 4);
      }
    }, 4000);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      clearInterval(carouselInterval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle manual image selection with auto-pause
  const handleImageSelect = (index: number) => {
    setActiveCarouselIndex(index);
    setIsCarouselPaused(true);
    
    // Resume auto-scrolling after 30 seconds
    setTimeout(() => {
      setIsCarouselPaused(false);
    }, 30000);
  };

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

  // Stats removed

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

  return (
    <div className="min-h-screen w-screen bg-black text-white font-inter antialiased overflow-y-auto overflow-x-hidden">
      {/* Advanced Adaptive Cursor */}
      <div 
        className={`fixed pointer-events-none z-50 transition-all duration-300 ease-out ${
          hoveredElement === 'button' ? 'w-16 h-16' : 
          hoveredElement === 'card' ? 'w-12 h-12' : 
          hoveredElement === 'link' ? 'w-10 h-10' : 'w-6 h-6'
        }`}
        style={{
          left: mousePosition.x - (hoveredElement === 'button' ? 32 : hoveredElement === 'card' ? 24 : hoveredElement === 'link' ? 20 : 12),
          top: mousePosition.y - (hoveredElement === 'button' ? 32 : hoveredElement === 'card' ? 24 : hoveredElement === 'link' ? 20 : 12)
        }}
      >
        <div className={`w-full h-full rounded-full transition-all duration-300 ${
          hoveredElement === 'button' ? 'bg-gradient-to-r from-blue-400 to-purple-400 opacity-80' :
          hoveredElement === 'card' ? 'bg-white opacity-60' :
          hoveredElement === 'link' ? 'bg-white opacity-70' :
          'bg-white opacity-50'
        } shadow-2xl`}></div>
        <div className={`absolute inset-1 rounded-full transition-all duration-300 ${
          hoveredElement === 'button' ? 'bg-white opacity-30' :
          hoveredElement === 'card' ? 'bg-white opacity-40' :
          hoveredElement === 'link' ? 'bg-white opacity-50' :
          'bg-white opacity-30'
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
              onMouseEnter={() => setHoveredElement('link')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <div className="relative">
                <div className="w-14 h-14 flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                  <img 
                    src="/logo.png" 
                    alt="Clippy Logo" 
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
                { name: 'Testimonials', href: '#testimonials' },
                { name: 'Gallery', href: '#gallery' },
                { name: 'Download', href: '#download' }
              ].map((item) => (
                <a 
                  key={item.name}
                  href={item.href} 
                  className="relative group px-5 py-2 rounded-xl transition-all duration-300 hover:bg-white/8"
                  onMouseEnter={() => setHoveredElement('link')}
                  onMouseLeave={() => setHoveredElement(null)}
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
                  className="relative group p-2 rounded-xl transition-all duration-300 hover:bg-white/8"
                  onMouseEnter={() => setHoveredElement('link')}
                  onMouseLeave={() => setHoveredElement(null)}
                  title="View on GitHub"
                >
                  <Github className="w-6 h-6 text-white/70 group-hover:text-white transition-colors duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/8 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                
                <a 
                  href="https://github.com/Jnani-Smart/Clippy/releases" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group p-2 rounded-xl transition-all duration-300 hover:bg-white/8"
                  onMouseEnter={() => setHoveredElement('link')}
                  onMouseLeave={() => setHoveredElement(null)}
                  title="Releases"
                >
                  <GitBranch className="w-6 h-6 text-white/70 group-hover:text-white transition-colors duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/8 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                
                <a 
                  href="https://github.com/Jnani-Smart/Clippy/issues" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group p-2 rounded-xl transition-all duration-300 hover:bg-white/8"
                  onMouseEnter={() => setHoveredElement('link')}
                  onMouseLeave={() => setHoveredElement(null)}
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
                { name: 'Testimonials', href: '#testimonials' },
                { name: 'Gallery', href: '#gallery' },
                { name: 'Download', href: '#download' }
              ].map((item) => (
                <a 
                  key={item.name}
                  href={item.href} 
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
                  className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10"
                  title="View on GitHub"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a 
                  href="https://github.com/Jnani-Smart/Clippy/releases" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10"
                  title="Releases"
                >
                  <GitBranch className="w-6 h-6" />
                </a>
                <a 
                  href="https://github.com/Jnani-Smart/Clippy/issues" 
                  target="_blank"
                  rel="noopener noreferrer"
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
      <section ref={heroRef} className="relative z-10 pt-16 pb-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className={`transition-all duration-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              {/* Hero Icon */}
              <div className="flex justify-center mb-4">
                <div 
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredElement('card')}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <div 
                    className="w-64 h-64 flex items-center justify-center group-hover:scale-105 transition-all duration-500"
                  >
                    <img 
                      src="/logo.png" 
                      alt="Clippy Logo" 
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
                  className="group relative px-12 py-4 bg-gradient-to-br from-white/15 to-white/8 backdrop-blur-2xl border border-white/20 rounded-2xl font-bold text-lg transition-all duration-400 hover:scale-105 hover:shadow-xl hover:bg-white/20"
                  onMouseEnter={() => setHoveredElement('button')}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/15 via-purple-400/10 to-cyan-400/15 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-3">
                    <Download className="w-7 h-7 group-hover:animate-bounce" />
                    <span>Download for macOS</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </a>
                
                <button 
                  className="group px-12 py-4 backdrop-blur-2xl bg-white/8 border border-white/15 rounded-2xl font-bold text-lg transition-all duration-400 hover:bg-white/12 hover:scale-105"
                  onMouseEnter={() => setHoveredElement('button')}
                  onMouseLeave={() => setHoveredElement(null)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-6 backdrop-blur-2xl bg-gradient-to-br ${feature.gradient} border border-white/12 rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer ${
                  activeFeature === index ? `ring-2 ring-white/30 ${getBorderColor(feature.accent)}` : ''
                }`}
                onMouseEnter={() => setHoveredElement('card')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/8 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/8 backdrop-blur-2xl border border-white/25 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
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
      <section id="features" className="relative z-10 py-16 px-6 sm:px-8 lg:px-12">
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
                className="group relative p-6 backdrop-blur-2xl bg-gradient-to-br from-white/6 to-white/3 border border-white/12 rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
                onMouseEnter={() => setHoveredElement('card')}
                onMouseLeave={() => setHoveredElement(null)}
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
                className="group relative p-6 backdrop-blur-2xl bg-gradient-to-br from-white/6 to-white/3 border border-white/12 rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer min-h-[280px] flex flex-col"
                onMouseEnter={() => setHoveredElement('card')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/12 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                <div className="relative z-10 text-center flex-1 flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/8 backdrop-blur-2xl border border-white/25 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-400">
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
      <section id="gallery" className="relative z-10 py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight font-display">
              <span className="inline-block text-white">See It in Action</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
              Experience the beautiful interface and powerful features
            </p>
          </div>

          <div className="relative overflow-hidden">
            {/* Carousel Container */}
            <div className="flex items-center justify-center space-x-8 py-12">
              {/* Images */}
              {[1, 2, 3, 4].map((num, index) => {
                const isCenter = index === activeCarouselIndex; // Dynamic center based on state
                return (
                  <div
                    key={num}
                    className={`
                      relative backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 
                      border border-white/20 rounded-3xl overflow-hidden transition-all duration-700 ease-in-out
                      cursor-pointer
                      ${isCenter 
                        ? 'scale-110 z-20 shadow-xl shadow-black/30' 
                        : 'scale-90 opacity-70 hover:opacity-90 hover:scale-95'
                      }
                    `}
                    style={{
                      animation: `float ${4 + index * 0.3}s ease-in-out infinite alternate`,
                      animationDelay: `${index * 0.15}s`
                    }}
                    onClick={() => handleImageSelect(index)}
                  >
                    {/* Image */}
                    <div className="relative">
                      <img
                        src={`/Assets/${num}.png`}
                        alt={`Clippy Interface ${num}`}
                        className={`
                          w-full h-auto object-cover rounded-3xl transition-all duration-700 ease-in-out
                          ${isCenter ? 'w-80 md:w-96' : 'w-64 md:w-72'}
                        `}
                      />
                      
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-3xl"></div>
                      
                      {/* Featured label for center image */}
                      {isCenter && (
                        <div className="absolute bottom-4 left-4">
                          <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-full px-4 py-2">
                            <span className="text-white text-sm font-medium">Featured</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Auto-scroll indicators */}
            <div className="flex justify-center space-x-3 mt-12 mb-6 static">
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className={`
                    w-3 h-3 rounded-full transition-colors duration-300 ease-in-out cursor-pointer
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
                className="group relative p-6 backdrop-blur-2xl bg-gradient-to-br from-white/8 to-white/4 border border-white/15 rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
                onMouseEnter={() => setHoveredElement('card')}
                onMouseLeave={() => setHoveredElement(null)}
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
      <section id="download" className="relative z-10 py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/12 to-white/6 border border-white/15 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-purple-500/6 to-cyan-500/8"></div>
            
            <div className="relative z-10 p-12 text-center">
              {/* Download Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-2xl border border-blue-500/30 rounded-2xl flex items-center justify-center">
                  <Download className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight font-display">
                <span className="inline-block text-white">Ready to Transform Your Workflow?</span>
              </h2>
              
              <p className="text-lg md:text-xl text-white/80 mb-6 max-w-3xl mx-auto font-light leading-relaxed">
                Join thousands of developers and power users who have upgraded their clipboard experience.
              </p>
              
              {releaseData.error && (
                <div className="mb-8 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-white">
                  <p className="font-medium">Could not fetch the latest release. Using default download link.</p>
                  <p className="text-sm text-white/80 mt-1">{releaseData.error}</p>
                </div>
              )}
              
              {/* Version Info */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center gap-8 p-6 backdrop-blur-2xl bg-white/8 border border-white/15 rounded-2xl">
                  <div className="text-center">
                    <div className="text-white font-bold text-lg flex items-center justify-center">
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
                  <div className="w-px h-8 bg-white/20"></div>
                  <div className="text-center">
                    <div className="text-white font-bold text-lg">
                      {releaseData.isLoading ? "—" : releaseData.fileSize}
                    </div>
                  </div>
                  <div className="w-px h-8 bg-white/20"></div>
                  <div className="text-center">
                    <div className="text-white font-bold text-lg">macOS 11.0+</div>
                  </div>
                  {releaseData.publishedAt && (
                    <>
                      <div className="w-px h-8 bg-white/20"></div>
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">{releaseData.publishedAt}</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {/* Download Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href={releaseData.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-4 bg-gradient-to-br from-blue-500/80 to-purple-500/80 backdrop-blur-2xl border border-blue-500/60 rounded-2xl font-bold text-lg transition-all duration-400 hover:scale-105 hover:shadow-xl text-white"
                  onMouseEnter={() => setHoveredElement('button')}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/15 to-cyan-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-3">
                    {releaseData.isLoading ? (
                      <Loader className="w-6 h-6 animate-spin" />
                    ) : (
                      <Download className="w-6 h-6 group-hover:animate-bounce" />
                    )}
                    <span>{releaseData.isLoading ? "Fetching latest release..." : "Download for macOS"}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </a>
                
                <a
                  href="https://github.com/Jnani-Smart/Clippy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-4 bg-gradient-to-br from-white/15 to-white/8 backdrop-blur-2xl border border-white/25 rounded-2xl font-bold text-lg transition-all duration-400 hover:scale-105 hover:shadow-xl text-white"
                  onMouseEnter={() => setHoveredElement('button')}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-3">
                    <Github className="w-6 h-6" />
                    <span>View Source</span>
                    <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </a>
              </div>
              

              
              {/* Trust Indicators */}
              <div className="flex items-center justify-center space-x-8 text-white/70 mb-8">
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
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="flex items-center justify-center space-x-2 text-white">
                  <HelpCircle className="w-5 h-5" />
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
              onMouseEnter={() => setHoveredElement('link')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <div className="w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <img 
                  src="/logo.png" 
                  alt="Clippy Logo" 
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
                onMouseEnter={() => setHoveredElement('link')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <Github className="w-5 h-5" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              
              <a
                href="https://github.com/Jnani-Smart/Clippy/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-300"
                onMouseEnter={() => setHoveredElement('link')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <GitBranch className="w-5 h-5" />
                <span className="text-sm font-medium">Releases</span>
              </a>
              
              <a
                href="https://github.com/Jnani-Smart/Clippy/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-300"
                onMouseEnter={() => setHoveredElement('link')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <HelpCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Support</span>
              </a>
              
              <a
                href="https://github.com/Jnani-Smart/Clippy/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-300"
                onMouseEnter={() => setHoveredElement('link')}
                onMouseLeave={() => setHoveredElement(null)}
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