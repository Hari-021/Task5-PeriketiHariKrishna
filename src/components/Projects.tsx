import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Github } from './BrandIcons';
import { projectsData } from '../data/projectsData';
import type { Project } from '../data/projectsData';

interface ProjectCardProps {
  project: Project;
  onViewProject: (projectId: string) => void;
  index: number;
}

function ProjectCard({ project, onViewProject, index }: ProjectCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Get project specific illustrations / gradients
  const getBannerGradient = (id: string) => {
    switch (id) {
      case 'nexus-university':
        return 'from-blue-600 to-indigo-600';
      case 'subtracker-3d':
        return 'from-purple-600 to-indigo-700';
      case 'restaurant-pos':
        return 'from-emerald-500 to-teal-600';
      case 'ai-interview-prep':
        return 'from-pink-500 to-rose-600';
      default:
        return 'from-blue-500 to-purple-600';
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="glass-card rounded-3xl overflow-hidden border border-slate-100 flex flex-col h-full hover:border-accent-primary/20 hover:shadow-xl transition-all duration-300 group"
    >
      {/* Visual Header/Banner with custom premium illustration designs */}
      <div className={`h-48 md:h-56 bg-gradient-to-tr ${getBannerGradient(project.id)} relative flex items-center justify-center p-6 text-white overflow-hidden`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none"></div>
        
        {/* Floating background design elements */}
        <div className="absolute bottom-4 left-6 opacity-20 font-mono text-8xl font-black select-none pointer-events-none">
          {project.image}
        </div>

        {/* Dynamic Title / Concept Visual */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-2">
          <span className="text-4xl filter drop-shadow-md select-none">{project.image}</span>
          <span className="text-xs uppercase tracking-widest font-mono font-bold bg-white/15 px-3 py-1 rounded-full border border-white/10 select-none">
            {project.category}
          </span>
        </div>

        {/* Floating card decor representing active server nodes */}
        <div className="absolute bottom-3 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/40 backdrop-blur-md border border-white/5 text-[10px] font-mono text-slate-100/90 shadow-sm select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          Active Node
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow space-y-5">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-accent-secondary">
            {project.category}
          </span>
          <h3 className="text-2xl font-heading font-bold text-slate-900 leading-snug group-hover:text-accent-primary transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-slate-500 font-semibold font-heading text-xs">
            {project.subtitle}
          </p>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed font-sans flex-grow">
          {project.description}
        </p>

        {/* Key Features checkbox highlights */}
        <div className="space-y-2 border-t border-slate-50 pt-4">
          <h4 className="font-heading font-bold text-[11px] text-slate-400 uppercase tracking-widest">Key Deliverables</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.features.slice(0, 4).map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <CheckCircle2 size={13} className="text-accent-primary flex-shrink-0" />
                <span className="truncate">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-50">
          {project.tech.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-100 text-[11px] font-mono text-slate-500">
              {t}
            </span>
          ))}
        </div>

        {/* Action triggers */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-auto">
          {/* View Case Study button */}
          <button
            onClick={() => onViewProject(project.id)}
            className="flex-grow btn-accent py-2.5 text-xs font-bold font-button flex items-center justify-center gap-2 group-hover:scale-[1.01] transition-all"
          >
            <span>View Case Study</span>
            <ArrowRight size={14} />
          </button>

          {/* GitHub links */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-800 text-slate-600 hover:text-slate-900 transition-colors"
            title="GitHub Repository"
          >
            <Github size={16} />
          </a>

          {/* Live links */}
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-800 text-slate-600 hover:text-slate-900 transition-colors"
            title="Live Demo"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

interface ProjectsProps {
  onViewProject: (projectId: string) => void;
}

export default function Projects({ onViewProject }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 bg-bg-section relative overflow-hidden">
      {/* Background decoration lines / shapes */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent-primary bg-blue-50 px-3 py-1 rounded-full">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mt-4 leading-tight">
            Featured System Deployments
          </h2>
          <p className="text-text-secondary mt-4 font-sans text-base md:text-lg">
            A showcase of client-oriented architectures designed during the Decode Labs internship, focusing on 3D interfaces, high-concurrency backends, and AI pipelines.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewProject={onViewProject}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
