import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white shadow-sm dark:bg-gray-800 p-6 mt-4">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row md:justify-between items-center">
        
        {/* Brand & Copyright */}
        <span className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
          © 2023{" "}
          <NavLink to="/" className="hover:underline font-semibold">
            ORDER™
          </NavLink>
          . All Rights Reserved.
        </span>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center md:justify-end mt-4 md:mt-0 text-sm font-medium text-gray-500 dark:text-gray-400 gap-6">
          <li>
            <NavLink to="/about" className="hover:underline">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/privacy" className="hover:underline">
              Privacy Policy
            </NavLink>
          </li>
          <li>
            <NavLink to="/licensing" className="hover:underline">
              Licensing
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="hover:underline">
              Contact
            </NavLink>
          </li>
        </ul>

      </div>
    </footer>
  );
}
