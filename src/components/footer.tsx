import { MessageSquare, Heart, Mail, Users, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleNavigation = (path: string) => {
    navigate(path);

    // window.scrollTo({ top: 0, behavior: "smooth" });
    const scrollToTop = () => {
      const currentPosition = window.pageYOffset;
      if (currentPosition > 0) {
        window.scrollTo(0, Math.max(currentPosition - 40, 0));
        requestAnimationFrame(scrollToTop);
      }
    };

    setTimeout(scrollToTop, 100);
  };

  return (
    <footer className="w-full bg-gradient-to-br from-gray-800 via-gray-900 to-red-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-red-400" />
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Student Voice
              </h3>
            </div>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              Empowering students to share their thoughts, concerns, and ideas
              anonymously. Building a stronger academic community together.
            </p>
            <div className="flex items-center gap-2 text-sm text-red-300">
              <Heart className="w-4 h-4" />
              <span>Made with care for students</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              <li>
                <button
                  onClick={() => handleNavigation("/board")}
                  className="hover:text-red-300 transition-colors duration-200 flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  Community Board
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/form")}
                  className="hover:text-red-300 transition-colors duration-200 flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Share Your Voice
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Categories
            </h4>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              <li>
                <span className="hover:text-red-300 transition-colors duration-200">
                  Academics
                </span>
              </li>
              <li>
                <span className="hover:text-red-300 transition-colors duration-200">
                  Student Well-being
                </span>
              </li>
              <li>
                <span className="hover:text-red-300 transition-colors duration-200">
                  Facilities
                </span>
              </li>
              <li>
                <span className="hover:text-red-300 transition-colors duration-200">
                  Events & Activities
                </span>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              <li>
                <a
                  href="mailto:support@studentvoice.edu"
                  className="hover:text-red-300 transition-colors duration-200 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Contact Support
                </a>
              </li>
              <li>
                <span className="text-gray-400">Anonymous & Secure</span>
              </li>
              <li>
                <span className="text-gray-400">24/7 Community</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6 sm:my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-sm sm:text-base text-gray-400 order-2 sm:order-1">
            <p>© {currentYear} AISA. All rights reserved.</p>
          </div>

          {/* Additional Info */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 order-1 sm:order-2">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Privacy Protected
            </span>
            <span className="hidden sm:block">•</span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              Community Driven
            </span>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-400 italic max-w-2xl mx-auto leading-relaxed">
              "Every voice matters. Every concern is valid. Every idea can spark
              change. Together, we build a learning environment where everyone
              thrives."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
