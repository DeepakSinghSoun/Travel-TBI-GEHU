import { useNavigate } from "react-router-dom";
import Button from "./Button";

function PropertyCard({
  _id,
  images,
  title,
  location,
  price,
  rating = 4.8,
  roomType,
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

    navigate("/booking-request", {
      state: {
        homestay: {
          _id,
          title,
          location,
          price,
          roomType,
          availableRooms,
          availableFrom,
          availableTo,
          images,
        },
      },
    });
  };

  const handleViewDetails = () => {
    navigate(`/homestays/${_id}`);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition">

      <img
        src={
          images?.length > 0
            ? images[0]
            : "https://via.placeholder.com/600x400?text=No+Image"
        }
        alt={title}
        className="w-full h-52 object-cover cursor-pointer"
        onClick={handleViewDetails}
      />

      <div className="p-4">
        <h2
          className="text-xl font-semibold cursor-pointer hover:text-blue-600"
          onClick={handleViewDetails}
        >
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

        <p>
          🛏 <span className="font-medium">Room Type:</span>{" "}
          {roomType}
        </p>

        <p className="mt-1">
          🚪 <span className="font-medium">Available Rooms:</span>{" "}
          {availableRooms}
        </p>

        <p className="mt-2">
          <span className="font-medium">Available:</span>{" "}
          {availableRooms > 0 ? (
            <span className="text-green-600 font-semibold">
              Yes
            </span>
          ) : (
            <span className="text-red-600 font-semibold">
              No
            </span>
          )}
        </p>

        <p className="text-sm text-gray-500 mt-2">
          {availableFrom
            ? new Date(availableFrom).toLocaleDateString()
            : "N/A"}{" "}
          -{" "}
          {availableTo
            ? new Date(availableTo).toLocaleDateString()
            : "N/A"}
        </p>

        <div className="flex gap-2 mt-4">

          <Button
            className="flex-1"
            onClick={handleViewDetails}
          >
            View Details
          </Button>

          {availableRooms > 0 ? (
            <Button
              className="flex-1"
              onClick={handleBook}
            >
              Book Now
            </Button>
          ) : (
            <Button
              disabled
              className="flex-1"
            >
              Not Available
            </Button>
          )}

        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
