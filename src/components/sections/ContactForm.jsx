import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../../config/email';
import { RiInstagramLine, RiFacebookLine, RiWhatsappLine, RiMailLine } from 'react-icons/ri';

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
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error al enviar el mensaje:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="section-title">Contáctanos</h2>
          <p className="section-description">
            ¿Tenes un proyecto en mente? Estamos aquí para ayudarte
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-6xl mx-auto mt-12"
        >
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Formulario */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                               transition-all duration-200"
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
                               transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Teléfono
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        className="w-64 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-[#ff585e] dark:focus:ring-[#3663ff] focus:border-transparent
                                 transition-all duration-200"
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
                        className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-[#ff585e] dark:focus:ring-[#3663ff] focus:border-transparent
                                 transition-all duration-200"
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
                               transition-all duration-200"
                    />
                  </div>

                  <button
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

                  {submitStatus === 'success' && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-green-600 dark:text-green-400 text-center"
                    >
                      ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
                    </motion.p>
                  )}

                  {submitStatus === 'error' && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-600 dark:text-red-400 text-center"
                    >
                      Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
                    </motion.p>
                  )}
                </form>
              </div>

              {/* Información de contacto */}
              <div className="flex items-center justify-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-center">Información de Contacto</h3>
                  <div className="space-y-6">
                    <a href="#" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
                      <div className="w-12 h-12 bg-[#ff585e] dark:bg-[#3663ff] rounded-full flex items-center justify-center">
                        <RiInstagramLine className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">Instagram</h4>
                        <p className="text-gray-600 dark:text-gray-300">@lacrinoide</p>
                      </div>
                    </a>

                    <a href="#" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
                      <div className="w-12 h-12 bg-[#ff585e] dark:bg-[#3663ff] rounded-full flex items-center justify-center">
                        <RiFacebookLine className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">Facebook</h4>
                        <p className="text-gray-600 dark:text-gray-300">Lacrinoide</p>
                      </div>
                    </a>

                    <a href="#" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
                      <div className="w-12 h-12 bg-[#ff585e] dark:bg-[#3663ff] rounded-full flex items-center justify-center">
                        <RiWhatsappLine className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">WhatsApp</h4>
                        <p className="text-gray-600 dark:text-gray-300">+54 11 1234-5678</p>
                      </div>
                    </a>

                    <a href="#" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
                      <div className="w-12 h-12 bg-[#ff585e] dark:bg-[#3663ff] rounded-full flex items-center justify-center">
                        <RiMailLine className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <p className="text-gray-600 dark:text-gray-300">contacto@lacrinoide.com</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm; 