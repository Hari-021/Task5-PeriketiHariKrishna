import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, Download, AlertCircle } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    message: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Reset error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = () => {
    const errors = {
      name: formData.name.trim() === '',
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      message: formData.message.trim() === ''
    };
    
    setFormErrors(errors);
    return !errors.name && !errors.email && !errors.message;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const contactDetails = [
    {
      icon: <Mail className="text-accent-primary" size={18} />,
      label: "Email",
      value: "periketiharikrishna@gmail.com",
      link: "mailto:periketiharikrishna@gmail.com"
    },
    {
      icon: <Linkedin className="text-accent-secondary" size={18} />,
      label: "LinkedIn",
      value: "linkedin.com/in/periketiharikrishna",
      link: "https://linkedin.com/in/periketiharikrishna"
    },
    {
      icon: <Github className="text-slate-800" size={18} />,
      label: "GitHub",
      value: "github.com/periketiharikrishna",
      link: "https://github.com/periketiharikrishna"
    },
    {
      icon: <MapPin className="text-emerald-500" size={18} />,
      label: "Location",
      value: "Guntur, Andhra Pradesh, India",
      link: null
    }
  ];

  return (
    <section id="contact" className="py-24 bg-bg-secondary relative overflow-hidden">
      <div className="bg-blob blob-pink bottom-0 right-1/4"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent-primary bg-blue-50 px-3 py-1 rounded-full">
            Inquiries
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mt-4 leading-tight">
            Initiate Contact
          </h2>
          <p className="text-text-secondary mt-4 font-sans text-base md:text-lg">
            Have a project in mind, an opportunity to offer, or just want to connect? Send a message and let's start collaborating.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left panel: Info Details & Resume button */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-8"
          >
            <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="font-heading font-bold text-xl text-slate-800">
                Contact Details
              </h3>
              
              <div className="space-y-4">
                {contactDetails.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 hover:border-accent-primary/10 transition-colors">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex-shrink-0">
                      {detail.icon}
                    </div>
                    <div className="min-w-0 flex-grow">
                      <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">{detail.label}</span>
                      {detail.link ? (
                        <a 
                          href={detail.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-semibold text-slate-800 hover:text-accent-primary text-sm break-words transition-colors"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <span className="font-semibold text-slate-800 text-sm break-words">
                          {detail.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Call to action block */}
            <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5 flex flex-col items-center text-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <h3 className="font-heading font-bold text-lg text-slate-800">
                Need a physical PDF CV?
              </h3>
              <p className="text-xs text-slate-500 font-sans max-w-xs leading-relaxed">
                Download my comprehensive single-page resume layout showcasing key academic milestones, technologies, and certifications.
              </p>
              
              <button className="btn-accent flex items-center justify-center gap-2 text-xs font-bold font-button shadow-md w-full max-w-xs mt-2 relative z-10">
                <Download size={14} />
                <span>Download Resume PDF</span>
              </button>
            </div>

          </motion.div>

          {/* Right panel: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm h-full flex flex-col justify-center relative min-h-[480px]">
              
              {/* Form Success Overlay */}
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center space-y-4 p-6"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-100 text-emerald-500 flex items-center justify-center animate-bounce">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-slate-800">Message Received</h3>
                  <p className="text-text-secondary text-sm font-sans max-w-sm leading-relaxed">
                    Thank you for reaching out! I will review your inquiry details and follow up within 24 business hours.
                  </p>
                  <button 
                    onClick={() => setSubmitSuccess(false)}
                    className="btn-secondary py-2 px-5 text-xs mt-4 font-bold border border-slate-200"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                /* The Actual Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-heading font-bold text-xl text-slate-800 mb-2">
                    Send Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name input */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block text-xs font-semibold text-slate-700 font-sans">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 rounded-xl border bg-white/50 text-sm font-sans focus:outline-none transition-all ${
                          formErrors.name ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-200 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary'
                        }`}
                        placeholder="John Doe"
                      />
                      {formErrors.name && (
                        <span className="text-[10px] text-rose-500 flex items-center gap-1 font-sans mt-0.5">
                          <AlertCircle size={10} /> Name is required.
                        </span>
                      )}
                    </div>

                    {/* Email input */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-xs font-semibold text-slate-700 font-sans">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 rounded-xl border bg-white/50 text-sm font-sans focus:outline-none transition-all ${
                          formErrors.email ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-200 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary'
                        }`}
                        placeholder="johndoe@example.com"
                      />
                      {formErrors.email && (
                        <span className="text-[10px] text-rose-500 flex items-center gap-1 font-sans mt-0.5">
                          <AlertCircle size={10} /> Valid email is required.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subject input */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 font-sans">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white/50 text-sm font-sans focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all"
                      placeholder="Collaboration opportunity"
                    />
                  </div>

                  {/* Message input */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-700 font-sans">Message Content *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 rounded-xl border bg-white/50 text-sm font-sans focus:outline-none transition-all resize-none ${
                        formErrors.message ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-200 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary'
                      }`}
                      placeholder="Hi Hari Krishna, I would like to discuss..."
                    />
                    {formErrors.message && (
                      <span className="text-[10px] text-rose-500 flex items-center gap-1 font-sans mt-0.5">
                        <AlertCircle size={10} /> Message content is required.
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-3 text-sm font-bold font-button flex items-center justify-center gap-2 mt-4 active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
