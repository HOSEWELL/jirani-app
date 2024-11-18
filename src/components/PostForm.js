import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const AnnouncementForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.warning('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    setLoading(true);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/announcements/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        toast.success('Announcement created successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating announcement:', error);
      toast.error('Failed to create announcement. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 ml-[30%] p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Create New Announcement</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter announcement title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-2">Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter announcement content"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-2">Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white font-bold rounded-lg ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } transition duration-200 ease-in-out`}
        >
          {loading ? 'Creating...' : 'Create Announcement'}
        </button>
      </form>
    </div>
  );
};

export default AnnouncementForm;
