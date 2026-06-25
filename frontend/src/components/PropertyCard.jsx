import { Link } from "react-router-dom";

function PropertyCard({
  image,
  title,
  location,
  price,
  rating,
}) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md w-80 ">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold">{title}</h2>

        <p className="text-gray-600 mt-1">
          📍 {location}
        </p>

        <p className="mt-2">
          ⭐ {rating}
        </p>

        <p className="text-lg font-bold mt-2">
          ₹{price}/night
        </p>

        <Link
          to="/booking-request"
          className="block mt-4 w-full bg-blue-600 text-white py-2 rounded text-center"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;