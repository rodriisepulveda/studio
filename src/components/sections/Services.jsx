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
    <section id="services" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div className="text-center">
          <h2 className="section-title">Nuestros Servicios</h2>
          <p className="section-description">Soluciones digitales completas para potenciar tu negocio.</p>
        </motion.div>

        <div className="flex flex-col space-y-6 mt-12">
          {services.map((service, index) => (
            <motion.div key={service.title} onClick={() => toggleCard(index)}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#ff585e] dark:bg-[#3663ff] rounded-full flex items-center justify-center">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{service.summary}</p>
                  </div>
                </div>
                <motion.div animate={{ rotate: expandedCard === index ? 180 : 0 }}>
                  <RiArrowDownSLine className="w-6 h-6" />
                </motion.div>
              </div>
              <AnimatePresence>
                {expandedCard === index && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="mt-4 border-t pt-4 overflow-hidden">
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
