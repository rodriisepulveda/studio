import { motion } from 'framer-motion';
import { RiCodeSSlashLine, RiSmartphoneLine, RiSettings4Line, RiLayoutGridLine } from 'react-icons/ri';

const Services = () => {
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
        "Necesitás un sitio web profesional y confiable.",
        "Queres vender más con una tienda online ágil.",
        "Buscas automatizar y optimizar tu negocio.",
        "Queres atraer clientes con una experiencia digital única."
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
        "Necesitas acceso offline a funcionalidades",
        "Queres una app para tu negocio"
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
        "Si ya tenés un sitio web que necesita mantenimiento",
        "Querés mejorar el rendimiento de tu plataforma",
        "Necesitás actualizaciones de seguridad",
        "Soporte personalizado"
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
        "Para soluiciones tecnologicas 100% adaptadas a tus necesidades",
        "Necesitas integrar sistemas de forma ágil y segura",
        "Si buscas optimizar procesos y reducir costos operativos",
        "Para una arquitectura escalable y mantenible"
      ]
    }
  ];

  return (
    <section id="services" className="min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Nuestros Servicios</h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mt-4">
            Soluciones digitales completas para potenciar tu negocio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-8 md:mt-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.2 }
              }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg flex flex-col
                         transform transition-all duration-200 hover:border-[#ff585e] dark:hover:border-[#3663ff]
                         border-2 border-transparent overflow-hidden min-h-[500px] md:h-[600px]"
            >
              {/* Contenido principal */}
              <div className="p-4 md:p-6 flex-grow overflow-y-auto">
                {/* Encabezado */}
                <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#ff585e] dark:bg-[#3663ff] rounded-full flex items-center justify-center text-white">
                    {service.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                </div>

                {/* Descripción */}
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {service.description}
                </p>

                {/* Casos de uso */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Ideal para:
                  </h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    {service.whenToChoose.map((reason, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sección de tecnologías */}
              <div className="p-3 md:p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/50">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm md:text-base">
                  Tecnologías:
                </h4>
                <div className="flex flex-wrap gap-1 md:gap-1.5">
                  {[...service.details.technologies].map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-[#ff585e] dark:bg-[#3663ff] text-white rounded-full text-xs md:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
