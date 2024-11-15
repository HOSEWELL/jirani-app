import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPost, setExpandedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3; // Fixed to display only 3 posts per page
  const [totalPosts, setTotalPosts] = useState(0);

  const navigate = useNavigate();

  // Function to fetch posts from the API
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    // Calculate the offset for pagination
    const offset = (currentPage - 1) * postsPerPage;

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/announcements/?offset=${offset}&limit=${postsPerPage}`
      );

      // Ensure the data structure matches your backend's response
      setPosts(response.data.data || []);
      setTotalPosts(response.data.total || 0);
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts whenever currentPage changes
  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const limitText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  const handleReadMore = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const handleCreatePost = () => {
    navigate('/add-post');
  };

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6">Posts</h2>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              {post.image && (
                <img
                  src={`http://127.0.0.1:8000${post.image}`}
                  alt={post.title}
                  className="w-full h-48 sm:h-56 object-cover rounded-md"
                />
              )}
              {/* Title */}
              <h3 className="text-lg md:text-xl font-semibold mt-3">{post.title}</h3>
              {/* Content with limited text or full text */}
              <p className="text-gray-600 mt-2">
                {expandedPost === post.id
                  ? post.content
                  : limitText(post.content, 100)}{' '}
                <button
                  onClick={() => handleReadMore(post.id)}
                  className="text-blue-600 font-semibold focus:outline-none"
                >
                  {expandedPost === post.id ? 'Read less' : 'Read more'}
                </button>
              </p>
              {/* Post date */}
              <p className="text-gray-400 text-sm mt-2">
                Posted on: {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts available.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md transition ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md transition ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={handleCreatePost}
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 focus:outline-none"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Posts;
