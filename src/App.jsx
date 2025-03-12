import React, { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import ContactForm from "./components/sections/ContactForm";
import About from "./components/sections/About";
import Services from "./components/sections/Services";

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar solo aparece después del Hero */}
      {showNavbar && <Navbar />}
      <Hero />
      <About />
      <Services />
      <ContactForm />
    </div>
  );
}

export default App;
