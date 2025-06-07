import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../../config/email';
import { RiFacebookLine, RiWhatsappLine, RiMailLine, RiLinkedinLine } from 'react-icons/ri';
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
  const [selectedCountry, setSelectedCountry] = useState('AR');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [phoneData, setPhoneData] = useState({
    countryCode: '',
    number: ''
  });

  // Lista estática de países con sus códigos
  const countries = [
    // Latinoamérica
    { code: 'AR', name: 'ARG', dialCode: '54' },
    { code: 'UY', name: 'UR', dialCode: '598' },
    { code: 'CL', name: 'CH', dialCode: '56' },
    { code: 'PY', name: 'PY', dialCode: '595' },
    { code: 'BO', name: 'BOL', dialCode: '591' },
    { code: 'PE', name: 'PE', dialCode: '51' },
    { code: 'CO', name: 'COL', dialCode: '57' },
    { code: 'EC', name: 'EC', dialCode: '593' },
    { code: 'VE', name: 'VE', dialCode: '58' },
    { code: 'BR', name: 'BR', dialCode: '55' },
    { code: 'MX', name: 'MX', dialCode: '52' },
    // Otros países principales
    { code: 'US', name: 'USA', dialCode: '1' },
    { code: 'ES', name: 'ESP', dialCode: '34' },
    { code: 'IT', name: 'ITA', dialCode: '39' },
    { code: 'FR', name: 'FR', dialCode: '33' },
    { code: 'DE', name: 'GER', dialCode: '49' },
    { code: 'GB', name: 'ENG', dialCode: '44' },
    { code: 'CA', name: 'CA', dialCode: '1' },
    { code: 'AU', name: 'AUS', dialCode: '61' },
    { code: 'NZ', name: 'NZ', dialCode: '64' }
  ];

  // Array de imágenes con sus textos alt
  const contactImages = [
    { src: contact1, alt: "Equipo de trabajo colaborando en un proyecto digital" },
    { src: contact2, alt: "Reunión de equipo discutiendo estrategias de desarrollo" },
    { src: contact3, alt: "Desarrolladores trabajando en una aplicación móvil" },
    { src: contact4, alt: "Presentación de un proyecto de software" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode);
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      setPhoneData(prev => ({
        ...prev,
        countryCode: country.dialCode
      }));
    }
    setIsOpen(false);
    setSearchTerm('');
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    setPhoneData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Actualizar el campo phone del formData con el formato completo
    const fullPhone = `${phoneData.countryCode}${value}`;
    setFormData(prev => ({
      ...prev,
      phone: fullPhone
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validaciones básicas anti-spam
      if (!validateMessage(formData.message)) {
        toast.error('El mensaje parece spam. Por favor, revisa el contenido.');
        return;
      }

      let fullPhone;
      if (!phoneData.countryCode || !phoneData.number) {
        toast.error('Por favor, completa todos los campos del teléfono');
        return;
      }
      fullPhone = `${phoneData.countryCode}${phoneData.number}`;
      
      // Agregar timestamp y datos adicionales
      const emailData = {
        ...formData,
        phone: fullPhone,
        to_email: 'contacto@pvsestudio.com',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language
      };

      await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        emailData,
        EMAIL_CONFIG.PUBLIC_KEY
      );
      
      toast.success('¡Mensaje enviado!');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setPhoneData({ countryCode: '', number: '' });
    } catch (error) {
      toast.error('Error al enviar el mensaje. Por favor, intenta nuevamente.');
      console.error('Error al enviar el mensaje:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para validar el contenido del mensaje
  const validateMessage = (message) => {
    // Detectar patrones de spam comunes
    const spamPatterns = [
      /http[s]?:\/\//i,                    // URLs
      /\b(?:viagra|cialis|casino)\b/i,     // Palabras spam comunes
      /[^\s]{30,}/,                        // Cadenas largas sin espacios
      /(.)\1{4,}/,                         // Caracteres repetidos
      /\b[A-Z\s]{20,}\b/,                  // TEXTO TODO EN MAYÚSCULAS
      /\d{4,}/                             // Muchos números seguidos
    ];

    // Verificar patrones de spam
    if (spamPatterns.some(pattern => pattern.test(message))) {
      return false;
    }

    // Verificar proporción de enlaces
    const urlCount = (message.match(/https?:\/\//g) || []).length;
    if (urlCount > 0) {
      return false;
    }

    // Verificar proporción de mayúsculas
    const upperCount = message.replace(/[^A-Z]/g, '').length;
    const totalChars = message.replace(/\s/g, '').length;
    if (totalChars > 0 && upperCount / totalChars > 0.7) {
      return false;
    }

    return true;
  };

  // Validaciones adicionales para el formulario
  const validateForm = () => {
    // Validar email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Por favor, ingresa un email válido');
      return false;
    }

    // Validar teléfono
    if (!phoneData.countryCode || !phoneData.number) {
      toast.error('Por favor, completa todos los campos del teléfono');
      return false;
    }
    const phoneDigits = phoneData.number.replace(/\D/g, '');
    if (phoneDigits.length < 6 || phoneDigits.length > 12) {
      toast.error('Por favor, ingresa un número de teléfono válido');
      return false;
    }

    // Validar nombre
    if (formData.name.length < 3 || /\d/.test(formData.name)) {
      toast.error('Por favor, ingresa un nombre válido');
      return false;
    }

    // Validar mensaje
    if (formData.message.length < 10) {
      toast.error('El mensaje es demasiado corto');
      return false;
    }

    return true;
  };

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dialCode.includes(searchTerm)
  );

  const selectedCountryData = countries.find(c => c.code === selectedCountry);

  return (
    <section 
      id="contact" 
      className="min-h-screen pt-20 pb-16 relative overflow-hidden flex items-center"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Transforma tu idea en realidad
          </h2>
          <p className="text-base md:text-lg text-gray-300">
            Estamos listos para escucharte. Cuéntanos sobre tu proyecto y trabajemos juntos para hacerlo realidad.
          </p>
        </motion.div>

        <motion.div className="max-w-6xl mx-auto">
          <motion.div 
            className="relative rounded-xl shadow-lg overflow-hidden
                     border-2 border-transparent hover:border-[#3663ff]"
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
                  opacity: 0.4
                }}
              />
            </div>

            {/* Capa de fondo */}
            <div className="absolute inset-0 bg-gray-900/70 z-0"></div>

            {/* Contenido del formulario */}
            <div className="relative z-10 p-4 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                {/* Formulario */}
                <div>
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    {/* Campos del formulario */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        maxLength={50}
                        placeholder="Tu nombre"
                        className="w-full px-4 py-2 rounded-xl border border-gray-600 
                                 bg-gray-800 text-white
                                 focus:ring-2 focus:ring-[#3663ff] focus:border-transparent"
                        aria-required="true"
                        aria-label="Ingresa tu nombre completo"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-xl border border-gray-600 
                                 bg-gray-800 text-white
                                 focus:ring-2 focus:ring-[#3663ff] focus:border-transparent"
                        aria-required="true"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Teléfono
                      </label>
                      <div className="grid grid-cols-12 gap-2">
                        {/* Selector de país */}
                        <div className="col-span-4 relative">
                          <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full h-10 px-3 rounded-xl border border-gray-600 
                                     bg-gray-800 text-white text-left flex items-center justify-between
                                     focus:ring-2 focus:ring-[#3663ff] focus:border-transparent 
                                     hover:border-gray-500 transition-colors"
                          >
                            <span className="flex items-center min-w-0">
                              {selectedCountryData ? (
                                <div className="flex items-center min-w-0">
                                  <span className="text-sm font-medium truncate">{selectedCountryData.name}</span>
                                  <span className="text-xs text-gray-400 ml-1 shrink-0">+{selectedCountryData.dialCode}</span>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400">Seleccionar</span>
                              )}
                            </span>
                            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {isOpen && (
                            <div className="absolute z-50 w-full mt-1 bg-gray-800 rounded-xl border border-gray-600 shadow-xl">
                              <div className="p-3 border-b border-gray-600">
                                <input
                                  type="text"
                                  value={searchTerm}
                                  onChange={(e) => setSearchTerm(e.target.value)}
                                  placeholder="Buscar país..."
                                  className="w-full px-3 py-2 text-sm rounded-lg bg-gray-700 text-white border border-gray-600
                                           focus:ring-2 focus:ring-[#3663ff] focus:border-transparent
                                           placeholder-gray-400"
                                />
                              </div>
                              <div className="max-h-48 overflow-y-auto">
                                {filteredCountries.map(country => (
                                  <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => handleCountryChange(country.code)}
                                    className={`w-full px-3 py-2 text-left hover:bg-gray-700 transition-colors
                                              border-b border-gray-700 last:border-b-0
                                              ${selectedCountry === country.code ? 'bg-[#3663ff] text-white' : 'text-gray-300'}`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-medium">{country.name}</span>
                                      <span className="text-xs text-gray-400">+{country.dialCode}</span>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Campo de número */}
                        <div className="col-span-8">
                          <input
                            type="tel"
                            name="number"
                            value={phoneData.number}
                            onChange={handlePhoneChange}
                            required
                            placeholder="Número de teléfono"
                            className="w-full h-10 px-3 rounded-xl border border-gray-600 
                                     bg-gray-800 text-white placeholder-gray-400
                                     focus:ring-2 focus:ring-[#3663ff] focus:border-transparent
                                     hover:border-gray-500 transition-colors"
                            aria-required="true"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2 ml-1">
                        Ingresa tu número sin el 0 inicial (ej: para Argentina 2991234567)
                      </p>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        maxLength={500}
                        rows="4"
                        placeholder="Escribí tu mensaje acá (máximo 500 caracteres)"
                        className="w-full px-4 py-2 rounded-xl border border-gray-600 
                                 bg-gray-800 text-white
                                 focus:ring-2 focus:ring-[#3663ff] focus:border-transparent
                                 resize-none"
                        aria-required="true"
                        aria-label="Escribe tu mensaje"
                      />
                      <div className="text-sm text-gray-400 text-right mt-1">
                        {formData.message.length}/500 caracteres
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full px-6 py-3 rounded-xl text-base font-medium 
                                   bg-[#3663ff] text-white text-center transition-all duration-300
                                   ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 
                                   'hover:bg-[#2a4fd1] hover:scale-[1.02]'}`}
                        aria-label="Enviar mensaje"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enviando...
                          </span>
                        ) : (
                          'Enviar Mensaje'
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Información de contacto */}
                <div className="mt-8 lg:mt-0">
                  <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center lg:text-left text-white">
                    ¿Preferis otro canal? ¡Escribinos!
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
                    {/* Instagram */}
                    <a
                      href="https://www.linkedin.com/in/facundo-preiss-4b0227246/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Síguenos en LinkedIn"
                      className="flex items-center space-x-4 p-3 hover:bg-gray-800 rounded-xl transition-all hover:scale-105"
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#3663ff] rounded-full flex items-center justify-center flex-shrink-0">
                        <RiLinkedinLine className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm md:text-base truncate text-white">LinkedIn</h4>
                        <p className="text-gray-300 text-sm truncate">Enterate de todo nuestro trabajo</p>
                      </div>
                    </a>

                    {/* Facebook */}
                    <a
                      href="https://www.facebook.com/profile.php?id=61574237145694"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Seguinos en Facebook"
                      className="flex items-center space-x-4 p-3 hover:bg-gray-800 rounded-xl transition-all hover:scale-105"
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#3663ff] rounded-full flex items-center justify-center flex-shrink-0">
                        <RiFacebookLine className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm md:text-base truncate text-white">Facebook</h4>
                        <p className="text-gray-300 text-sm truncate">Unite a nuestra comunidad</p>
                      </div>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/5492996230720"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Contáctanos por WhatsApp"
                      className="flex items-center space-x-4 p-3 hover:bg-gray-800 rounded-xl transition-all hover:scale-105"
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#3663ff] rounded-full flex items-center justify-center flex-shrink-0">
                        <RiWhatsappLine className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm md:text-base truncate text-white">WhatsApp</h4>
                        <p className="text-gray-300 text-sm truncate">Chateá con nosotros ahora</p>
                      </div>
                    </a>

                    {/* Email */}
                    <a
                      href="mailto:contacto@pvsestudio.com"
                      aria-label="Envíanos un correo electrónico"
                      className="flex items-center space-x-4 p-3 hover:bg-gray-800 rounded-xl transition-all hover:scale-105"
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#3663ff] rounded-full flex items-center justify-center flex-shrink-0">
                        <RiMailLine className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm md:text-base truncate text-white">Email</h4>
                        <p className="text-gray-300 text-sm truncate">Escribinos tus ideas</p>
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