import { useEffect, useState } from "react";
import myImage from "../assets/prince.png";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const words = [
  "Frontend Developer",
  "Mernstack Developer",
  "Prince Kumar Ray",
  "Creative Coder",
  "UI Builder",
];

const colors = [
  "from-green-300 via-emerald-400 to-cyan-500",
  "from-green-200 via-green-400 to-emerald-500",
  "from-emerald-300 via-green-400 to-cyan-400",
  "from-green-400 via-emerald-500 to-cyan-500",
];

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  /* =====================================================
     INTRO ANIMATION
     ===================================================== */

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  /* =====================================================
     TYPING EFFECT
     ===================================================== */

  useEffect(() => {
    const currentWord = words[wordIndex];

    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const updatedText = currentWord.substring(
          0,
          text.length + 1
        );

        setText(updatedText);

        if (updatedText === currentWord) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 1200);
        }
      } else {
        const updatedText = currentWord.substring(
          0,
          text.length - 1
        );

        setText(updatedText);

        if (updatedText === "") {
          setIsDeleting(false);

          setWordIndex(
            (prev) => (prev + 1) % words.length
          );
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <div
      className="
        relative
        z-10
        flex
        min-h-screen
        w-full
        flex-col
        items-center
        justify-center
        overflow-hidden
        px-4
        pb-16
        pt-24
        text-center

        sm:px-6
        sm:pb-20
        sm:pt-28

        lg:px-8
        lg:pt-20
      "
    >
      {/* =================================================
          BACKGROUND GLOW
          ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-20
          h-48
          w-48
          -translate-x-1/2
          rounded-full
          bg-green-500/10
          blur-[90px]

          sm:top-24
          sm:h-72
          sm:w-72
          sm:blur-[130px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-16
          right-[-30px]
          h-40
          w-40
          rounded-full
          bg-emerald-500/10
          blur-[100px]

          sm:right-8
          sm:h-52
          sm:w-52
          sm:blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-20
          left-[-30px]
          h-36
          w-36
          rounded-full
          bg-cyan-400/10
          blur-[90px]

          sm:left-8
          sm:h-44
          sm:w-44
          sm:blur-[110px]
        "
      />

      {/* =================================================
          TEXT CONTENT
          ================================================= */}

      <div
        className={`
          w-full
          max-w-4xl
          transition-all
          duration-1000

          ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }
        `}
      >
        {/* Welcome */}

        <p
          className="
            mb-3
            text-[10px]
            font-medium
            uppercase
            tracking-[0.2em]
            text-green-300/80

            sm:mb-4
            sm:text-sm
            sm:tracking-[0.3em]
          "
        >
          Welcome to my world
        </p>

        {/* Main Heading */}

        <h1
          className="
            mx-auto
            mb-4
            max-w-[340px]
            text-3xl
            font-bold
            leading-[1.15]
            text-white

            sm:max-w-3xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
          "
        >
          Hi, I&apos;m{" "}
          <span
            className={`
              bg-gradient-to-r
              ${colors[wordIndex]}
              bg-clip-text
              text-transparent
              drop-shadow-[0_0_18px_rgba(34,197,94,0.45)]
              transition-all
              duration-500
            `}
          >
            {text}
            <span className="ml-1 animate-pulse text-green-300">
              |
            </span>
          </span>
        </h1>

        {/* Subtitle */}

        <p
          className="
            mb-2
            text-lg
            font-light
            text-white/70

            sm:text-2xl
            md:text-3xl
          "
        >
          A Creative Developer
        </p>

        {/* Description */}

        <p
          className="
            mx-auto
            mb-8
            max-w-[330px]
            text-xs
            leading-6
            text-white/50

            sm:mb-10
            sm:max-w-md
            sm:text-sm
            sm:leading-relaxed
          "
        >
          Crafting immersive digital experiences with code,
          design &amp; imagination.
        </p>
      </div>

      {/* =================================================
          PROFILE IMAGE
          ================================================= */}

      <div
        className={`
          mt-2
          flex
          justify-center
          transition-all
          duration-1000
          delay-200

          sm:mt-4

          ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }
        `}
      >
        <div className="relative flex items-center justify-center">
          {/* Outer glow */}

          <div
            className="
              pointer-events-none
              absolute
              h-[230px]
              w-[230px]
              rounded-full
              bg-green-400/20
              blur-3xl
              animate-pulse

              sm:h-[320px]
              sm:w-[320px]
            "
          />

          {/* Second glow */}

          <div
            className="
              pointer-events-none
              absolute
              h-[210px]
              w-[210px]
              rounded-full
              bg-emerald-300/10
              blur-2xl

              sm:h-[280px]
              sm:w-[280px]
            "
          />

          {/* Neon Ring */}

          <div
            className="
              relative
              flex
              h-[190px]
              w-[190px]
              items-center
              justify-center
              rounded-full
              border-[4px]
              border-green-400
              shadow-[0_0_20px_rgba(34,197,94,0.8),0_0_55px_rgba(34,197,94,0.35)]
              transition
              duration-300

              hover:scale-105

              sm:h-[250px]
              sm:w-[250px]
              sm:border-[5px]

              md:h-[290px]
              md:w-[290px]
            "
          >
            {/* Inner Circle */}

            <div
              className="
                h-[164px]
                w-[164px]
                overflow-hidden
                rounded-full
                bg-[#0a0a14]

                sm:h-[215px]
                sm:w-[215px]

                md:h-[250px]
                md:w-[250px]
              "
            >
              <img
                src={myImage}
                alt="Prince Kumar Ray"
                loading="eager"
                className="
                  h-full
                  w-full
                  rounded-full
                  object-cover
                  object-top
                "
              />
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          BUTTONS
          ================================================= */}

      <div
        className={`
          mt-8
          flex
          w-full
          max-w-[340px]
          flex-col
          items-center
          justify-center
          gap-3
          transition-all
          duration-1000
          delay-500

          sm:mt-10
          sm:max-w-none
          sm:flex-row
          sm:gap-4

          ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }
        `}
      >
        {/* Get Started */}

        <button
          onClick={onGetStarted}
          className="
            w-full
            rounded-full
            bg-gradient-to-r
            from-green-300
            via-emerald-400
            to-cyan-500
            px-7
            py-3
            text-sm
            font-semibold
            text-black
            shadow-[0_0_30px_rgba(34,197,94,0.45)]
            transition
            duration-300
            hover:scale-105
            hover:shadow-[0_0_40px_rgba(34,197,94,0.7)]

            sm:w-auto
            sm:px-8
            sm:py-4
            sm:text-lg
          "
        >
          Get Started
        </button>

        {/* Resume */}

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="
            w-full
            rounded-full
            border
            border-green-400/70
            bg-white/5
            px-7
            py-3
            text-sm
            font-semibold
            text-green-300
            shadow-[0_0_20px_rgba(34,197,94,0.25)]
            backdrop-blur-md
            transition
            duration-300
            hover:scale-105
            hover:bg-green-400
            hover:text-black
            hover:shadow-[0_0_35px_rgba(34,197,94,0.45)]

            sm:w-auto
            sm:px-8
            sm:py-4
            sm:text-lg
          "
        >
          Resume
        </a>
      </div>

      {/* =================================================
          SCROLL INDICATOR
          ================================================= */}

      <div
        className={`
          mt-10
          hidden
          transition-all
          duration-1000
          delay-1000

          sm:absolute
          sm:bottom-8
          sm:mt-0
          sm:block

          ${
            visible
              ? "opacity-100"
              : "opacity-0"
          }
        `}
      >
        <div className="flex flex-col items-center gap-2 text-green-200/40">
          <span className="text-xs uppercase tracking-widest">
            Scroll
          </span>

          <div className="h-8 w-px bg-gradient-to-b from-green-200/50 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;