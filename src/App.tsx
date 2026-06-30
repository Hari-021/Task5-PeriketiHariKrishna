import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import GithubSection from './components/Github';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CaseStudy from './components/CaseStudy';
import { projectsData } from './data/projectsData';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Navigation states
  const [currentView, setCurrentView] = useState<'home' | 'case-study'>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Simulated Loading Screen Progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500); // Small delay for smooth exit
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleViewProjectCaseStudy = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentView('case-study');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedProjectId(null);
    // Smooth scroll back to projects section after a slight state-render delay
    setTimeout(() => {
      const projectsEl = document.getElementById('projects');
      if (projectsEl) {
        projectsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleNavigateFromNavbar = (view: 'home' | 'case-study', sectionId?: string) => {
    setCurrentView(view);
    if (view === 'home') {
      setSelectedProjectId(null);
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    }
  };

  const selectedProject = projectsData.find((p) => p.id === selectedProjectId);

  return (
    <div className="min-h-screen bg-white relative font-sans text-slate-900 selection:bg-accent-primary/10">
      
      {/* 1. Loading Screen overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
          >
            <div className="space-y-6 text-center max-w-sm px-6">
              {/* Logo icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-accent-primary to-accent-secondary flex items-center justify-center text-white font-heading font-bold text-3xl shadow-lg mx-auto animate-pulse">
                HK
              </div>
              
              <div className="space-y-2">
                <h2 className="font-heading font-bold text-xl text-slate-800 tracking-wide">
                  Initializing Core Portfolio
                </h2>
                <p className="text-slate-400 text-xs font-mono">
                  Loading assets & WebGL configurations...
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="h-1.5 w-48 bg-slate-100 rounded-full mx-auto overflow-hidden border border-slate-200/50">
                  <div 
                    className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-150"
                    style={{ width: `${Math.min(loadingProgress, 100)}%` }}
                  />
                </div>
                <span className="text-xs font-mono font-bold text-slate-500">
                  {Math.min(loadingProgress, 100)}%
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Page Layout */}
      {!isLoading && (
        <div className="flex flex-col min-h-screen">
          {/* Header Navigation */}
          <Navbar 
            currentView={currentView} 
            onNavigate={(view, sec) => handleNavigateFromNavbar(view as 'home' | 'case-study', sec)} 
          />

          {/* Dynamic Content Views */}
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              {currentView === 'home' ? (
                <motion.div
                  key="home-sections"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Hero />
                  <About />
                  <Projects onViewProject={handleViewProjectCaseStudy} />
                  <Experience onViewProject={handleViewProjectCaseStudy} />
                  <Skills />
                  <GithubSection />
                  <Contact />
                </motion.div>
              ) : (
                selectedProject && (
                  <motion.div
                    key={`case-study-${selectedProject.id}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <CaseStudy 
                      project={selectedProject} 
                      onBack={handleBackToHome} 
                    />
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </main>

          {/* Footer Component */}
          <Footer />
        </div>
      )}
    </div>
  );
}
