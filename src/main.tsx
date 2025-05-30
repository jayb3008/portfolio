import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import React from 'react'

// Enable React Strict Mode for better development experience
const root = createRoot(document.getElementById("root")!)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
