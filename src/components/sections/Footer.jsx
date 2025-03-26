import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700" aria-label="Pie de página">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Contenido del footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* Logo y eslogan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <h2 className="text-xl font-bold text-[#3663ff]">
              PVS
            </h2>
            <p className="text-xs text-gray-300">
              Soluciones digitales para potenciar tu negocio.
            </p>
          </motion.div>

          {/* Enlaces rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3"
          >
            <h3 className="text-base font-semibold text-white">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-1">
              {[
                { id: "hero", label: "Inicio" },
                { id: "services", label: "Servicios" },
                { id: "about", label: "Nosotros" },
                { id: "contact", label: "Contacto" }
              ].map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.id}
                    spy={true}
                    smooth={true}
                    offset={-64}
                    href={`#${item.id}`}
                    className="text-xs text-gray-300 hover:text-[#3663ff] transition-colors cursor-pointer"
                    aria-label={`Ir a ${item.label}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Redes sociales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-3"
          >
            <h3 className="text-base font-semibold text-white">
              Seguinos
            </h3>
            <div className="flex space-x-3">
              {[
                {
                  icon: FaFacebook,
                  url: "https://www.facebook.com/profile.php?id=61574237145694",
                  label: "Facebook"
                },
                {
                  icon: FaLinkedin,
                  url: "https://www.linkedin.com/in/facundo-preiss-4b0227246/",
                  label: "LinkedIn"
                }
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-[#3663ff] transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-3"
          >
            <h3 className="text-base font-semibold text-white">
              Contacto
            </h3>
            <address className="not-italic">
              <ul className="space-y-1">
                <li className="text-xs text-gray-300">
                  <a href="mailto:facupreiss@gmail.com">facupreiss@gmail.com</a>
                </li>
                <li className="text-xs text-gray-300">
                  <a href="tel:+542995757428">+54 299 575-7428</a>
                </li>
                <li className="text-xs text-gray-300">
                  Cipolletti, Río Negro, Argentina
                </li>
              </ul>
            </address>
          </motion.div>
        </div>

        {/* Derechos de autor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t border-gray-700 mt-6 pt-6 text-center"
        >
          <p className="text-xs text-gray-300">
            © {new Date().getFullYear()} PVS. Todos los derechos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;