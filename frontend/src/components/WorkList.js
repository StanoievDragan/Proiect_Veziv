import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const WorkList = ({ works, onDelete }) => {
  const [error, setError] = useState("");

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this work?")) {
      try {
        await axios.delete(`http://localhost:3000/works/${id}`);

        if (onDelete) {
          onDelete(id);
        }
        setError("");
      } catch (error) {
        console.error("Error deleting work:", error);
        setError("Failed to delete work.");
      }
    }
  };

  const visibleWorks = works.filter((work) => work.status !== "hidden");

  return (
    <div className="container mx-auto p-4">
      {error && (
        <p className="text-red-500 mb-4 text-center font-semibold">{error}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleWorks.map((work) => (
          <div
            key={work.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <h2 className="text-lg font-semibold mb-3 text-gray-800 text-center">
              {work.title}
            </h2>
            <img
              src={`http://localhost:3000/uploads/${work.image}`}
              alt={work.title}
              className="w-full h-48 object-scale-down mb-3 rounded-lg"
            />
            <p className="text-gray-600 mb-3 text-center">{work.description}</p>
            <div className="text-center mb-3 w-full">
              <div className="overflow-x-auto">
                <a
                  href={work.clientLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline break-words"
                >
                  Client Link:{" "}
                  <span className="text-blue-700 font-medium">
                    {work.clientLink}
                  </span>
                </a>
              </div>
            </div>
            <div className="flex flex-wrap justify-center space-x-2 mt-auto gap-2">
              <Link to={`/work/${work.id}`}>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors">
                  View
                </button>
              </Link>
              <button
                onClick={() => handleDelete(work.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
              <Link to={`/edit-work/${work.id}`}>
                <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-colors">
                  Edit
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkList;
