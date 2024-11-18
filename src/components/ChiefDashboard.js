import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Posts from './Posts';
import Users from './Users';
import PostForm from './PostForm'; 

const ChiefDashboard = () => {
  const location = useLocation();

  return (
    <div className="flex">
      <Sidebar userType="chief" />
      <div className="flex-grow p-6">
        {/* Route Management */}
        <Routes>
          {/* Redirect to /posts by default */}
          <Route path="/" element={<Navigate to="/chief/posts" />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add-post" element={<PostForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default ChiefDashboard;
