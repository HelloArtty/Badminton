import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';

const MyBookings = () => {
    const [userBookings, setUserBookings] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                if (user && user._id) {
                    const response = await axios.get(`http://localhost:5000/backend/data/booking-by-user/${user._id}`);
                    setUserBookings(response.data);
                } else {
                    console.error('User ID not found.');
                }
            } catch (error) {
                console.error('Error fetching user bookings:', error);
            }
        };

        fetchUserBookings();
    }, [user]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('en-EN', options);
    };

    const handleCancelBooking = async (bookingId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to cancel this booking?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:5000/backend/data/delete-booking/${bookingId}`);
                    Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success').then(() => {
                        setUserBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
                    });
                } catch (error) {
                    console.error('Error cancelling booking:', error);
                    Swal.fire('Error!', 'There was a problem cancelling your booking.', 'error');
                }
            }
        });
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <div className="text-center my-4">
                    {user && (
                        <>
                            <span className="text-xl font-semibold">Welcome, {user.username}</span>
                            <div className="flex justify-center mt-4">
                                <img src={user.img} alt="User Avatar" className="w-72 h-72 rounded-full border-2 border-gray-300" />
                            </div>
                        </>
                    )}
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">Your Booking</h2>
                <div className="flex justify-center">
                    {userBookings.length > 0 ? (
                        userBookings.map((booking) => (
                            <div key={booking._id} className="bg-white p-6 rounded-lg shadow-md border flex flex-col justify-center">
                                <div><strong>Court Name:</strong> {booking.courtTime.court.courtname}</div>
                                <div><strong>Time:</strong> {booking.courtTime.time.timeslot}</div>
                                <div><strong>Booking:</strong> {formatDate(booking.createdAt)}</div>
                                <button
                                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors duration-300"
                                    onClick={() => handleCancelBooking(booking._id)}
                                >
                                    Cancel Booking
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-lg font-medium text-gray-700">No bookings found.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default MyBookings;
