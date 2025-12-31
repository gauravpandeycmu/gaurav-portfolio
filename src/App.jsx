import React, { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from 'react';
import { 
  Github, Linkedin, Mail, Terminal as TerminalIcon, Cloud, Zap, Database, Monitor,
  Briefcase, Globe, Eye, Scan, Award, Heart, Home, Code, Cpu,
  Sparkles, Send, X, ArrowUpRight, Check, Users, GraduationCap, FileText, ExternalLink,
  Palette
} from 'lucide-react';

// --- CONFIGURATION & DATA ---
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ""; 

const PORTFOLIO_CONTEXT = `
You are an AI representation of Gaurav Pandey. Speak in the first person ("I", "my") but remain professional and enthusiastic. 
**Profile:** Name: Gaurav Pandey. Current: Master's student at Carnegie Mellon University (CMU). Goal: SWE Internships for Summer 2026. Stats: 3.83 GPA @ CMU, 3.94 GPA @ PES University.
**Key Achievements:** Optimized data pipelines at Epsilon (30s → 5s). Built AWS Bedrock GenAI prototype. On-call for K8s microservices. Saved 60% AWS costs.
**Projects:** Google Cloud Sprint (Runner-up). Edge Surveillance (YOLOv3). Image Classification (ResNet50).
**Tech Stack:** Java, Python, JS, C++, SQL, AWS, K8s, Docker, GCP, Spring Boot, Node.js, Kafka.
`;

// Theme definitions
const themes = {
  vulcan: { 
    id: 'vulcan', label: 'Vulcan', 
    primary: '#f43f5e', // rose-500
    accent: '#f97316',  // orange-500
    bg: '#0c0a09', 
    particle: '#fb7185', 
    glow: '251, 113, 133' // rose-400 rgb
  },
  emerald: { 
    id: 'emerald', label: 'Emerald', 
    primary: '#10b981', // emerald-500
    accent: '#14b8a6',  // teal-500
    bg: '#0a0c0a', 
    particle: '#34d399', 
    glow: '52, 211, 153' // emerald-400 rgb
  },
  nebula: { 
    id: 'nebula', label: 'Nebula', 
    primary: '#6366f1', // indigo-500
    accent: '#a855f7',  // purple-500
    bg: '#0f172a', 
    particle: '#818cf8', 
    glow: '129, 140, 248' // indigo-400 rgb
  },
  midnight: { 
    id: 'midnight', label: 'Midnight', 
    primary: '#3b82f6', // blue-500
    accent: '#06b6d4',  // cyan-500
    bg: '#020617', 
    particle: '#60a5fa', 
    glow: '96, 165, 250' // blue-400 rgb
  }
};

const navItems = [
  { id: 'home', label: 'Home', icon: <Home size={18} /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> },
  { id: 'projects', label: 'Projects', icon: <Code size={18} /> },
  { id: 'leadership', label: 'Activities', icon: <Users size={18} /> },
  { id: 'education', label: 'Education', icon: <GraduationCap size={18} /> },
  { id: 'skills', label: 'Skills', icon: <Cpu size={18} /> }
];

const socialLinks = [
  { 
    id: 'linkedin',
    icon: <Linkedin />, 
    url: "https://www.linkedin.com/in/gauravcmu" 
  },
  { 
    id: 'mail',
    icon: <Mail />, 
    url: "mailto:gauravpandey@cmu.edu" 
  },
  { 
    id: 'github',
    icon: <Github />, 
    url: "https://github.com/gauravpandeycmu" 
  }
];

// Static Data with Logos
const experienceData = [
  {
    company: "Epsilon, Datahub Product",
    role: "Software Engineer",
    period: "Aug 2022 - Jul 2025",
    logo: "/Epsilon.webp",
    points: [
      "Slashed multi-data object feed load times by 83% (30s to 5s) through async refactoring.",
      "Architectured an AWS Bedrock prototype to enhance search capabilities on complex feed payloads.",
      "On-call primary support for Kubernetes microservice architecture resolving 80+ production issues.",
      "Streamlined AWS resource utilization by 60% by conducting architectural review of SnapLogic pipelines and deploying 5+ checkpoints.",
      "Delivered 120+ Jira user stories and managed NodeJS upgrades across 10+ AWS Lambda functions.",
      "Developed a TestNG automation suite for critical data feeds, increasing testing frequency from weekly to hourly."
    ]
  },
  {
    company: "Epsilon",
    role: "Software Engineering Intern",
    period: "Jan 2022 - July 2022",
    logo: "/Epsilon.webp",
    points: [
      "Reduced infrastructure costs by 10% by developing a hard-delete backend API.",
      "Upgraded 70+ vulnerable libraries and remediated 500+ code quality issues."
    ]
  },
  {
    company: "Centre for Cloud Computing",
    role: "Research Intern - NLP",
    period: "May 2020 - Jun 2020",
    logo: "/ccbd.png",
    link: "https://github.com/gauravpandeycmu/CCBD-espnet",
    points: [
      "Improved translation accuracy by 20% for Telugu ASR system using ESPnet models.",
      "Implemented data balancing strategy derived from phoneme frequency analysis."
    ]
  },
  {
    company: "ISRO",
    role: "Research Intern - CV",
    period: "July 2019 - Oct 2019",
    logo: "/isro.png",
    link: "https://drive.google.com/file/d/1f8rBbiC5nV1ZCGE4DMhiWxCLsyHPPD4w/view?usp=sharing",
    points: [
      "Developed satellite image segmentation using U-Net model for water body identification.",
      "Achieved 18% boost in model performance via advanced data augmentation."
    ]
  }
];

const projectsData = [
  {
    title: "Edge Surveillance Module",
    desc: "Designed an edge-based master/worker system to handle 10+ video streams, utilizing YOLOv3 for social distancing violation detection. Leveraged AWS Rekognition to identify key frames, reducing local storage needs by 90%.",
    tags: ["Python", "AWS", "YOLOv3"],
    icon: <Scan />
  },
  {
    title: "Image Classification",
    desc: "Annotated 14k+ images into 8 classes using VGG Annotator & used ResNet50 weights for transfer learning. Applied Grad-CAM to produce class activation maps for feature visualization.",
    tags: ["ResNet50", "ML", "Python"],
    icon: <Eye />,
    link: "https://github.com/gauravpandeycmu/EIP/tree/master/Phase%201/Session%205"
  },
  {
    title: "PoseNet Recognition",
    desc: "Leveraged PoseNet to track hand gestures during lectures, identifying blackboard text even with blurry inputs.",
    tags: ["PoseNet", "JS", "Transfer Learning"],
    icon: <Monitor />
  }
];

const leadershipData = [
  {
    role: "Cloud Sprint",
    org: "Google",
    period: "Feb 2021 - Apr 2021",
    location: "",
    logo: "/google.png",
    link: "https://drive.google.com/file/d/1NjckC4yGAVp6dth0TfzEZ-AJfPOXrFtR/view?usp=sharing",
    points: [
      "Selected among 30 from 10,000+ applicants across India; Worked on open-ended problem statements weekly related to GCP.",
      "Designed system architecture of Twitter having ~300Mn users; Awarded runner-up by senior leadership for final presentation.",
      "Recommended location based sharding using Snowflake & memory caching on Amazon redis for managing latency within 1 sec."
    ]
  },
  {
    role: "Core Technical Team",
    org: "PES Open Source (PESOS)",
    period: "Sep 2019 - Jan 2022",
    location: "Bangalore",
    logo: "/pesos.png",
    points: [
      "Organized meetups for 200+ students about git & contributing to open source; Scheduled & organized HacktoberFest-19 at PES.",
      "Inducted cross-domain members and created pathways for collaboration on 4+ university level hardware & software projects.",
      "Selected junior core team members; Facilitated onboarding & mentored them to continue driving club initiatives independently."
    ]
  }
];

const educationData = [
  {
    school: "Carnegie Mellon University",
    degree: "Master in Information Systems Management",
    period: "Aug 2025 - Dec 2026",
    grade: "3.85 / 4",
    logo: "/cmu.jpg", 
    details: [
      { term: "Fall 2025", courses: ["NoSQL Database Management", "Object Oriented Programming in Java", "Decision Making Under Uncertainty", "Organisation Design and Implementation"] },
      { term: "Spring 2026", courses: ["Cloud Computing (15-619)", "Agentic Technologies", "AI Model Development", "Distributed Systems", "Measuring Social", "Digital Transformation"] }
    ]
  },
  {
    school: "PES University",
    degree: "Bachelor of Technology - Computer Science",
    period: "2018 - 2022",
    grade: "3.94 / 4",
    logo: "/pes.png", 
    specialization: "Specialisation in Machine Intelligence and Data Science"
  }
];

const skillsData = [
  { cat: "Languages", items: ["Java", "Python", "JS", "C++", "SQL"], icon: <TerminalIcon /> },
  { cat: "Infrastructure", items: ["AWS", "K8s", "Docker", "GCP", "Azure"], icon: <Cloud /> },
  { Backends: ["Spring", "Node", "Kafka", "Spark"], icon: <Zap /> },
  { cat: "Dev Tooling", items: ["Jenkins", "Git", "Kibana", "SonarQube"], icon: <Database /> }
];

// --- UTILITY COMPONENTS ---

const TintedLogo = React.memo(({ src, alt }) => (
  <div className="relative w-full h-full">
    {/* Base image - fills container */}
    <img 
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      loading="lazy"
      decoding="async"
      style={{
        filter: 'grayscale(100%) brightness(0.5)',
      }}
      onError={(e) => {
        console.error(`Failed to load logo: ${src}`);
        e.target.style.display = 'none';
      }}
    />
    {/* iOS-style theme color tint overlay */}
    <div 
      className="absolute inset-0"
      style={{
        backgroundColor: 'var(--theme-primary)',
        mixBlendMode: 'color',
        opacity: 0.7
      }}
    />
    {/* Additional overlay for depth */}
    <div 
      className="absolute inset-0"
      style={{
        background: `linear-gradient(to bottom, transparent 0%, var(--theme-primary) 100%)`,
        mixBlendMode: 'soft-light',
        opacity: 0.3
      }}
    />
  </div>
));

const CMUHighlight = React.memo(() => (
  <span className="relative inline-block group cursor-default">
    <span className="bg-gradient-to-r from-slate-200 via-slate-200 to-[#C41230] bg-[length:100%_auto] bg-clip-text text-transparent font-black tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-700">
      Carnegie Mellon University
    </span>
  </span>
));

const useTypewriter = (text, speed = 10, shouldAnimate = true) => {
  const [displayedText, setDisplayedText] = useState(shouldAnimate ? "" : text);
  useEffect(() => {
    if (!shouldAnimate) {
      setDisplayedText(text);
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, shouldAnimate]);
  return displayedText;
};

const AIMessage = React.memo(({ text, animate }) => {
  const typedText = useTypewriter(text, 5, animate);
  return <span>{typedText}</span>;
});

const InteractiveBackground = React.memo(({ themeColor }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const particleCount = window.innerWidth < 768 ? 25 : 50;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 0.5
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = themeColor;
      ctx.strokeStyle = themeColor;
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.globalAlpha = 0.3; 
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.globalAlpha = (1 - dist / 150) * 0.4;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [themeColor]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
});

// Auto Spotlight Hook
const useAutoSpotlight = (className) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      const cards = document.querySelectorAll(`.${className}`);
      let start = null;
      let animationFrame;

      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / 3000;
        cards.forEach((card, index) => {
          const offset = index * 2;
          const x = 50 + 40 * Math.sin(progress * 2 + offset);
          const y = 50 + 30 * Math.cos(progress * 3 + offset);
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--x', `${(x / 100) * rect.width}px`);
          card.style.setProperty('--y', `${(y / 100) * rect.height}px`);
        });
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [className]);
};

const BrainReactor = React.memo(({ active }) => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <div className={`absolute w-3 h-3 rounded-full bg-[var(--theme-primary)] shadow-[0_0_15px_currentColor] z-10 ${active ? 'animate-pulse' : ''}`} />
    <div className={`absolute inset-0 border-2 border-[var(--theme-primary)]/30 rounded-full border-t-transparent animate-[spin_3s_linear_infinite] ${active ? 'duration-[1s]' : ''}`} />
    <div className={`absolute inset-2 border-2 border-[var(--theme-accent)]/30 rounded-full border-b-transparent animate-[spin_5s_linear_infinite_reverse] ${active ? 'duration-[2s]' : ''}`} />
    <div className={`absolute inset-0 bg-[var(--theme-primary)]/10 rounded-full blur-xl ${active ? 'scale-150 opacity-100' : 'scale-100 opacity-50'} transition-all duration-500`} />
  </div>
));

// --- MEMOIZED SECTIONS ---

const HeroSection = React.memo(({ tagline, loaded, onDownload, socialLinks }) => (
  <section id="home" className="relative pt-20 md:pt-48 pb-20 md:pb-32 px-6 overflow-hidden min-h-[100dvh] flex flex-col justify-center">
    <div className="max-w-7xl mx-auto w-full relative z-10">
      <div className="reveal space-y-6 md:space-y-12">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[var(--theme-primary)] text-[10px] font-black font-mono uppercase tracking-[0.3em] shadow-xl backdrop-blur-md transition-transform hover:scale-105">
          <Zap size={12} className="fill-current animate-pulse" /> 
          <span className="min-w-[200px] flex items-center gap-1">
            {tagline}
            <span className="w-0.5 h-3 bg-[var(--theme-primary)] animate-pulse inline-block" />
          </span>
        </div>
        
        <h1 className={`text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] uppercase select-none drop-shadow-2xl transition-all duration-1000 delay-100 text-left ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Gaurav <br />
          <span className="text-white/10 transition-colors duration-1000 hover:text-white/20">Pandey.</span>
        </h1>

        <div className={`w-full transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-lg md:text-3xl text-slate-300 font-medium leading-relaxed max-w-5xl">
            Graduate student at <CMUHighlight /> with 3+ years of full time experience in developing distributed systems and leading production support for Datahub Product at Epsilon.
          </p>
        </div>

        <div className={`flex flex-wrap justify-start gap-4 md:gap-6 pt-2 md:pt-6 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a 
            href="https://drive.google.com/file/d/1lBFFDaMsckyL3M77AIsW0sZDdnfGB5eW/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--theme-primary)] text-white px-8 md:px-10 py-4 md:py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:translate-y-[-4px] transition-all shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-3 active:scale-95 group border-t border-white/20 touch-manipulation min-h-[44px]"
          >
            <FileText size={18} className="group-hover:animate-bounce" /> View Resume
          </a>
          <div className="flex gap-4">
            {socialLinks.map((social, i) => (
              <a 
                key={i} 
                href={social.url} 
                target={social.url.startsWith('http') ? "_blank" : "_self"}
                rel={social.url.startsWith('http') ? "noopener noreferrer" : undefined}
                className="p-4 md:p-5 rounded-full bg-white/5 border border-white/10 hover:border-white/30 hover:scale-110 active:scale-95 transition-all text-slate-400 hover:text-white group shadow-lg touch-manipulation"
              >
                {React.cloneElement(social.icon, { size: 20 })}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
));

const ExperienceSection = React.memo(() => {
  const handleMouseMove = (e) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 reveal">
          <div className="space-y-4">
            <h2 className="text-6xl font-black tracking-tighter uppercase italic">Experience<span className="text-[var(--theme-primary)]">.</span></h2>
            <p className="text-slate-500 font-black tracking-[0.6em] text-[10px] uppercase">Professional Evolution</p>
          </div>
          <div className="hidden md:block h-[1px] flex-1 mx-20 mb-4 bg-white/10" />
        </div>

        <div className="space-y-16">
          {experienceData.map((job, i) => {
            // Determine if the card should be a link or a div
            const CardTag = job.link ? 'a' : 'div';
            const cardProps = job.link ? { 
              href: job.link, 
              target: "_blank", 
              rel: "noopener noreferrer" 
            } : {};

            return (
            <div key={i} className="reveal grid lg:grid-cols-[1fr_2.5fr] gap-12 group" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="space-y-4">
                <div className="text-xs font-black uppercase tracking-[0.4em] text-[var(--theme-primary)]">{job.period}</div>
                <h3 className="text-4xl font-black transition-all group-hover:translate-x-2">{job.company}</h3>
              </div>
              <CardTag 
                {...cardProps}
                onMouseMove={handleMouseMove} 
                className={`spotlight-card relative bg-white/[0.02] backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all shadow-xl overflow-hidden group/card flex flex-col ${job.link ? 'cursor-pointer hover:translate-y-[-4px]' : ''}`}
              >
                 <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(800px circle at var(--x) var(--y), rgba(var(--theme-glow), 0.4), transparent 40%)` }} />
                 <div className="md:hidden absolute inset-0 opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(800px circle at var(--x) var(--y), rgba(var(--theme-glow), 0.4), transparent 40%)` }} />
                <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-6 mb-8">
                    {/* Replaced standard Icon with Tinted Logo for iOS-like theming */}
                    <div className="w-16 h-16 rounded-2xl bg-[var(--theme-primary)] bg-opacity-10 overflow-hidden">
                      <TintedLogo src={job.logo} alt={job.company} />
                    </div>
                    <h4 className="text-2xl font-black tracking-tight uppercase">{job.role}</h4>
                  </div>
                  <ul className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                    {job.points.map((p, pi) => (
                      <li key={pi} className="flex gap-4 text-slate-400 text-sm leading-relaxed font-medium group/li">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] mt-2 shrink-0 group-hover/li:scale-150 transition-transform" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Explicit Link CTA at the bottom */}
                {job.link && (
                  <div className="relative z-10 mt-8 pt-6 border-t border-white/5 flex items-center justify-between group/link">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--theme-primary)] group-hover/link:underline flex items-center gap-2">
                      View Details <ExternalLink size={14} />
                    </span>
                    <ArrowUpRight size={20} className="text-slate-600 group-hover/link:text-white group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-all" />
                  </div>
                )}
              </CardTag>
            </div>
          )})}
        </div>
      </div>
    </section>
  );
});

const ProjectsSection = React.memo(() => {
  const handleMouseMove = (e) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="projects" className="py-32 px-6 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 reveal">
          <h2 className="text-7xl font-black tracking-tighter uppercase mb-6">Projects<span className="text-[var(--theme-primary)]">.</span></h2>
          <p className="text-slate-500 font-black tracking-[0.6em] text-[11px] uppercase">Engineered Solutions</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {projectsData.map((p, i) => {
            const CardTag = p.link ? 'a' : 'div';
            const cardProps = p.link ? { 
              href: p.link, 
              target: "_blank", 
              rel: "noopener noreferrer" 
            } : {};
            
            return (
            <CardTag 
              key={i} 
              {...cardProps}
              onMouseMove={handleMouseMove} 
              style={{ transitionDelay: `${i * 100}ms` }} 
              className={`spotlight-card reveal group relative p-10 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all duration-700 overflow-hidden flex flex-col group/card ${p.link ? 'cursor-pointer hover:translate-y-[-10px]' : ''}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(600px circle at var(--x) var(--y), rgba(var(--theme-glow), 0.4), transparent 40%)` }} />
              <div className="md:hidden absolute inset-0 opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(600px circle at var(--x) var(--y), rgba(var(--theme-glow), 0.4), transparent 40%)` }} />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 rounded-2xl text-[var(--theme-primary)] bg-white/5 border border-white/5 group-hover:scale-110 transition-transform">{React.cloneElement(p.icon, { size: 28 })}</div>
                  <div className="flex gap-2">
                    {p.tags.map(tag => <span key={tag} className="px-3 py-1 bg-black/40 rounded-lg text-[9px] font-black uppercase text-slate-400 border border-white/5 tracking-wider">{tag}</span>)}
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{p.title}</h3>
                <p className="text-slate-400 text-base leading-relaxed mb-8 font-medium">{p.desc}</p>
                
                {/* Dynamic Footer: Tech Brief or Explicit Link */}
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  {p.link ? (
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[var(--theme-primary)] group-hover/card:underline">
                      View Project <ExternalLink size={14} />
                    </div>
                  ) : (
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--theme-primary)]">View Details</span>
                  )}
                  <ArrowUpRight className={`text-slate-600 group-hover:text-white transition-all ${p.link ? 'group-hover/card:translate-x-1 group-hover/card:-translate-y-1' : ''}`} size={18} />
                </div>
              </div>
            </CardTag>
          )})}
        </div>
      </div>
    </section>
  );
});

const LeadershipSection = React.memo(() => {
  const handleMouseMove = (e) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="leadership" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 reveal">
          <div className="space-y-4">
            <h2 className="text-6xl font-black tracking-tighter uppercase italic">Leadership <span className="text-[var(--theme-primary)]">&</span> Activities</h2>
            <p className="text-slate-500 font-black tracking-[0.6em] text-[10px] uppercase">Community & Impact</p>
          </div>
          <div className="hidden md:block h-[1px] flex-1 mx-20 mb-4 bg-white/10" />
        </div>

        <div className="space-y-16">
          {leadershipData.map((role, i) => {
            // Determine if the card should be a link or a div
            const CardTag = role.link ? 'a' : 'div';
            const cardProps = role.link ? { 
              href: role.link, 
              target: "_blank", 
              rel: "noopener noreferrer" 
            } : {};

            return (
              <div key={i} className="reveal grid lg:grid-cols-[1fr_2.5fr] gap-12 group" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="space-y-4">
                  <div className="text-xs font-black uppercase tracking-[0.4em] text-[var(--theme-primary)]">{role.period}</div>
                  <h3 className="text-4xl font-black transition-all group-hover:translate-x-2">{role.org}</h3>
                </div>
                <CardTag 
                  {...cardProps}
                  onMouseMove={handleMouseMove} 
                  className={`spotlight-card relative bg-white/[0.02] backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all shadow-xl overflow-hidden group/card flex flex-col ${role.link ? 'cursor-pointer hover:translate-y-[-4px]' : ''}`}
                >
                   <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(800px circle at var(--x) var(--y), rgba(var(--theme-glow), 0.4), transparent 40%)` }} />
                   <div className="md:hidden absolute inset-0 opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(800px circle at var(--x) var(--y), rgba(var(--theme-glow), 0.4), transparent 40%)` }} />
                  <div className="relative z-10 flex-1">
                    <div className="flex items-center gap-6 mb-8">
                      {/* Replaced standard Icon with Tinted Logo for iOS-like theming */}
                      <div className="w-16 h-16 rounded-2xl bg-[var(--theme-primary)] bg-opacity-10 overflow-hidden">
                        <TintedLogo src={role.logo} alt={role.org} />
                      </div>
                      <h4 className="text-2xl font-black tracking-tight uppercase flex items-center gap-3">
                        {role.role}
                      </h4>
                    </div>
                    <ul className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                      {role.points.map((p, pi) => (
                        <li key={pi} className="flex gap-4 text-slate-400 text-sm leading-relaxed font-medium group/li">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] mt-2 shrink-0 group-hover/li:scale-150 transition-transform" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Explicit Link CTA at the bottom */}
                  {role.link && (
                    <div className="relative z-10 mt-8 pt-6 border-t border-white/5 flex items-center justify-between group/link">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--theme-primary)] group-hover/link:underline flex items-center gap-2">
                        View Details <ExternalLink size={14} />
                      </span>
                      <ArrowUpRight size={20} className="text-slate-600 group-hover/link:text-white group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-all" />
                    </div>
                  )}
                </CardTag>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

const EducationSection = React.memo(() => {
  const handleMouseMove = (e) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="education" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 reveal">
          <div className="space-y-4">
            <h2 className="text-6xl font-black tracking-tighter uppercase italic">Education<span className="text-[var(--theme-primary)]">.</span></h2>
            <p className="text-slate-500 font-black tracking-[0.6em] text-[10px] uppercase">Academic Background</p>
          </div>
          <div className="hidden md:block h-[1px] flex-1 mx-20 mb-4 bg-white/10" />
        </div>

        <div className="space-y-16">
          {educationData.map((edu, i) => (
            <div key={i} className="reveal grid lg:grid-cols-[1fr_2.5fr] gap-12 group" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="space-y-4">
                <div className="text-xs font-black uppercase tracking-[0.4em] text-[var(--theme-primary)]">{edu.period}</div>
                <h3 className="text-3xl font-black transition-all group-hover:translate-x-2">{edu.school}</h3>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">GPA: {edu.grade}</div>
              </div>
              <div onMouseMove={handleMouseMove} className="spotlight-card relative bg-white/[0.02] backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all shadow-xl overflow-hidden group/card">
                 <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(800px circle at var(--x) var(--y), rgba(var(--theme-glow), 0.4), transparent 40%)` }} />
                 <div className="md:hidden absolute inset-0 opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(800px circle at var(--x) var(--y), rgba(var(--theme-glow), 0.4), transparent 40%)` }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--theme-primary)] bg-opacity-10 overflow-hidden">
                      <TintedLogo src={edu.logo} alt={edu.school} />
                    </div>
                    <h4 className="text-xl font-black tracking-tight uppercase leading-snug">{edu.degree}</h4>
                  </div>
                  
                  {edu.details ? (
                    <div className="grid md:grid-cols-2 gap-8">
                      {edu.details.map((sem, j) => (
                        <div key={j} className="space-y-4">
                          <h5 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--theme-primary)] border-b border-white/10 pb-2 mb-3">{sem.term}</h5>
                          <ul className="space-y-2">
                            {sem.courses.map((course, k) => (
                              <li key={k} className="text-slate-400 text-xs font-medium flex items-start gap-2">
                                <span className="w-1 h-1 rounded-full bg-[var(--theme-primary)] mt-1.5 shrink-0" />
                                {course}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-slate-400 text-sm font-medium border-l-2 border-[var(--theme-primary)] pl-4">
                      {edu.specialization}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

const SkillsSection = React.memo(() => (
  <section id="skills" className="py-32 px-6">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-20">
      <div className="reveal">
        <h2 className="text-6xl font-black tracking-tighter uppercase leading-none mb-10 italic">Core <br />Stack<span className="text-[var(--theme-primary)]">.</span></h2>
        <div className="space-y-6">
           <p className="text-slate-400 text-lg font-medium leading-relaxed">A specialized toolkit for cloud architecture and high-load backend optimization.</p>
           <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/5 rounded-[2rem] group hover:bg-white/10 transition-colors">
             <Award className="text-[var(--theme-primary)]" size={32} />
             <div>
               <div className="text-xs font-black uppercase tracking-widest mb-1 text-slate-300">Top Honors</div>
               <div className="text-sm text-slate-500 font-bold">Runner-up @ Google Cloud Sprint</div>
             </div>
           </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 reveal">
        {skillsData.map((s, i) => {
          const categoryName = s.cat || Object.keys(s)[0];
          const items = s.items || Object.values(s)[0];
          return (
          <div key={i} className="p-8 bg-white/[0.03] border border-white/5 rounded-[2rem] group hover:border-white/20 transition-all hover:translate-y-[-4px]">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-[var(--theme-primary)] group-hover:scale-110 transition-transform">{React.cloneElement(s.icon, { size: 24 })}</div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em]">{categoryName}</h4>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {items.map(item => <span key={item} className="text-xs font-bold text-slate-500 hover:text-white transition-colors cursor-default">{item}</span>)}
            </div>
          </div>
        )})}
      </div>
    </div>
  </section>
));

const Footer = React.memo(() => (
  <footer className="py-12 px-6 border-t border-white/5 bg-black/40">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 flex items-center gap-2">
         <span>Made with</span>
         <Heart size={10} className="text-red-500 fill-current animate-pulse" />
         <span>by Gaurav Pandey</span>
      </div>
      <div className="flex gap-4">
        {socialLinks.map((social, i) => (
          <a 
            key={i} 
            href={social.url} 
            target={social.url.startsWith('http') ? "_blank" : "_self"}
            rel={social.url.startsWith('http') ? "noopener noreferrer" : undefined}
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 transition-all text-slate-400 hover:text-white"
          >
            {React.cloneElement(social.icon, { size: 16 })}
          </a>
        ))}
      </div>
    </div>
  </footer>
));

// --- MAIN APP COMPONENT ---

const App = () => {
  const [activeTheme, setActiveTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio_theme') || 'vulcan';
    }
    return 'vulcan';
  });
  
  // -- NEW STATE FOR PROFILE EXPANSION --
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  // Initialize scroll state correctly to prevent jitter on refresh
  const [scrolled, setScrolled] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY > 80;
    }
    return false;
  });
  
  // Use layout effect to set scroll state before paint to prevent jitter
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const initialScroll = window.scrollY > 80;
      if (initialScroll !== scrolled) {
        setScrolled(initialScroll);
      }
    }
  }, []);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [isThemeClosing, setIsThemeClosing] = useState(false);
  const tagline = useTypewriter("Targeting SWE Summer Internship", 50); 
  
  const [loaded, setLoaded] = useState(false);
  const [renderBelowFold, setRenderBelowFold] = useState(false);

  // Manual Scroll Ref to prevent jitter
  const isManualScroll = useRef(false);

  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm Gaurav's virtual assistant. I'm here to answer questions about his software engineering journey, CMU coursework, or the systems he's built. Ask away!", animate: false }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  
  // Refs
  const chatEndRef = useRef(null);
  const aiButtonRef = useRef(null);
  const themeWrapperRef = useRef(null);
  const [chatOrigin, setChatOrigin] = useState({ x: 0, y: 0 });
  const [ripple, setRipple] = useState({ active: false, x: 0, y: 0, color: '' });

  useEffect(() => {
    const theme = themes[activeTheme];
    document.documentElement.style.setProperty('--theme-primary', theme.primary);
    document.documentElement.style.setProperty('--theme-accent', theme.accent);
    document.documentElement.style.setProperty('--theme-glow', theme.glow);
  }, [activeTheme]);

  useAutoSpotlight('spotlight-card');

  // Detect Mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Click Outside to Close Theme Menu AND Profile Expanded
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close Theme Menu
      if (
        showThemeMenu && 
        themeWrapperRef.current && 
        !themeWrapperRef.current.contains(event.target)
      ) {
        setIsThemeClosing(true);
        setTimeout(() => {
          setShowThemeMenu(false);
          setIsThemeClosing(false);
        }, 500);
      }
      
      // Close Expanded Profile
      if (isProfileExpanded && !event.target.closest('.profile-trigger')) {
        setIsProfileExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showThemeMenu, isProfileExpanded]);

  const toggleThemeMenu = useCallback(() => {
    if (showThemeMenu) {
      setIsThemeClosing(true);
      setTimeout(() => { setShowThemeMenu(false); setIsThemeClosing(false); }, 500);
    } else {
      setShowThemeMenu(true);
    }
  }, [showThemeMenu]);

  const toggleProfile = useCallback((e) => {
    e.stopPropagation();
    setIsProfileExpanded(prev => !prev);
  }, []);

  const handleThemeChange = useCallback((newThemeKey, e) => {
    e.stopPropagation();
    const newColor = themes[newThemeKey].bg;
    setRipple({ active: true, x: e.clientX, y: e.clientY, color: newColor });

    setTimeout(() => {
      setActiveTheme(newThemeKey);
      localStorage.setItem('portfolio_theme', newThemeKey);
      setIsThemeClosing(true);
      setTimeout(() => { setShowThemeMenu(false); setIsThemeClosing(false); }, 500);
    }, 300);

    setTimeout(() => { setRipple(prev => ({ ...prev, active: false })); }, 1000);
  }, []);

  // Optimized Navigation Handler (Direct Jump)
  const handleNavClick = useCallback((id, e) => {
    e.preventDefault();
    isManualScroll.current = true; // Disable scroll spy
    setActiveSection(id); // Immediate UI update

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    // Re-enable spy after animation completes (approx 1s)
    setTimeout(() => {
      isManualScroll.current = false;
    }, 1000);
  }, []);

  const openChat = useCallback(() => {
    if (aiButtonRef.current) {
      const rect = aiButtonRef.current.getBoundingClientRect();
      setChatOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
    setIsChatOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => { setIsChatOpen(false); setIsClosing(false); }, 400); 
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMessage = { role: 'user', text: chatInput, animate: false };
    const currentInput = chatInput; // Capture before clearing
    setMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsChatLoading(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contents: [{ parts: [{ text: currentInput }] }], 
          systemInstruction: { parts: [{ text: PORTFOLIO_CONTEXT }] } 
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API Error: ${response.status}`);
      }
      
      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I seem to be disconnected from the mainframe. Try again?";
      setMessages(prev => [...prev, { role: 'assistant', text: aiText, animate: true }]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      const errorMessage = error.message?.includes('API key') || error.message?.includes('401')
        ? "Invalid API key. Please check your configuration."
        : error.message?.includes('quota') || error.message?.includes('429')
        ? "Rate limit exceeded. Please try again in a moment."
        : `Connection Error: ${error.message || 'Neural link unstable. Try again?'}`;
      setMessages(prev => [...prev, { role: 'assistant', text: errorMessage, animate: true }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  useEffect(() => {
    if (isChatOpen) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isChatOpen]);

  useEffect(() => {
    // Faster initial load - render hero immediately, defer rest
    setTimeout(() => setLoaded(true), 50);
    
    // Use IntersectionObserver for better performance instead of fixed timeout
    let hasRendered = false;
    let fallbackTimeout;
    let observer = null;
    
    // Observe a sentinel element or use scroll position
    const sentinel = document.getElementById('home');
    if (sentinel) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasRendered) {
            hasRendered = true;
            setRenderBelowFold(true);
            if (observer) observer.disconnect();
            if (fallbackTimeout) clearTimeout(fallbackTimeout);
          }
        },
        { rootMargin: '200px' } // Start loading 200px before viewport
      );
      observer.observe(sentinel);
      // Fallback: render after 400ms if not triggered
      fallbackTimeout = setTimeout(() => {
        if (!hasRendered) {
          hasRendered = true;
          setRenderBelowFold(true);
          if (observer) observer.disconnect();
        }
      }, 400);
    } else {
      // Fallback if sentinel not found
      fallbackTimeout = setTimeout(() => setRenderBelowFold(true), 400);
    }

    const handleScroll = () => {
      // 1. Navbar State: Toggle compact mode on scroll (Always run)
      // Use requestAnimationFrame to prevent jitter
      const currentScroll = window.scrollY;
      if (currentScroll > 80 && !scrolled) {
        requestAnimationFrame(() => setScrolled(true));
      } else if (currentScroll < 60 && scrolled) {
        requestAnimationFrame(() => setScrolled(false));
      }
      
      // Close profile on scroll
      if (isProfileExpanded) setIsProfileExpanded(false);

      // 2. Active Section Spy (SKIP if manual scroll is active)
      if (isManualScroll.current) return;

      const viewportCenter = window.innerHeight / 2;
      let closestSection = activeSection;
      let minDistance = Infinity;

      const sections = ['home', 'experience', 'projects', 'leadership', 'education', 'skills'];
      
      sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          const distance = Math.abs(viewportCenter - sectionCenter);
          
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = id;
          }
        }
      });

      if (closestSection !== activeSection) {
        setActiveSection(closestSection);
      }
    };

    // Throttle scroll handler with requestAnimationFrame
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (renderBelowFold) {
      document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      revealObserver.disconnect();
      if (observer) observer.disconnect();
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
    };
  }, [scrolled, activeSection, renderBelowFold, isProfileExpanded]);

  // Determine if we should show the compact "scrolled" view (Always on mobile, or when scrolled)
  const isCompact = scrolled || isMobile;
  
  // Track transition direction for different animations
  // CRITICAL: This must track the DIRECTION of change, not just current state
  const prevCompactRef = useRef(isCompact);
  const [isExpanding, setIsExpanding] = useState(() => {
    // Initialize based on current state
    const initialCompact = typeof window !== 'undefined' ? (window.scrollY > 80 || window.innerWidth < 768) : false;
    prevCompactRef.current = initialCompact;
    return !initialCompact;
  });
  
  // Use layout effect to update direction BEFORE paint to prevent wrong transition
  useLayoutEffect(() => {
    const wasCompact = prevCompactRef.current;
    const nowCompact = isCompact;
    
    if (wasCompact !== nowCompact) {
      // State changed - determine direction immediately
      // Going from compact (true) to not compact (false) = expanding
      // Going from not compact (false) to compact (true) = contracting
      const expanding = wasCompact && !nowCompact;
      setIsExpanding(expanding);
      prevCompactRef.current = nowCompact;
    }
  }, [isCompact]);

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden transition-colors duration-700 ease-in-out" style={{ backgroundColor: themes[activeTheme].bg }}>
      
      <InteractiveBackground themeColor={themes[activeTheme].particle} />

      {ripple.active && (
        <div 
          className="fixed pointer-events-none z-[100] rounded-full animate-ripple mix-blend-screen"
          style={{ left: ripple.x, top: ripple.y, backgroundColor: ripple.color, width: '10px', height: '10px', transform: 'translate(-50%, -50%)' }}
        />
      )}

      {/* --- AI Chat Modal --- */}
      {isChatOpen && (
        <div className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6 transition-all duration-500 ${isClosing ? 'bg-transparent' : 'bg-black/60 backdrop-blur-sm'}`}>
          <div className="absolute inset-0" onClick={closeChat} />
          <div 
            className={`
              relative w-full sm:max-w-lg h-[85vh] sm:h-[650px] 
              bg-[#050505]/95 backdrop-blur-[40px] 
              border border-[var(--theme-primary)]/30
              rounded-t-[2.5rem] sm:rounded-[2.5rem] 
              shadow-[0_0_100px_-20px_rgba(0,0,0,0.8)]
              flex flex-col overflow-hidden box-border
              ${isClosing ? 'animate-spring-out' : 'animate-spring-up'}
            `}
            style={{ transformOrigin: window.innerWidth < 640 ? 'bottom center' : `${chatOrigin.x}px ${chatOrigin.y}px` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-primary)]/20 via-transparent to-[var(--theme-accent)]/20 opacity-50 pointer-events-none" />
            <div className="relative p-6 border-b border-white/5 flex justify-between items-center bg-black/40">
              <div className="flex items-center gap-4">
                <BrainReactor active={isChatLoading} theme={themes[activeTheme]} />
                <div><h3 className="font-black text-xl text-white tracking-tight flex items-center gap-2">Gaurav AI</h3><p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Powered by Gemini 2.5</p></div>
              </div>
              <button onClick={closeChat} className="p-3 hover:bg-white/10 rounded-full transition-all hover:rotate-90 active:scale-90 z-20"><X size={20} className="text-slate-400" /></button>
            </div>
            <div className="relative flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth z-10">
              <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--theme-glow),0.5)_0%,_transparent_70%)] opacity-20 pointer-events-none fixed`} />
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`} style={{ animationDelay: `${idx * 0.05}s` }}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed font-medium shadow-lg backdrop-blur-md ${msg.role === 'user' ? `bg-[var(--theme-primary)]/90 text-white rounded-tr-sm shadow-[var(--theme-primary)]/20 border border-[var(--theme-primary)]/40` : 'bg-white/5 text-slate-200 rounded-tl-sm border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]'}`}>
                    {msg.role === 'assistant' ? <AIMessage text={msg.text} animate={msg.animate} /> : msg.text}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start animate-slide-up">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-sm border border-white/10 flex items-center gap-2">
                    <div className="w-1 h-4 bg-[var(--theme-primary)] rounded-full animate-[wave_1s_ease-in-out_infinite]" />
                    <div className="w-1 h-6 bg-[var(--theme-primary)] rounded-full animate-[wave_1s_ease-in-out_0.1s_infinite]" />
                    <div className="w-1 h-3 bg-[var(--theme-primary)] rounded-full animate-[wave_1s_ease-in-out_0.2s_infinite]" />
                    <span className="text-xs text-slate-500 ml-2 font-bold tracking-wider">THINKING</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="relative p-5 border-t border-white/10 bg-black/40 backdrop-blur-xl z-20">
              <div className="flex gap-3 items-end">
                <div className="flex-1 relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-accent)] rounded-2xl opacity-20 group-hover:opacity-50 transition duration-500 blur-sm" />
                  <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask about projects..." className="relative w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-white/30 transition-all shadow-inner" />
                </div>
                <button type="submit" disabled={isChatLoading || !chatInput.trim()} className="p-4 rounded-2xl bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-[var(--theme-primary)]/20"><Send size={20} /></button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- FLOATING NAVIGATION --- */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center items-start px-4 pointer-events-none">
        <nav 
          className={`
            pointer-events-auto relative flex items-center justify-between
            shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-3xl backdrop-saturate-[180%] 
            border border-white/10 rounded-full overflow-visible
            will-change-[width,height,padding,transform]
            ${isCompact 
              ? 'bg-black/80 p-1.5 h-[52px]' // Slightly wider on mobile for better fit
              : 'bg-black/40 p-2 h-auto'
            }
          `}
          style={{
            width: isCompact ? '360px' : 'min(95%, 1024px)',
            transition: isExpanding 
              ? 'width 1000ms cubic-bezier(0.2, 1.5, 0.2, 1), height 1000ms cubic-bezier(0.2, 1.5, 0.2, 1), padding 1000ms cubic-bezier(0.2, 1.5, 0.2, 1)'
              : 'width 900ms cubic-bezier(0.34, 1.6, 0.64, 1), height 900ms cubic-bezier(0.34, 1.6, 0.64, 1), padding 900ms cubic-bezier(0.34, 1.6, 0.64, 1)'
          }}
        >
          {/* Logo & Divider - Equal Spacing Logic */}
          <div className={`flex-shrink-0 flex items-center justify-center ${isCompact ? 'pl-2' : 'pl-3'}`}>
            
            {/* -- DYNAMIC PROFILE PICTURE -- */}
            <div className={`relative profile-trigger ${isCompact ? 'w-8 h-8' : 'w-10 h-10'}`}>
                
               {/* Small Avatar - Click to Expand */}
               <div 
                 onClick={toggleProfile}
                 className={`
                   relative w-full h-full rounded-full overflow-hidden shadow-lg 
                   transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer transform-gpu
                   ${isProfileExpanded ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}
                 `}
               >
                 <img src="/image_c1c534.jpg" alt="Gaurav Pandey" className="w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" />
               </div>

               {/* Expanded Avatar "Dynamic Island" Effect - Vision OS Style */}
               {/* Positioned top-full to expand DOWNWARDS from the navbar */}
               <div 
                  onClick={toggleProfile}
                  className={`
                     absolute top-full left-0 mt-4 z-50 transform-gpu
                     transition-all duration-700 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] cursor-pointer origin-top-left
                     will-change-[width,height,transform,opacity]
                    ${isProfileExpanded 
                      ? 'w-64 h-80 opacity-100 translate-y-0 scale-100' // Open state
                      : 'w-10 h-10 opacity-0 pointer-events-none -translate-y-4 scale-50' // Closed state
                    }
                  `}
               >
                  {/* Vision OS style container - dreamy fade with transparency */}
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                    {/* Blurred background layer for depth */}
                    <img 
                      src="/image_c1c534.jpg" 
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      style={{
                        filter: 'blur(20px)',
                        transform: 'scale(1.05)',
                        opacity: 0.4
                      }}
                      aria-hidden="true"
                    />
                    
                    {/* Main image with Vision OS fade - sharp center, transparent edges */}
                    <div 
                      className="relative w-full h-full"
                      style={{
                        maskImage: 'radial-gradient(ellipse 70% 70% at center, black 50%, transparent 85%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at center, black 50%, transparent 85%)',
                        WebkitMaskComposite: 'source-over',
                      }}
                    >
                      <img 
                        src="/image_c1c534.jpg" 
                        alt="Gaurav Pandey" 
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    
                    {/* Subtle edge blur layer for Vision OS softness */}
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        maskImage: 'radial-gradient(ellipse 75% 75% at center, transparent 60%, black 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at center, transparent 60%, black 100%)',
                      }}
                    >
                      <img 
                        src="/image_c1c534.jpg" 
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        style={{
                          filter: 'blur(15px)',
                          opacity: 0.6
                        }}
                        aria-hidden="true"
                      />
                    </div>
                    
                    {/* Very subtle fade overlay for seamless blend */}
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse 80% 80% at center, transparent 60%, rgba(0,0,0,0.15) 85%, rgba(0,0,0,0.3) 100%)`,
                      }}
                    />
                  </div>
               </div>

            </div>
          </div>
          
          <div className="w-[1px] h-6 bg-white/10 rounded-full mx-3"></div>
          
          {/* Navigation Pills - Improved Spacing for Mobile Circle Cutoff Fix */}
          <div className={`grid grid-cols-6 ${isCompact ? 'gap-0 w-full' : 'gap-4 w-full'} flex-1 ${isExpanding ? 'transition-all duration-[1000ms] ease-[cubic-bezier(0.2,1.5,0.2,1)]' : 'transition-all duration-[900ms] ease-[cubic-bezier(0.34,1.6,0.64,1)]'} relative overflow-visible`}>
            {/* Active Pill Active Indicator - Now using theme primary color always */}
            <div 
              className={`
                absolute rounded-full -z-10 
                 ${isExpanding ? 'transition-all duration-[1000ms] ease-[cubic-bezier(0.2,1.5,0.2,1)]' : 'transition-all duration-[900ms] ease-[cubic-bezier(0.34,1.6,0.64,1)]'}
                ${isCompact ? 'shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'shadow-[0_0_20px_rgba(255,255,255,0.4)]'}
              `}
              style={{ 
                backgroundColor: 'var(--theme-primary)', 
                opacity: isCompact ? 0.9 : 1, 
                left: `calc(${navItems.findIndex(i => i.id === activeSection) * (100/6)}% + ${(100/12)}%)`, 
                width: isCompact ? '36px' : `${100/6}%`, 
                height: isCompact ? '36px' : '80%', 
                top: '50%', 
                transform: 'translate(-50%, -50%)', 
                borderRadius: '9999px',
                willChange: 'left, width, height, transform',
                transition: isExpanding ? 'all 1s cubic-bezier(0.2, 1.5, 0.2, 1)' : 'all 0.9s cubic-bezier(0.34, 1.6, 0.64, 1)',
              }} 
            />
            
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a 
                  key={item.id} 
                  href={`#${item.id}`} 
                  onClick={(e) => handleNavClick(item.id, e)} // Use manual click handler
                  className={`
                     relative flex items-center justify-center ${isExpanding ? 'transition-all duration-[1000ms] ease-[cubic-bezier(0.2,1.5,0.2,1)]' : 'transition-all duration-[900ms] ease-[cubic-bezier(0.34,1.6,0.64,1)]'} z-10 w-full transform-gpu
                    ${isCompact 
                      ? 'h-10 rounded-full text-slate-400 hover:text-white active:scale-90' 
                      : 'py-2 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-wider'
                    }
                    ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}
                    ${isActive && isCompact ? 'scale-105' : ''}
                  `}
                >
                   <span className={`absolute whitespace-nowrap ${isExpanding ? 'transition-all duration-[1000ms] ease-[cubic-bezier(0.2,1.5,0.2,1)]' : 'transition-all duration-[900ms] ease-[cubic-bezier(0.34,1.6,0.64,1)]'} ${isCompact ? 'opacity-0 scale-50' : 'opacity-100 scale-100 relative'}`}>
                    {item.label}
                  </span>
                   <span className={`absolute ${isExpanding ? 'transition-all duration-[1000ms] ease-[cubic-bezier(0.2,1.5,0.2,1)]' : 'transition-all duration-[900ms] ease-[cubic-bezier(0.34,1.6,0.64,1)]'} ${isCompact ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-180'}`}>
                    {item.icon}
                  </span>
                </a>
              );
            })}
          </div>
          
          <div className="w-[1px] h-6 bg-white/10 rounded-full mx-3"></div>
          <div className={`flex-shrink-0 flex items-center gap-3 ${isCompact ? 'pr-2' : 'pr-3'}`}>
            {/* Ask AI Button */}
            <button ref={aiButtonRef} onClick={openChat} className={`group relative z-50 flex items-center justify-center rounded-full transition-all duration-500 active:scale-95 hover:shadow-[0_0_25px_-5px_rgba(124,58,237,0.6)] overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x bg-[length:200%_auto] ${isCompact ? 'w-9 h-9' : 'h-10 px-4'}`} title="Ask AI">
              <div className={`relative z-10 flex items-center gap-2 h-full rounded-full transition-all ${isCompact ? 'w-full justify-center' : ''}`}>
                <Sparkles size={isCompact ? 14 : 16} className="text-white animate-pulse" />
                {!isCompact && <span className="text-[10px] font-black uppercase tracking-wider text-white">Ask Gaurav AI</span>}
              </div>
            </button>
            {/* Theme Toggle */}
            <div 
              ref={themeWrapperRef}
              className={`relative flex items-center justify-center cursor-pointer rounded-full bg-white/5 hover:bg-white/15 border border-white/10 transition-all duration-300 z-50 animate-in zoom-in spin-in-180 duration-1000 ${isCompact ? 'w-8 h-8' : 'w-9 h-9'} ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} 
              onClick={toggleThemeMenu} 
              role="button"
            >
              <Palette size={isCompact ? 14 : 16} className={`text-[var(--theme-primary)] transition-all duration-700 ${showThemeMenu ? 'rotate-90' : 'group-hover:rotate-180'}`} />
              {showThemeMenu && (
                <div className={`absolute top-full right-0 mt-6 min-w-[220px] origin-top-right z-[999] ${isThemeClosing ? 'animate-super-exit' : 'animate-super-entrance'}`} onClick={(e) => e.stopPropagation()}>
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-2xl rounded-[2rem] border border-[var(--theme-primary)]/20 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),0_0_15px_-5px_rgba(var(--theme-glow),0.3)] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--theme-primary)]/10 via-transparent to-transparent opacity-50" />
                    {!isThemeClosing && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--theme-primary)]/10 to-transparent skew-x-12 animate-[shimmer-sweep_1s_ease-out_forwards]" />}
                  </div>
                  <div className="relative z-10 p-3 flex flex-col gap-2">
                    <div className="px-3 py-2 flex items-center justify-between border-b border-white/5 mb-1"><span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Select Theme</span><div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] animate-pulse shadow-[0_0_5px_var(--theme-primary)]" /></div>
                    {Object.keys(themes).map((t, index) => {
                      const isActive = activeTheme === t;
                      const themeData = themes[t];
                      return (
                        <button key={t} onClick={(e) => handleThemeChange(t, e)} className={`relative group/item w-full flex items-center justify-between px-4 py-3 rounded-xl border border-transparent transition-all duration-300 hover:bg-white/5 hover:border-white/10 hover:scale-[1.05] hover:translate-x-1 hover:shadow-lg ${!isThemeClosing ? 'animate-cascade-in opacity-0' : 'opacity-100'}`} style={{ animationDelay: `${index * 0.1}s` }}>
                          {isActive && <div className="absolute inset-0 rounded-xl border opacity-20" style={{ backgroundColor: themeData.primary, borderColor: themeData.primary }} />}
                          <div className="flex items-center gap-3 relative z-10">
                            <div className="relative">
                              <div className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] transition-all duration-500 group-hover/item:scale-125" style={{ backgroundColor: themeData.primary, opacity: isActive ? 1 : 0.8 }} />
                              {isActive && <div className="absolute inset-0 rounded-full border animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" style={{ borderColor: themeData.primary }} />}
                            </div>
                            <span className={`text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover/item:text-white'}`}>{themeData.label || t}</span>
                          </div>
                          {isActive && <Check size={14} style={{ color: themeData.primary }} className="animate-[zoom-in_0.3s_cubic-bezier(0.175,0.885,0.32,1.275)]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* --- SECTIONS --- */}
      <HeroSection tagline={tagline} loaded={loaded} socialLinks={socialLinks} />

      {/* Deferred Content */}
      {renderBelowFold && (
        <>
          <ExperienceSection />
          <ProjectsSection />
          <LeadershipSection />
          <EducationSection />
          <SkillsSection />
          <Footer />
        </>
      )}

      <style>{`
        html { scroll-behavior: smooth; }
        .reveal { opacity: 0; transform: translateY(40px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-visible { opacity: 1; transform: translateY(0); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }
        .perspective-1000 { perspective: 1000px; }
        @keyframes ripple { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(400); opacity: 1; } }
        .animate-ripple { animation: ripple 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        @keyframes spring-up { 0% { transform: scale(0.95); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .animate-spring-up { animation: spring-up 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes spring-out { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(0.5) translateY(100px); opacity: 0; } }
        .animate-spring-out { animation: spring-out 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
        @keyframes slide-up { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes wave { 0%, 100% { height: 10px; } 50% { height: 24px; } }
        @keyframes gradient-x { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 3s ease infinite; }
        @keyframes super-entrance { 0% { opacity: 0; transform: scale(0.5) translateY(-20px) rotateX(-20deg) rotateY(10deg); filter: blur(10px); } 50% { opacity: 1; transform: scale(1.05) translateY(5px) rotateX(0deg) rotateY(0deg); filter: blur(0px); } 70% { transform: scale(0.95); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
        .animate-super-entrance { animation: super-entrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; transform-origin: top right; }
        @keyframes super-exit { 0% { opacity: 1; transform: scale(1); } 40% { transform: scale(1.02); } 100% { opacity: 0; transform: scale(0) translateY(-20px) rotate(5deg); filter: blur(10px); } }
        .animate-super-exit { animation: super-exit 0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6) forwards; transform-origin: top right; }
        @keyframes cascade-in { 0% { opacity: 0; transform: translateX(50px); filter: blur(5px); } 100% { opacity: 1; transform: translateX(0); filter: blur(0); } }
        .animate-cascade-in { animation: cascade-in 0.5s ease-out forwards; }
        @keyframes shimmer-sweep { 0% { transform: translateX(-150%) skewX(-15deg); } 100% { transform: translateX(150%) skewX(-15deg); } }
        @keyframes zoom-in { 0% { transform: scale(0); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default App;