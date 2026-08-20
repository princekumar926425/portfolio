import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* =====================================================
     SCROLL DETECTION
     ===================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =====================================================
     ACTIVE SECTION
     ===================================================== */

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(
          (entry) => entry.isIntersecting
        );

        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce(
            (previous, current) =>
              current.intersectionRatio >
              previous.intersectionRatio
                ? current
                : previous
          );

          setActiveSection(mostVisible.target.id);
        }
      },
      {
        threshold: [0.2, 0.4, 0.55, 0.7],
        rootMargin: "-10% 0px -20% 0px",
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  /* =====================================================
     CLOSE MOBILE MENU
     ===================================================== */

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  /* =====================================================
     NAVBAR
     ===================================================== */

  return (
    <nav
      className={`
        fixed
        left-0
        right-0
        top-2
        z-[9999]
        px-3
        transition-all
        duration-500

        sm:px-6
        lg:px-8

        ${
          scrolled
            ? "bg-black/40 backdrop-blur-xl"
            : "bg-transparent"
        }
      `}
    >
      <div
        className={`
          mx-auto
          flex
          w-full
          max-w-7xl
          items-center
          justify-between
          rounded-2xl
          px-3
          py-2
          transition-all
          duration-500

          sm:px-4
          sm:py-3

          ${
            scrolled
              ? "border border-white/10 bg-black/30 shadow-[0_8px_30px_rgba(0,0,0,0.20)]"
              : "border border-transparent"
          }
        `}
      >
        {/* =================================================
            LOGO
            ================================================= */}

        <a
          href="#home"
          onClick={closeMobileMenu}
          className="
            shrink-0
            bg-gradient-to-r
            from-green-400
            via-emerald-500
            to-teal-500
            bg-clip-text
            text-xl
            font-bold
            text-transparent
            transition
            duration-300
            hover:scale-110

            sm:text-2xl
          "
        >
          P.
        </a>

        {/* =================================================
            DESKTOP NAV
            ================================================= */}

        <div
          className="
            hidden
            items-center
            gap-1
            rounded-full
            border
            border-white/10
            bg-white/5
            px-2
            py-1.5
            backdrop-blur-md

            md:flex
            md:gap-1
            lg:gap-2
          "
        >
          {navItems.map((item) => {
            const isActive =
              activeSection === item.id;

            return (
              <a
                key={item.label}
                href={item.href}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-full
                  px-3
                  py-2
                  text-xs
                  transition-all
                  duration-300

                  lg:px-4
                  lg:text-sm

                  ${
                    isActive
                      ? "bg-green-400/10 text-green-400"
                      : "text-white/70 hover:-translate-y-1 hover:scale-105 hover:text-green-400"
                  }
                `}
              >
                <span className="relative z-10">
                  {item.label}
                </span>

                {/* Underline */}

                <span
                  className={`
                    absolute
                    inset-x-3
                    bottom-1
                    h-[2px]
                    rounded-full
                    bg-gradient-to-r
                    from-green-400
                    via-emerald-500
                    to-teal-500
                    transition-all
                    duration-300

                    ${
                      isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                    }
                  `}
                />

                {/* Glow */}

                <span
                  className={`
                    absolute
                    inset-0
                    rounded-full
                    blur-xl
                    transition
                    duration-300

                    ${
                      isActive
                        ? "bg-green-400/10 opacity-100"
                        : "bg-green-400/10 opacity-0 group-hover:opacity-100"
                    }
                  `}
                />
              </a>
            );
          })}
        </div>

        {/* =================================================
            MOBILE MENU BUTTON
            ================================================= */}

        <button
          type="button"
          onClick={() =>
            setMobileMenuOpen(
              (prev) => !prev
            )
          }
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-green-400/20
            bg-white/5
            text-green-300
            backdrop-blur-md
            transition
            hover:bg-green-400/10
            hover:text-green-200

            md:hidden
          "
          aria-label={
            mobileMenuOpen
              ? "Close menu"
              : "Open menu"
          }
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X size={21} />
          ) : (
            <Menu size={21} />
          )}
        </button>
      </div>

      {/* =====================================================
          MOBILE MENU
          ===================================================== */}

      <div
        className={`
          mx-3
          mt-2
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-black/80
          shadow-[0_15px_40px_rgba(0,0,0,0.35)]
          backdrop-blur-xl
          transition-all
          duration-300

          md:hidden

          ${
            mobileMenuOpen
              ? "max-h-[400px] translate-y-0 opacity-100"
              : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
          }
        `}
      >
        <div className="flex flex-col gap-1 p-2">
          {navItems.map((item) => {
            const isActive =
              activeSection === item.id;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMobileMenu}
                className={`
                  relative
                  flex
                  items-center
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? "bg-green-400/10 text-green-400"
                      : "text-white/70 hover:bg-white/5 hover:text-green-400"
                  }
                `}
              >
                {/* Active indicator */}

                <span
                  className={`
                    mr-3
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-green-400
                    transition-all
                    duration-300

                    ${
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-0 opacity-0"
                    }
                  `}
                />

                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;