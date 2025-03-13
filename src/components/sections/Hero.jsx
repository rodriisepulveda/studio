import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";

const Hero = () => {
  const words = [
    {
      text: "LACRINOIDE",
      className: "bg-clip-text text-transparent bg-gradient-to-r from-[#ff585e] to-[#ff8a8e] dark:from-[#3663ff] dark:to-[#6b8fff]",
    }
  ];

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800" />

      <div className="container mx-auto px-4 md:px-8 lg:px-12 z-10">
        <div className="grid grid-cols-1 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-8"
          >
            {/* GODINES - Tamaño ajustado */}
            <TypewriterEffectSmooth 
              words={words} 
              className="!text-[5rem] sm:!text-[6rem] md:!text-[7.5rem] lg:!text-[9rem] xl:!text-[10rem] !font-black !tracking-tighter !leading-[0.9]"
              cursorClassName="!bg-[#ff8a8e] dark:!bg-[#6b8fff]"
            />

            {/* Texto descriptivo */}
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                Soluciones integrales <span className="text-primary-light dark:text-primary-dark">GORDO</span> el <span className="text-primary-light dark:text-primary-dark">PEREIRA</span>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-200 text-lg sm:text-xl">
                Impulsando el tamaño de tu cock.
              </p>

              {/* Botones uno al lado del otro */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 pt-6"
              >
                <Link
                  to="about"
                  spy={true}
                  smooth={true}
                  offset={-64}
                  className="w-full sm:w-44 px-6 py-3 rounded-full text-base font-medium btn-primary text-center cursor-pointer select-none"
                >
                  Quiénes Somos
                </Link>

                <Link
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-64}
                  className="w-full sm:w-44 px-6 py-3 rounded-full text-base font-medium transition-all duration-200
                            border-2 border-[#ff585e] dark:border-[#3663ff] text-[#ff585e] dark:text-[#3663ff]
                            hover:bg-[#ff585e] dark:hover:bg-[#3663ff] hover:text-white dark:hover:text-white text-center
                            bg-transparent hover:shadow-lg cursor-pointer select-none"
                >
                  Contáctanos
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Flecha hacia abajo */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <Link
          to="about"
          spy={true}
          smooth={true}
          offset={-64}
          className="text-neutral-600 dark:text-neutral-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
        >
          <svg
            className="w-8 h-8 animate-bounce"
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
