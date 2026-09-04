import React, { useState, useEffect } from 'react';
import { Navbar, AppTab } from './components/Navbar';
import { OutfitUploader } from './components/OutfitUploader';
import { EditorialReport } from './components/EditorialReport';
import { WardrobeGallery } from './components/WardrobeGallery';
import { TrendsBriefing } from './components/TrendsBriefing';
import { VirtualClosetBuilder } from './components/VirtualClosetBuilder';
import { UniversalAIAssistant } from './components/UniversalAIAssistant';
import { StylistChatDrawer } from './components/StylistChatDrawer';
import { OutfitAnalysisResult, OutfitAnalysisRequest } from './types';
import { CatalogItem } from './data/wardrobeCatalog';
import { AlertCircle, X, Sparkles, BotMessageSquare } from 'lucide-react';

const STORAGE_KEY = 'atelier_outfits_wardrobe_v2';

const INITIAL_DEMO_OUTFIT: OutfitAnalysisResult = {
  id: 'demo-outfit-atelier-1',
  timestamp: Date.now() - 3600000 * 24 * 2,
  imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
  occasion: 'Oficina & Smart Casual',
  weather: 'Templado / Primavera',
  styleGoal: 'Elevar con accesorios de lujo silencioso',
  editorialTitle: 'Sastrería Contemporánea & Tonos Neutros Cálidos',
  vibeQuote: 'La sofisticación moderna reside en el corte relajado y la pureza de las líneas minimalistas.',
  harmonyScore: 94,
  harmonyVerdict: 'Una silueta impecable con caída fluida. El equilibrio entre el blazer desestructurado y los pantalones anchos crea una proporción visual sumamente estilizada.',
  detectedPieces: [
    { category: 'Prenda Superior', description: 'Blazer desestructurado en tono lino camel', roleInLook: 'Aporta estructura y sofisticación formal' },
    { category: 'Prenda Interior', description: 'Top de punto fino en tono arena marfil', roleInLook: 'Base neutra de contacto con textura suave' },
    { category: 'Prenda Inferior', description: 'Pantalón sastre de pinzas wide-leg en beige cálido', roleInLook: 'Alarga la verticalidad de la figura' },
    { category: 'Calzado & Accesorios', description: 'Mocasines de piel pulida y bolso estructurado', roleInLook: 'Cierre pulido con aire de pasarela' }
  ],
  colorPalette: [
    { hex: '#D7C4B0', name: 'Lino Camel', percentage: 40, role: 'base' },
    { hex: '#EFEAE1', name: 'Arena Marfil', percentage: 35, role: 'secondary' },
    { hex: '#8C7B6B', name: 'Tierra Suave', percentage: 15, role: 'secondary' },
    { hex: '#BE123C', name: 'Rojo Carmesí Acento', percentage: 10, role: 'accent' }
  ],
  colorHarmonyAnalysis: 'Paleta monocromática tonal de altísima elegancia. Los subtonos cálidos de los marfiles y camel crean una continuidad visual relajante y luminosa con un potencial toque escarlata.',
  keyStrengths: [
    'Caída excelente de los tejidos que aporta movimiento natural sin rigidez.',
    'Proporción 1/3 superior y 2/3 inferior que estiliza y equilibra la altura.',
    'Paleta cromática neutra alineada con la tendencia internacional de Lujo Silencioso (Quiet Luxury).'
  ],
  stylingRecommendations: [
    {
      type: 'accessory',
      title: 'Joyería Escultural Dorada',
      description: 'Añadir unos pendientes de gota voluminosos en acabado oro cepillado y un brazalete rígido sobre la muñeca descubierta para romper la monocromía.',
      suggestedItems: ['Pendientes gota de oro cepillado', 'Brazalete rígido minimalista', 'Anillo de sello orgánico'],
      trendTag: 'Quiet Luxury'
    },
    {
      type: 'footwear',
      title: 'Contraste con Kitten Heels Escarlata',
      description: 'Si buscas transicionar este look hacia un evento de tarde/noche, sustituye los mocasines planos por unos kitten heels o stilettos en punta color cereza.',
      suggestedItems: ['Kitten heels de piel', 'Slingbacks en punta', 'Botines de tacón fino'],
      trendTag: 'Pop of Red 2026'
    },
    {
      type: 'accessory',
      title: 'Bolso con Textura Trenzada o Borgoña',
      description: 'Introduce un bolso de mano en piel trenzada o en el tono tendencia Rojo Cereza / Merlot para un toque de vanguardia editorial.',
      suggestedItems: ['Bolso baguette burdeos', 'Clutch estructurado', 'Bandolera rígida'],
      trendTag: 'Modern Tailoring'
    }
  ],
  quickStylistTransform: 'Remanga las mangas del blazer ligeramente hacia los antebrazos dejando ver tu reloj o brazalete para restar rigidez formal y ganar dinamismo.',
  alternativeCombinations: [
    {
      name: 'Viernes Casual / Fin de Semana',
      description: 'Cambia los pantalones de sastre por unos vaqueros de corte recto en azul índigo lavado y añade zapatillas de cuero blanco minimalistas.'
    },
    {
      name: 'Cena & Coctel Nocturno',
      description: 'Retira el top interior y lleva el blazer abotonado con un collar choker dorado pegado a la clavícula y labios en rojo mate.'
    }
  ],
  isFavorite: true
};

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('analyze');
  const [currentReport, setCurrentReport] = useState<OutfitAnalysisResult | null>(null);
  const [savedOutfits, setSavedOutfits] = useState<OutfitAnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // Load Wardrobe from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedOutfits(parsed);
          return;
        }
      }
      setSavedOutfits([INITIAL_DEMO_OUTFIT]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([INITIAL_DEMO_OUTFIT]));
    } catch (e) {
      console.error('Error loading wardrobe from localStorage:', e);
      setSavedOutfits([INITIAL_DEMO_OUTFIT]);
    }
  }, []);

  // Save to LocalStorage
  const saveWardrobe = (updated: OutfitAnalysisResult[]) => {
    setSavedOutfits(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error persisting wardrobe:', e);
    }
  };

  // Analyze Outfit Handler (Photos or Virtual Closet)
  const handleAnalyze = async (request: OutfitAnalysisRequest, selectedItems?: CatalogItem[]) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const payload: any = {
        ...request,
        selectedItems: selectedItems || undefined,
      };

      const response = await fetch('/api/analyze-outfit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error || json.details || 'Error al procesar el análisis del outfit.');
      }

      const newReport: OutfitAnalysisResult = {
        ...json.data,
        id: `outfit-${Date.now()}`,
        timestamp: Date.now(),
        imageUrl: request.imageBase64,
        occasion: request.occasion,
        weather: request.weather,
        styleGoal: request.styleGoal,
        isFavorite: false,
      };

      setCurrentReport(newReport);
      
      // Auto-save to wardrobe history
      const updatedList = [newReport, ...savedOutfits];
      saveWardrobe(updatedList);
      
      // Switch to analyze view to show the report
      setActiveTab('analyze');

    } catch (err: any) {
      console.error('Analysis failed:', err);
      setErrorMessage(
        err?.message || 'No se pudo conectar con el servicio de estilismo. Por favor, intenta de nuevo.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle Favorite
  const handleToggleFavorite = (id: string) => {
    const updated = savedOutfits.map((item) => {
      if (item.id === id) {
        const nextFav = !item.isFavorite;
        return { ...item, isFavorite: nextFav };
      }
      return item;
    });

    saveWardrobe(updated);

    if (currentReport && currentReport.id === id) {
      setCurrentReport({ ...currentReport, isFavorite: !currentReport.isFavorite });
    }
  };

  // Delete Outfit
  const handleDeleteOutfit = (id: string) => {
    const updated = savedOutfits.filter((item) => item.id !== id);
    saveWardrobe(updated);
    if (currentReport && currentReport.id === id) {
      setCurrentReport(null);
    }
  };

  // Select Outfit from Wardrobe to view report
  const handleSelectOutfitFromWardrobe = (outfit: OutfitAnalysisResult) => {
    setCurrentReport(outfit);
    setActiveTab('analyze');
  };

  return (
    <div className="min-h-screen bg-radial from-[#FFF5F7] via-[#FAF8F5] to-[#F5F3FF] text-stone-900 flex flex-col font-sans">
      
      {/* Top Haute Couture Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
        }}
        savedCount={savedOutfits.length}
      />

      {/* Error Notification Banner */}
      {errorMessage && (
        <div className="max-w-4xl mx-auto px-4 mt-4 w-full">
          <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-2xl flex items-center justify-between text-xs sm:text-sm shadow-sm">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="p-1 hover:bg-rose-100 rounded-full transition-colors text-rose-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 pb-16 pt-4">
        
        {/* 1. ANALYZE PHOTO / REPORT */}
        {activeTab === 'analyze' && (
          <>
            {currentReport ? (
              <EditorialReport
                report={currentReport}
                onBack={() => setCurrentReport(null)}
                onToggleFavorite={handleToggleFavorite}
                onOpenChat={() => setIsChatOpen(true)}
                onOpenUniversalAssistant={() => setActiveTab('assistant')}
              />
            ) : (
              <OutfitUploader
                onAnalyze={(req) => handleAnalyze(req)}
                isLoading={isLoading}
                onSwitchToBuilder={() => setActiveTab('builder')}
              />
            )}
          </>
        )}

        {/* 2. VIRTUAL CLOSET BUILDER (Armador con Ropa de la App) */}
        {activeTab === 'builder' && (
          <div className="max-w-6xl mx-auto px-4 py-6">
            <VirtualClosetBuilder
              onAnalyzeOutfit={(req, items) => handleAnalyze(req, items)}
              isLoading={isLoading}
            />
          </div>
        )}

        {/* 3. DAILY TRENDS RADAR */}
        {activeTab === 'trends' && (
          <TrendsBriefing
            onStartAnalysis={() => {
              setCurrentReport(null);
              setActiveTab('analyze');
            }}
          />
        )}

        {/* 4. UNIVERSAL AI FASHION ASSISTANT */}
        {activeTab === 'assistant' && (
          <div className="max-w-5xl mx-auto px-4 py-6">
            <UniversalAIAssistant />
          </div>
        )}

        {/* 5. WARDROBE GALLERY */}
        {activeTab === 'wardrobe' && (
          <WardrobeGallery
            outfits={savedOutfits}
            onSelectOutfit={handleSelectOutfitFromWardrobe}
            onToggleFavorite={handleToggleFavorite}
            onDeleteOutfit={handleDeleteOutfit}
            onNewAnalysis={() => {
              setCurrentReport(null);
              setActiveTab('analyze');
            }}
          />
        )}

      </main>

      {/* Stylist Live Chat Drawer */}
      <StylistChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        outfit={currentReport}
      />

      {/* Floating Universal AI Assistant Pill */}
      {activeTab !== 'assistant' && (
        <aside aria-label="Asistente de Estilismo IA" className="fixed bottom-6 left-6 z-30">
          <button
            onClick={() => setActiveTab('assistant')}
            className="px-4 py-3 rounded-full bg-stone-900 hover:bg-black text-white text-xs font-bold shadow-2xl border border-white/20 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all group"
          >
            <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-xs">
              ✨
            </span>
            <span className="text-amber-100 group-hover:text-white">
              ¿Dudas? Pregunta a la IA
            </span>
          </button>
        </aside>
      )}

      {/* Footer */}
      <footer className="border-t border-stone-200/80 bg-white/70 backdrop-blur-md py-8 text-center text-xs text-stone-500 font-sans">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-2 text-stone-800 font-serif-luxury text-sm font-semibold tracking-widest uppercase">
            <span>ATELIER</span>
            <span>•</span>
            <span className="text-rose-600 font-bold">Haute Couture AI Stylist</span>
          </div>
          <p>
            Recomendaciones inteligentes de moda, colorimetría, clóset virtual y asesoría personalizada en tiempo real.
          </p>
        </div>
      </footer>

    </div>
  );
}
