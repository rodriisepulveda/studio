import { motion, AnimatePresence } from 'framer-motion';
import { RiCodeSSlashLine, RiSmartphoneLine, RiSettings4Line, RiArrowDownSLine, RiLayoutGridLine } from 'react-icons/ri';
import { useState } from 'react';

const Services = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const services = [
    {
      title: "Desarrollo Web",
      description: "Creamos sitios web modernos y responsivos con integración de bases de datos.",
      icon: <RiCodeSSlashLine className="w-6 h-6" />, 
      summary: "Creación de sitios web empresariales, tiendas online y plataformas interactivas.",
      details: {
        skills: ["Desarrollo Web", "Bases de Datos", "Stored Procedures"],
        technologies: ["React", "Node.js", "Express", "HTML5", "CSS", "JavaScript", "PHP", "Java"],
        databases: ["SQL Server", "Oracle", "MySQL"]
      },
      whenToChoose: [
        "Si necesitas una presencia profesional en internet",
        "Quieres vender productos o servicios online",
        "Requieres un sistema de gestión empresarial"
      ]
    },
    {
      title: "Desarrollo Mobile",
      description: "Creamos aplicaciones móviles nativas y multiplataforma para iOS y Android.",
      icon: <RiSmartphoneLine className="w-6 h-6" />,
      summary: "Apps intuitivas y optimizadas para ofrecer la mejor experiencia de usuario.",
      details: {
        skills: ["Apps Android", "Integración APIs", "Optimización"],
        technologies: ["React Native", "Android", "Java", "Kotlin"],
        databases: ["SQLite", "Firebase", "MongoDB"]
      },
      whenToChoose: [
        "Si necesitas una app para tus clientes",
        "Quieres ofrecer servicios móviles",
        "Necesitas acceso offline a funcionalidades"
      ]
    },
    {
      title: "Mantenimiento Web",
      description: "Nos encargamos de la seguridad, rendimiento y actualizaciones de tu web.",
      icon: <RiSettings4Line className="w-6 h-6" />,
      summary: "Optimización, actualizaciones y seguridad de sitios web empresariales.",
      details: {
        skills: ["Optimización", "Gestión de versiones", "Seguridad Web"],
        technologies: ["DevOps", "CI/CD", "Docker", "AWS"],
        databases: ["Mantenimiento DB", "Optimización", "Backups"]
      },
      whenToChoose: [
        "Si ya tienes un sitio web que necesita mantenimiento",
        "Quieres mejorar el rendimiento de tu plataforma",
        "Necesitas actualizaciones de seguridad"
      ]
    },
    {
      title: "Diseño de Sistemas",
      description: "Análisis y diseño de soluciones tecnológicas personalizadas.",
      icon: <RiLayoutGridLine className="w-6 h-6" />,
      summary: "Soluciones tecnológicas a medida con escalabilidad y optimización de procesos.",
      details: {
        skills: ["Análisis de Sistemas", "Arquitectura Software", "Gestión de Requerimientos"],
        technologies: ["UML", "Arquitectura de Software", "Patrones de Diseño"],
        databases: ["Modelado de Datos", "Optimización de DB"]
      },
      whenToChoose: [
        "Si necesitas una solución personalizada",
        "Quieres optimizar procesos empresariales",
        "Requieres integración entre sistemas"
      ]
    }
  ];

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section id="services" className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <motion.div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Nuestros Servicios</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">Soluciones digitales completas para potenciar tu negocio.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div key={service.title} onClick={() => toggleCard(index)}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg cursor-pointer flex flex-col justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#ff585e] dark:bg-[#3663ff] rounded-full flex items-center justify-center">
                  {service.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{service.summary}</p>
                </div>
              </div>
              <AnimatePresence>
                {expandedCard === index && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="mt-4 border-t pt-4 overflow-hidden text-left">
                    <h4 className="font-semibold">¿Cuándo elegir este servicio?</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                      {service.whenToChoose.map(reason => <li key={reason}>{reason}</li>)}
                    </ul>
                    <h4 className="font-semibold mt-4">Habilidades y Tecnologías</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {[...service.details.skills, ...service.details.technologies, ...service.details.databases].map(item => (
                        <span key={item} className="px-3 py-1 bg-[#ff585e] dark:bg-[#3663ff] text-white rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
