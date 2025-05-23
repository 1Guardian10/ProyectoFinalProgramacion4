import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import Rutas from './Routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Rutas />
  </StrictMode>,
)
