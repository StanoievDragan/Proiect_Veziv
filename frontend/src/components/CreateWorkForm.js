import React, { useState } from "react";
import axios from "axios";

const CreateWorkForm = ({ onAddWork }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [clientLink, setClientLink] = useState("");
  const [status, setStatus] = useState("hidden");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("clientLink", clientLink);
    formData.append("status", status);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:3000/works",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onAddWork(response.data);

      setTitle("");
      setDescription("");
      setImage(null);
      setClientLink("");
      setStatus("hidden");
      setError("");
    } catch (err) {
      setError("Failed to create work. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Create a new work
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client Link:
          </label>
          <input
            type="text"
            value={clientLink}
            onChange={(e) => setClientLink(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows="3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image:
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status:
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="hidden">Hidden</option>
            <option value="visible">Visible</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors"
          >
            Create Work
          </button>
        </div>
        {error && (
          <div className="md:col-span-2">
            <p className="text-red-500 mt-4">{error}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateWorkForm;
