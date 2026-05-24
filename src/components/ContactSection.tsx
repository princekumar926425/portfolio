import { useEffect, useRef, useState } from "react";

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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

  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-10 flex min-h-screen items-center justify-center px-4 py-20"
    >
      {/* glow bg */}
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-500/15 blur-[130px]" />

      <div className="mx-auto w-full max-w-7xl">
        {/* heading */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-yellow-400">
            Contact
          </p>

          <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            Let's{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              connect
            </span>
          </h2>

          <p className="mt-4 text-muted-foreground">
            Have a project in mind? Let’s bring your ideas to life.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-8 lg:grid-cols-2">
          
          {/* LEFT FORM */}
          <div
            className={`relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-1000 ${
              visible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            {/* 🔥 glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 opacity-25 blur-2xl" />

            <div className="relative z-10">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  placeholder="Name"
                  className="rounded-xl bg-black/30 p-3 text-white outline-none border border-white/10"
                />
                <input
                  placeholder="Email"
                  className="rounded-xl bg-black/30 p-3 text-white outline-none border border-white/10"
                />
              </div>

              <textarea
                placeholder="Your message..."
                className="mt-4 w-full rounded-xl bg-black/30 p-3 text-white outline-none border border-white/10 h-32"
              />

              <button className="mt-6 w-full rounded-full bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 py-3 font-semibold text-black shadow-[0_0_25px_rgba(250,204,21,0.3)] hover:scale-105 transition">
                Send Message
              </button>
            </div>
          </div>

          {/* RIGHT INFO */}
          <div
            className={`relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md flex flex-col justify-center space-y-6 transition-all duration-1000 delay-200 ${
              visible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            {/* 🔥 glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 opacity-25 blur-2xl" />

            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-semibold text-white">
                Contact Info
              </h3>

              <div>
                <p className="text-yellow-400 text-sm">Name</p>
                <p className="text-white font-semibold">
                  Prince Kumar Ray
                </p>
              </div>

              <div>
                <p className="text-yellow-400 text-sm">Phone</p>
                <p className="text-white/80">+91 9264257968</p>
              </div>

              <div>
                <p className="text-yellow-400 text-sm">Email</p>
                <p className="text-white/80">princekumar926425@gmail.com</p>
              </div>

              <div>
                <p className="text-yellow-400 text-sm">Location</p>
                <p className="text-white/80">India</p>
              </div>

              <div>
                <p className="text-yellow-400 text-sm">Role</p>
                <p className="text-white/80">
                  Frontend Developer & DSA Solver
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SOCIAL */}
        <div className="mt-10 flex justify-center gap-6 text-white/70">
          <a href="https://github.com/princekumar926425">GitHub</a>
          <a href="https://www.linkedin.com/in/prince-kumar-4a4665320/">LinkedIn</a>
          <a href="#">Instagram</a>
          <a href="https://leetcode.com/u/PrinceKumarRay/">LeetCode</a>
        </div>

        <p className="mt-6 text-center text-white/40 text-sm">
          © 2026 Prince Kumar Ray. Built with passion ⚡
        </p>
      </div>
    </section>
  );
};

export default ContactSection;