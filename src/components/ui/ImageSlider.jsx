import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ImageSlider = ({ 
  images, 
  interval = 5000, 
  className = "", 
  containerStyle = {}, 
  transitionEffect = "fade" 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const slideVariants = {
    enter: {
      opacity: 0,
      scale: transitionEffect === "zoom" ? 1.2 : 1,
    },
    center: {
      zIndex: 1,
      opacity: 1,
      scale: 1,
    },
    exit: {
      zIndex: 0,
      opacity: 0,
      scale: transitionEffect === "zoom" ? 0.8 : 1,
    },
  };

  return (
    <div 
      className={`relative w-full h-full overflow-hidden ${className}`} 
      style={containerStyle}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex].src} // Usar images[currentIndex].src
          initial="enter"
          animate="center"
          exit="exit"
          variants={slideVariants}
          transition={{
            opacity: { duration: 0.75 },
            scale: { duration: 1 },
          }}
          className="absolute w-full h-full object-cover"
          alt={images[currentIndex].alt} // Usar images[currentIndex].alt
        />
      </AnimatePresence>
    </div>
  );
};

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
  interval: PropTypes.number,
  className: PropTypes.string,
  containerStyle: PropTypes.object,
  transitionEffect: PropTypes.oneOf(["fade", "zoom"])
};

export default ImageSlider;