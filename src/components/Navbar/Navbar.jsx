import React, { useContext, useState } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { Usercontext } from "../../Context/Usercontext";
import logo from "../../assets/2085.jpg";
import { cartcontext } from "../../Context/Cartcontext";

export default function Navbar() {
  const { usertoken, Setusertoken } = useContext(Usercontext);
  const { cart } = useContext(cartcontext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false); // ✅ State for mobile menu

  function Logout() {
    Setusertoken(null);
    localStorage.removeItem("usertoken");
    localStorage.removeItem("User_ID");
    localStorage.removeItem("email");
    navigate("/Login");
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 p-4 fixed left-0 top-0 right-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-3">
          <img
            src={logo}
            className="h-10 rounded-4xl border-5 border-red-700"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold dark:text-white">
            R D E R
          </span>
        </NavLink>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 text-gray-500 rounded-lg md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Menu Items */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8">
            {usertoken === null ? (
              <>
                <li>
                  <NavLink
                    to="/Login"
                    className={`block py-2 px-3 ${
                      location.pathname === "/Login"
                        ? "text-blue-700"
                        : "text-gray-100 md:hover:text-blue-500"
                    }`}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Register"
                    className={`block py-2 px-3 ${
                      location.pathname === "/Register"
                        ? "text-blue-700"
                        : "text-gray-100 md:hover:text-blue-500"
                    }`}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : null}

            {usertoken !== null ? (
              <>
                <li>
                  <NavLink
                    to="/"
                    className={`block py-2 px-3 ${
                      location.pathname === "/"
                        ? "text-blue-700"
                        : "text-gray-100 md:hover:text-blue-500"
                    }`}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/allorders"
                    className={`block py-2 px-3 ${
                      location.pathname === "/allorders"
                        ? "text-blue-700"
                        : "text-gray-100 md:hover:text-blue-500"
                    }`}
                  >
                    Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Cart"
                    className={`block py-2 px-3 ${
                      location.pathname === "/Cart"
                        ? "text-blue-700"
                        : "text-gray-100 md:hover:text-blue-500"
                    }`}
                  >
                    Cart{" "}
                    <i className="fa-solid fa-cart-shopping relative">
                      <span className="absolute left-4 bottom-1.5 text-xs bg-rose-800 rounded-2xl p-0.5">
                        {cart?.numOfCartItems}
                      </span>
                    </i>
                  </NavLink>
                </li>
                <li>
                  <span
                    onClick={Logout}
                    className="block py-2 px-3 text-gray-100 md:hover:text-blue-500 cursor-pointer"
                  >
                    Logout
                  </span>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
}
