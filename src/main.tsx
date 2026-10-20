import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Build-time SSG HTML'i varsa DOM'u yeniden çizmeden canlandır (LCP/CLS için kritik)
if (container.dataset.ssr === '1') {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
