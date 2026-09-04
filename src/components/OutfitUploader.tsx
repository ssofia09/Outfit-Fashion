import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Camera, 
  Sparkles, 
  RefreshCw, 
  X, 
  Image as ImageIcon, 
  SlidersHorizontal, 
  HelpCircle, 
  Check, 
  ArrowRight,
  Sun,
  Coffee,
  Briefcase,
  Heart,
  Zap,
  Crown,
  Layers
} from 'lucide-react';
import { PRESET_OUTFITS, OCCASION_OPTIONS, WEATHER_OPTIONS, STYLE_GOAL_OPTIONS, PresetOutfit } from '../data/presets';
import { OutfitAnalysisRequest } from '../types';

interface OutfitUploaderProps {
  onAnalyze: (request: OutfitAnalysisRequest) => Promise<void>;
  isLoading: boolean;
  onSwitchToBuilder?: () => void;
}

export const OutfitUploader: React.FC<OutfitUploaderProps> = ({ onAnalyze, isLoading, onSwitchToBuilder }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  
  // Form Context States
  const [selectedOccasion, setSelectedOccasion] = useState<string>('casual');
  const [selectedWeather, setSelectedWeather] = useState<string>('temperate');
  const [selectedStyleGoal, setSelectedStyleGoal] = useState<string>('elevate_accessories');
  const [customNotes, setCustomNotes] = useState<string>('');
  
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [loadingStepText, setLoadingStepText] = useState<string>('Iniciando análisis...');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Cycle loading messages for chic UX during analysis
  React.useEffect(() => {
    if (!isLoading) return;
    const steps = [
      'Extrayendo armonía cromática y paleta tonal...',
      'Evaluando siluetas, caída de telas y proporciones...',
      'Cruzando con directrices de estilo y tendencias de pasarela...',
      'Formulando recomendaciones de accesorios y calzado...',
      'Redactando diagnóstico editorial de alta costura...',
    ];
    let index = 0;
    setLoadingStepText(steps[0]);
    const interval = setInterval(() => {
      index = (index + 1) % steps.length;
      setLoadingStepText(steps[index]);
    }, 2400);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Handle Drag & Drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (JPG, PNG, WEBP).');
      return;
    }
    setMimeType(file.type);
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Preset Selection
  const applyPreset = async (preset: PresetOutfit) => {
    setSelectedOccasion(
      preset.id === 'preset-night-elegance' 
        ? 'party' 
        : preset.id === 'preset-quiet-luxury' 
        ? 'office' 
        : preset.id === 'preset-urban-streetwear' 
        ? 'streetwear' 
        : 'casual'
    );
    setSelectedWeather(preset.id === 'preset-casual-chic' ? 'cool' : 'temperate');
    setSelectedStyleGoal(
      preset.id === 'preset-night-elegance' 
        ? 'trendsetter_2026' 
        : preset.id === 'preset-urban-streetwear' 
        ? 'balance_silhouette' 
        : 'elevate_accessories'
    );
    setCustomNotes(preset.notes);

    // Direct Image URL or Data URL
    setSelectedImage(preset.imageUrl);
    setMimeType('image/jpeg');
  };

  // Camera handling
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1080 }, height: { ideal: 1440 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Camera access error:', err);
      alert('No se pudo acceder a la cámara. Revisa los permisos de tu navegador.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 720;
    canvas.height = videoRef.current.videoHeight || 960;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setSelectedImage(dataUrl);
      setMimeType('image/jpeg');
      stopCamera();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) return;

    const occasionObj = OCCASION_OPTIONS.find((o) => o.id === selectedOccasion);
    const weatherObj = WEATHER_OPTIONS.find((w) => w.id === selectedWeather);
    const goalObj = STYLE_GOAL_OPTIONS.find((g) => g.id === selectedStyleGoal);

    onAnalyze({
      imageBase64: selectedImage,
      mimeType: mimeType,
      occasion: occasionObj?.label || selectedOccasion,
      weather: weatherObj?.label || selectedWeather,
      styleGoal: goalObj?.label || selectedStyleGoal,
      customNotes: customNotes.trim() || undefined,
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      
      {/* Top Switcher Banner (Option to build from virtual closet) */}
      {onSwitchToBuilder && (
        <div className="bg-gradient-to-r from-rose-600 via-amber-500 to-violet-700 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-lg shrink-0">
              👗
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-100">
                Nueva Alternativa de Atelier
              </div>
              <div className="font-serif-luxury text-lg sm:text-xl font-bold">
                ¿No tienes una foto a mano? Arma tu look con ropa de la app
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onSwitchToBuilder}
            className="px-5 py-2.5 rounded-full bg-white text-stone-900 font-bold text-xs sm:text-sm hover:bg-amber-100 transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 shrink-0 self-start sm:self-auto shadow-md"
          >
            <Layers className="w-4 h-4 text-rose-600" />
            <span>Armar Look con Prendas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Title & Introduction */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold tracking-widest uppercase shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-rose-600" />
          <span>Atelier Consultation 2026</span>
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif-luxury font-bold text-stone-900 tracking-tight">
          Diagnóstico de Outfit & Asesoría
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto font-sans leading-relaxed">
          Sube tu fotografía, elige la ocasión y recibe un reporte de colorimetría, equilibrio de silueta y sugerencias de alta costura.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* Step 1: Photo Upload / Camera / Presets */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 editorial-border editorial-shadow space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-gradient-chic text-white text-xs font-bold flex items-center justify-center shadow-md">
                1
              </span>
              <h2 className="text-2xl font-serif-luxury font-bold text-stone-900">
                Tu Fotografía de Outfit
              </h2>
            </div>
            {selectedImage && (
              <button
                type="button"
                onClick={() => {
                  setSelectedImage(null);
                  stopCamera();
                }}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Cambiar foto</span>
              </button>
            )}
          </div>

          {/* Camera View */}
          {isCameraActive && (
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-[3/4] max-w-md mx-auto shadow-2xl border-4 border-rose-500">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="px-6 py-3 rounded-full bg-rose-600 text-white font-bold text-sm shadow-xl hover:bg-rose-500 transition-all flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Capturar Look</span>
                </button>
                <button
                  type="button"
                  onClick={stopCamera}
                  className="px-4 py-3 rounded-full bg-white/80 backdrop-blur-md text-stone-900 text-sm font-semibold hover:bg-white"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Dropzone & Preview */}
          {!isCameraActive && (
            <>
              {selectedImage ? (
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-sm mx-auto shadow-xl border border-stone-200 group bg-stone-100">
                  <img src={selectedImage} alt="Outfit preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="p-3 rounded-full bg-white text-rose-600 hover:bg-rose-50 transition-colors shadow-lg"
                      title="Eliminar foto"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all ${
                    dragActive
                      ? 'border-rose-600 bg-rose-50/50 scale-[0.99]'
                      : 'border-stone-300 hover:border-rose-400 bg-stone-50/60'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-500/20">
                    <Upload className="w-7 h-7" />
                  </div>

                  <h3 className="font-serif-luxury text-2xl font-bold text-stone-900 mb-2">
                    Arrastra aquí tu fotografía o súbela
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto mb-6">
                    Soporta imágenes de cuerpo entero o medio cuerpo en formato JPG, PNG o WEBP.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-rose-600/30 transition-all flex items-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>Seleccionar Archivo</span>
                    </button>
                    <button
                      type="button"
                      onClick={startCamera}
                      className="px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-amber-100 text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center gap-2"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Tomar con Cámara</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Preset Demos */}
          {!selectedImage && !isCameraActive && (
            <div className="pt-4 border-t border-stone-100">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
                O prueba al instante con un look de muestra:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PRESET_OUTFITS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className="text-left rounded-xl p-2 border border-stone-200 hover:border-rose-500 bg-stone-50 hover:bg-rose-50/40 transition-all group"
                  >
                    <div className="aspect-[3/4] rounded-lg overflow-hidden mb-2 bg-stone-200">
                      <img
                        src={preset.imageUrl}
                        alt={preset.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="text-xs font-bold text-stone-900 line-clamp-1 group-hover:text-rose-600">
                      {preset.name}
                    </div>
                    <div className="text-[10px] text-stone-500">{preset.category}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Context Selection */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 editorial-border editorial-shadow space-y-8">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-gradient-chic text-white text-xs font-bold flex items-center justify-center shadow-md">
              2
            </span>
            <h2 className="text-2xl font-serif-luxury font-bold text-stone-900">
              Contexto del Look & Ocasión
            </h2>
          </div>

          {/* Occasion */}
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
              ¿Para qué ocasión es el atuendo?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {OCCASION_OPTIONS.map((occ) => (
                <button
                  key={occ.id}
                  type="button"
                  onClick={() => setSelectedOccasion(occ.id)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    selectedOccasion === occ.id
                      ? 'border-rose-600 bg-rose-50/60 ring-1 ring-rose-600 text-stone-900 font-semibold'
                      : 'border-stone-200 hover:border-stone-300 bg-stone-50/50 text-stone-700'
                  }`}
                >
                  <div className="text-xs font-bold">{occ.label}</div>
                  <div className="text-[10px] text-stone-500 mt-0.5 line-clamp-1">{occ.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Weather */}
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
              Clima / Temperatura estimada
            </label>
            <div className="flex flex-wrap gap-2">
              {WEATHER_OPTIONS.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setSelectedWeather(w.id)}
                  className={`px-3.5 py-2 rounded-full text-xs font-medium border transition-all ${
                    selectedWeather === w.id
                      ? 'border-rose-600 bg-rose-600 text-white shadow-sm'
                      : 'border-stone-200 hover:border-stone-300 bg-stone-50 text-stone-700'
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          {/* Style Goal */}
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
              ¿Cuál es tu meta principal de estilo?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {STYLE_GOAL_OPTIONS.map((goal) => (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => setSelectedStyleGoal(goal.id)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    selectedStyleGoal === goal.id
                      ? 'border-rose-600 bg-rose-50/60 ring-1 ring-rose-600 text-stone-900 font-semibold'
                      : 'border-stone-200 hover:border-stone-300 bg-stone-50/50 text-stone-700'
                  }`}
                >
                  <div className="text-xs font-bold">{goal.label}</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">{goal.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Notes */}
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
              Notas o dudas adicionales (Opcional)
            </label>
            <input
              type="text"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="Ej: ¿Qué zapatos combinan mejor? ¿Debería agregar cinturón o cambiar el bolso?"
              className="w-full px-4 py-3 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-stone-900"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-2">
          <button
            type="submit"
            disabled={!selectedImage || isLoading}
            className={`px-10 py-4 rounded-full font-serif-luxury text-xl font-bold shadow-2xl transition-all flex items-center gap-3 mx-auto ${
              !selectedImage || isLoading
                ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-rose-600 via-amber-500 to-violet-700 text-white hover:scale-105 active:scale-95 shadow-rose-600/30'
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>{loadingStepText}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generar Diagnóstico de Estilismo</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
