import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './globals.css'
import { Provider } from "react-redux";
import { ThemeProvider } from "@/components/theme-provider"
import { HelmetProvider } from 'react-helmet-async';
import Store from "@/love/bRedux/Store";
import { BrowserRouter } from 'react-router-dom'
import { SocketProvider } from "@/love/iSocket/socket";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={Store}>
        <SocketProvider>
          <BrowserRouter>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
              <App />
            </ThemeProvider>
          </BrowserRouter>
        </SocketProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
)
