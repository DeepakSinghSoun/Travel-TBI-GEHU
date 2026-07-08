import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api";

function PackageForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    description: "",
    image: "",
    duration: "",
    price: "",
    seats: "",
    difficulty: "Easy",
    status: "Available",
  });

  useEffect(() => {
    if (isEdit) {
      fetchPackage();
    }
  }, [id]);

  const fetchPackage = async () => {
    try {
      const res = await API.get(`/packages/${id}`);

      setFormData(res.data.package);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (isEdit) {
        await API.put(
          `/packages/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await API.post(
          "/packages",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      navigate("/admin/packages");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to save package."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">

        <h1 className="text-3xl font-bold mb-6">
          {isEdit ? "Edit Package" : "Add Travel Package"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="title"
            placeholder="Package Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={formData.destination}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration (3 Days)"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="seats"
            placeholder="Seats"
            value={formData.seats}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />

          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option>Easy</option>
            <option>Moderate</option>
            <option>Hard</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option>Available</option>
            <option>Full</option>
          </select>

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            {isEdit ? "Update Package" : "Create Package"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default PackageForm;