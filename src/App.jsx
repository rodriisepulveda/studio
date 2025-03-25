import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import ContactForm from "./components/sections/ContactForm";
import Footer from "./components/sections/Footer";

function App() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar el Navbar después de hacer scroll más allá del Hero
      if (window.scrollY > window.innerHeight * 0.8) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Verificar el tema guardado
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // Si hay un tema guardado, aplicarlo
      document.documentElement.classList.add(savedTheme);
    } else {
      // Si no hay tema guardado, establecer el tema claro por defecto
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  return (
    <>
      <Toaster 
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <main className="relative min-h-screen bg-pattern-3">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <ContactForm />
        <Footer />
      </main>
    </>
  );
}

export default App;
