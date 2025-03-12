import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'
import emailjs from '@emailjs/browser'
import { EMAIL_CONFIG } from './config/email'

// Inicializar EmailJS
emailjs.init(EMAIL_CONFIG.PUBLIC_KEY)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) 