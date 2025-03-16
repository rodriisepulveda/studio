import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../../config/email';
import { RiInstagramLine, RiFacebookLine, RiWhatsappLine, RiMailLine } from 'react-icons/ri';
import ImageSlider from '../ui/ImageSlider';
import toast from 'react-hot-toast';

const ContactForm1 = () => {
  // ... mantener todos los estados y funciones igual que en la versión original ...

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Fondo con slider */}
      <div className="absolute inset-0">
        <ImageSlider 
          images={contactImages}
          interval={8000}
          transitionEffect="fade"
          containerStyle={{
            maskImage: "linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 70%, transparent 100%)"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
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
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* ... resto del código del formulario igual que en la versión original ... */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm1;
