import { useEffect, useRef, useState } from "react";

const ContactSection = () => {
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
    <section id="contact" ref={ref} className="relative z-10 flex min-h-screen items-center justify-center px-4 py-20">
      <div className={`mx-auto max-w-2xl text-center transition-all duration-1000 ${visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-neon-green">Contact</p>
        <h2 className="mb-4 text-4xl font-bold text-foreground text-glow sm:text-5xl">
          Let's <span className="gradient-text">connect</span>
        </h2>
        <p className="mb-10 text-muted-foreground">
          Have a project in mind? Let's bring your ideas to life.
        </p>

        <div className="section-card mx-auto max-w-lg">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-5 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/30"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/30"
              />
            </div>
            <textarea
              placeholder="Your message..."
              rows={4}
              className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/30 resize-none"
            />
            <button type="submit" className="btn-glow w-full text-primary-foreground">
              Send Message
            </button>
          </form>
        </div>

        <div className="mt-12 flex justify-center gap-8">
          {["GitHub", "LinkedIn", "Twitter"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-neon-purple"
            >
              {social}
            </a>
          ))}
        </div>

        <p className="mt-16 text-xs text-muted-foreground/40">
          © 2026 Alex. Built with passion & pixels.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
