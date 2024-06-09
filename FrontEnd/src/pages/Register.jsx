import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AxiosLib } from '../lib/axios';

function Register() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const [register, setRegister] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setRegister({
            ...register,
            [e.target.name]: e.target.value
        });
        console.log(register);
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!register.username || !register.email || !register.password || !register.confirmPassword) {
                return Swal.fire('Error', 'Please fill all the fields', 'error');
            } else if (register.username.length < 6) {
                return Swal.fire('Error', 'Username must be at least 6 characters', 'error');
            } else if (register.username.includes(' ')) {
                return Swal.fire('Error', 'Username cannot contain space', 'error');
            } else if (!register.email.includes('@')) {
                return Swal.fire('Error', 'Please fill email correctly', 'error');
            } else if (register.password.length < 8) {
                return Swal.fire('Error', 'Password must be at least 8 characters', 'error');
            } else if (!register.password.match(/[0-9]/g)) {
                return Swal.fire('Error', 'Password must contain at least one number', 'error');
            } else if (!register.password.match(/[A-Z]/g)) {
                return Swal.fire('Error', 'Password must contain at least one uppercase', 'error');
            } else if (!register.password.match(/[a-z]/g)) {
                return Swal.fire('Error', 'Password must contain at least one lowercase', 'error');
            } else if (!register.password.match(/[^\w\s]/g)) {
                return Swal.fire('Error', 'Password must contain at least one special character', 'error');
            } else if (register.password.includes(' ')) {
                return Swal.fire('Error', 'Password cannot contain space', 'error');
            } else if (register.password !== register.confirmPassword) {
                return Swal.fire('Error', 'Password must match the confirm password', 'error');
            }
            const createNewUser = {
                username: register.username,
                email: register.email,
                password: register.password,
            };
            const result = await AxiosLib.post('/backend/auth/register', createNewUser);
            console.log(result);
            if (result.status === 200) {
                return (window.location.href = '/login');
            }
        } catch (error) {
            if (error.response.status === 400 || error.response.status === 500 || error.response.status === 409) {
                return Swal.fire('Error', error.response.data.message, 'error');
            }
        }
        console.log(register);
    };

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
                                    name="username"
                                    placeholder="Enter your username"
                                    onChange={handleChange}
                                // required
                                />
                            </div>
                            {/* Email */}
                            <div className="mb-4">
                                <TextField
                                    className="w-full px-3 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                                    label="Email"
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                // required
                                />
                            </div>
                            {/* Password */}
                            <div className="mb-4">
                                <TextField
                                    className='w-full px-3 py-2 text-sm border rounded-lg shadow-sm'
                                    label="Password"
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={handleChange}
                                // required
                                />
                            </div>
                            {/* Confirm Password */}
                            <div className="mb-4">
                                <TextField
                                    className='w-full px-3 py-2 text-sm border rounded-lg'
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    onChange={handleChange}
                                // required
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
