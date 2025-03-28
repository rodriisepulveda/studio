"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef, useCallback } from "react"
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri"

const TeamSlider = ({ team }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef(null)

  // Configuración de animación sincronizada
  const animationDuration = 0.5
  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95,
      transition: { duration: animationDuration }
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        duration: animationDuration,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
      scale: 0.95,
      transition: { duration: animationDuration }
    })
  }

  const contentVariants = {
    enter: {
      opacity: 0,
      y: 20,
      transition: { duration: animationDuration }
    },
    center: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: animationDuration,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: animationDuration }
    }
  }

  // Navegación optimizada
  const navigate = useCallback((newDirection) => {
    setDirection(newDirection)
    setActiveIndex((prev) => (prev + newDirection + team.length) % team.length)
    resetTimer()
  }, [team.length])

  // Control del temporizador
  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => navigate(1), 8000)
  }, [navigate])

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current)
    startTimer()
  }, [startTimer])

  // Efectos con limpieza
  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  // Pausar al interactuar
  const handleMouseEnter = () => {
    setIsHovered(true)
    clearInterval(timerRef.current)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    startTimer()
  }

  if (!team || team.length === 0) return null

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-6xl mx-auto px-4 py-16 md:py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-16 items-center">
        {/* Tarjeta con foto, nombre y rol */}
        <div className="relative h-[380px] w-full">
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative h-full w-full max-w-md mx-auto">
                <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl shadow-xl 
                  ${isHovered ? 'ring-2 ring-blue-500/30' : ''} transition-all duration-300`} />
                <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/20">
                  <img
                    src={team[activeIndex].image}
                    alt={`Foto de ${team[activeIndex].name}`}
                    className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    draggable={false}
                    loading="eager"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-2xl font-bold text-white">
                      {team[activeIndex].name}
                    </h3>
                    <p className="text-blue-300 font-medium mt-1">
                      {team[activeIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Contenido descriptivo con "Miembro del equipo" y descripción */}
        <div className="space-y-6 md:space-y-8">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`content-${activeIndex}`}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-6"
            >
              <div>
                <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-4">
                  Miembro del equipo
                </span>
                <div className="relative">
                  <div className="absolute -left-6 top-0 h-full w-1 bg-blue-100 dark:bg-blue-900/30 rounded-full" />
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg pl-4">
                    {team[activeIndex].description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controles */}
          <div className="flex items-center gap-4 pt-6 md:pt-8">
            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="h-12 w-12 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              aria-label="Anterior"
            >
              <RiArrowLeftLine className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </motion.button>

            <div className="flex-1 flex justify-center gap-2">
              {team.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1)
                    setActiveIndex(index)
                    resetTimer()
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className={`h-2 rounded-full transition-colors duration-300 ${
                    index === activeIndex
                      ? 'w-8 bg-blue-600 dark:bg-blue-400'
                      : 'w-3 bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Ir al slide ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={() => navigate(1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="h-12 w-12 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              aria-label="Siguiente"
            >
              <RiArrowRightLine className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamSlider