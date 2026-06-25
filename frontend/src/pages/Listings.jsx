import { useState } from "react";
import PropertyCard from "../components/PropertyCard";

function Listings() {
    const properties = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
            title: "Mountain View Cottage",
            location: "Mussoorie, Uttarakhand",
            price: 3500,
            rating: 4.8,
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
            title: "Lake View Villa",
            location: "Nainital, Uttarakhand",
            price: 4500,
            rating: 4.9,
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
            title: "Forest Retreat",
            location: "Manali, Himachal Pradesh",
            price: 4000,
            rating: 4.7,
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
            title: "Forest Retreat",
            location: "Manali, Himachal Pradesh",
            price: 4000,
            rating: 4.7,
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
            title: "Forest Retreat",
            location: "Manali, Himachal Pradesh",
            price: 4000,
            rating: 4.7,
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
            title: "Mountain View Cottage",
            location: "Mussoorie, Uttarakhand",
            price: 3500,
            rating: 4.8,
        },
        {
            id: 7,
            image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
            title: "Lake View Villa",
            location: "Nainital, Uttarakhand",
            price: 4500,
            rating: 4.9,
        },
        {
            id: 8,
            image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
            title: "Forest Retreat",
            location: "Manali, Himachal Pradesh",
            price: 4000,
            rating: 4.7,
        },
    ];

    const [search, setSearch] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const filteredProperties = properties.filter((property) => {
        const matchesSearch =
        property.title.toLowerCase().includes(search.toLowerCase()) ||
        property.location.toLowerCase().includes(search.toLowerCase());

        const matchesPrice =
        maxPrice === "" || property.price <= Number(maxPrice);

        return matchesSearch && matchesPrice;
    });

    return (
        <section className="px-6 py-10">
        <h2 className="text-3xl font-bold text-center mb-8">
            Featured Homestays
        </h2>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
            type="text"
            placeholder="Search by title or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-lg flex-1"
            />

            <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border p-3 rounded-lg"
            />
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
              />
            ))}
          </div>
        </div>

      </section>
    );
}

export default Listings;