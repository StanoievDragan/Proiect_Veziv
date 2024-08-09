import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";
import EditWorkPage from "./pages/EditWorkPage";
import HiddenWorksPage from "./pages/HiddenWorksPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/work/:id" element={<WorkPage />} />
          <Route path="/edit-work/:id?" element={<EditWorkPage />} />
          <Route path="/hidden-works" element={<HiddenWorksPage />} />{" "}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
