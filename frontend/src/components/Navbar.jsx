import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const { user, logout, token } = useAuth();

  const isLoggedIn = !!token;

  const dashboardLink =
    user?.role === "admin" ? "/admin" : "/dashboard";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-blue-600">
          TBI Trip
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-lg font-medium">

          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/listings">Listings</Link>
          </li>

          <li>
            <Link to="/trip-planner">Trip Planner</Link>
          </li>

          {isLoggedIn && (
            <>
              <li>
                <Link to={dashboardLink}>Dashboard</Link>
              </li>

              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </>
          )}

          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-4 px-6 pb-6">

          <li>
            <Link onClick={() => setIsOpen(false)} to="/">
              Home
            </Link>
          </li>

          <li>
            <Link onClick={() => setIsOpen(false)} to="/listings">
              Listings
            </Link>
          </li>

          <li>
            <Link onClick={() => setIsOpen(false)} to="/trip-planner">
              Trip Planner
            </Link>
          </li>

          {isLoggedIn && (
            <>
              <li>
                <Link
                  onClick={() => setIsOpen(false)}
                  to={dashboardLink}
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/profile"
                >
                  Profile
                </Link>
              </li>
            </>
          )}

          {!isLoggedIn ? (
            <>
              <li>
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/login"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/register"
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded w-full"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;