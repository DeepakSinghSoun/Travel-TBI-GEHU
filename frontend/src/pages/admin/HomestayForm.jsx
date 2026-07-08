import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api";

function HomestayForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    availableRooms: "",
    images: "",
  });

  useEffect(() => {
    if (isEdit) {
      fetchHomestay();
    }
  }, [id]);

  const fetchHomestay = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.get(`/admin/homestays/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const home = res.data.homestay;

      setFormData({
        title: home.title || "",
        description: home.description || "",
        location: home.location || "",
        price: home.price || "",
        availableRooms: home.availableRooms || "",
        images: home.images?.join(", ") || "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load homestay");
    } finally {
      setLoading(false);
    }
  };

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

      const payload = {
        ...formData,
        price: Number(formData.price),
        availableRooms: Number(formData.availableRooms),
        images: formData.images
          .split(",")
          .map((img) => img.trim())
          .filter((img) => img !== ""),
      };

      if (isEdit) {
        await API.put(`/admin/homestays/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Homestay updated successfully");
      } else {
        await API.post("/admin/homestays", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Homestay created successfully");
      }

      navigate("/admin/homestays");
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-8">
          {isEdit ? "Edit Homestay" : "Add New Homestay"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Title */}

          <div>
            <label className="font-semibold">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>

          {/* Description */}

          <div>
            <label className="font-semibold">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>

          {/* Location */}

          <div>
            <label className="font-semibold">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="font-semibold">
                Price Per Night
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full mt-2 border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="font-semibold">
                Available Rooms
              </label>

              <input
                type="number"
                name="availableRooms"
                value={formData.availableRooms}
                onChange={handleChange}
                required
                className="w-full mt-2 border rounded-lg p-3"
              />
            </div>

          </div>

          {/* Images */}

          <div>
            <label className="font-semibold">
              Image URLs
            </label>

            <textarea
              rows="4"
              name="images"
              value={formData.images}
              onChange={handleChange}
              placeholder="https://image1.jpg, https://image2.jpg"
              className="w-full mt-2 border rounded-lg p-3"
            />

            <p className="text-gray-500 text-sm mt-2">
              Separate multiple image URLs using commas.
            </p>
          </div>

          <div className="flex gap-4">

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
            >
              {loading
                ? "Saving..."
                : isEdit
                ? "Update Homestay"
                : "Create Homestay"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/homestays")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default HomestayForm;