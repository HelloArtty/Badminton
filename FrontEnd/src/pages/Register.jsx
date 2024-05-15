// import React from 'react';
// import { Link } from 'react-router-dom';

// function Register() {
//     return (
//         <>
//             <div className="items-center justify-center min-h-screen flex p-10 pb-lg-20">
//                 <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md ">
//                     <h2 className="text-2xl font-bold mb-8 text-center">Register</h2>
//                     <form>
//                         {/* Username */}
//                         <div className="mb-4">
//                             <label
//                                 className="block mb-2 text-sm font-bold text-gray-700"
//                                 type="text">
//                                 Username
//                             </label>
//                             <input
//                                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                                 type="text"
//                                 id="username"
//                             />
//                         </div>

//                         {/* Email */}
//                         <div className="mb-4">
//                             <label
//                                 className="block mb-2 text-sm font-bold text-gray-700"
//                                 type="email">
//                                 Email
//                             </label>
//                             <input
//                                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                                 type="email"
//                                 id="email"
//                             />
//                         </div>

//                         {/* Password */}
//                         <div className="mb-4">
//                             <label
//                                 className="block mb-2 text-sm font-bold text-gray-700"
//                                 type="password">
//                                 Password
//                             </label>
//                             <input
//                                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                                 type="password"
//                                 id="password"
//                             />
//                         </div>

//                         {/* Confirm Password */}
//                         <div className="mb-4">
//                             <label
//                                 className="block mb-2 text-sm font-bold text-gray-700"
//                                 type="confirm-password">
//                                 Confirm Password
//                             </label>
//                             <input
//                                 className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                                 type="password"
//                                 id="confirm-password"
//                             />
//                         </div>
//                         <button
//                             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
//                             Register
//                         </button>
//                     </form>
//                     <p className="mt-4 text-center">
//                         Already have an account? &nbsp;
//                         <Link className="text-blue-600 hover:underline"
//                             to="/login">
//                             Login
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Register;

import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value,
        });
        console.log(user);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            console.error('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/register', {
                username: user.username,
                email: user.email,
                password: user.password,
            });
            console.log(response.data);
            // Handle registration success (e.g., redirect to login)
        } catch (error) {
            console.error('Registration error', error);
            // Handle registration failure
        }
        console.log('Registering user', user);
    }

    return (
        <div className="items-center justify-center min-h-screen flex p-10 pb-lg-20">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-8 text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">Username</label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            type="text"
                            id="username"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Email */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">Email</label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            type="email"
                            id="email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Password */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">Password</label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            type="password"
                            id="password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Confirm Password */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700">Confirm Password</label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            type="password"
                            id="confirmPassword"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                        Register
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account? &nbsp;
                    <Link className="text-blue-600 hover:underline" to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
