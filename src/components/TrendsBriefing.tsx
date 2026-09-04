import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowUpRight, 
  Compass, 
  RefreshCw, 
  Calendar, 
  Flame, 
  TrendingUp, 
  Palette,
  CheckCircle2
} from 'lucide-react';

interface TrendsBriefingProps {
  onStartAnalysis: () => void;
}

export const TrendsBriefing: React.FC<TrendsBriefingProps> = ({ onStartAnalysis }) => {
  const [currentDateFormatted, setCurrentDateFormatted] = useState<string>('');
  const [dailyInsight, setDailyInsight] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [activeSeason, setActiveSeason] = useState<string>('Temporada Actual 2026');

  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    // Capitalize first letter
    setCurrentDateFormatted(formatted.charAt(0).toUpperCase() + formatted.slice(1));
    fetchDailyTrends();
  }, []);

  const fetchDailyTrends = async () => {
    setIsRefreshing(true);
    try {
      const resp = await fetch('/api/daily-trends');
      const data = await resp.json();
      if (data.dailyInsight) {
        setDailyInsight(data.dailyInsight);
      }
    } catch (e) {
      console.warn('Error loading daily trends:', e);
      setDailyInsight(
        'Hoy la tendencia destaca el "Lujo Relajado": blazers fluidos de lana fría con toques escarlata en accesorios o calzado en punta.'
      );
    } finally {
      setIsRefreshing(false);
    }
  };

  const EDITORIAL_TRENDS = [
    {
      title: 'Pop of Red & Acento Escarlata',
      tag: '🔥 Tendencia Viral de Hoy',
      vibe: 'Impacto Visual Sofisticado',
      description: 'Romper atuendos totalmente neutros o monocromáticos mediante un único accesorio de color rojo cereza, rubí o borgoña profundo (bolso, kitten heels, labios o calcetines visibles).',
      keyPieces: ['Bolso baguette rojo cereza', 'Kitten heels escarlata', 'Labial mate granate', 'Gafas de sol cat-eye'],
      quote: 'Un 5% de audacia cromática transforma el 95% de un look neutro.',
      palette: ['#DC2626', '#881337', '#18181B', '#FAF8F5'],
      badgeColor: 'bg-rose-600 text-white',
    },
    {
      title: 'Quiet Luxury & Sastrería Desestructurada',
      tag: '✨ Silueta Clásica Reinvención',
      vibe: 'Atemporal & Lujo Silencioso',
      description: 'Prendas con cortes impecables en lino, lana fría y cachemira en paletas neutras (beige, camel, marfil y marino). La clave está en la ausencia de logos y el protagonismo de las texturas.',
      keyPieces: ['Pantalón sastre wide-leg con pinzas', 'Blazer oversize fluido', 'Mocasines de piel suave', 'Cinturón fino de piel'],
      quote: 'El verdadero lujo no grita; susurra a través del corte, la caída y la costura.',
      palette: ['#D7C4B0', '#EDE8DF', '#18181B', '#F59E0B'],
      badgeColor: 'bg-amber-600 text-white',
    },
    {
      title: 'Minimalismo 90s & Líneas Líquidas',
      tag: '🌙 Elegancia Nocturna',
      vibe: 'Silueta Depurada & Movimiento',
      description: 'Siluetas rectas inspiradas en los archivos noventeros de Helmut Lang y Calvin Klein: faldas midi satinadas, tops halter y joyería escultural en oro pulido.',
      keyPieces: ['Falda midi plisada de satén', 'Top de cuello halter', 'Pendientes de gota escultóricos', 'Sandalias minimalistas'],
      quote: 'Menos elementos, máxima precisión en la caída y el movimiento del tejido.',
      palette: ['#F8F6F0', '#3F6212', '#EAB308', '#27272A'],
      badgeColor: 'bg-emerald-700 text-white',
    },
    {
      title: 'Eclectic Chic & Tailoring Urbano',
      tag: '⚡ Estilo Streetwear Cosmopolita',
      vibe: 'Contraste Formal / Informal',
      description: 'Mezcla deliberada de códigos formales e informales: un blazer cruzado con jeans vintage rectos, gorra deportiva y zapatillas retro.',
      keyPieces: ['Blazer tweed oversized', 'Jeans rectos azul índigo', 'Gorra de pana bordada', 'Sneakers retro chic'],
      quote: 'La maestría de mezclar la seriedad de la sastrería con la frescura de la calle.',
      palette: ['#2563EB', '#D97706', '#1E293B', '#F3F4F6'],
      badgeColor: 'bg-indigo-600 text-white',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 font-sans">
      
      {/* Live Daily Radar Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-amber-600 to-violet-700 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-amber-100">
              <Calendar className="w-3.5 h-3.5" />
              <span>Edición Diaria Actualizada: {currentDateFormatted || 'Cargando fecha...'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold leading-tight">
              Radar de Moda en Tiempo Real
            </h1>

            <p className="text-xs sm:text-base text-rose-100 max-w-2xl leading-relaxed">
              Información viva y actualizada sobre lo que está marcando pauta hoy en desfiles, pasarelas y street style mundial.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchDailyTrends}
            disabled={isRefreshing}
            className="px-6 py-3.5 rounded-full bg-white text-stone-900 font-serif-luxury font-bold text-sm shadow-xl hover:bg-amber-100 transition-transform hover:scale-105 active:scale-95 flex items-center gap-2.5 shrink-0 self-start md:self-center"
          >
            <RefreshCw className={`w-4 h-4 text-rose-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Actualizando...' : 'Actualizar Tendencias Hoy'}</span>
          </button>
        </div>

        {/* Live Daily Insight Box */}
        {dailyInsight && (
          <div className="mt-8 p-5 rounded-2xl bg-black/25 backdrop-blur-md border border-white/20 text-xs sm:text-sm text-white/95 leading-relaxed whitespace-pre-line">
            <div className="flex items-center gap-2 text-amber-200 font-bold uppercase tracking-wider text-xs mb-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Boletín de Alta Costura del Día</span>
            </div>
            {dailyInsight}
          </div>
        )}
      </div>

      {/* Grid of Dynamic Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {EDITORIAL_TRENDS.map((trend, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 sm:p-8 editorial-border editorial-shadow editorial-card-hover flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm ${trend.badgeColor}`}>
                  {trend.tag}
                </span>

                {/* Color Palette preview */}
                <div className="flex items-center gap-1.5">
                  {trend.palette.map((color, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full border border-black/10 shadow-inner"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <h2 className="text-2xl font-serif-luxury font-bold text-stone-900">
                {trend.title}
              </h2>

              <blockquote className="text-xs sm:text-sm italic font-serif-luxury text-stone-600 bg-stone-50 p-3.5 rounded-xl border border-stone-200/70">
                "{trend.quote}"
              </blockquote>

              <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
                {trend.description}
              </p>
            </div>

            {/* Key Pieces */}
            <div className="pt-4 border-t border-stone-100">
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-600" />
                <span>Prendas & Accesorios Clave:</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {trend.keyPieces.map((piece, pieceIdx) => (
                  <span
                    key={pieceIdx}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 text-xs font-medium border border-stone-200"
                  >
                    {piece}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-stone-100 rounded-3xl p-8 sm:p-12 text-center space-y-6 max-w-4xl mx-auto shadow-2xl border border-amber-400/20">
        <div className="w-14 h-14 rounded-full bg-gradient-chic text-white flex items-center justify-center mx-auto shadow-lg">
          <Sparkles className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-amber-100">
            ¿Cómo adaptar estas tendencias a tu propio cuerpo y clóset?
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto">
            Sube tu foto o arma un outfit con las prendas de la app y nuestro motor de IA te dirá qué complementos añadir hoy.
          </p>
        </div>
        <button
          onClick={onStartAnalysis}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600 hover:from-rose-500 hover:to-amber-400 text-white font-serif-luxury text-lg font-bold shadow-xl shadow-rose-600/30 transition-transform hover:scale-105"
        >
          Evaluar mi Outfit con Estas Tendencias
        </button>
      </div>

    </div>
  );
};
