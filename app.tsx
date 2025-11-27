import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./src/pages/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ProtectedRoute from "./src/utills/protectedRoutes";
import Dashboard from "./src/pages/Dashboard/Dashboard";
import MainLayout from "./src/layout/MainLayout";
import Bookings from "./src/pages/Booking/createBooking";
import { Toaster } from "react-hot-toast";

function App() {
  const clientId = (import.meta as any).env.VITE_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/rooms/:id/bookings"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Bookings />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/"
            element={
              <>
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
