import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

const PublicDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPost, setExpandedPost] = useState(null); // Track expanded posts

  // Fetch posts when the component mounts
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/announcements/')
      .then((response) => {
        console.log(response.data);
        setPosts(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch posts');
        setLoading(false);
      });
  }, []);

  // Function to limit text to a specific number of characters
  const limitText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  };

  // Handle the click to toggle post visibility
  const handleReadMore = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId); // Toggle the expanded state
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col p-6">
      <h2 className="text-3xl font-semibold mb-6 ml-[35%]">Announcements</h2>
      
      {/* Card display of posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="border rounded-lg p-4 shadow-md hover:shadow-lg">
              {/* Image */}
              {post.image && (
                <img
                  src={`http://127.0.0.1:8000${post.image}`} // Concatenate with the API base URL
                  alt={post.title}
                  className="w-full h-56 object-cover rounded-md"
                />
              )}
              {/* Title */}
              <h3 className="text-xl font-semibold mt-4">{post.title}</h3>
              {/* Content with limited text or full text depending on the expanded state */}
              <p className="text-gray-600 mt-2">
                {expandedPost === post.id
                  ? post.content
                  : limitText(post.content, 100)}{' '}
                <a
                  href="#"
                  onClick={() => handleReadMore(post.id)}
                  className="text-blue-500 font-semibold"
                >
                  {expandedPost === post.id ? 'Read less' : 'Read more'}
                </a>
              </p>
              {/* Post date */}
              <p className="text-gray-400 text-sm mt-2">
                Posted on: {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default PublicDashboard;
