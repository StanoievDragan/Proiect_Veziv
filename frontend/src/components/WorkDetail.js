import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function WorkDetail() {
  const { id } = useParams();
  const [work, setWork] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/works/${id}`)
      .then((response) => setWork(response.data))
      .catch((error) => console.error("Error fetching work:", error));
  }, [id]);

  if (!work) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">{work.title}</h2>
        <img
          src={`http://localhost:3000/uploads/${work.image}`}
          alt={work.title}
          className="w-full h-48 object-scale-down mb-3 rounded-lg"
        />

        <p className="text-gray-700 mb-4">{work.description}</p>
        <p className="mb-4">
          <a
            href={work.clientLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Client Link:{" "}
            <span className="text-blue-700">{work.clientLink}</span>
          </a>
        </p>
        <div className="mt-4">
          <Link
            to={work.status === "visible" ? "/" : "/hidden-works"}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WorkDetail;
