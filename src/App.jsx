import React, { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from 'react';
import { 
  Github, Linkedin, Mail, Terminal as TerminalIcon, Cloud, Zap, Database, Monitor,
  Briefcase, Globe, Eye, Scan, Award, Heart, Home, Code, Cpu,
  Sparkles, Send, X, ArrowUpRight, Check, Users, GraduationCap, FileText, ExternalLink,
  Palette, Sun, Moon, Star
} from 'lucide-react';

// --- CONFIGURATION & DATA ---
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ""; 

const PORTFOLIO_CONTEXT = `
You are an AI representation of Gaurav Pandey. Speak in the first person ("I", "my") but remain professional, enthusiastic, and accurate. Answer questions based on the following comprehensive information:

**PERSONAL PROFILE:**
- Name: Gaurav Pandey
- Current Status: Master's student at Carnegie Mellon University (CMU), pursuing Master in Information Systems Management
- Program Duration: August 2025 - December 2026
- Current Goal: Targeting Software/AI Engineer Summer Internship for Summer 2026
- Email: gauravpandey@cmu.edu
- Phone: +1 (412) 482-2656
- LinkedIn: https://www.linkedin.com/in/gauravcmu
- GitHub: https://github.com/gauravpandeycmu

**WORK EXPERIENCE (Total: ~3.5 years full-time + internships):**

1. **Software Engineer at Epsilon, Datahub Product** (Aug 2022 - Jul 2025) - 3 years full-time
   - Slashed multi-data object feed load times by 83% (30s to 5s) through async refactoring
   - Architectured an AWS Bedrock prototype to enhance search capabilities on complex feed payloads
   - On-call primary support for Kubernetes microservice architecture, resolving 80+ production issues
   - Streamlined AWS resource utilization by 60% by conducting architectural review of SnapLogic pipelines and deploying 5+ checkpoints
   - Delivered 120+ Jira user stories and managed NodeJS upgrades across 10+ AWS Lambda functions
   - Developed a TestNG automation suite for critical data feeds, increasing testing frequency from weekly to hourly

2. **Software Engineering Intern at Epsilon** (Jan 2022 - July 2022) - 6 months
   - Reduced infrastructure costs by 10% by developing a hard-delete backend API
   - Upgraded 70+ vulnerable libraries and remediated 500+ code quality issues

3. **Research Intern - NLP at Centre for Cloud Computing** (May 2020 - Jun 2020) - 2 months
   - Improved translation accuracy by 20% for Telugu ASR system using ESPnet models
   - Implemented data balancing strategy derived from phoneme frequency analysis
   - GitHub: https://github.com/gauravpandeycmu/CCBD-espnet

4. **Research Intern - Computer Vision at ISRO** (July 2019 - Oct 2019) - 4 months
   - Developed satellite image segmentation using U-Net model for water body identification
   - Achieved 18% boost in model performance via advanced data augmentation

**EDUCATION:**

1. **Carnegie Mellon University** (Aug 2025 - Dec 2026)
   - Degree: Master in Information Systems Management
   - GPA: 3.85 / 4.0
   - Fall 2025 Courses: NoSQL Database Management, Object Oriented Programming in Java, Decision Making Under Uncertainty, Organisation Design and Implementation, Accounting and Finance, Professional Speaking
   - Spring 2026 Courses: Cloud Computing (15-619), Agentic Technologies, AI Model Development, Distributed Systems, Measuring Social, Digital Transformation
   - Teaching Assistant: NoSQL Database Management (Spring 2026)

2. **PES University** (2018 - 2022)
   - Degree: Bachelor of Technology - Computer Science
   - GPA: 3.94 / 4.0
   - Specialization: Machine Intelligence and Data Science

**TECHNICAL SKILLS:**

Languages: Java, Python, JavaScript, C++, SQL
Infrastructure & Cloud: AWS, Kubernetes (K8s), Docker, GCP, Azure
Backend Frameworks: Spring Boot, Node.js
Data & Messaging: Kafka, Spark
DevOps & Tooling: Jenkins, Git, Kibana, SonarQube

**KEY PROJECTS:**

1. **Edge Surveillance Module**
   - Designed edge-based master/worker system handling 10+ video streams
   - Utilized YOLOv3 for social distancing violation detection
   - Leveraged AWS Rekognition to identify key frames, reducing local storage by 90%
   - Tech: Python, AWS, YOLOv3

2. **Image Classification**
   - Annotated 14k+ images into 8 classes using VGG Annotator
   - Used ResNet50 weights for transfer learning
   - Applied Grad-CAM for class activation maps and feature visualization
   - Tech: ResNet50, Machine Learning, Python
   - GitHub: https://github.com/gauravpandeycmu/EIP/tree/master/Phase%201/Session%205

3. **PoseNet Recognition**
   - Leveraged PoseNet to track hand gestures during lectures
   - Identified blackboard text even with blurry inputs
   - Tech: PoseNet, JavaScript, Transfer Learning

**LEADERSHIP & ACTIVITIES:**

1. **Google Cloud Sprint** (Feb 2021 - Apr 2021)
   - Selected among 30 from 10,000+ applicants across India
   - Worked on open-ended problem statements weekly related to GCP
   - Designed system architecture of Twitter with ~300M users
   - Awarded runner-up by senior leadership for final presentation
   - Recommended location-based sharding using Snowflake & memory caching on Amazon Redis for managing latency within 1 second

2. **Core Technical Team at PES Open Source (PESOS)** (Sep 2019 - Jan 2022)
   - Organized meetups for 200+ students about git & contributing to open source
   - Scheduled & organized HacktoberFest-19 at PES
   - Inducted cross-domain members and created pathways for collaboration on 4+ university level hardware & software projects
   - Selected junior core team members and facilitated onboarding
   - Mentored team members to continue driving club initiatives independently

**KEY ACHIEVEMENTS & METRICS:**
- Reduced data pipeline load times by 83% (30s → 5s)
- Saved 60% AWS costs through architectural optimization
- Resolved 80+ production issues as on-call primary support
- Delivered 120+ Jira user stories
- Runner-up at Google Cloud Sprint (selected from 10,000+ applicants)
- Improved ML model performance by 18-20% in research projects
- Upgraded 70+ vulnerable libraries and remediated 500+ code quality issues

**CURRENT FOCUS:**
Actively seeking Software/AI Engineer Summer Internship opportunities for Summer 2026. Strong background in distributed systems, cloud architecture, machine learning, and production support. Experience with full-stack development, microservices, and AI/ML applications.

When answering questions:
- Keep responses CONCISE and natural-sounding:
  - For simple questions like "tell me about yourself" or "who are you": 3-4 sentences max, focusing on current status, key experience, and goals
  - For specific questions: 2-4 sentences for simple, max 2-3 short paragraphs for complex
  - Write in a flowing, conversational style - avoid bullet points and lists unless specifically asked
  - Use natural transitions between ideas instead of direct, choppy sentences
- Be specific about years of experience (3 years full-time at Epsilon as Software Engineer, plus internships)
- Mention concrete metrics and achievements when relevant, but weave them naturally into sentences
- Highlight both technical depth and leadership experience naturally
- Reference specific technologies, projects, and courses when appropriate
- Be enthusiastic but professional, with a warm and approachable tone
- ALWAYS format your responses using markdown:
  - Use **bold** for emphasis on key numbers, years, technologies, or important points
  - Use \`code\` for technical terms, programming languages, tools, and frameworks
  - Use line breaks (\n) to separate paragraphs for better readability
  - Avoid bullet points unless the question specifically asks for a list
- Examples of good responses:
  - "I'm a Master's student at CMU with **3 years** of experience as a Software Engineer at Epsilon, where I worked extensively with \`Kubernetes\` and \`AWS\` to build scalable microservices."
  - "I'm currently pursuing my Master's in Information Systems Management at Carnegie Mellon University, with a strong background in distributed systems and cloud architecture. I spent **3 years** as a Software Engineer at Epsilon, where I reduced data pipeline load times by **83%** and streamlined AWS costs by **60%**."
- For "tell me about yourself" or similar introduction questions: Give a brief, engaging overview (3-4 sentences) covering: current status (CMU student), key experience (3 years at Epsilon), main skills/interests (distributed systems, cloud, AI/ML), and current goal (Summer 2026 internship). Keep it warm and personable.
- If asked about something not in this context, politely say you don't have that information but can discuss related topics
`;

// Theme definitions with dark and light variants
const themes = {
  vulcan: { 
    id: 'vulcan', label: 'Vulcan', 
    primary: '#f43f5e', // rose-500
    accent: '#f97316',  // orange-500
    bg: { dark: '#0c0a09', light: '#fce7f0' }, // Stronger rose tint with more color
    particle: '#fb7185', 
    glow: '251, 113, 133' // rose-400 rgb
  },
  emerald: { 
    id: 'emerald', label: 'Emerald', 
    primary: '#10b981', // emerald-500
    accent: '#14b8a6',  // teal-500
    bg: { dark: '#0a0c0a', light: '#d1fae5' }, // Stronger emerald tint with more color
    particle: '#34d399', 
    glow: '52, 211, 153' // emerald-400 rgb
  },
  nebula: { 
    id: 'nebula', label: 'Nebula', 
    primary: '#6366f1', // indigo-500
    accent: '#a855f7',  // purple-500
    bg: { dark: '#0f172a', light: '#e0e7ff' }, // Stronger indigo tint with more color
    particle: '#818cf8', 
    glow: '129, 140, 248' // indigo-400 rgb
  },
  midnight: { 
    id: 'midnight', label: 'Midnight', 
    primary: '#3b82f6', // blue-500
    accent: '#06b6d4',  // cyan-500
    bg: { dark: '#020617', light: '#dbeafe' }, // Stronger blue tint with more color
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
  { id: 'skills', label: 'Skills', icon: <Cpu size={18} /> },
  { id: 'recommendations', label: 'Recs', icon: <Star size={18} /> }
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
      { term: "Fall 2025", courses: ["NoSQL Database Management", "Object Oriented Programming in Java", "Decision Making Under Uncertainty", "Organisation Design and Implementation", "Accounting and Finance", "Professional Speaking"] },
      { term: "Spring 2026", courses: ["Cloud Computing (15-619)", "Agentic Technologies", "AI Model Development", "Distributed Systems", "Measuring Social", "Digital Transformation"], taRole: "NoSQL Database Management" }
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

const recommendationsData = [
  {
    name: "Pradeep Kamath",
    title: "Staff Software Engineer at Epsilon",
    date: "August 16, 2025",
    text: [
      "I had the pleasure of working with Gaurav, and I can confidently say he is a highly skilled and dedicated professional. With strong expertise in Java 17, Spring Framework, and Spring Boot, he has successfully contributed to building and enhancing complex web applications.",
      "His experience with AWS cloud services and proficiency in SnapLogic SaaS platform integration make him a valuable asset for any team that deals with cloud-based solutions and enterprise integrations.",
      "What truly stands out about Gaurav is his passion for learning new technologies, adaptability, and ability to quickly understand requirements and translate them into effective solutions. He is extremely committed to delivering quality work within timelines and can be relied upon to take ownership of tasks end-to-end.",
      "I strongly recommend Gaurav for any team looking for a skilled, motivated, and dependable engineer who can drive technology initiatives forward."
    ],
    linkedin: "https://www.linkedin.com/in/pradeep-kamath-b0bb1166",
    image: "/pradeep.jpeg"
  },
  {
    name: "Nitish Pai",
    title: "Lead Data Engineer | Ex - Infosys | Java | AWS Cloud Engineer | Ecommerce",
    date: "September 8, 2025",
    text: "Gaurav is undoubtedly one of the best engineers I have ever worked with. He is capable of completing any task's assigned to him with high quality. He has excellent grasping power and excellent observation skills helps him to learn a new technology in lightning speed. He is a great team player and is always willing to help other members in the team. He is a great asset to any organization.",
    linkedin: "https://www.linkedin.com/in/nitish-pai-27861626",
    image: "/nitish.jpeg"
  }
];

// --- UTILITY COMPONENTS ---

const TintedLogo = React.memo(({ src, alt }) => (
  <div className="relative w-full h-full" style={{ aspectRatio: '1/1' }}>
    {/* Base image - fills container */}
    <img 
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      loading="lazy"
      decoding="async"
      style={{
        filter: 'grayscale(100%) brightness(0.5)',
        aspectRatio: '1/1',
        objectFit: 'cover'
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

const CMUHighlight = React.memo(({ isDarkMode }) => (
  <span className="relative inline-block group cursor-default">
    <span className={`bg-gradient-to-r bg-[length:100%_auto] bg-clip-text text-transparent font-black tracking-tight transition-all duration-700 ${
      isDarkMode
        ? 'from-slate-200 via-slate-200 to-[#C41230] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]'
        : 'from-slate-700 via-slate-700 to-[#C41230] drop-shadow-[0_0_8px_rgba(196,18,48,0.15)]'
    }`}>
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
    
    // Split text into tokens (markdown patterns + regular text)
    const tokenize = (str) => {
      const tokens = [];
    let i = 0;
      while (i < str.length) {
        // Check for code blocks (backticks) - highest priority
        if (str[i] === '`') {
          const end = str.indexOf('`', i + 1);
          if (end !== -1) {
            tokens.push({ type: 'token', text: str.substring(i, end + 1) });
            i = end + 1;
            continue;
          }
        }
        // Check for bold (**text**)
        if (str[i] === '*' && str[i + 1] === '*') {
          const end = str.indexOf('**', i + 2);
          if (end !== -1) {
            tokens.push({ type: 'token', text: str.substring(i, end + 2) });
            i = end + 2;
            continue;
          }
        }
        // Regular character
        tokens.push({ type: 'char', text: str[i] });
        i++;
      }
      return tokens;
    };
    
    const tokens = tokenize(text);
    let tokenIndex = 0;
    let currentText = "";
    
    const interval = setInterval(() => {
      if (tokenIndex >= tokens.length) {
        clearInterval(interval);
        return;
      }
      
      const token = tokens[tokenIndex];
      if (token.type === 'token') {
        // Output entire markdown token at once
        currentText += token.text;
        setDisplayedText(currentText);
        tokenIndex++;
      } else {
        // Output character by character for regular text
        currentText += token.text;
        setDisplayedText(currentText);
        tokenIndex++;
      }
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, speed, shouldAnimate]);
  return displayedText;
};


// Simple markdown renderer for AI messages (lazy loaded - only used when chat opens)
const renderMarkdown = (text, isDarkMode = true) => {
  if (!text) return null;
  
  // Split by line breaks
  const lines = text.split('\n');
  
  return lines.map((line, lineIndex) => {
    if (!line.trim()) {
      return <br key={lineIndex} />;
    }
    
    // Process line for markdown - find all markdown patterns
    const parts = [];
    let lastIndex = 0;
    let key = 0;
    
    // Find all markdown patterns with their positions
    const patterns = [];
    
    // Code blocks (backticks) - highest priority, non-greedy
    const codePattern = /`([^`]+)`/g;
    let match;
    while ((match = codePattern.exec(line)) !== null) {
      patterns.push({
        start: match.index,
        end: match.index + match[0].length,
        type: 'code',
        content: match[1],
        fullMatch: match[0]
      });
    }
    
    // Reset regex
    codePattern.lastIndex = 0;
    
    // Bold (**text**) - check it's not inside a code block
    const boldPattern = /\*\*([^*]+?)\*\*/g;
    while ((match = boldPattern.exec(line)) !== null) {
      const isInsideCode = patterns.some(p => 
        p.type === 'code' && match.index >= p.start && match.index < p.end
      );
      if (!isInsideCode) {
        patterns.push({
          start: match.index,
          end: match.index + match[0].length,
          type: 'bold',
          content: match[1],
          fullMatch: match[0]
        });
      }
    }
    
    // Sort patterns by start position
    patterns.sort((a, b) => a.start - b.start);
    
    // Remove overlapping patterns (keep code over bold)
    const filteredPatterns = [];
    for (let i = 0; i < patterns.length; i++) {
      const current = patterns[i];
      const overlaps = filteredPatterns.some(existing => 
        (current.start < existing.end && current.end > existing.start)
      );
      if (!overlaps) {
        filteredPatterns.push(current);
      }
    }
    
    // Build parts array from filtered patterns
    filteredPatterns.forEach((pattern) => {
      // Add text before pattern
      if (pattern.start > lastIndex) {
        parts.push({ type: 'text', content: line.substring(lastIndex, pattern.start), key: key++ });
      }
      // Add formatted pattern
      parts.push({ type: pattern.type, content: pattern.content, key: key++ });
      lastIndex = pattern.end;
    });
    
    // Add remaining text after last pattern
    if (lastIndex < line.length) {
      parts.push({ type: 'text', content: line.substring(lastIndex), key: key++ });
    }
    
    // If no patterns found, return whole line as text
    if (parts.length === 0) {
      parts.push({ type: 'text', content: line, key: key++ });
    }
    
    return (
      <span key={lineIndex}>
        {parts.map((part) => {
          if (part.type === 'bold') {
            return <strong key={part.key} className="font-bold">{part.content}</strong>;
          } else if (part.type === 'code') {
            return (
              <code 
                key={part.key} 
                className={`${isDarkMode ? 'bg-white/10 text-rose-300' : 'bg-black/10 text-rose-600'} px-1.5 py-0.5 rounded text-xs font-mono border ${isDarkMode ? 'border-white/20' : 'border-black/20'}`}
              >
                {part.content}
              </code>
            );
          } else {
            return <span key={part.key}>{part.content}</span>;
          }
        })}
        {lineIndex < lines.length - 1 && <br />}
      </span>
    );
  });
};

const AIMessage = React.memo(({ text, animate, isDarkMode }) => {
  const typedText = useTypewriter(text, 3.5, animate); // 70% of 5ms = 3.5ms (faster typing)
  return <span className="whitespace-pre-wrap">{renderMarkdown(typedText, isDarkMode)}</span>;
});

const InteractiveBackground = React.memo(({ themeColor, isDarkMode }) => {
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
      
      // Adjust opacity based on dark/light mode - more visible in light mode while staying subtle
      const particleOpacity = isDarkMode ? 0.3 : 0.65; // More visible in light mode
      const connectionOpacity = isDarkMode ? 0.4 : 0.75; // More visible connections in light mode
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.globalAlpha = particleOpacity; 
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.globalAlpha = (1 - dist / 150) * connectionOpacity;
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
  }, [themeColor, isDarkMode]);

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
  <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0">
    <div className={`absolute w-3 h-3 rounded-full bg-[var(--theme-primary)] shadow-[0_0_15px_currentColor] z-10 ${active ? 'animate-pulse' : ''}`} />
    <div className={`absolute inset-0 border-2 border-[var(--theme-primary)]/30 rounded-full border-t-transparent animate-[spin_3s_linear_infinite] ${active ? 'duration-[1s]' : ''}`} />
    <div className={`absolute inset-2 border-2 border-[var(--theme-accent)]/30 rounded-full border-b-transparent animate-[spin_5s_linear_infinite_reverse] ${active ? 'duration-[2s]' : ''}`} />
    <div className={`absolute inset-0 bg-[var(--theme-primary)]/10 rounded-full blur-xl ${active ? 'scale-150 opacity-100' : 'scale-100 opacity-50'} transition-all duration-500`} />
  </div>
));

// --- RESUME DOWNLOAD COMPONENT ---
const ResumeDownloadButton = React.memo(({ isDarkMode }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);
  const previewTimeoutRef = useRef(null);

  const resumeLinks = {
    view: "https://drive.google.com/file/d/1lBFFDaMsckyL3M77AIsW0sZDdnfGB5eW/view?usp=sharing",
    preview: "https://drive.google.com/file/d/1lBFFDaMsckyL3M77AIsW0sZDdnfGB5eW/preview"
  };

  const handleMouseEnter = () => {
    previewTimeoutRef.current = setTimeout(() => {
      setShowPreview(true);
      setIsPreviewLoading(true); // Reset loading state when showing preview
    }, 500); // Show preview after 500ms hover
  };

  const handleMouseLeave = () => {
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current);
    }
    setShowPreview(false);
    setIsPreviewLoading(true); // Reset loading state when hiding
  };

  const handleIframeLoad = () => {
    setIsPreviewLoading(false);
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Main Resume Button */}
      <a
        href={resumeLinks.view}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[var(--theme-primary)] text-white px-8 md:px-10 py-4 md:py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:translate-y-[-4px] transition-all shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-3 active:scale-95 group border-t border-white/20 touch-manipulation min-h-[44px]"
      >
        <FileText size={18} className="group-hover:animate-bounce" />
        <span>View Resume</span>
      </a>

      {/* Resume Preview Tooltip */}
      {showPreview && (
        <div 
          className={`absolute bottom-full left-0 mb-4 w-[90vw] max-w-[400px] h-[520px] max-h-[60vh] rounded-2xl overflow-hidden shadow-2xl border z-50 ${
            isDarkMode 
              ? 'bg-black/95 border-white/20' 
              : 'bg-white/95 border-slate-200/50'
          }`}
          style={{ 
            transform: 'translateY(0)',
            animation: 'slideDown 0.3s ease-out'
          }}
        >
          <div className={`p-3 border-b flex items-center justify-between ${
            isDarkMode ? 'border-white/10' : 'border-slate-200/50'
          }`}>
            <span className={`text-xs font-bold uppercase tracking-wider ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>Resume Preview</span>
            <button
              onClick={() => setShowPreview(false)}
              className={`p-1 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-white/10 text-white' 
                  : 'hover:bg-slate-100 text-slate-900'
              }`}
            >
              <X size={14} />
            </button>
          </div>
          
          {/* Iframe Container with Loading Overlay */}
          <div className="relative w-full h-[calc(100%-48px)]">
            {/* Loading State */}
            {isPreviewLoading && (
              <div className={`absolute inset-0 flex flex-col items-center justify-center z-10 ${
                isDarkMode ? 'bg-black/95' : 'bg-white/95'
              }`}>
                <div className="relative">
                  {/* Spinning Circle */}
                  <div className={`w-12 h-12 border-4 rounded-full ${
                    isDarkMode 
                      ? 'border-white/20 border-t-[var(--theme-primary)]' 
                      : 'border-slate-200 border-t-[var(--theme-primary)]'
                  } animate-spin`} />
                  {/* Pulsing Dot */}
                  <div className={`absolute inset-0 flex items-center justify-center`}>
                    <div className={`w-3 h-3 rounded-full bg-[var(--theme-primary)] animate-pulse`} />
                  </div>
                </div>
                <p className={`mt-4 text-sm font-medium ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>Loading resume...</p>
              </div>
            )}
            
            {/* Iframe */}
            <iframe
              src={resumeLinks.preview}
              className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-300 ${
                isPreviewLoading ? 'opacity-0' : 'opacity-100'
              }`}
              title="Resume Preview"
              loading="lazy"
              onLoad={handleIframeLoad}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
});

// --- MEMOIZED SECTIONS ---

const HeroSection = React.memo(({ tagline, loaded, onDownload, socialLinks, isDarkMode }) => (
  <section id="home" className="relative pt-20 md:pt-48 pb-16 md:pb-32 px-6 overflow-hidden min-h-[100dvh] flex flex-col justify-center">
    <div className="max-w-7xl mx-auto w-full relative z-10">
      <div className="reveal space-y-5 md:space-y-12">
        <div className={`inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2.5 md:py-2.5 rounded-full border text-[var(--theme-primary)] text-[10px] md:text-[10px] font-black font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] shadow-xl backdrop-blur-md transition-transform hover:scale-105 ${
          isDarkMode 
            ? 'bg-white/5 border-white/10' 
            : 'bg-white/80 border-slate-200/50'
        }`}>
          <Zap size={12} className="fill-current animate-pulse" /> 
          <span className="min-w-0 md:min-w-[200px] flex items-center gap-1">
            {tagline}
            <span className="w-0.5 h-3 bg-[var(--theme-primary)] animate-pulse inline-block" />
          </span>
        </div>
        
        <h1 className={`text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] uppercase select-none drop-shadow-2xl transition-all duration-1000 delay-100 text-left ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Gaurav <br />
          <span className={`transition-colors duration-1000 ${
            isDarkMode 
              ? 'text-white/10 hover:text-white/20' 
              : 'text-slate-900/15 hover:text-slate-900/25'
          }`}>Pandey.</span>
        </h1>

        <div className={`w-full transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className={`text-lg md:text-3xl font-medium leading-relaxed max-w-5xl ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Graduate student at <CMUHighlight isDarkMode={isDarkMode} /> with 3+ years of full time experience in developing distributed systems and leading production support for Datahub Product at Epsilon.
          </p>
        </div>

        <div className={`flex flex-wrap justify-start gap-4 md:gap-6 pt-4 md:pt-6 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <ResumeDownloadButton isDarkMode={isDarkMode} />
          <div className="flex gap-4">
            {socialLinks.map((social, i) => (
              <a 
                key={i} 
                href={social.url} 
                target={social.url.startsWith('http') ? "_blank" : "_self"}
                rel={social.url.startsWith('http') ? "noopener noreferrer" : undefined}
                className={`p-4 md:p-5 rounded-full border hover:scale-110 active:scale-95 transition-all group shadow-lg touch-manipulation ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10 hover:border-white/30 text-slate-400 hover:text-white' 
                    : 'bg-white/60 border-slate-300/50 hover:border-slate-400/70 text-slate-600 hover:text-slate-900'
                }`}
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

const ExperienceSection = React.memo(({ isDarkMode }) => {
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
            <p className={`font-black tracking-[0.6em] text-[10px] uppercase ${
              isDarkMode ? 'text-slate-500' : 'text-slate-600'
            }`}>Professional Evolution</p>
          </div>
          <div className={`hidden md:block h-[1px] flex-1 mx-20 mb-4 ${
            isDarkMode ? 'bg-white/10' : 'bg-slate-300/30'
          }`} />
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
                <h3 className={`text-4xl font-black transition-all group-hover:translate-x-2 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>{job.company}</h3>
              </div>
              <CardTag 
                {...cardProps}
                onMouseMove={handleMouseMove} 
                className={`spotlight-card relative backdrop-blur-3xl p-10 rounded-[2.5rem] border transition-all shadow-xl overflow-hidden group/card flex flex-col ${
                isDarkMode 
                  ? 'bg-white/[0.02] border-white/5 hover:border-white/20' 
                  : 'bg-white/60 border-slate-200/50 hover:border-slate-300/70'
              } ${job.link ? 'cursor-pointer hover:translate-y-[-4px]' : ''}`}
              >
                 <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(800px circle at var(--x) var(--y), rgba(var(--theme-glow), 0.4), transparent 40%)` }} />
                 <div className="md:hidden absolute inset-0 opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(800px circle at var(--x) var(--y), rgba(var(--theme-glow), 0.4), transparent 40%)` }} />
                <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-6 mb-8">
                    {/* Replaced standard Icon with Tinted Logo for iOS-like theming */}
                    <div className="w-16 h-16 rounded-2xl bg-[var(--theme-primary)] bg-opacity-10 overflow-hidden flex-shrink-0" style={{ aspectRatio: '1/1' }}>
                      <TintedLogo src={job.logo} alt={job.company} />
                    </div>
                    <h4 className={`text-2xl font-black tracking-tight uppercase ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>{job.role}</h4>
                  </div>
                  <ul className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                    {job.points.map((p, pi) => (
                      <li key={pi} className={`flex gap-4 text-sm leading-relaxed font-medium group/li ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}>
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

const ProjectsSection = React.memo(({ isDarkMode }) => {
  const handleMouseMove = (e) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="projects" className={`py-32 px-6 ${
      isDarkMode ? 'bg-white/[0.01]' : 'bg-white/30'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 reveal">
          <h2 className={`text-7xl font-black tracking-tighter uppercase mb-6 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>Projects<span className="text-[var(--theme-primary)]">.</span></h2>
          <p className={`font-black tracking-[0.6em] text-[11px] uppercase ${
            isDarkMode ? 'text-slate-500' : 'text-slate-600'
          }`}>Engineered Solutions</p>
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
              className={`spotlight-card reveal group relative p-10 backdrop-blur-3xl rounded-[2.5rem] border transition-all duration-700 overflow-hidden flex flex-col group/card ${
                isDarkMode 
                  ? 'bg-white/[0.02] border-white/5 hover:border-white/20' 
                  : 'bg-white/70 border-slate-200/50 hover:border-slate-300/70'
              } ${p.link ? 'cursor-pointer hover:translate-y-[-10px]' : ''}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(600px circle at var(--x) var(--y), rgba(var(--theme-glow), 0.4), transparent 40%)` }} />
              <div className="md:hidden absolute inset-0 opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(600px circle at var(--x) var(--y), rgba(var(--theme-glow), 0.4), transparent 40%)` }} />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-4 rounded-2xl text-[var(--theme-primary)] border group-hover:scale-110 transition-transform ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/5' 
                      : 'bg-white/80 border-slate-200/50'
                  }`}>{React.cloneElement(p.icon, { size: 28 })}</div>
                  <div className="flex gap-2">
                    {p.tags.map(tag => <span key={tag} className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase border tracking-wider ${
                      isDarkMode 
                        ? 'bg-black/40 text-slate-400 border-white/5' 
                        : 'bg-slate-100 text-slate-700 border-slate-200/50'
                    }`}>{tag}</span>)}
                  </div>
                </div>
                <h3 className={`text-2xl font-black mb-4 uppercase tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>{p.title}</h3>
                <p className={`text-base leading-relaxed mb-8 font-medium ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>{p.desc}</p>
                
                {/* Dynamic Footer: Tech Brief or Explicit Link */}
                <div className={`mt-auto pt-6 border-t flex items-center justify-between ${
                  isDarkMode ? 'border-white/5' : 'border-slate-200/50'
                }`}>
                  {p.link ? (
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[var(--theme-primary)] group-hover/card:underline">
                      View Project <ExternalLink size={14} />
                    </div>
                  ) : (
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--theme-primary)]">View Details</span>
                  )}
                  <ArrowUpRight className={`transition-all ${p.link ? 'group-hover/card:translate-x-1 group-hover/card:-translate-y-1' : ''} ${
                    isDarkMode 
                      ? 'text-slate-600 group-hover:text-white' 
                      : 'text-slate-500 group-hover:text-slate-900'
                  }`} size={18} />
                </div>
              </div>
            </CardTag>
          )})}
        </div>
      </div>
    </section>
  );
});

const LeadershipSection = React.memo(({ isDarkMode }) => {
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
            <h2 className={`text-6xl font-black tracking-tighter uppercase italic ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>Leadership <span className="text-[var(--theme-primary)]">&</span> Activities</h2>
            <p className={`font-black tracking-[0.6em] text-[10px] uppercase ${
              isDarkMode ? 'text-slate-500' : 'text-slate-600'
            }`}>Community & Impact</p>
          </div>
          <div className={`hidden md:block h-[1px] flex-1 mx-20 mb-4 ${
            isDarkMode ? 'bg-white/10' : 'bg-slate-300/30'
          }`} />
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
                  <h3 className={`text-4xl font-black transition-all group-hover:translate-x-2 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>{role.org}</h3>
                </div>
                <CardTag 
                  {...cardProps}
                  onMouseMove={handleMouseMove} 
                  className={`spotlight-card relative backdrop-blur-3xl p-10 rounded-[2.5rem] border transition-all shadow-xl overflow-hidden group/card flex flex-col ${
                    isDarkMode 
                      ? 'bg-white/[0.02] border-white/5 hover:border-white/20' 
                      : 'bg-white/60 border-slate-200/50 hover:border-slate-300/70'
                  } ${role.link ? 'cursor-pointer hover:translate-y-[-4px]' : ''}`}
                >
                   <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(800px circle at var(--x) var(--y), rgba(var(--theme-glow), 0.4), transparent 40%)` }} />
                   <div className="md:hidden absolute inset-0 opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(800px circle at var(--x) var(--y), rgba(var(--theme-glow), 0.4), transparent 40%)` }} />
                  <div className="relative z-10 flex-1">
                    <div className="flex items-center gap-6 mb-8">
                      {/* Replaced standard Icon with Tinted Logo for iOS-like theming */}
                      <div className="w-16 h-16 rounded-2xl bg-[var(--theme-primary)] bg-opacity-10 overflow-hidden flex-shrink-0" style={{ aspectRatio: '1/1' }}>
                        <TintedLogo src={role.logo} alt={role.org} />
                      </div>
                      <h4 className={`text-2xl font-black tracking-tight uppercase flex items-center gap-3 ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        {role.role}
                      </h4>
                    </div>
                    <ul className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                      {role.points.map((p, pi) => (
                        <li key={pi} className={`flex gap-4 text-sm leading-relaxed font-medium group/li ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] mt-2 shrink-0 group-hover/li:scale-150 transition-transform" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Explicit Link CTA at the bottom */}
                  {role.link && (
                    <div className={`relative z-10 mt-8 pt-6 border-t flex items-center justify-between group/link ${
                      isDarkMode ? 'border-white/5' : 'border-slate-200/50'
                    }`}>
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--theme-primary)] group-hover/link:underline flex items-center gap-2">
                        View Details <ExternalLink size={14} />
                      </span>
                      <ArrowUpRight size={20} className={`group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-all ${
                        isDarkMode 
                          ? 'text-slate-600 group-hover/link:text-white' 
                          : 'text-slate-500 group-hover/link:text-slate-900'
                      }`} />
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

const EducationSection = React.memo(({ isDarkMode }) => {
  const handleMouseMove = (e) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="education" className={`py-32 px-6 ${
      isDarkMode ? 'bg-white/[0.01]' : 'bg-white/30'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 reveal">
          <div className="space-y-4">
            <h2 className={`text-6xl font-black tracking-tighter uppercase italic ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>Education<span className="text-[var(--theme-primary)]">.</span></h2>
            <p className={`font-black tracking-[0.6em] text-[10px] uppercase ${
              isDarkMode ? 'text-slate-500' : 'text-slate-600'
            }`}>Academic Background</p>
          </div>
          <div className={`hidden md:block h-[1px] flex-1 mx-20 mb-4 ${
            isDarkMode ? 'bg-white/10' : 'bg-slate-300/30'
          }`} />
        </div>

        <div className="space-y-16">
          {educationData.map((edu, i) => (
            <div key={i} className="reveal grid lg:grid-cols-[1fr_2.5fr] gap-12 group" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="space-y-4">
                <div className="text-xs font-black uppercase tracking-[0.4em] text-[var(--theme-primary)]">{edu.period}</div>
                <h3 className={`text-3xl font-black transition-all group-hover:translate-x-2 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>{edu.school}</h3>
                <div className={`text-sm font-bold uppercase tracking-widest ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>GPA: {edu.grade}</div>
              </div>
              <div onMouseMove={handleMouseMove} className={`spotlight-card relative backdrop-blur-3xl p-10 rounded-[2.5rem] border transition-all shadow-xl overflow-hidden group/card ${
                isDarkMode 
                  ? 'bg-white/[0.02] border-white/5 hover:border-white/20' 
                  : 'bg-white/60 border-slate-200/50 hover:border-slate-300/70'
              }`}>
                 <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(800px circle at var(--x) var(--y), rgba(var(--theme-glow), 0.4), transparent 40%)` }} />
                 <div className="md:hidden absolute inset-0 opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(800px circle at var(--x) var(--y), rgba(var(--theme-glow), 0.4), transparent 40%)` }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--theme-primary)] bg-opacity-10 overflow-hidden flex-shrink-0" style={{ aspectRatio: '1/1' }}>
                      <TintedLogo src={edu.logo} alt={edu.school} />
                    </div>
                    <h4 className={`text-xl font-black tracking-tight uppercase leading-snug ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>{edu.degree}</h4>
                  </div>
                  
                  {edu.details ? (
                    <div className="grid md:grid-cols-2 gap-8">
                      {edu.details.map((sem, j) => (
                        <div key={j} className="space-y-4">
                          <h5 className={`text-xs font-black uppercase tracking-[0.2em] text-[var(--theme-primary)] border-b pb-2 mb-3 ${
                            isDarkMode ? 'border-white/10' : 'border-slate-200/50'
                          }`}>{sem.term}</h5>
                          <ul className="space-y-2">
                            {sem.courses.map((course, k) => (
                              <li key={k} className={`text-xs font-medium flex items-start gap-2 ${
                                isDarkMode ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                <span className="w-1 h-1 rounded-full bg-[var(--theme-primary)] mt-1.5 shrink-0" />
                                {course}
                              </li>
                            ))}
                          </ul>
                          
                          {/* Teaching Assistant Section */}
                          {sem.taRole && (
                            <div className={`mt-4 p-4 rounded-xl border ${
                              isDarkMode 
                                ? 'bg-[var(--theme-primary)]/10 border-[var(--theme-primary)]/30' 
                                : 'bg-[var(--theme-primary)]/15 border-[var(--theme-primary)]/40'
                            }`}>
                                <div className="flex items-center gap-3 mb-2">
                                  <div className={`p-2 rounded-lg ${
                                    isDarkMode 
                                      ? 'bg-[var(--theme-primary)]/20' 
                                      : 'bg-[var(--theme-primary)]/25'
                                  }`}>
                                    <Users size={14} className="text-[var(--theme-primary)]" />
                                  </div>
                                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                                    isDarkMode ? 'text-[var(--theme-primary)]' : 'text-[var(--theme-primary)]'
                                  }`}>
                                    Teaching Assistant
                                  </span>
                                </div>
                                <p className={`text-sm font-bold ${
                                  isDarkMode ? 'text-white' : 'text-slate-900'
                                }`}>
                                  {sem.taRole}
                                </p>
                              </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={`text-sm font-medium border-l-2 border-[var(--theme-primary)] pl-4 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
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

const SkillsSection = React.memo(({ isDarkMode }) => (
  <section id="skills" className="py-32 px-6">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-20">
      <div className="reveal">
        <h2 className={`text-6xl font-black tracking-tighter uppercase leading-none mb-10 italic ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>Core <br />Stack<span className="text-[var(--theme-primary)]">.</span></h2>
        <div className="space-y-6">
           <p className={`text-lg font-medium leading-relaxed ${
             isDarkMode ? 'text-slate-400' : 'text-slate-600'
           }`}>A specialized toolkit for cloud architecture and high-load backend optimization.</p>
           <div className={`flex items-center gap-4 p-6 border rounded-[2rem] group transition-colors ${
             isDarkMode 
               ? 'bg-white/5 border-white/5 hover:bg-white/10' 
               : 'bg-white/60 border-slate-200/50 hover:bg-white/80'
           }`}>
             <Award className="text-[var(--theme-primary)]" size={32} />
             <div>
               <div className={`text-xs font-black uppercase tracking-widest mb-1 ${
                 isDarkMode ? 'text-slate-300' : 'text-slate-700'
               }`}>Top Honors</div>
               <div className={`text-sm font-bold ${
                 isDarkMode ? 'text-slate-500' : 'text-slate-600'
               }`}>Runner-up @ Google Cloud Sprint</div>
             </div>
           </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 reveal">
        {skillsData.map((s, i) => {
          const categoryName = s.cat || Object.keys(s)[0];
          const items = s.items || Object.values(s)[0];
          return (
          <div key={i} className={`p-8 border rounded-[2rem] group transition-all hover:translate-y-[-4px] ${
            isDarkMode 
              ? 'bg-white/[0.03] border-white/5 hover:border-white/20' 
              : 'bg-white/60 border-slate-200/50 hover:border-slate-300/70'
          }`}>
            <div className="flex items-center gap-3 md:gap-4 mb-6">
              <div className="text-[var(--theme-primary)] group-hover:scale-110 transition-transform flex-shrink-0">{React.cloneElement(s.icon, { size: 24 })}</div>
              <h4 className={`text-[10px] md:text-xs font-black uppercase tracking-[0.1em] md:tracking-[0.2em] break-words leading-tight ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>{categoryName}</h4>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {items.map(item => <span key={item} className={`text-xs font-bold transition-colors cursor-default ${
                isDarkMode 
                  ? 'text-slate-500 hover:text-white' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}>{item}</span>)}
            </div>
          </div>
        )})}
      </div>
    </div>
  </section>
));

const RecommendationsSection = React.memo(({ isDarkMode }) => {
  // Duplicate recommendations for seamless loop (only for desktop horizontal scroll)
  const duplicatedRecommendations = [...recommendationsData, ...recommendationsData];
  
  return (
    <section id="recommendations" className={`py-16 md:py-32 px-4 md:px-6 overflow-hidden ${
      isDarkMode ? 'bg-white/[0.01]' : 'bg-white/30'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 reveal">
          <h2 className={`text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4 md:mb-6 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>Recommendations<span className="text-[var(--theme-primary)]">.</span></h2>
          <p className={`font-black tracking-[0.6em] text-[10px] uppercase ${
            isDarkMode ? 'text-slate-500' : 'text-slate-600'
          }`}>Professional Endorsements</p>
        </div>
        
        {/* Mobile: Vertical Stack */}
        <div className="md:hidden space-y-6">
          {recommendationsData.map((rec, idx) => (
            <a
              key={idx}
              href={rec.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full p-5 rounded-2xl border backdrop-blur-3xl transition-all active:scale-[0.98] group ${
                isDarkMode
                  ? 'bg-white/[0.02] border-white/5 active:border-white/20'
                  : 'bg-white/60 border-slate-200/50 active:border-slate-300/70'
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2" style={{ borderColor: 'var(--theme-primary)', aspectRatio: '1/1' }}>
                    <img
                      src={rec.image}
                      alt={rec.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.target.src = '/image_c1c534.jpg';
                      }}
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-lg font-black mb-1 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>{rec.name}</h3>
                  <p className={`text-xs font-bold mb-1 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>{rec.title}</p>
                  <p className={`text-[10px] ${
                    isDarkMode ? 'text-slate-500' : 'text-slate-500'
                  }`}>{rec.date}</p>
                </div>
                <div className="flex-shrink-0 mt-1">
                  <Linkedin size={18} className={`transition-transform group-active:scale-110 ${
                    isDarkMode ? 'text-[#0077b5] group-active:text-[#00a0dc]' : 'text-[#0077b5] group-active:text-[#00a0dc]'
                  }`} />
                </div>
              </div>
              <div className={`text-xs leading-relaxed font-medium space-y-2.5 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {Array.isArray(rec.text) ? (
                  rec.text.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))
                ) : (
                  <p>{rec.text}</p>
                )}
              </div>
            </a>
          ))}
        </div>
        
        {/* Desktop: Horizontal Scrolling Container */}
        <div className="hidden md:block relative overflow-hidden py-4">
          <div className="flex animate-scroll-horizontal gap-8 will-change-transform">
            {duplicatedRecommendations.map((rec, idx) => (
              <a
                key={idx}
                href={rec.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-shrink-0 w-[500px] md:w-[600px] p-6 md:p-8 rounded-[2.5rem] border backdrop-blur-3xl transition-all hover:scale-[1.02] group cursor-pointer ${
                  isDarkMode
                    ? 'bg-white/[0.02] border-white/5 hover:border-white/20'
                    : 'bg-white/60 border-slate-200/50 hover:border-slate-300/70'
                }`}
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2" style={{ borderColor: 'var(--theme-primary)', aspectRatio: '1/1' }}>
                      <img
                        src={rec.image}
                        alt={rec.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.target.src = '/image_c1c534.jpg';
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-xl font-black mb-1 ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>{rec.name}</h3>
                    <p className={`text-sm font-bold mb-2 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>{rec.title}</p>
                    <p className={`text-xs ${
                      isDarkMode ? 'text-slate-500' : 'text-slate-500'
                    }`}>{rec.date}</p>
                  </div>
                  <div className="flex-shrink-0 mt-2">
                    <Linkedin size={20} className={`transition-transform group-hover:scale-110 ${
                      isDarkMode ? 'text-[#0077b5] group-hover:text-[#00a0dc]' : 'text-[#0077b5] group-hover:text-[#00a0dc]'
                    }`} />
                  </div>
                </div>
                <div className={`text-sm leading-relaxed font-medium space-y-3 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {Array.isArray(rec.text) ? (
                    rec.text.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))
                  ) : (
                    <p>{rec.text}</p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

const Footer = React.memo(({ isDarkMode, activeTheme }) => {
  // Darken the theme's dark background for footer to make it stand out
  const darkenColor = (color) => {
    // Convert hex to RGB, darken by 30%, then back to hex
    const hex = color.replace('#', '');
    const r = Math.max(0, parseInt(hex.substr(0, 2), 16) * 0.7);
    const g = Math.max(0, parseInt(hex.substr(2, 2), 16) * 0.7);
    const b = Math.max(0, parseInt(hex.substr(4, 2), 16) * 0.7);
    return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
  };
  
  const footerBg = isDarkMode 
    ? darkenColor(themes[activeTheme].bg.dark)
    : themes[activeTheme].bg.dark + 'F5'; // Use dark theme color in light mode for contrast
  
  return (
  <footer 
    className={`py-12 px-6 border-t ${
      isDarkMode 
        ? 'border-white/5' 
        : 'border-slate-200/50'
    }`}
    style={{ backgroundColor: footerBg }}
  >
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
      <div className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${
        isDarkMode ? 'text-slate-600' : 'text-slate-700'
      }`}>
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
            className={`p-3 rounded-full border hover:scale-110 transition-all ${
              isDarkMode 
                ? 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-400 hover:text-white' 
                : 'bg-white/60 border-slate-200/50 hover:bg-white/80 text-slate-600 hover:text-slate-900'
            }`}
          >
            {React.cloneElement(social.icon, { size: 16 })}
          </a>
        ))}
      </div>
    </div>
  </footer>
  );
});

// --- MAIN APP COMPONENT ---

const App = () => {
  const [activeTheme, setActiveTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio_theme') || 'vulcan';
    }
    return 'vulcan';
  });
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_dark_mode');
      return saved !== null ? saved === 'true' : false; // Default to light mode
    }
    return false; // Default to light mode
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
  const tagline = useTypewriter("Targeting Software/AI Engineer Summer Internship", 50); 
  
  const [loaded, setLoaded] = useState(false);
  const [renderBelowFold, setRenderBelowFold] = useState(false);

  // Manual Scroll Ref to prevent jitter
  const isManualScroll = useRef(false);
  const manualTargetSection = useRef(null); // Track target section during manual navigation

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
    document.documentElement.style.setProperty('--theme-bg', theme.bg[isDarkMode ? 'dark' : 'light']);
  }, [activeTheme, isDarkMode]);

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
    const newColor = themes[newThemeKey].bg[isDarkMode ? 'dark' : 'light'];

    // Immediate theme change for seamless transition
      setActiveTheme(newThemeKey);
      localStorage.setItem('portfolio_theme', newThemeKey);
    
    // Ripple effect for visual feedback
    setRipple({ active: true, x: e.clientX, y: e.clientY, color: newColor });
    
    // Close menu smoothly
      setIsThemeClosing(true);
    setTimeout(() => { 
      setShowThemeMenu(false); 
      setIsThemeClosing(false); 
    }, 300);

    setTimeout(() => { setRipple(prev => ({ ...prev, active: false })); }, 800);
  }, [isDarkMode]);
  
  const toggleDarkMode = useCallback((e) => {
    e.stopPropagation();
    setIsDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('portfolio_dark_mode', newMode.toString());
      return newMode;
    });
  }, []);

  // Optimized Navigation Handler (Direct Jump)
  const handleNavClick = useCallback((id, e) => {
    e.preventDefault();
    
    // CRITICAL: Set manual scroll flag and target section FIRST, before any state updates
    // This prevents scroll spy from interfering during the animation
    isManualScroll.current = true;
    manualTargetSection.current = id; // Lock the target section
    
    // Immediately update to destination - this ensures circle animates from source to destination
    // Use flushSync to ensure state update happens synchronously before any scroll events
    setActiveSection(id);

    const element = document.getElementById(id);
    if (element) {
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        // Custom smooth scroll for mobile - slower and with offset for navbar
        const navbarHeight = 80;
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800; // Slower on mobile (800ms vs default ~500ms)
        let start = null;

        const smoothScroll = (currentTime) => {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const progress = Math.min(timeElapsed / duration, 1);
          
          // Easing function for smooth deceleration
          const ease = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
          
          window.scrollTo(0, startPosition + distance * ease);
          
          if (timeElapsed < duration) {
            requestAnimationFrame(smoothScroll);
          } else {
            // Re-enable spy after animation completes
            // Use longer timeout to ensure scroll has fully settled
            setTimeout(() => {
              isManualScroll.current = false;
              manualTargetSection.current = null;
            }, 400); // Increased from 200ms to 400ms to prevent immediate detection
          }
        };
        
        requestAnimationFrame(smoothScroll);
      } else {
        // Desktop: use native smooth scroll
        element.scrollIntoView({ behavior: 'smooth' });
    // Re-enable spy after animation completes (approx 1s)
        // Use longer timeout to ensure scroll has fully settled
    setTimeout(() => {
      isManualScroll.current = false;
          manualTargetSection.current = null;
        }, 1200); // Increased to ensure scroll has fully settled
      }
    }
  }, [activeSection]);

  const openChat = useCallback(() => {
    if (aiButtonRef.current) {
      const rect = aiButtonRef.current.getBoundingClientRect();
      setChatOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
    // When reopening chat, disable animation for all existing messages
    setMessages(prev => prev.map(msg => ({ ...msg, animate: false })));
    setIsChatOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => { setIsChatOpen(false); setIsClosing(false); }, 400); 
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    // Check if API key is configured
    if (!apiKey) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: "API key not configured. Please set VITE_GEMINI_API_KEY in your environment variables.", 
        animate: true 
      }]);
      return;
    }
    
    const userMessage = { role: 'user', text: chatInput, animate: false };
    const currentInput = chatInput; // Capture before clearing
    setMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsChatLoading(true);
    try {
      // For Gemma models, include system context in the message since systemInstruction is not supported
      const formattingReminder = `\n\n=== STRICT RULES ===
1. ANSWER THE QUESTION DIRECTLY - do not say "Hi! How can I help?" or ask questions back. Give actual answers.
2. NEVER mention "Master's student at CMU" or "Master's student at Carnegie Mellon" unless question is EXACTLY about education/where he studied
3. For "hi"/"hey": Give a brief 1-sentence friendly greeting, NO education mention, NO "how can I help"
4. For "tell about him": Give a concise 3-4 sentence overview: current role (Software Engineer with 3 years at Epsilon), key skills (distributed systems, cloud, AI/ML), and current goal (Summer 2026 internship) - NO CMU mention
5. For "what is he good at": List his strengths directly (distributed systems, cloud architecture, optimization, etc.) - NO CMU mention
6. For "how to contact": Answer with email (gauravpandey@cmu.edu), phone (+1 (412) 482-2656), LinkedIn, GitHub - be direct

KEEP RESPONSES SHORT: 1-3 sentences for simple questions, 2-4 sentences for complex

FORMATTING:
- Use **bold** for numbers (e.g., **3 years**, **83%**)
- Use \`backticks\` for tech terms (e.g., \`Java\`, \`Kubernetes\`)\n`;
      
      const promptWithContext = `You are Gaurav Pandey's AI assistant. Answer questions directly with actual information. Do NOT say "How can I help?" - just answer.

CRITICAL: Do NOT mention CMU/education unless the question is specifically about education or where he studied.

${PORTFOLIO_CONTEXT}

${formattingReminder}

USER QUESTION: "${currentInput}"

ASSISTANT RESPONSE:`;
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemma-3-4b-it:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contents: [{ parts: [{ text: promptWithContext }] }]
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API Error: ${response.status}`);
      }
      
      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I seem to be disconnected from the mainframe. Try again?";
      // Debug: log the raw response to check for markdown
      console.log('AI Response (raw):', aiText);
      console.log('Has bold (**):', aiText.includes('**'));
      console.log('Has code (`):', aiText.includes('`'));
      // All new AI responses should have typing animation
      setMessages(prev => [...prev, { role: 'assistant', text: aiText, animate: true }]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      const errorMessage = error.message?.includes('API key') || error.message?.includes('401')
        ? "Invalid API key. Please check your configuration."
        : error.message?.includes('quota') || error.message?.includes('429')
        ? "Rate limit exceeded. Please try again in a moment."
        : `Connection Error: ${error.message || 'Neural link unstable. Try again?'}`;
      // All new AI responses should have typing animation
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
      // CRITICAL: During manual navigation, don't update activeSection at all
      // This ensures the circle animates smoothly from source to destination
      if (isManualScroll.current) {
        // CRITICAL: Completely ignore scroll spy during manual navigation
        // Lock the activeSection to the manual target and don't allow any updates
        if (manualTargetSection.current) {
          // Force lock to target section - don't even check if it's different
          // This prevents any intermediate section detection during scroll animation
          if (activeSection !== manualTargetSection.current) {
            setActiveSection(manualTargetSection.current);
          }
        }
        return; // Exit early - don't run any scroll spy logic
      }

      const viewportCenter = window.innerHeight / 2;
      let closestSection = activeSection;
      let minDistance = Infinity;

      const sections = ['home', 'experience', 'projects', 'leadership', 'education', 'skills', 'recommendations'];
      
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
    <div 
      className={`min-h-screen font-sans selection:bg-blue-500/30 overflow-x-hidden ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`} 
      style={{ 
        backgroundColor: themes[activeTheme].bg[isDarkMode ? 'dark' : 'light'],
        transition: 'background-color 500ms cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      
      <InteractiveBackground themeColor={themes[activeTheme].particle} isDarkMode={isDarkMode} />

      {ripple.active && (
        <div 
          className={`fixed pointer-events-none z-[100] rounded-full animate-ripple ${
            isDarkMode ? 'mix-blend-screen' : 'mix-blend-multiply'
          }`}
          style={{ left: ripple.x, top: ripple.y, backgroundColor: ripple.color, width: '10px', height: '10px', transform: 'translate(-50%, -50%)' }}
        />
      )}

      {/* --- AI Chat Modal --- */}
      {isChatOpen && (
        <div 
          className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 transition-all duration-500 backdrop-blur-sm ${isClosing ? 'bg-transparent' : ''}`}
          style={!isClosing ? { backgroundColor: `${themes[activeTheme].bg[isDarkMode ? 'dark' : 'light']}CC` } : {}}
        >
          <div className="absolute inset-0" onClick={closeChat} />
          <div 
            className={`
              relative w-full sm:max-w-lg max-h-[90vh] sm:max-h-[600px] h-[75vh] sm:h-[600px]
              backdrop-blur-[40px] 
              border-2 border-[var(--theme-primary)]/40
              rounded-t-[2.5rem] sm:rounded-[2.5rem] 
              shadow-[0_0_100px_-20px_rgba(0,0,0,0.8)]
              shadow-[var(--theme-primary)]/20
              flex flex-col overflow-hidden box-border
              ${isClosing ? 'animate-spring-out' : 'animate-spring-up'}
            `}
            style={{ 
              transformOrigin: window.innerWidth < 640 ? 'bottom center' : `${chatOrigin.x}px ${chatOrigin.y}px`,
              backgroundColor: `${themes[activeTheme].bg[isDarkMode ? 'dark' : 'light']}F2`
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br pointer-events-none ${
              isDarkMode 
                ? 'from-[var(--theme-primary)]/20 via-transparent to-[var(--theme-accent)]/20 opacity-50' 
                : 'from-[var(--theme-primary)]/18 via-[var(--theme-accent)]/12 to-[var(--theme-primary)]/18 opacity-75'
            }`} />
            <div 
              className={`relative p-4 sm:p-6 border-b-2 flex justify-between items-center backdrop-blur-xl flex-shrink-0 ${
                isDarkMode 
                  ? 'border-white/5'
                  : 'border-[var(--theme-primary)]/30 shadow-[0_2px_10px_rgba(0,0,0,0.05)]'
              }`}
              style={isDarkMode ? {} : { backgroundColor: `${themes[activeTheme].bg.light}E6` }}
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="flex-shrink-0">
                <BrainReactor active={isChatLoading} theme={themes[activeTheme]} />
              </div>
                <div className="min-w-0">
                  <h3 className={`font-black text-lg sm:text-xl tracking-tight truncate ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`} style={!isDarkMode ? { background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } : {}}>Gaurav AI</h3>
                  <p className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-widest ${
                    isDarkMode ? 'text-slate-500' : 'text-[var(--theme-primary)]'
                  }`}>Powered by Google gemma-3-4b-it</p>
            </div>
              </div>
              <button onClick={closeChat} className={`p-2 sm:p-3 rounded-full transition-all hover:rotate-90 active:scale-90 z-20 flex-shrink-0 ${
                isDarkMode 
                  ? 'hover:bg-white/10' 
                  : 'hover:bg-[var(--theme-primary)]/10'
              }`}><X size={18} className={`sm:w-5 sm:h-5 transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-slate-700 hover:text-[var(--theme-primary)]'
              }`} /></button>
            </div>
            <div className="relative flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 scroll-smooth z-10 min-h-0">
              <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--theme-glow),0.5)_0%,_transparent_70%)] opacity-20 pointer-events-none fixed`} />
              {messages.map((msg, idx) => {
                const handleMessageMouseMove = (e) => {
                  if (typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
                };
                
                return (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`} style={{ animationDelay: `${idx * 0.05}s` }}>
                    <div 
                      onMouseMove={handleMessageMouseMove}
                      className={`relative max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed font-medium shadow-lg backdrop-blur-md overflow-hidden group/msg ${
                        msg.role === 'user' 
                          ? isDarkMode
                            ? `bg-[var(--theme-primary)]/90 text-white rounded-tr-sm shadow-[var(--theme-primary)]/20 border border-[var(--theme-primary)]/40`
                            : `bg-[var(--theme-primary)]/20 text-slate-900 rounded-tr-sm shadow-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/30`
                          : isDarkMode
                            ? 'bg-white/5 text-slate-200 rounded-tl-sm border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]'
                            : 'bg-gradient-to-br from-white/90 to-[var(--theme-primary)]/5 text-slate-900 rounded-tl-sm border border-[var(--theme-primary)]/20 shadow-[0_4px_20px_rgba(0,0,0,0.1)]'
                      }`}
                    >
                      {/* Subtle spotlight effect - more subtle than cards */}
                      <div 
                        className="absolute inset-0 opacity-20 md:opacity-0 md:group-hover/msg:opacity-20 transition-opacity duration-500 pointer-events-none" 
                        style={{ background: `radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), rgba(var(--theme-glow), 0.12), transparent 50%)` }} 
                      />
                      <div 
                        className="md:hidden absolute inset-0 opacity-15 transition-opacity duration-500 pointer-events-none" 
                        style={{ background: `radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), rgba(var(--theme-glow), 0.08), transparent 50%)` }} 
                      />
                      <div className="relative z-10">
                        {msg.role === 'assistant' ? <AIMessage text={msg.text} animate={msg.animate} isDarkMode={isDarkMode} /> : msg.text}
                  </div>
                </div>
                  </div>
                );
              })}
              {isChatLoading && (
                <div className="flex justify-start animate-slide-up">
                  <div className={`p-4 rounded-2xl rounded-tl-sm border flex items-center gap-2 ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10' 
                      : 'bg-gradient-to-br from-white/90 to-[var(--theme-primary)]/5 border-[var(--theme-primary)]/20'
                  }`}>
                    <div className="w-1 h-4 bg-[var(--theme-primary)] rounded-full animate-[wave_1s_ease-in-out_infinite]" />
                    <div className="w-1 h-6 bg-[var(--theme-primary)] rounded-full animate-[wave_1s_ease-in-out_0.1s_infinite]" />
                    <div className="w-1 h-3 bg-[var(--theme-primary)] rounded-full animate-[wave_1s_ease-in-out_0.2s_infinite]" />
                    <span className={`text-xs ml-2 font-bold tracking-wider ${
                      isDarkMode ? 'text-slate-500' : 'text-slate-600'
                    }`}>THINKING</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className={`relative p-3 sm:p-5 border-t-2 backdrop-blur-xl z-20 flex-shrink-0 ${
              isDarkMode 
                ? 'border-white/10 bg-black/40' 
                : 'border-[var(--theme-primary)]/30 bg-gradient-to-r from-[var(--theme-primary)]/10 via-white/70 to-[var(--theme-accent)]/10 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]'
            }`}>
              <div className="flex gap-2 sm:gap-3 items-end">
                <div className="flex-1 relative group">
                  <div className={`absolute -inset-0.5 bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-accent)] rounded-2xl transition duration-500 blur-sm ${
                    isDarkMode ? 'opacity-20 group-hover:opacity-50' : 'opacity-30 group-hover:opacity-60'
                  }`} />
                  <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask about projects..." style={!isDarkMode ? { color: '#0f172a' } : {}} className={`relative w-full border-2 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm placeholder-slate-500 focus:outline-none transition-all shadow-inner ${
                    isDarkMode 
                      ? 'bg-[#0a0a0a] border-white/10 text-white focus:border-white/30' 
                      : 'bg-white/98 border-[var(--theme-primary)]/40 text-slate-900 focus:border-[var(--theme-primary)]/70 focus:ring-2 focus:ring-[var(--theme-primary)]/30 shadow-[var(--theme-primary)]/10'
                  }`} />
                </div>
                <button type="submit" disabled={isChatLoading || !chatInput.trim()} className="p-3 sm:p-4 rounded-2xl bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.3)] shadow-[var(--theme-primary)]/20 flex-shrink-0"><Send size={18} className="sm:w-5 sm:h-5" /></button>
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
            border rounded-full overflow-visible
            will-change-[width,height,padding,transform]
            ${isDarkMode 
              ? 'border-white/10' 
              : 'border-slate-300/30'
            }
            ${isCompact 
              ? `${isDarkMode ? 'bg-black/80' : 'bg-white/90'} p-1.5 h-[52px]`
              : `${isDarkMode ? 'bg-black/40' : 'bg-white/60'} p-2 h-auto`
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
            <div className={`relative profile-trigger ${isCompact ? 'w-8 h-8' : 'w-10 h-10'} flex-shrink-0`}>
                
               {/* Small Avatar - Click to Expand */}
               <div 
                 onClick={toggleProfile}
                 className={`
                   relative w-full h-full rounded-full overflow-hidden shadow-lg 
                   transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer transform-gpu
                   ${isProfileExpanded ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}
                 `}
               >
                 <img src="/image_c1c534.jpg" alt="Gaurav Pandey" className="w-full h-full object-cover object-center" loading="eager" decoding="async" fetchPriority="high" style={{ aspectRatio: '1/1' }} />
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
          <div className={`grid grid-cols-7 ${isCompact ? 'gap-0 w-full' : 'gap-4 w-full'} flex-1 ${isExpanding ? 'transition-all duration-[1000ms] ease-[cubic-bezier(0.2,1.5,0.2,1)]' : 'transition-all duration-[900ms] ease-[cubic-bezier(0.34,1.6,0.64,1)]'} relative overflow-visible items-center`}>
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
                left: `calc(${navItems.findIndex(i => i.id === activeSection) * (100/7)}% + ${(100/14)}%)`, 
                width: isCompact ? '36px' : `${100/7}%`, 
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
                   <span className={`absolute flex items-center justify-center ${isExpanding ? 'transition-all duration-[1000ms] ease-[cubic-bezier(0.2,1.5,0.2,1)]' : 'transition-all duration-[900ms] ease-[cubic-bezier(0.34,1.6,0.64,1)]'} ${isCompact ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-180'}`}>
                    {item.icon}
                  </span>
                </a>
              );
            })}
          </div>
          
          <div className="w-[1px] h-6 bg-white/10 rounded-full mx-3"></div>
          <div className={`flex-shrink-0 flex items-center gap-2 sm:gap-3 ${isCompact ? 'pr-2' : 'pr-3'}`}>
            {/* Ask AI Button */}
            <button ref={aiButtonRef} onClick={openChat} className={`group relative z-50 flex items-center justify-center rounded-full transition-all duration-500 active:scale-95 hover:shadow-[0_0_25px_-5px_rgba(124,58,237,0.6)] overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x bg-[length:200%_auto] flex-shrink-0 ${isCompact ? 'w-9 h-9' : 'h-10 px-4'}`} title="Ask AI">
              <div className={`relative z-10 flex items-center gap-2 h-full rounded-full transition-all ${isCompact ? 'w-full justify-center' : ''}`}>
                <Sparkles size={isCompact ? 14 : 16} className="text-white animate-pulse flex-shrink-0" />
                {!isCompact && <span className="text-[10px] font-black uppercase tracking-wider text-white whitespace-nowrap">Ask Gaurav AI</span>}
              </div>
            </button>
            {/* Theme Toggle */}
            <div 
              ref={themeWrapperRef}
              className={`relative flex items-center justify-center cursor-pointer rounded-full bg-white/5 hover:bg-white/15 border border-white/10 transition-all duration-300 z-50 animate-in zoom-in spin-in-180 duration-1000 flex-shrink-0 ${isCompact ? 'w-8 h-8' : 'w-9 h-9'} ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} 
              onClick={toggleThemeMenu} 
              role="button"
            >
              <Palette size={isCompact ? 14 : 16} className={`text-[var(--theme-primary)] transition-all duration-700 ${showThemeMenu ? 'rotate-90' : 'group-hover:rotate-180'}`} />
              {showThemeMenu && (
                <div className={`absolute top-full right-0 mt-6 min-w-[220px] origin-top-right z-[999] ${isThemeClosing ? 'animate-super-exit' : 'animate-super-entrance'}`} onClick={(e) => e.stopPropagation()}>
                  <div className={`absolute inset-0 backdrop-blur-2xl rounded-[2rem] border border-[var(--theme-primary)]/20 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),0_0_15px_-5px_rgba(var(--theme-glow),0.3)] overflow-hidden ${
                    isDarkMode 
                      ? 'bg-gradient-to-b from-gray-900/95 to-black/95' 
                      : 'bg-gradient-to-b from-white/95 to-gray-50/95'
                  }`}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--theme-primary)]/10 via-transparent to-transparent opacity-50" />
                    {!isThemeClosing && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--theme-primary)]/10 to-transparent skew-x-12 animate-[shimmer-sweep_1s_ease-out_forwards]" />}
                  </div>
                  <div className="relative z-10 p-3 flex flex-col gap-2">
                    <div className={`px-3 py-2 flex items-center justify-between border-b mb-1 ${
                      isDarkMode ? 'border-white/5' : 'border-slate-300/20'
                    }`}>
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${
                        isDarkMode ? 'text-slate-500' : 'text-slate-600'
                      }`}>Select Theme</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] animate-pulse shadow-[0_0_5px_var(--theme-primary)]" />
                    </div>
                    {Object.keys(themes).map((t, index) => {
                      const isActive = activeTheme === t;
                      const themeData = themes[t];
                      return (
                        <button key={t} onClick={(e) => handleThemeChange(t, e)} className={`relative group/item w-full flex items-center justify-between px-4 py-3 rounded-xl border border-transparent transition-all duration-300 hover:scale-[1.05] hover:translate-x-1 hover:shadow-lg ${
                          isDarkMode 
                            ? 'hover:bg-white/5 hover:border-white/10' 
                            : 'hover:bg-black/5 hover:border-slate-300/20'
                        }`}>
                          {isActive && <div className="absolute inset-0 rounded-xl border opacity-20" style={{ backgroundColor: themeData.primary, borderColor: themeData.primary }} />}
                          <div className="flex items-center gap-3 relative z-10">
                            <div className="relative">
                              <div className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] transition-all duration-500 group-hover/item:scale-125" style={{ backgroundColor: themeData.primary, opacity: isActive ? 1 : 0.8 }} />
                              {isActive && <div className="absolute inset-0 rounded-full border animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" style={{ borderColor: themeData.primary }} />}
                            </div>
                            <span className={`text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                              isActive 
                                ? isDarkMode ? 'text-white' : 'text-slate-900'
                                : isDarkMode ? 'text-slate-400 group-hover/item:text-white' : 'text-slate-600 group-hover/item:text-slate-900'
                            }`}>{themeData.label || t}</span>
                          </div>
                          {isActive && <Check size={14} style={{ color: themeData.primary }} className="animate-[zoom-in_0.3s_cubic-bezier(0.175,0.885,0.32,1.275)]" />}
                        </button>
                      );
                    })}
                    
                    {/* Dark/Light Mode Toggle Switch */}
                    <div className={`mt-2 pt-2 border-t ${isDarkMode ? 'border-white/5' : 'border-slate-300/20'}`}>
                      <div className="flex items-center justify-between px-4 py-3">
                        <span className={`text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                        </span>
                        
                        {/* Toggle Switch */}
                        <button
                          onClick={toggleDarkMode}
                          className={`relative w-14 h-7 rounded-full transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            isDarkMode
                              ? 'bg-gradient-to-r from-slate-700 to-slate-800 focus:ring-slate-600'
                              : 'bg-gradient-to-r from-yellow-400 to-orange-400 focus:ring-yellow-500'
                          }`}
                          role="switch"
                          aria-checked={isDarkMode}
                        >
                          {/* Toggle Track Background with Stars/Sun Rays */}
                          <div className="absolute inset-0 rounded-full overflow-hidden">
                            {/* Stars for dark mode */}
                            {isDarkMode && (
                              <>
                                <div className="absolute top-1 left-2 w-0.5 h-0.5 bg-yellow-300 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
                                <div className="absolute top-3 left-4 w-0.5 h-0.5 bg-yellow-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                                <div className="absolute top-2 right-3 w-0.5 h-0.5 bg-yellow-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                              </>
                            )}
                            
                            {/* Sun rays for light mode */}
                            {!isDarkMode && (
                              <div className="absolute inset-0">
                                <div className="absolute top-0 left-1/2 w-0.5 h-1 bg-yellow-300/60 rounded-full transform -translate-x-1/2" />
                                <div className="absolute top-1/2 right-0 w-1 h-0.5 bg-yellow-300/60 rounded-full transform -translate-y-1/2" />
                                <div className="absolute bottom-0 left-1/2 w-0.5 h-1 bg-yellow-300/60 rounded-full transform -translate-x-1/2" />
                                <div className="absolute top-1/2 left-0 w-1 h-0.5 bg-yellow-300/60 rounded-full transform -translate-y-1/2" />
                                <div className="absolute top-1 right-2 w-0.5 h-1 bg-yellow-300/60 rounded-full transform rotate-45" />
                                <div className="absolute bottom-1 right-2 w-0.5 h-1 bg-yellow-300/60 rounded-full transform -rotate-45" />
                                <div className="absolute top-1 left-2 w-0.5 h-1 bg-yellow-300/60 rounded-full transform -rotate-45" />
                                <div className="absolute bottom-1 left-2 w-0.5 h-1 bg-yellow-300/60 rounded-full transform rotate-45" />
                              </div>
                            )}
                          </div>
                          
                          {/* Sliding Circle with Icon */}
                          <div
                            className={`absolute top-0.5 w-6 h-6 rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform ${
                              isDarkMode
                                ? 'translate-x-7 bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg'
                                : 'translate-x-0.5 bg-gradient-to-br from-yellow-200 to-yellow-300 shadow-lg'
                            }`}
                          >
                            {/* Icon Container */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              {/* Moon Icon (Dark Mode) */}
                              <div
                                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                                  isDarkMode
                                    ? 'opacity-100 scale-100 rotate-0'
                                    : 'opacity-0 scale-0 rotate-180'
                                }`}
                              >
                                <Moon
                                  size={14}
                                  className="text-yellow-300 fill-yellow-300 drop-shadow-[0_0_4px_rgba(251,191,36,0.8)]"
                                />
                                {/* Moon glow */}
                                <div className="absolute inset-0 bg-yellow-300/20 rounded-full blur-sm" />
                              </div>
                              
                              {/* Sun Icon (Light Mode) */}
                              <div
                                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                                  !isDarkMode
                                    ? 'opacity-100 scale-100 rotate-0'
                                    : 'opacity-0 scale-0 -rotate-180'
                                }`}
                              >
                                <Sun
                                  size={14}
                                  className="text-yellow-600 fill-yellow-600 drop-shadow-[0_0_6px_rgba(251,191,36,0.9)] animate-spin-slow"
                                />
                                {/* Sun glow */}
                                <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-md animate-pulse" />
                              </div>
                            </div>
                            
                            {/* Shine effect on circle */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* --- SECTIONS --- */}
      <HeroSection tagline={tagline} loaded={loaded} socialLinks={socialLinks} isDarkMode={isDarkMode} />

      {/* Deferred Content */}
      {renderBelowFold && (
        <>
          <ExperienceSection isDarkMode={isDarkMode} />
          <ProjectsSection isDarkMode={isDarkMode} />
          <LeadershipSection isDarkMode={isDarkMode} />
          <EducationSection isDarkMode={isDarkMode} />
          <SkillsSection isDarkMode={isDarkMode} />
          <RecommendationsSection isDarkMode={isDarkMode} />
          <Footer isDarkMode={isDarkMode} activeTheme={activeTheme} />
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
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        @keyframes scroll-horizontal {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-horizontal {
          animation: scroll-horizontal 40s linear infinite;
          display: flex;
          width: fit-content;
        }
        .animate-scroll-horizontal:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default App;