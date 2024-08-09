import React, { useState, useEffect } from "react";
import CreateWorkForm from "../components/CreateWorkForm";
import WorkList from "../components/WorkList";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/works")
      .then((response) => setWorks(response.data))
      .catch((error) => {
        console.error("Error fetching works:", error);
      });
  }, []);

  const handleAddWork = (newWork) => {
    setWorks((prevWorks) => [...prevWorks, newWork]);
  };

  const handleDeleteWork = (id) => {
    setWorks((prevWorks) => prevWorks.filter((work) => work.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">Portfolio</h1>
        <p className="text-center text-black mb-6 font-bold">
          Welcome to the portfolio page where you can manage your works.
        </p>
      </header>
      <div className="mb-12">
        <CreateWorkForm onAddWork={handleAddWork} />
      </div>
      <WorkList works={works} onDelete={handleDeleteWork} />
      <div className="text-center">
        <Link
          to="/hidden-works"
          className="inline-block py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
        >
          View Hidden Works
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
