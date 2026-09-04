export type OccasionType = 
  | 'casual'
  | 'office'
  | 'date'
  | 'party'
  | 'formal'
  | 'streetwear'
  | 'vacation';

export type WeatherType = 
  | 'temperate'
  | 'warm'
  | 'cool'
  | 'cold'
  | 'rainy';

export type StyleGoalType = 
  | 'elevate_accessories'
  | 'balance_silhouette'
  | 'more_formal'
  | 'effortless_chic'
  | 'trendsetter_2026';

export interface DetectedPiece {
  category: string;
  description: string;
  roleInLook: string;
}

export interface ColorSwatch {
  hex: string;
  name: string;
  percentage: number;
  role: 'base' | 'secondary' | 'accent';
}

export interface StylingRecommendation {
  type: 'accessory' | 'footwear' | 'layering' | 'tailoring' | 'trend';
  title: string;
  description: string;
  suggestedItems: string[];
  trendTag: string;
}

export interface AlternativeLook {
  name: string;
  description: string;
}

export interface OutfitAnalysisResult {
  id: string;
  timestamp: number;
  imageUrl: string;
  occasion: string;
  weather: string;
  styleGoal: string;
  editorialTitle: string;
  vibeQuote: string;
  harmonyScore: number;
  harmonyVerdict: string;
  detectedPieces: DetectedPiece[];
  colorPalette: ColorSwatch[];
  colorHarmonyAnalysis: string;
  keyStrengths: string[];
  stylingRecommendations: StylingRecommendation[];
  quickStylistTransform: string;
  alternativeCombinations: AlternativeLook[];
  isFavorite?: boolean;
}

export interface OutfitAnalysisRequest {
  imageBase64: string;
  mimeType: string;
  occasion: string;
  weather: string;
  styleGoal: string;
  customNotes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'stylist';
  text: string;
  timestamp: number;
}
