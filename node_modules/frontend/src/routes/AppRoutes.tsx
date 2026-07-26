import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import Home from "../pages/article/Home";
import CreateArticle from "../pages/article/CreateArticle";
import MyArticles from "../pages/article/MyArticles";
import EditArticle from "../pages/article/EditArticle";

import Dashboard from "../pages/admin/Dashboard";
import PendingArticles from "../pages/admin/PendingArticles";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* User Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-article"
        element={
          <ProtectedRoute>
            <CreateArticle />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-articles"
        element={
          <ProtectedRoute>
            <MyArticles />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-article/:id"
        element={
          <ProtectedRoute>
            <EditArticle />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/pending"
        element={
          <AdminRoute>
            <PendingArticles />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;