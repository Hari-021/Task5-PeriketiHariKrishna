import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layout, Server, Database, Wrench } from 'lucide-react';

interface SkillBarProps {
  name: string;
  level: number;
  index: number;
}

function SkillBar({ name, level, index }: SkillBarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-1.5 font-sans">
      <div className="flex justify-between text-xs font-semibold text-slate-700">
        <span>{name}</span>
        <span className="font-mono text-slate-400">{level}%</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/40">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay: index * 0.05, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: "Frontend Engineering",
      icon: <Layout className="text-accent-primary" size={20} />,
      skills: [
        { name: "React", level: 92 },
        { name: "TypeScript", level: 88 },
        { name: "JavaScript", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Three.js / WebGL", level: 80 },
        { name: "HTML5 / CSS3", level: 95 }
      ]
    },
    {
      title: "Backend Development",
      icon: <Server className="text-accent-secondary" size={20} />,
      skills: [
        { name: "Python FastAPI", level: 88 },
        { name: "Node.js / Express", level: 85 },
        { name: "Python Scripting", level: 90 },
        { name: "RESTful API Design", level: 92 }
      ]
    },
    {
      title: "Data & Databases",
      icon: <Database className="text-emerald-500" size={20} />,
      skills: [
        { name: "MongoDB", level: 86 },
        { name: "SQLite", level: 84 },
        { name: "SQLAlchemy ORM", level: 85 },
        { name: "Supabase Cloud Database", level: 82 }
      ]
    },
    {
      title: "DevOps & Tooling",
      icon: <Wrench className="text-amber-500" size={20} />,
      skills: [
        { name: "Git & GitHub", level: 90 },
        { name: "Vite Bundler", level: 88 },
        { name: "Playwright E2E Testing", level: 78 },
        { name: "Framer Motion Animations", level: 85 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-bg-secondary relative overflow-hidden">
      {/* Background Blobs */}
      <div className="bg-blob blob-purple top-1/4 left-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent-primary bg-blue-50 px-3 py-1 rounded-full">
            Proficiency
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mt-4 leading-tight">
            Core Skill Taxonomy
          </h2>
          <p className="text-text-secondary mt-4 font-sans text-base md:text-lg">
            A comprehensive mapping of tools, languages, and runtime configurations utilized during academic work and full-stack software deployments.
          </p>
        </div>

        {/* Skills Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
              className="glass-card p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-accent-primary/10 transition-all duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6 border-b border-slate-50 pb-4">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  {category.icon}
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-800">
                  {category.title}
                </h3>
              </div>

              {/* Progress bars list */}
              <div className="space-y-5">
                {category.skills.map((skill, skillIdx) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    index={skillIdx}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
