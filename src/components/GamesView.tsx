import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  Sparkles, 
  ArrowLeft, 
  Trophy, 
  Maximize2, 
  Minimize2, 
  Play, 
  CheckCircle, 
  X, 
  Star,
  Layers,
  ChevronRight
} from 'lucide-react';
import { GAMES_REGISTRY, GameItem } from '../data/gamesData';
import { DigitalIdentityGame } from './DigitalIdentityGame';
import { BilisimKahramaniGame } from './BilisimKahramaniGame';

interface GamesViewProps {
  onBackToHome?: () => void;
  initialGameId?: string | null;
}

export const GamesView: React.FC<GamesViewProps> = ({
  onBackToHome,
  initialGameId
}) => {
  // If an initialGameId is passed or selected, that game is opened in full screen player modal
  const [activeFullscreenGameId, setActiveFullscreenGameId] = useState<string | null>(initialGameId || null);

  // Sync when initialGameId prop changes (e.g. from Sidebar dropdown)
  useEffect(() => {
    if (initialGameId) {
      setActiveFullscreenGameId(initialGameId);
    }
  }, [initialGameId]);

  // Lock body scroll when fullscreen modal is active
  useEffect(() => {
    if (activeFullscreenGameId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeFullscreenGameId]);

  const activeGameItem = GAMES_REGISTRY.find(g => g.id === activeFullscreenGameId);

  return (
    <div className="space-y-6">
      
      {/* 1. Üst Başlık & Bilgilendirme */}
      <div className="bg-white/95 backdrop-blur-xs border-2 border-pink-200/90 rounded-3xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-purple-900 bg-gradient-to-r from-pink-100 to-blue-100 border border-pink-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5 text-[#EC4899]" />
                <span>Eğitsel Oyun Merkezi &bull; 5. Sınıf BTY</span>
              </span>
              <span className="text-xs font-bold text-slate-500 hidden sm:inline">
                Hilal KURTOĞLU Ders Oyunları
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2 flex items-center gap-2">
              <span>🎮 Bilişim Eğitici Oyun Alanı</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Tüm oyunlar aşağıda alt alta listelenmiştir. Oynamak istediğiniz oyunun üzerine tıklayarak ya da 
              <strong> &ldquo;Oyunu Tam Ekran Başlat&rdquo;</strong> butonuna basarak tam ekran modunda açabilirsiniz.
            </p>
          </div>

          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="self-start md:self-auto flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ana Sayfaya Dön</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. TÜM OYUNLAR ALT ALTA (STACKED CARDS) */}
      <div className="space-y-5">
        {GAMES_REGISTRY.map((game, index) => {
          const isTeal = game.accentColor === 'teal';

          return (
            <div
              key={game.id}
              className={`rounded-3xl border-2 transition-all duration-300 p-5 sm:p-7 shadow-xs hover:shadow-md ${
                isTeal 
                  ? 'bg-gradient-to-br from-slate-900 via-[#12263a] to-teal-950 border-teal-500/40 text-white' 
                  : 'bg-gradient-to-br from-slate-900 via-[#22123a] to-purple-950 border-pink-500/40 text-white'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Sol Kısım: İkon ve Bilgiler */}
                <div className="flex items-start gap-4 sm:gap-5 flex-1">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shrink-0 shadow-lg border ${
                    isTeal
                      ? 'bg-gradient-to-br from-teal-400 to-emerald-600 text-slate-950 border-teal-300/40'
                      : 'bg-gradient-to-br from-pink-500 to-purple-600 text-white border-pink-300/40'
                  }`}>
                    {game.icon}
                  </div>

                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${
                        isTeal 
                          ? 'bg-teal-400 text-slate-950' 
                          : 'bg-pink-400 text-slate-950'
                      }`}>
                        {game.weekTag}
                      </span>
                      <span className="text-xs font-semibold text-slate-300/80">
                        {game.subtitle}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                      {game.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                      {game.description}
                    </p>

                    {/* Özellik Maddeleri */}
                    <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {game.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-200">
                          <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${isTeal ? 'text-teal-400' : 'text-pink-400'}`} />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Etiketler */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {game.tags.map(t => (
                        <span 
                          key={t}
                          className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/10 text-slate-300 border border-white/10"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sağ Kısım: Tam Ekran Başlat Butonu */}
                <div className="lg:w-60 flex flex-col gap-2 shrink-0 border-t lg:border-t-0 lg:border-l border-white/15 pt-4 lg:pt-0 lg:pl-6">
                  <button
                    onClick={() => setActiveFullscreenGameId(game.id)}
                    className={`w-full py-3.5 px-5 rounded-2xl font-black text-sm flex items-center justify-center gap-2.5 shadow-lg transition-transform hover:scale-102 active:scale-98 cursor-pointer ${
                      isTeal
                        ? 'bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 text-slate-950 hover:opacity-95 shadow-teal-500/20'
                        : 'bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white hover:opacity-95 shadow-pink-500/20'
                    }`}
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Tam Ekran Oyna</span>
                    <Maximize2 className="w-3.5 h-3.5 ml-auto opacity-70" />
                  </button>

                  <div className="text-center text-[11px] text-slate-400 font-medium">
                    ⚡ Akıllı Tahta &amp; Tablet Uyumlu
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* 3. TAM EKRAN OYUN MODALI (FULLSCREEN PLAYER MODAL) */}
      {activeFullscreenGameId && activeGameItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
          
          {/* Modal Üst Çubuk (Top Bar) */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0 text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-400/20 text-teal-300 flex items-center justify-center text-lg">
                {activeGameItem.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-sm sm:text-base text-white">
                    {activeGameItem.title}
                  </h3>
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-black bg-teal-400 text-slate-950">
                    {activeGameItem.weekTag}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 hidden sm:block">
                  Hilal KURTOĞLU &bull; 5. Sınıf Bilişim Teknolojileri ve Yazılım
                </div>
              </div>
            </div>

            {/* Oyun Değiştirici ve Kapatma Butonu */}
            <div className="flex items-center gap-2">
              {/* Diğer oyuna hızlı geçiş */}
              <div className="hidden md:flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
                {GAMES_REGISTRY.map(g => (
                  <button
                    key={g.id}
                    onClick={() => setActiveFullscreenGameId(g.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      activeFullscreenGameId === g.id
                        ? 'bg-teal-400 text-slate-950 shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    <span>{g.icon}</span>
                    <span>{g.title}</span>
                  </button>
                ))}
              </div>

              {/* Kapat / Tam Ekrandan Çık Butonu */}
              <button
                onClick={() => setActiveFullscreenGameId(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-black transition cursor-pointer"
                title="Tam Ekrandan Çık"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Oyundan Çık</span>
                <X className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Modal Oyun Alanı (Scrollable / Full-Height Container) */}
          <div className="flex-1 overflow-y-auto p-2 sm:p-6 flex items-center justify-center">
            <div className="w-full max-w-5xl my-auto">
              {activeFullscreenGameId === 'dijital-kimlik' && (
                <DigitalIdentityGame onBackToHome={() => setActiveFullscreenGameId(null)} />
              )}

              {activeFullscreenGameId === 'bilisim-kahramani' && (
                <BilisimKahramaniGame onBackToHome={() => setActiveFullscreenGameId(null)} />
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
