"use client";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import ImageSlider from '../ui/ImageSlider';
import LogoSlider from '../LogoSlider/LogoSlider';

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
    { src: meeting1, alt: "Reunión de equipo en oficina moderna" },
    { src: meeting2, alt: "Equipo de desarrollo trabajando en conjunto" },
    { src: meeting3, alt: "Programadores colaborando en código" },
    { src: meeting4, alt: "Presentación de proyecto digital" },
    { src: meeting5, alt: "Analista revisando datos en pantalla" },
    { src: meeting6, alt: "Planificación estratégica de proyecto" },
    { src: meeting7, alt: "Desarrollador trabajando en aplicación móvil" },
    { src: pexelsPhoto3726363, alt: "Equipo tecnológico en espacio de trabajo" },
    { src: pexelsPhoto11813187, alt: "Profesionales discutiendo soluciones digitales" },
  ];

  // Array de logos para el slider
  const logos = [
    { src: "/src/assets/imgs/tech/Android.svg", alt: "Android" },
    { src: "/src/assets/imgs/tech/AWS.svg", alt: "AWS" },
    { src: "/src/assets/imgs/tech/Express.svg", alt: "Express" },
    { src: "/src/assets/imgs/tech/Firebase.svg", alt: "Firebase" },
    { src: "/src/assets/imgs/tech/HTML5.svg", alt: "HTML5" },
    { src: "/src/assets/imgs/tech/Java.svg", alt: "Java" },
    { src: "/src/assets/imgs/tech/JavaScript.svg", alt: "JavaScript" },
    { src: "/src/assets/imgs/tech/Kotlin.svg", alt: "Kotlin" },
    { src: "/src/assets/imgs/tech/MongoDB.svg", alt: "MongoDB" },
    { src: "/src/assets/imgs/tech/MySQL.svg", alt: "MySQL" },
    { src: "/src/assets/imgs/tech/Node.js.svg", alt: "Node.js" },
    { src: "/src/assets/imgs/tech/PHP.svg", alt: "PHP" },
    { src: "/src/assets/imgs/tech/React.svg", alt: "React" },
    { src: "/src/assets/imgs/tech/Tailwind CSS.svg", alt: "Tailwind CSS" }
  ];

  return (
    <section 
      id="hero" 
      className="min-h-screen relative overflow-hidden flex items-center"
      aria-labelledby="hero-heading"
      data-scroll
      data-scroll-speed="-0.5"
    >
      <h1 id="hero-heading" className="sr-only">PVS - Soluciones digitales para tu negocio</h1>

      {/* Fondo con slider */}
      <div className="absolute inset-0 z-0">
        <ImageSlider 
          images={heroImages}
          interval={10000}
          transitionEffect="fade"
          aria-hidden="true"
        />
      </div>

      {/* Overlay con opacidad sobre el slider */}
      <div className="absolute inset-0 bg-gray-900/80 z-1" aria-hidden="true"></div>

      {/* Contenido principal */}
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
            aria-label="PVS Soluciones Digitales"
          />

          {/* Texto descriptivo */}
          <div className="space-y-4 mt-6 text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Soluciones digitales hechas a tu medida
            </h2>
            <p className="text-base sm:text-lg text-gray-300">
              Desarrollo web, aplicaciones móviles y mantenimiento digital profesional.
            </p>

            {/* Botones */}
            <div className="flex flex-wrap gap-4 pt-6">
              <Link
                to="services"
                spy={true}
                smooth={true}
                offset={-64}
                href="#services"
                aria-label="Ver nuestros servicios de desarrollo"
                className="px-6 py-3 rounded-full text-sm sm:text-base font-medium bg-[#3663ff] text-white hover:scale-105 transition-transform cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#3663ff] focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Servicios
              </Link>

              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-64}
                href="#contact"
                aria-label="Contactar a nuestro equipo"
                className="px-6 py-3 rounded-full text-sm sm:text-base font-medium border-2 border-white text-white hover:bg-white hover:text-[#3663ff] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3663ff] focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Logo Slider - Se mantiene en su posición actual */}
      <div className="absolute bottom-20 w-full z-20">
        <LogoSlider logos={logos} />
      </div>

      {/* Degradado de transición - Más sutil y menos alto */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent z-15" aria-hidden="true"></div>

      {/* Flecha de scroll - Se mantiene en su posición actual */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-25"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Link
          to="about"
          spy={true}
          smooth={true}
          href="#about"
          className="text-gray-300 cursor-pointer focus:outline-none"
          aria-label="Desplazarse a la sección siguiente"
        >
          <svg
            className="w-8 h-8 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
          <span className="sr-only">Desplazarse hacia abajo</span>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;