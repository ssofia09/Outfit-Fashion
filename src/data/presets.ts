export interface PresetOutfit {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  occasion: string;
  weather: string;
  styleGoal: string;
  notes: string;
}

export const PRESET_OUTFITS: PresetOutfit[] = [
  {
    id: 'preset-quiet-luxury',
    name: 'Sastrería Minimalista & Lino',
    category: 'Oficina & Smart Casual',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    occasion: 'Oficina / Reunión Ejecutiva',
    weather: 'Templado / Primavera',
    styleGoal: 'Elevar con accesorios de lujo silencioso',
    notes: 'Quiero que se vea sofisticado sin parecer demasiado rígido para el día a día.',
  },
  {
    id: 'preset-casual-chic',
    name: 'Denim Relajado & Trench',
    category: 'Casual / Fin de Semana',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    occasion: 'Café & Paseo Urbano',
    weather: 'Fresco / Otoño',
    styleGoal: 'Comodidad chic y equilibrio de proporciones',
    notes: '¿Qué calzado y bolso le darían el toque final para no verse demasiado básico?',
  },
  {
    id: 'preset-night-elegance',
    name: 'Little Black Dress & Silueta',
    category: 'Cena & Noche',
    imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
    occasion: 'Cena de Gala / Coctel',
    weather: 'Templado / Noche',
    styleGoal: 'Aportar dramatismo y tendencia 2026',
    notes: 'Busco joyería o bolso que rompa la monocromía con clase.',
  },
  {
    id: 'preset-urban-streetwear',
    name: 'Oversized Blazer & Sneaker Pop',
    category: 'Streetwear Contemporáneo',
    imageUrl: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80',
    occasion: 'Evento Creativo / Galería',
    weather: 'Templado',
    styleGoal: 'Trendsetter vanguardista',
    notes: 'Me encanta mezclar sastrería masculina con toques urbanos.',
  },
];

export const OCCASION_OPTIONS = [
  { id: 'casual', label: 'Casual Diario', icon: 'Coffee', desc: 'Comodidad estética para el día a día' },
  { id: 'office', label: 'Oficina & Business', icon: 'Briefcase', desc: 'Smart casual profesional y pulido' },
  { id: 'date', label: 'Cita & Cena Romántica', icon: 'Heart', desc: 'Estilo magnético, elegante y cuidado' },
  { id: 'party', label: 'Fiesta & Coctel', icon: 'Sparkles', desc: 'Impacto visual, brillo y tendencia' },
  { id: 'formal', label: 'Gala & Evento Formal', icon: 'Crown', desc: 'Alta etiqueta, sofisticación atemporal' },
  { id: 'streetwear', label: 'Streetwear & Urbano', icon: 'Zap', desc: 'Vanguardia, siluetas amplias y actitud' },
  { id: 'vacation', label: 'Viaje & Escapada', icon: 'Sun', desc: 'Relajado, fresco y fotogénico' },
];

export const WEATHER_OPTIONS = [
  { id: 'temperate', label: 'Templado (18° - 24°C)', icon: 'CloudSun' },
  { id: 'warm', label: 'Cálido / Verano (+25°C)', icon: 'SunMedium' },
  { id: 'cool', label: 'Fresco / Otoño (12° - 17°C)', icon: 'Wind' },
  { id: 'cold', label: 'Frío / Invierno (<12°C)', icon: 'Snowflake' },
  { id: 'rainy', label: 'Lluvia & Humedad', icon: 'CloudRain' },
];

export const STYLE_GOAL_OPTIONS = [
  { id: 'elevate_accessories', label: 'Elevar con Joyería & Accesorios', desc: 'Transformar prendas básicas en un look de alto impacto' },
  { id: 'balance_silhouette', label: 'Equilibrar Proporciones & Silueta', desc: 'Mejorar armonía visual entre prendas superiores e inferiores' },
  { id: 'more_formal', label: 'Hacerlo más Elegante / Pulido', desc: 'Ajustes para un contexto más refinado o profesional' },
  { id: 'trendsetter_2026', label: 'Alinear con Tendencias 2026', desc: 'Incorporar micro-tendencias actuales (Quiet Luxury, Eclectic)' },
  { id: 'effortless_chic', label: 'Effortless Chic / Sin Esfuerzo', desc: 'Que se vea impecable de forma natural y cómoda' },
];
