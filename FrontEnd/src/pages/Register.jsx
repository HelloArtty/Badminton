import { TextField } from '@mui/material';
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
        <>
            <div className="items-center justify-center flex min-h-screen w-full h-full">
                <div className="bg-emerald-600 min-h-screen w-1/2 p-8 hidden md:block">
                    <div className="p-8 min-h-screen items-center justify-center flex">
                        <div className="max-w-md p-8 text-center">
                            <h2 className="text-2xl text-gray-100 mb-2">
                                Welcome to
                            </h2>
                            <h1 className="text-8xl text-white font-bold mb-3">
                                BadLink
                            </h1>
                            <h3 className="text-sm text-gray-200  mb-2">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Itaque incidunt id a animi ab, minus,
                                ipsa accusantium doloribus vero cupiditate praesentium exercitationem ut repellendus minima?
                            </h3>

                        </div>
                    </div>
                </div>
                <div className="bg-white w-full md:w-1/2 p-8 min-h-screen flex items-center justify-center ">
                    <div className="max-w-md bg-white p-8 w-full flex flex-col justify-center">
                        <h2 className="text-2xl font-bold mb-2">
                            Create an account
                        </h2>
                        <h3 className="text-sm text-gray-600 mb-4">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                            Itaque incidunt id a animi ab.
                        </h3>
                        <form onSubmit={handleSubmit}>
                            {/* Username */}
                            <div className="mb-4">
                                <TextField
                                    className="w-full px-3 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                                    label="Username"
                                    type="text"
                                    id="username"
                                    placeholder="Enter your username"
                                    onChange={handleChange}
                                    // variant="filled"
                                    required
                                />
                            </div>
                            {/* Email */}
                            <div className="mb-4">
                                <TextField
                                    className="w-full px-3 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                                    label="Email"
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                    // variant="filled"
                                    required
                                />
                            </div>
                            {/* Password */}
                            <div className="mb-4">
                                <TextField
                                    className='w-full px-3 py-2 text-sm border rounded-lg shadow-sm'
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={handleChange}
                                    // variant="filled"
                                    required
                                />
                            </div>
                            {/* Confirm Password */}
                            <div className="mb-4">
                                <TextField
                                    className='w-full px-3 py-2 text-sm border rounded-lg'
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    onChange={handleChange}
                                    // variant="filled"
                                    required
                                />
                            </div>
                            <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700">
                                Create Account
                            </button>
                        </form>
                        <p className="mt-4 text-center text-sm">
                            Already have an account? &nbsp;
                            <Link className="text-emerald-600 hover:underline" to="/login">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
