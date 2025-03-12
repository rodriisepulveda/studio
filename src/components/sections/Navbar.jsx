"use client";
import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";

const sections = [
  { id: "about", label: "Quiénes Somos", offset: -80 },
  { id: "services", label: "Servicios", offset: -80 },
  { id: "contact", label: "Contacto", offset: -80 }
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const heroHeight = document.getElementById("hero")?.offsetHeight || 0;
      setIsVisible(scrollPosition > heroHeight - 50);

      // Encontrar la sección activa
      let currentSection = "";
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;
          
          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            currentSection = id;
          }
        }
      });

      // Si estamos cerca del final de la página, activar la última sección
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (nearBottom) {
        currentSection = "contact";
      }

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Llamada inicial para establecer el estado correcto
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible
          ? "bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-md"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-center space-x-6 py-4">
        {sections.map((section) => (
          <Link
            key={section.id}
            to={section.id}
            spy={false}
            smooth={true}
            duration={800}
            offset={section.offset}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
              hover:bg-white/20 dark:hover:bg-gray-800/40 cursor-pointer
              ${
                activeSection === section.id
                  ? "bg-white/30 dark:bg-gray-800/40 text-gray-900 dark:text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400"
              }
            `}
          >
            {section.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar; 