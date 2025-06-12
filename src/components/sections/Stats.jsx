import React, { useEffect, useState } from 'react';

const AnimatedCounter = ({ to, duration = 2, className = '' }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    let end = to;
    let current = start;
    let increment = end > start ? 1 : -1;
    let totalSteps = Math.abs(end - start);
    let intervalTime = (duration * 1000) / totalSteps;
    if (intervalTime < 15) intervalTime = 15; // Evita intervalos demasiado rápidos

    setDisplay(start);
    const interval = setInterval(() => {
      current += increment;
      setDisplay(current);
      if (current === end) {
        clearInterval(interval);
      }
    }, intervalTime);
    return () => clearInterval(interval);
  }, [to, duration]);

  return (
    <span className={className}>{display}</span>
  );
};

const Stats = () => {
  return (
    <section
      id="stats"
      className="py-20 flex items-center justify-center"
      aria-labelledby="stats-heading"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="text-center">
          <div className="text-8xl md:text-9xl font-extrabold text-white flex items-end justify-center">
            <AnimatedCounter to={40} duration={2.5} className="text-[#3663ff]" />
            <span className="ml-2 text-5xl md:text-6xl font-bold text-white">+</span>
          </div>
          <p className="text-xl md:text-2xl text-gray-200 mt-2 font-medium">Webs desarrolladas</p>
        </div>
        <div className="w-px h-16 bg-white/20 hidden md:block"></div>
        <div className="text-center">
          <div className="text-8xl md:text-9xl font-extrabold text-white flex items-end justify-center">
            <span className="text-[#3663ff]">1</span>
            <span className="ml-2 text-5xl md:text-6xl font-bold text-white">año</span>
          </div>
          <p className="text-xl md:text-2xl text-gray-200 mt-2 font-medium">creando soluciones</p>
        </div>
      </div>
    </section>
  );
};

export default Stats; 