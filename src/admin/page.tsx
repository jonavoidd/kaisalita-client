import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import {
  BarChart3,
  FileText,
  Eye,
  EyeOff,
  TrendingUp,
  MessageSquare,
} from "lucide-react";
import { getAllPost } from "../api/posts";
import type { Priority, SubmissionType, TopicArea } from "../types/input-type";
import type Post from "../types/post";
import { StatCard } from "../components/admin/StatCard";
import { DistributionCard } from "../components/admin/DistributionCard";

const AdminDashboard: React.FC = () => {
  const { setActiveRoute } = useOutletContext<{
    setActiveRoute: (route: string) => void;
  }>();

  // Set the active route when component mounts
  React.useEffect(() => {
    setActiveRoute("dashboard");
  }, [setActiveRoute]);

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<Post[]>({
    queryKey: ["admin-posts"],
    queryFn: getAllPost,
  });

  // Calculate statistics
  const stats = React.useMemo(() => {
    if (!posts) return null;

    const totalPosts = posts.length;
    const publishedPosts = posts.filter((post) => post.publish).length;
    const unpublishedPosts = posts.filter((post) => !post.publish).length;

    // Distribution by submission type
    const submissionTypeDistribution = posts.reduce((acc, post) => {
      acc[post.submissionType] = (acc[post.submissionType] || 0) + 1;
      return acc;
    }, {} as Record<SubmissionType, number>);

    // Distribution by topic area
    const topicAreaDistribution = posts.reduce((acc, post) => {
      acc[post.topicArea] = (acc[post.topicArea] || 0) + 1;
      return acc;
    }, {} as Record<TopicArea, number>);

    // Distribution by priority
    const priorityDistribution = posts.reduce((acc, post) => {
      acc[post.priority] = (acc[post.priority] || 0) + 1;
      return acc;
    }, {} as Record<Priority, number>);

    return {
      totalPosts,
      publishedPosts,
      unpublishedPosts,
      submissionTypeDistribution,
      topicAreaDistribution,
      priorityDistribution,
    };
  }, [posts]);

  const getTypeColor = (type: SubmissionType): string => {
    switch (type) {
      case "Concern":
        return "bg-orange-500";
      case "Suggestion":
        return "bg-green-500";
      case "Idea":
        return "bg-purple-500";
      case "Praise":
        return "bg-pink-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTopicColor = (topic: TopicArea): string => {
    const colors = [
      "bg-blue-500",
      "bg-indigo-500",
      "bg-cyan-500",
      "bg-teal-500",
      "bg-emerald-500",
      "bg-yellow-500",
    ];
    const index = Object.keys(stats?.topicAreaDistribution || {}).indexOf(
      topic
    );
    return colors[index % colors.length];
  };

  const getPriorityColor = (priority: Priority): string => {
    switch (priority) {
      case "Urgent":
        return "bg-red-500";
      case "Needs follow-up":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 text-red-800 mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg text-red-600">Error loading dashboard data</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <StatCard
          title="Total Posts"
          value={stats?.totalPosts || 0}
          icon={FileText}
          color="bg-blue-500"
        />
        <StatCard
          title="Published Posts"
          value={stats?.publishedPosts || 0}
          icon={Eye}
          color="bg-green-500"
        />
        <StatCard
          title="Unpublished Posts"
          value={stats?.unpublishedPosts || 0}
          icon={EyeOff}
          color="bg-orange-500"
        />
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <DistributionCard
          title="Submission Types"
          data={stats?.submissionTypeDistribution || {}}
          getColor={getTypeColor}
        />
        <DistributionCard
          title="Topic Areas"
          data={stats?.topicAreaDistribution || {}}
          getColor={getTopicColor}
        />
        <DistributionCard
          title="Priority Levels"
          data={stats?.priorityDistribution || {}}
          getColor={getPriorityColor}
        />
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Recent Activity
          </h3>
        </div>
        <div className="p-4 sm:p-6">
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p>Recent activity will appear here</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
