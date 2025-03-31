import React, { useReducer, useEffect, useRef } from "react";
import { reducer } from "./reducer";
import { WhatsappSVG, CloseSVG, CheckSVG, SendSVG } from "./Icons";
import css from "./styles.module.css";
import styles from "./styles.module.css";

const FloatingWhatsApp = () => {
  const [{ isOpen, isDelay, isNotification }, dispatch] = useReducer(reducer, {
    isOpen: false,
    isDelay: true,
    isNotification: false
  });

  const inputRef = useRef(null);
  const chatBodyRef = useRef(null);
  
  const initialMessage = "¡Hola! 👋 Dejanos tu mensaje a través de WhatsApp!";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        dispatch({ type: "showNotification" });
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = inputRef.current?.value.trim();
    if (!message) return;

    window.open(
      `https://wa.me/5492996230720?text=${encodeURIComponent(message)}`,
      '_blank'
    );

    inputRef.current.value = '';
    dispatch({ type: "close" });
  };

  const handleOpen = () => {
    dispatch({ type: "open" });
    dispatch({ type: "hideNotification" });
    setTimeout(() => {
      dispatch({ type: "delay" });
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 1000);
  };

  return (
    <div data-scroll data-scroll-sticky data-scroll-target="#main-container" className={styles.floatingWhatsapp}>
      <button 
        className={css.whatsappButton} 
        onClick={handleOpen}
        aria-label="Abrir chat de WhatsApp"
      >
        <WhatsappSVG />
        {isNotification && <span className={css.notificationIndicator}>1</span>}
      </button>

      <div 
        className={`${css.whatsappChatBox} ${isOpen ? css.open : css.close}`}
      >
        <header className={css.chatHeader}>
          <div className={css.avatar}>
            <img 
              src="/src/assets/imgs/pvs.png" 
              alt="PVS Estudio" 
              width="60" 
              height="60"
            />
          </div>
          <div className={css.status}>
            <span className={css.statusTitle}>PVS Estudio</span>
            <span className={css.statusSubtitle}>
              {isDelay ? "Escribiendo..." : "En línea"}
            </span>
          </div>
          <button 
            className={css.close} 
            onClick={() => dispatch({ type: "close" })}
            aria-label="Cerrar chat"
          >
            <CloseSVG />
          </button>
        </header>

        <div className={css.chatBody} ref={chatBodyRef}>
          {isDelay ? (
            <div className={css.chatBubble}>
              <div className={css.typing}>
                <div className={css.dot} />
                <div className={css.dot} />
                <div className={css.dot} />
              </div>
            </div>
          ) : (
            <div className={css.message}>
              <span className={css.triangle} />
              <span className={css.accountName}>PVS Estudio</span>
              <p className={css.messageBody}>{initialMessage}</p>
              <span className={css.messageTime}>
                {new Date().toLocaleTimeString([], { 
                  hour: "2-digit", 
                  minute: "2-digit" 
                })}
                <CheckSVG />
              </span>
            </div>
          )}
        </div>

        <footer className={css.chatFooter}>
          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              className={css.input}
              placeholder="Escribe un mensaje..."
              aria-label="Escribe tu mensaje"
              style={{ color: '#333', backgroundColor: '#fff' }}
            />
            <button 
              type="submit" 
              className={css.buttonSend}
              aria-label="Enviar mensaje"
            >
              <SendSVG />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default FloatingWhatsApp;