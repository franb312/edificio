import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const VistaDetallePiso = lazy(() => import('./VistaDetallePiso'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/piso/:id" element={
          <Suspense fallback={null}>
            <VistaDetallePiso />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)