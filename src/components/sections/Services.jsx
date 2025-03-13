import { motion } from 'framer-motion';
import { RiCodeSSlashLine, RiSmartphoneLine, RiSettings4Line } from 'react-icons/ri';

const Services = () => {
  const services = [
    {
      title: "Desarrollo Web",
      description: "Creamos sitios web modernos y responsivos que destacan tu marca y mejoran la experiencia de usuario.",
      icon: <RiCodeSSlashLine className="w-6 h-6" />
    },
    {
      title: "Desarrollo Mobile",
      description: "Desarrollamos aplicaciones móviles nativas y multiplataforma que conectan con tu audiencia.",
      icon: <RiSmartphoneLine className="w-6 h-6" />
    },
    {
      title: "Mantenimiento Web",
      description: "Ofrecemos servicios de mantenimiento y actualización para mantener tu sitio web en óptimas condiciones.",
      icon: <RiSettings4Line className="w-6 h-6" />
    }
  ];

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="section-title">Nuestros Servicios</h2>
          <p className="section-description">
            Ofrecemos soluciones digitales completas para impulsar tu negocio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className="w-12 h-12 bg-[#ff585e] dark:bg-[#3663ff] rounded-full flex items-center justify-center mb-4 mx-auto">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 