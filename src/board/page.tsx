import { useState, useMemo } from "react";
import type {
  Priority,
  SubmissionType,
  TopicArea,
} from "./../types/input-type";
import { MessageSquare, Filter, SortAsc, SortDesc, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type Post from "../types/post";
import { getAllPost } from "../api/posts";
import { useQuery } from "@tanstack/react-query";

type SortOrder = "newest" | "oldest";

interface FilterState {
  submissionType: SubmissionType | "";
  topicArea: TopicArea | "";
  priority: Priority | "";
}

export default function BoardPage() {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    submissionType: "",
    topicArea: "",
    priority: "",
  });

  const { data, isLoading, isError, error } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: getAllPost,
  });

  const submissionTypeOptions: SubmissionType[] = [
    "Suggestion",
    "Concern",
    "Idea",
    "Praise",
    "Other (please specify)",
  ];

  const topicAreaOptions: TopicArea[] = [
    "Academics",
    "Organization/Leadership",
    "Events or Activities",
    "Student Well-being",
    "Facilities or Resources",
    "Other (please specify)",
  ];

  const priorityOptions: Priority[] = [
    "Urgent",
    "Needs follow-up",
    "For awareness only",
  ];

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    const filtered = data.filter((post) => {
      if (!post.publish) return false;

      if (
        filters.submissionType &&
        post.submissionType !== filters.submissionType
      )
        return false;
      if (filters.topicArea && post.topicArea !== filters.topicArea)
        return false;
      if (filters.priority && post.priority !== filters.priority) return false;

      return true;
    });

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [data, filters, sortOrder]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPriorityColor = (priority: Priority): string => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-800";
      case "Needs follow-up":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getTypeColor = (type: SubmissionType): string => {
    switch (type) {
      case "Concern":
        return "bg-orange-100 text-orange-800";
      case "Suggestion":
        return "bg-green-100 text-green-800";
      case "Idea":
        return "bg-purple-100 text-purple-800";
      case "Praise":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      submissionType: "",
      topicArea: "",
      priority: "",
    });
  };

  const hasActiveFilters =
    filters.submissionType || filters.topicArea || filters.priority;

  const themeClasses: string = "bg-gray-50 text-gray-900 min-h-screen";
  const cardClasses: string =
    "bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <MessageSquare className="w-12 h-12 text-red-800 mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <MessageSquare className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg text-red-600">Error: {error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <section className={themeClasses}>
      {/* Mobile-first responsive container */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Header */}
        <header className="flex justify-center items-center mb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity hover:cursor-pointer p-2 rounded-lg hover:bg-white hover:shadow-sm"
            >
              <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-800" />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-800">
                kAISAlita
              </h1>
            </button>
          </div>
        </header>

        {/* Controls Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            {/* Filter and Sort Controls */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  showFilters || hasActiveFilters
                    ? "bg-red-800 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <span className="bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {Object.values(filters).filter((v) => v).length}
                  </span>
                )}
              </button>

              <button
                onClick={() =>
                  setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
                }
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-all"
              >
                {sortOrder === "newest" ? (
                  <SortDesc className="w-4 h-4" />
                ) : (
                  <SortAsc className="w-4 h-4" />
                )}
                {sortOrder === "newest" ? "Newest First" : "Oldest First"}
              </button>
            </div>

            {/* Posts Count */}
            <div className="text-sm text-gray-600">
              {filteredAndSortedPosts.length} post
              {filteredAndSortedPosts.length !== 1 ? "s" : ""}
              {hasActiveFilters && ` (filtered)`}
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Filter Posts
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear All
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Submission Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Submission Type
                  </label>
                  <select
                    value={filters.submissionType}
                    onChange={(e) =>
                      handleFilterChange("submissionType", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">All Types</option>
                    {submissionTypeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Topic Area Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic Area
                  </label>
                  <select
                    value={filters.topicArea}
                    onChange={(e) =>
                      handleFilterChange("topicArea", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">All Topics</option>
                    {topicAreaOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Priority Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    value={filters.priority}
                    onChange={(e) =>
                      handleFilterChange("priority", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">All Priorities</option>
                    {priorityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Posts Grid */}
        <div className="w-full">
          {filteredAndSortedPosts.length > 0 ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-h-[70vh] overflow-y-auto pr-2"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#ef4444 #f1f5f9",
              }}
            >
              {filteredAndSortedPosts.map((post: Post) => (
                <div
                  key={post.id}
                  className={`p-4 sm:p-5 rounded-lg border ${cardClasses} h-fit`}
                >
                  {/* Tags Container */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                        post.submissionType
                      )}`}
                    >
                      {post.submissionType}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        post.priority
                      )}`}
                    >
                      {post.priority}
                    </span>
                  </div>

                  {/* Topic Area */}
                  <div className="mb-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                      {post.topicArea}
                    </span>
                  </div>

                  {/* Content */}
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 line-clamp-4">
                    {post.content}
                  </p>

                  {/* Timestamp */}
                  <div className="text-xs text-gray-500 border-t border-gray-100 pt-2">
                    {formatDate(post.createdAt)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-12 sm:py-16 md:py-20">
              <MessageSquare className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                {hasActiveFilters
                  ? "No posts match your filters"
                  : "No posts yet"}
              </h3>
              <p className="text-gray-500 text-sm sm:text-base mb-4">
                {hasActiveFilters
                  ? "Try adjusting your filter settings to see more posts."
                  : "Be the first to share your voice with the community!"}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-red-800 hover:text-red-900 font-medium underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Back to Top Button */}
        {filteredAndSortedPosts.length > 6 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-red-800 hover:text-red-900 text-sm sm:text-base font-medium underline decoration-dotted underline-offset-4 hover:decoration-solid transition-all"
            >
              Back to Top
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
