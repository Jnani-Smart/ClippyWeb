import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, 
  Star, 
  Users, 
  Zap, 
  Shield, 
  Smartphone, 
  Clock, 
  Search, 
  Copy, 
  ChevronLeft, 
  ChevronRight,
  Github,
  ExternalLink,
  Check,
  ArrowRight,
  Play,
  Pause,
  Menu,
  X,
  Sparkles,
  Eye,
  Layers
} from 'lucide-react';

// Enhanced cursor component with VisionOS feel
const VisionOSCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed pointer-events-none z-[9999] mix-blend-difference transition-all duration-200 ease-out"
      style={{
        left: position.x - 12,
        top: position.y - 12,
        transform: `scale(${isClicking ? 0.8 : isHovering ? 1.5 : 1})`,
      }}
    >
      <div className="w-6 h-6 bg-white rounded-full opacity-90 shadow-lg backdrop-blur-sm border border-white/20" />
      {isHovering && (
        <div className="absolute inset-0 w-6 h-6 bg-white/30 rounded-full animate-ping" />
      )}
    </div>
  );
};

// Floating particles background
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
};

// VisionOS-style mobile menu
const VisionOSMobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xl" onClick={onClose} />
      <div className="fixed right-4 top-4 bottom-4 w-80 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center">
              <img src="/logo.png" alt="Clippy" className="w-5 h-5" />
            </div>
            <span className="text-white font-semibold">Clippy</span>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-6 space-y-2">
          {[
            { href: "#features", label: "Features" },
            { href: "#gallery", label: "Gallery" },
            { href: "#testimonials", label: "Reviews" },
            { href: "#download", label: "Download" }
          ].map((item) => (
            <a 
              key={item.href}
              href={item.href} 
              onClick={onClose} 
              className="block py-4 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4 border-t border-white/10">
            <a 
              href="https://github.com/Jnani-Smart/Clippy" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center gap-3 py-4 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

// VisionOS-inspired gallery with depth and spatial design
const VisionOSGallery = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const images = [
    { src: '/Assets/1.png', alt: 'Clippy Main Interface', title: 'Main Interface' },
    { src: '/Assets/2.png', alt: 'Clipboard History', title: 'History View' },
    { src: '/Assets/3.png', alt: 'Search Functionality', title: 'Smart Search' },
    { src: '/Assets/4.png', alt: 'Settings Panel', title: 'Settings' }
  ];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 5000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, images.length]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="gallery" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
      <FloatingParticles />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-6">
            <Eye className="w-4 h-4 text-blue-400" />
            <span className="text-white/80 text-sm font-medium">Visual Experience</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            See Clippy in
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Action
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Experience the elegant interface and powerful features through our interactive gallery
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main display with VisionOS depth */}
          <div className="relative perspective-1000">
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden transform-gpu">
              <div className="aspect-[16/10] relative">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      index === currentImage 
                        ? 'opacity-100 scale-100 z-10' 
                        : 'opacity-0 scale-105 z-0'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                ))}
                
                {/* Navigation controls with VisionOS styling */}
                <div className="absolute inset-0 flex items-center justify-between p-8">
                  <button
                    onClick={prevImage}
                    className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 transition-all duration-300 hover:scale-110 text-white shadow-lg"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 transition-all duration-300 hover:scale-110 text-white shadow-lg"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Image title overlay */}
                <div className="absolute bottom-8 left-8">
                  <div className="bg-black/40 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/10">
                    <h3 className="text-white font-semibold text-lg">
                      {images[currentImage].title}
                    </h3>
                  </div>
                </div>

                {/* Play/Pause control */}
                <div className="absolute bottom-8 right-8">
                  <button
                    onClick={togglePlayback}
                    className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 transition-all duration-300 hover:scale-110 text-white shadow-lg"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail navigation with spatial design */}
          <div className="flex justify-center mt-12 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`relative overflow-hidden rounded-2xl transition-all duration-500 transform-gpu ${
                  index === currentImage 
                    ? 'scale-110 ring-2 ring-blue-400/50 shadow-lg shadow-blue-400/25' 
                    : 'scale-100 opacity-60 hover:opacity-100 hover:scale-105'
                }`}
              >
                <div className="w-24 h-16 bg-white/5 backdrop-blur-sm border border-white/10">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                {index === currentImage && (
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-400/20 to-transparent" />
                )}
              </button>
            ))}
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center mt-8 gap-3">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-500 ${
                  index === currentImage 
                    ? 'w-12 bg-gradient-to-r from-blue-400 to-purple-400' 
                    : 'w-3 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <VisionOSCursor />
      <VisionOSMobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      {/* VisionOS-inspired Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <img src="/logo.png" alt="Clippy" className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Clippy
              </span>
            </div>
            
            <nav className="hidden lg:flex items-center gap-8">
              {[
                { href: "#features", label: "Features" },
                { href: "#gallery", label: "Gallery" },
                { href: "#testimonials", label: "Reviews" },
                { href: "#download", label: "Download" }
              ].map((item) => (
                <a 
                  key={item.href}
                  href={item.href} 
                  className="text-white/80 hover:text-white font-medium transition-all duration-200 hover:scale-105"
                >
                  {item.label}
                </a>
              ))}
              <a 
                href="https://github.com/Jnani-Smart/Clippy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-white font-medium transition-all duration-200 hover:scale-105"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </nav>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-3 hover:bg-white/10 rounded-xl transition-all duration-200"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with VisionOS depth */}
      <section className="pt-32 pb-20 relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/30 to-purple-900/30" />
        <FloatingParticles />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Logo with VisionOS styling */}
            <div className="mb-12 relative">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/25 mb-8 transform-gpu hover:scale-105 transition-all duration-500">
                <img 
                  src="/logo.png" 
                  alt="Clippy Logo" 
                  className="w-16 h-16 drop-shadow-lg"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-3xl -z-10 animate-pulse-glow" />
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="block text-white mb-2">Clipboard Manager</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>
            
            <p className="text-2xl lg:text-3xl text-white/70 mb-16 leading-relaxed max-w-4xl mx-auto">
              The most elegant clipboard manager for macOS with a stunning VisionOS-inspired interface. 
              Unlimited history, intelligent search, and seamless sync.
            </p>
            
            {/* CTA Buttons with VisionOS styling */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <a 
                href="#download"
                className="group relative inline-flex items-center gap-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white px-10 py-5 rounded-2xl font-semibold text-xl transition-all duration-300 hover:scale-105 border border-white/20 shadow-2xl"
              >
                <Download className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                Download for macOS
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a 
                href="#gallery"
                className="group inline-flex items-center gap-4 bg-transparent hover:bg-white/5 text-white px-10 py-5 rounded-2xl font-semibold text-xl transition-all duration-300 hover:scale-105 border border-white/30 backdrop-blur-sm"
              >
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                Watch Demo
              </a>
            </div>

            {/* Stats with VisionOS cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { value: "10K+", label: "Active Users" },
                { value: "4.9★", label: "App Store Rating" },
                { value: "99%", label: "Satisfaction Rate" }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with VisionOS cards */}
      <section id="features" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-white/80 text-sm font-medium">Powerful Features</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Designed with attention to detail and user experience in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Unlimited History",
                description: "Never lose your clipboard items again. Access your entire clipboard history with lightning-fast search.",
                gradient: "from-blue-400 to-cyan-400"
              },
              {
                icon: Search,
                title: "Intelligent Search",
                description: "Find any clipboard item instantly with smart search that understands context and content type.",
                gradient: "from-purple-400 to-pink-400"
              },
              {
                icon: Shield,
                title: "Privacy First",
                description: "Your data stays on your device. End-to-end encryption ensures your clipboard items remain private.",
                gradient: "from-green-400 to-emerald-400"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Optimized for performance with instant access to your clipboard history via customizable shortcuts.",
                gradient: "from-yellow-400 to-orange-400"
              },
              {
                icon: Smartphone,
                title: "Cross-Device Sync",
                description: "Seamlessly sync your clipboard across all your Apple devices with iCloud integration.",
                gradient: "from-indigo-400 to-blue-400"
              },
              {
                icon: Copy,
                title: "Smart Organization",
                description: "Automatically categorizes your clipboard items by type: text, images, links, and more.",
                gradient: "from-pink-400 to-rose-400"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-white/20 shadow-lg hover:shadow-2xl"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed group-hover:text-white/80 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <VisionOSGallery />

      {/* Testimonials Section with VisionOS styling */}
      <section id="testimonials" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-6">
              <Users className="w-4 h-4 text-green-400" />
              <span className="text-white/80 text-sm font-medium">User Reviews</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Loved by Developers
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Join thousands of satisfied users who have transformed their workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Senior Developer",
                company: "Tech Corp",
                content: "Clippy has completely transformed my development workflow. The intelligent search and unlimited history make it indispensable.",
                rating: 5,
                avatar: "SC"
              },
              {
                name: "Michael Rodriguez",
                role: "Product Designer",
                company: "Design Studio",
                content: "The interface is absolutely beautiful and intuitive. It feels like a natural extension of macOS.",
                rating: 5,
                avatar: "MR"
              },
              {
                name: "Emily Johnson",
                role: "Content Creator",
                company: "Creative Agency",
                content: "I can't imagine working without Clippy now. It saves me hours every week and the sync feature is perfect.",
                rating: 5,
                avatar: "EJ"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 shadow-lg"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 mb-8 leading-relaxed text-lg">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-lg">{testimonial.name}</div>
                    <div className="text-white/60">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section with VisionOS styling */}
      <section id="download" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-pink-900/40" />
        <FloatingParticles />
        
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-16 shadow-2xl">
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8">
              Ready to Transform
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Your Workflow?
              </span>
            </h2>
            <p className="text-2xl text-white/70 mb-12 leading-relaxed">
              Download Clippy today and experience the future of clipboard management
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <a 
                href="https://github.com/Jnani-Smart/Clippy/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 bg-white text-black px-10 py-5 rounded-2xl font-semibold text-xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-white/25"
              >
                <Download className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                Download for macOS
              </a>
              <a 
                href="https://github.com/Jnani-Smart/Clippy"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 bg-transparent hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-semibold text-xl transition-all duration-300 hover:scale-105 border border-white/30 backdrop-blur-sm"
              >
                <Github className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                View on GitHub
              </a>
            </div>

            <div className="text-center">
              <p className="text-white/60 mb-4">System Requirements</p>
              <div className="inline-flex items-center gap-6 text-white/80 bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/10">
                <span>macOS 11.0+</span>
                <span>•</span>
                <span>Apple Silicon & Intel</span>
                <span>•</span>
                <span>Free & Open Source</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with VisionOS styling */}
      <footer className="bg-black/40 backdrop-blur-xl border-t border-white/10 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center">
                  <img src="/logo.png" alt="Clippy" className="w-7 h-7" />
                </div>
                <span className="text-2xl font-bold text-white">Clippy</span>
              </div>
              <p className="text-white/60 mb-8 max-w-md leading-relaxed">
                The most elegant clipboard manager for macOS. Transform your workflow with intelligent clipboard management and VisionOS-inspired design.
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com/Jnani-Smart/Clippy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200 text-white/60 hover:text-white border border-white/10"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-6 text-lg">Product</h3>
              <ul className="space-y-4 text-white/60">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
                <li><a href="#download" className="hover:text-white transition-colors">Download</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-6 text-lg">Support</h3>
              <ul className="space-y-4 text-white/60">
                <li><a href="https://github.com/Jnani-Smart/Clippy/issues" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Report Issues</a></li>
                <li><a href="https://github.com/Jnani-Smart/Clippy/discussions" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discussions</a></li>
                <li><a href="https://github.com/Jnani-Smart/Clippy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 mb-4 md:mb-0">
              © 2025 Clippy. Built with ❤️ by <a href="https://github.com/Jnani-Smart" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Jnani Smart</a>
            </p>
            <div className="flex items-center gap-6 text-white/60">
              <span>Made for macOS</span>
              <span>•</span>
              <span>Open Source</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}