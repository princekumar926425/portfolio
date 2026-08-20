import { useEffect, useRef, useState } from "react";

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
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

  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-10 flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      {/* =====================================================
          BACKGROUND GLOW
          ===================================================== */}

      <div className="pointer-events-none absolute left-1/2 top-10 h-48 w-48 -translate-x-1/2 rounded-full bg-green-500/15 blur-[100px] sm:top-20 sm:h-72 sm:w-72 sm:blur-[130px]" />

      <div className="pointer-events-none absolute bottom-10 left-[-40px] h-40 w-40 rounded-full bg-emerald-400/10 blur-[100px] sm:left-10 sm:h-48 sm:w-48 sm:blur-[120px]" />

      <div className="pointer-events-none absolute bottom-10 right-[-40px] h-40 w-40 rounded-full bg-green-500/10 blur-[100px] sm:right-10 sm:h-56 sm:w-56 sm:blur-[120px]" />

      {/* =====================================================
          MAIN CONTAINER
          ===================================================== */}

      <div className="mx-auto w-full max-w-7xl min-w-0">
        {/* ===================================================
            HEADING
            =================================================== */}

        <div className="mb-10 px-1 text-center sm:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-green-400 sm:text-sm sm:tracking-[0.35em]">
            Contact
          </p>

          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-green-500 bg-clip-text text-transparent">
              connect
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-relaxed">
            Have a project in mind? Let&apos;s bring your ideas to life.
          </p>
        </div>

        {/* ===================================================
            CONTACT GRID
            =================================================== */}

        <div className="grid min-w-0 gap-6 md:gap-8 lg:grid-cols-2">
          {/* =================================================
              LEFT FORM
              ================================================= */}

          <div
            className={`relative min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-1000 sm:p-6 ${
              visible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            {/* Glow */}

            <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-green-300 via-emerald-400 to-green-500 opacity-20 blur-2xl sm:opacity-25" />

            <div className="relative z-10">
              <h3 className="mb-5 text-xl font-semibold text-white sm:text-2xl">
                Send Me a Message
              </h3>

              {/* Name + Email */}

              <div className="grid min-w-0 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Name"
                  className="min-w-0 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none transition focus:border-green-400/50 focus:ring-2 focus:ring-green-400/10 sm:text-base"
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="min-w-0 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none transition focus:border-green-400/50 focus:ring-2 focus:ring-green-400/10 sm:text-base"
                />
              </div>

              {/* Message */}

              <textarea
                placeholder="Your message..."
                className="mt-4 min-h-[140px] w-full resize-none rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none transition focus:border-green-400/50 focus:ring-2 focus:ring-green-400/10 sm:min-h-[160px] sm:text-base"
              />

              {/* Send Button */}

              <button
                type="button"
                className="
                  mt-5
                  w-full
                  rounded-full
                  bg-gradient-to-r
                  from-green-300
                  via-emerald-400
                  to-green-500
                  py-3
                  text-sm
                  font-semibold
                  text-black
                  shadow-[0_0_25px_rgba(34,197,94,0.3)]
                  transition
                  duration-300
                  hover:scale-[1.02]
                  hover:shadow-[0_0_35px_rgba(34,197,94,0.5)]
                  sm:mt-6
                  sm:text-base
                "
              >
                Send Message
              </button>
            </div>
          </div>

          {/* =================================================
              RIGHT CONTACT INFO
              ================================================= */}

          <div
            className={`relative min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-1000 delay-200 sm:p-6 ${
              visible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            {/* Glow */}

            <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-green-300 via-emerald-400 to-green-500 opacity-20 blur-2xl sm:opacity-25" />

            <div className="relative z-10 flex h-full flex-col justify-center">
              <h3 className="mb-6 text-xl font-semibold text-white sm:text-2xl">
                Contact Info
              </h3>

              <div className="space-y-5 sm:space-y-6">
                {/* Name */}

                <div className="min-w-0">
                  <p className="mb-1 text-xs text-green-400 sm:text-sm">
                    Name
                  </p>

                  <p className="break-words font-semibold text-white">
                    Prince Kumar Ray
                  </p>
                </div>

                {/* Phone */}

                <div className="min-w-0">
                  <p className="mb-1 text-xs text-green-400 sm:text-sm">
                    Phone
                  </p>

                  <a
                    href="tel:+919264257968"
                    className="break-words text-sm text-white/80 transition hover:text-green-300 sm:text-base"
                  >
                    +91 9264257968
                  </a>
                </div>

                {/* Email */}

                <div className="min-w-0">
                  <p className="mb-1 text-xs text-green-400 sm:text-sm">
                    Email
                  </p>

                  <a
                    href="mailto:princekumar926425@gmail.com"
                    className="block break-all text-sm text-white/80 transition hover:text-green-300 sm:text-base"
                  >
                    princekumar926425@gmail.com
                  </a>
                </div>

                {/* Location */}

                <div className="min-w-0">
                  <p className="mb-1 text-xs text-green-400 sm:text-sm">
                    Location
                  </p>

                  <p className="text-sm text-white/80 sm:text-base">
                    India
                  </p>
                </div>

                {/* Role */}

                <div className="min-w-0">
                  <p className="mb-1 text-xs text-green-400 sm:text-sm">
                    Role
                  </p>

                  <p className="break-words text-sm leading-6 text-white/80 sm:text-base">
                    Frontend Developer &amp; DSA Solver
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            SOCIAL LINKS
            =================================================== */}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 px-2 text-sm text-white/70 sm:mt-10 sm:gap-6 sm:text-base">
          <a
            href="https://github.com/princekumar926425"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-green-400"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/prince-kumar-4a4665320/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-green-400"
          >
            LinkedIn
          </a>

          <a
            href="#"
            className="transition hover:text-green-400"
          >
            Instagram
          </a>

          <a
            href="https://leetcode.com/u/PrinceKumarRay/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-green-400"
          >
            LeetCode
          </a>
        </div>

        {/* ===================================================
            FOOTER
            =================================================== */}

        <p className="mt-5 px-2 text-center text-xs leading-6 text-white/40 sm:mt-6 sm:text-sm">
          © 2026 Prince Kumar Ray. Built with passion ⚡
        </p>
      </div>
    </section>
  );
};

export default ContactSection;