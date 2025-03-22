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
    <section id="about" className="min-h-screen py-16 px-4">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Sobre Nosotros</h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mt-4">
            Conoce al equipo detrás de las soluciones
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Columna izquierda - Team Slider */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-8 lg:mb-0"
          >
            <TeamSlider team={team} />
          </motion.div>

          {/* Columna derecha - Cards existentes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 md:space-y-6"
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
                description: "Garantizamos un servicio de calidad, robusto, eficiente y un equipo de trabajo altamente capacitado."
              },
              {
                icon: <RiShieldCheckLine className="w-8 h-8 text-white" />, 
                title: "Calidad", 
                description: "Colaboramos estrechamente con el cliente en cada etapa del proceso, asegurando un producto final que no solo cumpla, sino que supere tus expectativas."
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.2 }
                }}
                className="p-4 md:p-8 bg-white dark:bg-gray-700 rounded-xl shadow-lg flex flex-col items-center w-full
                         transform transition-all duration-200 hover:border-[#ff585e] dark:hover:border-[#3663ff]
                         border-2 border-transparent"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#ff585e] dark:bg-[#3663ff] rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 text-center">
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
