const HoverEffect = ({ words, className }) => {
    return (
      <h1 className={className}>
        {words.map((word, index) => (
          <span key={index} className="hover:text-primary transition duration-300">
            {word}{" "}
          </span>
        ))}
      </h1>
    );
  };
  
  export default HoverEffect; // ✅ Exportación por defecto
  