import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "Nebula Dashboard",
    description: "A real-time analytics dashboard with 3D data visualization and dark mode UI.",
    tags: ["React", "Three.js", "D3"],
    gradient: "from-neon-pink to-neon-purple",
  },
  {
    title: "Synthwave Studio",
    description: "Interactive music creation tool with WebAudio API and procedural graphics.",
    tags: ["TypeScript", "WebAudio", "Canvas"],
    gradient: "from-neon-purple to-neon-blue",
  },
  {
    title: "EcoTracker",
    description: "Carbon footprint tracking app with gamification and community challenges.",
    tags: ["Next.js", "Prisma", "TailwindCSS"],
    gradient: "from-neon-blue to-neon-green",
  },
  {
    title: "PixelForge",
    description: "AI-powered image editor with real-time filters and collaborative editing.",
    tags: ["WebGL", "WASM", "Node.js"],
    gradient: "from-neon-green to-neon-pink",
  },
];

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={ref} className="relative z-10 flex min-h-screen items-center justify-center px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className={`mb-12 text-center transition-all duration-1000 ${visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-neon-blue">Portfolio</p>
          <h2 className="text-4xl font-bold text-foreground text-glow sm:text-5xl">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`group cursor-pointer transition-all duration-700 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 150 + 300}ms` }}
            >
              <div className="section-card h-full transition-all duration-300 hover:scale-[1.02] hover:glow-border">
                <div className={`mb-4 h-1 w-12 rounded-full bg-gradient-to-r ${project.gradient}`} />
                <h3 className="mb-2 text-xl font-semibold text-foreground">{project.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
