import {
    Command,
    Search,
    Pin,
    Filter,
    FileText,
    Code,
    Link,
    Image,
    Clipboard,
    Eye,
    Moon,
    Shield,
    Zap,
    Settings
} from 'lucide-react';

export const features = [
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

export const contentTypes = [
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

export const detailedFeatures = [
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

export const testimonials = [
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
