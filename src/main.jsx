import  React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Location from './pages/Location';
import ListingDetails from './pages/ListingDetails.jsx';
import Header from './components/Header.jsx';
import './index.css';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/location" element={<Location />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
