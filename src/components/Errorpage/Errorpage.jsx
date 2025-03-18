import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Errorpage() {
    const navigate = useNavigate();
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold text-red-600">Oops! Something went wrong.</h1>
          <p className="text-lg text-gray-700 mt-2">We couldn't find the page you're looking for.</p>
          <button 
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => navigate("/login")}
          >
            Go To Login
          </button>
        </div>
      )
}
