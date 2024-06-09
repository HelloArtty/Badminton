import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function Booking() {
    const [countdown, setCountdown] = useState(0);
    const [showNavbar, setShowNavbar] = useState(true);
    const [countdownComplete, setCountdownComplete] = useState(false);
    const [nextCountdownDate, setNextCountdownDate] = useState(null);

    useEffect(() => {
        if (countdown <= 0) {
            setCountdownComplete(true);
        }
    }, [countdown]);

    useEffect(() => {
        const setNextCountdown = () => {
            let now = new Date();
            let countDownDate13 = new Date();
            countDownDate13.setHours(13, 0, 0, 0);

            let countDownDate20 = new Date();
            countDownDate20.setHours(20, 0, 0, 0);

            if (now >= countDownDate20) {
                countDownDate13.setDate(countDownDate13.getDate() + 1);
                setNextCountdownDate(countDownDate13.getTime());
            } else if (now >= countDownDate13) {
                setNextCountdownDate(countDownDate13.getTime());
            } else {
                setNextCountdownDate(countDownDate13.getTime());
            }
        };

        setNextCountdown(); 

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = nextCountdownDate - now;
            setCountdown(distance);

            if (distance <= 0) {
                setNextCountdown(); 
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [nextCountdownDate]);

    const formatTime = (time) => {
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);

        return `${hours} ชั่วโมง ${minutes} นาที ${seconds} วินาที`;
    };

    return (
        <>
            {showNavbar && <Navbar />}
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                {countdown > 0 ? (
                    <>
                        <h2 className="text-4xl mb-4">โปรดรอ...</h2>
                        <p>ยังไม่ถึงเวลาที่สามารถจองได้</p>
                        <p>{formatTime(countdown)}</p>
                    </>
                ) : (
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
                )}
            </div>
            <Footer />
        </>
    );
}

export default Booking;
