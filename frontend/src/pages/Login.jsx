import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

import Button from "../components/Button";
import Toast from "../components/Toast";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setToastMessage("Please fill in all fields.");
      setToastType("error");
      setShowToast(true);
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = res.data;

      if (!token) {
        throw new Error("Token not received from server.");
      }

      login(token, user);

      setToastMessage("Login Successful!");
      setToastType("success");
      setShowToast(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (err) {
      setToastMessage(
        err.response?.data?.message ||
          err.message ||
          "Login failed"
      );
      setToastType("error");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border rounded-lg p-3 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
            Remember Me
          </label>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full py-3"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>

      <Toast
        show={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

export default Login;