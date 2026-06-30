import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api";

function BookingRequest() {
  const navigate = useNavigate();
  const location = useLocation();

  // Homestay passed from PropertyCard
  const homestay = location.state?.homestay || null;

  const [booking, setBooking] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Dynamic total price
      const totalPrice = homestay?.price
        ? homestay.price * booking.guests
        : booking.guests * 1500;

      await API.post("/bookings", {
        homestay: homestay?._id || "StayNest Premium",
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guests: booking.guests,
        totalPrice,
      });

      alert("Booking Submitted");

      setBooking({
        name: "",
        email: "",
        checkIn: "",
        checkOut: "",
        guests: 1,
      });

      navigate("/profile");
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Booking Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-10 bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Booking Request
        </h1>

        {homestay && (
          <div className="mb-6 border rounded-lg p-4 bg-gray-50">
            <h2 className="text-xl font-semibold">
              {homestay.title}
            </h2>

            <p>{homestay.location}</p>

            <p className="text-blue-600 font-bold">
              ₹{homestay.price}/night
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={booking.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={booking.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <div>
            <label className="block mb-2 font-medium">
              Check In
            </label>

            <input
              type="date"
              name="checkIn"
              value={booking.checkIn}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Check Out
            </label>

            <input
              type="date"
              name="checkOut"
              value={booking.checkOut}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Guests
            </label>

            <input
              type="number"
              name="guests"
              min="1"
              value={booking.guests}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Confirm Booking
          </button>

        </form>

      </div>
    </div>
  );
}

export default BookingRequest;