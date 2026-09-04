import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  Zap, 
  Shirt, 
  AlertTriangle, 
  Palette,
  Compass,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: number;
}

interface UniversalAIAssistantProps {
  onApplyStyleSuggestion?: (text: string) => void;
}

export const UniversalAIAssistant: React.FC<UniversalAIAssistantProps> = ({ onApplyStyleSuggestion }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: '¡Hola! Soy tu Asesor Universal de Moda y Estilismo de Atelier. ✨\n\nPuedes preguntarme **absolutamente lo que sea**: desde qué ponerte para un evento con dress code difícil, cómo combinar una prenda específica de tu clóset, hasta resolver emergencias con ropa o buscar estilos que no encuentras en la aplicación. ¿En qué te ayudo hoy?',
      timestamp: Date.now(),
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const QUICK_PROMPTS = [
    { label: 'Boda de día en jardín', query: '¿Cómo me visto para una boda de día en un jardín campestre? Dame colores y accesorios.' },
    { label: 'Combinar verde oliva', query: '¿Con qué colores y calzado combino un pantalón o falda verde oliva para no verme apagada?' },
    { label: 'Entrevista de trabajo', query: 'Tengo una entrevista para una empresa creativa. ¿Qué outfit smart-casual me recomiendas?' },
    { label: 'Emergencia de ropa', query: '¿Qué trucos rápidos hay para disimular arrugas en la ropa si no tengo plancha a la mano?' },
    { label: 'Estilo Quiet Luxury', query: 'Explícame cómo armar un look estilo "Quiet Luxury" con prendas básicas que ya tengo en mi armario.' },
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/stylist/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend.trim(),
          history: messages.slice(-6),
        }),
      });

      const json = await response.json();
      const replyText = json.answer || 'Aquí tienes una sugerencia: apuesta por líneas limpias y un accesorio statement que unifique la silueta.';

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e) {
      console.error('Assistant error:', e);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          sender: 'assistant',
          text: 'Te sugiero combinar tonos neutros (marfil, camel o carbón) con un punto de luz dorado en joyas para acertar con elegancia en cualquier contexto.',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-violet-600 via-rose-600 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-amber-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Inteligencia de Moda Universal 24/7</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold">
            ¿No encuentras lo que buscas? Pídeselo a la IA
          </h2>
          <p className="text-xs sm:text-sm text-rose-100 max-w-xl">
            Resuelve cualquier dilema de estilo, combinaciones imposibles, códigos de vestimenta o busca ideas de prendas que no están en el catálogo.
          </p>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-3xl shadow-inner shrink-0">
          👗✨
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 editorial-border editorial-shadow flex flex-col h-[580px]">
        
        {/* Messages view */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-md font-bold text-xs mt-1">
                  ✨
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-stone-900 to-stone-800 text-amber-100 rounded-tr-none shadow-md font-sans'
                    : 'bg-rose-50/40 border border-rose-200/60 text-stone-800 rounded-tl-none font-sans shadow-sm'
                }`}
              >
                {msg.text}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-stone-900 text-amber-200 flex items-center justify-center shrink-0 shadow-md text-xs font-bold mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-md font-bold text-xs">
                ✨
              </div>
              <div className="bg-rose-50 border border-rose-200 rounded-2xl rounded-tl-none p-4 text-xs text-stone-600 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-rose-600 animate-spin" />
                <span>Consultando con el estilista de atelier...</span>
              </div>
            </div>
          )}

          <div ref={scrollRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="pt-3 pb-2 border-t border-stone-100">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>Consultas Rápidas Frecuentes:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(prompt.query)}
                className="px-3 py-1 rounded-full bg-stone-100 hover:bg-rose-100 text-stone-700 hover:text-rose-900 text-[11px] font-medium border border-stone-200 whitespace-nowrap transition-colors"
              >
                {prompt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 pt-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Pregúntale lo que sea: un evento, cómo combinar un color, qué calzado usar..."
            className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-full bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white text-stone-900"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md ${
              !inputQuery.trim() || isLoading
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30'
            }`}
          >
            <span>Enviar</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>

    </div>
  );
};
