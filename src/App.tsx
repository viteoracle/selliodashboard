import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { createElement, useEffect } from "react";
import { Provider } from 'react-redux';
import { store } from '@/services/store/store';
import NetworkStatus from "@/components/common/NetworkStatus";
import { RoleGuard } from "@/components/auth/RoleGuard";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OTPVerification from "./pages/OTPVerification";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AddProduct from "./pages/seller/AddProduct";
import UserManagement from "./pages/admin/UserManagement";
import OrdersPage from "./pages/admin/Orders";
import AnalyticsPage from "./pages/admin/Analytics";
import FileManagerPage from "./pages/admin/FileManager";
import NotificationsPage from "./pages/admin/Notifications";
import SupportPage from "./pages/admin/Support";
import VendorDetail from "./pages/VendorDetail";
import PaymentCallback from "@/pages/PaymentCallback";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import AdminCategories from "./pages/admin/Categories";
import Vendors from "./pages/Vendors";

// Create a new QueryClient instance inside the component
const App = () => {
  useEffect(() => {
    // Add PayStack Script
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // Clean up
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <Provider store={store}>
      <CartProvider>
        <TooltipProvider>
          <NetworkStatus />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/otp-verification" element={<OTPVerification />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/vendor/:vendorId" element={<VendorDetail />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/cart" element={<Cart />} />

              {/* Protected Customer Routes */}
              <Route path="/checkout" element={
                <RoleGuard roles={['customer']}>
                  <Checkout />
                </RoleGuard>
              } />
              <Route path="/order-confirmation" element={
                <RoleGuard roles={['customer']}>
                  <OrderConfirmation />
                </RoleGuard>
              } />
              <Route path="/customer/dashboard" element={
                <RoleGuard roles={['customer']}>
                  <CustomerDashboard />
                </RoleGuard>
              } />

              {/* Protected Seller Routes */}
              <Route path="/seller/*" element={
                <RoleGuard roles={['seller']}>
                  <Routes>
                    <Route path="dashboard" element={<SellerDashboard />} />
                    <Route path="products/new" element={<AddProduct />} />
                    <Route path="*" element={<Navigate to="dashboard" />} />
                  </Routes>
                </RoleGuard>
              } />

              {/* Protected Admin Routes */}
              <Route path="/admin/*" element={
                <RoleGuard roles={['admin']}>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="categories" element={<AdminCategories />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                    <Route path="files" element={<FileManagerPage />} />
                    <Route path="notifications" element={<NotificationsPage />} />
                    <Route path="support" element={<SupportPage />} />
                    <Route path="*" element={<Navigate to="dashboard" />} />
                  </Routes>
                </RoleGuard>
              } />

              {/* Payment Verification Route */}
              <Route path="/payment/verify/:reference" element={<PaymentCallback />} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </Provider>
  );
};

export default App;
