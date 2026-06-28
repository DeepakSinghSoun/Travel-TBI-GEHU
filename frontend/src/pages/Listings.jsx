import { useState, useEffect } from "react";
import PropertyCard from "../components/PropertyCard";
import PropertySearch from "../components/PropertySearch";
import Loader from "../components/Loader";
import properties from "../data/properties";

function Listings() {
  const [loading, setLoading] = useState(true);

  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    roomType: "",
    price: "",
  });

  useEffect(() => {
    // Simulate API request
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchData);
  };

  const filteredProperties = properties.filter((property) => {
    // Destination
    const matchesDestination =
      searchData.destination === "" ||
      property.title
        .toLowerCase()
        .includes(searchData.destination.toLowerCase()) ||
      property.location
        .toLowerCase()
        .includes(searchData.destination.toLowerCase());

    // Price
    const matchesPrice =
      searchData.price === "" ||
      property.price <= Number(searchData.price);

    // Room Type
    const matchesRoom =
      searchData.roomType === "" ||
      property.roomType === searchData.roomType;

    // Available Rooms
    const hasRooms = property.availableRooms > 0;

    // Date Availability
    const matchesDate =
      (!searchData.checkIn ||
        searchData.checkIn >= property.availableFrom) &&
      (!searchData.checkOut ||
        searchData.checkOut <= property.availableTo);

    return (
      matchesDestination &&
      matchesPrice &&
      matchesRoom &&
      hasRooms &&
      matchesDate
    );
  });

  // Show Loader while data is loading
  if (loading) {
    return <Loader />;
  }

  return (
    <section className="px-6 py-10 bg-gray-100 min-h-screen">
      {/* Search Form */}
      <PropertySearch
        searchData={searchData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      {/* Listings */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Homestays
        </h2>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-2xl font-semibold text-gray-600">
              No Properties Found
            </h3>

            <p className="text-gray-500 mt-2">
              Try changing your search criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Listings;