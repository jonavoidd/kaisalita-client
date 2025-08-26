import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { Eye, EyeOff, Search, ChevronDown, ChevronUp } from "lucide-react";
import type Post from "../../types/post";
import type {
  Priority,
  SubmissionType,
  TopicArea,
} from "../../types/input-type";
import { getAllPost } from "../../api/posts";

const PostsManagement: React.FC = () => {
  const { setActiveRoute } = useOutletContext<{
    setActiveRoute: (route: string) => void;
  }>();

  // Set the active route when component mounts
  React.useEffect(() => {
    setActiveRoute("posts");
  }, [setActiveRoute]);

  const [searchTerm, setSearchTerm] = useState("");
  // const [statusFilter, setStatusFilter] = useState<
  //   "all" | "published" | "unpublished"
  // >("all");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");
  const [typeFilter, setTypeFilter] = useState<SubmissionType | "all">("all");
  const [topicFilter, setTopicFilter] = useState<TopicArea | "all">("all");
  const [sortField, setSortField] = useState<keyof Post>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getAllPost,
  });

  // Filter and sort posts
  const filteredPosts = React.useMemo(() => {
    if (!posts) return [];

    return posts
      .filter((post) => {
        const matchesSearch = post.content
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        // const matchesStatus =
        //   statusFilter === "all" ||
        //   (statusFilter === "published" && post.publish) ||
        //   (statusFilter === "unpublished" && !post.publish);

        const matchesPriority =
          priorityFilter === "all" || post.priority === priorityFilter;
        const matchesType =
          typeFilter === "all" || post.submissionType === typeFilter;
        const matchesTopic =
          topicFilter === "all" || post.topicArea === topicFilter;

        return (
          matchesSearch &&
          // matchesStatus &&
          matchesPriority &&
          matchesType &&
          matchesTopic
        );
      })
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (sortField === "createdAt" || sortField === "updatedAt") {
          // Handle date strings
          const aDate = new Date(aValue as string);
          const bDate = new Date(bValue as string);
          return sortDirection === "asc"
            ? aDate.getTime() - bDate.getTime()
            : bDate.getTime() - aDate.getTime();
        }

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return 0;
      });
  }, [
    posts,
    searchTerm,
    // statusFilter,
    priorityFilter,
    typeFilter,
    topicFilter,
    sortField,
    sortDirection,
  ]);

  const handleSort = (field: keyof Post) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getPriorityBadgeClass = (priority: Priority) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-800";
      case "Needs follow-up":
        return "bg-yellow-100 text-yellow-800";
      case "For awareness only":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeBadgeClass = (type: SubmissionType) => {
    switch (type) {
      case "Concern":
        return "bg-orange-100 text-orange-800";
      case "Suggestion":
        return "bg-green-100 text-green-800";
      case "Idea":
        return "bg-purple-100 text-purple-800";
      case "Praise":
        return "bg-pink-100 text-pink-800";
      case "Other (please specify)":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTopicBadgeClass = (topic: TopicArea) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-indigo-100 text-indigo-800",
      "bg-cyan-100 text-cyan-800",
      "bg-teal-100 text-teal-800",
      "bg-emerald-100 text-emerald-800",
      "bg-amber-100 text-amber-800",
    ];
    const topics: TopicArea[] = [
      "Academics",
      "Organization/Leadership",
      "Events or Activities",
      "Student Well-being",
      "Facilities or Resources",
      "Other (please specify)",
    ];
    const index = topics.indexOf(topic);
    return colors[index % colors.length];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
        <p>Error loading posts: {error?.message || "Unknown error"}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Posts Management</h2>
          <p className="text-gray-600">Manage and review all submissions</p>
        </div>
        <button className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors">
          + New Post
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Status Filter */}
          {/* <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as statusFilter)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select> */}

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as Priority)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">All Priorities</option>
            <option value="Urgent">Urgent</option>
            <option value="Needs follow-up">Needs Follow-up</option>
            <option value="For awareness only">For awareness only</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as SubmissionType)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">All Types</option>
            <option value="Suggestion">Suggestion</option>
            <option value="Concern">Concern</option>
            <option value="Idea">Idea</option>
            <option value="Praise">Praise</option>
            <option value="Other (please specify)">Other</option>
          </select>

          {/* Topic Filter */}
          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value as TopicArea)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">All Topics</option>
            <option value="Academics">Academics</option>
            <option value="Organization/Leadership">
              Organization/Leadership
            </option>
            <option value="Events or Activities">Events or Activities</option>
            <option value="Student Well-being">Student Well-being</option>
            <option value="Facilities or Resources">
              Facilities or Resources
            </option>
            <option value="Other (please specify)">Other</option>
          </select>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("content")}
                >
                  <div className="flex items-center">
                    Content
                    {sortField === "content" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="w-4 h-4 ml-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 ml-1" />
                      ))}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("submissionType")}
                >
                  <div className="flex items-center">
                    Type
                    {sortField === "submissionType" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="w-4 h-4 ml-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 ml-1" />
                      ))}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("topicArea")}
                >
                  <div className="flex items-center">
                    Topic
                    {sortField === "topicArea" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="w-4 h-4 ml-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 ml-1" />
                      ))}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("priority")}
                >
                  <div className="flex items-center">
                    Priority
                    {sortField === "priority" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="w-4 h-4 ml-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 ml-1" />
                      ))}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("publish")}
                >
                  <div className="flex items-center">
                    Status
                    {sortField === "publish" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="w-4 h-4 ml-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 ml-1" />
                      ))}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("createdAt")}
                >
                  <div className="flex items-center">
                    Date
                    {sortField === "createdAt" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="w-4 h-4 ml-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 ml-1" />
                      ))}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs break-words">
                      {post.content}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeBadgeClass(
                        post.submissionType
                      )}`}
                    >
                      {post.submissionType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getTopicBadgeClass(
                        post.topicArea
                      )}`}
                    >
                      {post.topicArea}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadgeClass(
                        post.priority
                      )}`}
                    >
                      {post.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {post.publish ? (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        <Eye className="w-3 h-3 mr-1" />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                        <EyeOff className="w-3 h-3 mr-1" />
                        Unpublished
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No posts found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white px-4 py-3 rounded-lg border border-gray-200 shadow-sm">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{filteredPosts.length}</span> of{" "}
          <span className="font-medium">{posts?.length || 0}</span> posts
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsManagement;
