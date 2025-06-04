import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import UploadPDF from './pages/UploadPDF'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UploadPDF />
  </StrictMode>,
)
