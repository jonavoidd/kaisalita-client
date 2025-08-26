import React from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, FileText, LogOut, X, MessageSquare } from "lucide-react";
import { logout } from "../../firebase/auth";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeRoute: string;
  setActiveRoute: (route: string) => void;
}

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3, path: "/admin" },
  { id: "posts", label: "Posts", icon: FileText, path: "/admin/posts" },
  // { id: "admin", label: "Admin", icon: Users, path: "/admin/settings" },
];

export const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  activeRoute,
  setActiveRoute,
}) => {
  const navigate = useNavigate();

  const handleNavigation = (item: (typeof sidebarItems)[0]) => {
    setActiveRoute(item.id);
    setSidebarOpen(false);
    navigate(item.path);
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-8 h-8 text-red-800" />
            <span className="text-xl font-bold text-red-800">Admin Panel</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    activeRoute === item.id
                      ? "bg-red-50 text-red-800 border-r-4 border-red-800"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="w-64 fixed inset-y-0 left-0 z-40 bg-white shadow-lg border-r border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-8 h-8 text-red-800" />
              <span className="text-xl font-bold text-red-800">
                Admin Panel
              </span>
            </div>
          </div>

          <nav className="mt-8 px-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                      activeRoute === item.id
                        ? "bg-red-50 text-red-800 border-r-4 border-red-800"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
