import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import DirectoryPage from './pages/DirectoryPage';
import StorePage from './pages/StorePage';

import FollowingPage from './pages/FollowingPage';
import ChatWidget from './components/ui/ChatWidget';
import AuthModal from './components/auth/AuthModal';
import WelcomeSplash from './components/auth/WelcomeSplash';

function App() {
  const navigate = useNavigate();
  const [welcome, setWelcome] = useState(null);

  const handleAuthenticated = (u, isNew) => {
    if (isNew) {
      setWelcome({ user: u, isNew });
    } else {
      navigate('/mi-local');
    }
  };

  const handleWelcomeContinue = () => {
    setWelcome(null);
    navigate('/mi-local');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/directorio" element={<DirectoryPage />} />
          <Route path="/siguiendo" element={<FollowingPage />} />
          <Route path="/mi-local" element={<StorePage />} />
          <Route path="/empresa/:slug" element={<StorePage />} />
        </Routes>
      </div>
      <ChatWidget />
      <AuthModal onAuthenticated={handleAuthenticated} />
      {welcome && (
        <WelcomeSplash user={welcome.user} onContinue={handleWelcomeContinue} />
      )}
    </div>
  );
}

export default App;