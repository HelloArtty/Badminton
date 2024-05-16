import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/booking' element={<Booking />} />
      </Routes>
    </BrowserRouter>
  )
}