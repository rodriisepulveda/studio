import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../../config/email';
import toast from 'react-hot-toast';

// Lista de países y sus monedas principales
const countries = [
  { code: "AR", name: "Argentina", currency: "ARS", symbol: "$" },
  { code: "UY", name: "Uruguay", currency: "UYU", symbol: "$U" },
  { code: "CL", name: "Chile", currency: "CLP", symbol: "$" },
  { code: "MX", name: "México", currency: "MXN", symbol: "$" },
  { code: "CO", name: "Colombia", currency: "COP", symbol: "$" },
  { code: "PE", name: "Perú", currency: "PEN", symbol: "S/" },
  { code: "ES", name: "España", currency: "EUR", symbol: "€" },
  { code: "US", name: "Estados Unidos", currency: "USD", symbol: "$" },
  // ...agrega más si lo deseas
];

// Función para obtener el tipo de cambio (API pública, ejemplo: exchangerate-api.com o fawazahmed0/exchange-api)
async function getExchangeRate(toCurrency) {
  if (toCurrency === "ARS") return 1;
  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/ARS`);
    const data = await res.json();
    return data.rates[toCurrency] || 1;
  } catch {
    return 1;
  }
}

// Lógica de "IA" mejorada para cotización
const getPriceRange = (desc) => {
  const d = desc.toLowerCase();
  let base = 0;
  let max = 0;
  let detalles = [];

  if (d.includes("landing")) {
    base = 130000;
    max = 450000;
    detalles.push("Landing page (web de una sola sección, ideal para presentación de servicios o productos)");
  }
  if (d.includes("log in") || d.includes("login") || d.includes("registro")) {
    base += 350000;
    max += 600000;
    detalles.push("Sistema de log in/registro de usuarios");
  }
  if (d.includes("ecommerce") || d.includes("tienda")) {
    base += 400000;
    max += 1200000;
    detalles.push("Tienda online con carrito y pagos");
  }
  // Puedes agregar más reglas aquí...

  if (base === 0) {
    base = 130000;
    max = 2000000;
    detalles.push("Proyecto personalizado. El rango puede variar según requerimientos.");
  }
  return { base, max, detalles };
};

const Quote = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", desc: "", country: "AR" });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [converted, setConverted] = useState(null);
  const [exchangeLoading, setExchangeLoading] = useState(false);

  // Cambia aquí para usar otro servicio si lo deseas
  const emailConfig = EMAIL_CONFIG.otroServicio;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setExchangeLoading(true);
    setTimeout(async () => {
      const { base, max, detalles } = getPriceRange(form.desc);
      setResult({ base, max, detalles });
      // Conversión de moneda
      const country = countries.find(c => c.code === form.country);
      let conversion = null;
      if (country && country.currency !== "ARS") {
        const rate = await getExchangeRate(country.currency);
        conversion = {
          base: Math.round(base * rate),
          max: Math.round(max * rate),
          symbol: country.symbol,
          currency: country.currency
        };
      }
      setConverted(conversion);
      setSubmitting(false);
      setExchangeLoading(false);
      // Enviar por email
      try {
        await emailjs.send(
          emailConfig.SERVICE_ID,
          emailConfig.TEMPLATE_ID,
          {
            name: form.name,
            email: form.email,
            phone: form.phone || '',
            country: country ? country.name : form.country,
            description: form.desc,
            price_ars: `$${base.toLocaleString()} - $${max.toLocaleString()} ARS`,
            price_local: conversion ? `${conversion.symbol}${conversion.base.toLocaleString()} - ${conversion.symbol}${conversion.max.toLocaleString()} ${conversion.currency}` : '',
            detalles: detalles.join(', '),
            to_email: 'contacto@pvsestudio.com',
            timestamp: new Date().toISOString(),
          },
          emailConfig.PUBLIC_KEY
        );
        toast.success('¡Cotización enviada! Te contactaremos pronto.');
        setForm({ name: '', email: '', phone: '', desc: '', country: 'AR' });
      } catch (error) {
        toast.error('Error al enviar la cotización. Intenta nuevamente.');
        console.error('Error al enviar email:', error);
      }
    }, 1200);
  };

  return (
    <section id="quote" className="py-20 flex items-center justify-center" aria-labelledby="quote-heading">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-8 md:p-12"
        >
          <h2 id="quote-heading" className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Cotizá tu web en segundos
          </h2>
          <div className="mb-8 text-gray-700 dark:text-gray-200 text-sm bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
            <b>¿Cómo obtener una cotización precisa?</b><br />
            Para ayudarte mejor, te recomendamos incluir en la descripción:<br />
            <ul className="list-disc pl-5 mt-2">
              <li><b>Tipo de web:</b> Landing page (una sola sección, ideal para presentación), tienda online, blog, sistema, etc.</li>
              <li><b>¿Solo informativa o con funcionalidades?</b> Ej: carrito de compras, reservas, log in, etc.</li>
              <li><b>Cantidad de secciones o páginas</b></li>
              <li><b>¿Necesita ventas online?</b></li>
              <li><b>¿Requiere sistema de log in?</b></li>
              <li><b>Otras ideas o funcionalidades especiales</b></li>
            </ul>
            <span className="text-xs text-gray-500">Ejemplo: "Quiero una landing page para mi negocio de fotografía, con galería de imágenes y formulario de contacto"</span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3663ff]"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3663ff]"
                placeholder="tucorreo@email.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Teléfono</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3663ff]"
                placeholder="Ej: +54 9 299 1234567"
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">País</label>
              <select
                id="country"
                name="country"
                value={form.country}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3663ff]"
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="desc" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">¿Qué tipo de web necesitás?</label>
              <textarea
                id="desc"
                name="desc"
                value={form.desc}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#3663ff]"
                placeholder="Ej: Quiero una tienda online con carrito y pasarela de pago"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-lg bg-[#3663ff] text-white font-bold text-lg hover:bg-[#274bb3] transition-colors disabled:opacity-60"
            >
              {submitting ? "Calculando..." : "Obtener cotización"}
            </button>
          </form>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Rango estimado:</p>
              <p className="text-2xl font-bold text-[#3663ff]">
                {`$${result.base.toLocaleString()} - $${result.max.toLocaleString()} ARS`}
                {converted && (
                  <span className="block text-base text-gray-700 dark:text-gray-300 mt-2">
                    {exchangeLoading ? "Convirtiendo moneda..." : `Aproximadamente: ${converted.symbol}${converted.base.toLocaleString()} - ${converted.symbol}${converted.max.toLocaleString()} ${converted.currency}`}
                  </span>
                )}
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-300 mt-2 list-disc pl-5 text-left inline-block">
                {result.detalles.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
              <p className="text-xs text-gray-500 dark:text-gray-300 mt-2">Te contactaremos para enviarte una cotización personalizada y detallada.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Quote; 