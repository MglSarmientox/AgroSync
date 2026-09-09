import { createContext, useContext, useState, useEffect } from 'react';

const FollowContext = createContext();

export function FollowProvider({ children }) {
  const [followedSlugs, setFollowedSlugs] = useState(() => {
    try {
      const saved = localStorage.getItem('agrosync_followed');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed)
        ? parsed.filter((s) => typeof s === 'string').slice(0, 500)
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('agrosync_followed', JSON.stringify(followedSlugs));
  }, [followedSlugs]);

  const [notifications, setNotifications] = useState([]);

  const toggleFollow = (companyName, slug) => {
    const isUnfollowing = followedSlugs.includes(slug);
    
    setNotifications(prevNotifs => [{
      id: Date.now() + Math.random(), // Evitar IDs duplicados en renders rápidos
      message: isUnfollowing ? `Dejaste de seguir a ${companyName}` : `Ahora sigues a ${companyName}`,
      time: 'Justo ahora',
      read: false
    }, ...prevNotifs]);

    setFollowedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read: true })));
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const isFollowing = (slug) => followedSlugs.includes(slug);

  return (
    <FollowContext.Provider value={{ followedSlugs, toggleFollow, isFollowing, notifications, markAllRead, unreadCount }}>
      {children}
    </FollowContext.Provider>
  );
}

export function useFollow() {
  return useContext(FollowContext);
}
