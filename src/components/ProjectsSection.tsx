import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Nebula Dashboard",
    description:
      "A real-time analytics dashboard with 3D data visualization and dark mode UI.",
    tech: ["React", "Three.js", "D3"],
    liveLink: "https://your-live-demo-link.com",
    githubLink: "https://github.com/your-username/nebula-dashboard",
  },
  {
    title: "Synthwave Studio",
    description:
      "Interactive music creation tool with WebAudio API and procedural graphics.",
    tech: ["TypeScript", "WebAudio", "Canvas"],
    liveLink: "https://your-live-demo-link.com",
    githubLink: "https://github.com/your-username/synthwave-studio",
  },
  {
    title: "EcoTracker",
    description:
      "Carbon footprint tracking app with gamification and community challenges.",
    tech: ["Next.js", "Prisma", "TailwindCSS"],
    liveLink: "https://your-live-demo-link.com",
    githubLink: "https://github.com/your-username/ecotracker",
  },
  {
    title: "PixelForge",
    description:
      "AI-powered image editor with real-time filters and collaborative editing.",
    tech: ["WebGL", "WASM", "Node.js"],
    liveLink: "https://your-live-demo-link.com",
    githubLink: "https://github.com/your-username/pixelforge",
  },

  // yaha apne aur projects add karte jao
  {
    title: "Voice-Based Citizen Complaint System",
    description:
      "An AI-powered complaint platform where users can speak complaints, track them with IDs, and admins can manage all submitted issues in a dashboard.",
    tech: ["React", "Node.js", "MongoDB", "TailwindCSS"],
    liveLink: "https://your-live-demo-link.com",
    githubLink: "https://github.com/your-username/complaint-system",
  },
];

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );

    const currentRef = ref.current;

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const openProject = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden px-4 py-20"
    >
      {/* Background glow */}
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[130px]" />
      <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-orange-500/10 blur-[120px]" />
      <div className="absolute bottom-20 left-10 h-48 w-48 rounded-full bg-amber-400/10 blur-[120px]" />

      <div
        className={`mx-auto w-full max-w-7xl transition-all duration-1000 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-yellow-400">
            Portfolio
          </p>

          <h2 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
            Here are some of the projects I have built using modern frontend,
            backend, and full stack technologies.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={project.title}
              onClick={() => openProject(project.liveLink)}
              className={`group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md transition-all duration-500 hover:-translate-y-3 hover:border-yellow-400/30 hover:shadow-[0_20px_60px_rgba(245,158,11,0.22)] ${
                visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* card glow */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-yellow-400/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />
              </div>

              <div className="relative z-10">
                <div className="mb-5 h-1 w-12 rounded-full bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500" />

                <div className="mb-3 flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-white transition-colors duration-300 group-hover:text-yellow-300">
                    {project.title}
                  </h3>

                  <ExternalLink className="mt-1 h-5 w-5 text-yellow-400 opacity-70 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100" />
                </div>

                <p className="mb-6 leading-relaxed text-gray-400">
                  {project.description}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-yellow-400/10 bg-yellow-300/10 px-3 py-1 text-sm text-yellow-300 transition-all duration-300 group-hover:border-yellow-400/30"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openProject(project.liveLink);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 px-4 py-2 font-medium text-black transition-transform duration-300 hover:scale-105"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openProject(project.githubLink);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-yellow-400/30 bg-white/5 px-4 py-2 font-medium text-yellow-300 transition-all duration-300 hover:scale-105 hover:bg-yellow-400/10"
                  >
                    <Github size={18} />
                    GitHub
                  </button>
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