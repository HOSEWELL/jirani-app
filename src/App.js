import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleSelection from './components/RoleSelection';
import ChiefDashboard from './components/ChiefDashboard';
import PublicDashboard from './components/PublicDashboard';
import Teaser from './components/Teaser';
import PostForm from './components/PostForm';

function App() {
  const [teaserEnded, setTeaserEnded] = useState(false);

  const handleTeaserEnd = () => {
    setTeaserEnded(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!teaserEnded ? <Teaser onTeaserEnd={handleTeaserEnd} /> : <RoleSelection />}
        />
        <Route path="/chief/*" element={<ChiefDashboard />} />
        <Route path="/public" element={<PublicDashboard />} />
        <Route path="/add-post" element={<PostForm />} />
      </Routes>
    </Router>
  );
}

export default App;
