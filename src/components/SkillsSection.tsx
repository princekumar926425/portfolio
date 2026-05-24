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
  const [tilts, setTilts] = useState(
    skills.map(() => ({ rotateX: 0, rotateY: 0, x: 50, y: 50 }))
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = -((y - centerY) / centerY) * 12;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setTilts((prev) =>
      prev.map((item, i) =>
        i === index
          ? { rotateX, rotateY, x: xPercent, y: yPercent }
          : item
      )
    );
  };

  const handleMouseLeave = (index: number) => {
    setTilts((prev) =>
      prev.map((item, i) =>
        i === index ? { rotateX: 0, rotateY: 0, x: 50, y: 50 } : item
      )
    );
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="relative z-10 min-h-screen overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      style={{ perspective: "1800px" }}
    >
      <style>
        {`
          @keyframes skillShine {
            0% { transform: translateX(-160%); }
            100% { transform: translateX(340%); }
          }

          @keyframes floatOrb {
            0%, 100% {
              transform: translateY(0px) translateX(0px) scale(1);
            }
            50% {
              transform: translateY(-24px) translateX(14px) scale(1.08);
            }
          }

          @keyframes slideInLeft3D {
            0% {
              opacity: 0;
              transform: translateX(-90px) translateY(35px) rotateY(22deg) scale(0.9);
            }
            100% {
              opacity: 1;
              transform: translateX(0) translateY(0) rotateY(0deg) scale(1);
            }
          }

          @keyframes glowRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes pulseGlow {
            0%, 100% { opacity: 0.45; }
            50% { opacity: 0.95; }
          }

          @keyframes headingSlide {
            0% {
              opacity: 0;
              transform: translateX(-70px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes beamMove {
            0% {
              transform: translateX(-150%) skewX(-18deg);
            }
            100% {
              transform: translateX(320%) skewX(-18deg);
            }
          }

          @keyframes breathe {
            0%,100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.08); opacity: 1; }
          }
        `}
      </style>

      {/* background */}
      <div
        className="absolute left-[7%] top-20 h-56 w-56 rounded-full bg-yellow-400/10 blur-[100px]"
        style={{ animation: "floatOrb 7s ease-in-out infinite" }}
      />
      <div
        className="absolute right-[8%] top-36 h-72 w-72 rounded-full bg-orange-500/10 blur-[120px]"
        style={{ animation: "floatOrb 9s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-14 left-1/3 h-64 w-64 rounded-full bg-amber-300/10 blur-[130px]"
        style={{ animation: "floatOrb 8s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-20 right-1/4 h-40 w-40 rounded-full bg-yellow-200/10 blur-[100px]"
        style={{ animation: "breathe 5s ease-in-out infinite" }}
      />

      <div className="mx-auto w-full max-w-7xl">
        {/* heading */}
        <div
          className="mb-16 text-center"
          style={{
            animation: visible ? "headingSlide 0.9s ease forwards" : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.45em] text-yellow-400">
            Skills
          </p>

          <h2 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
            My{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg">
            Technologies and tools I use to craft modern, immersive and
            professional digital experiences with performance and style.
          </p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            const tilt = tilts[i];

            return (
              <div
                key={skill.name}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => handleMouseLeave(i)}
                className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-5 shadow-[0_12px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-3"
                style={{
                  transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(1.03)`,
                  transformStyle: "preserve-3d",
                  animation: visible ? "slideInLeft3D 0.9s ease forwards" : "none",
                  animationDelay: `${i * 140}ms`,
                  opacity: visible ? 1 : 0,
                }}
              >
                {/* rotating gradient ring */}
                <div className="pointer-events-none absolute inset-[-1px] rounded-[30px] overflow-hidden">
                  <div
                    className="absolute left-1/2 top-1/2 h-[180%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-2xl"
                    style={{
                      background:
                        "conic-gradient(from 0deg, rgba(250,204,21,0.7), rgba(249,115,22,0.3), rgba(255,255,255,0.08), rgba(250,204,21,0.7))",
                      animation: "glowRotate 7s linear infinite",
                    }}
                  />
                </div>

                {/* card mask */}
                <div className="absolute inset-[1px] rounded-[29px] bg-[rgba(10,10,10,0.45)] backdrop-blur-2xl" />

                {/* mouse follow light */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[30px] opacity-100 transition duration-200"
                  style={{
                    background: `radial-gradient(circle at ${tilt.x}% ${tilt.y}%, rgba(255,255,255,0.16), transparent 28%)`,
                  }}
                />

                {/* top overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-gradient-to-br from-yellow-400/10 via-transparent to-orange-500/10" />

                {/* moving beam */}
                <div
                  className="pointer-events-none absolute -left-20 top-0 h-full w-16 bg-white/10 blur-2xl"
                  style={{
                    animation: "beamMove 3.6s linear infinite",
                  }}
                />

                {/* content */}
                <div
                  className="relative z-10"
                  style={{ transform: "translateZ(55px)" }}
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-400/20 bg-yellow-400/10 text-2xl text-yellow-300 shadow-[0_0_24px_rgba(250,204,21,0.18)]">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-300/10 to-orange-500/10" />
                        <Icon className="relative z-10" />
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {skill.name}
                        </h3>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-yellow-300/80">
                          Elite Skill
                        </p>
                      </div>
                    </div>

                    <div className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-sm font-semibold text-yellow-300 shadow-[0_0_18px_rgba(250,204,21,0.15)]">
                      {skill.level}%
                    </div>
                  </div>

                  {/* progress */}
                  <div className="mb-4">
                    <div className="relative h-3 overflow-hidden rounded-full bg-white/10 shadow-inner">
                      <div
                        className="relative h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: visible ? `${skill.level}%` : "0%",
                          transitionDelay: `${i * 130 + 300}ms`,
                          background:
                            "linear-gradient(90deg, #fde047 0%, #f59e0b 55%, #f97316 100%)",
                          boxShadow:
                            "0 0 20px rgba(245,158,11,0.45), 0 0 36px rgba(249,115,22,0.22)",
                        }}
                      >
                        <div
                          className="absolute inset-y-0 w-10 rounded-full bg-white/45 blur-sm"
                          style={{
                            animation: "skillShine 2.2s linear infinite",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* text */}
                  <p className="text-sm leading-7 text-gray-300">
                    Strong hands-on experience with{" "}
                    <span className="font-semibold text-yellow-300">
                      {skill.name}
                    </span>{" "}
                    to build clean, interactive and high-quality projects with a
                    premium front-end feel.
                  </p>
                </div>

                {/* bottom glow */}
                <div className="pointer-events-none absolute -bottom-10 left-1/2 h-20 w-32 -translate-x-1/2 rounded-full bg-orange-500/20 blur-2xl opacity-0 transition-all duration-500 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;