import React from 'react';
import styles from './LogoSlider.module.css';

const LogoSlider = ({ logos }) => {
  // Creamos tres conjuntos idénticos de logos para un efecto infinito más suave
  const logoSet = logos.map((logo, index) => (
    <div key={`logo-${index}`} className={styles.logoContainer}>
      <img 
        src={logo.src} 
        alt={logo.alt || `${logo.name || 'Tech'} logo`} 
        className={styles.logo}
        loading="lazy"
        width="auto"
        height="50"
        title={logo.alt || logo.name || 'Tech logo'}
      />
    </div>
  ));

  return (
    <div className={styles.wrapper}>
      <div className={styles.sliderTrack}>
        <div className={styles.sliderContent}>
          {logoSet}
          {logoSet}
          {logoSet} {/* Triplicado para efecto infinito más suave */}
        </div>
      </div>
    </div>
  );
};

export default React.memo(LogoSlider);