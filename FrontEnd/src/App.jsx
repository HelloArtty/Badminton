import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Booking from './pages/Booking';
import Court from './pages/Court';
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
        <Route path="/court/:courtId" element={<Court />} />
        
      </Routes>

    </BrowserRouter>
  )
}