"use client";

import { cn } from "../../lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

export const TypewriterEffect = ({ words, className, cursorClassName }) => {
  // Divide el texto en caracteres individuales
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView]);

  return (
    <motion.div ref={scope} className={cn("inline-block", className)}>
      {wordsArray.map((word, idx) => (
        <div key={`word-${idx}`} className="inline-block">
          {word.text.map((char, index) => (
            <motion.span
              key={`char-${index}`}
              className={cn("dark:text-white text-black opacity-0 hidden", word.className)}
            >
              {char}
            </motion.span>
          ))}
        </div>
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn("inline-block rounded-sm w-[4px] bg-blue-500", cursorClassName)}
      />
    </motion.div>
  );
};

export const TypewriterEffectSmooth = ({ words, className, cursorClassName }) => {
  // Divide el texto en caracteres individuales
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  return (
    <div className={cn("flex items-start justify-start", className)}>
      <motion.div
        className="overflow-hidden"
        initial={{ width: "0%" }}
        whileInView={{ width: "fit-content" }}
        transition={{ duration: 1.5, ease: "linear", delay: 0.3 }}
      >
        <div className="whitespace-nowrap text-[5rem] sm:text-[6rem] md:text-[7.5rem] lg:text-[9rem] xl:text-[10rem] font-extrabold leading-none">
          {wordsArray.map((word, idx) => (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span key={`char-${index}`} className={cn("dark:text-white text-black", word.className)}>
                  {char}
                </span>
              ))}
              {idx < wordsArray.length - 1 && <span className="inline-block mx-[0.2em]">&nbsp;</span>}
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Cursor del mismo tamaño que el texto */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn("block rounded-sm w-[4px] bg-primary-light dark:bg-primary-dark ml-1", cursorClassName)}
        style={{
          height: "1em", // Hace que el cursor coincida con la altura del texto
        }}
      />
    </div>
  );
};
