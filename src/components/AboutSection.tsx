import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "Three.js / WebGL", level: 88 },
  { name: "TypeScript", level: 92 },
  { name: "UI/UX Design", level: 85 },
  { name: "Node.js", level: 80 },
];

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="relative z-10 flex min-h-screen items-center justify-center px-4 py-20">
      <div className={`mx-auto max-w-4xl transition-all duration-1000 ${visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-neon-purple">About Me</p>
        <h2 className="mb-8 text-4xl font-bold text-foreground text-glow sm:text-5xl">
          Passion meets <span className="gradient-text">pixels</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="section-card">
            <p className="mb-4 leading-relaxed text-muted-foreground">
              I'm a creative developer with 5+ years of experience building immersive web experiences. 
              I blend cutting-edge technology with thoughtful design to create digital products that feel alive.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              From interactive 3D visualizations to pixel-perfect interfaces, I love pushing the boundaries 
              of what's possible on the web.
            </p>
          </div>

          <div className="section-card">
            <h3 className="mb-6 text-lg font-semibold text-foreground">Skills</h3>
            <div className="space-y-4">
              {skills.map((skill, i) => (
                <div key={skill.name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-muted-foreground">{skill.name}</span>
                    <span className="text-neon-purple">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: visible ? `${skill.level}%` : "0%",
                        transitionDelay: `${i * 150 + 500}ms`,
                        background: "linear-gradient(90deg, hsl(var(--neon-purple)), hsl(var(--neon-blue)))",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
