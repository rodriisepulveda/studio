import { motion } from 'framer-motion';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="section-title"
          >
            Quiénes Somos
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="section-description"
          >
            Somos un equipo apasionado de desarrolladores y diseñadores que se dedica a crear experiencias digitales excepcionales!
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          >
            <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-[#ff585e] dark:bg-[#3663ff] rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovación</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Buscamos constantemente nuevas tecnologías y soluciones para ofrecer lo mejor a nuestros clientes.
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-[#ff585e] dark:bg-[#3663ff] rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Experiencia</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Nuestro equipo cuenta con años de experiencia en desarrollo web y móvil.
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-[#ff585e] dark:bg-[#3663ff] rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Calidad</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Nos comprometemos a entregar productos de alta calidad que superen las expectativas.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 