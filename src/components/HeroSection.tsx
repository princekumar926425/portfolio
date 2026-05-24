import { useEffect, useState } from "react";
import myImage from "../assets/prince.png";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const words = [
  "Frontend Developer",
  "Prince Kumar Ray",
  "Creative Coder",
  "UI Builder",
];

const colors = [
  "from-yellow-300 via-amber-400 to-orange-500",
  "from-yellow-200 via-yellow-400 to-amber-500",
  "from-amber-300 via-yellow-400 to-orange-400",
  "from-yellow-400 via-orange-400 to-amber-600",
];

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const updatedText = currentWord.substring(0, text.length + 1);
        setText(updatedText);

        if (updatedText === currentWord) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        const updatedText = currentWord.substring(0, text.length - 1);
        setText(updatedText);

        if (updatedText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* background glow */}
      <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[130px]" />
      <div className="absolute bottom-16 right-8 h-52 w-52 rounded-full bg-orange-500/10 blur-[120px]" />
      <div className="absolute bottom-20 left-8 h-44 w-44 rounded-full bg-amber-400/10 blur-[110px]" />

      {/* TEXT */}
      <div
        className={`transition-all duration-1000 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-yellow-300/80">
          Welcome to my world
        </p>

        <h1 className="mb-4 text-4xl font-bold leading-tight text-white sm:text-6xl md:text-7xl">
          Hi, I&apos;m{" "}
          <span
            className={`bg-gradient-to-r ${colors[wordIndex]} bg-clip-text text-transparent transition-all duration-500 drop-shadow-[0_0_18px_rgba(250,204,21,0.28)]`}
          >
            {text}
            <span className="ml-1 animate-pulse text-yellow-300">|</span>
          </span>
        </h1>

        <p className="mb-2 text-xl font-light text-white/70 sm:text-2xl md:text-3xl">
          A Creative Developer
        </p>

        <p className="mx-auto mb-10 max-w-md text-sm text-white/50">
          Crafting immersive digital experiences with code, design & imagination.
        </p>
      </div>

      {/* ROUND IMAGE */}
      <div
        className={`mt-6 flex justify-center transition-all duration-1000 delay-200 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="relative flex items-center justify-center">
          {/* outer glow */}
          <div className="absolute h-[320px] w-[320px] rounded-full bg-yellow-400/20 blur-3xl animate-pulse" />

          {/* soft second glow */}
          <div className="absolute h-[280px] w-[280px] rounded-full bg-amber-300/10 blur-2xl" />

          {/* neon ring */}
          <div className="relative flex h-[250px] w-[250px] items-center justify-center rounded-full border-[5px] border-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.8),0_0_70px_rgba(250,204,21,0.28)] transition duration-300 hover:scale-105 md:h-[290px] md:w-[290px]">
            {/* inner circle */}
            <div className="h-[215px] w-[215px] overflow-hidden rounded-full bg-[#0a0a14] md:h-[250px] md:w-[250px]">
              <img
                src={myImage}
                alt="Prince Kumar"
                className="h-full w-full rounded-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div
        className={`mt-10 flex flex-wrap items-center justify-center gap-4 transition-all duration-1000 delay-500 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <button
          onClick={onGetStarted}
          className="rounded-full bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 px-8 py-4 text-lg font-semibold text-black shadow-[0_0_30px_rgba(250,204,21,0.35)] transition duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.45)]"
        >
          Get Started
        </button>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-yellow-400/70 bg-white/5 px-8 py-4 text-lg font-semibold text-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.12)] backdrop-blur-md transition duration-300 hover:scale-105 hover:bg-yellow-400 hover:text-black hover:shadow-[0_0_35px_rgba(250,204,21,0.45)]"
        >
          Resume
        </a>
      </div>

      {/* SCROLL */}
      <div
        className={`absolute bottom-10 transition-all duration-1000 delay-1000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-yellow-200/40">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-yellow-200/50 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;