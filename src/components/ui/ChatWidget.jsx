import { useState, useRef, useEffect } from 'react';
import { useMessages } from '../../context/MessageContext';
import { companies } from '../../data/mockData';
import { X, Send, Search, MessageCircle, ArrowLeft } from 'lucide-react';
import VerificationBadge from './VerificationBadge';

export default function ChatWidget() {
  const { 
    chatOpen, closeChat, conversations, 
    activeChatId, setActiveChatId, sendMessage, markAsRead 
  } = useMessages();
  
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (activeChatId) markAsRead(activeChatId);
    // Scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChatId, conversations, markAsRead]);

  if (!chatOpen) return null;

  const activeConv = conversations.find(c => c.companyId === activeChatId);
  const activeCompany = activeConv ? companies.find(c => c.id === activeConv.companyId) : null;

  const handleSend = (e) => {
    e.preventDefault();
    if (inputText.trim() && activeChatId) {
      sendMessage(activeChatId, inputText);
      setInputText('');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] w-[90vw] max-w-[400px] sm:max-w-[800px] h-[600px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col sm:flex-row animate-in slide-in-from-bottom-4 fade-in duration-300">
      
      {/* ── LEFT PANEL: INBOX ── */}
      <div className={`w-full sm:w-1/3 border-r border-stone-100 flex flex-col bg-stone-50 ${activeChatId ? 'hidden sm:flex' : 'flex'}`}>
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-white">
          <h2 className="font-bold text-stone-900 text-lg">Mensajes</h2>
          <button onClick={closeChat} className="sm:hidden p-1.5 rounded-lg text-stone-400 hover:bg-stone-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
            <input 
              type="text" 
              placeholder="Buscar chat..." 
              className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-6 text-center text-stone-400 text-sm">
              No tienes mensajes aún
            </div>
          ) : (
            conversations.map((conv) => {
              const comp = companies.find(c => c.id === conv.companyId);
              if (!comp) return null;
              const lastMsg = conv.messages[conv.messages.length - 1];
              const isActive = activeChatId === comp.id;

              return (
                <div 
                  key={comp.id}
                  onClick={() => setActiveChatId(comp.id)}
                  className={`p-3 mx-2 my-1 rounded-xl cursor-pointer transition-colors flex items-center gap-3 ${
                    isActive ? 'bg-green-100' : 'hover:bg-stone-200/50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center flex-shrink-0 text-xl" style={{ borderColor: comp.logoColor }}>
                    {comp.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h4 className="text-sm font-semibold text-stone-900 truncate">{comp.name}</h4>
                      {lastMsg && <span className="text-[10px] text-stone-400 flex-shrink-0">{lastMsg.time}</span>}
                    </div>
                    {lastMsg && (
                      <p className={`text-xs truncate ${conv.unread > 0 && !isActive ? 'font-bold text-stone-800' : 'text-stone-500'}`}>
                        {lastMsg.sender === 'me' ? 'Tú: ' : ''}{lastMsg.text}
                      </p>
                    )}
                  </div>
                  {conv.unread > 0 && !isActive && (
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full flex-shrink-0" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── RIGHT PANEL: CHAT ── */}
      <div className={`w-full sm:w-2/3 flex flex-col bg-white ${!activeChatId ? 'hidden sm:flex' : 'flex'}`}>
        {!activeChatId ? (
          <div className="flex-1 flex flex-col items-center justify-center text-stone-400 p-6 text-center">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8 text-stone-300" />
            </div>
            <p>Selecciona una conversación para empezar a chatear</p>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-white shadow-sm z-10">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setActiveChatId(null)}
                  className="sm:hidden p-1.5 -ml-1.5 rounded-lg text-stone-400 hover:bg-stone-100"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-xl bg-stone-50" style={{ borderColor: activeCompany.logoColor }}>
                  {activeCompany.logo}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-stone-900 text-sm">{activeCompany.name}</h3>
                    {activeCompany.verified && <VerificationBadge status="verified" size="xs" />}
                  </div>
                  <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    En línea
                  </span>
                </div>
              </div>
              <button onClick={closeChat} className="p-2 rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-stone-50/50 flex flex-col gap-4">
              {activeConv.messages.map((msg, idx) => (
                <div key={msg.id} className={`flex max-w-[85%] ${msg.sender === 'me' ? 'self-end' : 'self-start'}`}>
                  {msg.sender !== 'me' && (
                    <div className="w-6 h-6 rounded-full border border-stone-200 flex items-center justify-center text-xs bg-white mr-2 flex-shrink-0 mt-1" style={{ borderColor: activeCompany.logoColor }}>
                      {activeCompany.logo}
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl text-sm shadow-sm ${
                    msg.sender === 'me' 
                      ? 'bg-green-700 text-white rounded-tr-sm' 
                      : 'bg-white border border-stone-200 text-stone-800 rounded-tl-sm'
                  }`}>
                    {msg.text}
                    <div className={`text-[9px] mt-1 text-right ${msg.sender === 'me' ? 'text-green-200' : 'text-stone-400'}`}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-stone-100 bg-white">
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 bg-stone-100 border-transparent rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2.5 rounded-xl bg-green-700 text-white hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
