import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';



function Booking() {
    

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {['Court 1', 'Court 2', 'Court 3', 'Court 4'].map((court, index) => (
                        <Link to={`/court/${index + 1}`} key={index}>
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <div className="h-84 bg-green-100 flex items-center justify-center rounded-lg mb-4">
                                    <img className="h-[300px] w-[300px] object-cover rounded-lg"
                                        src="https://www.kmutt.ac.th/wp-content/uploads/2020/09/MG_0489-scaled.jpg" alt="Court" />
                                </div>
                                <h2 className="text-xl font-semibold text-center">{court}</h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />

        </>
    )
}

export default Booking;