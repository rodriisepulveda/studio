import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import ImageSlider from '../ui/ImageSlider';

const Hero = () => {
  const words = [
    {
      text: "PVS",
      className: "text-[#ff585e] dark:text-[#3663ff] font-black",
    }
  ];

  // Importar todas las imágenes dinámicamente
  const imageFiles = import.meta.glob('../../assets/imgs/hero/*.(png|jpeg|jpg)', { eager: true });
  const heroImages = Object.values(imageFiles).map(file => file.default);

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden flex items-center">
      {/* Fondo con slider - ajustado para móviles */}
      <div className="absolute inset-0">
        <ImageSlider 
          images={heroImages}
          interval={10000}
          transitionEffect="fade"
          containerStyle={{
            clipPath: "polygon(45% 0, 100% 0, 100% 100%, 15% 100%)",
            "@media (max-width: 768px)": {
              clipPath: "polygon(0 45%, 100% 0, 100% 100%, 0 100%)"
            }
          }}
        />
      </div>

      {/* Overlay ajustado para móviles */}
      <div 
        className="absolute inset-0 bg-white/90 dark:bg-gray-900/90" 
        style={{
          clipPath: "polygon(0 0, 70% 0, 40% 100%, 0 100%)",
          "@media (max-width: 768px)": {
            clipPath: "polygon(0 0, 100% 0, 100% 55%, 0 100%)"
          }
        }}
      />

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 gap-6 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-4 md:space-y-8"
          >
            {/* Título ajustado para móviles */}
            <TypewriterEffectSmooth 
              words={words} 
              className="!text-[3rem] sm:!text-[4rem] md:!text-[6rem] lg:!text-[8rem] xl:!text-[10rem] !font-black !tracking-tighter !leading-[0.9]"
              cursorClassName="!bg-[#ff585e] dark:!bg-[#3663ff]"
            />

            {/* Texto descriptivo ajustado */}
            <div className="space-y-3 md:space-y-4 max-w-2xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                Soluciones integrales para tu negocio
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-200">
                Desarrollo web, aplicaciones móviles y mantenimiento digital.
              </p>

              {/* Botones ajustados */}
             <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="flex flex-row flex-wrap gap-3 md:gap-4 pt-4 md:pt-6 items-start"
>
  {/* Botón de Servicios */}
  <Link
    to="services"
    spy={true}
    smooth={true}
    offset={-64}
    className="w-auto px-6 py-2 md:px-8 md:py-3 rounded-full text-sm md:text-base font-medium bg-[#ff585e] dark:bg-[#3663ff] text-white hover:bg-[#e04a50] dark:hover:bg-[#2a4fd6] shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 cursor-pointer flex items-center justify-center"
  >
    Servicios
  </Link>

  {/* Botón de Contáctanos */}
  <Link
    to="contact"
    spy={true}
    smooth={true}
    offset={-64}
    className="w-auto px-6 py-2 md:px-8 md:py-3 rounded-full text-sm md:text-base font-medium border-2 border-[#ff585e] dark:border-[#3663ff] text-[#ff585e] dark:text-[#3663ff] hover:bg-[#ff585e] dark:hover:bg-[#3663ff] hover:text-white dark:hover:text-white hover:scale-105 transform transition-all duration-300 cursor-pointer flex items-center justify-center"
  >
    Contáctanos
  </Link>
</motion.div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Efecto de difuminado mejorado */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="h-64 bg-gradient-to-t from-white dark:from-gray-900 via-white/80 dark:via-gray-900/80 to-transparent"></div>
      </div>

      {/* Flecha de scroll */}
      <motion.div 
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <Link
          to="about"
          spy={true}
          smooth={true}
          offset={-64}
          className="text-neutral-600 dark:text-neutral-400 hover:text-[#ff585e] dark:hover:text-[#3663ff] transition-colors"
        >
          <svg
            className="w-6 h-6 md:w-8 md:h-8 animate-bounce"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;