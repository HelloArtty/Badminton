import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';

const MyBookings = () => {
    const [userBookings, setUserBookings] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user)

    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                if (user._id) {
                    const response = await axios.get(`http://localhost:5000/backend/data/booking-by-user/${user._id}`);
                    setUserBookings(response.data);
                    console.log(response.data);
                } else {
                    console.error('User ID not found.');
                }
            } catch (error) {
                console.error('Error fetching user bookings:', error);
            }
        };

        fetchUserBookings();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        date.setHours(date.getHours() - 7);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('th-TH', options);
    };
    
    const handleCancelBooking = async (bookingId) => {
        console.log(bookingId);
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
                    Swal.fire(
                        'Cancelled!',
                        'Your booking has been cancelled.',
                        'success'
                    ).then(() => {
                        window.location.reload();
                    });

                } catch (error) {
                    console.error('Error cancelling booking:', error);
                    Swal.fire(
                        'Error!',
                        'There was a problem cancelling your booking.',
                        'error'
                    );
                }
            }
        });
    };


    return (
        <>
            <Navbar />
            <div className="text-red-500">
                {user && (
                    <span className="mr-2">Welcome, {user.username}</span>
                )}
            </div>

            <div>
                <h2>Your Bookings</h2>
                <ul>
                    {userBookings.map((booking, index) => (
                        <li key={index} className="mb-4 p-4 border rounded">
                            <div><strong>Court Name:</strong> {booking.courtTime.court.courtname}</div>
                            <div><strong>Timeslot:</strong> {booking.courtTime.time.timeslot}</div>
                            <div><strong>Bookig ID:</strong> {booking._id}</div>
                            <div><strong>Created At:</strong> {formatDate(booking.createdAt)}</div>
                            <button
                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                                onClick={() => handleCancelBooking(booking._id)}
                                >
                                Cancel Booking
                            </button>


                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default MyBookings;
