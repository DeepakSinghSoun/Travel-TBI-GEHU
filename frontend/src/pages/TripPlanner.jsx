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
  const [itinerary, setItinerary] = useState([]);

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const generateItinerary = () => {
    const start = new Date(trip.checkIn);
    const end = new Date(trip.checkOut);

    const days =
      Math.max(
        1,
        Math.ceil((end - start) / (1000 * 60 * 60 * 24))
      ) + 1;

    const plans = [];

    for (let i = 1; i <= days; i++) {
      let activity = "";

      if (i === 1) {
        activity = "Arrival, Hotel Check-in & Evening Walk";
      } else if (i === days) {
        activity = "Breakfast, Shopping & Departure";
      } else {
        switch (trip.travelStyle) {
          case "Adventure":
            activity = "Adventure Sports & Nature Trek";
            break;

          case "Luxury":
            activity = "Luxury Spa, Fine Dining & Relaxation";
            break;

          case "Family":
            activity = "Family Attractions & Local Parks";
            break;

          case "Couple":
            activity = "Romantic Sightseeing & Sunset Point";
            break;

          default:
            activity = "Explore Famous Tourist Attractions";
        }
      }

      plans.push({
        day: i,
        activity,
      });
    }

    setItinerary(plans);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    generateItinerary();

    setGenerated(true);
  };

  return (
    <section className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center">
          AI Trip Planner
        </h1>

        <p className="text-center text-gray-600 mt-3 mb-10">
          Generate a personalized travel itinerary.
        </p>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT */}

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
                  placeholder="Travelers"
                  className="w-full border rounded-lg p-3"
                  />
              </div>

              <input
                type="number"
                name="budget"
                placeholder="Budget"
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
                Generate Itinerary
              </Button>

            </form>

          </div>

          {/* RIGHT */}

          <div className="bg-white rounded-xl shadow-lg p-8">

            <h2 className="text-3xl font-bold mb-6">
              AI Travel Plan
            </h2>

            {!generated ? (
              <div className="text-center text-gray-500 mt-24">
                Fill the form to generate your itinerary.
              </div>
            ) : (
              <>

                <div className="border rounded-lg p-5 mb-6">

                  <h3 className="text-2xl font-bold">
                    📍 {trip.destination}
                  </h3>

                  <p className="mt-2">
                    📅 {trip.checkIn} → {trip.checkOut}
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
                    🚗 {trip.transport}
                  </p>

                  <p>
                    🎒 {trip.travelStyle}
                  </p>

                </div>

                <div className="bg-blue-50 rounded-lg p-6">

                  <h3 className="text-2xl font-bold mb-4">
                    Recommended Itinerary
                  </h3>

                  <div className="space-y-3">

                    {itinerary.map((item) => (
                      <div
                        key={item.day}
                        className="bg-white rounded-lg p-4 shadow"
                      >
                        <h4 className="font-bold">
                          Day {item.day}
                        </h4>

                        <p>{item.activity}</p>
                      </div>
                    ))}

                  </div>

                </div>

              </>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}

export default TripPlanner;