import { useNavigate } from "react-router-dom";
import { ScrollText, MessageSquare, Users, Eye } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  const themeClasses: string = "bg-white text-gray-900 min-h-screen";
  const cardClasses: string = "bg-white border-gray-200";

  return (
    <div className={themeClasses}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-8 h-8 text-red-800" />
            <h1 className="text-2xl md:text-3xl font-bold text-red-800">
              kAISAlita
            </h1>
          </div>
        </header>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-red-800">
              Your Voice Matters
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-80 max-w-2xl mx-auto">
              Share your thoughts, concerns, and ideas anonymously. Help us
              build a better learning environment for everyone in the{" "}
              <span className="text-red-900 font-semibold">
                AISA community.
              </span>
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className={`p-6 rounded-lg border ${cardClasses}`}>
              <MessageSquare className="w-12 h-12 text-red-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Anonymous Sharing</h3>
              <p className="opacity-75">
                Share your thoughts without revealing your identity
              </p>
            </div>
            <div className={`p-6 rounded-lg border ${cardClasses}`}>
              <Users className="w-12 h-12 text-red-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Board</h3>
              <p className="opacity-75">
                See what other students are saying and feeling
              </p>
            </div>
            <div className={`p-6 rounded-lg border ${cardClasses}`}>
              <Eye className="w-12 h-12 text-red-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Full Transparency</h3>
              <p className="opacity-75">
                All submissions are visible to promote openness
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={() => navigate("/board")}
              className="bg-gray-100 hover:bg-red-700 border border-red-900 text-red-900 hover:text-white px-8 py-4 rounded-lg text-lg sm:text-xl font-semibold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto flex-1"
            >
              View Community Board
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate("/form")}
              className="bg-red-900 hover:bg-red-700 border-2 text-white px-8 py-4 rounded-lg text-lg sm:text-xl font-semibold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto flex-1"
            >
              Send Concern Anonymously
              <ScrollText className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center opacity-60">
          <p>Building a stronger academic community together</p>
        </footer>
      </div>
    </div>
  );
}
