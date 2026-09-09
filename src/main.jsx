import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import { AuthProvider } from './context/AuthContext.jsx';
import { FollowProvider } from './context/FollowContext.jsx';
import { MessageProvider } from './context/MessageContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MessageProvider>
          <CartProvider>
            <FollowProvider>
              <App />
            </FollowProvider>
          </CartProvider>
        </MessageProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
