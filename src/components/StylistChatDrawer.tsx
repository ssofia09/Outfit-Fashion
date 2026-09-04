import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, User, RefreshCw, MessageSquare } from 'lucide-react';
import { OutfitAnalysisResult, ChatMessage } from '../types';

interface StylistChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  outfit: OutfitAnalysisResult | null;
}

export const StylistChatDrawer: React.FC<StylistChatDrawerProps> = ({
  isOpen,
  onClose,
  outfit,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcoming stylist greeting when opened for an outfit
  useEffect(() => {
    if (isOpen && outfit && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'stylist',
          text: `¡Hola! Soy tu Director de Estilismo para tu look "${outfit.editorialTitle}". ¿Tienes alguna duda específica sobre qué bolso usar, peinado, zapatos alternativos o cómo adaptarlo si cambia el clima?`,
          timestamp: Date.now(),
        },
      ]);
    }
  }, [isOpen, outfit]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputMessage.trim(),
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputMessage('');
    setIsSending(true);

    try {
      const response = await fetch('/api/stylist/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          outfitContext: outfit,
        }),
      });

      const data = await response.json();
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: `stylist-${Date.now()}`,
            sender: 'stylist',
            text: data.reply,
            timestamp: Date.now(),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `stylist-${Date.now()}`,
            sender: 'stylist',
            text: 'Te recomiendo añadir un detalle dorado discreto y mantener la caída limpia del tejido para potenciar la silueta.',
            timestamp: Date.now(),
          },
        ]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `stylist-err-${Date.now()}`,
          sender: 'stylist',
          text: 'Disculpa, hubo un breve retraso con el atelier. Para este look, una cartera estructurada en tono cuero o negro mate siempre será una apuesta infalible.',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const quickQuestions = [
    '¿Qué peinado y maquillaje recomiendas?',
    '¿Qué bolso o cartera combina mejor?',
    '¿Cómo lo adapto si hace más frío?',
    '¿Puedo usar zapatillas o botines?',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/40 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-lg bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-stone-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury font-bold text-lg text-stone-900">
                Atelier Stylist en Vivo
              </h3>
              <p className="text-xs text-stone-500 line-clamp-1">
                Consultoría para: {outfit?.editorialTitle || 'Outfit actual'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center shrink-0 mt-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`p-4 rounded-2xl max-w-[85%] text-xs sm:text-sm font-sans leading-relaxed shadow-sm ${
                    isUser
                      ? 'bg-stone-900 text-stone-100 rounded-br-none'
                      : 'bg-white text-stone-800 rounded-bl-none border border-stone-200/80 font-serif-luxury sm:text-[15px]'
                  }`}
                >
                  {msg.text}
                </div>
                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-amber-200 text-stone-900 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isSending && (
            <div className="flex gap-3 items-center text-xs text-stone-500 italic pl-11">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-700" />
              <span>El estilista está formulando su recomendación...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-stone-100/80 border-t border-stone-200 overflow-x-auto whitespace-nowrap flex gap-2">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setInputMessage(q)}
              className="px-3 py-1.5 rounded-full bg-white text-stone-700 text-xs font-medium border border-stone-200 hover:border-stone-400 hover:bg-stone-50 transition-all shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Input Box */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 bg-white border-t border-stone-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Pregúntale al estilista..."
            className="flex-1 px-4 py-2.5 rounded-full bg-stone-100 text-stone-900 text-xs sm:text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white transition-all"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isSending}
            className={`p-2.5 rounded-full text-stone-100 transition-all ${
              !inputMessage.trim() || isSending
                ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                : 'bg-stone-900 hover:bg-stone-800 text-amber-200 shadow-md'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
