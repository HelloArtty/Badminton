import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TimeButton = ({ time, isSelected, onClick }) => (
    <button
        onClick={onClick}
        className={`px-6 py-3 rounded-lg ${isSelected ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`}>
        {time}
    </button>
);

const QueueList = ({ queue }) => (
    <ul className="space-y-2 mb-6">
        {queue.map((user, index) => (
            <li key={index} className="flex items-center space-x-2">
                <span className="h-4 w-4 bg-gray-400 rounded-full"></span>
                <span>{user}</span>
            </li>
        ))}
    </ul>
);

const CourtDetail = () => {
    const { courtId } = useParams();
    const navigate = useNavigate();
    const courtName = `Court ${courtId}`;
    const times = ['17:00', '18:00', '19:00'];
    const queue = {
        '17:00': ['User1', 'User2', 'User3'],
        '18:00': ['User4', 'User5'],
        '19:00': ['User6']
    };

    const [selectedTime, setSelectedTime] = useState(times[0]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
                <button
                    className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg self-start"
                    onClick={() => navigate(-1)}
                >
                    กลับ
                </button>
                <h1 className="text-4xl font-bold mb-6">{courtName}</h1>
                <div className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-lg rounded-lg p-8">
                    <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
                        <div className="h-64 w-96 bg-gray-300 flex items-center justify-center rounded-lg mb-4">
                            <img className="h-full w-full object-cover rounded-lg"
                                src="https://www.kmutt.ac.th/wp-content/uploads/2020/09/MG_0489-scaled.jpg" alt="Court" />
                        </div>
                        <div className="flex space-x-4">
                            {times.map((time, index) => (
                                <TimeButton
                                    key={index}
                                    time={time}
                                    isSelected={selectedTime === time}
                                    onClick={() => setSelectedTime(time)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col md:ml-8">
                        <h2 className="text-2xl font-semibold mb-4">{`${courtName} Queue at ${selectedTime}`}</h2>
                        <QueueList queue={queue[selectedTime]} />
                        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg">จอง</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CourtDetail;
