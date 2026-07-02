import { useState, useEffect } from "react";
import API from "../api";
import PropertyCard from "../components/PropertyCard";
import PropertySearch from "../components/PropertySearch";
import Loader from "../components/Loader";
import { filterProperties } from "../utils/filterProperties";

function Listings() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);

  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    roomType: "",
    price: "",
  });

  // FETCH HOMESTAYS FROM BACKEND
  useEffect(() => {
    const fetchHomestays = async () => {
      try {
        setLoading(true);

        const res = await API.get("/homestays");

        console.log("HOMESTAYS:", res.data);

        // safe handling (supports both API formats)
        setProperties(res.data?.homestays || res.data || []);
      } catch (err) {
        console.log("ERROR:", err.response || err.message);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHomestays();
  }, []);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // FORM SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search Data:", searchData);
  };

  // FILTER PROPERTIES
  const filteredProperties = filterProperties(properties, searchData);

  // LOADER
  if (loading) {
    return <Loader />;
  }

  return (
    <section className="px-6 py-10 bg-gray-100 min-h-screen">
      
      {/* SEARCH */}
      <PropertySearch
        searchData={searchData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      {/* LISTINGS */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Homestays
        </h2>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property._id || property.id}
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