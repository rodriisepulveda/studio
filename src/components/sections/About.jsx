import { motion } from 'framer-motion';
import { RiLightbulbLine, RiTeamLine, RiShieldCheckLine } from 'react-icons/ri';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 flex flex-col justify-center items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-900 dark:text-white">
            Quiénes Somos
          </motion.h2>

          <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Somos un equipo apasionado de desarrolladores y diseñadores dedicados a crear experiencias digitales excepcionales.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-6xl"
        >
          {[
            {
              icon: <RiLightbulbLine className="w-8 h-8 text-white" />, 
              title: "Innovación", 
              description: "Buscamos constantemente nuevas tecnologías y soluciones para ofrecer lo mejor a nuestros clientes."
            },
            {
              icon: <RiTeamLine className="w-8 h-8 text-white" />, 
              title: "Experiencia", 
              description: "Nuestro equipo cuenta con años de experiencia en desarrollo web y móvil."
            },
            {
              icon: <RiShieldCheckLine className="w-8 h-8 text-white" />, 
              title: "Calidad", 
              description: "Nos comprometemos a entregar productos de alta calidad que superen las expectativas."
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 bg-white dark:bg-gray-700 rounded-xl shadow-lg flex flex-col items-center w-full"
            >
              <div className="w-16 h-16 bg-[#ff585e] dark:bg-[#3663ff] rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
