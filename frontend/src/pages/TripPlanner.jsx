import { useState } from "react";
import Button from "../components/Button";

function TripPlanner() {
  const [trip, setTrip] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    travelers: 2,
    budget: "",
    travelStyle: "",
    transport: "",
    hotelType: "",
  });

  const [generated, setGenerated] = useState(false);

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(trip);

    setGenerated(true);
  };

  return (
    <section className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-center">
          AI Trip Planner
        </h1>

        <p className="text-center text-gray-600 mt-3 mb-10">
          Plan your dream trip with personalized recommendations.
        </p>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Form */}

          <div className="bg-white rounded-xl shadow-lg p-8">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <input
                type="text"
                name="destination"
                placeholder="Destination"
                value={trip.destination}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="font-medium">
                    Check In
                  </label>

                  <input
                    type="date"
                    name="checkIn"
                    value={trip.checkIn}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mt-2"
                    required
                  />
                </div>

                <div>
                  <label className="font-medium">
                    Check Out
                  </label>

                  <input
                    type="date"
                    name="checkOut"
                    value={trip.checkOut}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mt-2"
                    required
                  />
                </div>

              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Number of Travelers
                </label>

                <input
                  type="number"
                  name="travelers"
                  min="1"
                  value={trip.travelers}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <input
                type="number"
                name="budget"
                placeholder="Budget (₹)"
                value={trip.budget}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <select
                name="travelStyle"
                value={trip.travelStyle}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >
                <option value="">Travel Style</option>
                <option>Budget</option>
                <option>Luxury</option>
                <option>Adventure</option>
                <option>Family</option>
                <option>Couple</option>
              </select>

              <select
                name="transport"
                value={trip.transport}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >
                <option value="">Transportation</option>
                <option>Flight</option>
                <option>Train</option>
                <option>Bus</option>
                <option>Car</option>
              </select>

              <select
                name="hotelType"
                value={trip.hotelType}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              >
                <option value="">Accommodation</option>
                <option>Homestay</option>
                <option>Hotel</option>
                <option>Resort</option>
                <option>Hostel</option>
                <option>Villa</option>
              </select>

              <Button
                type="submit"
                className="w-full py-3"
              >
                Generate AI Itinerary
              </Button>

            </form>

          </div>

          {/* AI Result */}

          <div className="bg-white rounded-xl shadow-lg p-8">

            <h2 className="text-3xl font-bold mb-6">
              AI Recommendation
            </h2>

            {!generated ? (

              <div className="text-center mt-24 text-gray-500">
                <p>
                  Fill in your travel details and click
                  <strong> Generate AI Itinerary</strong>.
                </p>
              </div>

            ) : (

              <div className="space-y-4">

                <div className="border rounded-lg p-4">
                  <h3 className="font-bold text-xl">
                    📍 {trip.destination}
                  </h3>

                  <p>
                    {trip.checkIn} → {trip.checkOut}
                  </p>

                  <p>
                    👥 {trip.travelers} Travelers
                  </p>

                  <p>
                    💰 ₹{trip.budget}
                  </p>

                  <p>
                    🏨 {trip.hotelType}
                  </p>

                  <p>
                    ✈️ {trip.transport}
                  </p>

                  <p>
                    🎒 {trip.travelStyle}
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-5">

                  <h3 className="font-bold mb-3">
                    Sample AI Itinerary
                  </h3>

                  <ul className="space-y-2">

                    <li>Day 1 • Arrival & Local Sightseeing</li>

                    <li>Day 2 • Explore Popular Attractions</li>

                    <li>Day 3 • Adventure Activities</li>

                    <li>Day 4 • Shopping & Local Food Tour</li>

                    <li>Day 5 • Departure</li>

                  </ul>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>
    </section>
  );
}

export default TripPlanner;