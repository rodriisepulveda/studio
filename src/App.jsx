import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import ContactForm from "./components/sections/ContactForm";
import Footer from "./components/sections/Footer";
import FloatingWhatsApp from './components/WhatsApp/FloatingWhatsApp';

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
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
      <Navbar />
      <FloatingWhatsApp />
      <main className="relative min-h-screen bg-pattern-3">
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