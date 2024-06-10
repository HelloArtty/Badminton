import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const user = JSON.parse(localStorage.getItem("user"));

const TimeButton = ({ time, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-lg ${
      isSelected
        ? "bg-emerald-600 text-white"
        : "bg-white text-emerald-500 border border-emerald-500"
    }`}
  >
    {time.label}
  </button>
);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return date.toLocaleDateString("en-EN", options);
};

const CourtDetail = () => {
  const { courtId } = useParams();
  const navigate = useNavigate();

  const courtMapping = [
    { id: "1", objectId: "6647852a857c0aeaf72efcd3", name: "Court 1" },
    { id: "2", objectId: "6662abbc058eb838216cf71c", name: "Court 2" },
    { id: "3", objectId: "6662af2fd1522f6cb4db27fc", name: "Court 3" },
    { id: "4", objectId: "6662af35d1522f6cb4db27fd", name: "Court 4" },
  ];

  const court = courtMapping.find((c) => c.id === courtId);
  const courtName = court ? court.name : `Court ${courtId}`;
  const courtObjectId = court ? court.objectId : null;

  const times = [
    { id: "6662a4c2058eb838216cf701", label: "17:00" },
    { id: "6662a520058eb838216cf702", label: "18:00" },
    { id: "6662a534058eb838216cf703", label: "19:00" },
  ];

  const [selectedTime, setSelectedTime] = useState(times[0].id);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const checkTimeAndNavigate = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      console.log(currentHour);
      if (currentHour < 13) {
        //13
        navigate("/booking");
        Swal.fire({
          icon: "error",
          title: "Don't square.",
          text: "Booking is available from 13:00 to 00:00",
          timer: 2500,
        });
      }
    };

    checkTimeAndNavigate();

    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/backend/data/booking-all"
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        Swal.fire({
          icon: "error",
          title: "Error fetching bookings",
          text: "Please try again later.",
        });
      }
    };

    fetchBookings();
  }, [navigate]);

  const handleBooking = async () => {
    try {
      if (!courtObjectId) {
        setBookingStatus("Invalid court ID");
        return;
      }
      const confirmed = await Swal.fire({
        title: "Confirm Booking",
        text: "Do you want to confirm the booking?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I want to book",
        cancelButtonText: "No, I want to cancel",
      });
      if (confirmed.isConfirmed) {
        const response = await axios.post(
          "http://localhost:5000/backend/data/add-booking",
          {
            courtID: courtObjectId,
            timeID: selectedTime,
          },
          {
            withCredentials: true,
          }
        );
        setBookingStatus(response.data);
        Swal.fire({
          icon: "success",
          title: "Booking Successful",
          text: "Thank you for using our service",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/profile");
      }
    } catch (error) {
      if (error.response && error.response.status === 423) {
        Swal.fire({
          icon: "error",
          title: "Booking Error",
          text: "Court has been booked by others.",
        });
      } else if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Booking Error",
          text: "User can book only one court at a time.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Booking Error",
          text: "An unexpected error occurred. Please try again later.",
        });
      }
    }
  };

  const bookedInfo = bookings.find(
    (booking) =>
      booking.courtTime.court._id === courtObjectId &&
      booking.courtTime.time._id === selectedTime
  );
  const bookedUser = bookedInfo?.user.username;
  const bookingCreatedAt = bookedInfo ? formatDate(bookedInfo.createdAt) : null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
        <button
          className="mb-6 px-4 py-2 bg-emerald-600 text-white rounded-lg self-start"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <h1 className="text-4xl font-bold mb-6">{courtName}</h1>
        <div className="flex flex-col md:flex-row items-center md:items-start bg-white/20 ring-1 ring-black/5 shadow-lg rounded-lg p-8 w-full max-w-4xl">
          <div className="flex flex-col  items-center md:items-start mb-6 md:mb-0 w-full md:w-1/2">
            <div className="h-64 w-full bg-gray-300 flex items-center justify-center rounded-lg mb-4">
              <img
                className="h-full w-full object-cover rounded-lg"
                src="https://www.kmutt.ac.th/wp-content/uploads/2020/09/MG_0489-scaled.jpg"
                alt="Court"
              />
            </div>
            <div className="flex space-x-4 w-full justify-center ">
              {times.map((time, index) => (
                <TimeButton
                  key={index}
                  time={time}
                  isSelected={selectedTime === time.id}
                  onClick={() => setSelectedTime(time.id)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col md:ml-8 w-full md:w-1/2 h-full ">
            <h2 className="text-2xl font-semibold mb-4 ">{`${courtName} at ${
              times.find((t) => t.id === selectedTime).label
            }`}</h2>
            {bookingStatus && (
              <p
                className={`mt-4 ${
                  bookingStatus.includes("success")
                    ? "text-emerald-600"
                    : "text-red-500"
                }`}
              >
                {bookingStatus}
              </p>
            )}
            {bookedUser ? (
              <p className="mt-2">
                <strong>Booked by:</strong> {bookedUser}
                <br />
                <strong>Booked on:</strong> {bookingCreatedAt}
              </p>
            ) : (
              <p className="mt-2">
                <strong>Booked by:</strong> No one has booked.
                <br />
                <strong>Booked on:</strong> -
              </p>
            )}
            <div className="flex justify-center">
              <button
                className={`px-6 py-3 w-3/4 mt-4 sm:mt-40 rounded-lg ${
                  bookings.some(
                    (booking) =>
                      booking.courtTime.court._id === courtObjectId &&
                      booking.courtTime.time._id === selectedTime
                  )
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-emerald-600 text-white"
                }`}
                onClick={handleBooking}
                disabled={bookings.some(
                  (booking) =>
                    booking.courtTime.court._id === courtObjectId &&
                    booking.courtTime.time._id === selectedTime
                )}
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourtDetail;
