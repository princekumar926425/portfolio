import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Nebula Dashboard",
    description:
      "A real-time analytics dashboard with 3D data visualization and dark mode UI.",
    tech: ["React", "Three.js", "D3"],
    liveLink: "https://your-live-demo-link.com",
    githubLink:
      "https://github.com/your-username/nebula-dashboard",
  },

  {
    title: "Synthwave Studio",
    description:
      "Interactive music creation tool with WebAudio API and procedural graphics.",
    tech: ["TypeScript", "WebAudio", "Canvas"],
    liveLink: "https://your-live-demo-link.com",
    githubLink:
      "https://github.com/your-username/synthwave-studio",
  },

  {
    title: "EcoTracker",
    description:
      "Carbon footprint tracking app with gamification and community challenges.",
    tech: ["Next.js", "Prisma", "TailwindCSS"],
    liveLink: "https://your-live-demo-link.com",
    githubLink:
      "https://github.com/your-username/ecotracker",
  },

  {
    title: "PixelForge",
    description:
      "AI-powered image editor with real-time filters and collaborative editing.",
    tech: ["WebGL", "WASM", "Node.js"],
    liveLink: "https://your-live-demo-link.com",
    githubLink:
      "https://github.com/your-username/pixelforge",
  },

  {
    title: "Voice-Based Citizen Complaint System",
    description:
      "An AI-powered complaint platform where users can speak complaints, track them with IDs, and admins can manage all submitted issues in a dashboard.",
    tech: ["React", "Node.js", "MongoDB", "TailwindCSS"],
    liveLink: "https://aspire-1-lt6z.onrender.com/",
    githubLink:
      "https://github.com/your-username/complaint-system",
  },
];

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const openProject = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="
        relative
        z-10
        flex
        min-h-screen
        w-full
        items-center
        justify-center
        overflow-hidden
        px-4
        py-16

        sm:px-6
        sm:py-20

        lg:px-8
      "
    >
      {/* =====================================================
          BACKGROUND GLOW
          ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-10
          h-48
          w-48
          -translate-x-1/2
          rounded-full
          bg-green-500/10
          blur-[100px]

          sm:top-20
          sm:h-72
          sm:w-72
          sm:blur-[130px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-10
          right-0
          h-40
          w-40
          rounded-full
          bg-green-500/10
          blur-[90px]

          sm:right-10
          sm:h-56
          sm:w-56
          sm:blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-20
          left-0
          h-36
          w-36
          rounded-full
          bg-emerald-400/10
          blur-[90px]

          sm:left-10
          sm:h-48
          sm:w-48
          sm:blur-[120px]
        "
      />

      {/* =====================================================
          MAIN CONTAINER
          ===================================================== */}

      <div
        className={`
          mx-auto
          w-full
          max-w-7xl
          transition-all
          duration-1000

          ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }
        `}
      >
        {/* =====================================================
            HEADING
            ===================================================== */}

        <div className="mb-10 text-center sm:mb-14">
          <p
            className="
              mb-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.3em]
              text-green-400

              sm:mb-3
              sm:text-sm
              sm:tracking-[0.35em]
            "
          >
            Portfolio
          </p>

          <h2
            className="
              text-3xl
              font-bold
              leading-tight
              text-white

              sm:text-5xl

              md:text-6xl
            "
          >
            Featured{" "}
            <span
              className="
                bg-gradient-to-r
                from-green-300
                via-emerald-400
                to-green-500
                bg-clip-text
                text-transparent
              "
            >
              Projects
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-xl
              px-2
              text-sm
              leading-relaxed
              text-gray-400

              sm:mt-4
              sm:text-base
            "
          >
            Here are some of the projects I have built using
            modern frontend, backend, and full stack
            technologies.
          </p>
        </div>

        {/* =====================================================
            PROJECT CARDS
            ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-5

            sm:gap-7

            md:grid-cols-2
            md:gap-8
          "
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              onClick={() => openProject(project.liveLink)}
              className={`
                group
                relative
                w-full
                cursor-pointer
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-5
                shadow-2xl
                backdrop-blur-md
                transition-all
                duration-500

                hover:-translate-y-2
                hover:border-green-400/30
                hover:shadow-[0_20px_60px_rgba(34,197,94,0.22)]

                sm:rounded-3xl
                sm:p-7

                lg:p-8

                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }
              `}
              style={{
                transitionDelay: `${index * 120}ms`,
              }}
            >
              {/* =================================================
                  CARD GLOW
                  ================================================= */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  opacity-0
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              >
                <div
                  className="
                    absolute
                    -left-10
                    top-0
                    h-32
                    w-32
                    rounded-full
                    bg-green-400/10
                    blur-3xl

                    sm:h-40
                    sm:w-40
                  "
                />

                <div
                  className="
                    absolute
                    bottom-0
                    right-0
                    h-32
                    w-32
                    rounded-full
                    bg-emerald-500/10
                    blur-3xl

                    sm:h-40
                    sm:w-40
                  "
                />
              </div>

              {/* =================================================
                  CARD CONTENT
                  ================================================= */}

              <div className="relative z-10">
                {/* top line */}

                <div
                  className="
                    mb-4
                    h-1
                    w-10
                    rounded-full
                    bg-gradient-to-r
                    from-green-300
                    via-emerald-400
                    to-green-500

                    sm:mb-5
                    sm:w-12
                  "
                />

                {/* =================================================
                    TITLE
                    ================================================= */}

                <div
                  className="
                    mb-3
                    flex
                    items-start
                    justify-between
                    gap-3
                  "
                >
                  <h3
                    className="
                      min-w-0
                      break-words
                      text-xl
                      font-semibold
                      leading-snug
                      text-white
                      transition-colors
                      duration-300
                      group-hover:text-green-300

                      sm:text-2xl
                    "
                  >
                    {project.title}
                  </h3>

                  <ExternalLink
                    className="
                      mt-1
                      h-5
                      w-5
                      shrink-0
                      text-green-400
                      opacity-70
                      transition-all
                      duration-300
                      group-hover:scale-110
                      group-hover:opacity-100
                    "
                  />
                </div>

                {/* =================================================
                    DESCRIPTION
                    ================================================= */}

                <p
                  className="
                    mb-5
                    text-sm
                    leading-relaxed
                    text-gray-400

                    sm:mb-6
                    sm:text-base
                  "
                >
                  {project.description}
                </p>

                {/* =================================================
                    TECHNOLOGIES
                    ================================================= */}

                <div
                  className="
                    mb-5
                    flex
                    flex-wrap
                    gap-2

                    sm:mb-6
                  "
                >
                  {project.tech.map((item) => (
                    <span
                      key={item}
                      className="
                        rounded-full
                        border
                        border-green-400/10
                        bg-green-300/10
                        px-2.5
                        py-1
                        text-xs
                        text-green-300
                        transition-all
                        duration-300
                        group-hover:border-green-400/30

                        sm:px-3
                        sm:text-sm
                      "
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* =================================================
                    BUTTONS
                    ================================================= */}

                <div
                  className="
                    flex
                    w-full
                    flex-col
                    gap-3

                    xs:flex-row
                    sm:flex-row
                  "
                >
                  {/* Live Demo */}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openProject(project.liveLink);
                    }}
                    className="
                      inline-flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-gradient-to-r
                      from-green-300
                      via-emerald-400
                      to-green-500
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      text-black
                      transition-transform
                      duration-300
                      hover:scale-[1.02]

                      sm:w-auto
                      sm:px-4
                      sm:py-2
                    "
                  >
                    <ExternalLink size={17} />

                    Live Demo
                  </button>

                  {/* GitHub */}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openProject(project.githubLink);
                    }}
                    className="
                      inline-flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-green-400/30
                      bg-white/5
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      text-green-300
                      transition-all
                      duration-300
                      hover:scale-[1.02]
                      hover:bg-green-400/10

                      sm:w-auto
                      sm:py-2
                    "
                  >
                    <Github size={17} />

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