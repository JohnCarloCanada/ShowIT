import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const SubmitModalCard = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    projectTitle: "",
    techStack: [],
    projectURL: "",
    briefDescription: "",
  });

  const techStackOptions = ["React", "Firebase", "Python", "JavaScript", "TypeScript", "Node.js", "Vue", "Angular"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTechStack = (tech) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.includes(tech) ? prev.techStack.filter((t) => t !== tech) : [...prev.techStack, tech],
    }));
  };

  const handleCancel = () => {
    setFormData({
      projectTitle: "",
      techStack: [],
      projectURL: "",
      briefDescription: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {/* Modal Container */}
      <div
        className="bg-[#2a2a2c] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
          aria-label="Close submit project modal"
        >
          <IoCloseSharp size={24} />
        </button>

        {/* Modal Content */}
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 id="modal-title" className="text-3xl font-bold text-white font-inter mb-2">
              Submit Your Project
            </h1>
            <p className="text-gray-400 font-inter">Fill out the details to share your work.</p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {/* Project Title */}
            <div>
              <label htmlFor="project-title" className="block text-sm font-medium text-gray-300 mb-2 font-inter">
                Project Title
              </label>
              <input
                id="project-title"
                name="projectTitle"
                type="text"
                value={formData.projectTitle}
                onChange={handleInputChange}
                placeholder="e.g., Aero Dashboard Pro"
                className="w-full bg-[#323943] border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-500 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 hover:border-gray-500"
                aria-describedby="project-title-hint"
              />
              <p id="project-title-hint" className="hidden">
                Enter a descriptive title for your project
              </p>
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3 font-inter">Tech Stack</label>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Technology stack selection">
                {techStackOptions.map((tech) => {
                  return (
                    <button
                      key={tech}
                      onClick={() => handleTechStack(tech)}
                      type="button"
                      className={`px-3 py-2 rounded-lg font-inter text-sm font-medium transition-all duration-200 ${
                        formData.techStack.includes(tech)
                          ? "bg-blue-600 text-white ring-2 ring-blue-400"
                          : "bg-[#323943] text-gray-300 hover:bg-[#3a4451] hover:text-white"
                      }`}
                      aria-pressed={`${formData.techStack.includes(tech)}`}
                      aria-label={`${tech}${formData.techStack.includes(tech) ? ", Selected" : ""}`}
                    >
                      {tech}
                      <span className="ml-1" aria-hidden={true}>
                        {formData.techStack.includes(tech) ? "X" : ""}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Project URL */}
            <div>
              <label htmlFor="project-url" className="block text-sm font-medium text-gray-300 mb-2 font-inter">
                Project URL
              </label>
              <input
                id="project-url"
                name="projectURL"
                type="url"
                value={formData.projectURL}
                onChange={handleInputChange}
                placeholder="https://yourproject.com"
                className="w-full bg-[#323943] border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-500 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 hover:border-gray-500"
                aria-describedby="project-url-hint"
              />
              <p id="project-url-hint" className="hidden">
                Enter the live URL of your project
              </p>
            </div>

            {/* Brief Description */}
            <div>
              <label htmlFor="brief-description" className="block text-sm font-medium text-gray-300 mb-2 font-inter">
                Brief Description
              </label>
              <textarea
                id="brief-description"
                name="briefDescription"
                value={formData.briefDescription}
                onChange={handleInputChange}
                placeholder="A short summary of your project..."
                rows="4"
                className="w-full bg-[#323943] border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-500 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 hover:border-gray-500 resize-none"
                aria-describedby="description-hint"
              />
              <p id="description-hint" className="hidden">
                Provide a brief description of what your project does
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 justify-end pt-6 border-t border-gray-700">
              <button
                onClick={handleCancel}
                type="button"
                className="px-6 py-3 rounded-full bg-gray-700 text-white font-medium font-inter hover:bg-gray-600 active:bg-gray-800 transition-colors"
                aria-label="Cancel project submission"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-6 py-3 rounded-full bg-linear-to-r from-purple-600 to-purple-500 text-white font-bold font-inter hover:from-purple-700 hover:to-purple-600 active:from-purple-800 active:to-purple-700 transition-all duration-200 shadow-lg"
                aria-label="Publish project"
              >
                Publish Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitModalCard;
