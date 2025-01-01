import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './App.css'; // Make sure to import your global CSS (if any)
import Login from "./components/login/login";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <div className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
    </Provider>
  );
}

export default App;
