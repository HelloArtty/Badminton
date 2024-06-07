import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AxiosLib } from '../lib/axios';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const result = await AxiosLib.post('/backend/auth/log-out');
            if (result.status === 200) {
                navigate('/login');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong. Please try again.',
            });
        }
    };

    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex items-center justify-between text-white w-full">
                <li><a href="#" className="hover:text-gray-400">Home</a></li>
                <li>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Log Out
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
