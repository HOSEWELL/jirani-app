import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/apiService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [isUrl, setIsUrl] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/api/announcements/${id}`)
        .then((response) => {
          const postData = response.data.data;
          setTitle(postData.title);
          setContent(postData.content);
          setImage(postData.image);
        })
        .catch((error) => {
          console.error('Error fetching the post:', error);
          toast.error('Failed to load post data');
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = image;

    if (!isUrl && image) {
      const formData = new FormData();
      formData.append('file', image);

      try {
        const response = await axios.post('/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        imageUrl = response.data.imageUrl;
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image');
        return;
      }
    }

    const updatedPost = { title, content, image: imageUrl };

    try {
      if (id) {
        await axios.put(`http://127.0.0.1:8000/api/announcements/${id}`, updatedPost);
        toast.success('Post updated successfully!');
      } else {
        await axios.post('/announcements', updatedPost);
        toast.success('Post created successfully!');
      }
      navigate('/posts');
    } catch (error) {
      console.error('Error submitting post:', error);
      toast.error('Failed to submit the post. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full mx-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {id ? 'Edit Post' : 'Create New Post'}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jiraniAccent"
              placeholder="Enter post title"
              required
            />
          </div>

          {/* Image Selection */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Image</label>
            <div className="flex items-center mb-2">
              <label className="mr-6 cursor-pointer">
                <input
                  type="radio"
                  name="imageOption"
                  checked={isUrl}
                  onChange={() => setIsUrl(true)}
                />
                &nbsp; Paste Image URL
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="imageOption"
                  checked={!isUrl}
                  onChange={() => setIsUrl(false)}
                />
                &nbsp; Upload Image
              </label>
            </div>

            {isUrl ? (
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jiraniAccent"
                placeholder="Enter image URL"
                required={!isUrl}
              />
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jiraniAccent"
                required={!isUrl}
              />
            )}
          </div>

          {/* Content Textarea */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jiraniAccent"
              rows="5"
              placeholder="Write your post content here..."
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-jiraniAccent hover:bg-jiraniSecondary text-white font-semibold py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            {id ? 'Update Post' : 'Submit Post'}
          </button>
        </form>

        {/* Toast Container */}
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop />
      </div>
    </div>
  );
};

export default PostForm;
