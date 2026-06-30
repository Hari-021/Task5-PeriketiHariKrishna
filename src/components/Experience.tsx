import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Briefcase, ChevronRight, Award, Server, Code, Database } from 'lucide-react';

interface TimelineEventProps {
  index: number;
  date: string;
  title: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  projectId?: string;
  onViewProject?: (projectId: string) => void;
}

function TimelineEvent({
  index,
  date,
  title,
  role,
  company,
  description,
  tags,
  icon,
  projectId,
  onViewProject,
}: TimelineEventProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex flex-col md:flex-row items-stretch md:justify-between mb-12 md:mb-16">
      {/* Visual Timeline Node Connector (line) */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2 hidden md:block"></div>

      {/* Middle Dot Icon */}
      <div className="absolute left-4 md:left-1/2 top-3 w-8 h-8 rounded-full border-4 border-white bg-accent-primary text-white flex items-center justify-center -translate-x-1/2 shadow-md z-10 transition-transform duration-300 hover:scale-110">
        {icon}
      </div>

      {/* Left side space on desktop (if event is odd index, card on right; if even index, card on left) */}
      <div className={`w-full md:w-[45%] pl-12 md:pl-0 flex ${isEven ? 'justify-end' : 'order-last md:order-none'}`}>
        {isEven && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-6 md:p-8 rounded-3xl border border-slate-100 hover:shadow-md transition-all duration-300 w-full hover:border-accent-primary/20 group text-right"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold text-accent-primary bg-blue-50">
              <Calendar size={12} />
              {date}
            </span>
            <h3 className="font-heading font-bold text-xl text-slate-900 mt-3">{title}</h3>
            <p className="font-semibold text-accent-secondary text-sm font-heading">{role} — {company}</p>
            <p className="text-text-secondary text-sm mt-3 leading-relaxed text-right font-sans">
              {description}
            </p>
            
            {/* Tech badges */}
            <div className="flex flex-wrap gap-1.5 mt-4 justify-end">
              {tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-150 text-[11px] font-mono text-slate-500">
                  {tag}
                </span>
              ))}
            </div>

            {projectId && onViewProject && (
              <button
                onClick={() => onViewProject(projectId)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-primary hover:text-accent-secondary mt-5 transition-colors duration-200 font-button ml-auto"
              >
                <span>View Case Study</span>
                <ChevronRight size={14} />
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Spacer center columns */}
      <div className="w-16 hidden md:block"></div>

      {/* Right side space on desktop */}
      <div className={`w-full md:w-[45%] pl-12 md:pl-0 flex ${!isEven ? 'justify-start' : ''}`}>
        {!isEven && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-6 md:p-8 rounded-3xl border border-slate-100 hover:shadow-md transition-all duration-300 w-full hover:border-accent-primary/20 group text-left"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold text-accent-primary bg-blue-50">
              <Calendar size={12} />
              {date}
            </span>
            <h3 className="font-heading font-bold text-xl text-slate-900 mt-3">{title}</h3>
            <p className="font-semibold text-accent-secondary text-sm font-heading">{role} — {company}</p>
            <p className="text-text-secondary text-sm mt-3 leading-relaxed font-sans">
              {description}
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-150 text-[11px] font-mono text-slate-500">
                  {tag}
                </span>
              ))}
            </div>

            {projectId && onViewProject && (
              <button
                onClick={() => onViewProject(projectId)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-primary hover:text-accent-secondary mt-5 transition-colors duration-200 font-button"
              >
                <span>View Case Study</span>
                <ChevronRight size={14} />
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

interface ExperienceProps {
  onViewProject: (projectId: string) => void;
}

export default function Experience({ onViewProject }: ExperienceProps) {
  
  const timelineEvents = [
    {
      date: "Phase 1: Internship Onboarding",
      title: "Full Stack Development Internship",
      role: "Graduate Intern",
      company: "Decode Labs",
      description: "Began my internship at Decode Labs focusing on full-stack architecture design. Spearheaded project configurations, researched low-poly 3D graphics loading pipelines, and set up REST API structures using Python FastAPI and Express templates.",
      tags: ["React", "TypeScript", "Vite", "FastAPI", "Express", "Node.js"],
      icon: <Briefcase size={14} />,
    },
    {
      date: "Phase 2: Project 1 Deployment",
      title: "Nexus University Smart Campus Platform",
      role: "3D WebGL Developer",
      company: "Decode Labs",
      description: "Designed a 3D digital twin command center of a college campus. Built low-poly GLTF models in Blender, implemented instant component rendering cycles via WebGL caching layers, and connected classroom telemetry using FastAPI WebSocket server pipelines.",
      tags: ["Three.js", "React Three Fiber", "Tailwind CSS", "FastAPI", "WebSockets"],
      icon: <Code size={14} />,
      projectId: "nexus-university",
    },
    {
      date: "Phase 3: Project 2 Deployment",
      title: "SubTracker 3D FinTech Portal",
      role: "Full Stack Developer",
      company: "Decode Labs",
      description: "Coded a subscriber cost analytics portal. Built 3D circular charts rendering payment volumes. Standardized secure credentials and JSON Web Token (JWT) sessions, tracking relational schema metrics inside MongoDB NoSQL tables.",
      tags: ["React", "Node.js", "Express", "MongoDB", "JWT", "Three.js"],
      icon: <Server size={14} />,
      projectId: "subtracker-3d",
    },
    {
      date: "Phase 4: Project 3 Deployment",
      title: "Restaurant Order Management POS",
      role: "Backend Architect",
      company: "Decode Labs",
      description: "Designed a Point of Sale application resolving transactions. Implemented a dual-database pattern using SQLite to secure billing histories and MongoDB to model custom menus, validated with FastAPI Pydantic configurations.",
      tags: ["FastAPI", "Python", "SQLite", "MongoDB", "SQLAlchemy", "Pydantic"],
      icon: <Database size={14} />,
      projectId: "restaurant-pos",
    },
    {
      date: "Phase 5: Project 4 Deployment",
      title: "AI Interview Preparation Portal",
      role: "Full Stack AI Engineer",
      company: "Decode Labs",
      description: "Engineered a candidate evaluation portal. Integrated speech-to-text recording, processed answer texts using NLP prompts, and structured Postgres relational databases utilizing cloud-hosted Supabase instances.",
      tags: ["React", "TypeScript", "Supabase", "Supabase Auth", "Web Speech API"],
      icon: <Award size={14} />,
      projectId: "ai-interview-prep",
    }
  ];

  return (
    <section id="experience" className="py-24 bg-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="bg-blob blob-blue top-1/2 -left-48"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent-primary bg-blue-50 px-3 py-1 rounded-full">
            Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mt-4 leading-tight">
            Decode Labs Internship Timeline
          </h2>
          <p className="text-text-secondary mt-4 font-sans text-base md:text-lg">
            Chronological progression of architectural designs, platforms, and AI integrations built during my tenure as a Full Stack Graduate Intern.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-5xl mx-auto pt-6">
          {/* Vertical line for mobile view */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-100 -translate-x-1/2 md:hidden"></div>

          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={index}
              index={index}
              date={event.date}
              title={event.title}
              role={event.role}
              company={event.company}
              description={event.description}
              tags={event.tags}
              icon={event.icon}
              projectId={event.projectId}
              onViewProject={onViewProject}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
