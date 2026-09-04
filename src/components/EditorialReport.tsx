import React, { useState } from 'react';
import { 
  Sparkles, 
  Star, 
  Bookmark, 
  MessageSquare, 
  Share2, 
  Printer, 
  ArrowLeft, 
  CheckCircle2, 
  TrendingUp, 
  Palette, 
  Zap, 
  Layers, 
  ShoppingBag,
  ChevronRight,
  Copy,
  Check,
  BotMessageSquare
} from 'lucide-react';
import { OutfitAnalysisResult } from '../types';

interface EditorialReportProps {
  report: OutfitAnalysisResult;
  onBack: () => void;
  onToggleFavorite: (id: string) => void;
  onOpenChat: () => void;
  onOpenUniversalAssistant?: () => void;
}

export const EditorialReport: React.FC<EditorialReportProps> = ({
  report,
  onBack,
  onToggleFavorite,
  onOpenChat,
  onOpenUniversalAssistant,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleFavoriteClick = () => {
    onToggleFavorite(report.id);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10 font-sans">
      
      {/* Top Action Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-100 px-4 py-2 rounded-full border border-stone-200 transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-rose-600" />
          <span>Analizar otro atuendo</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleFavoriteClick}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm ${
              report.isFavorite
                ? 'bg-amber-100 text-amber-950 border border-amber-300'
                : 'bg-white hover:bg-stone-50 text-stone-800 border border-stone-200'
            }`}
          >
            <Star className={`w-4 h-4 ${report.isFavorite ? 'fill-amber-500 text-amber-500' : 'text-stone-400'}`} />
            <span>{report.isFavorite ? 'En Mi Armario' : 'Guardar Look'}</span>
          </button>

          <button
            onClick={onOpenChat}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-600/20 transition-all"
          >
            <MessageSquare className="w-4 h-4 text-amber-200" />
            <span>Preguntar al Estilista</span>
          </button>

          {onOpenUniversalAssistant && (
            <button
              onClick={onOpenUniversalAssistant}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-700 to-rose-600 text-white hover:opacity-90 shadow-sm transition-all"
            >
              <BotMessageSquare className="w-4 h-4" />
              <span>Asistente IA</span>
            </button>
          )}

          <button
            onClick={handlePrint}
            title="Imprimir o guardar como PDF"
            className="p-2 rounded-full bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Editorial Presentation Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-rose-600 to-amber-600 text-white text-xs font-bold tracking-widest uppercase shadow-md shadow-rose-600/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          <span>Diagnóstico de Atelier • Alta Costura</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-stone-900 tracking-tight leading-tight">
          {report.editorialTitle}
        </h1>

        <blockquote className="text-base sm:text-xl italic font-serif-luxury text-stone-700 max-w-2xl mx-auto border-y border-stone-200 py-3">
          "{report.vibeQuote}"
        </blockquote>

        {/* Context metadata tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-medium text-stone-600">
          <span className="px-3 py-1 rounded-full bg-white border border-stone-200 shadow-sm">
            📍 Ocasión: <strong className="text-stone-900 font-semibold">{report.occasion}</strong>
          </span>
          <span className="px-3 py-1 rounded-full bg-white border border-stone-200 shadow-sm">
            🌤️ Clima: <strong className="text-stone-900 font-semibold">{report.weather}</strong>
          </span>
          <span className="px-3 py-1 rounded-full bg-white border border-stone-200 shadow-sm">
            🎯 Meta: <strong className="text-stone-900 font-semibold">{report.styleGoal}</strong>
          </span>
        </div>
      </div>

      {/* Main Analysis Section: Image + Harmony Verdict */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Visual Outfit Display & Score */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-4 sm:p-5 editorial-border editorial-shadow relative group">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-stone-100 relative shadow-inner">
              <img
                src={report.imageUrl}
                alt={report.editorialTitle}
                className="w-full h-full object-cover"
              />

              {/* Score Badge */}
              <div className="absolute top-3 right-3 bg-gradient-to-r from-rose-600 to-amber-500 text-white rounded-2xl px-3.5 py-2 shadow-xl border border-white/30 backdrop-blur-md flex items-center gap-2">
                <div className="text-2xl font-serif-luxury font-bold">{report.harmonyScore}</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold opacity-90 leading-tight">
                  Armonía<br />Visual
                </div>
              </div>
            </div>

            {/* Quick Stylist Transform Feature */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-rose-50 to-amber-50 border border-amber-200/80">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider mb-1">
                <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>El Truco del Estilista (30 Segundos):</span>
              </div>
              <p className="text-xs text-stone-800 leading-relaxed font-sans">
                {report.quickStylistTransform}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Harmony Verdict & Strengths */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 editorial-border editorial-shadow space-y-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md">
                Evaluación de Silueta & Proporciones
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-stone-900 mt-2">
                Equilibrio & Presencia Visual
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
              {report.harmonyVerdict}
            </p>

            <div className="pt-3 border-t border-stone-100 space-y-2.5">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Puntos Fuertes del Atuendo:</span>
              </h4>
              <ul className="space-y-2">
                {report.keyStrengths.map((strength, idx) => (
                  <li key={idx} className="text-xs text-stone-600 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Color Palette Extraction */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 editorial-border editorial-shadow space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                  Colorimetría Editorial
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-stone-900 mt-2">
                  Paleta Cromática Extraída
                </h3>
              </div>
              <Palette className="w-5 h-5 text-stone-400" />
            </div>

            {/* Color Swatches Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {report.colorPalette.map((color, idx) => (
                <div
                  key={idx}
                  onClick={() => copyColor(color.hex)}
                  className="cursor-pointer group rounded-2xl p-2.5 border border-stone-200 hover:border-rose-400 transition-all bg-stone-50/50 hover:bg-stone-50"
                  title="Haz clic para copiar el código HEX"
                >
                  <div
                    className="w-full aspect-square rounded-xl shadow-inner mb-2 transition-transform group-hover:scale-105 border border-black/5"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="text-xs font-bold text-stone-900 truncate">
                    {color.name}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-stone-500 mt-0.5">
                    <span className="font-mono uppercase">{color.hex}</span>
                    <span className="text-[10px] font-semibold">{color.percentage}%</span>
                  </div>
                  {copiedHex === color.hex && (
                    <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                      <Check className="w-3 h-3" />
                      <span>Copiado</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="text-xs text-stone-600 leading-relaxed font-sans bg-stone-50 p-3 rounded-xl border border-stone-100">
              {report.colorHarmonyAnalysis}
            </p>
          </div>

          {/* Detected Garments Breakdown */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 editorial-border editorial-shadow space-y-4">
            <h3 className="font-serif-luxury text-xl font-bold text-stone-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-stone-700" />
              <span>Desglose de Prendas en la Silueta</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {report.detectedPieces.map((piece, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-stone-50/80 border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                    {piece.category}
                  </span>
                  <div className="text-xs font-bold text-stone-900">{piece.description}</div>
                  <div className="text-[11px] text-stone-500 leading-snug">{piece.roleInLook}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Haute Couture Recommendations (Tendencias) */}
      <div className="space-y-6 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Asesoría de Estilismo & Tendencias</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-stone-900">
            Propuestas para Elevar este Atuendo
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Ajustes hiper-precisos de calzado, accesorios y capas alineados con la pasarela mundial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {report.stylingRecommendations.map((rec, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 editorial-border editorial-shadow flex flex-col justify-between space-y-4 hover:border-rose-300 transition-all"
            >
              <div className="space-y-3">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-sm">
                  {rec.trendTag}
                </span>
                <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                  {rec.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {rec.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <div className="text-[11px] font-bold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-rose-600" />
                  <span>Piezas Sugeridas:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {rec.suggestedItems.map((item, itemIdx) => (
                    <span
                      key={itemIdx}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 text-[11px] font-medium border border-stone-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alternative Re-Styling Looks */}
      {report.alternativeCombinations && report.alternativeCombinations.length > 0 && (
        <div className="bg-gradient-to-br from-white via-rose-50/20 to-amber-50/20 rounded-3xl p-6 sm:p-8 editorial-border editorial-shadow space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-stone-900 text-amber-200 flex items-center justify-center font-bold text-xs">
              ✨
            </div>
            <div>
              <h3 className="font-serif-luxury text-2xl font-bold text-stone-900">
                Cómo Re-Estilizar estas Mismas Prendas
              </h3>
              <p className="text-xs text-stone-500">
                Aprovecha al máximo tu guardarropa transformando las piezas clave para otros momentos.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.alternativeCombinations.map((alt, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-1.5">
                <div className="text-xs font-bold text-rose-700 uppercase tracking-wider">
                  {alt.name}
                </div>
                <p className="text-xs text-stone-700 font-sans leading-relaxed">
                  {alt.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sticky Bottom Floating Stylist Trigger */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={onOpenChat}
          className="px-6 py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 text-white font-semibold text-xs sm:text-sm shadow-2xl shadow-rose-600/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
        >
          <MessageSquare className="w-4 h-4 text-amber-200" />
          <span>Consultar al Estilista de Atelier</span>
        </button>
      </div>

    </div>
  );
};
