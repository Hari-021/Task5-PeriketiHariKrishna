import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, BookOpen, Cpu, ShieldCheck, Zap } from 'lucide-react';

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

function AnimatedCounter({ value, suffix, label, sublabel }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = value;
    const duration = 2000; // ms
    const stepTime = Math.max(Math.floor(duration / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 100) || 1;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm border border-slate-100 hover:border-accent-primary/20 hover:shadow-md transition-all duration-300">
      <span className="text-4xl md:text-5xl font-mono font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
        {count}{suffix}
      </span>
      <span className="font-heading font-semibold text-slate-800 mt-2 text-sm md:text-base">
        {label}
      </span>
      <span className="text-xs text-slate-400 font-medium mt-1">
        {sublabel}
      </span>
    </div>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const isContainerInView = useInView(containerRef, { once: true, margin: "-100px" });

  const coreStrengths = [
    { icon: <Cpu className="text-accent-primary" size={20} />, title: "AI & ML Architecture", desc: "Developing neural networks, speech analysis models, and integrating Large Language Models." },
    { icon: <Zap className="text-amber-500" size={20} />, title: "Full Stack Systems", desc: "Constructing scalable web applications using high-performance React and FastAPI backend architectures." },
    { icon: <BookOpen className="text-accent-secondary" size={20} />, title: "Multi-Database Engineering", desc: "Structuring hybrid platforms syncing relational SQL transactions with unstructured document tables." },
    { icon: <ShieldCheck className="text-emerald-500" size={20} />, title: "Clean API Architectures", desc: "Creating secure, validated, and documented RESTful APIs with FastAPI and JWT protocols." }
  ];

  return (
    <section id="about" className="py-24 bg-bg-secondary relative">
      <div className="bg-blob blob-pink top-1/3 right-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent-primary bg-blue-50 px-3 py-1 rounded-full">
            Profile
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mt-4 leading-tight">
            Engineering Smarter Solutions
          </h2>
          <p className="text-text-secondary mt-4 font-sans text-base md:text-lg">
            I am a student engineer combining research principles with industry-grade software engineering to build robust and modern platforms.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Bio Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isContainerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="glass-card p-8 rounded-3xl border border-white/60 space-y-6">
              <h3 className="font-heading font-bold text-2xl text-slate-900 flex items-center gap-2">
                <Award className="text-accent-primary" /> Career Profile & Objectives
              </h3>
              
              <p className="text-text-secondary leading-relaxed text-base font-sans">
                As an aspiring **AI & Machine Learning Engineer and Full Stack Developer**, I specialize in connecting front-end user experiences with back-end models. During my academic journey and internship engagements, I have focused on low-latency WebGL rendering, secure user authentication systems, database performance, and speech-to-text models.
              </p>
              
              <p className="text-text-secondary leading-relaxed text-base font-sans">
                My objective is to bridge the gap between artificial intelligence research and practical, user-facing production systems. I aim to create architectures that remain fast, responsive, and completely secure under heavy loads.
              </p>

              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-mono text-xs text-slate-400 uppercase tracking-widest">Education</h4>
                  <p className="font-semibold text-slate-800 text-sm mt-1">Bachelor of Technology (B.Tech)</p>
                  <p className="text-slate-500 text-xs mt-0.5">Computer Science & Engineering (AI & ML)</p>
                </div>
                <div>
                  <h4 className="font-mono text-xs text-slate-400 uppercase tracking-widest">Internship Tenure</h4>
                  <p className="font-semibold text-slate-800 text-sm mt-1">Decode Labs</p>
                  <p className="text-slate-500 text-xs mt-0.5">Full Stack Development Intern</p>
                </div>
              </div>
            </div>

            {/* Core Strengths */}
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-xl text-slate-900 px-1">
                Core Strengths & Focus Areas
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coreStrengths.map((strength, index) => (
                  <div key={index} className="glass-card p-5 rounded-2xl flex items-start gap-4 border border-slate-100">
                    <div className="p-2.5 rounded-xl bg-slate-50 flex-shrink-0 border border-slate-100">
                      {strength.icon}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-slate-800 text-sm">{strength.title}</h4>
                      <p className="text-xs text-slate-500 leading-normal mt-1">{strength.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isContainerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4 md:gap-6"
          >
            <AnimatedCounter
              value={4}
              suffix=""
              label="Internship Projects"
              sublabel="Hands-on client software"
            />
            
            <AnimatedCounter
              value={20}
              suffix="+"
              label="Technologies"
              sublabel="Languages, libraries & tools"
            />

            <AnimatedCounter
              value={4}
              suffix=""
              label="Full Stack Apps"
              sublabel="Fully functional platforms"
            />

            <AnimatedCounter
              value={30}
              suffix="+"
              label="REST APIs"
              sublabel="Built, tested & documented"
            />

            <div className="col-span-2 glass-card p-6 rounded-2xl flex flex-col justify-center border border-accent-secondary/10 hover:border-accent-secondary/20 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent-secondary/5 to-transparent rounded-bl-full pointer-events-none"></div>
              <span className="text-sm font-mono font-bold text-accent-secondary uppercase tracking-widest">Status</span>
              <span className="font-heading font-bold text-slate-800 text-lg md:text-xl mt-1">
                AI & Machine Learning Student
              </span>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Actively learning deep learning networks, data architectures, and 3D simulation engines during my computer engineering courses.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
