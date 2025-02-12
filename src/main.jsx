import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './route/router.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
// import ThemeProvider from './context/ThemeProvider.jsx'
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ThemeProvider> */}
    <HelmetProvider>
  <AuthProvider>
 <RouterProvider router={router}></RouterProvider>
<Toaster />
 </AuthProvider>     
    </HelmetProvider>

    {/* </ThemeProvider> */}
  </StrictMode>,
)
