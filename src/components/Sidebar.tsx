import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronRight, FileText, FolderOpen, Gamepad2, GraduationCap, LayoutList, BookOpen, Sparkles, CheckSquare, Plus, FolderPlus, Megaphone, Bell, ClipboardList, Play, Layers } from 'lucide-react';
import { CURRICULUM_WEEKS } from '../data/curriculumData';
import { GAMES_REGISTRY } from '../data/gamesData';
import { Material } from '../types';

interface SidebarProps {
  onSelectWeek: (term: 1 | 2, period: 1 | 2, periodWeek: number) => void;
  onSelectTab: (tab: string) => void;
  onSelectGame?: (gameId: string) => void;
  activeTab: string;
  selectedWeekKey: string | null;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  materials?: Material[];
  onOpenAddForWeek?: (term: 1 | 2, period: 1 | 2, periodWeek: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onSelectWeek,
  onSelectTab,
  onSelectGame,
  activeTab,
  selectedWeekKey,
  isOpenMobile,
  onCloseMobile,
  materials = [],
  onOpenAddForWeek
}) => {
  // State for toggling collapsible sections
  const [openGamesMenu, setOpenGamesMenu] = useState(false);
  const [openTerm1, setOpenTerm1] = useState(true);
  const [openTerm1Ara1, setOpenTerm1Ara1] = useState(true);
  const [openTerm1Ara2, setOpenTerm1Ara2] = useState(false);

  const [openTerm2, setOpenTerm2] = useState(false);
  const [openTerm2Ara1, setOpenTerm2Ara1] = useState(false);
  const [openTerm2Ara2, setOpenTerm2Ara2] = useState(false);

  const weeksTerm1Ara1 = CURRICULUM_WEEKS.filter(w => w.term === 1 && w.period === 1);
  const weeksTerm1Ara2 = CURRICULUM_WEEKS.filter(w => w.term === 1 && w.period === 2);
  const weeksTerm2Ara1 = CURRICULUM_WEEKS.filter(w => w.term === 2 && w.period === 1);
  const weeksTerm2Ara2 = CURRICULUM_WEEKS.filter(w => w.term === 2 && w.period === 2);

  const getWeekMaterialCount = (term: 1 | 2, period: 1 | 2, periodWeek: number) => {
    const termLabel = term === 1 ? '1. Dönem' : '2. Dönem';
    const periodLabel = period === 1 ? '1. Ara' : '2. Ara';
    return materials.filter(m => m.term === termLabel && m.period === periodLabel && m.week === periodWeek).length;
  };

  const handleWeekClick = (term: 1 | 2, period: 1 | 2, periodWeek: number) => {
    onSelectWeek(term, period, periodWeek);
    onCloseMobile();
  };

  const handleTabClick = (tabName: string) => {
    onSelectTab(tabName);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 md:w-80 bg-white border-r-2 lg:border-2 border-pink-200/80 lg:rounded-3xl flex flex-col transition-transform duration-300 ease-in-out shadow-sm lg:shadow-none shrink-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-pink-200/80 bg-gradient-to-r from-pink-100/90 via-purple-50 to-blue-100/90 flex items-center justify-between lg:rounded-t-3xl">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-pink-300 shadow-2xs shrink-0 bg-pink-50">
              <img
                src="/teacher_logo.png"
                alt="Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="font-extrabold text-sm text-slate-800">Ders Menüsü</div>
              <div className="text-[11px] text-purple-700 font-semibold">Müfredat &amp; Haftalık Plan</div>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:bg-pink-100"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Nav Area */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 text-sm select-none">
          
          {/* A. YILLIK PLANLARIM */}
          <button
            onClick={() => handleTabClick('yillik-plan')}
            className={`w-full p-3.5 rounded-2xl font-bold transition text-left flex items-center justify-between border shadow-2xs group ${
              activeTab === 'yillik-plan'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white border-emerald-500 shadow-sm'
                : 'bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white hover:opacity-95 border-emerald-400/50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center font-black text-base shrink-0 shadow-2xs">
                📅
              </div>
              <div>
                <span className="block font-black text-xs sm:text-sm">Yıllık Planlarım</span>
                <span className="block text-[11px] text-emerald-100 font-medium">2026-2027 MEB &bull; 37 Hafta Plan</span>
              </div>
            </div>
            <span className="text-xs text-white/80 group-hover:translate-x-0.5 transition">&rarr;</span>
          </button>

          {/* B. DUYURULAR MENÜSÜ (EBA Veli Kılavuzu & Haberler) */}
          <button
            onClick={() => handleTabClick('duyurular')}
            className={`w-full p-3 rounded-2xl font-bold transition text-left flex items-center justify-between border shadow-2xs group ${
              activeTab === 'duyurular'
                ? 'bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white border-rose-400 shadow-sm'
                : 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white hover:opacity-95 border-pink-400/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
                📢
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="block font-black text-xs sm:text-sm">Duyurular</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-white/25 text-[10px] font-black uppercase tracking-wider text-white">
                    Video Kılavuz
                  </span>
                </div>
                <span className="block text-[11px] text-pink-100 font-medium truncate">
                  EBA Veli Şifre Kılavuzu &amp; Notlar
                </span>
              </div>
            </div>
            <span className="text-xs text-white/80 group-hover:translate-x-0.5 transition">&rarr;</span>
          </button>

          {/* C. ÖDEV MENÜSÜ (3. Hafta Afiş Ödevi) */}
          <button
            onClick={() => handleTabClick('odev')}
            className={`w-full p-3 rounded-2xl font-bold transition text-left flex items-center justify-between border shadow-2xs group ${
              activeTab === 'odev'
                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-white border-amber-400 shadow-sm'
                : 'bg-gradient-to-r from-amber-500/95 via-orange-500/90 to-amber-600/95 text-white hover:opacity-95 border-amber-400/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
                📋
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="block font-black text-xs sm:text-sm">ÖDEV</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-white/25 text-[10px] font-black uppercase tracking-wider text-white">
                    3. Hafta
                  </span>
                </div>
                <span className="block text-[11px] text-amber-100 font-medium truncate">
                  Dijital Vatandaşlığın 9 Boyutu
                </span>
              </div>
            </div>
            <span className="text-xs text-white/80 group-hover:translate-x-0.5 transition">&rarr;</span>
          </button>

          {/* C. OYUN BÖLÜMÜ MENÜSÜ & AÇILIR OYUN SEKMELERİ (DROPDOWN / ACCORDION ON HOVER & CLICK) */}
          <div 
            className="relative"
            onMouseEnter={() => setOpenGamesMenu(true)}
            onMouseLeave={() => setOpenGamesMenu(false)}
          >
            {/* Ana Oyun Bölümü Butonu */}
            <div
              className={`w-full p-2.5 rounded-2xl font-bold transition flex items-center justify-between border shadow-2xs group cursor-pointer ${
                activeTab === 'oyunlar'
                  ? 'bg-gradient-to-r from-teal-600 via-emerald-600 to-indigo-600 text-white border-teal-400 shadow-sm'
                  : 'bg-gradient-to-r from-teal-600/90 via-emerald-600/90 to-purple-600/90 text-white hover:opacity-95 border-teal-300/40'
              }`}
              onClick={() => {
                handleTabClick('oyunlar');
                setOpenGamesMenu(prev => !prev);
              }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
                  🎮
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="block font-black text-xs sm:text-sm">Oyun Bölümü</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-white/25 text-[10px] font-black uppercase tracking-wider text-white">
                      {GAMES_REGISTRY.length} Oyun
                    </span>
                  </div>
                  <span className="block text-[11px] text-teal-100 font-medium truncate">
                    Üzerine gelin veya tıklayın
                  </span>
                </div>
              </div>
              <ChevronDown 
                className={`w-4 h-4 text-white/90 transition-transform duration-200 shrink-0 ${
                  openGamesMenu ? 'rotate-180' : ''
                }`} 
              />
            </div>

            {/* Açılır Sekmeler / Alt Oyun Menüleri (Dropdown / Sub-menu) */}
            {openGamesMenu && (
              <div className="mt-1.5 p-1.5 bg-slate-900/95 backdrop-blur-md border-2 border-teal-400/40 rounded-2xl shadow-xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-20">
                <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-teal-300/80 flex items-center justify-between border-b border-white/10">
                  <span>Hazırlanan Oyunlar</span>
                  <span className="text-[9px] bg-teal-400/20 text-teal-300 px-1.5 py-0.2 rounded-md">Tam Ekran</span>
                </div>

                {GAMES_REGISTRY.map(game => (
                  <button
                    key={game.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectGame) {
                        onSelectGame(game.id);
                      } else {
                        handleTabClick('oyunlar');
                      }
                      onCloseMobile();
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2.5 group cursor-pointer"
                  >
                    <span className="w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center text-sm shrink-0 group-hover:scale-110 transition-transform">
                      {game.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-white truncate group-hover:text-teal-300 transition-colors">
                          {game.title}
                        </span>
                        <span className="text-[9px] font-black px-1.5 py-0.2 rounded-md bg-teal-400/20 text-teal-300 shrink-0">
                          {game.weekTag}
                        </span>
                      </div>
                      <span className="block text-[10px] text-slate-300/80 truncate">
                        {game.subtitle}
                      </span>
                    </div>
                    <Play className="w-3.5 h-3.5 text-teal-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition shrink-0 fill-current" />
                  </button>
                ))}

                {/* Tümünü Gör Butonu */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTabClick('oyunlar');
                    onCloseMobile();
                  }}
                  className="w-full text-center py-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 font-bold text-[11px] transition border border-teal-500/30 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Layers className="w-3 h-3" />
                  <span>Tüm Oyunları Alt Alta Gör</span>
                </button>
              </div>
            )}
          </div>

          {/* D. DERS NOTLARI HIZLI ERİŞİM DÜĞMESİ */}
          <button
            onClick={() => handleTabClick('ders-notlari')}
            className={`w-full p-2.5 rounded-2xl font-bold text-xs transition flex items-center justify-between border ${
              activeTab === 'ders-notlari'
                ? 'bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white border-pink-400 shadow-xs'
                : 'bg-purple-50/80 hover:bg-purple-100/80 text-purple-900 border-purple-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-200/80 text-purple-800 flex items-center justify-center font-bold text-xs">
                <FileText className="w-3.5 h-3.5 text-purple-700" />
              </div>
              <div className="text-left">
                <div className="font-extrabold text-xs">Ders Notları</div>
                <div className="text-[10px] text-purple-700 font-medium">Haftalık Konu Özetleri</div>
              </div>
            </div>
            <span className="text-xs">&rarr;</span>
          </button>

          {/* D. ÖĞRETMEN MENÜSÜ & HAFTALIK DERSLER */}
          <div className="pt-2 pb-1 border-t border-pink-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Öğretmen Menüsü
              </span>
              <span className="text-[10px] font-bold text-pink-600 bg-pink-100 px-2 py-0.2 rounded-full">
                Haftalık
              </span>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              {materials.length} Dosya
            </span>
          </div>

          {/* 1. DÖNEM DERS İÇERİKLERİ */}
          <div className="rounded-2xl border border-pink-200/80 overflow-hidden bg-white shadow-2xs">
            <button
              onClick={() => setOpenTerm1(prev => !prev)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-pink-50 to-purple-50 hover:bg-pink-100 text-slate-800 font-black text-left transition"
            >
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-pink-500" />
                <span className="text-xs sm:text-sm">1. Dönem Ders İçerikleri</span>
              </div>
              {openTerm1 ? <ChevronDown className="w-4 h-4 text-pink-500" /> : <ChevronRight className="w-4 h-4 text-pink-500" />}
            </button>

            {openTerm1 && (
              <div className="p-2 space-y-2 bg-white">
                {/* 1. Dönem - 1. Ara */}
                <div className="rounded-xl border border-pink-100 overflow-hidden">
                  <button
                    onClick={() => setOpenTerm1Ara1(prev => !prev)}
                    className="w-full flex items-center justify-between px-3 py-2 bg-pink-50/40 hover:bg-pink-50 text-purple-900 font-bold text-xs"
                  >
                    <span>1. Ara (1. - 9. Hafta)</span>
                    {openTerm1Ara1 ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>

                  {openTerm1Ara1 && (
                    <div className="p-1 space-y-0.5">
                      {weeksTerm1Ara1.map((w) => {
                        const isSelected = selectedWeekKey === `1-1-${w.periodWeek}` && activeTab === 'hafta-detay';
                        const count = getWeekMaterialCount(1, 1, w.periodWeek);
                        return (
                          <div key={w.weekNumber} className="group/item flex items-center gap-1">
                            <button
                              onClick={() => handleWeekClick(1, 1, w.periodWeek)}
                              className={`flex-1 text-left px-2.5 py-1.5 rounded-lg text-xs transition flex items-center justify-between min-w-0 ${
                                isSelected
                                  ? 'bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white font-bold'
                                  : 'text-slate-600 hover:bg-pink-50 hover:text-purple-900'
                              }`}
                            >
                              <span className="truncate">{w.weekNumber}. Hafta: {w.topicFramework}</span>
                              {count > 0 && (
                                <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full shrink-0 ml-1 ${
                                  isSelected ? 'bg-white text-purple-900' : 'bg-pink-100 text-pink-700'
                                }`}>
                                  {count}
                                </span>
                              )}
                            </button>
                            {onOpenAddForWeek && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenAddForWeek(1, 1, w.periodWeek);
                                }}
                                className="p-1 rounded-md text-slate-400 hover:text-purple-700 hover:bg-pink-100 opacity-60 group-hover/item:opacity-100 transition"
                                title={`1. Dönem ${w.weekNumber}. Haftaya Materyal Ekle`}
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 1. Dönem - 2. Ara */}
                <div className="rounded-xl border border-pink-100 overflow-hidden">
                  <button
                    onClick={() => setOpenTerm1Ara2(prev => !prev)}
                    className="w-full flex items-center justify-between px-3 py-2 bg-pink-50/40 hover:bg-pink-50 text-purple-900 font-bold text-xs"
                  >
                    <span>2. Ara (10. - 18. Hafta)</span>
                    {openTerm1Ara2 ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>

                  {openTerm1Ara2 && (
                    <div className="p-1 space-y-0.5">
                      {weeksTerm1Ara2.map((w) => {
                        const isSelected = selectedWeekKey === `1-2-${w.periodWeek}` && activeTab === 'hafta-detay';
                        const count = getWeekMaterialCount(1, 2, w.periodWeek);
                        return (
                          <div key={w.weekNumber} className="group/item flex items-center gap-1">
                            <button
                              onClick={() => handleWeekClick(1, 2, w.periodWeek)}
                              className={`flex-1 text-left px-2.5 py-1.5 rounded-lg text-xs transition flex items-center justify-between min-w-0 ${
                                isSelected
                                  ? 'bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white font-bold'
                                  : 'text-slate-600 hover:bg-pink-50 hover:text-purple-900'
                              }`}
                            >
                              <span className="truncate">{w.weekNumber}. Hafta: {w.topicFramework}</span>
                              {count > 0 && (
                                <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full shrink-0 ml-1 ${
                                  isSelected ? 'bg-white text-purple-900' : 'bg-pink-100 text-pink-700'
                                }`}>
                                  {count}
                                </span>
                              )}
                            </button>
                            {onOpenAddForWeek && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenAddForWeek(1, 2, w.periodWeek);
                                }}
                                className="p-1 rounded-md text-slate-400 hover:text-purple-700 hover:bg-pink-100 opacity-60 group-hover/item:opacity-100 transition"
                                title={`1. Dönem ${w.weekNumber}. Haftaya Materyal Ekle`}
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 2. DÖNEM DERS İÇERİKLERİ */}
          <div className="rounded-2xl border border-blue-200/80 overflow-hidden bg-white shadow-2xs">
            <button
              onClick={() => setOpenTerm2(prev => !prev)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-purple-50 to-blue-50 hover:bg-blue-100 text-slate-800 font-black text-left transition"
            >
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-blue-500" />
                <span className="text-xs sm:text-sm">2. Dönem Ders İçerikleri</span>
              </div>
              {openTerm2 ? <ChevronDown className="w-4 h-4 text-blue-500" /> : <ChevronRight className="w-4 h-4 text-blue-500" />}
            </button>

            {openTerm2 && (
              <div className="p-2 space-y-2 bg-white">
                {/* 2. Dönem - 1. Ara */}
                <div className="rounded-xl border border-blue-100 overflow-hidden">
                  <button
                    onClick={() => setOpenTerm2Ara1(prev => !prev)}
                    className="w-full flex items-center justify-between px-3 py-2 bg-blue-50/40 hover:bg-blue-50 text-blue-900 font-bold text-xs"
                  >
                    <span>1. Ara (19. - 22. Hafta)</span>
                    {openTerm2Ara1 ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>

                  {openTerm2Ara1 && (
                    <div className="p-1 space-y-0.5">
                      {weeksTerm2Ara1.map((w) => {
                        const isSelected = selectedWeekKey === `2-1-${w.periodWeek}` && activeTab === 'hafta-detay';
                        const count = getWeekMaterialCount(2, 1, w.periodWeek);
                        return (
                          <div key={w.weekNumber} className="group/item flex items-center gap-1">
                            <button
                              key={w.weekNumber}
                              onClick={() => handleWeekClick(2, 1, w.periodWeek)}
                              className={`flex-1 text-left px-2.5 py-1.5 rounded-lg text-xs transition flex items-center justify-between min-w-0 ${
                                isSelected
                                  ? 'bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white font-bold'
                                  : 'text-slate-600 hover:bg-blue-50 hover:text-blue-900'
                              }`}
                            >
                              <span className="truncate">{w.weekNumber}. Hafta: {w.topicFramework}</span>
                              {count > 0 && (
                                <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full shrink-0 ml-1 ${
                                  isSelected ? 'bg-white text-purple-900' : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {count}
                                </span>
                              )}
                            </button>
                            {onOpenAddForWeek && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenAddForWeek(2, 1, w.periodWeek);
                                }}
                                className="p-1 rounded-md text-slate-400 hover:text-blue-700 hover:bg-blue-100 opacity-60 group-hover/item:opacity-100 transition"
                                title={`2. Dönem ${w.weekNumber}. Haftaya Materyal Ekle`}
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 2. Dönem - 2. Ara */}
                <div className="rounded-xl border border-blue-100 overflow-hidden">
                  <button
                    onClick={() => setOpenTerm2Ara2(prev => !prev)}
                    className="w-full flex items-center justify-between px-3 py-2 bg-blue-50/40 hover:bg-blue-50 text-blue-900 font-bold text-xs"
                  >
                    <span>2. Ara (23. - 37. Hafta)</span>
                    {openTerm2Ara2 ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>

                  {openTerm2Ara2 && (
                    <div className="p-1 space-y-0.5">
                      {weeksTerm2Ara2.map((w) => {
                        const isSelected = selectedWeekKey === `2-2-${w.periodWeek}` && activeTab === 'hafta-detay';
                        const count = getWeekMaterialCount(2, 2, w.periodWeek);
                        return (
                          <div key={w.weekNumber} className="group/item flex items-center gap-1">
                            <button
                              key={w.weekNumber}
                              onClick={() => handleWeekClick(2, 2, w.periodWeek)}
                              className={`flex-1 text-left px-2.5 py-1.5 rounded-lg text-xs transition flex items-center justify-between min-w-0 ${
                                isSelected
                                  ? 'bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white font-bold'
                                  : 'text-slate-600 hover:bg-blue-50 hover:text-blue-900'
                              }`}
                            >
                              <span className="truncate">{w.weekNumber}. Hafta: {w.topicFramework}</span>
                              {count > 0 && (
                                <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full shrink-0 ml-1 ${
                                  isSelected ? 'bg-white text-purple-900' : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {count}
                                </span>
                              )}
                            </button>
                            {onOpenAddForWeek && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenAddForWeek(2, 2, w.periodWeek);
                                }}
                                className="p-1 rounded-md text-slate-400 hover:text-blue-700 hover:bg-blue-100 opacity-60 group-hover/item:opacity-100 transition"
                                title={`2. Dönem ${w.weekNumber}. Haftaya Materyal Ekle`}
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>


        </div>

        {/* Sidebar Footer: Teacher badge */}
        <div className="p-3 border-t border-pink-200/80 bg-gradient-to-r from-pink-50/90 via-purple-50/60 to-blue-50/90 lg:rounded-b-3xl">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-pink-300 shadow-2xs shrink-0 bg-pink-50">
              <img
                src="/teacher_logo.png"
                alt="Hilal KURTOĞLU Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="font-extrabold text-xs text-slate-800 truncate">Hilal KURTOĞLU</div>
              <div className="text-[11px] text-purple-700 font-medium truncate">Ahi Evran Ortaokulu</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
