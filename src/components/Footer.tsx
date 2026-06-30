import { Mail, ArrowUp } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        
        {/* Left Side: Logo & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-primary to-accent-secondary flex items-center justify-center text-white font-heading font-bold text-base">
              HK
            </span>
            <span className="font-heading font-bold text-white text-base">Periketi Hari Krishna</span>
          </div>
          <p className="text-xs text-slate-500 font-sans mt-1">
            © {currentYear} Periketi Hari Krishna. All rights reserved.
          </p>
        </div>

        {/* Middle: Social Handles */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/periketiharikrishna"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-slate-800 hover:border-slate-600 hover:text-white text-slate-500 hover:bg-slate-900 transition-all duration-300"
            aria-label="GitHub Profile"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com/in/periketiharikrishna"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-slate-800 hover:border-slate-600 hover:text-white text-slate-500 hover:bg-slate-900 transition-all duration-300"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:periketiharikrishna@gmail.com"
            className="p-2.5 rounded-full border border-slate-800 hover:border-slate-600 hover:text-white text-slate-500 hover:bg-slate-900 transition-all duration-300"
            aria-label="Send Email"
          >
            <Mail size={16} />
          </a>
        </div>

        {/* Right Side: Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-slate-900 hover:bg-accent-primary text-slate-400 hover:text-white border border-slate-850 hover:border-accent-primary transition-all duration-300 shadow-md group active:scale-95"
          aria-label="Back to top"
        >
          <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
        </button>

      </div>
    </footer>
  );
}
