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
  X
} from 'lucide-react';

// Custom cursor component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', updatePosition);
    
    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed pointer-events-none z-50 mix-blend-difference transition-all duration-150 ease-out"
      style={{
        left: position.x - 10,
        top: position.y - 10,
        transform: isHovering ? 'scale(1.5)' : 'scale(1)',
      }}
    >
      <div className="w-5 h-5 bg-white rounded-full opacity-80" />
    </div>
  );
};

// Mobile menu component
const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <img src="/logo.png" alt="Clippy" className="h-8 w-8" />
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-6 space-y-4">
          <a href="#features" onClick={onClose} className="block py-3 text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors">Features</a>
          <a href="#gallery" onClick={onClose} className="block py-3 text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors">Gallery</a>
          <a href="#testimonials" onClick={onClose} className="block py-3 text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors">Reviews</a>
          <a href="#download" onClick={onClose} className="block py-3 text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors">Download</a>
          <div className="pt-4 border-t border-gray-100">
            <a 
              href="https://github.com/Jnani-Smart/Clippy" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center gap-3 py-3 text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
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

// Gallery component with improved design
const Gallery = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const images = [
    { src: '/Assets/1.png', alt: 'Clippy Main Interface' },
    { src: '/Assets/2.png', alt: 'Clipboard History' },
    { src: '/Assets/3.png', alt: 'Search Functionality' },
    { src: '/Assets/4.png', alt: 'Settings Panel' }
  ];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 4000);
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
    <section id="gallery" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            See Clippy in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the elegant interface and powerful features that make Clippy the perfect clipboard manager for macOS.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Main image display */}
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="aspect-[16/10] relative">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    index === currentImage ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              
              {/* Navigation controls */}
              <div className="absolute inset-0 flex items-center justify-between p-6">
                <button
                  onClick={prevImage}
                  className="p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>
                <button
                  onClick={nextImage}
                  className="p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>
              </div>

              {/* Play/Pause button */}
              <div className="absolute bottom-6 right-6">
                <button
                  onClick={togglePlayback}
                  className="p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-gray-800" />
                  ) : (
                    <Play className="w-5 h-5 text-gray-800" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Thumbnail navigation */}
          <div className="flex justify-center mt-8 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`relative overflow-hidden rounded-lg transition-all duration-200 ${
                  index === currentImage 
                    ? 'ring-4 ring-blue-500 scale-110' 
                    : 'hover:scale-105 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-20 h-12 object-cover"
                />
              </button>
            ))}
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentImage 
                    ? 'w-8 bg-blue-500' 
                    : 'w-2 bg-gray-300'
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
    <div className="min-h-screen bg-white">
      <CustomCursor />
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Clippy" className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-900">Clippy</span>
            </div>
            
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Features</a>
              <a href="#gallery" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Gallery</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Reviews</a>
              <a href="#download" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Download</a>
              <a 
                href="https://github.com/Jnani-Smart/Clippy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </nav>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <img 
                src="/logo.png" 
                alt="Clippy Logo" 
                className="h-24 w-24 mx-auto mb-6 drop-shadow-lg"
              />
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Clipboard Manager
              <span className="block text-blue-600">Reimagined</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed">
              The most elegant clipboard manager for macOS with a stunning interface. 
              Unlimited history, intelligent search, and seamless sync across devices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <a 
                href="#download"
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5" />
                Download for macOS
              </a>
              <a 
                href="#gallery"
                className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg border border-gray-200"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">4.9★</div>
                <div className="text-gray-600">App Store Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">99%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need in a clipboard manager, designed with attention to detail and user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Unlimited History",
                description: "Never lose your clipboard items again. Access your entire clipboard history with lightning-fast search."
              },
              {
                icon: Search,
                title: "Intelligent Search",
                description: "Find any clipboard item instantly with smart search that understands context and content type."
              },
              {
                icon: Shield,
                title: "Privacy First",
                description: "Your data stays on your device. End-to-end encryption ensures your clipboard items remain private."
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Optimized for performance with instant access to your clipboard history via customizable shortcuts."
              },
              {
                icon: Smartphone,
                title: "Cross-Device Sync",
                description: "Seamlessly sync your clipboard across all your Apple devices with iCloud integration."
              },
              {
                icon: Copy,
                title: "Smart Organization",
                description: "Automatically categorizes your clipboard items by type: text, images, links, and more."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-50 hover:bg-gray-100 p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                <div className="bg-blue-100 group-hover:bg-blue-200 w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors">
                  <feature.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery />

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Developers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied users who have transformed their workflow with Clippy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Senior Developer",
                company: "Tech Corp",
                content: "Clippy has completely transformed my development workflow. The intelligent search and unlimited history make it indispensable.",
                rating: 5
              },
              {
                name: "Michael Rodriguez",
                role: "Product Designer",
                company: "Design Studio",
                content: "The interface is absolutely beautiful and intuitive. It feels like a natural extension of macOS.",
                rating: 5
              },
              {
                name: "Emily Johnson",
                role: "Content Creator",
                company: "Creative Agency",
                content: "I can't imagine working without Clippy now. It saves me hours every week and the sync feature is perfect.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600">{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-24 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed">
            Download Clippy today and experience the future of clipboard management on macOS.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <a 
              href="https://github.com/Jnani-Smart/Clippy/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download for macOS
            </a>
            <a 
              href="https://github.com/Jnani-Smart/Clippy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 border-2 border-white/30 hover:border-white/50"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>

          <div className="text-center">
            <p className="text-blue-100 mb-4">System Requirements</p>
            <div className="inline-flex items-center gap-6 text-blue-200">
              <span>macOS 11.0+</span>
              <span>•</span>
              <span>Apple Silicon & Intel</span>
              <span>•</span>
              <span>Free & Open Source</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.png" alt="Clippy" className="h-8 w-8" />
                <span className="text-xl font-bold">Clippy</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The most elegant clipboard manager for macOS. Transform your workflow with intelligent clipboard management.
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com/Jnani-Smart/Clippy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
                <li><a href="#download" className="hover:text-white transition-colors">Download</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://github.com/Jnani-Smart/Clippy/issues" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Report Issues</a></li>
                <li><a href="https://github.com/Jnani-Smart/Clippy/discussions" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discussions</a></li>
                <li><a href="https://github.com/Jnani-Smart/Clippy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 Clippy. Built with ❤️ by <a href="https://github.com/Jnani-Smart" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Jnani Smart</a>
            </p>
            <div className="flex items-center gap-6 text-gray-400">
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