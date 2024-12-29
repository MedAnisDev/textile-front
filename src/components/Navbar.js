import React from "react";
import Login from "./login/login.js";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-navbar h[50px] -1500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-gray-800 text-xl font-bold ">
          <h1>Clothing Store</h1>
        </a>
        <ul className="flex space-x-6">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-bold py-2 px-4"
                : "text-xl font-bold py-2 px-4 transition duration-300 ease-in-out hover:text-blue-500"
            }
          >
            Admin Dashboard
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
