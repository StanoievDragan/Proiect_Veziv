import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

function WorkForm() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [clientUrl, setClientUrl] = useState("");
  const [status, setStatus] = useState("hidden");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/works/${id}`)
        .then((response) => {
          const work = response.data;
          setTitle(work.title);
          setDescription(work.description);
          setExistingImage(work.image);
          setClientUrl(work.clientLink);
          setStatus(work.status);
        })
        .catch((error) => console.error("Error fetching work:", error));
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("clientLink", clientUrl);
    formData.append("status", status);

    if (image) {
      formData.append("image", image);
    }

    try {
      if (id) {
        await axios.put(`http://localhost:3000/works/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post("http://localhost:3000/works", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving work:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6"
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
          Description:
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          rows="4"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image:
        </label>
        {existingImage && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Current Image:</p>
            <img
              src={`http://localhost:3000/uploads/${existingImage}`}
              alt="Current Work"
              className="w-full h-48 object-scale-down mb-3 rounded-lg"
            />
          </div>
        )}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Client URL:
        </label>
        <input
          type="text"
          value={clientUrl}
          onChange={(e) => setClientUrl(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
      <button
        type="submit"
        className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors"
      >
        Save
      </button>
      <div className="mt-4 flex justify-end space-x-4">
        <Link
          to="/"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

export default WorkForm;
