import React from "react";
import { Routes, Route } from "react-router-dom";

// ================= NAVBAR =================
import { Header } from "./components/Navbar";

// ================= HOME COMPONENTS =================
import Hero from "./components/Hero/Hero";
import PopularCategories from "./components/PopularCategories/PopularCategories";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import HowItWorks from "./components/HowItsWork/HowItWorks";
import AboutUs from "./components/AboutUs/AboutUs";

// ================= PAGES =================
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import HelpSupport from "./pages/HelpSupport";
import OrderSuccess from "./pages/OrderSuccess";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import BookingSuccess from "./pages/BookingSuccess";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ServiceDetails from "./pages/ServiceDetails";
import Profile from "./pages/Profile";

// ================= ENTREPRENEUR PAGES =================
import EntrepreneurDashboard from "./pages/entrepreneur/EntrepreneurDashboard";
import EntrepreneurProfile from "./pages/entrepreneur/EntrepreneurProfile";

import MyProducts from "./pages/entrepreneur/MyProducts";
import AddProduct from "./pages/entrepreneur/AddProduct";
import EditProduct from "./pages/entrepreneur/EditProduct";
import ProductView from "./pages/entrepreneur/ProductView";

import MyOrders from "./pages/entrepreneur/MyOrders";
import OrderDetails from "./pages/entrepreneur/OrderDetails";

import MyServices from "./pages/entrepreneur/MyServices";
import EntrepreneurServiceDetails from "./pages/entrepreneur/EntrepreneurServiceDetails";
import AddService from "./pages/entrepreneur/AddService";
import EditService from "./pages/entrepreneur/EditService";

import ServiceRequests from "./pages/entrepreneur/ServiceRequests";
import ServiceRequestDetails from "./pages/entrepreneur/ServiceRequestDetails";

import Earnings from "./pages/entrepreneur/Earnings";
import ManageAvailability from "./pages/entrepreneur/ManageAvailability";

// ================= ADMIN PAGES =================
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageEntrepreneurs from "./pages/admin/ManageEntrepreneurs";
import ManageCategories from "./pages/admin/ManageCategories";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageOrders from "./pages/admin/ManageOrders";
import ManageServiceRequests from "./pages/admin/ManageServiceRequests";
import ManageComplaints from "./pages/admin/ManageComplaints";
import AnalyticsReports from "./pages/admin/AnalyticsReports";
import ManageUsers from "./pages/admin/ManageUsers";

// ================= FOOTER =================
import Footer from "./components/Footer/Footer";

// =====================================================
// HOME PAGE
// =====================================================

function Home() {
  return (
    <main>
      <Hero />
      <PopularCategories />
      <FeaturedProducts />
      <HowItWorks />
      <AboutUs />
    </main>
  );
}

// =====================================================
// APP
// =====================================================

function App() {
  return (
    <>
      {/* ================= NAVBAR ================= */}

      <Header />

      {/* ================= ROUTES ================= */}

      <Routes>
        {/* ================= HOME ================= */}

        <Route path="/" element={<Home />} />

        {/* ================= CUSTOMER / PUBLIC ================= */}

        {/* Products */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        {/* Services */}
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetails />} />

        {/* Booking */}
        <Route path="/book-service/:id" element={<Booking />} />
        <Route path="/booking-success" element={<BookingSuccess />} />

        {/* How It Works */}
        <Route path="/how-it-works" element={<HowItWorks />} />

        {/* About */}
        <Route path="/about" element={<AboutUs />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* General User Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />

        {/* Checkout */}
        <Route path="/checkout" element={<Checkout />} />

        {/* Help and Support */}
        <Route path="/help" element={<HelpSupport />} />

        {/* Order Success */}
        <Route path="/order-success" element={<OrderSuccess />} />

        {/* ================= ENTREPRENEUR PANEL ================= */}

        {/* Dashboard */}
        <Route
          path="/entrepreneur/dashboard"
          element={<EntrepreneurDashboard />}
        />

        {/* Entrepreneur Profile */}
        <Route path="/entrepreneur/profile" element={<EntrepreneurProfile />} />

        {/* Products */}
        <Route path="/entrepreneur/products" element={<MyProducts />} />
        <Route path="/entrepreneur/add-product" element={<AddProduct />} />
        <Route path="/entrepreneur/edit-product" element={<EditProduct />} />
        <Route path="/entrepreneur/product-view" element={<ProductView />} />

        {/* Orders */}
        <Route path="/entrepreneur/orders" element={<MyOrders />} />
        <Route path="/entrepreneur/orders/:id" element={<OrderDetails />} />

        {/* Services */}
        <Route path="/entrepreneur/services" element={<MyServices />} />
        <Route path="/entrepreneur/add-service" element={<AddService />} />

        <Route
          path="/entrepreneur/services/:id"
          element={<EntrepreneurServiceDetails />}
        />

        <Route
          path="/entrepreneur/services/:id/edit"
          element={<EditService />}
        />

        {/* Service Requests */}
        <Route
          path="/entrepreneur/service-requests"
          element={<ServiceRequests />}
        />

        <Route
          path="/entrepreneur/service-requests/:id"
          element={<ServiceRequestDetails />}
        />

        {/* Earnings */}
        <Route path="/entrepreneur/earnings" element={<Earnings />} />

        {/* Availability */}
        <Route
          path="/entrepreneur/availability"
          element={<ManageAvailability />}
        />

        {/* ================= ADMIN PANEL ================= */}

        {/* Admin Dashboard */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Manage Entrepreneurs */}
        <Route path="/admin/entrepreneurs" element={<ManageEntrepreneurs />} />

        {/* Manage Categories */}
        <Route path="/admin/categories" element={<ManageCategories />} />

        {/* Manage Products */}
        <Route path="/admin/products" element={<ManageProducts />} />

        {/* Manage Orders */}
        <Route path="/admin/orders" element={<ManageOrders />} />

        {/* Manage Service Requests */}
        <Route
          path="/admin/service-requests"
          element={<ManageServiceRequests />}
        />

        {/* Complaints / Disputes */}
        <Route path="/admin/complaints" element={<ManageComplaints />} />

        {/* Analytics & Reports */}
        <Route path="/admin/analytics" element={<AnalyticsReports />} />

        {/* Manage Users */}
        <Route path="/admin/users" element={<ManageUsers />} />
      </Routes>

      {/* ================= FOOTER ================= */}

      <Footer />
    </>
  );
}

export default App;
