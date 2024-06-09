import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AxiosLib } from '../lib/axios';



function Login() {

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);


    const [login, setLogin] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await AxiosLib.post('/backend/auth/log-in', { email: login.email, password: login.password })
            if (result.status === 200)
                localStorage.setItem('user', JSON.stringify(result.data.user));
                window.location.href = '/booking'
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email or Password is incorrect',
            })
        }
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
                            เข้าสู่ระบบ
                        </h2>
                        <h3 className="text-sm text-gray-600 mb-4">
                            ยินดีต้อนรับ! โปรดกรอกข้อมูลอีเมล์และรหัสผ่านเพื่อเข้าสู่ระบบ
                        </h3>
                        <form onSubmit={handleSubmit}>
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
                            <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700">
                                Login
                            </button>
                        </form>
                        <p className="mt-4 text-center text-sm">
                            Already have an account? &nbsp;
                            <Link className="text-emerald-600 hover:underline" to="/register">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
