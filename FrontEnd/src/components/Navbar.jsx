import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AxiosLib } from '../lib/axios';

const Navbar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log('Stored user:', storedUser); // Debugging: Check the stored user
        setUser(storedUser);
    }, []);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await AxiosLib.post('/backend/auth/log-out');
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong. Please try again.',
            });
        }
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/booking" className="text-white font-bold py-2 px-4 rounded">BadLink</Link>
                    <Link to="/booking" className="text-white font-bold py-2 px-4 rounded">Booking</Link>
                </div>

                <div className="flex items-center">
                    <div className="hidden sm:flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="text-white">Welcome, {user.username}</span>
                                <Link to="/profile" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Profile</Link>
                                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Log Out</button>
                            </>
                        ) : (
                            <Link to="/login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Log In</Link>
                        )}
                    </div>

                    <div className="sm:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Responsive Menu */}
            {isMenuOpen && (
                <div className="sm:hidden mt-2">
                    <div className="container mx-auto flex flex-col space-y-4">
                        {user && (
                            <>
                                <span className="text-white">Welcome, {user.username}</span>
                                <Link to="/profile" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Profile</Link>
                                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Log Out</button>
                            </>
                        )}
                        {!user && (
                            <Link to="/login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Log In</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
