import Button from "./Button";

function PropertySearch({
  searchData,
  handleChange,
  handleSubmit,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-3xl font-bold mb-6">
        Find Your Perfect Stay
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Destination */}
        <div>
          <label className="block mb-2 font-medium">
            Destination
          </label>

          <input
            type="text"
            name="destination"
            placeholder="City or Location"
            value={searchData.destination}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Check In */}
        <div>
          <label className="block mb-2 font-medium">
            Check-In
          </label>

          <input
            type="date"
            name="checkIn"
            value={searchData.checkIn}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Check Out */}
        <div>
          <label className="block mb-2 font-medium">
            Check-Out
          </label>

          <input
            type="date"
            name="checkOut"
            value={searchData.checkOut}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Guests */}
        <div>
          <label className="block mb-2 font-medium">
            Guests
          </label>

          <input
            type="number"
            name="guests"
            min="1"
            value={searchData.guests}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block mb-2 font-medium">
            Max Price
          </label>

          <input
            type="number"
            name="price"
            placeholder="₹5000"
            value={searchData.price}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Room Type */}
        <div>
          <label className="block mb-2 font-medium">
            Room Type
          </label>

          <select
            name="roomType"
            value={searchData.roomType}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Rooms</option>
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
            <option value="Family">Family</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="lg:col-span-2 flex items-end">
          <Button
            type="submit"
            className="w-full py-3"
          >
            Search Properties
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PropertySearch;