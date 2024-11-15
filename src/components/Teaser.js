// src/components/Teaser.js
import React, { useEffect } from 'react';

const Teaser = ({ onTeaserEnd }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onTeaserEnd) {
        onTeaserEnd();
      }
    }, 5000); 

    return () => clearTimeout(timer);
  }, [onTeaserEnd]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <h1 className="text-5xl font-bold animate-pulse">Welcome to Jirani!</h1>
    </div>
  );
};

export default Teaser;
