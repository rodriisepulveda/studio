import React, { useReducer, useEffect, useRef } from "react";
import { reducer } from "./reducer";
import { WhatsappSVG, CloseSVG, CheckSVG, SendSVG } from "./Icons";
import css from "./styles.module.css";

const FloatingWhatsApp = () => {
  const [{ isOpen, isDelay, isNotification }, dispatch] = useReducer(reducer, {
    isOpen: false,
    isDelay: true,
    isNotification: false
  });

  const inputRef = useRef(null);
  const timeNow = new Date().toLocaleTimeString([], { 
    hour: "2-digit", 
    minute: "2-digit" 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputRef.current?.value) return;

    window.open(
      `https://wa.me/5492996230720?text=${encodeURIComponent(inputRef.current.value)}`,
      '_blank'
    );
    inputRef.current.value = '';
    dispatch({ type: "close" });
  };

  const handleOpen = () => {
    dispatch({ type: "open" });
    setTimeout(() => dispatch({ type: "delay" }), 2000);
  };

  const handleClose = () => {
    dispatch({ type: "close" });
  };

  useEffect(() => {
    const notificationInterval = setInterval(() => {
      if (!isOpen) dispatch({ type: "notification" });
    }, 60000);

    return () => clearInterval(notificationInterval);
  }, [isOpen]);

  return (
    <div className={css.floatingWhatsapp}>
      <div 
        className={css.whatsappButton} 
        onClick={handleOpen}
      >
        <WhatsappSVG />
        {isNotification && (
          <span className={css.notificationIndicator}>1</span>
        )}
      </div>

      <div 
        className={`${css.whatsappChatBox} ${isOpen ? css.open : css.close}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={css.chatHeader}>
          <div className={css.avatar}>
            <img src="src\assets\imgs\pvs.png" alt="PVS Estudio" />
          </div>
          <div className={css.status}>
            <span className={css.statusTitle}>PVS Estudio</span>
            <span className={css.statusSubtitle}>Responderemos a la brevedad</span>
          </div>
          <div className={css.close} onClick={handleClose}>
            <CloseSVG />
          </div>
        </header>

        <div className={css.chatBody}>
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
              <p className={css.messageBody}>¡Hola! 👋 ¿En qué podemos ayudarte?</p>
              <span className={css.messageTime}>
                {timeNow}
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
            />
            <button type="submit" className={css.buttonSend}>
              <SendSVG />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default FloatingWhatsApp; 