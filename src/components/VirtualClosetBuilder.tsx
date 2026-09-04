import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Trash2, 
  Search, 
  ArrowRight, 
  Check, 
  Plus, 
  SlidersHorizontal,
  RefreshCw,
  ShoppingBag,
  Palette
} from 'lucide-react';
import { WARDROBE_CATALOG, CatalogItem } from '../data/wardrobeCatalog';
import { OCCASION_OPTIONS, WEATHER_OPTIONS, STYLE_GOAL_OPTIONS } from '../data/presets';
import { OutfitAnalysisRequest } from '../types';

interface VirtualClosetBuilderProps {
  onAnalyzeOutfit: (request: OutfitAnalysisRequest, selectedItems: CatalogItem[]) => Promise<void>;
  isLoading: boolean;
}

export const VirtualClosetBuilder: React.FC<VirtualClosetBuilderProps> = ({
  onAnalyzeOutfit,
  isLoading,
}) => {
  // Selected garment slots
  const [selectedTop, setSelectedTop] = useState<CatalogItem | null>(WARDROBE_CATALOG[0]); // default camel blazer
  const [selectedBottom, setSelectedBottom] = useState<CatalogItem | null>(WARDROBE_CATALOG[6]); // default cream wide-leg
  const [selectedShoe, setSelectedShoe] = useState<CatalogItem | null>(WARDROBE_CATALOG[11]); // default kitten heels
  const [selectedAccessory, setSelectedAccessory] = useState<CatalogItem | null>(WARDROBE_CATALOG[16]); // default cherry baguette

  // Catalog category filter
  const [activeCategory, setActiveCategory] = useState<'all' | 'tops' | 'bottoms' | 'footwear' | 'accessories'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Context form
  const [selectedOccasion, setSelectedOccasion] = useState<string>('office');
  const [selectedWeather, setSelectedWeather] = useState<string>('temperate');
  const [selectedStyleGoal, setSelectedStyleGoal] = useState<string>('elevate_accessories');
  const [customNotes, setCustomNotes] = useState<string>('');

  const filteredCatalog = WARDROBE_CATALOG.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.colorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.styleTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectGarment = (item: CatalogItem) => {
    if (item.category === 'tops') setSelectedTop(item);
    if (item.category === 'bottoms') setSelectedBottom(item);
    if (item.category === 'footwear') setSelectedShoe(item);
    if (item.category === 'accessories') setSelectedAccessory(item);
  };

  const isItemSelected = (item: CatalogItem) => {
    return (
      selectedTop?.id === item.id ||
      selectedBottom?.id === item.id ||
      selectedShoe?.id === item.id ||
      selectedAccessory?.id === item.id
    );
  };

  // Quick Curated Outfit Formulas
  const applyFormula = (presetKey: 'quiet-luxury' | 'pop-red' | 'effortless' | 'cocktail') => {
    if (presetKey === 'quiet-luxury') {
      setSelectedTop(WARDROBE_CATALOG.find(i => i.id === 'top-blazer-camel') || null);
      setSelectedBottom(WARDROBE_CATALOG.find(i => i.id === 'bottom-wide-leg-cream') || null);
      setSelectedShoe(WARDROBE_CATALOG.find(i => i.id === 'shoe-loafers-chunky') || null);
      setSelectedAccessory(WARDROBE_CATALOG.find(i => i.id === 'acc-choker-gold') || null);
      setSelectedOccasion('office');
      setSelectedStyleGoal('elevate_accessories');
    } else if (presetKey === 'pop-red') {
      setSelectedTop(WARDROBE_CATALOG.find(i => i.id === 'top-red-knit') || null);
      setSelectedBottom(WARDROBE_CATALOG.find(i => i.id === 'bottom-jeans-indigo') || null);
      setSelectedShoe(WARDROBE_CATALOG.find(i => i.id === 'shoe-kitten-red') || null);
      setSelectedAccessory(WARDROBE_CATALOG.find(i => i.id === 'acc-baguette-cherry') || null);
      setSelectedOccasion('date');
      setSelectedStyleGoal('trendsetter_2026');
    } else if (presetKey === 'effortless') {
      setSelectedTop(WARDROBE_CATALOG.find(i => i.id === 'top-silk-shirt') || null);
      setSelectedBottom(WARDROBE_CATALOG.find(i => i.id === 'bottom-jeans-indigo') || null);
      setSelectedShoe(WARDROBE_CATALOG.find(i => i.id === 'shoe-sneakers-retro') || null);
      setSelectedAccessory(WARDROBE_CATALOG.find(i => i.id === 'acc-sunglasses-cateye') || null);
      setSelectedOccasion('casual');
      setSelectedStyleGoal('effortless_chic');
    } else if (presetKey === 'cocktail') {
      setSelectedTop(WARDROBE_CATALOG.find(i => i.id === 'top-corset-noir') || null);
      setSelectedBottom(WARDROBE_CATALOG.find(i => i.id === 'bottom-skirt-pleated') || null);
      setSelectedShoe(WARDROBE_CATALOG.find(i => i.id === 'shoe-strappy-gold') || null);
      setSelectedAccessory(WARDROBE_CATALOG.find(i => i.id === 'acc-choker-gold') || null);
      setSelectedOccasion('party');
      setSelectedStyleGoal('more_formal');
    }
  };

  const assembledItems = [selectedTop, selectedBottom, selectedShoe, selectedAccessory].filter(Boolean) as CatalogItem[];

  const handleAnalyze = () => {
    if (assembledItems.length === 0) {
      alert('Por favor selecciona al menos una prenda para evaluar tu look.');
      return;
    }

    const occasionObj = OCCASION_OPTIONS.find((o) => o.id === selectedOccasion);
    const weatherObj = WEATHER_OPTIONS.find((w) => w.id === selectedWeather);
    const goalObj = STYLE_GOAL_OPTIONS.find((g) => g.id === selectedStyleGoal);

    // Provide the top item's image as the hero preview image
    const heroImage = selectedTop?.imageUrl || assembledItems[0]?.imageUrl || '';

    onAnalyzeOutfit(
      {
        imageBase64: heroImage,
        mimeType: 'image/jpeg',
        occasion: occasionObj?.label || selectedOccasion,
        weather: weatherObj?.label || selectedWeather,
        styleGoal: goalObj?.label || selectedStyleGoal,
        customNotes: customNotes
          ? `${customNotes} (Prendas elegidas: ${assembledItems.map(i => i.name).join(', ')})`
          : `Outfit armado con: ${assembledItems.map(i => i.name).join(', ')}`,
      },
      assembledItems
    );
  };

  return (
    <div className="space-y-10">
      
      {/* Intro & Quick Preset Formulas */}
      <div className="bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-violet-500/10 rounded-3xl p-6 sm:p-8 border border-rose-200/50 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Guardarropa & Diseñador Virtual</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-stone-900 mt-2">
              Mezcla y Combina Ropa Directamente
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl font-sans mt-1">
              ¿No tienes una foto a mano? Selecciona prendas de alta costura de nuestro catálogo, pruébalas en tu tablón visual y obtén el análisis del estilista.
            </p>
          </div>

          {/* Quick preset formulas */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block w-full sm:w-auto">
              Fórmulas Rápidas:
            </span>
            <button
              type="button"
              onClick={() => applyFormula('quiet-luxury')}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-stone-900 hover:text-amber-100 text-stone-800 text-xs font-semibold border border-stone-200 shadow-sm transition-all"
            >
              Quiet Luxury
            </button>
            <button
              type="button"
              onClick={() => applyFormula('pop-red')}
              className="px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-800 text-xs font-semibold border border-rose-200 shadow-sm transition-all"
            >
              Pop of Red
            </button>
            <button
              type="button"
              onClick={() => applyFormula('effortless')}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-stone-900 hover:text-amber-100 text-stone-800 text-xs font-semibold border border-stone-200 shadow-sm transition-all"
            >
              Denim Chic
            </button>
            <button
              type="button"
              onClick={() => applyFormula('cocktail')}
              className="px-3 py-1.5 rounded-full bg-violet-50 hover:bg-violet-900 hover:text-amber-100 text-violet-900 text-xs font-semibold border border-violet-200 shadow-sm transition-all"
            >
              Coctel Noche
            </button>
          </div>
        </div>
      </div>

      {/* Visual Mannequin Lookboard (The Active Outfit being built) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 editorial-border editorial-shadow space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-chic text-white flex items-center justify-center font-bold text-sm shadow-md">
              ✨
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                Tu Ensamble Visual en Curso
              </h3>
              <p className="text-xs text-stone-500">
                {assembledItems.length} prendas seleccionadas en la silueta
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedTop(null);
              setSelectedBottom(null);
              setSelectedShoe(null);
              setSelectedAccessory(null);
            }}
            className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpiar Ensamble</span>
          </button>
        </div>

        {/* 4 Active Garment Slots */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* TOP SLOT */}
          <div className="relative rounded-2xl p-3 border-2 border-dashed border-rose-200 bg-rose-50/30 flex flex-col justify-between min-h-[220px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2 py-0.5 rounded self-start">
              1. Prenda Superior
            </span>
            {selectedTop ? (
              <div className="space-y-2 mt-2">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm bg-stone-100">
                  <img src={selectedTop.imageUrl} alt={selectedTop.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => setSelectedTop(null)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white hover:bg-rose-600"
                    title="Quitar"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <div className="text-xs font-bold text-stone-900 line-clamp-1">{selectedTop.name}</div>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                  <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: selectedTop.hex }} />
                  <span className="truncate">{selectedTop.colorName}</span>
                </div>
              </div>
            ) : (
              <div className="my-auto text-center py-6 text-stone-400">
                <Plus className="w-6 h-6 mx-auto mb-1 text-stone-300" />
                <span className="text-xs">Elige un top o blazer abajo</span>
              </div>
            )}
          </div>

          {/* BOTTOM SLOT */}
          <div className="relative rounded-2xl p-3 border-2 border-dashed border-amber-200 bg-amber-50/30 flex flex-col justify-between min-h-[220px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded self-start">
              2. Prenda Inferior
            </span>
            {selectedBottom ? (
              <div className="space-y-2 mt-2">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm bg-stone-100">
                  <img src={selectedBottom.imageUrl} alt={selectedBottom.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => setSelectedBottom(null)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white hover:bg-rose-600"
                    title="Quitar"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <div className="text-xs font-bold text-stone-900 line-clamp-1">{selectedBottom.name}</div>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                  <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: selectedBottom.hex }} />
                  <span className="truncate">{selectedBottom.colorName}</span>
                </div>
              </div>
            ) : (
              <div className="my-auto text-center py-6 text-stone-400">
                <Plus className="w-6 h-6 mx-auto mb-1 text-stone-300" />
                <span className="text-xs">Elige pantalón o falda</span>
              </div>
            )}
          </div>

          {/* SHOE SLOT */}
          <div className="relative rounded-2xl p-3 border-2 border-dashed border-indigo-200 bg-indigo-50/30 flex flex-col justify-between min-h-[220px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded self-start">
              3. Calzado
            </span>
            {selectedShoe ? (
              <div className="space-y-2 mt-2">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm bg-stone-100">
                  <img src={selectedShoe.imageUrl} alt={selectedShoe.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => setSelectedShoe(null)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white hover:bg-rose-600"
                    title="Quitar"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <div className="text-xs font-bold text-stone-900 line-clamp-1">{selectedShoe.name}</div>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                  <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: selectedShoe.hex }} />
                  <span className="truncate">{selectedShoe.colorName}</span>
                </div>
              </div>
            ) : (
              <div className="my-auto text-center py-6 text-stone-400">
                <Plus className="w-6 h-6 mx-auto mb-1 text-stone-300" />
                <span className="text-xs">Elige zapatos o tacones</span>
              </div>
            )}
          </div>

          {/* ACCESSORY SLOT */}
          <div className="relative rounded-2xl p-3 border-2 border-dashed border-emerald-200 bg-emerald-50/30 flex flex-col justify-between min-h-[220px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded self-start">
              4. Accesorios / Bolso
            </span>
            {selectedAccessory ? (
              <div className="space-y-2 mt-2">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm bg-stone-100">
                  <img src={selectedAccessory.imageUrl} alt={selectedAccessory.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => setSelectedAccessory(null)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white hover:bg-rose-600"
                    title="Quitar"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <div className="text-xs font-bold text-stone-900 line-clamp-1">{selectedAccessory.name}</div>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                  <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: selectedAccessory.hex }} />
                  <span className="truncate">{selectedAccessory.colorName}</span>
                </div>
              </div>
            ) : (
              <div className="my-auto text-center py-6 text-stone-400">
                <Plus className="w-6 h-6 mx-auto mb-1 text-stone-300" />
                <span className="text-xs">Elige bolso o joya</span>
              </div>
            )}
          </div>
        </div>

        {/* Live Color Harmony Preview */}
        {assembledItems.length > 0 && (
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-rose-600" />
              <span className="text-xs font-bold text-stone-800">Paleta Cromática del Look:</span>
              <div className="flex items-center gap-1.5 ml-2">
                {assembledItems.map((item, idx) => (
                  <span
                    key={idx}
                    className="w-5 h-5 rounded-full border border-black/10 shadow-sm"
                    style={{ backgroundColor: item.hex }}
                    title={`${item.name} (${item.colorName})`}
                  />
                ))}
              </div>
            </div>
            <div className="text-xs text-stone-500 italic">
              Combinación fluida lista para evaluación de atelier
            </div>
          </div>
        )}
      </div>

      {/* Garment Catalog Browser */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 editorial-border editorial-shadow space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif-luxury text-2xl font-bold text-stone-900">
              Catálogo de Prendas & Diseños
            </h3>
            <p className="text-xs text-stone-500">
              Haz clic en cualquier prenda para asignarla automáticamente a tu silueta
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar blazer, seda, rojo..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'Todo el Clóset' },
            { id: 'tops', label: '🧥 Superiores & Blazers' },
            { id: 'bottoms', label: '👖 Pantalones & Faldas' },
            { id: 'footwear', label: '👠 Calzado & Tacones' },
            { id: 'accessories', label: '👜 Accesorios & Joyas' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Garments Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCatalog.map((item) => {
            const isSelected = isItemSelected(item);
            return (
              <div
                key={item.id}
                onClick={() => handleSelectGarment(item)}
                className={`group cursor-pointer rounded-2xl overflow-hidden p-3 transition-all border ${
                  isSelected
                    ? 'border-rose-600 ring-2 ring-rose-500/50 bg-rose-50/40 scale-[1.02]'
                    : 'border-stone-200 hover:border-stone-400 bg-stone-50/50 hover:bg-stone-50'
                }`}
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-200 mb-2.5">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-900/80 text-amber-200">
                    {item.styleTag}
                  </span>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <h4 className="text-xs font-bold text-stone-900 line-clamp-1 group-hover:text-rose-700 transition-colors">
                  {item.name}
                </h4>
                <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5 leading-snug">
                  {item.description}
                </p>

                <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[10px] text-stone-600">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: item.hex }} />
                    <span className="truncate max-w-[80px]">{item.colorName}</span>
                  </span>
                  <span className="font-semibold text-rose-600 group-hover:underline">
                    {isSelected ? 'Seleccionado' : '+ Agregar'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Context Options & Analyze Trigger */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 editorial-border editorial-shadow space-y-6">
        <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
          Contexto para este Look Armado
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
              Ocasión
            </label>
            <select
              value={selectedOccasion}
              onChange={(e) => setSelectedOccasion(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              {OCCASION_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
              Clima / Temporada
            </label>
            <select
              value={selectedWeather}
              onChange={(e) => setSelectedWeather(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              {WEATHER_OPTIONS.map((w) => (
                <option key={w.id} value={w.id}>{w.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
              Meta de Estilo
            </label>
            <select
              value={selectedStyleGoal}
              onChange={(e) => setSelectedStyleGoal(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              {STYLE_GOAL_OPTIONS.map((g) => (
                <option key={g.id} value={g.id}>{g.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
            Dudas o Notas para el Estilista (Opcional)
          </label>
          <input
            type="text"
            value={customNotes}
            onChange={(e) => setCustomNotes(e.target.value)}
            placeholder="Ej: ¿El calzado rojo es demasiado atrevido para el trabajo? ¿Qué joyas le pongo?"
            className="w-full px-4 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={assembledItems.length === 0 || isLoading}
            className={`px-8 py-4 rounded-full font-serif-luxury text-lg font-bold shadow-xl transition-all flex items-center gap-3 mx-auto ${
              assembledItems.length === 0 || isLoading
                ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-rose-600 via-amber-600 to-violet-700 text-white hover:scale-105 active:scale-95 shadow-rose-600/30'
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Analizando Ensamble con IA...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Analizar este Look Armado con IA</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};
