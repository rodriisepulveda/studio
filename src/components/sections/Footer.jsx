import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
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
            <h2 className="text-xl font-bold text-[#ff585e] dark:text-[#3663ff]">
              PVS
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-300">
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
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  to="hero"
                  spy={true}
                  smooth={true}
                  offset={-64}
                  className="text-xs text-gray-600 dark:text-gray-300 hover:text-[#ff585e] dark:hover:text-[#3663ff] transition-colors cursor-pointer"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="services"
                  spy={true}
                  smooth={true}
                  offset={-64}
                  className="text-xs text-gray-600 dark:text-gray-300 hover:text-[#ff585e] dark:hover:text-[#3663ff] transition-colors cursor-pointer"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  to="about"
                  spy={true}
                  smooth={true}
                  offset={-64}
                  className="text-xs text-gray-600 dark:text-gray-300 hover:text-[#ff585e] dark:hover:text-[#3663ff] transition-colors cursor-pointer"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-64}
                  className="text-xs text-gray-600 dark:text-gray-300 hover:text-[#ff585e] dark:hover:text-[#3663ff] transition-colors cursor-pointer"
                >
                  Contacto
                </Link>
              </li>
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
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Seguinos
            </h3>
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/profile.php?id=61574237145694"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-[#ff585e] dark:hover:text-[#3663ff] transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-[#ff585e] dark:hover:text-[#3663ff] transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/facundo-preiss-4b0227246/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-[#ff585e] dark:hover:text-[#3663ff] transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
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
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Contacto
            </h3>
            <ul className="space-y-1">
              <li className="text-xs text-gray-600 dark:text-gray-300">
                Email: facupreiss@gmail.com
              </li>
              <li className="text-xs text-gray-600 dark:text-gray-300">
                Teléfono: +54 9 299 575-7428
              </li>
              <li className="text-xs text-gray-600 dark:text-gray-300">
                Dirección: Cipolletti, Río Negro, Argentina
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Derechos de autor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6 text-center"
        >
          <p className="text-xs text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} PVS. Todos los derechos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;