import React, { useState } from 'react';
import { 
  Bookmark, 
  Star, 
  Trash2, 
  Search, 
  Filter, 
  ArrowRight, 
  Sparkles, 
  Calendar,
  Layers,
  Shirt
} from 'lucide-react';
import { OutfitAnalysisResult } from '../types';

interface WardrobeGalleryProps {
  outfits: OutfitAnalysisResult[];
  onSelectOutfit: (outfit: OutfitAnalysisResult) => void;
  onToggleFavorite: (id: string) => void;
  onDeleteOutfit: (id: string) => void;
  onNewAnalysis: () => void;
}

export const WardrobeGallery: React.FC<WardrobeGalleryProps> = ({
  outfits,
  onSelectOutfit,
  onToggleFavorite,
  onDeleteOutfit,
  onNewAnalysis,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'favorites'>('all');
  const [selectedOccasionFilter, setSelectedOccasionFilter] = useState<string>('all');

  const occasions = Array.from(new Set(outfits.map((o) => o.occasion))).filter(Boolean);

  const filteredOutfits = outfits.filter((outfit) => {
    const matchesSearch = 
      outfit.editorialTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      outfit.vibeQuote.toLowerCase().includes(searchTerm.toLowerCase()) ||
      outfit.occasion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      outfit.stylingRecommendations.some((r) => r.trendTag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFavorites = filterType === 'all' || (filterType === 'favorites' && outfit.isFavorite);
    const matchesOccasion = selectedOccasionFilter === 'all' || outfit.occasion === selectedOccasionFilter;

    return matchesSearch && matchesFavorites && matchesOccasion;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 font-sans">
      
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Digital Lookbook & Wardrobe
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-stone-900 mt-1">
            Mi Armario & Historial de Looks
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Consulta tus outfits analizados, accede a recomendaciones pasadas y mantén tus combinaciones favoritas organizadas.
          </p>
        </div>

        <button
          onClick={onNewAnalysis}
          className="px-5 py-2.5 rounded-full bg-stone-900 text-amber-100 hover:bg-stone-800 font-serif-luxury text-sm font-semibold flex items-center gap-2 shadow-sm transition-all self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Analizar Nuevo Look</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
        
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
              filterType === 'all'
                ? 'bg-stone-900 text-stone-100'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Todos ({outfits.length})
          </button>
          
          <button
            onClick={() => setFilterType('favorites')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
              filterType === 'favorites'
                ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Favoritos ({outfits.filter((o) => o.isFavorite).length})</span>
          </button>

          {occasions.length > 0 && (
            <select
              value={selectedOccasionFilter}
              onChange={(e) => setSelectedOccasionFilter(e.target.value)}
              className="px-3 py-2 rounded-full text-xs font-semibold bg-white border border-stone-200 text-stone-700 focus:outline-none"
            >
              <option value="all">Todas las ocasiones</option>
              {occasions.map((occ, idx) => (
                <option key={idx} value={occ}>
                  {occ}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por estilo o tendencia..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-white text-xs sm:text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 text-stone-800 placeholder:text-stone-400"
          />
        </div>
      </div>

      {/* Grid of Outfits */}
      {filteredOutfits.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl editorial-border p-8 space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <Shirt className="w-7 h-7" />
          </div>
          <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
            No hay looks en esta selección
          </h3>
          <p className="text-xs sm:text-sm text-stone-500">
            {outfits.length === 0
              ? 'Aún no has guardado ningún outfit. Sube una foto para recibir tu primer diagnóstico de estilismo.'
              : 'No encontramos looks que coincidan con tus filtros actuales.'}
          </p>
          {outfits.length === 0 && (
            <button
              onClick={onNewAnalysis}
              className="px-6 py-2.5 rounded-full bg-stone-900 text-amber-100 text-xs font-semibold hover:bg-stone-800 shadow-sm"
            >
              Analizar mi primer atuendo
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOutfits.map((outfit) => (
            <div
              key={outfit.id}
              onClick={() => onSelectOutfit(outfit)}
              className="group bg-white rounded-2xl overflow-hidden editorial-border editorial-shadow editorial-card-hover cursor-pointer flex flex-col justify-between"
            >
              {/* Photo & Badge */}
              <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
                <img
                  src={outfit.imageUrl}
                  alt={outfit.editorialTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-amber-200 text-[10px] font-bold uppercase tracking-wider">
                    {outfit.occasion}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(outfit.id);
                    }}
                    className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                      outfit.isFavorite
                        ? 'bg-amber-400 text-stone-950 shadow-md'
                        : 'bg-stone-900/60 hover:bg-stone-900 text-white'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${outfit.isFavorite ? 'fill-stone-950' : ''}`} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('¿Deseas eliminar este look de tu armario?')) {
                        onDeleteOutfit(outfit.id);
                      }
                    }}
                    className="p-2 rounded-full bg-stone-900/60 hover:bg-rose-600 text-white backdrop-blur-md transition-colors opacity-0 group-hover:opacity-100"
                    title="Eliminar de mi armario"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Harmony Score pill on bottom image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-stone-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs">
                  <span className="text-stone-300 text-[11px]">Puntuación Atelier:</span>
                  <span className="font-serif-luxury font-bold text-amber-300 text-sm">
                    {outfit.harmonyScore}/100
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-serif-luxury text-lg font-bold text-stone-900 group-hover:text-amber-950 line-clamp-1">
                    {outfit.editorialTitle}
                  </h3>
                  <p className="text-xs text-stone-500 italic line-clamp-2 font-serif-luxury">
                    "{outfit.vibeQuote}"
                  </p>
                </div>

                {/* Color dots */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {outfit.colorPalette.slice(0, 4).map((c, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 rounded-full border border-black/10 shadow-sm"
                        style={{ backgroundColor: c.hex }}
                        title={`${c.name} (${c.hex})`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-stone-900 group-hover:translate-x-1 transition-transform">
                    <span>Ver Ficha</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
