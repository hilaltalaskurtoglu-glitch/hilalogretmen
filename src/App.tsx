import React, { useState } from 'react';
import { HeaderBanner } from './components/HeaderBanner';
import { Sidebar } from './components/Sidebar';
import { RightSidebarPanel } from './components/RightSidebarPanel';
import { HomeHeroView } from './components/HomeHeroView';
import { MaterialsLibrary } from './components/MaterialsLibrary';
import { CurriculumView } from './components/CurriculumView';
import { WeekDetailView } from './components/WeekDetailView';
import { LectureNotesView } from './components/LectureNotesView';
import { AboutView } from './components/AboutView';
import { AnnouncementsView } from './components/AnnouncementsView';
import { HomeworkView } from './components/HomeworkView';
import { GamesView } from './components/GamesView';
import { BilisimKahramaniGame } from './components/BilisimKahramaniGame';
import { MaterialDetailModal } from './components/MaterialDetailModal';
import { AddMaterialModal } from './components/AddMaterialModal';
import { Footer } from './components/Footer';
import { Material } from './types';
import { loadStoredMaterials, saveStoredMaterials } from './data/materialsData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('anasayfa');
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [materials, setMaterials] = useState<Material[]>(() => loadStoredMaterials());
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalDefaultWeek, setModalDefaultWeek] = useState<{
    term: '1. Dönem' | '2. Dönem';
    period: '1. Ara' | '2. Ara';
    week: number;
  } | undefined>(undefined);
  const [smartboardMode, setSmartboardMode] = useState(false);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);

  // Selected week for weekly curriculum drill-down
  const [selectedWeek, setSelectedWeek] = useState<{
    term: 1 | 2;
    period: 1 | 2;
    periodWeek: number;
  }>({
    term: 1,
    period: 1,
    periodWeek: 1
  });

  const handleSelectWeek = (term: 1 | 2, period: 1 | 2, periodWeek: number) => {
    setSelectedWeek({ term, period, periodWeek });
    setActiveTab('hafta-detay');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    if (tab !== 'oyunlar') {
      setSelectedGameId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGame = (gameId: string) => {
    setSelectedGameId(gameId);
    setActiveTab('oyunlar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddMaterial = (newMat: Material) => {
    const updated = [newMat, ...materials];
    setMaterials(updated);
    saveStoredMaterials(updated);
    // If on anasayfa, smoothly scroll down to "Son Yüklenenler"
    if (activeTab === 'anasayfa') {
      setTimeout(() => {
        const el = document.getElementById('son-yuklenenler-bolumu');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleDeleteMaterial = (id: string) => {
    const updated = materials.filter(m => m.id !== id);
    setMaterials(updated);
    saveStoredMaterials(updated);
  };

  const handleOpenAddForWeek = (term: 1 | 2, period: 1 | 2, periodWeek: number) => {
    setModalDefaultWeek({
      term: term === 1 ? '1. Dönem' : '2. Dönem',
      period: period === 1 ? '1. Ara' : '2. Ara',
      week: periodWeek
    });
    setIsAddModalOpen(true);
  };

  const selectedWeekKey = `${selectedWeek.term}-${selectedWeek.period}-${selectedWeek.periodWeek}`;

  return (
    <div className={`min-h-screen flex flex-col bg-transparent text-[#1E293B] ${smartboardMode ? 'text-lg' : 'text-base'}`}>
      
      {/* Top Header Banner with Modest Teacher Brand & Quick Navigation */}
      <HeaderBanner
        activeTab={activeTab}
        setActiveTab={handleSelectTab}
        onOpenAddModal={() => {
          setModalDefaultWeek(undefined);
          setIsAddModalOpen(true);
        }}
        smartboardMode={smartboardMode}
        setSmartboardMode={setSmartboardMode}
        onToggleSidebar={() => setIsSidebarOpenMobile(prev => !prev)}
      />

      {/* 3-BÖLÜMLÜ DÜZEN (3-COLUMN LAYOUT)
          1. SOL BÖLÜM: MENÜLER (Sidebar)
          2. ORTA BÖLÜM: OYUN BÖLÜMÜ & DERS SAHNESİ (Main Content)
          3. SAĞ BÖLÜM: TARİH, SAAT VE GÜNÜN SÖZÜ (RightSidebarPanel)
      */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-5 py-5 flex flex-col lg:flex-row gap-5 items-start">
        
        {/* 1. SOL BÖLÜM: MENÜLER (Haftalık planlar, haftalara materyal ekleme düğmeleri ve ders menüsü) */}
        <Sidebar
          onSelectWeek={handleSelectWeek}
          onSelectTab={handleSelectTab}
          onSelectGame={handleSelectGame}
          activeTab={activeTab}
          selectedWeekKey={selectedWeekKey}
          isOpenMobile={isSidebarOpenMobile}
          onCloseMobile={() => setIsSidebarOpenMobile(false)}
          materials={materials}
          onOpenAddForWeek={handleOpenAddForWeek}
        />

        {/* 2. ORTA BÖLÜM: OYUN BÖLÜMÜ VE AKTİF DERS SAHNESİ */}
        <main className="flex-1 min-w-0 w-full space-y-6">
          
          {/* TAB 1: ANASAYFA (ORTADA OYUN VE HEMEN ALTINDA DİNAMİK SON YÜKLENENLER) */}
          {activeTab === 'anasayfa' && (
            <HomeHeroView
              materials={materials}
              onOpenMaterial={mat => setSelectedMaterial(mat)}
              onSelectTab={handleSelectTab}
              onOpenAddModal={() => {
                setModalDefaultWeek(undefined);
                setIsAddModalOpen(true);
              }}
              onSelectWeek={handleSelectWeek}
              onDeleteMaterial={handleDeleteMaterial}
              onSelectGame={handleSelectGame}
            />
          )}

          {/* TAB 2: MATERYALLER KÜTÜPHANESİ */}
          {activeTab === 'materyaller' && (
            <MaterialsLibrary
              materials={materials}
              onOpenMaterial={mat => setSelectedMaterial(mat)}
              onOpenAddModal={() => {
                setModalDefaultWeek(undefined);
                setIsAddModalOpen(true);
              }}
              onPlayGame={() => {
                setActiveTab('oyunlar');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* TAB 3: OYUN BÖLÜMÜ (DİJİTAL KİMLİK KAŞİFİ & BİLİŞİM KAHRAMANI OYUNLARI - TAM EKRAN VE LİSTE) */}
          {activeTab === 'oyunlar' && (
            <GamesView 
              onBackToHome={() => handleSelectTab('anasayfa')}
              initialGameId={selectedGameId}
            />
          )}

          {/* TAB 4: YILLIK PLAN (2026-2027 MEB & AHİ EVRAN ORTAOKULU BTY PLANI) */}
          {activeTab === 'yillik-plan' && (
            <CurriculumView
              onSelectWeek={handleSelectWeek}
            />
          )}

          {/* TAB 5: HAFTA DETAYI (HAFTALIK KAZANIM VE MATERYAL İNCELEME) */}
          {activeTab === 'hafta-detay' && (
            <WeekDetailView
              term={selectedWeek.term}
              period={selectedWeek.period}
              periodWeek={selectedWeek.periodWeek}
              allMaterials={materials}
              onOpenMaterial={mat => setSelectedMaterial(mat)}
              onNavigateWeek={handleSelectWeek}
              onBackToPlan={() => handleSelectTab('yillik-plan')}
            />
          )}

          {/* TAB 6: DERS NOTLARI (5. SINIF TÜM ÜNİTE ÇALIŞMA ÖZETLERİ) */}
          {activeTab === 'ders-notlari' && (
            <LectureNotesView onSelectTab={handleSelectTab} />
          )}

          {/* TAB 7: HAKKINDA (ÖĞRETMEN VE MİSYON BİLGİSİ) */}
          {activeTab === 'hakkinda' && (
            <AboutView />
          )}

          {/* TAB 8: DUYURULAR (EBA VELİ ŞİFRE KILAVUZU & VİDEOLAR) */}
          {activeTab === 'duyurular' && (
            <AnnouncementsView />
          )}

          {/* TAB 9: ÖDEV (DİJİTAL VATANDAŞLIĞIN 9 BOYUTU AFİŞ ÖDEVİ) */}
          {activeTab === 'odev' && (
            <HomeworkView onSelectTab={handleSelectTab} />
          )}

        </main>

        {/* 3. SAĞ BÖLÜM: TARİH, SAAT, GÜNÜN SÖZÜ VE HIZLI MATERYAL YÜKLEME KARTI */}
        <RightSidebarPanel
          smartboardMode={smartboardMode}
          onAddMaterial={handleAddMaterial}
        />

      </div>

      {/* Persistent Teacher Signature Footer & Corner Badge */}
      <Footer />

      {/* Modal: View Material Details / Download / Preview */}
      <MaterialDetailModal
        material={selectedMaterial}
        onClose={() => setSelectedMaterial(null)}
        onPlayGame={() => {
          setSelectedMaterial(null);
          handleSelectTab('oyunlar');
        }}
      />

      {/* Modal: Teacher Upload / Add New Material */}
      <AddMaterialModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setModalDefaultWeek(undefined);
        }}
        onAddMaterial={handleAddMaterial}
        defaultTerm={modalDefaultWeek?.term}
        defaultPeriod={modalDefaultWeek?.period}
        defaultWeek={modalDefaultWeek?.week}
      />

    </div>
  );
}

