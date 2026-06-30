import { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/trips", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTrips(res.data.trips);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Travel App</h1>

      {trips.map((trip) => (
        <div key={trip._id} style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}>
          <h3>{trip.destination}</h3>
          <p>Budget: {trip.budget}</p>
          <p>Travelers: {trip.travelers}</p>
        </div>
      ))}
    </div>
  );
}

export default App;