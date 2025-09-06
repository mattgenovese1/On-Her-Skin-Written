// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // <-- This is where global styles are loaded
import App from './App.jsx'

// ✅ Import Vercel Analytics
import { inject } from '@vercel/analytics'

// ✅ Initialize analytics (runs once on app load)
inject()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
