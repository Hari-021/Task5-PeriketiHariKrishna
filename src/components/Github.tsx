import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { GitBranch, Star, Code, ExternalLink, Calendar, GitCommit } from 'lucide-react';

export default function Github() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [hoveredDay, setHoveredDay] = useState<{ count: number; date: string } | null>(null);

  // Generate mock contribution calendar data (24 columns x 7 days)
  const columnsCount = 28;
  const daysOfWeek = 7;
  const contributionGrid = Array.from({ length: columnsCount }, (_, colIdx) => {
    return Array.from({ length: daysOfWeek }, (_, dayIdx) => {
      // Generate realistic contribution levels (0 = none, 1-3 = low to high)
      let level = 0;
      const rand = Math.random();
      if (rand > 0.85) level = 3;      // Dark green (8+ commits)
      else if (rand > 0.65) level = 2; // Medium green (4-7 commits)
      else if (rand > 0.3) level = 1;  // Light green (1-3 commits)
      
      const commitCount = level === 0 ? 0 : level === 1 ? Math.floor(Math.random() * 3) + 1 : level === 2 ? Math.floor(Math.random() * 4) + 4 : Math.floor(Math.random() * 6) + 8;
      
      // Calculate a mock date
      const date = new Date();
      date.setDate(date.getDate() - (columnsCount - colIdx) * 7 + dayIdx);
      const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      return { level, commitCount, dateString };
    });
  });

  const pinnedRepos = [
    {
      name: "nexus-university-3d",
      description: "Interactive 3D digital twin platform representing a university campus loaded with low-poly GLTF CAD layouts and IoT WebSocket gateways.",
      stars: 12,
      forks: 4,
      language: "TypeScript",
      langColor: "bg-blue-600",
      link: "https://github.com/periketiharikrishna/nexus-university-3d"
    },
    {
      name: "subtracker-3d-saas",
      description: "SaaS personal budget dashboard rendering 3D currency spending volume blocks inside Express API backends using JWT validation keys.",
      stars: 8,
      forks: 2,
      language: "JavaScript",
      langColor: "bg-amber-400",
      link: "https://github.com/periketiharikrishna/subtracker-3d"
    },
    {
      name: "restaurant-pos-api",
      description: "Dual-database POS server using Python FastAPI to coordinate SQLite receipt logging alongside MongoDB catalog menu objects.",
      stars: 15,
      forks: 6,
      language: "Python",
      langColor: "bg-indigo-500",
      link: "https://github.com/periketiharikrishna/restaurant-pos-system"
    }
  ];

  const githubStats = [
    { label: "Total Contributions", value: "842", sub: "Past 12 months" },
    { label: "Commits", value: "624", sub: "Across all branches" },
    { label: "Stars Earned", value: "35", sub: "From open source repos" },
    { label: "Repositories", value: "18", sub: "Public repositories" }
  ];

  const languages = [
    { name: "TypeScript", percent: 45, color: "bg-blue-600" },
    { name: "Python", percent: 35, color: "bg-indigo-500" },
    { name: "JavaScript", percent: 15, color: "bg-amber-400" },
    { name: "Other (HTML/CSS)", percent: 5, color: "bg-slate-400" }
  ];

  return (
    <section id="github" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent-primary bg-blue-50 px-3 py-1 rounded-full">
            Activity
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mt-4 leading-tight">
            Engineering Contributions
          </h2>
          <p className="text-text-secondary mt-4 font-sans text-base md:text-lg">
            Real-time visual monitoring of code revisions, repository logs, and programmatic commits showing active full-stack developments.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Contribution Calendar and pinned repos */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Contribution Calendar Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="glass-card p-6 md:p-8 rounded-3xl border border-slate-100/80 shadow-sm space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="font-heading font-bold text-xl text-slate-800 flex items-center gap-2">
                  <Calendar className="text-accent-primary" size={20} />
                  <span>Contribution Calendar</span>
                </h3>
                <div className="text-[11px] font-mono text-slate-400">
                  @periketiharikrishna on GitHub
                </div>
              </div>

              {/* Grid Box */}
              <div className="overflow-x-auto pb-2">
                <div className="flex flex-col gap-1.5 min-w-[560px]">
                  <div className="flex gap-1.5">
                    {/* Render Columns */}
                    {contributionGrid.map((col, colIdx) => (
                      <div key={colIdx} className="flex flex-col gap-1.5">
                        {col.map((day, dayIdx) => {
                          // Determine tailwind BG class
                          let bgClass = "bg-slate-100";
                          if (day.level === 1) bgClass = "bg-emerald-200/60";
                          if (day.level === 2) bgClass = "bg-emerald-400/80";
                          if (day.level === 3) bgClass = "bg-emerald-600";

                          return (
                            <div
                              key={dayIdx}
                              onMouseEnter={() => setHoveredDay({ count: day.commitCount, date: day.dateString })}
                              onMouseLeave={() => setHoveredDay(null)}
                              className={`w-3.5 h-3.5 rounded-sm ${bgClass} cursor-pointer hover:scale-110 hover:ring-2 hover:ring-accent-primary/20 transition-transform duration-150`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Legends */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-2 px-1">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <div className="flex items-center gap-1">
                      <span>Less</span>
                      <div className="w-2.5 h-2.5 rounded-sm bg-slate-100"></div>
                      <div className="w-2.5 h-2.5 rounded-sm bg-emerald-200/60"></div>
                      <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400/80"></div>
                      <div className="w-2.5 h-2.5 rounded-sm bg-emerald-600"></div>
                      <span>More</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Info display */}
              <div className="h-6 flex items-center justify-center text-xs font-mono text-slate-500 border-t border-slate-50 pt-4">
                {hoveredDay ? (
                  <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <GitCommit size={14} className="text-accent-primary" />
                    {hoveredDay.count} commits on {hoveredDay.date}
                  </span>
                ) : (
                  <span>Hover over any calendar node block to view commits logged.</span>
                )}
              </div>
            </motion.div>

            {/* Pinned Repositories */}
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-xl text-slate-800 px-1">
                Pinned Repositories
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pinnedRepos.map((repo, idx) => (
                  <motion.a
                    href={repo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={repo.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="glass-card p-5 rounded-2xl border border-slate-100 hover:border-accent-primary/20 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="w-6 h-6 rounded-md bg-slate-50 flex items-center justify-center border border-slate-150 text-slate-500">
                          <Code size={13} />
                        </span>
                        <ExternalLink size={14} className="text-slate-400 group-hover:text-accent-primary transition-colors" />
                      </div>
                      <h4 className="font-heading font-bold text-slate-800 text-sm truncate group-hover:text-accent-primary transition-colors">
                        {repo.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-normal line-clamp-3 font-sans">
                        {repo.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400 mt-4 border-t border-slate-50 pt-3">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${repo.langColor}`}></span>
                        <span>{repo.language}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={11} className="text-amber-400" />
                        <span>{repo.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitBranch size={11} />
                        <span>{repo.forks}</span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

          </div>

          {/* Right panel: Github Stats and Languages chart */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Github statistics list */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="glass-card p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5"
            >
              <h3 className="font-heading font-bold text-lg text-slate-900 border-b border-slate-50 pb-3">
                GitHub Core Metrics
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {githubStats.map((stat) => (
                  <div key={stat.label} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-2xl font-mono font-bold text-slate-900 block">{stat.value}</span>
                    <span className="text-[10px] font-heading font-bold text-slate-700 block mt-1">{stat.label}</span>
                    <span className="text-[9px] text-slate-400 font-medium block mt-0.5">{stat.sub}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Language Usage bar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6"
            >
              <h3 className="font-heading font-bold text-lg text-slate-900 border-b border-slate-50 pb-3">
                Language Distribution
              </h3>

              {/* Stacked bar chart */}
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    className={`${lang.color} h-full`}
                    style={{ width: `${lang.percent}%` }}
                    title={`${lang.name}: ${lang.percent}%`}
                  />
                ))}
              </div>

              {/* Legends with percentages */}
              <div className="space-y-3 pt-2">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between text-xs font-medium font-sans">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${lang.color}`}></span>
                      <span className="text-slate-700">{lang.name}</span>
                    </div>
                    <span className="font-mono text-slate-400">{lang.percent}%</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
