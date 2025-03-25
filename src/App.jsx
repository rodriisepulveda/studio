import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import ContactForm from "./components/sections/ContactForm";
import Footer from "./components/sections/Footer";

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
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
      {/* Navbar fuera del main con z-index más alto */}
      <Navbar />
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