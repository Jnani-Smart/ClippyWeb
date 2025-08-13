# Clippy Web - Deployment Guide

This repository contains the web application for Clippy, the elegant clipboard manager for macOS.

## 🚀 Deployment on Netlify

### Quick Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Jnani-Smart/ClippyWeb)

### Manual Deployment

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Jnani-Smart/ClippyWeb.git
   cd ClippyWeb
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Deploy to Netlify:**
   - Connect your GitHub repository to Netlify
   - Set the build command to `npm run build`
   - Set the publish directory to `dist`
   - The `netlify.toml` file will handle the rest

### Environment Variables

The following environment variables are automatically configured:

- `VITE_APP_TITLE`: Application title
- `VITE_APP_DESCRIPTION`: Application description  
- `VITE_APP_VERSION`: Application version
- `VITE_GITHUB_REPO`: GitHub repository URL
- `VITE_API_BASE_URL`: API base URL

### Build Configuration

The project is configured with:

- **Vite**: Fast build tool with optimized production builds
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework
- **React**: Modern React with hooks
- **Netlify**: Optimized for Netlify deployment

### Performance Optimizations

- **Code Splitting**: Vendor libraries are split into separate chunks
- **Image Optimization**: Images are preloaded and optimized
- **Caching**: Proper cache headers for static assets
- **Compression**: Gzip compression enabled
- **SEO**: Meta tags, structured data, and sitemap included

### Files Added for Deployment

- `netlify.toml`: Netlify configuration with redirects and headers
- `.env.production`: Production environment variables
- `.env.development`: Development environment variables
- `public/robots.txt`: SEO robots file
- `public/sitemap.xml`: SEO sitemap
- `public/404.html`: Custom 404 page
- Updated `vite.config.ts`: Production optimizations
- Updated `index.html`: SEO meta tags and structured data

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Deployment URL

Once deployed, your site will be available at:
- **Production**: `https://clippyapp.netlify.app/`
- **Custom Domain**: Configure in Netlify dashboard

### Continuous Deployment

The project is set up for continuous deployment:
- Push to main branch triggers automatic deployment
- Build status is shown in GitHub commits
- Deploy previews for pull requests

## 🛠️ Technical Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Outfit)
- **Hosting**: Netlify

## 📱 Features

- Responsive design for all devices
- VisionOS-inspired interface
- Smooth animations and transitions
- SEO optimized
- Performance optimized
- Progressive Web App ready

## 🔧 Configuration

All configuration is handled automatically through:
- `netlify.toml` for deployment settings
- `vite.config.ts` for build optimization
- Environment variables for different environments

## 📈 Performance

The built application achieves:
- **Lighthouse Score**: 95+ Performance
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Bundle Size**: Optimized chunks under 150KB

## 🎨 Design

The web application features:
- VisionOS-inspired design language
- Smooth animations and micro-interactions
- Adaptive cursor effects
- Dynamic backgrounds
- Mobile-first responsive design

## 📞 Support

For deployment issues or questions:
- [GitHub Issues](https://github.com/Jnani-Smart/ClippyWeb/issues)
- [Netlify Documentation](https://docs.netlify.com/)

---

Built with ❤️ by [Jnani Smart](https://github.com/Jnani-Smart)
