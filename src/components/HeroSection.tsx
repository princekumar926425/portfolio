import { useEffect, useState } from "react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div
        className={`transition-all duration-1000 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Welcome to my world
        </p>
        <h1 className="mb-4 text-5xl font-bold leading-tight text-foreground text-glow sm:text-7xl md:text-8xl">
          Hi, I'm{" "}
          <span className="gradient-text">Alex</span>
        </h1>
        <p className="mb-2 text-xl font-light text-muted-foreground sm:text-2xl md:text-3xl text-glow-subtle">
          A Creative Developer
        </p>
        <p className="mx-auto mb-10 max-w-md text-sm text-muted-foreground/70">
          Crafting immersive digital experiences with code, design & imagination.
        </p>
      </div>

      <div
        className={`transition-all duration-1000 delay-500 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <button onClick={onGetStarted} className="btn-glow text-primary-foreground text-lg">
          Get Started
        </button>
      </div>

      <div
        className={`absolute bottom-10 transition-all duration-1000 delay-1000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-muted-foreground/50 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
