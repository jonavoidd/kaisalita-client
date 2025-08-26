import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
