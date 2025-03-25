"use client";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import ImageSlider from '../ui/ImageSlider';

// Importar imágenes
import meeting1 from '../../assets/imgs/hero/meeting1.jpeg';
import meeting2 from '../../assets/imgs/hero/meeting2.jpeg';
import meeting3 from '../../assets/imgs/hero/meeting3.png';
import meeting4 from '../../assets/imgs/hero/meeting4.jpeg';
import meeting5 from '../../assets/imgs/hero/meeting5.jpeg';
import meeting6 from '../../assets/imgs/hero/meeting6.jpeg';
import meeting7 from '../../assets/imgs/hero/meeting7.jpeg';
import pexelsPhoto3726363 from '../../assets/imgs/hero/pexels-photo-3726363.jpeg';
import pexelsPhoto11813187 from '../../assets/imgs/hero/pexels-photo-11813187.jpeg';

const Hero = () => {
  const words = [
    {
      text: "PVS",
      className: "text-[#3663ff] font-black",
    }
  ];

  // Array de imágenes
  const heroImages = [
    { src: meeting1, alt: "Reunión de equipo" },
    { src: meeting2, alt: "Equipo trabajando" },
    { src: meeting3, alt: "Desarrolladores colaborando" },
    { src: meeting4, alt: "Presentación de proyecto" },
    { src: meeting5, alt: "Análisis de datos" },
    { src: meeting6, alt: "Planificación de proyecto" },
    { src: meeting7, alt: "Trabajo en aplicación" },
    { src: pexelsPhoto3726363, alt: "Equipo en entorno moderno" },
    { src: pexelsPhoto11813187, alt: "Discusión de soluciones" },
  ];

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden flex items-center">
      <h1 className="sr-only">PVS - Soluciones digitales para tu negocio</h1>

      {/* Fondo con slider */}
      <div className="absolute inset-0 z-0">
        <ImageSlider 
          images={heroImages}
          interval={10000}
          transitionEffect="fade"
        />
      </div>

      {/* Overlay con opacidad sobre el slider */}
      <div className="absolute inset-0 bg-gray-900/80 z-1"></div>

      {/* Contenido principal alineado a la izquierda sin fondo */}
      <div className="container mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          {/* Título */}
          <TypewriterEffectSmooth 
            words={words} 
            className="!text-[3rem] sm:!text-[4rem] md:!text-[5rem] !font-black !leading-[0.9] text-left"
            cursorClassName="!bg-[#3663ff]"
          />

          {/* Texto descriptivo */}
          <div className="space-y-4 mt-6 text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-100">
              Soluciones digitales hechas a tu medida
            </h2>
            <p className="text-base sm:text-lg text-gray-300">
              Desarrollo web, aplicaciones móviles y mantenimiento digital.
            </p>

            {/* Botones */}
            <div className="flex flex-wrap gap-4 pt-6">
              <Link
                to="services"
                spy={true}
                smooth={true}
                offset={-64}
                aria-label="Ver nuestros servicios"
                className="px-6 py-3 rounded-full text-sm sm:text-base font-medium bg-[#3663ff] text-white hover:scale-105 transition-transform cursor-pointer flex items-center justify-center"
              >
                Servicios
              </Link>

              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-64}
                aria-label="Contactar a nuestro equipo"
                className="px-6 py-3 rounded-full text-sm sm:text-base font-medium border-2 border-white text-white hover:bg-white hover:text-[#3663ff] transition-colors cursor-pointer"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Degradado de transición */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-5"></div>

      {/* Flecha de scroll */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Link
          to="about"
          spy={true}
          smooth={true}
          className="text-gray-300 cursor-pointer"
        >
          <svg
            className="w-8 h-8 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;