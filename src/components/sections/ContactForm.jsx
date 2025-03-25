import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../../config/email';
import { RiInstagramLine, RiFacebookLine, RiWhatsappLine, RiMailLine } from 'react-icons/ri';
import ImageSlider from '../ui/ImageSlider';
import toast from 'react-hot-toast';

// Importar imágenes de contacto
import contact1 from '../../assets/imgs/contact/contact1.jpeg';
import contact2 from '../../assets/imgs/contact/contac2.jpeg';
import contact3 from '../../assets/imgs/contact/contact3.jpeg';
import contact4 from '../../assets/imgs/contact/contact4.jpeg';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('AR');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Array de imágenes con sus textos alt
  const contactImages = [
    { src: contact1, alt: "Equipo de trabajo colaborando en un proyecto digital" },
    { src: contact2, alt: "Reunión de equipo discutiendo estrategias de desarrollo" },
    { src: contact3, alt: "Desarrolladores trabajando en una aplicación móvil" },
    { src: contact4, alt: "Presentación de un proyecto de software" },
  ];

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const formattedCountries = data
          .map(country => ({
            code: country.cca2,
            name: country.name.common,
            dialCode: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : '')
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(formattedCountries);
      } catch (error) {
        console.error('Error al cargar países:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const selectedCountryData = countries.find(country => country.code === selectedCountry);
      const fullPhone = `${selectedCountryData.dialCode} ${formData.phone}`;
      
      const toEmails = 'facundo.preiss@davinci.edu.ar,rodrigo.sepulveda@davinci.edu.ar,rodris371@gmail.com';

      await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        {
          ...formData,
          phone: fullPhone,
          to_email: toEmails
        },
        EMAIL_CONFIG.PUBLIC_KEY
      );
      
      toast.success('¡Mensaje enviado!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Error al enviar el mensaje. Por favor, intenta nuevamente.');
      console.error('Error al enviar el mensaje:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transforma tu idea en realidad
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
            Estamos listos para escucharte. Cuéntanos sobre tu proyecto y trabajemos juntos para hacerlo realidad.
          </p>
        </motion.div>

        <motion.div className="max-w-6xl mx-auto">
          <motion.div 
            className="relative rounded-xl shadow-lg overflow-hidden
                     transform transition-all duration-200 hover:border-[#ff585e] dark:hover:border-[#3663ff]
                     border-2 border-transparent"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.2 }
            }}
          >
            {/* Slider de imágenes */}
            <div className="absolute inset-0 z-0">
              <ImageSlider 
                images={contactImages}
                interval={8000}
                transitionEffect="fade"
                containerStyle={{
                  opacity: 0.4 // Ajustamos ligeramente la opacidad
                }}
              />
            </div>

            {/* Capa de fondo */}
            <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 z-0"></div>

            {/* Contenido del formulario */}
            <div className="relative z-10 p-4 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                {/* Formulario */}
                <div>
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    {/* Campos del formulario */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-[#ff585e] dark:focus:ring-[#3663ff] focus:border-transparent
                                 transition-all duration-200 required"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-[#ff585e] dark:focus:ring-[#3663ff] focus:border-transparent
                                 transition-all duration-200 required"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Teléfono
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <select
                          value={selectedCountry}
                          onChange={handleCountryChange}
                          className="w-full sm:w-64 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
                                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                     focus:ring-2 focus:ring-[#ff585e] dark:focus:ring-[#3663ff] focus:border-transparent"
                        >
                          {countries.map(country => (
                            <option key={country.code} value={country.code}>
                              {country.name} ({country.dialCode})
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="Número de teléfono"
                          className="w-full flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
                                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                     focus:ring-2 focus:ring-[#ff585e] dark:focus:ring-[#3663ff] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-[#ff585e] dark:focus:ring-[#3663ff] focus:border-transparent
                                 transition-all duration-200 resize-none required"
                      />
                    </div>

                    <button
                      aria-label="Enviar mensaje de contacto"
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-6 py-3 rounded-xl text-base font-medium btn-primary text-center cursor-pointer select-none
                               ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" ></path>
                          </svg>
                          Enviando...
                        </span>
                      ) : (
                        'Enviar Mensaje'
                      )}
                    </button>
                  </form>
                </div>

                {/* Información de contacto */}
                <div className="mt-8 lg:mt-0">
                  <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center lg:text-left">
                    ¿Prefieres otro canal? ¡Escríbenos!
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
                    {/* Instagram */}
                    <a
                      href="https://instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Síguenos en Instagram"
                      className="flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all hover:scale-105 transform duration-300"
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#ff585e] dark:bg-[#3663ff] rounded-full flex items-center justify-center flex-shrink-0">
                        <RiInstagramLine className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm md:text-base truncate">Instagram</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm truncate">Inspírate con nuestro trabajo</p>
                      </div>
                    </a>

                    {/* Facebook */}
                    <a
                      href="https://www.facebook.com/profile.php?id=61574237145694"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Síguenos en Facebook"
                      className="flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all hover:scale-105 transform duration-300"
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#ff585e] dark:bg-[#3663ff] rounded-full flex items-center justify-center flex-shrink-0">
                        <RiFacebookLine className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm md:text-base truncate">Facebook</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm truncate">Únete a nuestra comunidad</p>
                      </div>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/5492995757428"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Contáctanos por WhatsApp"
                      className="flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all hover:scale-105 transform duration-300"
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#ff585e] dark:bg-[#3663ff] rounded-full flex items-center justify-center flex-shrink-0">
                        <RiWhatsappLine className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm md:text-base truncate">WhatsApp</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm truncate">Chatea con nosotros ahora</p>
                      </div>
                    </a>

                    {/* Email */}
                    <a
                      href="mailto:facupreiss@gmail.com"
                      aria-label="Envíanos un correo electrónico"
                      className="flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all hover:scale-105 transform duration-300"
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#ff585e] dark:bg-[#3663ff] rounded-full flex items-center justify-center flex-shrink-0">
                        <RiMailLine className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm md:text-base truncate">Email</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm truncate">Escríbenos tus ideas</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;