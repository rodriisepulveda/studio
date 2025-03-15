import { motion } from 'framer-motion';
import { RiLightbulbLine, RiTeamLine, RiShieldCheckLine } from 'react-icons/ri';
import TeamSlider from '../ui/TeamSlider';

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

  const team = [
    {
      name: "Rodrigo Sepúlveda",
      nickname: "IDONNEO",
      role: "Frontend Developer",
      image: "https://avatar.iran.liara.run/public/33",
      description: "Especializado en crear interfaces modernas y responsivas utilizando React y Tailwind CSS. Apasionado por la experiencia de usuario y las animaciones fluidas."
    },
    {
      name: "Facundo Preiss",
      nickname: "Montblack00",
      role: "Backend Developer",
      image: "https://avatar.iran.liara.run/public/48",
      description: "Experto en desarrollo de APIs y bases de datos, con enfoque en la seguridad y el rendimiento. Especialista en arquitectura de sistemas."
    },
    {
      name: "Brian Valls",
      nickname: "Maverick",
      role: "Full Stack Developer",
      image: "https://avatar.iran.liara.run/public/46",
      description: "Desarrollador versátil con experiencia en tecnologías frontend y backend. Enfocado en crear soluciones integrales y escalables."
    }
  ];

  return (
    <section id="about" className="h-screen flex items-center bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Sobre Nosotros</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
            Conoce al equipo detrás de las soluciones
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Columna izquierda - Team Slider */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <TeamSlider team={team} />
          </motion.div>

          {/* Columna derecha - Cards existentes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
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
      </div>
    </section>
  );
};

export default About;
