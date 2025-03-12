import { useState, useEffect } from "react";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100); // Aplica efecto cuando el usuario scrollea más de 100px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 
        ${isScrolled ? "bg-white shadow-md backdrop-blur-md" : "bg-transparent"}`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <h1 className="text-xl font-bold text-primary">Mi Servicio IT</h1>

        {/* Enlaces de navegación */}
        <div className="flex gap-6">
          <Link to="about" smooth duration={500} className="cursor-pointer text-gray-700 hover:text-primary">
            Quiénes Somos
          </Link>
          <Link to="services" smooth duration={500} className="cursor-pointer text-gray-700 hover:text-primary">
            Servicios
          </Link>
          <Link to="contact" smooth duration={500} className="cursor-pointer text-gray-700 hover:text-primary">
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
