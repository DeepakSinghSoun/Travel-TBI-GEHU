import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TripPlanner from "./pages/TripPlanner";

// User Pages
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile";
import HomestayManagement from "./pages/HomestayManagement";
import BookingRequest from "./pages/BookingRequest";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import ManageHomestays from "./pages/admin/ManageHomestays";
import ManageUsers from "./pages/admin/ManageUsers";
import HomestayForm from "./pages/admin/HomestayForm";
import ManageBookings from "./pages/admin/ManageBookings";
import ManagePackages from "./pages/admin/ManagePackages";
import PackageForm from "./pages/admin/PackageForm";

// Route Guards
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

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

        <Route path="/admin/packages" element={<ManagePackages />} />

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



        {/* ================= ADMIN ROUTES ================= */}

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
              <ManageHomestays />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/homestays/new"
          element={
            <AdminRoute>
              <HomestayForm />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/homestays/edit/:id"
          element={
            <AdminRoute>
              <HomestayForm />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <AdminRoute>
              <ManageBookings />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/packages"
          element={
            <AdminRoute>
              <ManagePackages />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/packages/new"
          element={
            <AdminRoute>
              <PackageForm />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/packages/edit/:id"
          element={
            <AdminRoute>
              <PackageForm />
            </AdminRoute>
          }
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;