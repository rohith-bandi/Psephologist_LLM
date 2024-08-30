import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./Home";
import Contactus from "./contactus";
import Chatbot from "./chatbot";
import Party from "./parties";
import Dataanalysis from "./dataanalysis";
import Prediction from "./prediction";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/parties" element={<Party />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/dataanalysis" element={<Dataanalysis />} />
          <Route path="/prediction" element={<Prediction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
