import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { initEruda } from './utils/eruda.ts'
import { invariant } from './utils/invariant.ts'

if (localStorage.getItem('eruda') !== 'false') {
  initEruda()
}

const container = document.getElementById('root')
invariant(container)

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
