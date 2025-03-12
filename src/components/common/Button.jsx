import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className,
  onClick,
  type = 'button',
  isLoading = false
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-[#ff585e] text-white hover:bg-[#ff585e]/90 focus:ring-[#ff585e]",
    secondary: "bg-[#3663ff] text-white hover:bg-[#3663ff]/90 focus:ring-[#3663ff]",
    outline: "border-2 border-[#ff585e] text-[#ff585e] hover:bg-[#ff585e] hover:text-white focus:ring-[#ff585e]",
    ghost: "hover:bg-gray-100 text-gray-900 focus:ring-gray-500"
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-6 text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      onClick={onClick}
      type={type}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Cargando...
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button; 