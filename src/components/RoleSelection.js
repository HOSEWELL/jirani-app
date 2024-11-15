// src/components/RoleSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
      <h2 className="text-5xl font-extrabold mb-10 drop-shadow-lg text-center">
        Welcome to Jirani Application!
      </h2>
      <p className="text-lg mb-14 drop-shadow-md text-center">
        Choose your role to get started.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Chief Button */}
        <button
          onClick={() => navigate('/chief')}
          className="w-64 px-10 py-5 bg-green-600 hover:bg-green-700 rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg focus:outline-none"
        >
          Chief
        </button>

        {/* Public Button */}
        <button
          onClick={() => navigate('/public')}
          className="w-64 px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg focus:outline-none"
        >
          Public
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
