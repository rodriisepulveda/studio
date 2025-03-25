"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri"

const TeamSlider = ({ team }) => {
  const [active, setActive] = useState(0)

  const handleNext = () => {
    setActive((prev) => (prev + 1) % team.length)
  }

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + team.length) % team.length)
  }

  const isActive = (index) => {
    return index === active
  }

  useEffect(() => {
    const interval = setInterval(handleNext, 5000)
    return () => clearInterval(interval)
  }, [])

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10
  }

  return (
    <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {team.map((member, index) => (
                <motion.div
                  key={member.image}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 999 : team.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom flex items-center justify-center"
                >
                  <div className="rounded-full overflow-hidden h-64 w-64 shadow-xl">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="h-full w-full object-cover object-center"
                      draggable={false}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{team[active].name}</h3>
            <p className="text-sm italic text-gray-500 dark:text-gray-400 mt-1">
              "{team[active].nickname}"
            </p>
            <p className="text-sm text-[#ff585e] dark:text-[#3663ff] mt-1">{team[active].role}</p>
            <motion.p className="text-lg text-gray-500 mt-8 dark:text-neutral-300">
              {team[active].description.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          <div className="flex gap-4 pt-16 md:pt-6">
          <button
  onClick={handlePrev}
  aria-label="Anterior" // O "Ir a la diapositiva anterior" si es un carrusel
  className="h-10 w-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group hover:bg-[#ff585e] dark:hover:bg-[#3663ff] transition-colors"
>
  <RiArrowLeftLine className="h-6 w-6 text-gray-600 dark:text-neutral-400 group-hover:text-white transition-colors" />
</button>

<button
  onClick={handleNext}
  aria-label="Siguiente" // O "Ir a la diapositiva siguiente" si es un carrusel
  className="h-10 w-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group hover:bg-[#ff585e] dark:hover:bg-[#3663ff] transition-colors"
>
  <RiArrowRightLine className="h-6 w-6 text-gray-600 dark:text-neutral-400 group-hover:text-white transition-colors" />
</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamSlider