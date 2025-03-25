"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-scroll";
import { FiMenu, FiX } from "react-icons/fi";

const sections = [
  { id: "hero", label: "Inicio", offset: -80 },
  { id: "about", label: "Quiénes Somos", offset: -80 },
  { id: "services", label: "Servicios", offset: -80 },
  { id: "contact", label: "Contacto", offset: -80 }
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const sectionRefs = useRef({});
  const navbarRef = useRef(null);

  // Cerrar el menú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    sections.forEach(({ id }) => {
      sectionRefs.current[id] = document.getElementById(id);
    });
  }, []);

  const handleScroll = useCallback(() => {
    clearTimeout(window.scrollDebounce);
    window.scrollDebounce = setTimeout(() => {
      const scrollPosition = window.scrollY;
      let currentSection = "";

      sections.forEach(({ id }) => {
        const element = sectionRefs.current[id];
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (id === "hero") {
            if (scrollPosition < elementBottom - 100) {
              currentSection = id;
            }
          } else if (scrollPosition >= elementTop - 100 && scrollPosition <= elementBottom) {
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
    <nav 
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-[1000] bg-gray-900/80 backdrop-blur-md shadow-md"
    >
      <div className="container mx-auto px-4 relative">
        <div className="flex justify-between items-center py-4">
          {/* Botón de hamburguesa para móviles */}
          <button
            className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menú de navegación"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Texto PVS (solo visible en móviles) */}
          <div className="md:hidden text-[#3663ff] font-bold text-xl mr-2">
            PVS
          </div>

          {/* Menú para desktop (oculto en móviles) */}
          <div className="hidden md:flex justify-center flex-1">
            {sections.map((section) => (
              <Link
                key={section.id}
                to={section.id}
                spy={true}
                smooth={true}
                duration={800}
                offset={section.offset}
                aria-label={`Ir a ${section.label}`}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                          hover:bg-gray-800/40 cursor-pointer text-white
                          ${activeSection === section.id
                            ? "bg-gray-800/40 text-white shadow-md"
                            : "text-gray-400"
                          }`}
              >
                {section.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Menú móvil (solo visible cuando isOpen es true) */}
        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col space-y-2">
            {sections.map((section) => (
              <Link
                key={section.id}
                to={section.id}
                spy={true}
                smooth={true}
                duration={800}
                offset={section.offset}
                onClick={() => setIsOpen(false)}
                aria-label={`Ir a ${section.label}`}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300
                          hover:bg-gray-800/40 cursor-pointer text-white
                          ${activeSection === section.id
                            ? "bg-gray-800/40 text-white shadow-md"
                            : "text-gray-400"
                          }`}
              >
                {section.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;