"use client";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

export const TypewriterEffectSmooth = ({ 
  words, 
  className, 
  cursorClassName = "bg-blue-500" 
}) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  return (
    <div className={cn("flex items-center justify-start", className)}>
      {/* Contenedor del texto con animación */}
      <motion.div
        className="overflow-hidden pr-[0.05em]"
        initial={{ width: "0%" }}
        whileInView={{ width: "fit-content" }}
        transition={{ 
          duration: 1.5, 
          ease: "linear", 
          delay: 0.3 
        }}
      >
        <div className={cn(
          "whitespace-nowrap font-extrabold leading-none",
          "text-[5rem] sm:text-[6rem] md:text-[7.5rem] lg:text-[9rem] xl:text-[10rem]"
        )}>
          {wordsArray.map((word, idx) => (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span 
                  key={`char-${index}`} 
                  className={cn("text-black", word.className)}
                >
                  {char}
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Cursor con parpadeo suave */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 1, 0], // Transición suave 0→1→0
        }}
        transition={{ 
          duration: 1.2,
          ease: "easeInOut", // Suaviza la transición
          repeat: Infinity,
        }}
        className={cn(
          "inline-block w-[4px] rounded-sm ml-1",
          cursorClassName
        )}
        style={{
          height: "1em",
          transform: "translateY(0.07em)",
        }}
      />
    </div>
  );
};

export const TypewriterEffect = ({ words, className, cursorClassName = "bg-blue-500" }) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  return (
    <div className={cn("flex items-center justify-start", className)}>
      <div className="whitespace-nowrap">
        {wordsArray.map((word, idx) => (
          <div key={`word-${idx}`} className="inline-block">
            {word.text.map((char, index) => (
              <span 
                key={`char-${index}`}
                className={cn(
                  "inline-block text-black dark:text-white opacity-0",
                  word.className
                )}
                style={{ animation: `reveal 0.3s forwards ${idx * 0.1 + index * 0.1}s` }}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>
      
      {/* Cursor con parpadeo suave (idéntico al anterior) */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className={cn(
          "inline-block w-[4px] rounded-sm ml-1",
          cursorClassName
        )}
        style={{
          height: "1em",
          transform: "translateY(0.07em)",
        }}
      />
    </div>
  );
};