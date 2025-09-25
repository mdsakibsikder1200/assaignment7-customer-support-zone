import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-6">
      {/* Left Side Logo */}
      <div className="flex-1 border-r border-dashed border-blue-400 pr-6">
        <a className="font-bold text-lg">CS — <span className="font-semibold">Ticket System</span></a>
      </div>

      {/* Right Side Menu */}
      <div className="flex items-center gap-6">
        <ul className="menu menu-horizontal px-1 text-sm">
          <li><a>Home</a></li>
          <li><a>FAQ</a></li>
          <li><a>Changelog</a></li>
          <li><a>Blog</a></li>
          <li><a>Download</a></li>
          <li><a>Contact</a></li>
        </ul>

        {/* New Ticket Button */}
        <button className="btn btn-sm text-white font-medium bg-gradient-to-r from-purple-500 to-indigo-500 border-none rounded-md">
          + New Ticket
        </button>
      </div>
    </div>
  );
};

export default Navbar;
