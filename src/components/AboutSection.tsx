import { useEffect, useRef, useState } from "react";
import myImage from "../assets/prince.png";

const aboutWords = [
  " HI-I AM Prince Kumar Ray",
  "DSA Problem Solver",
];

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [light, setLight] = useState({ x: 50, y: 50 });

  const [aboutText, setAboutText] = useState("");
  const [aboutIndex, setAboutIndex] = useState(0);
  const [aboutDeleting, setAboutDeleting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const current = aboutWords[aboutIndex];
    const speed = aboutDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!aboutDeleting) {
        const updated = current.substring(0, aboutText.length + 1);
        setAboutText(updated);

        if (updated === current) {
          setTimeout(() => setAboutDeleting(true), 1200);
        }
      } else {
        const updated = current.substring(0, aboutText.length - 1);
        setAboutText(updated);

        if (updated === "") {
          setAboutDeleting(false);
          setAboutIndex((prev) => (prev + 1) % aboutWords.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [aboutText, aboutDeleting, aboutIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = ((centerY - y) / centerY) * 12;

    setRotate({ x: rotateX, y: rotateY });
    setLight({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setLight({ x: 50, y: 50 });
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden px-4 py-20"
    >
      <style>
        {`
          @keyframes glowRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes beamMove {
            0% { transform: translateX(-150%) skewX(-20deg); }
            100% { transform: translateX(300%) skewX(-20deg); }
          }

          @keyframes pulseGlow {
            0%,100% { opacity: 0.4; }
            50% { opacity: 1; }
          }

          @keyframes floatSoft {
            0%,100% {
              transform: translateY(0px) translateX(0px);
            }
            50% {
              transform: translateY(-16px) translateX(10px);
            }
          }

          @keyframes cardFloat {
            0%,100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }
        `}
      </style>

      {/* background glow */}
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-500/15 blur-[130px]" />
      <div
        className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-orange-500/10 blur-[120px]"
        style={{ animation: "floatSoft 7s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-20 left-10 h-48 w-48 rounded-full bg-amber-400/10 blur-[120px]"
        style={{ animation: "floatSoft 8s ease-in-out infinite" }}
      />

      <div
        className={`mx-auto w-full max-w-7xl transition-all duration-1000 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        {/* heading */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-yellow-400">
            About Me
          </p>

          <h2 className="text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              {aboutText}
              <span className="ml-1 animate-pulse text-yellow-300">|</span>
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 bg-clip-text text-transparent font-semibold">
              Prince Kumar Ray
            </span>{" "}
            — I build immersive, modern, and interactive web experiences with clean
            code, smooth animation, and a premium 3D feel.
          </p>
        </div>

        {/* main grid */}
        <div className="grid items-stretch gap-10 lg:grid-cols-2">
          
          {/* image card */}
          <div className="flex h-full justify-center">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative h-full w-full max-w-md transition-transform duration-200"
              style={{
                transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.02,1.02,1.02)`,
                transformStyle: "preserve-3d",
                animation: "cardFloat 5s ease-in-out infinite",
              }}
            >
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-r from-yellow-300/25 via-amber-400/20 to-orange-500/25 blur-2xl" />

              <div className="relative flex h-full min-h-[550px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                {/* rotating glow */}
                <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
                  <div
                    className="absolute left-1/2 top-1/2 h-[180%] w-[70%] -translate-x-1/2 -translate-y-1/2 blur-2xl"
                    style={{
                      background:
                        "conic-gradient(from 0deg, rgba(250,204,21,0.6), rgba(249,115,22,0.3), rgba(255,255,255,0.05), rgba(250,204,21,0.6))",
                      animation: "glowRotate 6s linear infinite",
                    }}
                  />
                </div>

                {/* mouse follow light */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[2rem]"
                  style={{
                    background: `radial-gradient(circle at ${light.x}% ${light.y}%, rgba(255,255,255,0.18), transparent 30%)`,
                  }}
                />

                {/* shine beam */}
                <div
                  className="absolute -left-20 top-0 h-full w-20 bg-white/10 blur-2xl"
                  style={{ animation: "beamMove 3.5s linear infinite" }}
                />

                <div className="relative w-full overflow-hidden rounded-[1.5rem] group">
                  <img
                    src={myImage}
                    alt="Prince Kumar"
                    className="h-[500px] w-full object-cover object-top transition-all duration-500 group-hover:scale-110 group-hover:rotate-[1deg] group-hover:shadow-[0_0_60px_rgba(250,204,21,0.35)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute bottom-6 left-6 rounded-xl border border-yellow-400/20 bg-black/40 px-4 py-2 backdrop-blur-md">
                    <p className="text-xs tracking-widest text-yellow-300">
                      Frontend Dev
                    </p>
                    <p className="text-sm font-bold text-white">
                      Prince Kumar Ray
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* who i am */}
          <div className="space-y-8">
            <div className="relative flex min-h-[500px] flex-col justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md transition duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(245,158,11,0.35)]">
              {/* glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-orange-500/10" />

              {/* animated border */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
                  animation: "pulseGlow 3s ease-in-out infinite",
                }}
              />

              {/* content */}
              <div className="relative z-10">
                <h3 className="mb-4 text-2xl font-semibold text-foreground">
                  Who I Am
                </h3>

                <p className="mb-4 leading-relaxed text-muted-foreground">
                  I&apos;m{" "}
                  <span className="font-semibold text-yellow-300">
                    Prince Kumar Ray
                  </span>
                  , a passionate frontend developer and dedicated
                  <span className="font-semibold text-yellow-300">
                    {" "}DSA problem solver
                  </span>.
                </p>

                <p className="leading-relaxed text-muted-foreground">
                  I love building modern, interactive, and visually engaging web
                  experiences. My focus is on clean code, smooth animations, and
                  creating UI that feels premium and alive. Alongside development,
                  I actively solve data structures & algorithms problems to
                  strengthen my problem-solving skills.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;