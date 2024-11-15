import React from 'react';
import { useNavigate } from 'react-router-dom';

const FloatingButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/add-post'); // Navigate to the PostForm page
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-jiraniAccent text-white p-4 rounded-full shadow-lg hover:bg-jiraniSecondary"
    >
      +
    </button>
  );
};

export default FloatingButton;
