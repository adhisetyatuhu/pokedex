import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import App from './App.jsx'
import Detail from './pages/Detail.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import Search from './pages/Search.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<App />} />
          <Route path='/pokemon/:id' element={<Detail />} />
          <Route path='/search/:keyword' element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
