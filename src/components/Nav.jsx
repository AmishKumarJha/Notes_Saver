import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="bg-gradient-to-r from-slate-900 to-gray-800 px-5 py-3 flex items-center justify-between shadow-md rounded-b-xl">
      {/* App Name */}
      <div className="flex items-center gap-2">
        
        <h1 className="text-white text-lg  justify-center font-semibold ">PasteApp</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-4 ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-lg px-4 py-2 rounded-md transition font-medium ${
              isActive
                ? " text-white"
                : "text-gray-300    hover:text-white"
            }`
          }
        >
           Home
        </NavLink>

        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            `text-lg px-4 py-2 rounded-md transition duration-300 font-medium ${
              isActive
                ? " text-white"
                : "text-gray-300 hover: hover:text-white"
            }`
          }
        >
           Pastes
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
