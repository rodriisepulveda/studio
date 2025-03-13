import { motion } from 'framer-motion';
import { RiLightbulbLine, RiTeamLine, RiShieldCheckLine } from 'react-icons/ri';


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
                <RiLightbulbLine className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovación</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Buscamos constantemente nuevas tecnologías y soluciones para ofrecer lo mejor a nuestros clientes.
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-[#ff585e] dark:bg-[#3663ff] rounded-full flex items-center justify-center mb-4 mx-auto">
                <RiTeamLine className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Experiencia</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Nuestro equipo cuenta con años de experiencia en desarrollo web y móvil.
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-[#ff585e] dark:bg-[#3663ff] rounded-full flex items-center justify-center mb-4 mx-auto">
                <RiShieldCheckLine className="w-6 h-6 text-white" />
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