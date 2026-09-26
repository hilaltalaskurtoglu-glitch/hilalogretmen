import React from 'react';
import { PlusCircle, Monitor, BookOpen, Gamepad2, Layers, Info, Menu, Sparkles, GraduationCap, Users, Megaphone, ClipboardList } from 'lucide-react';

interface HeaderBannerProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAddModal: () => void;
  smartboardMode: boolean;
  setSmartboardMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  onToggleSidebar?: () => void;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  activeTab,
  setActiveTab,
  onOpenAddModal,
  smartboardMode,
  setSmartboardMode,
  onToggleSidebar
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-pink-200/80 shadow-xs">
      {/* Top Utility Ribbon with Pink-to-Blue subtle gradient */}
      <div className="bg-gradient-to-r from-pink-50/90 via-purple-50/60 to-blue-50/90 border-b border-pink-100 px-4 sm:px-6 py-1.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-slate-700">
          <div className="flex items-center gap-2 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#EC4899] to-[#3B82F6] animate-pulse"></span>
            <span>Ahi Evran Ortaokulu &bull; 5. Sınıf Bilişim Teknolojileri ve Yazılım Dersi</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSmartboardMode(prev => !prev)}
              className={`px-3 py-1 rounded-full font-bold transition flex items-center gap-1.5 text-xs ${
                smartboardMode
                  ? 'bg-gradient-to-r from-[#EC4899] to-[#3B82F6] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-pink-50 border border-pink-200'
              }`}
              title="Yazıları büyütür ve akıllı tahta için dokunmatik butonları genişletir"
            >
              <Monitor className="w-3.5 h-3.5 text-[#EC4899]" />
              <span>{smartboardMode ? 'Akıllı Tahta: Açık' : 'Akıllı Tahta Modu'}</span>
            </button>

            <button
              onClick={onOpenAddModal}
              className="bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] hover:opacity-90 text-white px-3.5 py-1 rounded-full font-bold transition flex items-center gap-1.5 text-xs shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Materyal Yükle</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Brand Identity & Modest Teacher Credit */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Mobile menu button */}
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl bg-pink-50 text-purple-900 hover:bg-pink-100 border border-pink-200"
              aria-label="Menüyü Aç"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div
              onClick={() => setActiveTab('anasayfa')}
              className="cursor-pointer flex items-center gap-3 group"
            >
              <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full overflow-hidden shadow-sm border-2 border-pink-300 group-hover:scale-105 transition shrink-0 bg-pink-50 flex items-center justify-center">
                <img
                  src="/teacher_logo.png"
                  alt="Hilal KURTOĞLU Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                {/* Child-friendly, gradient title */}
                <h1 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight group-hover:opacity-90 transition flex items-center gap-1.5">
                  <span className="bg-gradient-to-r from-[#DB2777] via-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">Bilişim Dünyası</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-100 to-blue-100 text-purple-900 border border-pink-200">
                    5. Sınıf
                  </span>
                </h1>
                
                {/* Teacher name in modest, elegant proportion */}
                <div className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1.5 mt-0.5">
                  <span className="bg-gradient-to-r from-pink-50 to-blue-50 px-2 py-0.5 rounded-md border border-pink-200 text-purple-950 font-bold">
                    Hilal KURTOĞLU
                  </span>
                  <span className="text-[#EC4899]">&bull;</span>
                  <span className="text-slate-500 font-normal hidden sm:inline">Bilgisayar ve Öğretim Teknolojileri Öğretmeni</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Header Game Badge */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setActiveTab('oyunlar')}
              className={`px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center gap-2 border-2 ${
                activeTab === 'oyunlar'
                  ? 'bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] text-white border-transparent shadow-xs'
                  : 'bg-gradient-to-r from-pink-50 to-blue-50 text-purple-900 border-pink-200 hover:border-pink-300'
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-[#EC4899]" />
              <span>🎮 Bilişim Kahramanı Oyunu</span>
            </button>
          </div>

        </div>

        {/* Primary Navigation Tabs */}
        <nav className="mt-3 pt-2.5 border-t border-pink-100 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('anasayfa')}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'anasayfa'
                ? 'bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] text-white shadow-xs'
                : 'text-slate-700 hover:text-purple-700 hover:bg-pink-50/70'
            }`}
          >
            <span>🏠 Anasayfa</span>
          </button>

          <button
            onClick={() => setActiveTab('oyunlar')}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'oyunlar'
                ? 'bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] text-white shadow-xs'
                : 'text-slate-700 hover:text-pink-600 hover:bg-pink-50/70'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>🎮 Oyun Bölümü</span>
          </button>

          <button
            onClick={() => setActiveTab('materyaller')}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'materyaller'
                ? 'bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] text-white shadow-xs'
                : 'text-slate-700 hover:text-purple-700 hover:bg-pink-50/70'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Materyaller Kütüphanesi</span>
          </button>

          <button
            onClick={() => setActiveTab('yillik-plan')}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'yillik-plan'
                ? 'bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] text-white shadow-xs'
                : 'text-slate-700 hover:text-purple-700 hover:bg-pink-50/70'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Yıllık Plan</span>
          </button>

          <button
            onClick={() => setActiveTab('ders-notlari')}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'ders-notlari'
                ? 'bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] text-white shadow-xs'
                : 'text-slate-700 hover:text-purple-700 hover:bg-pink-50/70'
            }`}
          >
            <span>📝 Ders Notları</span>
          </button>

          <button
            onClick={() => setActiveTab('odev')}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'odev'
                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-white shadow-xs'
                : 'text-slate-700 hover:text-amber-600 hover:bg-amber-50/70'
            }`}
          >
            <ClipboardList className="w-4 h-4 text-amber-500" />
            <span>📋 ÖDEV</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse ml-0.5"></span>
          </button>

          <button
            onClick={() => setActiveTab('duyurular')}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'duyurular'
                ? 'bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] text-white shadow-xs'
                : 'text-slate-700 hover:text-purple-700 hover:bg-pink-50/70'
            }`}
          >
            <Megaphone className="w-4 h-4 text-[#EC4899]" />
            <span>📢 Duyurular</span>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse ml-0.5"></span>
          </button>

          <button
            onClick={() => setActiveTab('hakkinda')}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition whitespace-nowrap flex items-center gap-1.5 ml-auto ${
              activeTab === 'hakkinda'
                ? 'bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] text-white shadow-xs'
                : 'text-slate-700 hover:text-purple-700 hover:bg-pink-50/70'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>Hakkında</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
