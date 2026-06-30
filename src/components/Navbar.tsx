import { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, sectionId?: string) => void;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', target: 'home' },
    { name: 'About', target: 'about' },
    { name: 'Projects', target: 'projects' },
    { name: 'Experience', target: 'experience' },
    { name: 'Skills', target: 'skills' },
    { name: 'Contact', target: 'contact' },
  ];

  const handleLinkClick = (target: string) => {
    setIsMobileMenuOpen(false);
    if (target === 'home' && currentView === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentView !== 'home') {
      onNavigate('home', target);
    } else {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass-nav py-3 shadow-sm' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={() => handleLinkClick('home')}
          className="cursor-pointer flex items-center gap-2 group"
        >
          <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-primary to-accent-secondary flex items-center justify-center text-white font-heading font-bold text-xl shadow-md group-hover:scale-105 transition-transform duration-300">
            HK
          </span>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-slate-900 leading-none text-base">Hari Krishna</span>
            <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase mt-0.5">AI & Full Stack</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {currentView !== 'home' ? (
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-sm text-accent-primary hover:text-accent-secondary font-semibold transition-colors duration-200"
            >
              <ArrowLeft size={16} /> Back to Main Page
            </button>
          ) : (
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.target)}
                    className="text-sm font-medium text-slate-600 hover:text-accent-primary transition-colors duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-accent-primary hover:after:w-full after:transition-all after:duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Resume Download Trigger */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('contact');
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-slate-900 text-white hover:bg-accent-primary transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 font-button"
          >
            <FileText size={15} />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-white/95 backdrop-blur-md z-40 animate-fade-in border-t border-slate-100">
          <div className="flex flex-col p-8 gap-6 h-full">
            {currentView !== 'home' ? (
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate('home');
                }}
                className="flex items-center justify-center gap-2 w-full py-4 text-slate-900 font-bold border border-slate-200 rounded-xl"
              >
                <ArrowLeft size={18} /> Back to Main Page
              </button>
            ) : (
              navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.target)}
                  className="text-left text-xl font-heading font-semibold text-slate-800 hover:text-accent-primary transition-colors py-2 border-b border-slate-100"
                >
                  {link.name}
                </button>
              ))
            )}
            
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('contact');
              }}
              className="flex items-center justify-center gap-2 w-full mt-auto py-4 rounded-xl font-heading font-bold text-white bg-gradient-to-r from-accent-primary to-accent-secondary shadow-lg shadow-blue-500/10"
            >
              <FileText size={18} />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
