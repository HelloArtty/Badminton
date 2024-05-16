import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [login, setLogin] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setLogin({
            ...login,
            [e.target.id]: e.target.value,
        });
        console.log(login);
    }
    
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!login.username || !login.password) {
                return alert('Please fill all the fields');
            }
            const loginUser = {
                username: login.username,
                password: login.password,
            };
            const result = await axios.post('/backend/auth/login', loginUser);
            console.log(result);
            if (result.status === 200) {
                return (window.location.href = '/');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="items-center justify-center min-h-screen flex p-10 pb-lg-20">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-8 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-semibold text-gray-700">Username</label>
                        <input
                            className="w-full px-3 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Password */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-semibold text-gray-700">Password</label>
                        <input
                            className="w-full px-3 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Don't have an account? &nbsp;
                    <Link className="text-blue-600 hover:underline" to="/register">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
