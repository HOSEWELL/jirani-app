import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ userType }) => {
  return (
    <div className="bg-jiraniPrimary text-white w-64 h-screen p-5">
      <h2 className="text-7xl font-bold mb-8">Jirani</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/chief/posts" className="block py-2 px-4 rounded hover:bg-jiraniAccent">
            POSTS
          </Link>
        </li>
        {userType === 'chief' && (
          <>
            <li>
              <Link to="/chief/users" className="block py-2 px-4 rounded hover:bg-jiraniAccent">
                USERS
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
