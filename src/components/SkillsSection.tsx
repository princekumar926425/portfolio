import { useEffect, useRef, useState } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaJava,
  FaCode,
} from "react-icons/fa";
import { SiTailwindcss, SiCplusplus } from "react-icons/si";

const skills = [
  { name: "HTML", level: 95, icon: FaHtml5 },
  { name: "CSS", level: 92, icon: FaCss3Alt },
  { name: "JavaScript", level: 90, icon: FaJs },
  { name: "Tailwind CSS", level: 90, icon: SiTailwindcss },
  { name: "C++", level: 88, icon: SiCplusplus },
  { name: "Java", level: 82, icon: FaJava },
  { name: "DSA with C++", level: 91, icon: FaCode },
];

const SkillsSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /*
   * Only keep tilt state for desktop.
   * Mobile does not need mouse tilt.
   */
  const [tilts, setTilts] = useState(
    skills.map(() => ({
      rotateX: 0,
      rotateY: 0,
      x: 50,
      y: 50,
    }))
  );

  /* ==========================================
     RESPONSIVE CHECK
  ========================================== */

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  /* ==========================================
     INTERSECTION OBSERVER
  ========================================== */

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
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
      observer.disconnect();
    };
  }, []);

  /* ==========================================
     DESKTOP MOUSE TILT
  ========================================== */

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    // Disable on mobile
    if (isMobile) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 7;
    const rotateX = -((y - centerY) / centerY) * 7;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setTilts((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              rotateX,
              rotateY,
              x: xPercent,
              y: yPercent,
            }
          : item
      )
    );
  };

  /* ==========================================
     RESET TILT
  ========================================== */

  const handleMouseLeave = (index: number) => {
    if (isMobile) return;

    setTilts((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              rotateX: 0,
              rotateY: 0,
              x: 50,
              y: 50,
            }
          : item
      )
    );
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="
        relative
        z-10
        min-h-screen
        w-full
        overflow-hidden
        px-4
        py-16

        sm:px-6
        sm:py-20

        lg:px-8
        lg:py-24
      "
      style={{
        perspective: isMobile ? "none" : "1800px",
      }}
    >
      {/* ==========================================
          ANIMATIONS
      ========================================== */}

      <style>
        {`
          @keyframes skillShine {
            0% {
              transform: translateX(-160%);
            }

            100% {
              transform: translateX(340%);
            }
          }

          @keyframes floatOrb {
            0%, 100% {
              transform: translate3d(0, 0, 0) scale(1);
            }

            50% {
              transform: translate3d(14px, -24px, 0) scale(1.05);
            }
          }

          @keyframes slideInLeft3D {
            0% {
              opacity: 0;
              transform: translate3d(-60px, 25px, 0) rotateY(12deg) scale(0.95);
            }

            100% {
              opacity: 1;
              transform: translate3d(0, 0, 0) rotateY(0deg) scale(1);
            }
          }

          @keyframes glowRotate {
            0% {
              transform: translate(-50%, -50%) rotate(0deg);
            }

            100% {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }

          @keyframes breathe {
            0%, 100% {
              transform: scale(1);
              opacity: 0.5;
            }

            50% {
              transform: scale(1.05);
              opacity: 0.8;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              animation: none !important;
              transition: none !important;
            }
          }

          @media (max-width: 767px) {
            .skill-card {
              backdrop-filter: blur(8px) !important;
              -webkit-backdrop-filter: blur(8px) !important;
            }

            .skill-orb {
              animation: none !important;
            }

            .skill-ring {
              animation: none !important;
            }

            .skill-beam {
              display: none !important;
            }
          }
        `}
      </style>

      {/* ==========================================
          BACKGROUND GLOWS
      ========================================== */}

      <div
        className="
          skill-orb
          pointer-events-none
          absolute
          left-[5%]
          top-16
          h-40
          w-40
          rounded-full
          bg-green-400/10
          blur-[80px]

          sm:h-56
          sm:w-56
          sm:blur-[100px]
        "
        style={{
          animation: isMobile
            ? "none"
            : "floatOrb 7s ease-in-out infinite",
        }}
      />

      <div
        className="
          skill-orb
          pointer-events-none
          absolute
          right-[5%]
          top-32
          h-48
          w-48
          rounded-full
          bg-green-500/10
          blur-[90px]

          sm:h-72
          sm:w-72
          sm:blur-[120px]
        "
        style={{
          animation: isMobile
            ? "none"
            : "floatOrb 9s ease-in-out infinite",
        }}
      />

      <div
        className="
          skill-orb
          pointer-events-none
          absolute
          bottom-14
          left-1/3
          h-48
          w-48
          rounded-full
          bg-emerald-300/10
          blur-[100px]

          sm:h-64
          sm:w-64
          sm:blur-[130px]
        "
        style={{
          animation: isMobile
            ? "none"
            : "floatOrb 8s ease-in-out infinite",
        }}
      />

      <div
        className="
          skill-orb
          pointer-events-none
          absolute
          bottom-20
          right-1/4
          h-32
          w-32
          rounded-full
          bg-green-200/10
          blur-[80px]

          sm:h-40
          sm:w-40
          sm:blur-[100px]
        "
        style={{
          animation: isMobile
            ? "none"
            : "breathe 5s ease-in-out infinite",
        }}
      />

      {/* ==========================================
          MAIN CONTAINER
      ========================================== */}

      <div className="mx-auto w-full max-w-7xl">
        {/* ==========================================
            HEADING
        ========================================== */}

        <div
          className="
            mb-10
            text-center

            sm:mb-14

            lg:mb-16
          "
          style={{
            animation: visible
              ? "slideInLeft3D 0.8s ease forwards"
              : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          <p
            className="
              mb-3
              text-xs
              font-semibold
              uppercase
              tracking-[0.3em]
              text-green-400

              sm:mb-4
              sm:text-sm
              sm:tracking-[0.45em]
            "
          >
            Skills
          </p>

          <h2
            className="
              text-3xl
              font-extrabold
              leading-tight
              text-white

              sm:text-5xl

              md:text-6xl
            "
          >
            My{" "}
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
              Skills
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              px-2
              text-sm
              leading-relaxed
              text-gray-300

              sm:mt-5
              sm:text-base

              md:text-lg
            "
          >
            Technologies and tools I use to craft modern,
            immersive and professional digital experiences
            with performance and style.
          </p>
        </div>

        {/* ==========================================
            SKILL CARDS
        ========================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-4

            sm:grid-cols-2
            sm:gap-5

            lg:grid-cols-3
            lg:gap-6

            xl:grid-cols-4
          "
        >
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            const tilt = tilts[i];

            return (
              <div
                key={skill.name}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => handleMouseLeave(i)}
                className="
                  skill-card
                  group
                  relative
                  w-full
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-4
                  shadow-[0_10px_35px_rgba(0,0,0,0.3)]
                  backdrop-blur-md
                  transition-all
                  duration-300

                  sm:rounded-3xl
                  sm:p-5

                  md:backdrop-blur-xl

                  lg:p-6

                  lg:hover:-translate-y-2
                  lg:hover:border-green-400/30
                "
                style={{
                  transform: isMobile
                    ? "none"
                    : `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,

                  transformStyle: isMobile
                    ? "flat"
                    : "preserve-3d",

                  animation: visible
                    ? "slideInLeft3D 0.7s ease forwards"
                    : "none",

                  animationDelay: `${i * 100}ms`,

                  opacity: visible ? 1 : 0,

                  willChange: visible
                    ? "transform, opacity"
                    : "auto",
                }}
              >
                {/* ==========================================
                    ROTATING RING
                ========================================== */}

                <div
                  className="
                    skill-ring
                    pointer-events-none
                    absolute
                    inset-[-1px]
                    overflow-hidden
                    rounded-3xl
                  "
                >
                  <div
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      h-[160%]
                      w-[65%]
                      rounded-full
                      opacity-50
                      blur-xl
                    "
                    style={{
                      transform:
                        "translate(-50%, -50%)",

                      background:
                        "conic-gradient(from 0deg, rgba(34,197,94,0.6), rgba(16,185,129,0.2), rgba(255,255,255,0.05), rgba(34,197,94,0.6))",

                      animation: isMobile
                        ? "none"
                        : "glowRotate 8s linear infinite",
                    }}
                  />
                </div>

                {/* ==========================================
                    CARD MASK
                ========================================== */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-[1px]
                    rounded-[15px]
                    bg-[rgba(10,10,10,0.55)]

                    sm:rounded-[23px]
                  "
                />

                {/* ==========================================
                    MOUSE FOLLOW LIGHT
                ========================================== */}

                {!isMobile && (
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      rounded-3xl
                    "
                    style={{
                      background: `radial-gradient(
                        circle at ${tilt.x}% ${tilt.y}%,
                        rgba(255,255,255,0.12),
                        transparent 30%
                      )`,
                    }}
                  />
                )}

                {/* ==========================================
                    OVERLAY
                ========================================== */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-3xl
                    bg-gradient-to-br
                    from-green-400/10
                    via-transparent
                    to-emerald-500/10
                  "
                />

                {/* ==========================================
                    MOVING BEAM
                ========================================== */}

                {!isMobile && (
                  <div
                    className="
                      skill-beam
                      pointer-events-none
                      absolute
                      -left-20
                      top-0
                      h-full
                      w-12
                      bg-white/10
                      blur-xl
                    "
                    style={{
                      animation:
                        "skillShine 4s linear infinite",
                    }}
                  />
                )}

                {/* ==========================================
                    CONTENT
                ========================================== */}

                <div
                  className="
                    relative
                    z-10

                    lg:[transform:translateZ(30px)]
                  "
                >
                  {/* Header */}

                  <div
                    className="
                      mb-4
                      flex
                      items-start
                      justify-between
                      gap-2

                      sm:gap-3
                    "
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      {/* ICON */}

                      <div
                        className="
                          relative
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-green-400/20
                          bg-green-400/10
                          text-xl
                          text-green-300

                          sm:h-12
                          sm:w-12
                          sm:rounded-2xl
                          sm:text-2xl
                        "
                      >
                        <div
                          className="
                            absolute
                            inset-0
                            rounded-xl
                            bg-gradient-to-br
                            from-green-300/10
                            to-emerald-500/10

                            sm:rounded-2xl
                          "
                        />

                        <Icon className="relative z-10" />
                      </div>

                      {/* TITLE */}

                      <div className="min-w-0">
                        <h3
                          className="
                            truncate
                            text-base
                            font-bold
                            text-white

                            sm:text-lg
                          "
                        >
                          {skill.name}
                        </h3>

                        <p
                          className="
                            mt-1
                            text-[9px]
                            uppercase
                            tracking-[0.2em]
                            text-green-300/80

                            sm:text-[10px]
                            sm:tracking-[0.3em]
                          "
                        >
                          Elite Skill
                        </p>
                      </div>
                    </div>

                    {/* PERCENTAGE */}

                    <div
                      className="
                        shrink-0
                        rounded-full
                        border
                        border-green-400/20
                        bg-green-400/10
                        px-2.5
                        py-1
                        text-xs
                        font-semibold
                        text-green-300

                        sm:px-3
                        sm:text-sm
                      "
                    >
                      {skill.level}%
                    </div>
                  </div>

                  {/* ==========================================
                      PROGRESS BAR
                  ========================================== */}

                  <div className="mb-4">
                    <div
                      className="
                        relative
                        h-2.5
                        overflow-hidden
                        rounded-full
                        bg-white/10

                        sm:h-3
                      "
                    >
                      <div
                        className="
                          relative
                          h-full
                          rounded-full
                          transition-all
                          duration-1000
                          ease-out
                        "
                        style={{
                          width: visible
                            ? `${skill.level}%`
                            : "0%",

                          transitionDelay: `${i * 100 + 250}ms`,

                          background:
                            "linear-gradient(90deg, #4ade80 0%, #22c55e 55%, #10b981 100%)",

                          boxShadow:
                            "0 0 15px rgba(34,197,94,0.35)",
                        }}
                      />
                    </div>
                  </div>

                  {/* ==========================================
                      DESCRIPTION
                  ========================================== */}

                  <p
                    className="
                      text-xs
                      leading-6
                      text-gray-300

                      sm:text-sm
                      sm:leading-7
                    "
                  >
                    Strong hands-on experience with{" "}
                    <span className="font-semibold text-green-300">
                      {skill.name}
                    </span>{" "}
                    to build clean, interactive and
                    high-quality projects with a premium
                    front-end feel.
                  </p>
                </div>

                {/* ==========================================
                    BOTTOM GLOW
                ========================================== */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -bottom-8
                    left-1/2
                    h-16
                    w-28
                    -translate-x-1/2
                    rounded-full
                    bg-green-500/15
                    blur-2xl
                    opacity-0
                    transition-opacity
                    duration-500

                    lg:group-hover:opacity-100
                  "
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;