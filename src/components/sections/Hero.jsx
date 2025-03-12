import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800" />
      
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#ff585e] to-[#ff8a8e] dark:from-[#3663ff] dark:to-[#6b8fff]">
            GODINES
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Desarrollamos soluciones web y móviles innovadoras que impulsan el crecimiento de tu negocio
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="about"
              spy={true}
              smooth={true}
              offset={-64}
              className="btn-primary"
            >
              Quiénes Somos
            </Link>
            
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-64}
              className="px-6 py-3 rounded-lg font-medium transition-all duration-200
                        border-2 border-[#ff585e] dark:border-[#3663ff] text-[#ff585e] dark:text-[#3663ff]
                        hover:bg-[#ff585e] dark:hover:bg-[#3663ff] hover:text-white"
            >
              Contáctanos
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
