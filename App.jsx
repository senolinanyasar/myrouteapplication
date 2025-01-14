import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainApp from "./MainApp";
import AdminApp from "./AdminApp";

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/*" element={<MainApp />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </Router>
  );
}

export default App;
