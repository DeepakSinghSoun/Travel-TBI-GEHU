import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { fullName, email, password, confirmPassword, terms } = formData;

    // VALIDATION
    if (
      !fullName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!terms) {
      setError("Please accept Terms & Conditions.");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/register", {
        name: fullName.trim(),
        email: email.trim(),
        password,
      });

      if (res.data?.success || res.data) {
        navigate("/login");
      } else {
        setError("Registration failed. Try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Register to start your journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword.password ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 pr-16"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    password: !prev.password,
                  }))
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600"
              >
                {showPassword.password ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-medium mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 pr-16"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600"
              >
                {showPassword.confirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            <label>I agree to Terms & Conditions</label>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          {/* Button */}
          <Button
            type="submit"
            className="w-full py-3"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;