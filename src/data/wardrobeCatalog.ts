export interface CatalogItem {
  id: string;
  category: 'tops' | 'bottoms' | 'footwear' | 'accessories';
  name: string;
  colorName: string;
  hex: string;
  styleTag: string;
  imageUrl: string;
  description: string;
}

export const WARDROBE_CATALOG: CatalogItem[] = [
  // --- PRENDAS SUPERIORES (TOPS & JACKETS) ---
  {
    id: 'top-blazer-camel',
    category: 'tops',
    name: 'Blazer Sastre Desestructurado',
    colorName: 'Lino Camel',
    hex: '#D7C4B0',
    styleTag: 'Quiet Luxury',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80',
    description: 'Corte fluido en lana fría y lino con hombreras suaves y caída natural.'
  },
  {
    id: 'top-silk-shirt',
    category: 'tops',
    name: 'Camisa de Seda Pura Cuello Fluido',
    colorName: 'Blanco Marfil',
    hex: '#F8F6F0',
    styleTag: 'Minimalismo 90s',
    imageUrl: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80',
    description: 'Satén de seda con botones de nácar y puños franceses extra largos.'
  },
  {
    id: 'top-red-knit',
    category: 'tops',
    name: 'Suéter de Cachemira Rojo Rubí',
    colorName: 'Rojo Escarlata',
    hex: '#DC2626',
    styleTag: 'Pop of Red 2026',
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80',
    description: 'Punto fino con cuello redondo y textura esponjosa de alto impacto cromático.'
  },
  {
    id: 'top-corset-noir',
    category: 'tops',
    name: 'Corset Estructurado con Ballenas',
    colorName: 'Negro Azabache',
    hex: '#18181B',
    styleTag: 'Modern Tailoring',
    imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80',
    description: 'Acentúa la cintura con escote corazón y acabado mate aterciopelado.'
  },
  {
    id: 'top-trench-classic',
    category: 'tops',
    name: 'Trench Coat Clásico Oversized',
    colorName: 'Arena Tostada',
    hex: '#C2B29E',
    styleTag: 'Atemporal Brit',
    imageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80',
    description: 'Gabardina de algodón impermeable con cinturón de doble hebilla y solapas amplias.'
  },
  {
    id: 'top-emerald-vest',
    category: 'tops',
    name: 'Chaleco Sastre Esmeralda',
    colorName: 'Verde Esmeralda',
    hex: '#047857',
    styleTag: 'Eclectic Chic',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    description: 'Pieza de sastrería entallada para llevar en solitario o sobre camisas.'
  },

  // --- PRENDAS INFERIORES (BOTTOMS) ---
  {
    id: 'bottom-wide-leg-cream',
    category: 'bottoms',
    name: 'Pantalón Wide-Leg con Pinzas',
    colorName: 'Crudo Vainilla',
    hex: '#EDE8DF',
    styleTag: 'Quiet Luxury',
    imageUrl: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=600&q=80',
    description: 'Tiro alto con caída amplia y pliegues pronunciados que alargan la figura.'
  },
  {
    id: 'bottom-jeans-indigo',
    category: 'bottoms',
    name: 'Jeans Rectos Vintage Tiro Alto',
    colorName: 'Azul Índigo Lavado',
    hex: '#2563EB',
    styleTag: 'Effortless Chic',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80',
    description: 'Denim rígido 100% algodón orgánico con corte recto clásico de los 90.'
  },
  {
    id: 'bottom-skirt-pleated',
    category: 'bottoms',
    name: 'Falda Midi Satinada Plisada',
    colorName: 'Verde Oliva Profundo',
    hex: '#3F6212',
    styleTag: 'Balletcore Urbano',
    imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=600&q=80',
    description: 'Movimiento fluido con brillo sutil que baila con cada paso.'
  },
  {
    id: 'bottom-trousers-noir',
    category: 'bottoms',
    name: 'Pantalón Cigarrette Sastre',
    colorName: 'Negro Ónix',
    hex: '#111827',
    styleTag: 'Alta Costura',
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80',
    description: 'Corte tobillero ajustado con raya marcada y bolsillos italianos.'
  },
  {
    id: 'bottom-bermuda-linen',
    category: 'bottoms',
    name: 'Bermuda Sastre de Lino',
    colorName: 'Beige Neutro',
    hex: '#E5E0D8',
    styleTag: 'Resort Chic',
    imageUrl: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=600&q=80',
    description: 'Largo justo sobre la rodilla con pinzas frontales y cinturilla limpia.'
  },

  // --- CALZADO (FOOTWEAR) ---
  {
    id: 'shoe-kitten-red',
    category: 'footwear',
    name: 'Kitten Heels Escarlata en Punta',
    colorName: 'Rojo Carmesí',
    hex: '#BE123C',
    styleTag: 'Tendencia 2026',
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
    description: 'Tacón bajo arquitectónico de 4 cm con acabado brillante y punta estilizada.'
  },
  {
    id: 'shoe-loafers-chunky',
    category: 'footwear',
    name: 'Mocasines Chunky con Hebilla Dorada',
    colorName: 'Negro Piel Pulida',
    hex: '#1E1B18',
    styleTag: 'Modern Prep',
    imageUrl: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80',
    description: 'Suela con volumen y herraje ecuestre en oro pulido para contrastar looks fluidos.'
  },
  {
    id: 'shoe-sneakers-retro',
    category: 'footwear',
    name: 'Sneakers Retro Gamuza & Piel',
    colorName: 'Gris Perla & Verde Salvia',
    hex: '#64748B',
    styleTag: 'Streetwear Sofisticado',
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80',
    description: 'Silueta baja inspirada en el calzado de atletismo de los 70.'
  },
  {
    id: 'shoe-boots-cowboy',
    category: 'footwear',
    name: 'Botines de Piel Estilo Western',
    colorName: 'Caramelo Quemado',
    hex: '#9A3412',
    styleTag: 'Eclectic Chic',
    imageUrl: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=600&q=80',
    description: 'Bordados tonales con puntera cuadrada fina y tacón cubano cómodo.'
  },
  {
    id: 'shoe-strappy-gold',
    category: 'footwear',
    name: 'Sandalias Minimalistas de Tiras Finas',
    colorName: 'Oro Metálico',
    hex: '#EAB308',
    styleTag: 'Noche & Gala',
    imageUrl: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=600&q=80',
    description: 'Tiras casi invisibles que sujetan el pie con ligereza escultórica.'
  },

  // --- ACCESORIOS & JOYERÍA (ACCESSORIES) ---
  {
    id: 'acc-baguette-cherry',
    category: 'accessories',
    name: 'Bolso Baguette Estructurado',
    colorName: 'Borgoña Cereza',
    hex: '#881337',
    styleTag: 'It-Bag 2026',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
    description: 'Piel con efecto coco pulido, asa corta al hombro y cierre magnético dorado.'
  },
  {
    id: 'acc-choker-gold',
    category: 'accessories',
    name: 'Gargantilla Choker Rígida Escultural',
    colorName: 'Oro Amarillo 18k',
    hex: '#F59E0B',
    styleTag: 'Statement Piece',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    description: 'Curvatura ergonómica que se posa sobre la clavícula aportando brillo instantáneo.'
  },
  {
    id: 'acc-sunglasses-cateye',
    category: 'accessories',
    name: 'Gafas de Sol Cat-Eye Vintage',
    colorName: 'Carey Ámbar',
    hex: '#78350F',
    styleTag: 'Old Hollywood',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
    description: 'Montura gruesa de acetato italiano con cristales degradados en tono café.'
  },
  {
    id: 'acc-scarf-silk',
    category: 'accessories',
    name: 'Pañuelo Carré de Seda Estampada',
    colorName: 'Multicolor Joya',
    hex: '#4F46E5',
    styleTag: 'Toque Francés',
    imageUrl: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=600&q=80',
    description: 'Seda satinada de 90x90 cm para anudar al cuello, al bolso o en el cabello.'
  },
  {
    id: 'acc-belt-leather',
    category: 'accessories',
    name: 'Cinturón de Piel con Hebilla Dorada',
    colorName: 'Negro & Oro',
    hex: '#27272A',
    styleTag: 'Esencial Silueta',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    description: 'Anchura media de 3 cm ideal para marcar la cintura en blazers y pantalones wide-leg.'
  }
];
