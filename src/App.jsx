import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import DirectoryPage from './pages/DirectoryPage';
import StorePage from './pages/StorePage';

import FollowingPage from './pages/FollowingPage';
import ChatWidget from './components/ui/ChatWidget';

export default function App() {
  return (
    <BrowserRouter>
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
        <Footer />
        <ChatWidget />
      </div>
    </BrowserRouter>
  );
}
