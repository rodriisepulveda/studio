import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../../config/email';
import { RiFacebookLine, RiWhatsappLine, RiMailLine, RiLinkedinLine } from 'react-icons/ri';
import ImageSlider from '../ui/ImageSlider';
import toast from 'react-hot-toast';
import contact1 from '../../assets/imgs/contact/contact1.jpeg';
import contact2 from '../../assets/imgs/contact/contact2.jpeg';
import contact3 from '../../assets/imgs/contact/contact3.jpeg';
import contact4 from '../../assets/imgs/contact/contact4.jpeg';

// Lista de países y monedas
const countries = [
  { code: 'AR', name: 'Argentina', dialCode: '54', currency: 'ARS', symbol: '$' },
  { code: 'UY', name: 'Uruguay', dialCode: '598', currency: 'UYU', symbol: '$U' },
  { code: 'CL', name: 'Chile', dialCode: '56', currency: 'CLP', symbol: '$' },
  { code: 'PY', name: 'Paraguay', dialCode: '595', currency: 'PYG', symbol: '₲' },
  { code: 'BO', name: 'Bolivia', dialCode: '591', currency: 'BOB', symbol: 'Bs' },
  { code: 'PE', name: 'Perú', dialCode: '51', currency: 'PEN', symbol: 'S/' },
  { code: 'CO', name: 'Colombia', dialCode: '57', currency: 'COP', symbol: '$' },
  { code: 'EC', name: 'Ecuador', dialCode: '593', currency: 'USD', symbol: '$' },
  { code: 'VE', name: 'Venezuela', dialCode: '58', currency: 'VES', symbol: 'Bs.' },
  { code: 'BR', name: 'Brasil', dialCode: '55', currency: 'BRL', symbol: 'R$' },
  { code: 'MX', name: 'México', dialCode: '52', currency: 'MXN', symbol: '$' },
  { code: 'US', name: 'Estados Unidos', dialCode: '1', currency: 'USD', symbol: '$' },
  { code: 'ES', name: 'España', dialCode: '34', currency: 'EUR', symbol: '€' },
  { code: 'IT', name: 'Italia', dialCode: '39', currency: 'EUR', symbol: '€' },
  { code: 'FR', name: 'Francia', dialCode: '33', currency: 'EUR', symbol: '€' },
  { code: 'DE', name: 'Alemania', dialCode: '49', currency: 'EUR', symbol: '€' },
  { code: 'GB', name: 'Reino Unido', dialCode: '44', currency: 'GBP', symbol: '£' },
  { code: 'CA', name: 'Canadá', dialCode: '1', currency: 'CAD', symbol: '$' },
  { code: 'AU', name: 'Australia', dialCode: '61', currency: 'AUD', symbol: '$' },
  { code: 'NZ', name: 'Nueva Zelanda', dialCode: '64', currency: 'NZD', symbol: '$' },
];

const contactImages = [
  { src: contact1, alt: 'Equipo de trabajo colaborando en un proyecto digital' },
  { src: contact2, alt: 'Reunión de equipo discutiendo estrategias de desarrollo' },
  { src: contact3, alt: 'Desarrolladores trabajando en una aplicación móvil' },
  { src: contact4, alt: 'Presentación de un proyecto de software' },
];

// Función para obtener el tipo de cambio
async function getExchangeRate(toCurrency) {
  if (toCurrency === 'ARS') return 1;
  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/ARS`);
    const data = await res.json();
    return data.rates[toCurrency] || 1;
  } catch {
    return 1;
  }
}

// Lógica de cotización
const getPriceRange = (desc) => {
  const d = desc.toLowerCase();
  let base = 0;
  let max = 0;
  let detalles = [];
  if (d.includes('landing')) {
    base = 130000;
    max = 450000;
    detalles.push('Landing page (web de una sola sección, ideal para presentación de servicios o productos)');
  }
  if (d.includes('log in') || d.includes('login') || d.includes('registro')) {
    base += 350000;
    max += 600000;
    detalles.push('Sistema de log in/registro de usuarios');
  }
  if (d.includes('ecommerce') || d.includes('tienda')) {
    base += 400000;
    max += 1200000;
    detalles.push('Tienda online con carrito y pagos');
  }
  if (base === 0) {
    base = 130000;
    max = 2000000;
    detalles.push('Proyecto personalizado. El rango puede variar según requerimientos.');
  }
  return { base, max, detalles };
};

const ContactFormQuote = () => {
  // Estado para elegir tipo de formulario
  const [formType, setFormType] = useState('consulta');

  // Estados para consulta
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [selectedCountry, setSelectedCountry] = useState('AR');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [phoneData, setPhoneData] = useState({ countryCode: '', number: '' });

  // Estados para cotización
  const [quoteForm, setQuoteForm] = useState({ name: '', email: '', phone: '', country: 'AR', desc: '' });
  const [quoteResult, setQuoteResult] = useState(null);
  const [converted, setConverted] = useState(null);
  const [exchangeLoading, setExchangeLoading] = useState(false);

  // --- Lógica de consulta ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode);
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      setPhoneData(prev => ({ ...prev, countryCode: country.dialCode }));
    }
    setIsOpen(false);
    setSearchTerm('');
  };
  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    setPhoneData(prev => ({ ...prev, [name]: value }));
    const fullPhone = `${phoneData.countryCode}${value}`;
    setFormData(prev => ({ ...prev, phone: fullPhone }));
  };
  const validateMessage = (message) => {
    const spamPatterns = [
      /http[s]?:\/\//i,
      /\b(?:viagra|cialis|casino)\b/i,
      /[^\s]{30,}/,
      /(.)\1{4,}/,
      /\b[A-Z\s]{20,}\b/,
      /\d{4,}/
    ];
    if (spamPatterns.some(pattern => pattern.test(message))) return false;
    const urlCount = (message.match(/https?:\/\//g) || []).length;
    if (urlCount > 0) return false;
    const upperCount = message.replace(/[^A-Z]/g, '').length;
    const totalChars = message.replace(/\s/g, '').length;
    if (totalChars > 0 && upperCount / totalChars > 0.7) return false;
    return true;
  };
  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Por favor, ingresa un email válido');
      return false;
    }
    if (!phoneData.countryCode || !phoneData.number) {
      toast.error('Por favor, completa todos los campos del teléfono');
      return false;
    }
    const phoneDigits = phoneData.number.replace(/\D/g, '');
    if (phoneDigits.length < 6 || phoneDigits.length > 12) {
      toast.error('Por favor, ingresa un número de teléfono válido');
      return false;
    }
    if (formData.name.length < 3 || /\d/.test(formData.name)) {
      toast.error('Por favor, ingresa un nombre válido');
      return false;
    }
    if (formData.message.length < 10) {
      toast.error('El mensaje es demasiado corto');
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
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
        EMAIL_CONFIG.default.SERVICE_ID,
        EMAIL_CONFIG.default.TEMPLATE_ID,
        emailData,
        EMAIL_CONFIG.default.PUBLIC_KEY
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

  // --- Lógica de cotización ---
  const handleQuoteChange = (e) => {
    setQuoteForm({ ...quoteForm, [e.target.name]: e.target.value });
  };
  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setExchangeLoading(true);
    setTimeout(async () => {
      const { base, max, detalles } = getPriceRange(quoteForm.desc);
      setQuoteResult({ base, max, detalles });
      const country = countries.find(c => c.code === quoteForm.country);
      let conversion = null;
      if (country && country.currency !== 'ARS') {
        const rate = await getExchangeRate(country.currency);
        conversion = {
          base: Math.round(base * rate),
          max: Math.round(max * rate),
          symbol: country.symbol,
          currency: country.currency
        };
      }
      setConverted(conversion);
      setIsSubmitting(false);
      setExchangeLoading(false);
      try {
        await emailjs.send(
          EMAIL_CONFIG.otroServicio.SERVICE_ID,
          EMAIL_CONFIG.otroServicio.TEMPLATE_ID,
          {
            name: quoteForm.name,
            email: quoteForm.email,
            phone: quoteForm.phone || '',
            country: country ? country.name : quoteForm.country,
            description: quoteForm.desc,
            price_ars: `$${base.toLocaleString()} - $${max.toLocaleString()} ARS`,
            price_local: conversion ? `${conversion.symbol}${conversion.base.toLocaleString()} - ${conversion.symbol}${conversion.max.toLocaleString()} ${conversion.currency}` : '',
            detalles: detalles.join(', '),
            to_email: 'contacto@pvsestudio.com',
            timestamp: new Date().toISOString(),
          },
          EMAIL_CONFIG.otroServicio.PUBLIC_KEY
        );
        toast.success('¡Cotización enviada! Te contactaremos pronto.');
        setQuoteForm({ name: '', email: '', phone: '', desc: '', country: 'AR' });
      } catch (error) {
        toast.error('Error al enviar la cotización. Intenta nuevamente.');
        console.error('Error al enviar email:', error);
      }
    }, 1200);
  };

  // --- Render ---
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dialCode.includes(searchTerm)
  );
  const selectedCountryData = countries.find(c => c.code === selectedCountry);

  return (
    <section id="contact" className="min-h-screen pt-20 pb-16 relative overflow-hidden flex items-center" aria-labelledby="contact-heading">
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
            className="relative rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-[#3663ff]"
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
                containerStyle={{ opacity: 0.4 }}
              />
            </div>
            {/* Capa de fondo */}
            <div className="absolute inset-0 bg-gray-900/70 z-0"></div>
            {/* Selector de tipo de formulario */}
            <div className="relative z-10 p-4 md:p-8">
              <div className="flex justify-center mb-8 gap-4">
                <button
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${formType === 'consulta' ? 'bg-[#3663ff] text-white' : 'bg-gray-700 text-gray-200 hover:bg-[#3663ff] hover:text-white'}`}
                  onClick={() => setFormType('consulta')}
                  type="button"
                >
                  Realizar una consulta
                </button>
                <button
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${formType === 'cotizacion' ? 'bg-[#3663ff] text-white' : 'bg-gray-700 text-gray-200 hover:bg-[#3663ff] hover:text-white'}`}
                  onClick={() => setFormType('cotizacion')}
                  type="button"
                >
                  Cotizar mi página
                </button>
              </div>
              {/* Formulario de consulta */}
              {formType === 'consulta' && (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      maxLength={50}
                      placeholder="Tu nombre"
                      className="w-full px-4 py-2 rounded-xl border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-[#3663ff] focus:border-transparent"
                      aria-required="true"
                      aria-label="Ingresa tu nombre completo"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-xl border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-[#3663ff] focus:border-transparent"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Teléfono</label>
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-4 relative">
                        <button
                          type="button"
                          onClick={() => setIsOpen(!isOpen)}
                          className="w-full h-10 px-3 rounded-xl border border-gray-600 bg-gray-800 text-white text-left flex items-center justify-between focus:ring-2 focus:ring-[#3663ff] focus:border-transparent hover:border-gray-500 transition-colors"
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
                                className="w-full px-3 py-2 text-sm rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-[#3663ff] focus:border-transparent placeholder-gray-400"
                              />
                            </div>
                            <div className="max-h-48 overflow-y-auto">
                              {filteredCountries.map(country => (
                                <button
                                  key={country.code}
                                  type="button"
                                  onClick={() => handleCountryChange(country.code)}
                                  className={`w-full px-3 py-2 text-left hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0 ${selectedCountry === country.code ? 'bg-[#3663ff] text-white' : 'text-gray-300'}`}
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
                      <div className="col-span-8">
                        <input
                          type="tel"
                          name="number"
                          value={phoneData.number}
                          onChange={handlePhoneChange}
                          required
                          placeholder="Número de teléfono"
                          className="w-full h-10 px-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#3663ff] focus:border-transparent hover:border-gray-500 transition-colors"
                          aria-required="true"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 ml-1">Ingresa tu número sin el 0 inicial (ej: para Argentina 2991234567)</p>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Mensaje</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      maxLength={500}
                      rows={4}
                      placeholder="Escribí tu mensaje acá (máximo 500 caracteres)"
                      className="w-full px-4 py-2 rounded-xl border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-[#3663ff] focus:border-transparent resize-none"
                      aria-required="true"
                      aria-label="Escribe tu mensaje"
                    />
                    <div className="text-sm text-gray-400 text-right mt-1">{formData.message.length}/500 caracteres</div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-6 py-3 rounded-xl text-base font-medium bg-[#3663ff] text-white text-center transition-all duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2a4fd1] hover:scale-[1.02]'}`}
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
              )}
              {/* Formulario de cotización */}
              {formType === 'cotizacion' && (
                <>
                  <div className="mb-8 text-gray-200 text-sm bg-blue-900/30 rounded-lg p-4">
                    <b>¿Cómo obtener una cotización precisa?</b><br />
                    Para ayudarte mejor, te recomendamos incluir en la descripción:<br />
                    <ul className="list-disc pl-5 mt-2">
                      <li><b>Tipo de web:</b> Landing page, tienda online, blog, sistema, etc.</li>
                      <li><b>¿Solo informativa o con funcionalidades?</b> Ej: carrito de compras, reservas, log in, etc.</li>
                      <li><b>Cantidad de secciones o páginas</b></li>
                      <li><b>¿Necesita ventas online?</b></li>
                      <li><b>¿Requiere sistema de log in?</b></li>
                      <li><b>Otras ideas o funcionalidades especiales</b></li>
                    </ul>
                    <span className="text-xs text-gray-400">Ejemplo: "Quiero una landing page para mi negocio de fotografía, con galería de imágenes y formulario de contacto"</span>
                  </div>
                  <form onSubmit={handleQuoteSubmit} className="space-y-4 md:space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={quoteForm.name}
                        onChange={handleQuoteChange}
                        required
                        maxLength={50}
                        placeholder="Tu nombre"
                        className="w-full px-4 py-2 rounded-xl border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-[#3663ff] focus:border-transparent"
                        aria-required="true"
                        aria-label="Ingresa tu nombre completo"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={quoteForm.email}
                        onChange={handleQuoteChange}
                        required
                        className="w-full px-4 py-2 rounded-xl border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-[#3663ff] focus:border-transparent"
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Teléfono</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={quoteForm.phone}
                        onChange={handleQuoteChange}
                        required
                        className="w-full px-4 py-2 rounded-xl border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-[#3663ff] focus:border-transparent"
                        placeholder="Ej: +54 9 299 1234567"
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-2">País</label>
                      <select
                        id="country"
                        name="country"
                        value={quoteForm.country}
                        onChange={handleQuoteChange}
                        required
                        className="w-full px-4 py-2 rounded-xl border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-[#3663ff] focus:border-transparent"
                      >
                        {countries.map((c) => (
                          <option key={c.code} value={c.code}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="desc" className="block text-sm font-medium text-gray-300 mb-2">¿Qué tipo de web necesitás?</label>
                      <textarea
                        id="desc"
                        name="desc"
                        value={quoteForm.desc}
                        onChange={handleQuoteChange}
                        required
                        rows={3}
                        className="w-full px-4 py-2 rounded-xl border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-[#3663ff] focus:border-transparent"
                        placeholder="Ej: Quiero una tienda online con carrito y pasarela de pago"
                        aria-required="true"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 rounded-xl text-base font-medium bg-[#3663ff] text-white text-center transition-all duration-300"
                    >
                      {isSubmitting ? 'Calculando...' : 'Obtener cotización'}
                    </button>
                  </form>
                  {quoteResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 text-center"
                    >
                      <p className="text-lg font-semibold text-white mb-2">Rango estimado:</p>
                      <p className="text-2xl font-bold text-[#3663ff]">
                        {`$${quoteResult.base.toLocaleString()} - $${quoteResult.max.toLocaleString()} ARS`}
                        {converted && (
                          <span className="block text-base text-gray-200 mt-2">
                            {exchangeLoading ? 'Convirtiendo moneda...' : `Aproximadamente: ${converted.symbol}${converted.base.toLocaleString()} - ${converted.symbol}${converted.max.toLocaleString()} ${converted.currency}`}
                          </span>
                        )}
                      </p>
                      <ul className="text-sm text-gray-300 mt-2 list-disc pl-5 text-left inline-block">
                        {quoteResult.detalles.map((d, i) => <li key={i}>{d}</li>)}
                      </ul>
                      <p className="text-xs text-gray-400 mt-2">Te contactaremos para enviarte una cotización personalizada y detallada.</p>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactFormQuote; 