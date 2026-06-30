import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

function PropertyCard({
  image,
  title,
  location,
  price,
  rating,
  roomType,
  totalRooms,
  availableRooms,
  availableFrom,
  availableTo,
}) {
  const navigate = useNavigate();

  const handleBook = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    navigate("/booking-request");
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md w-80 bg-white hover:shadow-lg transition">
      
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <p className="text-gray-600 mt-1">
          📍 {location}
        </p>

        <p className="mt-2">
          ⭐ {rating}
        </p>

        <p className="text-lg font-bold mt-2">
          ₹{price}/night
        </p>

        <hr className="my-3" />

        <p className="text-gray-700">
          🛏 <span className="font-medium">Room Type:</span>{" "}
          {roomType}
        </p>

        <p className="text-gray-700 mt-1">
          🚪 <span className="font-medium">Available Rooms:</span>{" "}
          {availableRooms}/{totalRooms}
        </p>

        <p className="mt-1">
          📌 <span className="font-medium">Status:</span>{" "}
          <span
            className={
              availableRooms > 0
                ? "text-green-600 font-semibold"
                : "text-red-600 font-semibold"
            }
          >
            {availableRooms > 0
              ? "Available"
              : "Fully Booked"}
          </span>
        </p>

        <p className="text-sm text-gray-500 mt-2">
          📅 {availableFrom} - {availableTo}
        </p>

        {/* BOOK BUTTON LOGIC */}
        {availableRooms > 0 ? (
          <Button
            className="w-full mt-4"
            onClick={handleBook}
          >
            Book Now
          </Button>
        ) : (
          <Button
            disabled
            className="w-full mt-4"
          >
            Not Available
          </Button>
        )}
      </div>
    </div>
  );
}

export default PropertyCard;