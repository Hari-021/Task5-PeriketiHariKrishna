import { useEffect, Fragment } from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, ExternalLink, Code, Layers, ShieldCheck, Star } from 'lucide-react';
import { Github } from './BrandIcons';
import type { Project } from '../data/projectsData';

interface CaseStudyProps {
  project: Project;
  onBack: () => void;
}

export default function CaseStudy({ project, onBack }: CaseStudyProps) {
  // Scroll to top when mounting the case study page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  const { caseStudy } = project;

  return (
    <div className="min-h-screen bg-bg-secondary pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-accent-primary font-semibold transition-colors duration-200 mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Main Page</span>
        </button>

        {/* Case Study Wrapper */}
        <div className="space-y-12">
          
          {/* 1. Hero Banner */}
          <div className={`rounded-3xl bg-gradient-to-tr ${caseStudy.heroBannerBg} p-8 md:p-12 text-white relative overflow-hidden shadow-xl`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10 space-y-4 max-w-3xl">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-mono font-bold border border-white/10">
                Case Study: {project.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl font-heading text-slate-100 font-medium">
                {project.subtitle}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-xs font-button flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-md border border-slate-800"
                >
                  <Github size={14} />
                  <span>View Repository</span>
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-white text-slate-800 font-semibold text-xs font-button flex items-center gap-2 hover:bg-slate-100 transition-colors shadow-md border border-slate-100"
                >
                  <ExternalLink size={14} />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>

            {/* floating abstract node graph background */}
            <div className="absolute right-10 bottom-0 opacity-15 hidden md:block select-none pointer-events-none font-mono text-[16rem] font-bold leading-none transform translate-y-8">
              {project.image}
            </div>
          </div>

          {/* Grid Layout for Meta Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side: Problem, objectives and architecture */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Problem Statement */}
              <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-100/80 shadow-sm space-y-4">
                <h2 className="font-heading font-bold text-2xl text-slate-900">1. Problem Statement</h2>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed font-sans">
                  {caseStudy.problem}
                </p>
              </div>

              {/* Project Objectives */}
              <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-100/80 shadow-sm space-y-4">
                <h2 className="font-heading font-bold text-2xl text-slate-900">2. Development Objectives</h2>
                <ul className="space-y-3">
                  {caseStudy.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm font-medium font-sans">
                      <CheckCircle2 size={16} className="text-accent-primary mt-0.5 flex-shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual System Architecture Diagram */}
              <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-100/80 shadow-sm space-y-6">
                <h2 className="font-heading font-bold text-2xl text-slate-900">3. System Architecture Diagram</h2>
                <p className="text-text-secondary text-sm leading-relaxed font-sans">
                  {caseStudy.architectureText}
                </p>
                
                {/* Visual Architecture Representation */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 font-sans space-y-4">
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono text-slate-400 uppercase tracking-widest">
                    <Layers size={14} /> Pipeline flow
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    {caseStudy.architectureSteps.map((step, idx) => (
                      <Fragment key={idx}>
                        <div className="p-4 rounded-xl bg-white border border-slate-150 text-center shadow-sm relative group hover:border-accent-primary transition-all duration-300">
                          <span className="w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center font-mono font-bold text-xs absolute -top-3 left-1/2 -translate-x-1/2 shadow">
                            {idx + 1}
                          </span>
                          <p className="text-xs font-semibold text-slate-800 mt-2 leading-relaxed">
                            {step.split(" ")[0]} {step.split(" ")[1] || ""}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                            {step.split(" ").slice(2).join(" ")}
                          </p>
                        </div>
                        {idx < caseStudy.architectureSteps.length - 1 && (
                          <div className="hidden md:flex justify-center text-slate-300">
                            <ChevronRight size={20} />
                          </div>
                        )}
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Implementation */}
              <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-100/80 shadow-sm space-y-4">
                <h2 className="font-heading font-bold text-2xl text-slate-900">4. Implementation Breakdown</h2>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed font-sans whitespace-pre-line">
                  {caseStudy.implementation}
                </p>
              </div>

              {/* Mock Dashboard Frame (Simulating Screenshots) */}
              <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-100/80 shadow-sm space-y-4">
                <h2 className="font-heading font-bold text-2xl text-slate-900">5. Staging Console View</h2>
                
                <div className="rounded-2xl border border-slate-950 overflow-hidden shadow-lg bg-slate-950 text-slate-300 font-mono text-xs">
                  {/* Console Header Bar */}
                  <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex justify-between items-center select-none">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    </div>
                    <span className="text-[10px] text-slate-500">terminal@hari-krishna:~</span>
                    <span className="w-4"></span>
                  </div>
                  
                  {/* Console Content Mock output */}
                  <div className="p-5 space-y-3 overflow-x-auto text-[11px] leading-relaxed text-slate-400">
                    <p className="text-slate-500"># Initializing deployment handshake logs for {project.id}...</p>
                    <p className="text-emerald-400">✔ Loaded framework: React Vite (TypeScript target ES2022)</p>
                    <p className="text-emerald-400">✔ Database connection handshake established successfully.</p>
                    <p className="text-indigo-400">ℹ Running internal health checks: 0 vulnerabilities found.</p>
                    <p className="text-slate-500"># Active Server Metrics:</p>
                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800/80 space-y-1">
                      <p>CPU Usage: <span className="text-amber-400">2.1%</span> | Memory allocation: <span className="text-amber-400">128MB / 512MB</span></p>
                      <p>API Endpoint latency: <span className="text-emerald-400">4.8ms average</span></p>
                      <p>Active websocket connections: <span className="text-emerald-400">80 channels verified</span></p>
                    </div>
                    <p className="text-white font-semibold">&gt; systemctl status dashboard.service --full</p>
                    <p className="text-emerald-400">● dashboard.service - Production Build Web App</p>
                    <p className="text-slate-300">   Loaded: loaded (/etc/systemd/system/dashboard.service; enabled; vendor preset: enabled)</p>
                    <p className="text-slate-300">   Active: <span className="text-emerald-400">active (running)</span> since Tue 2026-06-30 04:18:27 UTC; 3h ago</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right side: Role, Tech Stack, Challenges & Solutions */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Role & Context */}
              <div className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">My Ownership</span>
                <h3 className="font-heading font-bold text-lg text-slate-800">{caseStudy.role}</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-sans">
                  Responsible for configuring files, coding modules, performing debugging iterations, database tuning, and API testing under mentorship at Decode Labs.
                </p>
              </div>

              {/* Detailed Tech stack */}
              <div className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
                <h3 className="font-heading font-bold text-lg text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Code size={18} className="text-accent-primary" /> Technologies Used
                </h3>
                
                <div className="space-y-4">
                  {caseStudy.techStack.map((group, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <h4 className="font-heading font-bold text-xs text-slate-400 uppercase tracking-widest">{group.category}</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {group.techs.map((tech) => (
                          <span key={tech} className="px-2 py-1 rounded bg-slate-50 border border-slate-150 text-[10px] font-mono text-slate-500">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenges and Solutions */}
              <div className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
                <h3 className="font-heading font-bold text-lg text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-accent-secondary" /> Key Challenges & Solutions
                </h3>

                <div className="space-y-6">
                  {caseStudy.challenges.map((chal, i) => (
                    <div key={i} className="space-y-2 border-b border-slate-100 last:border-b-0 pb-4 last:pb-0">
                      <h4 className="font-heading font-bold text-sm text-slate-800 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0"></span>
                        {chal.title}
                      </h4>
                      <div className="text-xs text-slate-500 font-sans leading-relaxed pl-3 space-y-2">
                        <p><strong className="text-slate-700">Problem:</strong> {chal.problem}</p>
                        <p className="bg-emerald-50/50 p-2 rounded-lg border border-emerald-100 text-emerald-800"><strong className="text-emerald-900">Solution:</strong> {chal.solution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key performance results */}
              <div className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-lg text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Star size={18} className="text-amber-500" /> Performance Metrics
                </h3>
                <ul className="space-y-3">
                  {caseStudy.results.map((res, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium font-sans">
                      <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills Learned */}
              <div className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-lg text-slate-800 border-b border-slate-100 pb-3">Skills Acquired</h3>
                <div className="flex flex-wrap gap-1.5">
                  {caseStudy.skillsLearned.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded bg-blue-50/50 border border-blue-100 text-[10px] font-mono font-bold text-accent-primary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Future Enhancements */}
              <div className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-lg text-slate-800 border-b border-slate-100 pb-3">Project Roadmap</h3>
                <ul className="space-y-2 text-xs text-slate-500 font-sans leading-relaxed">
                  {caseStudy.futureEnhancements.map((enh, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-slate-400 flex-shrink-0"></span>
                      <span>{enh}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
