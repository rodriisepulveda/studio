"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-scroll";
import ThemeSwitch from "../ui/theme-switch";

const sections = [
  { id: "about", label: "Quiénes Somos", offset: -80 },
  { id: "services", label: "Servicios", offset: -80 },
  { id: "contact", label: "Contacto", offset: -80 }
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRefs = useRef({});

  useEffect(() => {
    sections.forEach(({ id }) => {
      sectionRefs.current[id] = document.getElementById(id);
    });
  }, []);

  const handleScroll = useCallback(() => {
    clearTimeout(window.scrollDebounce);
    window.scrollDebounce = setTimeout(() => {
      const scrollPosition = window.scrollY;
      const aboutSection = sectionRefs.current["about"];

      if (aboutSection) {
        const aboutTop = aboutSection.offsetTop;
        setIsVisible(scrollPosition >= aboutTop - 100);
      }

      let currentSection = "";
      sections.forEach(({ id }) => {
        const element = sectionRefs.current[id];
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop - 100 && scrollPosition <= elementBottom) {
            currentSection = id;
          }
        }
      });

      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (nearBottom) {
        currentSection = "contact";
      }

      if (currentSection) {
        setActiveSection(currentSection);
      }
    }, 100);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isVisible ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md opacity-100"
               : "opacity-0 pointer-events-none"
    }`}>
      <div className="container mx-auto px-4 relative">
        <div className="flex justify-center py-4">
          {sections.map((section) => (
            <Link
            key={section.id}
            to={section.id}
            spy={true}
            smooth={true}
            duration={800}
            offset={section.offset}
            aria-label={`Ir a la sección ${section.label}`} // Agregar aria-label
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                        hover:bg-white/20 dark:hover:bg-gray-800/40 cursor-pointer
                        ${activeSection === section.id
                          ? "bg-white/30 dark:bg-gray-800/40 text-gray-900 dark:text-white shadow-md"
                          : "text-gray-600 dark:text-gray-400"
                        }`}
          >
            {section.label}
          </Link>
          ))}
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
