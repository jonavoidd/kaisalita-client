import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type SubmitForm from "../types/submit-form";
import type { Priority, SubmissionType, TopicArea } from "../types/input-type";
import { createPost } from "../api/posts";

export default function FormPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<SubmitForm>({
    submissionType: "",
    topicArea: "",
    content: "",
    priority: "",
    publish: false,
  });

  const handleInputChange = (
    field: keyof SubmitForm,
    value: string | boolean
  ): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (): void => {
    if (
      !formData.submissionType ||
      !formData.topicArea ||
      !formData.content ||
      !formData.priority ||
      typeof formData.publish !== "boolean"
    ) {
      toast("Please fill in all required fields.", {
        type: "error",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      try {
        createPost(formData);

        toast("Your feedback has been submitted successfully!", {
          type: "success",
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });

        // Reset form after successful submission
        setFormData({
          submissionType: "",
          topicArea: "",
          content: "",
          priority: "",
          publish: false,
        });
      } catch (err) {
        console.error("an error has occured:", err);
        toast(
          "An error occurred while submitting your feedback. Please try again.",
          {
            type: "error",
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
          }
        );
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const inputClasses: string =
    "bg-white border-gray-300 text-gray-900 placeholder-gray-500";

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

  const cardClasses: string =
    "bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow";

  // Check if form is valid for submission
  const isFormValid =
    formData.submissionType &&
    formData.topicArea &&
    formData.content &&
    formData.priority &&
    typeof formData.publish === "boolean";

  return (
    <section className="w-full min-h-screen bg-gray-50">
      {/* Mobile-first responsive container */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <header className="flex justify-center items-center mb-6 sm:mb-8 md:mb-10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity hover:cursor-pointer p-2 rounded-lg hover:bg-gray-50"
            >
              <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-800" />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-800">
                kAISAlita
              </h1>
            </button>
          </div>
        </header>

        {/* Form Container - Responsive width and centering */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto">
          <div
            className={`p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 rounded-lg border ${cardClasses}`}
          >
            {/* Form Title - Responsive text sizing and spacing */}
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 text-red-800 text-center">
              Share Your Voice
            </h2>

            {/* Form Fields Container - Responsive spacing */}
            <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
              {/* Submission Type */}
              <div>
                <label className="block text-xs sm:text-sm md:text-base font-medium mb-1.5 sm:mb-2 text-gray-700">
                  Submission Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.submissionType}
                  onChange={(e) =>
                    handleInputChange("submissionType", e.target.value)
                  }
                  className={`w-full p-2 sm:p-2.5 md:p-3 lg:p-3.5 rounded-lg border ${inputClasses} focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-xs sm:text-sm md:text-base transition-all`}
                  required
                >
                  <option value="">Select submission type...</option>
                  {submissionTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Topic Area */}
              <div>
                <label className="block text-xs sm:text-sm md:text-base font-medium mb-1.5 sm:mb-2 text-gray-700">
                  Topic Area <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.topicArea}
                  onChange={(e) =>
                    handleInputChange("topicArea", e.target.value)
                  }
                  className={`w-full p-2 sm:p-2.5 md:p-3 lg:p-3.5 rounded-lg border ${inputClasses} focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-xs sm:text-sm md:text-base transition-all`}
                  required
                >
                  <option value="">Select topic area...</option>
                  {topicAreaOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Content */}
              <div>
                <label className="block text-xs sm:text-sm md:text-base font-medium mb-1.5 sm:mb-2 text-gray-700">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  rows={4}
                  className={`w-full p-2 sm:p-2.5 md:p-3 lg:p-3.5 rounded-lg border ${inputClasses} focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 resize-none text-xs sm:text-sm md:text-base leading-relaxed transition-all min-h-[80px] sm:min-h-[100px] md:min-h-[120px]`}
                  placeholder="Share your thoughts, concerns, or ideas..."
                  maxLength={500}
                  required
                />
                <div className="mt-1 text-xs text-gray-500 text-right">
                  {formData.content.length}/500 characters
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-xs sm:text-sm md:text-base font-medium mb-1.5 sm:mb-2 text-gray-700">
                  Priority Level <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    handleInputChange("priority", e.target.value)
                  }
                  className={`w-full p-2 sm:p-2.5 md:p-3 lg:p-3.5 rounded-lg border ${inputClasses} focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-xs sm:text-sm md:text-base transition-all`}
                  required
                >
                  <option value="">Select priority level...</option>
                  {priorityOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Publish Option */}
              <div>
                <label className="block text-xs sm:text-sm md:text-base font-medium mb-1.5 sm:mb-2 text-gray-700">
                  Do you wish to post this message on the board?{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="publish"
                      id="yes"
                      checked={formData.publish === true}
                      onChange={() => handleInputChange("publish", true)}
                      className="text-red-800 focus:ring-red-500"
                    />
                    <label htmlFor="yes" className="ml-2 text-sm">
                      Yes
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="publish"
                      id="no"
                      checked={formData.publish === false}
                      onChange={() => handleInputChange("publish", false)}
                      className="text-red-800 focus:ring-red-500"
                    />
                    <label htmlFor="no" className="ml-2 text-sm">
                      No
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button - Responsive sizing */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !isFormValid}
                className={`w-full py-2.5 sm:py-3 md:py-3.5 lg:py-4 px-4 sm:px-5 md:px-6 lg:px-8 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base lg:text-lg mt-4 sm:mt-5 md:mt-6 lg:mt-7 xl:mt-8 ${
                  loading || !isFormValid
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-red-800 hover:bg-red-900 text-white hover:shadow-lg active:transform active:scale-95 cursor-pointer"
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    Submit Anonymously
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Form Guidelines - Responsive text and spacing */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto mt-3 sm:mt-4 md:mt-6 lg:mt-8">
          <div className="text-center text-xs sm:text-sm md:text-base text-gray-500 space-y-1 sm:space-y-1.5 md:space-y-2 px-2 sm:px-4">
            <p className="flex items-center justify-center gap-1 sm:gap-2">
              <span>📝</span>
              <span>Your submission will be posted anonymously</span>
            </p>
            <p className="flex items-center justify-center gap-1 sm:gap-2">
              <span>👥</span>
              <span>All posts are visible to the community</span>
            </p>
            <p className="flex items-center justify-center gap-1 sm:gap-2">
              <span>✨</span>
              <span>Help us build a better learning environment together</span>
            </p>
          </div>
        </div>

        {/* Optional: Mobile hint */}
        <div className="block sm:hidden w-full text-center mt-4 px-4">
          <p className="text-xs text-gray-400 italic">
            Tip: Rotate your device for a better typing experience
          </p>
        </div>
      </div>
    </section>
  );
}
