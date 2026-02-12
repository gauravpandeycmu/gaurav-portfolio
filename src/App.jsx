import React, { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from 'react';
import { 
  Github, Linkedin, Mail, Zap, Monitor,
  Briefcase, Globe, Eye, Scan, Award, Heart, Home, Code,
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
- Portfolio: https://gauravpandey.site

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
   - Strengthened security across 3 core repositories using Veracode scans and systematic remediation through SonarQube/PMD analysis

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
   - Dean's List: Fall 2025
   - Fall 2025 Courses: NoSQL Database Management, Object Oriented Programming in Java, Decision Making Under Uncertainty, Organisation Design and Implementation, Accounting and Finance, Professional Speaking
   - Spring 2026 Courses: Cloud Computing (15-619), Agentic Technologies, AI Model Development, Distributed Systems for ISM, Measuring Social, Digital Transformation
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
Frontend Frameworks: React, Angular
Backend Frameworks (additional): Django
Testing: TestNG
Data/ML Libraries: Pandas, NumPy, PyTorch, TensorFlow
Infrastructure & Data Platforms (additional): Terraform, CloudWatch, Cloudera, Databricks, Linux, boto3

**KEY PROJECTS:**

1. **MGM Resorts Social Activation Analysis** (Jan 2026 - Present)
   - Partnering with MGM Resorts marketing leadership to analyze 2025 Las Vegas Grand Prix activations and identify engagement drivers
   - Built a Brandwatch ingestion workflow in SQL to standardize post metadata and engagement fields across MGM and competitors
   - Tech: SQL, Brandwatch, Marketing Analytics

2. **Autoscaling Web Service on AWS (ALB, ASG, CloudWatch)** (Dec 2025 - Jan 2026)
   - Engineered horizontal scaling automation in Python using boto3 to provision ALB, target groups, ASG, CloudWatch alarms, and target tracking policies
   - Tuned evaluation periods, cooldowns, warm-up windows, and health check grace periods to optimize average and peak RPS while reducing instance uptime
   - Migrated infrastructure to Terraform for reproducible and version-controlled deployments
   - Tech: AWS, Python, Terraform, CloudWatch, boto3

3. **Edge Surveillance Module**
   - Designed edge-based master/worker system handling 10+ video streams
   - Utilized YOLOv3 for social distancing violation detection
   - Leveraged AWS Rekognition to identify key frames, reducing local storage by 90%
   - Tech: Python, AWS, YOLOv3

4. **Image Classification**
   - Annotated 14k+ images into 8 classes using VGG Annotator
   - Used ResNet50 weights for transfer learning
   - Applied Grad-CAM for class activation maps and feature visualization
   - Tech: ResNet50, Machine Learning, Python
   - GitHub: https://github.com/gauravpandeycmu/EIP/tree/master/Phase%201/Session%205

5. **PoseNet Recognition**
   - Leveraged PoseNet to track hand gestures during lectures
   - Identified blackboard text even with blurry inputs
   - Tech: PoseNet, JavaScript, Transfer Learning

**LEADERSHIP & ACTIVITIES:**

1. **Google Cloud Sprint** (Feb 2021 - Apr 2021)
   - Selected among 30 from 15,000+ applicants across India
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
- Runner-up at Google Cloud Sprint (selected from 15,000+ applicants)
- Improved ML model performance by 18-20% in research projects
- Upgraded 70+ vulnerable libraries and remediated 500+ code quality issues
- Reduced infrastructure costs by 10% through hard-delete backend automation
- Built production-style autoscaling workflows on AWS with Python + Terraform

**CURRENT FOCUS:**
Actively seeking Software/AI Engineer Summer Internship opportunities for Summer 2026. Strong background in distributed systems, cloud architecture, production reliability, and machine learning. Experience with full-stack development, microservices, infra automation (AWS + Terraform), and AI/ML applications.

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
  - Use **bold** for emphasis on key numbers, years, percentages, or important points
  - CRITICAL: Use \`backticks\` for ALL technical terms, programming languages, tools, frameworks, libraries, models, services, and technologies (e.g., \`YOLOv3\`, \`AWS Rekognition\`, \`ResNet50\`, \`Grad-CAM\`, \`PoseNet\`, \`Python\`, \`Java\`, \`Kubernetes\`, \`Node.js\`, \`Spring Boot\`, \`AWS\`, \`Docker\`, \`Kafka\`, \`Spark\`, etc.)
  - Use line breaks (\n) to separate paragraphs for better readability
  - Avoid bullet points unless the question specifically asks for a list
- Examples of good responses:
  - "I'm a Master's student at CMU with **3 years** of experience as a Software Engineer at Epsilon, where I worked extensively with \`Kubernetes\` and \`AWS\` to build scalable microservices."
  - "I'm currently pursuing my Master's in Information Systems Management at Carnegie Mellon University, with a strong background in distributed systems and cloud architecture. I spent **3 years** as a Software Engineer at Epsilon, where I reduced data pipeline load times by **83%** and streamlined \`AWS\` costs by **60%**."
  - "I've worked on several impactful projects. One involved designing an edge surveillance module utilizing \`YOLOv3\` for social distancing detection and \`AWS Rekognition\`, reducing local storage by **90%**. I also developed an Image Classification project using \`ResNet50\` and \`Grad-CAM\`, and a \`PoseNet\` Recognition system for tracking hand gestures."
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
  { id: 'articles', label: 'Articles', icon: <FileText size={18} /> },
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
    title: "MGM Resorts Social Activation Analysis",
    desc: "Partnered with MGM Resorts marketing leadership to analyze 2025 Las Vegas Grand Prix social activations and identify engagement drivers for 2026 campaign concepts.\nBuilt a Brandwatch ingestion workflow in SQL to normalize post metadata and engagement fields across MGM and competitor content for structured analysis.",
    tags: ["SQL", "Brandwatch", "Marketing Analytics"],
    icon: <Globe />,
    hideCta: true
  },
  {
    title: "Autoscaling Web Service on AWS",
    desc: "Engineered horizontal autoscaling automation in Python using boto3 to provision ALB, target groups, Auto Scaling groups, CloudWatch alarms, and target-tracking policies to meet RPS goals.\nTuned cooldowns, warm-up windows, health-check grace periods, and alarm thresholds; then migrated the infrastructure to Terraform for reproducible, version-controlled deployments.",
    tags: ["AWS", "Python", "Terraform"],
    icon: <Zap />,
    hideCta: true
  },
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
      { term: "Fall 2025", courses: ["NoSQL Database Management", "Object Oriented Programming in Java", "Decision Making Under Uncertainty", "Organisation Design and Implementation", "Accounting and Finance", "Professional Speaking"], deansList: true },
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

const articlesData = [
  {
    id: "attention-lstm",
    title: "May I Have Your Attention?",
    subtitle: "LSTM, GRU and Attention Mechanisms",
    source: "Medium",
    published: "Dec 3, 2020",
    readTime: "4 min read",
    link: "https://gauravpandeyyy.medium.com/may-i-have-your-attention-94c13ac73a51",
    coverImage: "https://colah.github.io/posts/2015-08-Understanding-LSTMs/img/LSTM3-chain.png",
    coverAlt: "LSTM cell diagram",
    tags: ["Deep Learning", "NLP", "LSTM", "Attention"],
    summary:
      "A deep dive from the original Medium post covering why plain RNNs struggle with long-term dependencies, how LSTM/GRU gating improves sequence modeling, and how attention upgrades seq2seq architectures.",
    content: [
      {
        heading: "LSTM",
        paragraphs: [
          "Like RNNs, Long Short Term Memory is a class of deep learning model able to model temporal sequences using prior context to inform current and future prediction.",
          "A standard RNN carries prior information through hidden state feedback, but multiplicative state updates make long-term dependencies difficult to retain and can overwrite unrelated context.",
          "LSTMs are an upgrade over RNNs in that they were designed to upgrade the model's memory additively, and selectively using various gates.",
          "Adding a FORGET gate: the forget gate acts upon the current input x_t and previous hidden state h_{t-1} to selectively forget information that might not be relevant to the current time step.",
          "Maintaining a Cell State: LSTMs maintain long-term memory in the cell state so the model can preserve useful context strength across timesteps.",
          "Adding an UPDATE gate: the update gate selectively filters and updates the cell state so only relevant information is written.",
          "Adding an INPUT gate: the input gate selects the information from current input and previous hidden state that should be added to the cell state."
        ],
        figures: [
          {
            src: "https://colah.github.io/posts/2015-08-Understanding-LSTMs/img/LSTM3-chain.png",
            caption: "LSTM architecture overview.",
            source: "Understanding LSTM Networks - colah's blog"
          }
        ]
      },
      {
        heading: "GRU",
        paragraphs: [
          "Gated Recurrent Units simplify LSTM by unifying input and forget behavior and replacing separate cell-state handling with hidden-state-focused updates.",
          "In a GRU architecture, the previous hidden state is updated by selected information from a temporary state while carrying forward everything else.",
          "Unlike LSTMs (which combine previous cell state, previous hidden state, and current input through separate gates), GRUs make fewer updates and therefore use fewer parameters.",
          "Because of that lighter architecture, GRUs are generally faster to train with comparable performance."
        ],
        figures: [
          {
            src: "https://colah.github.io/posts/2015-08-Understanding-LSTMs/img/LSTM3-var-GRU.png",
            caption: "GRU architecture variant.",
            source: "Understanding LSTM Networks - colah's blog"
          }
        ]
      },
      {
        heading: "ATTENTION - building blocks",
        paragraphs: [
          "The attention mechanism gained momentum in NLP encoder-decoder systems, where models like seq2seq are used for tasks such as translation and summarization.",
          "A key drawback of classic seq2seq is that the decoder relies heavily on the final encoder output, causing information loss from earlier timesteps.",
          "Attention modifies this by combining decoder state with all encoder hidden vectors and learning how much weight each encoder output should receive.",
          "This dynamic weighting improves context retention and leads to significantly stronger performance across NLP benchmarks."
        ],
        figures: [
          {
            caption: "Fig 4 in the original Medium post (traditional seq2seq context bottleneck).",
            source: "Medium original figure",
            sourceUrl: "https://gauravpandeyyy.medium.com/may-i-have-your-attention-94c13ac73a51"
          },
          {
            caption: "Fig 5 in the original Medium post (attention-enhanced seq2seq flow).",
            source: "Medium original figure",
            sourceUrl: "https://gauravpandeyyy.medium.com/may-i-have-your-attention-94c13ac73a51"
          }
        ],
      },
      {
        heading: "Original article notes",
        paragraphs: [
          "The original post also labels intermediate diagrams as Fig 4 and Fig 5 while discussing where context compression fails and how attention resolves that issue.",
          "If a specific Medium-hosted image URL fails to load in future, the section still keeps the full textual explanation so readers do not lose continuity."
        ]
      }
    ]
  },
  {
    id: "redis-security",
    title: "Security Analysis for In-Memory NoSQL Database (Redis)",
    subtitle: "Research paper on Redis threat modeling and hardening",
    source: "CMU Research Report",
    published: "2026",
    readTime: "Long-form paper",
    paperMeta: {
      title: "Security Analysis for in-memory NoSQL Database (Redis)",
      author: "Gaurav Pandey",
      affiliation: "Carnegie Mellon University, Heinz College, Pittsburgh, PA",
      email: "gauravpa@andrew.cmu.edu"
    },
    tags: ["Redis", "Security", "NoSQL", "Threat Modeling"],
    summary:
      "Full text from the final report, including all core sections and references.",
    fullText: `Abstract— This paper provides a comprehensive security
analysis of Redis, a leading in-memory NoSQL database initially
designed to operate within trusted networks. This foundational
assumption created security challenges as its adoption expanded
to public deployments. The analysis traces the evolution of Redis's
security model, from its early reliance on a simple optional
password to the introduction of modern features like Protected
Mode, Transport Layer Security (TLS), and granular Access
Control Lists (ACLs) in later versions.
The paper performs a deep dive into significant historical and
modern threats, including large-scale ransomware attacks, Lua
script injection vulnerabilities, and Denial of Service (DoS)
exploits. A comparative analysis with traditional Relational
Database Management Systems (RDBMS) is presented,
contrasting their approaches to authentication, encryption, and
auditing. Finally, the paper evaluates the performance impact of
enabling key security features and concludes by recommending a
multi-layered security strategy encompassing network,
configuration, and application-level best practices to harden Redis
deployments effectively.
Keywords—Redis, NoSQL Security, In-memory Database,
Vulnerability Analysis, Threat Modeling, Access Control List (ACL),
Performance analysis
I. INTRODUCTION
The growth of internet usage has led to many database
implementations to cater to specific application needs.
Traditionally, relational databases dominated the market as the
prevalent choice for database. These offered higher consistency
but had rigid schema and had issues with scalability. With the
introduction of MongoDB, Redis and other NoSQL databases in
2009, there has been a dramatic shift towards their utilization for
specific applications.
Among these new highly scalable databases, Redis is a
leader for in memory key value-based data storage. With its
preference for lower latency, it quickly became a component to
existing database implementation offering high speed caching
and improving read throughput of the data. Initially designed to
run on trusted networks only, it did not offer many security
features. As the adoption of Redis has increased and the database
has become more mature with public deployments, this initial
security assumption has posed certain challenges in its
development lifecycle.
This paper aims to provide a comprehensive security
analysis of Redis. It begins by establishing foundational
understanding of the core architecture and persistence
mechanism. It then brings into the discussion the various
security features available today such as Access Control Lists
(ACL) and TLS encryption. Subsequently, the paper performs a
deep dive into the most known threats like injection
vulnerabilities and Denial of Service (DoS) exploits. After a
security-based comparison to relational databases the paper
concludes by recommending security enhancements and the
performance impact of introducing them.
II. BACKGROUND
Redis, which stands for REmote DIctionary Server, is an
open-source key-value-based NoSQL data structure which
utilizes in-memory operations to provide extremely high
throughput and lower latency by keeping the primary data in
Random Access Memory (RAM). Therefore, instead of storing
and operating on slower persistent disk storages, Redis opts for
extremely fast RAM.
Architecturally, Redis runs on a single-threaded model. This
simplifies the development process and helps avoid any
performance disruption due to constant context switching. This
also means it is easier for some long-running commands to block
the complete server and therefore makes it vulnerable to Denial
of Service attacks.
It ensures durability using two persistent storage options,
namely, Append Only File (AOF) logging, which logs write
operations that the server receives and RDB snapshots, which
are point-in-time dumps of the dataset.
RDB allows faster restarts with big datasets compared to
AOF and an excellent option as its a single small file-based
option to store backups every hour, days. These backups can be
used to restore the database back to the previous condition. But
it should be noted that in this case of disaster recovery it can only
be moved back to a previous version and intermediate data after
the backup was created won’t be restored.
AOF makes Redis far more durable as it allows different
sync options like every second, every query and the performance
is not affected in some configurations as it runs on a background
thread without impacting the main thread. The AOF log is an
append only file [17] and is usually bigger when compared to
RDB snapshots.
III. EVOLUTION OF REDIS SECURITY MODEL
This section provides a brief overview of the different phases
of security layer Redis development has progressed. (More will
be discussed in the later sections) When Redis was first

-- 1 of 6 --

introduced in 2009, it was under the direct assumption that it will
only be run on trusted and protected local networks. From Redis
1.0 – 5.0, it had only a basic username password based
authentication system. This too was an optional feature which
allowed the transmission of such data using simple text.
This demonstrates the lack of focus for security during the
early years of Redis due to their assumption of running it on a
secured network layer.
Following the phase 1, Redis introduced protected mode in
version 3.2 onwards. This was done to prevent hackers from
gaining read/write access to Redis database with no password
setup.
During the phase 3, Redis has introduced multiple security
features like Access Control Lists (ACL) to manage role based
access to database and configure it as well as other features like
SSL/TLS Encryption.
IV. REDIS SECURITY MODEL AND PRACTICES
The classic Redis model is unique from other NoSQL
databases as it is reliant on a trusted network that is not
accessible to the public internet to reduce the likelihood of
unauthorized access. [1] Since Redis 1.0 launched in 2009 there
have been many improvements done to allow Redis 6.0+ to run
on public internet
Some of the ways that the Redis documentation discusses
security enforcement are:
A. Deployment Security
Applications using older versions of Redis (1.0 – 5.0) should
note that the original Redis implementation was designed to
utilize trusted network as the database security level. Apart from
that, client-side encryption although extremely popular, comes
with issues pertaining to lack of features like searching,
increment and comparisons.
It is also advised to maintain adequate Reboot schedules
while ensuring enough cluster to maintain functionality to not
break the write/read quorum.
B. Cluster Security
[2] Cluster access permits operation related to performance
management like creation of databases and visualization of
statistics. Database access on the other hand only permits
actions related to data (read/write to DB)
Redis 6.0, introduced Access Control mechanism and it is
highly recommended to activate Redis support for role-based
LDAP (Lightweight Directory Access Protocol) authentication
use so that database users don’t have access to the cluster.
C. Database Security
In the native implementation of Redis it allows a default
user. This user has the access to database by only specifying
shared secret. This was done for Enterprise application prior to
6 therefore if your application uses latest then it is recommended
to deactivate default user.
V. THREAT MODELING AND MODERN ATTACKS
The massive popularity of Redis has created some issues in
real-world deployments without trusted networks/
misconfigurations. These can be classified in three categories
being the large-scale ransomware attack on Redis, exploits for
application-level injection and denial of service attacks.
A. Historical largescale Ransomware attack
One of the major security flaws of Redis is discussed in the paper
[12] by Anastasija. As discussed earlier, Redis provided no
default Authentication. This was done to prioritize performance
as resolving passwords adds latency to each operation. Also,
although Redis was designed for trusted networks only, in
execution, people failed to protect it and exposed the database to
all incoming Ip request.
These exposed, unprotected databases become the inevitable
target of ransomware attacks with the help of Shodan. (Shodan
is a search engine to look up various types of servers [13]).
Attackers were able to find a list of IP addresses that were
responding to 6379 port (Default configuration for Redis). With
the complete access to the databases, they were able to delete the
entire database and even leave ransom notes in the form of
bitcoin addresses.
This affected more than 75% of open Redis servers [14]
The fix was simple. The blog written by the primary creator
of Redis (Salvatore Sanfilippo) mentions behind the rationale
for introducing it. “The idea of protected mode is to listen to
every address, but if the connection is not local, the server
replies with an error explaining why it is not working as
expected” [15]
This approach has two advantages. Firstly, it brings
transparency to the user on how to fix the problem and secondly,
informs the user of the implications of disabling protected mode.
B. Lua Scripting Insights
Redis introduced Lua scripting [18] to allow local
processing of commands. It provided an option to change the
overall latency to execute some commands due to the local
nature of execution.
However, the database is not executing therefore it is meant
only for proven commands which can save on latency.
Although a beneficial feature, it allows server level injection
through application. For example, if a hacker updates the Redis
database query to be request by application by appending user
input into that. Then they can run commands directly on the
database without any access control.
Therefore, the key to secure database lies with the
application layer. A poor implementation of application-level
code can make the database severely vulnerable to such attacks.
The same was pointed out by Redis in 2024 in their vulnerability
report [CVE-2024-31449] [19] that lua scripting can be used
by an authenticated user to achieve remote control execution of
the database. This vulnerability was tagged high with a score of
7/10.
To avoid such situations Redis suggests to firstly restrict
network access to limited authorized users and utilize techniques

-- 2 of 6 --

like firewalls as well as network level policies. Secondly, to use
credentials for all parts of the database and lastly to limit only
very limited users to run Lua scripts.
C. Denial of service (DOS) attacks
A high vulnerability to availability of a database is a DOS
attack. In simple terms it means that a hacker tries to overload
the servers with garbage, unwanted requests to the point that the
server shuts down or makes it unavailable to public requests due
to it handling these.
The following vulnerability as discussed in [22] was
addressed in 2025. The vulnerability allowed an unauthorized
user to make the database unavailable to public requests. This
could happen as in the default configuration Redis does not limit
the output buffer for a user. This leads to possible unlimited size
of this buffer leading to the service being down.
The specific case where this was possible was when
password authentication is enabled and the user sends a request
with no password. In normal cases this will return NOAUTH as
intended. But in case, the same command was run countless
times then it would lead to the buffer being full eventually and
the database becoming unavailable. Fortunately, this was fixed,
and it does not exist in any version above 2.6. Although this was
fixed, the recency of such a big security threat is noteworthy.
VI. COMPARATIVE SECURITY ANALYSIS: NOSQL VS.
RDBMS
As mentioned in [5], big data applications are more
vulnerable to injection attacks. They provide a weak default
security layer and thus it is instead dependent on factors like
database administration and application-level security [6].
With scalability and high throughput in mind, Redis has the
priority for performance and is therefore not very well optimized
for enhanced security. [7] It also lacks support for auditing and
nefarious attacks can insert data into Redis [8]
A. Data Encryption
“While the relational database encryption is significantly
robust and mature, encryption is the weakest feature in NoSQL
databases” Since Redis does not support encryption by default,
all the data being stored and transmitted has no encryption (till
5.0) and is prone to misuse.
With no built-in encryption in Redis, the Append Only File
logs and RDB snapshots are protected through application-level
security. Although client-side encryption is possible it becomes a
lackluster option to the disadvantages like some Redis commands
not working when enabled.
B. Authentication
[9] Authentication is the process of validating user’s identity.
RDBMS is a mature system with specific role-based Access
Control which allow it to have roles for SELECT, UPDATE,
INSERT, DELETE commands and therefore gives freedom to
setup the principle of least privilege.
Redis on the other hand only had an optional password
option till 5.0. This was also shared across the complete server
and was transmitted in unencrypted text. But the security
features in Redis have been evolving with increased versions.
The introduction of ACL in 6.0 makes it possible to have the
similar level of security that relational databases offer. It allows
for multiple individuals to have permissions and to allow/reject
based on a pattern. The Redis implementation is still not that
granular when compared to relational databases.
In NoSQL databases there is no option to allow access to
only specific distributed system. [6] Therefore, when a user is
accessing one part of the system, they have access to the entire
cluster nodes. This makes them far more vulnerable to attacks.
Even the ACL that was introduced in Redis 6.0 version, it is far
less granular than the RDBMS implementation.
C. Auditing
According to Oracle [12] Auditing is the monitoring and
recording of configured database actions, from both database
users and non-database users. Although all major relational
database systems support auditing, most non-relational
databases like Redis don’t support it. This is a crucial feature
which Redis and other NoSQL databases lack.
Relational databases have built-in capabilities for auditing.
They can be utilized for the creation of extremely detailed set of
logs for both success and failure scenarios. Apart from that log
entry is also possible for any modifications to the data,
enhancements to schema and changes in the role-based security.
As is evident, relational databases cover all areas when it comes
to auditing and logs.
Redis on the other hand does not have any built-in auditing
features. Instead of using the database for logs, the core
responsibility lies in the hands of the application developer.
There is a work around to use MONITOR command but it is
generally not usable due to it's performance impact. With that
said, “slow log” in MONITOR can be used to identify the
commands which take more time to run.
D. Injection Vulnerabilities
In this case both Redis and relational databases are
susceptible to injection attacks.
[40] For relational databases the most common vulnerability
is SQL Injection. This can allow a person to circumvent the
authorization setup and allow to run sql commands on the server.
But due to the fixed schema there are ways to update queries to
prevent against such threats.
As Redis does not support SQL, it is not prone to SQL
injection but instead to script injection through Lua scripts.
VII. RECOMMENDED SECURITY ENHANCEMENTS
As is evident from the discussion in previous sections, a
strong and well thought security is paramount with a Redis
deployment and multiple areas need to be carefully analyzed to
ensure its safe from all the vulnerabilities. We cannot rely just

-- 3 of 6 --

about application-level security to maintain high availability.
These practices are crucial to successfully run Redis in
production setting to prevent it from internal as well as external
threats. [33]
A. Network level Security
This is the layer that Redis expects to be the most robust and
should allow only authorized users and actions to be sent to the
database.
Firstly, to limit IP Using “bind” in Redis.conf file, we can
limit the IP addresses that the database should listen to. In case
the client application runs on the same network as the Redis
server then using bind 127.0.0.1 -::1 for bind is the safest option.
On the other hand, in case of distributed systems, we should bind
Redis to main servers location (IP) and also ensure that it's not
accessible to the public. [27]
Secondly, by implementing a default deny policy on usual
TCP ports (6379) and enabling only specific IP address for
incoming requests.
Lastly, since earlier versions of Redis lacked encryption, we
can introduce encryption at the network level. By using Redis 6.0 or
later we can utilize the native TLS level encryption that Redis
provides. [27]
B. Operating System level Security
In order to maintain the Principle of Least Privilege (POLP)
the Redis should not be executed as the root user. The database
administrator should make an unprivileged user only for Redis
executions which should not have access to shell.
The Redis database is configured using Redis.conf file and
it is important to keep this safe. Therefore, there should be
specific permissions that allow only root users to access the
configuration file. [32]
C. Configuration Security
For authentication on per query level make sure to enable
“requirepass” which makes the “AUTH” command available.
Keeping this turned on will significantly improve in protection
based brute force attacks. [3]
Apart from authentication, following Access Control
Lists(ACL) practices which were introduced in Redis 6.0 and
later for user level roles assignment is advisable.
Some commands can be renamed which can be dangerous if
run by unauthorized users. For example, FLUSHALL command
can erase entire data.
As discussed in earlier section, Redis was susceptible to out
of memory type Denial Of Service attacks. Using
“maxmemory” we can set the threshold memory and associated
it to some task.
D. Encryption
Apart from using TLS Encryption for the network layer we
can also enforce simple encryption to further improve security.
LUKS is a tool which can be used for file level encryption for
linux and Amazon has AWS EBS Encryption in order to do the
same. [23]
Client-side encryption can also be implemented by
encrypting request being sent over by the client.
E. Securing Architecture
[25] Redis Sentinel is a distributed system which actively
monitors the status of its instances. It is advised to keep the
external port of Sentinel behind a firewall.
In a Redis Cluster based setup, its TCP port acts as the
middle ground for various important exchanges. Therefore,
according to the Redis cluster guide documentation, TLS is
highly recommended (version 6.0+)
F. Application level security and Auditing
As covered in before, Redis lacks a robust Auditing system.
“slowlog-log-slower-than” can be used to note commands
which are taking longer than the expected time and therefore
find performance bottlenecks and also possibly detect DOS
attacks.
VIII. PERFORMANCE ANALYSIS OF SECURITY FEATURES
Although the previous section discusses security practices for
different scenarios, it is important to know the performance
impact associated with each feature to make an informed
decision.
A. Transport Layer Security
Using TLS we can encrypt network level traffic from the
server to client and vice versa. But, the continuous encryption and decryption as well
as the initial connection establishment adds in incremental
computational cost. [34]
Benchmarking research on TLS Protocol found that [35] the
selection criteria of particular encryption/decryption technique
can have major implications on performance.

-- 4 of 6 --

B. Access Control Lists (ACLs)
The introduction of ACL in 6.0 was an improvement on the
password-based model used earlier. But this came with defined drawback
in performance.
Each and every command that is executed by the client must
pass through the defined ACLs to validate if the said request is
allowed to perform the action or not.
C. Append Only File (AOF) Fsync Policies
AOF is an interesting feature that helps to improve the data
durability of Redis with the help of logging database states at
frequent intervals. Redis offers multiple configurations in
“appendfsync” command.
No: fastest mode, highest loss risk.
everysec: practical middle ground.
always: strongest durability with significant performance overhead.
IX. CONCLUSION
The paper provides a comprehensive security analysis of
Redis and covers its growth from initial tool designed only for
trusted networks to being actively deployed on public facing
networks. The initial philosophy which prioritized performance
over security led to vulnerabilities including large-scale
ransomware attacks.
The analysis concludes that Redis security is weaker on a
public network when compared to RDBMS but that is because
it was intended to be run on trusted networks only. Through
iteration, many of its original flaws have been fixed. Protected
mode and ACL introduced in Redis 6.0 makes it closer to
relational databases.
X. FUTURE WORK
After the discussions presented in this paper, there are
several future research options that could enhance the
application of Redis Security.
Firstly, while the paper discusses the performance impact of
security features, a further quantitative study can be performed.
Second, since Redis does not have built-in auditing support,
research could be done towards developing an open-source tool
to scan available Redis deployments and look for
misconfigurations.
Thirdly, a comparison based study for the different cloud
hosted Redis services like AWS ElastiCache, Google Cloud
Memorystore and Azure Cache for Redis would be insightful.
Fourth, a particular threat model for Kubernetes based
environments can be established.
Lastly, future research could investigate the security
implications of Redis in Artificial Intelligence and ML
pipelines.
REFERENCES
[1] https://Redis.io/docs/latest/operate/rs/security/recommended-security-practices/
[2] https://Redis.io/docs/latest/operate/rs/security/access-control/
[3] https://goteleport.com/blog/secure-Redis/
[4] A Comparative Study Of NoSQL System Vulnerabilities With Big Data
[5] https://Redis.io/compare/elasticache/
[6] Cobb, M. NoSQL security: Do NoSQL database security features stack up to RDBMS?
[7] Noiumkar P. and Chomsiri T., A Comparison the Level of Security on Top 5 Open Source NoSQLDatabases.
[8] Dadapeer, Indravasan, N. and G. A Survey on Security of NoSQL Databases.
[9] Farik, Mohammed & Lal, Nilesh & Prasad, Shalendra. A Review Of Authentication Methods.
[10] https://www.getastra.com/blog/security-audit/security-audits/
[11] https://docs.oracle.com/en/database/oracle/oracle-database/18/dbseg/introduction-to-auditing.html
[12] NoSQL security: can my data-driven decision-making be affected from outside?
[13] https://en.wikipedia.org/wiki/Shodan_(website)
[14] https://www.imperva.com/blog/archive/new-research-shows-75-of-open-Redis-servers-infected/
[15] https://antirez.com/news/118
[16] https://Redis.io/docs/latest/operate/oss_and_stack/management/persistence/
[17] Nikiforova, A., Daskevics, A., & Azeroual, O. (2020).
[18] https://Redis.io/docs/latest/develop/programmability/eval-intro/
[19] https://Redis.io/blog/security-advisory-cve-2024-31449-cve-2024-31227-cve-2024-31228/
[20] Warzecha, P., & Toman, P. (2021). NoSQL Injection.
[21] Manadhata, P. K., & Wing, J. M. (2011). An Attack Surface Metric.
[22] https://nvd.nist.gov/vuln/detail/CVE-2025-21605
[23] Amazon Web Services. (2025). At-rest encryption for Amazon ElastiCache.
[24] Redis.io. Access Control List documentation.
[25] Redis.io. High availability with Redis Sentinel.
[26] Redis.io. Redis Cluster specification.
[27] Redis.io. Redis Security documentation.
[28] Redis.io. Using Redis as an LRU cache.
[29] Redis.io. Encryption in Redis Enterprise Software.
[30] Saltzer, J. H., & Schroeder, M. D. (1975). The Protection of Information in Computer Systems.
[31] Snyk.io. (2024). 10 Redis security best practices.
[32] Yildiz, O. (2024). Mastering Redis Security.
[33] https://Redis.io/docs/latest/operate/oss_and_stack/management/security/
[34] Probabilistic Data Structures in the Wild: A Security Analysis of Redis.
[35] TLS Protocol Analysis Using IoTST.
[36] https://learn.microsoft.com/en-us/azure/Redis/best-practices-performance
[37] Understanding Redis Persistence: RDB vs. AOF.
[38] https://moldstud.com/articles/p-in-depth-comparison-of-Redis-persistence-mechanisms-exploring-rdb-aof-and-hybrid-approaches
[39] https://betterstack.com/community/questions/how-to-log-all-or-slow-Redis-queries/
[40] L. Ma, D. Zhao, Y. Gao and C. Zhao, Research on SQL Injection Attack and Prevention Technology.`,
    content: []
  }
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
const renderMarkdown = (text, isDarkMode = true, themePrimary = '#f43f5e') => {
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
    
    // Markdown links [text](url) - check it's not inside a code block
    const markdownLinkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    while ((match = markdownLinkPattern.exec(line)) !== null) {
      const isInsideCode = patterns.some(p => 
        p.type === 'code' && match.index >= p.start && match.index < p.end
      );
      if (!isInsideCode) {
        patterns.push({
          start: match.index,
          end: match.index + match[0].length,
          type: 'markdownLink',
          content: match[1], // link text
          url: match[2], // link URL
          fullMatch: match[0]
        });
      }
    }
    
    // Reset regex
    markdownLinkPattern.lastIndex = 0;
    
    // Plain URLs (https:// or http://) - check it's not inside a code block or markdown link
    // Match URL and trim trailing punctuation (., ,, ;, :, !, ?, ), ], }, etc.)
    const urlPattern = /(https?:\/\/[^\s<>"{}|\\^`\[\]]+)/g;
    while ((match = urlPattern.exec(line)) !== null) {
      const isInsideCode = patterns.some(p => 
        p.type === 'code' && match.index >= p.start && match.index < p.end
      );
      const isInsideMarkdownLink = patterns.some(p => 
        p.type === 'markdownLink' && match.index >= p.start && match.index < p.end
      );
      if (!isInsideCode && !isInsideMarkdownLink) {
        // Trim trailing punctuation that's likely sentence-ending, not part of URL
        let url = match[1];
        url = url.replace(/[.,;:!?)\]}\s]+$/, '');
        
        patterns.push({
          start: match.index,
          end: match.index + match[0].length,
          type: 'url',
          content: url,
          url: url,
          fullMatch: match[0]
        });
      }
    }
    
    // Reset regex
    urlPattern.lastIndex = 0;
    
    // Bold (**text**) - check it's not inside a code block or link
    const boldPattern = /\*\*([^*]+?)\*\*/g;
    while ((match = boldPattern.exec(line)) !== null) {
      const isInsideCode = patterns.some(p => 
        p.type === 'code' && match.index >= p.start && match.index < p.end
      );
      const isInsideLink = patterns.some(p => 
        (p.type === 'markdownLink' || p.type === 'url') && match.index >= p.start && match.index < p.end
      );
      if (!isInsideCode && !isInsideLink) {
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
    
    // Remove overlapping patterns (keep code over everything, links over bold)
    const filteredPatterns = [];
    for (let i = 0; i < patterns.length; i++) {
      const current = patterns[i];
      
      // If current is code, remove any existing patterns that overlap with it
      if (current.type === 'code') {
        // Remove overlapping non-code patterns
        for (let j = filteredPatterns.length - 1; j >= 0; j--) {
          const existing = filteredPatterns[j];
          if (existing.type !== 'code' && 
              current.start < existing.end && current.end > existing.start) {
            filteredPatterns.splice(j, 1);
          }
        }
        filteredPatterns.push(current);
        continue;
      }
      
      // For non-code patterns, check if they overlap with existing patterns
      const overlaps = filteredPatterns.some(existing => {
        // Code always wins - if existing is code and overlaps, skip current
        if (existing.type === 'code' && 
            current.start < existing.end && current.end > existing.start) {
          return true;
        }
        // Links don't overlap with each other
        if ((existing.type === 'markdownLink' || existing.type === 'url') && 
            (current.type === 'markdownLink' || current.type === 'url') &&
            current.start < existing.end && current.end > existing.start) {
          return true;
        }
        // Other overlaps
        return (current.start < existing.end && current.end > existing.start);
      });
      
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
      if (pattern.type === 'markdownLink' || pattern.type === 'url') {
        parts.push({ type: pattern.type, content: pattern.content, url: pattern.url, key: key++ });
      } else {
        parts.push({ type: pattern.type, content: pattern.content, key: key++ });
      }
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
    
    // Now process text parts for any remaining plain URLs that weren't caught by patterns
    const finalParts = [];
    let finalKey = 0;
    parts.forEach((part) => {
      if (part.type === 'text') {
        // Check for plain URLs in text parts
        // Match URL and trim trailing punctuation (., ,, ;, :, !, ?, ), ], }, etc.)
        const urlPattern = /(https?:\/\/[^\s<>"{}|\\^`\[\]]+)/g;
        let match;
        const urlMatches = [];
        let textLastIndex = 0;
        
        while ((match = urlPattern.exec(part.content)) !== null) {
          // Trim trailing punctuation that's likely sentence-ending, not part of URL
          let url = match[1];
          url = url.replace(/[.,;:!?)\]}\s]+$/, '');
          
          urlMatches.push({
            start: match.index,
            end: match.index + match[0].length,
            url: url,
            content: url
          });
        }
        
        if (urlMatches.length > 0) {
          urlMatches.forEach((urlMatch) => {
            // Add text before URL
            if (urlMatch.start > textLastIndex) {
              finalParts.push({ 
                type: 'text', 
                content: part.content.substring(textLastIndex, urlMatch.start), 
                key: finalKey++ 
              });
            }
            // Add URL
            finalParts.push({ 
              type: 'url', 
              content: urlMatch.content, 
              url: urlMatch.url, 
              key: finalKey++ 
            });
            textLastIndex = urlMatch.end;
          });
          
          // Add remaining text
          if (textLastIndex < part.content.length) {
            finalParts.push({ 
              type: 'text', 
              content: part.content.substring(textLastIndex), 
              key: finalKey++ 
            });
          }
        } else {
          finalParts.push({ ...part, key: finalKey++ });
        }
      } else {
        finalParts.push({ ...part, key: finalKey++ });
      }
    });
    
    return (
      <span key={lineIndex}>
        {finalParts.map((part) => {
          if (part.type === 'bold') {
            return <strong key={part.key} className="font-bold">{part.content}</strong>;
          } else if (part.type === 'code') {
            // Use theme colors for code blocks - convert hex to rgba for opacity
            const hexToRgba = (hex, alpha) => {
              const r = parseInt(hex.slice(1, 3), 16);
              const g = parseInt(hex.slice(3, 5), 16);
              const b = parseInt(hex.slice(5, 7), 16);
              return `rgba(${r}, ${g}, ${b}, ${alpha})`;
            };
            
            const themeColor = themePrimary;
            // For dark mode: brighter text, lighter background. For light mode: darker text, lighter background
            const codeTextColor = themeColor; // Use theme primary for text
            const codeBgColor = isDarkMode 
              ? hexToRgba(themeColor, 0.15) // 15% opacity theme color background in dark mode
              : hexToRgba(themeColor, 0.1); // 10% opacity theme color background in light mode
            const codeBorderColor = isDarkMode 
              ? hexToRgba(themeColor, 0.3) // 30% opacity theme color border in dark mode
              : hexToRgba(themeColor, 0.25); // 25% opacity theme color border in light mode
            
            return (
              <code 
                key={part.key} 
                className="px-1.5 py-0.5 rounded text-xs font-mono border"
                style={{
                  backgroundColor: codeBgColor,
                  color: codeTextColor,
                  borderColor: codeBorderColor
                }}
              >
                {part.content}
              </code>
            );
          } else if (part.type === 'markdownLink' || part.type === 'url') {
            return (
              <a
                key={part.key}
                href={part.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 font-medium transition-all duration-200 ${
                  isDarkMode
                    ? 'text-blue-400 hover:text-blue-300 underline decoration-blue-400/50 hover:decoration-blue-300/80 underline-offset-2'
                    : 'text-blue-600 hover:text-blue-700 underline decoration-blue-500/50 hover:decoration-blue-600/80 underline-offset-2'
                } hover:underline-offset-4`}
              >
                {part.content}
                <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
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


const AIMessage = React.memo(({ text, animate, isDarkMode, themePrimary }) => {
  const typedText = useTypewriter(text, 3.5, animate); // 70% of 5ms = 3.5ms (faster typing)
  return <span className="whitespace-pre-wrap">{renderMarkdown(typedText, isDarkMode, themePrimary)}</span>;
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
// Simple button that opens the resume Google Drive link directly
const ResumeDownloadButton = React.memo(() => {
  const resumeLink = "https://drive.google.com/file/d/1H8ZTNXFufDtUX8RLPM-vY65j8p47s6Sw/view?usp=sharing";

  return (
    <a
      href={resumeLink}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[var(--theme-primary)] text-white px-8 md:px-10 py-4 md:py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:translate-y-[-4px] transition-all shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-3 active:scale-95 group border-t border-white/20 touch-manipulation min-h-[44px]"
    >
      <FileText size={18} className="group-hover:animate-bounce" />
      <span>View Resume</span>
    </a>
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
          <ResumeDownloadButton />
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
                }`} style={{ whiteSpace: 'pre-line' }}>{p.desc}</p>
                
                {/* Dynamic Footer: Tech Brief or Explicit Link */}
                <div className={`mt-auto pt-6 border-t flex items-center justify-between ${
                  isDarkMode ? 'border-white/5' : 'border-slate-200/50'
                }`}>
                  {p.hideCta ? (
                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${
                      isDarkMode ? 'text-slate-600' : 'text-slate-500'
                    }`}>-</span>
                  ) : (
                    <>
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
                    </>
                  )}
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
                          
                          {/* Dean's List Achievement */}
                          {sem.deansList && (
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
                                    <Award size={14} className="text-[var(--theme-primary)]" />
                                  </div>
                                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                                    isDarkMode ? 'text-[var(--theme-primary)]' : 'text-[var(--theme-primary)]'
                                  }`}>
                                    Dean's List
                                  </span>
                                </div>
                                <p className={`text-xs font-medium ${
                                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                                }`}>
                                  Recognized for academic excellence
                                </p>
                              </div>
                          )}
                          
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

const ArticlesSection = React.memo(({ isDarkMode, onOpenArticle }) => (
  <section id="articles" className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-14 reveal">
        <h2 className={`text-4xl md:text-6xl font-black tracking-tighter uppercase mb-5 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Articles<span className="text-[var(--theme-primary)]">.</span>
        </h2>
        <p className={`text-sm md:text-base font-medium max-w-3xl mx-auto ${
          isDarkMode ? 'text-slate-400' : 'text-slate-600'
        }`}>
          Two long-form pieces from my writing journey - one on sequence models and attention, and one research-style security analysis on Redis deployments.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 reveal">
        {[...articlesData]
          .sort((a, b) => {
            if (a.id === 'redis-security') return -1;
            if (b.id === 'redis-security') return 1;
            return 0;
          })
          .map((article) => (
          <button
            key={article.id}
            type="button"
            onClick={() => onOpenArticle(article)}
            className={`group text-left p-0 rounded-[2rem] border overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(var(--theme-glow),0.5)] ${
              isDarkMode
                ? 'bg-white/[0.03] border-white/10 hover:border-white/25'
                : 'bg-white/80 border-slate-200/60 hover:border-slate-300/80'
            }`}
          >
            {article.coverImage ? (
              <div className="h-56 overflow-hidden relative">
                <img
                  src={article.coverImage}
                  alt={article.coverAlt || article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">{article.source}</span>
                  <ArrowUpRight size={18} className="text-white/90" />
                </div>
              </div>
            ) : (
              <div className={`h-40 relative overflow-hidden ${
                isDarkMode ? 'bg-slate-900' : 'bg-slate-100'
              }`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(var(--theme-glow),0.5),transparent_60%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(var(--theme-glow),0.35),transparent_55%)]" />
                <div className="relative h-full px-6 py-5 flex items-end justify-between">
                  <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 border ${
                    isDarkMode ? 'border-white/15 bg-white/5' : 'border-slate-300/70 bg-white/80'
                  }`}>
                    <FileText size={13} className="text-[var(--theme-primary)]" />
                    <span className={`text-[10px] font-black uppercase tracking-[0.14em] ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Research Paper
                    </span>
                  </div>
                  <ArrowUpRight size={18} className={isDarkMode ? 'text-slate-300' : 'text-slate-700'} />
                </div>
              </div>
            )}

            <div className="p-7 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-xl ${
                  isDarkMode ? 'bg-white/10' : 'bg-[var(--theme-primary)]/10'
                }`}>
                  <FileText size={16} className="text-[var(--theme-primary)]" />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {article.published} - {article.readTime}
                </span>
              </div>

              <h3 className={`text-2xl md:text-3xl font-black tracking-tight mb-2 leading-tight ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {article.title}
              </h3>
              <p className={`text-sm font-semibold mb-4 ${
                isDarkMode ? 'text-[var(--theme-primary)]' : 'text-[var(--theme-primary)]'
              }`}>
                {article.subtitle}
              </p>
              <p className={`text-sm leading-relaxed mb-5 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {article.summary}
              </p>

              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                      isDarkMode
                        ? 'text-slate-300 border-white/15 bg-white/5'
                        : 'text-slate-700 border-slate-300/70 bg-white/80'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  </section>
));

const ArticleReaderOverlay = React.memo(({ article, isDarkMode, onClose }) => {
  if (!article) return null;
  const isPaperMode = Boolean(article.paperMeta && article.fullText);

  const paperBlocks = React.useMemo(() => {
    if (!article.fullText) return [];

    const lines = article.fullText.split('\n');
    const blocks = [];
    let paragraphBuffer = [];

    const flushParagraph = () => {
      if (!paragraphBuffer.length) return;
      blocks.push({ type: 'paragraph', text: paragraphBuffer.join(' ').replace(/\s+/g, ' ').trim() });
      paragraphBuffer = [];
    };

    lines.forEach((rawLine) => {
      const line = rawLine.trim().replace(/\t+/g, ' ');

      if (!line) {
        flushParagraph();
        blocks.push({ type: 'spacer' });
        return;
      }

      const isMainHeading = /^[IVX]+\.\s/.test(line) || line === "REFERENCES";
      const isSubHeading = /^[A-Z]\.\s/.test(line);
      const isPageMarker = /^--\s\d+\sof\s\d+\s--$/.test(line);
      const isReference = /^\[\d+\]/.test(line);
      const isBullet = /^[-•]\s/.test(line);
      const isSpecialStandalone =
        line.startsWith("Abstract—") ||
        line.startsWith("Keywords—") ||
        line.startsWith("No:") ||
        line.startsWith("everysec:") ||
        line.startsWith("always:");

      if (isPageMarker || isMainHeading || isSubHeading || isReference || isBullet || isSpecialStandalone) {
        flushParagraph();
        blocks.push({
          type: isPageMarker
            ? 'page'
            : isMainHeading
              ? 'mainHeading'
              : isSubHeading
                ? 'subHeading'
                : isReference
                  ? 'reference'
                  : isBullet
                    ? 'bullet'
                    : 'line',
          text: line
        });
        return;
      }

      paragraphBuffer.push(line);
    });

    flushParagraph();
    return blocks;
  }, [article.fullText]);

  const renderPaperLine = (line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return <div key={`sp-${index}`} className="h-4" />;

    const isMainHeading = /^[IVX]+\.\s/.test(trimmed) || trimmed === "REFERENCES";
    const isSubHeading = /^[A-Z]\.\s/.test(trimmed);
    const isPageMarker = /^--\s\d+\sof\s\d+\s--$/.test(trimmed);

    return (
      <p
        key={`ln-${index}`}
        className={`whitespace-pre-wrap ${
          isPageMarker
            ? isDarkMode
              ? 'text-slate-500 text-xs text-center'
              : 'text-slate-500 text-xs text-center'
            : isMainHeading
              ? isDarkMode
                ? 'text-white font-black text-base mt-5 mb-2'
                : 'text-slate-900 font-black text-base mt-5 mb-2'
              : isSubHeading
                ? isDarkMode
                  ? 'text-slate-100 font-bold text-sm mt-3 mb-1'
                  : 'text-slate-900 font-bold text-sm mt-3 mb-1'
                : isDarkMode
                  ? 'text-slate-300 text-sm md:text-[15px] leading-relaxed'
                  : 'text-slate-700 text-sm md:text-[15px] leading-relaxed'
        }`}
      >
        {line}
      </p>
    );
  };

  return (
    <div
      className={`fixed inset-0 z-[95] flex items-center justify-center p-3 md:p-6 backdrop-blur-sm ${
        isDarkMode ? 'bg-black/70' : 'bg-slate-900/45'
      }`}
    >
      <div className="absolute inset-0" onClick={onClose} />
      <div
        className={`relative w-full max-w-5xl max-h-[92vh] rounded-[2rem] border overflow-hidden ${
          isDarkMode
            ? 'bg-[#0a0a0f]/95 border-white/10'
            : 'bg-white/95 border-slate-200/80'
        }`}
      >
        <div className={`px-6 md:px-8 py-5 border-b flex items-start justify-between gap-4 ${
          isDarkMode ? 'border-white/10' : 'border-slate-200/80'
        }`}>
          <div>
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {article.source} - {article.published}
            </p>
            {!isPaperMode && (
              <>
                <h3 className={`text-2xl md:text-3xl font-black tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {article.title}
                </h3>
                <p className={`text-sm mt-1 font-semibold ${
                  isDarkMode ? 'text-[var(--theme-primary)]' : 'text-[var(--theme-primary)]'
                }`}>
                  {article.subtitle}
                </p>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? 'hover:bg-white/10' : 'hover:bg-slate-100'
            }`}
            aria-label="Close article"
          >
            <X size={20} className={isDarkMode ? 'text-slate-300' : 'text-slate-700'} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(92vh-96px)] px-6 md:px-8 py-6 md:py-7">
          {article.coverImage && (
            <div className="mb-6 rounded-2xl overflow-hidden border border-white/10">
              <img
                src={article.coverImage}
                alt={article.coverAlt || article.title}
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

          {!isPaperMode && (
            <p className={`text-base leading-relaxed mb-7 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {article.summary}
            </p>
          )}

          {article.fullText ? (
            <div className="space-y-0">
              {article.paperMeta && (
                <div className="mb-8 text-center">
                  <h4 className={`text-xl md:text-2xl font-black tracking-tight ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {article.paperMeta.title}
                  </h4>
                  <p className={`mt-3 text-base font-bold ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    {article.paperMeta.author}
                  </p>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {article.paperMeta.affiliation}
                  </p>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {article.paperMeta.email}
                  </p>
                </div>
              )}
              <div>
                {paperBlocks.map((block, index) => {
                  if (block.type === 'spacer') {
                    return <div key={`sp-${index}`} className="h-4" />;
                  }
                  if (block.type === 'page') return null;
                  if (block.type === 'mainHeading') {
                    return (
                      <p
                        key={`mh-${index}`}
                        className={`font-black text-base mt-5 mb-2 ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === 'subHeading') {
                    return (
                      <p
                        key={`sh-${index}`}
                        className={`font-bold text-sm mt-3 mb-1 ${
                          isDarkMode ? 'text-slate-100' : 'text-slate-900'
                        }`}
                      >
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === 'reference' || block.type === 'bullet' || block.type === 'line') {
                    return renderPaperLine(block.text, index);
                  }
                  return (
                    <p
                      key={`p-${index}`}
                      className={`text-sm md:text-[15px] leading-relaxed ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      {block.text}
                    </p>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-7">
              {article.content.map((part) => (
                <section key={part.heading}>
                  <h4 className={`text-lg md:text-xl font-black tracking-tight mb-3 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {part.heading}
                  </h4>
                  <div className="space-y-4">
                    {part.paragraphs.map((paragraph, idx) => (
                      <p
                        key={`${part.heading}-${idx}`}
                        className={`text-sm md:text-[15px] leading-relaxed ${
                          isDarkMode ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {part.figures?.length > 0 && (
                    <div className="mt-5 space-y-4">
                      {part.figures.map((figure, figIdx) => (
                        <div
                          key={`${part.heading}-fig-${figIdx}`}
                          className={`rounded-2xl border overflow-hidden ${
                            isDarkMode ? 'border-white/10 bg-white/[0.02]' : 'border-slate-200/80 bg-slate-50'
                          }`}
                        >
                          {figure.src ? (
                            <img
                              src={figure.src}
                              alt={figure.caption || `${part.heading} figure ${figIdx + 1}`}
                              className="w-full h-auto object-contain"
                              loading="lazy"
                              decoding="async"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className={`px-4 py-5 text-sm ${
                              isDarkMode ? 'text-slate-300' : 'text-slate-700'
                            }`}>
                              Figure available in original post.
                            </div>
                          )}
                          <div className={`px-4 py-3 border-t text-xs ${
                            isDarkMode ? 'border-white/10 text-slate-400' : 'border-slate-200/80 text-slate-600'
                          }`}>
                            <span className="font-semibold">{figure.caption}</span>
                            {figure.source && <span>{`  Source: ${figure.source}`}</span>}
                            {figure.sourceUrl && (
                              <a
                                href={figure.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 font-bold text-[var(--theme-primary)] hover:underline"
                              >
                                Open
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          )}

          <div className={`mt-8 pt-6 border-t flex flex-wrap items-center gap-3 ${
            isDarkMode ? 'border-white/10' : 'border-slate-200/80'
          }`}>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                  isDarkMode
                    ? 'text-slate-300 border-white/15 bg-white/5'
                    : 'text-slate-700 border-slate-300/70 bg-slate-50'
                }`}
              >
                {tag}
              </span>
            ))}
            {article.link && (
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`ml-auto inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] px-4 py-2 rounded-full border transition-colors ${
                  isDarkMode
                    ? 'text-white border-white/20 hover:bg-white/10'
                    : 'text-slate-900 border-slate-300 hover:bg-slate-100'
                }`}
              >
                Read Original
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

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
  const [activeArticle, setActiveArticle] = useState(null);
  
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

CRITICAL FORMATTING RULES (MUST FOLLOW):
- Use **bold** for numbers, years, percentages (e.g., **3 years**, **83%**, **2022**)
- ALWAYS wrap ALL technical terms, technologies, frameworks, tools, and programming languages in backticks: \`YOLOv3\`, \`AWS Rekognition\`, \`ResNet50\`, \`Grad-CAM\`, \`PoseNet\`, \`Python\`, \`Java\`, \`Kubernetes\`, \`Node.js\`, \`Spring Boot\`, \`AWS\`, \`Docker\`, etc.
- Examples of CORRECT formatting:
  * "I designed an edge surveillance module utilizing \`YOLOv3\` for social distancing detection and \`AWS Rekognition\`"
  * "I developed an Image Classification project using \`ResNet50\` and \`Grad-CAM\`"
  * "I built a \`PoseNet\` Recognition system for tracking hand gestures"
- If you mention ANY technology, framework, tool, or programming language, it MUST be wrapped in backticks\n`;
      
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
    if (!activeArticle) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveArticle(null);
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeArticle]);

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

      const sections = ['home', 'experience', 'projects', 'leadership', 'education', 'articles', 'recommendations'];
      
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

  const openArticle = useCallback((article) => {
    setActiveArticle(article);
  }, []);

  const closeArticle = useCallback(() => {
    setActiveArticle(null);
  }, []);

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

      <ArticleReaderOverlay
        article={activeArticle}
        isDarkMode={isDarkMode}
        onClose={closeArticle}
      />

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
                        {msg.role === 'assistant' ? <AIMessage text={msg.text} animate={msg.animate} isDarkMode={isDarkMode} themePrimary={themes[activeTheme].primary} /> : msg.text}
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
                  <input 
                    type="text" 
                    value={chatInput} 
                    onChange={(e) => setChatInput(e.target.value)} 
                    placeholder="Ask about projects..." 
                    autoComplete="off"
                    // Use 16px (text-base) minimum to prevent iOS Safari/Chrome from auto-zooming when input is focused on mobile
                    style={!isDarkMode ? { color: '#0f172a' } : {}} 
                    className={`relative w-full border-2 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-base placeholder-slate-500 focus:outline-none transition-all shadow-inner touch-manipulation ${
                    isDarkMode 
                      ? 'bg-[#0a0a0a] border-white/10 text-white focus:border-white/30' 
                      : 'bg-white/98 border-[var(--theme-primary)]/40 text-slate-900 focus:border-[var(--theme-primary)]/70 focus:ring-2 focus:ring-[var(--theme-primary)]/30 shadow-[var(--theme-primary)]/10'
                  }`} 
                  />
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
          <div className={`grid ${isCompact ? 'gap-0 w-full' : 'gap-4 w-full'} flex-1 ${isExpanding ? 'transition-all duration-[1000ms] ease-[cubic-bezier(0.2,1.5,0.2,1)]' : 'transition-all duration-[900ms] ease-[cubic-bezier(0.34,1.6,0.64,1)]'} relative overflow-visible items-center`} style={{ gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))` }}>
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
                left: `calc(${navItems.findIndex(i => i.id === activeSection) * (100/navItems.length)}% + ${(100/(navItems.length * 2))}%)`, 
                width: isCompact ? '36px' : `${100/navItems.length}%`, 
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
          <ArticlesSection isDarkMode={isDarkMode} onOpenArticle={openArticle} />
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