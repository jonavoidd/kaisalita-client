import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layout/MainLayout";
import AdminLayout from "./layout/AdminLayout";
import HomePage from "./home/page";
import BoardPage from "./board/page";
import FormPage from "./form/page";
import { ProtectedRoute } from "./components/ProtectedRoute";
import AdminDashboard from "./admin/page";
import PostsManagement from "./admin/posts/page";
import LoginPage from "./login/page";
// import { ProtectedRoute } from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="board" element={<BoardPage />} />
          <Route path="form" element={<FormPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="posts" element={<PostsManagement />} />
        </Route>
        {/* <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        /> */}
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
