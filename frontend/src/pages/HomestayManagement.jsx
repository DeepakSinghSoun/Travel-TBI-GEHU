import { useState } from "react";

function HomestayManagement() {
  const [listings, setListings] = useState([
    {
      id: 1,
      title: "Mountain View Cottage",
      location: "Mussoorie",
      price: 3500,
    },
    {
      id: 2,
      title: "Lake View Villa",
      location: "Nainital",
      price: 4500,
    },
  ]);

  const addListing = () => {
    const newListing = {
      id: Date.now(),
      title: "New Homestay",
      location: "Location",
      price: 3000,
    };

    setListings([...listings, newListing]);
  };

  const deleteListing = (id) => {
    setListings(listings.filter((listing) => listing.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Homestay Listings Management
        </h1>

        <button
          onClick={addListing}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Listing
        </button>
      </div>

      <div className="space-y-4">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">
                {listing.title}
              </h2>

              <p>{listing.location}</p>

              <p>₹{listing.price}/night</p>
            </div>

            <div className="flex gap-2">
              <button className="bg-blue-600 text-white px-3 py-1 rounded">
                Edit
              </button>

              <button
                onClick={() => deleteListing(listing.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomestayManagement;