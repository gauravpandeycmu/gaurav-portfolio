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
- **Integrated Controls**: Ask AI button and theme selector in the navigation bar

### 🎭 Advanced Animations
- **Vision OS-style Profile Expansion**: Blurred edges with sharp center, fading into background (Hero section)
- **Smooth Scroll Animations**: Reveal animations for sections using IntersectionObserver
- **Interactive Background**: Animated particle system that responds to theme colors and adapts visibility for dark/light modes
- **Hover Effects**: Spotlight effects on cards with radial gradients
- **Spring Animations**: Bouncy, natural-feeling transitions throughout
- **Animated Toggle Switch**: Fancy sun/moon animation with stars and rays for dark/light mode switching

### 🤖 AI-Powered Chat Assistant
- **Google Gemma AI Integration**: Powered by Google's Gemma 3-4B-IT model via Generative Language API
- **Context-aware Responses**: Trained on comprehensive portfolio data to answer questions about experience, projects, and skills
- **Smart Markdown Rendering**: Full markdown support with:
  - **Bold text** formatting for emphasis
  - **Code blocks/tech terms**: Theme-based styling - adapts to active theme (Vulcan/Emerald/Nebula/Midnight) in both dark and light modes
  - **Clickable links**: Both markdown format `[text](url)` and plain URLs
  - **Link handling**: Automatically trims trailing punctuation (commas, periods, etc.) for proper link functionality
  - **External link icons**: Visual indicators for links that open in new tabs
- **Smooth Chat UI**: Animated message bubbles with typing effect (for new messages)
- **Dynamic Origin Animation**: Chat window expands from the AI button location with smooth transitions
- **Theme-aware Design**: Chat modal adapts to dark/light mode with appropriate colors and backgrounds
- **Smart Response Formatting**: AI automatically formats tech terms with backticks, numbers with bold, and creates clickable links
- **Mobile-friendly Chat Input**: 16px font size to prevent iOS Safari/Chrome from auto-zooming when input is focused; touch-manipulation for better mobile UX

### 📄 Resume Access
- **View Resume Button**: Direct link to resume on Google Drive - clicking opens the document in a new tab
- **Location**: Hero section alongside social links

### 📱 Performance Optimizations
- **Lazy Loading**: Images and sections load only when needed
- **Code Splitting**: Vendor chunks for React and Lucide icons
- **Deferred Rendering**: Below-the-fold content renders after initial load
- **IntersectionObserver**: Efficient scroll-based animations
- **RequestAnimationFrame**: Optimized scroll handling
- **Terser Minification**: Production builds with console.log removal
- **Memoization**: React.memo and useMemo for performance-critical components

### 🎯 Sections
- **Hero (Home)**: Animated introduction with typewriter effect, View Resume button, social links, expandable profile with Vision OS-style blur
- **Experience**: Detailed work experience with company logos and key achievements
- **Projects**: Showcase of key projects with tags, descriptions, and GitHub/demo links
- **Leadership & Activities**: Community involvement (Google Cloud Sprint, PESOS) and achievements
- **Education**: Academic background (CMU, PES University) with course details, GPA, semester breakdown, **Dean's List achievement** (Fall 2025), and Teaching Assistant role
- **Skills**: Categorized technical skills with icons (Languages, Infrastructure, Backend, Data & Messaging, DevOps)
- **Recommendations**: Professional recommendations with LinkedIn profiles and photos

### 🎨 Design Highlights
- **Modern UI/UX**: Clean, minimalist design with glassmorphism effects
- **Dark/Light Mode**: Full support for both modes with optimized color schemes and text contrast
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Accessibility**: Proper semantic HTML and ARIA labels
- **Touch Optimizations**: 44x44px minimum touch targets for mobile, touch-manipulation on interactive elements
- **Smooth Scrolling**: Native smooth scroll behavior

### 🚀 Technical Stack
- **React 19**: Latest React with hooks and memoization
- **Vite 7**: Fast build tool and dev server
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Google Generative Language API**: AI chat functionality using Gemma 3-4B-IT model

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

3. Set up environment variables (required for AI chat):
Create a `.env` file in the root directory:
```bash
VITE_GEMINI_API_KEY=your_google_api_key_here
```
Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

> **Note**: The AI chat will show an error message if the API key is not configured. All other portfolio features work without it.

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

6. Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
gaurav-portfolio/
├── public/              # Static assets (images, logos, manifest, PDFs)
├── src/
│   ├── App.jsx         # Main application component (all logic and UI)
│   ├── App.css         # Additional component styles
│   ├── index.css      # Global styles and Tailwind imports
│   └── main.jsx        # Application entry point
├── index.html          # HTML template
├── vite.config.js      # Vite configuration with code splitting
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.cjs  # PostCSS configuration
└── .env                # Environment variables (create for AI chat)
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
    bg: {
      dark: '#your-dark-bg',
      light: '#your-light-bg'
    },
    particle: '#your-particle',
    glow: 'r, g, b' // RGB values for glow effects
  }
};
```

### Updating Content
- **Experience/Projects/Education**: Edit the data arrays (`experienceData`, `projectsData`, `educationData`) in `src/App.jsx`
- **Profile Info**: Update `PORTFOLIO_CONTEXT` constant for AI assistant
- **Social Links**: Modify `socialLinks` array
- **Resume Link**: Update the `resumeLink` in `ResumeDownloadButton` component
- **AI Behavior**: Adjust `PORTFOLIO_CONTEXT` and formatting rules in `handleSendMessage` function

### Customizing AI Responses
The AI assistant uses a comprehensive context system. To modify responses:
1. Update `PORTFOLIO_CONTEXT` constant with new information
2. Adjust formatting rules in the `formattingReminder` within `handleSendMessage`
3. The AI automatically formats tech terms with backticks (theme-styled), numbers with bold, and creates clickable links

## 🔧 Technical Details

### Markdown Rendering (Chat)
The chat assistant includes a custom markdown renderer that supports:
- **Bold text**: `**text**` → **text**
- **Code blocks/tech terms**: `` `code` `` → styled with active theme colors (background, text, border adapt to Vulcan/Emerald/Nebula/Midnight)
- **Markdown links**: `[text](url)` → clickable link opening in new tab
- **Plain URLs**: Automatically detected and made clickable
- **Trailing punctuation**: Automatically trimmed from URLs (e.g., `https://github.com/user.` → `https://github.com/user`)

### API Configuration
- **Model**: Gemma 3-4B-IT (Google's open-source language model)
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-4b-it:generateContent`
- **Authentication**: API key via `VITE_GEMINI_API_KEY` environment variable
- **Context System**: Full portfolio context embedded in each request for accurate responses

### Build Configuration
- **Code Splitting**: React and Lucide icons are split into separate vendor chunks
- **Minification**: Terser with console.log removal in production
- **Asset Optimization**: Optimized file names with hashing for cache busting
- **Source Maps**: Disabled for production builds

## 📝 License

This project is private and personal.

## 👤 Author

**Gaurav Pandey**
- Master's Student at Carnegie Mellon University (Information Systems Management)
- LinkedIn: [gauravcmu](https://www.linkedin.com/in/gauravcmu)
- GitHub: [gauravpandeycmu](https://github.com/gauravpandeycmu)
- Email: gauravpandey@cmu.edu

---

Built with ❤️ using React, Vite, and Tailwind CSS
