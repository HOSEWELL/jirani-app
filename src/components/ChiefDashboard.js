import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Posts from './Posts';
import Users from './Users';
import PostForm from './PostForm'; 

const ChiefDashboard = () => {
  return (
    <div className="flex">
      <Sidebar userType="chief" />
      <div className="flex-grow p-6">
        <Routes>
          {/* Add a default route to redirect to /posts */}
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
