# Gaurav Pandey - Portfolio Website

A modern, interactive portfolio website showcasing software engineering experience, projects, and skills. Built with React, Vite, and Tailwind CSS, featuring dynamic theming, smooth animations, and an AI-powered chat assistant.

## ✨ Features

### 🎨 Dynamic Theme System
- **4 Beautiful Themes**: Vulcan (Rose), Emerald (Green), Nebula (Indigo), Midnight (Blue)
- **Dark/Light Mode Toggle**: Beautiful animated toggle switch with sun/moon icons and seamless transitions
- **Theme-aware Colors**: All themes support both dark and light modes with optimized color palettes
- **iOS-style Dynamic Icons**: All logos feature dynamic tinting based on the active theme
- **Smooth Theme Transitions**: Ripple effect when switching themes
- **Persistent Preferences**: Theme and dark/light mode preferences saved in localStorage

### 🏝️ Dynamic Island Navigation
- **Apple-inspired Dynamic Island**: Navbar transforms from compact pill to full navigation bar on scroll
- **Smooth Animations**: Bouncy, fluid transitions with custom cubic-bezier easing
- **Scroll-responsive**: Automatically adapts based on scroll position
- **Mobile-optimized**: Compact view on mobile devices

### 🎭 Advanced Animations
- **Vision OS-style Profile Expansion**: Blurred edges with sharp center, fading into background
- **Smooth Scroll Animations**: Reveal animations for sections using IntersectionObserver
- **Interactive Background**: Animated particle system that responds to theme colors and adapts visibility for dark/light modes
- **Hover Effects**: Spotlight effects on cards with radial gradients
- **Spring Animations**: Bouncy, natural-feeling transitions throughout
- **Animated Toggle Switch**: Fancy sun/moon animation with stars and rays for dark/light mode switching

### 🤖 AI-Powered Chat Assistant
- **Gemini AI Integration**: Powered by Google's Gemini 2.5 Flash model
- **Context-aware Responses**: Trained on portfolio data to answer questions about experience, projects, and skills
- **Smooth Chat UI**: Animated message bubbles with typing indicators (only for first response)
- **Dynamic Origin Animation**: Chat window expands from the AI button location
- **Theme-aware Design**: Chat modal adapts to dark/light mode with appropriate colors and backgrounds

### 📱 Performance Optimizations
- **Lazy Loading**: Images and sections load only when needed
- **Code Splitting**: Vendor chunks for React and Lucide icons
- **Deferred Rendering**: Below-the-fold content renders after initial load
- **IntersectionObserver**: Efficient scroll-based animations
- **RequestAnimationFrame**: Optimized scroll handling
- **Terser Minification**: Production builds with console.log removal

### 🎯 Sections
- **Hero Section**: Animated introduction with typewriter effect
- **Experience**: Detailed work experience with company logos
- **Projects**: Showcase of key projects with tags and links
- **Leadership & Activities**: Community involvement and achievements
- **Education**: Academic background with course details
- **Skills**: Categorized technical skills with icons

### 🎨 Design Highlights
- **Modern UI/UX**: Clean, minimalist design with glassmorphism effects
- **Dark/Light Mode**: Full support for both modes with optimized color schemes and text contrast
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Accessibility**: Proper semantic HTML and ARIA labels
- **Touch Optimizations**: 44x44px minimum touch targets for mobile
- **Smooth Scrolling**: Native smooth scroll behavior

### 🚀 Technical Stack
- **React 19**: Latest React with hooks and memoization
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Google Gemini API**: AI chat functionality

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gauravpandeycmu/gaurav-portfolio.git
cd gaurav-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
gaurav-portfolio/
├── public/              # Static assets (images, icons, manifest)
├── src/
│   ├── App.jsx         # Main application component
│   ├── index.css      # Global styles and Tailwind imports
│   └── main.jsx        # Application entry point
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── postcss.config.cjs  # PostCSS configuration
```

## 🎨 Customization

### Adding New Themes
Edit the `themes` object in `src/App.jsx`:
```javascript
const themes = {
  yourTheme: {
    id: 'yourTheme',
    label: 'Your Theme',
    primary: '#your-color',
    accent: '#your-accent',
    bg: '#your-bg',
    particle: '#your-particle',
    glow: 'r, g, b' // RGB values for glow effects
  }
};
```

### Updating Content
- **Experience/Projects/Education**: Edit the data arrays in `src/App.jsx`
- **Profile Info**: Update `PORTFOLIO_CONTEXT` constant
- **Social Links**: Modify `socialLinks` array

## 📝 License

This project is private and personal.

## 👤 Author

**Gaurav Pandey**
- Master's Student at Carnegie Mellon University
- LinkedIn: [gauravcmu](https://www.linkedin.com/in/gauravcmu)
- Email: gauravpandey@cmu.edu

---

Built with ❤️ using React and Vite
