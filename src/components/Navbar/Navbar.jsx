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
  
  const [menuOpen, setMenuOpen] = useState(false);  //  State for  menu

  function Logout() {
    Setusertoken(null);
    localStorage.removeItem("usertoken");
    localStorage.removeItem("User_ID");
    localStorage.removeItem("email");
    navigate("/Login");
    setMenuOpen(false);  // Close menu on logout
  }

  //  Function to close the menu when a link is clicked
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 p-4 fixed left-0 top-0 right-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-3" onClick={handleLinkClick}>
          <img src={logo} className="h-10 rounded-4xl border-5 border-red-700" alt="Logo" />
          <span className="self-center text-2xl font-semibold dark:text-white">R D E R</span>
        </NavLink>


        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 text-gray-500 rounded-lg md:hidden"
          onClick={() => setMenuOpen(!menuOpen)} //  Toggle menu on click
        >
          <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>


        <div className={`${menuOpen ? "block" : "hidden"} w-full md:block md:w-auto`}>
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:bg-white">
            {usertoken === null ? (
              <>
                <li>
                  <NavLink to="/Login" className="block py-2 px-3 text-gray-100 md:hover:text-blue-500" onClick={handleLinkClick}>Login</NavLink>
                </li>
                <li>
                  <NavLink to="/Register" className="block py-2 px-3 text-gray-100 md:hover:text-blue-500" onClick={handleLinkClick}>Register</NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/" className="block py-2 px-3 text-gray-100 md:hover:text-blue-500" onClick={handleLinkClick}>Home</NavLink>
                </li>
                <li>
                  <NavLink to="/allorders" className="block py-2 px-3 text-gray-100 md:hover:text-blue-500" onClick={handleLinkClick}>Orders</NavLink>
                </li>
                <li>
                  <NavLink to="/Cart" className="block py-2 px-3 text-gray-100 md:hover:text-blue-500" onClick={handleLinkClick}>
                    Cart <i className="fa-solid fa-cart-shopping relative">
                      <span className="absolute left-4 bottom-1.5 text-xs bg-rose-800 hover:text-white rounded-2xl p-0.5">{cart?.numOfCartItems}</span>
                    </i>
                  </NavLink>
                </li>
                <li>
                  <span onClick={Logout} className="block py-2 px-3 text-gray-100 md:hover:text-blue-500 cursor-pointer">Logout</span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
