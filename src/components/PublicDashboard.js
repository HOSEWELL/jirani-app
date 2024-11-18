import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PublicDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPost, setExpandedPost] = useState(null);
  const [showModal, setShowModal] = useState(false); // For toggling modal visibility
  const [name, setName] = useState('');
  const [issue, setIssue] = useState('');

  // Fetch posts when the component mounts
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/announcements/')
      .then((response) => {
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
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  // Handle the click to toggle post visibility
  const handleReadMore = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  // Handle the form submission
  const handleSubmitIssue = (e) => {
    e.preventDefault();
    console.log('Name:', name);
    console.log('Issue:', issue);
    // You can submit the issue to an API or perform other actions here

    // Close the modal after submission
    setShowModal(false);
    setName('');
    setIssue('');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
                  src={`http://127.0.0.1:8000${post.image}`}
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

      {/* Floating Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
      >
        Raise an Issue
      </button>

      {/* Modal for submitting an issue */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            {/* Close Button for Modal (Only here inside the Modal) */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-black font-bold text-lg"
            >
              X
            </button>

            <h2 className="text-2xl font-semibold mb-4">Report an Issue</h2>
            <form onSubmit={handleSubmitIssue}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded-md mt-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="issue" className="block text-gray-700">Issue</label>
                <textarea
                  id="issue"
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  className="w-full p-2 border rounded-md mt-2"
                  rows="4"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicDashboard;
