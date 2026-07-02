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
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter basename="/Travel-TBI-GEHU">

      <Navbar />

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/listings" element={<Listings />} />

        <Route path="/trip-planner" element={<TripPlanner />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* ================= ADMIN ROUTES ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/homestays"
          element={
            <ProtectedRoute>
              <HomestayManagement />
            </ProtectedRoute>
          }
        />

        {/* ================= USER ROUTES ================= */}

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

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/homestays"
          element={
            <AdminRoute>
              <HomestayManagement />
            </AdminRoute>
          }
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;