import { useState } from "react";
import API from "../api";

function HomestayForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    roomType: "Standard",
    availableRooms: "",
    availableFrom: "",
    availableTo: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await API.post(
        "/admin/homestays",
        {
          title: formData.title,
          location: formData.location,
          price: Number(formData.price),
          roomType: formData.roomType,
          availableRooms: Number(formData.availableRooms),
          availableFrom: formData.availableFrom,
          availableTo: formData.availableTo,
          images: [formData.image],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Homestay added successfully!");

      setFormData({
        title: "",
        location: "",
        price: "",
        roomType: "Standard",
        availableRooms: "",
        availableFrom: "",
        availableTo: "",
        image: "",
      });

      onSuccess();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add homestay");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow mb-8"
    >
      <h2 className="text-2xl font-bold mb-5">
        Add Homestay
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          name="roomType"
          placeholder="Room Type"
          value={formData.roomType}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="number"
          name="availableRooms"
          placeholder="Available Rooms"
          value={formData.availableRooms}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="date"
          name="availableFrom"
          value={formData.availableFrom}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="date"
          name="availableTo"
          value={formData.availableTo}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="border p-3 rounded md:col-span-2"
        />

      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        {loading ? "Saving..." : "Save Homestay"}
      </button>
    </form>
  );
}

export default HomestayForm;