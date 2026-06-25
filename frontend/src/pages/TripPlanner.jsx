import { useState } from "react";

function TripPlanner() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `Generating trip plan for ${destination} (${days} days, ₹${budget} budget)`
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-4xl font-bold text-center mb-6">
          AI Trip Planner
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="number"
            placeholder="Number of Days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="number"
            placeholder="Budget (₹)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Generate Itinerary
          </button>
        </form>

        {/* Sample AI Output */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">
            Sample Itinerary
          </h2>

          <div className="bg-gray-50 p-4 rounded">
            <p><strong>Day 1:</strong> Arrival & Local Sightseeing</p>
            <p><strong>Day 2:</strong> Adventure Activities</p>
            <p><strong>Day 3:</strong> Nature Exploration</p>
            <p><strong>Day 4:</strong> Shopping & Departure</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripPlanner;