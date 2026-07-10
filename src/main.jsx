import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
import UserProvider from './context/UserContext'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <CartProvider>
            <App />
          </CartProvider>
      </UserProvider>
      </AuthProvider>

    </ThemeProvider>
  </StrictMode>,
)
