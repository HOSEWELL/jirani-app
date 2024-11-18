// Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ userType }) => {
  const location = useLocation();

  // Function to check if the current link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-gray-800 text-white w-60 h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <ul>
        <li className={`mb-4 ${isActive('/chief/posts') ? 'bg-blue-600' : ''}`}>
          <Link to="/chief/posts" className="block p-2 hover:bg-blue-500">Posts</Link>
        </li>
        <li className={`mb-4 ${isActive('/chief/add-post') ? 'bg-blue-600' : ''}`}>
          <Link to="/chief/add-post" className="block p-2 hover:bg-blue-500">Add Post</Link>
        </li>
        <li className={`mb-4 ${isActive('/chief/users') ? 'bg-blue-600' : ''}`}>
          <Link to="/chief/users" className="block p-2 hover:bg-blue-500">Users</Link>
        </li>
       
        <li className={`mb-4 ${isActive('/chief/issues') ? 'bg-blue-600' : ''}`}>
          <Link to="/chief/issues" className="block p-2 hover:bg-blue-500">Issues</Link>
        </li>
        {/* Add more sidebar links here as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
