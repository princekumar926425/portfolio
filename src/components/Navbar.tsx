import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.55,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <nav
      className={`fixed top-2 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 transition-all duration-500 ${
        scrolled
          ? "bg-black/50 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.20)]"
          : "bg-transparent"
      }`}
    >
      <a
        href="#home"
        className="text-lg font-bold bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 bg-clip-text text-transparent transition duration-300 hover:scale-110"
      >
        P.
      </a>

      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 backdrop-blur-md">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.label}
              href={item.href}
              className={`group relative overflow-hidden rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm transition-all duration-300 ${
                isActive
                  ? "bg-yellow-300/10 text-yellow-300"
                  : "text-white/70 hover:-translate-y-1 hover:scale-105 hover:text-yellow-300"
              }`}
            >
              <span className="relative z-10">{item.label}</span>

              <span
                className={`absolute inset-x-3 bottom-1 h-[2px] rounded-full bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 transition-all duration-300 ${
                  isActive
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                }`}
              />

              <span
                className={`absolute inset-0 rounded-full blur-xl transition duration-300 ${
                  isActive
                    ? "bg-yellow-300/10 opacity-100"
                    : "bg-yellow-300/10 opacity-0 group-hover:opacity-100"
                }`}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;