import React from 'react';
import { Sparkles, BookmarkCheck, Shirt, Compass, Layers, BotMessageSquare } from 'lucide-react';

export type AppTab = 'analyze' | 'builder' | 'trends' | 'assistant' | 'wardrobe';

interface NavbarProps {
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, savedCount }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo & Brand */}
        <div 
          onClick={() => onSelectTab('analyze')}
          className="cursor-pointer group flex items-center gap-3"
          id="brand-logo-btn"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-600 via-amber-500 to-violet-600 flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-md shadow-rose-600/20">
            <Sparkles className="w-6 h-6 text-amber-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-luxury text-2xl font-bold tracking-[0.18em] text-stone-900 uppercase">
                ATELIER
              </span>
              <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold shadow-sm">
                Stylist AI
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-sans tracking-wide">
              Haute Couture & Personal Fashion Advisory
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {/* 1. ANALYZE PHOTO */}
          <button
            id="nav-tab-analyze"
            onClick={() => onSelectTab('analyze')}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'analyze'
                ? 'bg-stone-900 text-white shadow-md'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Shirt className="w-4 h-4 text-rose-500" />
            <span className="hidden sm:inline">Evaluar Foto</span>
            <span className="sm:hidden">Foto</span>
          </button>

          {/* 2. VIRTUAL CLOSET BUILDER */}
          <button
            id="nav-tab-builder"
            onClick={() => onSelectTab('builder')}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'builder'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'text-stone-600 hover:text-stone-900 hover:bg-rose-50'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">Armar con Ropa</span>
            <span className="md:hidden">Armar</span>
          </button>

          {/* 3. DAILY TRENDS */}
          <button
            id="nav-tab-trends"
            onClick={() => onSelectTab('trends')}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'trends'
                ? 'bg-stone-900 text-white shadow-md'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">Tendencias Hoy</span>
            <span className="sm:hidden">Trends</span>
          </button>

          {/* 4. UNIVERSAL AI ASSISTANT */}
          <button
            id="nav-tab-assistant"
            onClick={() => onSelectTab('assistant')}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'assistant'
                ? 'bg-gradient-to-r from-violet-700 to-rose-600 text-white shadow-md'
                : 'text-stone-600 hover:text-stone-900 hover:bg-violet-50'
            }`}
          >
            <BotMessageSquare className="w-4 h-4 text-violet-500" />
            <span className="hidden lg:inline">Asistente IA 24/7</span>
            <span className="lg:hidden">IA</span>
          </button>

          {/* 5. WARDROBE LOOKBOOK */}
          <button
            id="nav-tab-wardrobe"
            onClick={() => onSelectTab('wardrobe')}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 relative ${
              activeTab === 'wardrobe'
                ? 'bg-stone-900 text-white shadow-md'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <BookmarkCheck className="w-4 h-4 text-emerald-500" />
            <span className="hidden sm:inline">Mi Armario</span>
            {savedCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center ml-0.5 shadow-sm">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

      </div>
    </header>
  );
};
