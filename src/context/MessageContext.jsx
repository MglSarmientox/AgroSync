import { createContext, useContext, useState, useCallback } from 'react';

const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState(null);
  
  // Initialize with some mock conversations
  const [conversations, setConversations] = useState([
    {
      companyId: 1, // AgroVerde SAS
      messages: [
        { id: 1, sender: 'company', text: '¡Hola! Gracias por interesarte en nuestros productos. ¿En qué podemos ayudarte?', time: '10:00 AM' },
      ],
      unread: 1,
    },
    {
      companyId: 3, // CafeSur Colombia
      messages: [
        { id: 1, sender: 'me', text: 'Buenos días, estoy buscando café especial en grano.', time: 'Ayer' },
        { id: 2, sender: 'company', text: 'Claro que sí, tenemos excelentes variedades. ¿Qué cantidad buscas?', time: 'Ayer' },
      ],
      unread: 0,
    }
  ]);

  const toggleChat = useCallback(() => setChatOpen(prev => !prev), []);
  const closeChat = useCallback(() => setChatOpen(false), []);
  const openChat = useCallback(() => setChatOpen(true), []);

  const startConversation = useCallback((companyId) => {
    // Check if conversation exists
    setConversations(prev => {
      if (prev.find(c => c.companyId === companyId)) return prev;
      return [{ companyId, messages: [], unread: 0 }, ...prev];
    });
    setActiveChatId(companyId);
    setChatOpen(true);
  }, []);

  const sendMessage = useCallback((companyId, text) => {
    if (!text.trim()) return;
    setConversations(prev => prev.map(conv => {
      if (conv.companyId === companyId) {
        return {
          ...conv,
          messages: [...conv.messages, { id: Date.now(), sender: 'me', text, time: 'Justo ahora' }]
        };
      }
      return conv;
    }));
  }, []);

  const markAsRead = useCallback((companyId) => {
    setConversations(prev => {
      const conv = prev.find(c => c.companyId === companyId);
      if (!conv || conv.unread === 0) return prev;
      return prev.map(c =>
        c.companyId === companyId ? { ...c, unread: 0 } : c
      );
    });
  }, []);

  const unreadMessagesCount = conversations.reduce((acc, conv) => acc + conv.unread, 0);

  return (
    <MessageContext.Provider value={{
      chatOpen, toggleChat, closeChat, openChat,
      activeChatId, setActiveChatId,
      conversations, startConversation, sendMessage, markAsRead,
      unreadMessagesCount
    }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  return useContext(MessageContext);
}
