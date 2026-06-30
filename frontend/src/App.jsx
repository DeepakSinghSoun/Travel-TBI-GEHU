import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import UserDashboard from "./pages/UserDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomestayManagement from "./pages/HomestayManagement";
import BookingRequest from "./pages/BookingRequest";
import TripPlanner from "./pages/TripPlanner";
import Profile from "./pages/Profile";

// ✅ NEW IMPORT
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter basename="/Travel-TBI-GEHU">
      
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/trip-planner" element={<TripPlanner />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔒 PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-listings"
          element={
            <ProtectedRoute>
              <HomestayManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking-request"
          element={
            <ProtectedRoute>
              <BookingRequest />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;