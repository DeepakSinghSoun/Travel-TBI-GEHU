import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";
import Loader from "../components/Loader";

function HomestayDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [homestay, setHomestay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomestay = async () => {
      try {
        const res = await API.get(`/homestays/${id}`);
        setHomestay(res.data.homestay);
      } catch (err) {
        console.log(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomestay();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!homestay) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500">
          Homestay Not Found
        </h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Image */}
        <img
          src={
            homestay.images?.[0] ||
            "https://via.placeholder.com/1200x600?text=No+Image"
          }
          alt={homestay.title}
          className="w-full h-[450px] object-cover"
        />

        {/* Details */}
        <div className="p-8">

          <h1 className="text-4xl font-bold mb-3">
            {homestay.title}
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            📍 {homestay.location}
          </p>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <p className="mb-3">
                <span className="font-semibold">Price:</span>{" "}
                ₹{homestay.price}/night
              </p>

              <p className="mb-3">
                <span className="font-semibold">Room Type:</span>{" "}
                {homestay.roomType}
              </p>

              <p className="mb-3">
                <span className="font-semibold">Available Rooms:</span>{" "}
                {homestay.availableRooms}
              </p>

              <p className="mb-3">
                <span className="font-semibold">Available From:</span>{" "}
                {homestay.availableFrom
                  ? new Date(homestay.availableFrom).toLocaleDateString()
                  : "N/A"}
              </p>

              <p>
                <span className="font-semibold">Available To:</span>{" "}
                {homestay.availableTo
                  ? new Date(homestay.availableTo).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">
                Description
              </h2>

              <p className="text-gray-700 leading-7">
                Enjoy a comfortable stay with modern amenities,
                beautiful surroundings, and an unforgettable
                travel experience. Perfect for couples, families,
                and solo travelers.
              </p>
            </div>

          </div>

          <div className="mt-10 flex gap-4">

            <button
              onClick={() =>
                navigate("/booking", {
                  state: {
                    homestay,
                  },
                })
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Book Now
            </button>

            <button
              onClick={() => navigate("/listings")}
              className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-lg"
            >
              Back
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}

export default HomestayDetails;
