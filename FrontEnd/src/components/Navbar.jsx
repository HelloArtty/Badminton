import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AxiosLib } from "../lib/axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for controlling dropdown visibility

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = async () => {
    try {
      await AxiosLib.post("/backend/auth/log-out");
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <nav className="bg-emerald-600  p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link
            to="/booking"
            className="text-white font-bold py-2 px-4 rounded"
          >
            Badminton Link
          </Link>
        </div>

        <div className="flex items-center">
          {user && (
            <>
              <span className="text-white mr-2">{user.username}</span>
              <div className="relative">
                <img
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  src={user.img}
                  className="w-12 h-12 rounded-full border-2 border-gray-300 cursor-pointer"
                  alt="User Avatar"
                />
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <Link
                      to="/profile"
                      className="flex px-4 justify-center py-2 text-gray-800 hover:bg-gray-200"
                    >
                      My Booking
                    </Link>
                    <Link
                      to="/booking"
                      className="flex px-4 justify-center py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Booking
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          {!user && (
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
