import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import websiteIcon from './assets/princessang.jpg'

const iconLink =
  document.querySelector("link[rel*='icon']") ?? document.createElement('link')

iconLink.type = 'image/jpeg'
iconLink.rel = 'icon'
iconLink.href = websiteIcon
document.head.appendChild(iconLink)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
