import { useEffect } from "react";
import API from "../api";

function PropertySearch({
  searchData,
  handleChange,
  setResults,
}) {
  useEffect(() => {
    const fetchAndFilter = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const res = await API.get("/trips", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let trips = res.data.trips || [];

        // AUTO FILTERING
        if (searchData.destination) {
          trips = trips.filter((t) =>
            t.destination
              .toLowerCase()
              .includes(searchData.destination.toLowerCase())
          );
        }

        if (searchData.price) {
          trips = trips.filter(
            (t) => t.budget <= Number(searchData.price)
          );
        }

        if (searchData.guests) {
          trips = trips.filter(
            (t) => t.travelers >= Number(searchData.guests)
          );
        }

        if (searchData.roomType) {
          trips = trips.filter(
            (t) =>
              t.roomType?.toLowerCase() ===
              searchData.roomType.toLowerCase()
          );
        }

        setResults(trips);
      } catch (err) {
        console.log("Search error:", err);
      }
    };

    // SIMPLE AUTO TRIGGER
    fetchAndFilter();
  }, [searchData]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-3xl font-bold mb-6">
        Find Your Perfect Stay
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Destination */}
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={searchData.destination}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        {/* Check In */}
        <input
          type="date"
          name="checkIn"
          value={searchData.checkIn}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        {/* Check Out */}
        <input
          type="date"
          name="checkOut"
          value={searchData.checkOut}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        {/* Guests */}
        <input
          type="number"
          name="guests"
          min="1"
          value={searchData.guests}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Max Price"
          value={searchData.price}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        {/* Room Type */}
        <select
          name="roomType"
          value={searchData.roomType}
          onChange={handleChange}
          className="border rounded-lg p-3"
        >
          <option value="">All Rooms</option>
          <option value="Standard">Standard</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Suite">Suite</option>
          <option value="Family">Family</option>
        </select>

      </div>
    </div>
  );
}

export default PropertySearch;