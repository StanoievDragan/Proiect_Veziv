import React from "react";
import WorkForm from "../components/WorkForm";

function EditWorkPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Edit Work
      </h1>

      <WorkForm />
    </div>
  );
}

export default EditWorkPage;
