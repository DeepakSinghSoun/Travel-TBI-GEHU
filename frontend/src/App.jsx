import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomestayManagement from "./pages/HomestayManagement";
import BookingRequest from "./pages/BookingRequest";
import TripPlanner from "./pages/TripPlanner";
import Profile from "./pages/Profile";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Listings", path: "/listings" },
  { name: "Trip Planner", path: "/trip-planner" },
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
];

function App() {
  return (
    <BrowserRouter basename="/Travel-TBI-GEHU">
      <Navbar links={navLinks} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/listings" element={<Listings />} />

        <Route path="/trip-planner" element={<TripPlanner />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Hidden Pages */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/manage-listings"
          element={<HomestayManagement />}
        />

        <Route
          path="/booking-request"
          element={<BookingRequest />}
        />

        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Footer links={navLinks} />
    </BrowserRouter>
  );
}

export default App;