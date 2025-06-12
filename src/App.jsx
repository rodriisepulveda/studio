import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Stats from "./components/sections/Stats";
import Services from "./components/sections/Services";
import Quote from "./components/sections/Quote";
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
      <main className="relative min-h-screen bg-gray-900 bg-pattern-3">
        <Hero />
<<<<<<< HEAD
        <About />
        <Quote />
        <Stats />
=======
>>>>>>> 4e8387c681849f4ba51c734c314b9cbb367d26a1
        <Services />
        <About />
        <ContactForm />
        <Footer />
      </main>
    </>
  );
}

export default App;