import React, { useState } from 'react';
import { CURRICULUM_WEEKS } from '../data/curriculumData';
import { CurriculumWeek, Material } from '../types';
import { Calendar, ChevronLeft, ChevronRight, BookOpen, Layers, Award, Sparkles, PlusCircle, CheckCircle2, ShieldCheck, ArrowRight, Heart } from 'lucide-react';

interface CurrentWeekOutcomeCardProps {
  onSelectWeek: (term: 1 | 2, period: 1 | 2, periodWeek: number) => void;
  onSelectTab: (tab: string) => void;
  onOpenAddModal?: () => void;
  materials?: Material[];
}

export const CurrentWeekOutcomeCard: React.FC<CurrentWeekOutcomeCardProps> = ({
  onSelectWeek,
  onSelectTab,
  onOpenAddModal,
  materials = []
}) => {
  // Determine current active week based on current calendar date (MEB 2026-2027 İş Takvimi)
  const getInitialWeekNumber = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const isoDate = `${y}-${m}-${d}`;

    // Haftalık takvim tarih aralıkları (Pazartesi başlangıç - Pazar bitiş)
    const academicWeekRanges = [
      { week: 1, start: '2026-09-14', end: '2026-09-20' }, // 14–18 Eylül
      { week: 2, start: '2026-09-21', end: '2026-09-27' }, // 21–25 Eylül
      { week: 3, start: '2026-09-28', end: '2026-10-04' }, // 28 Eylül – 2 Ekim
      { week: 4, start: '2026-10-05', end: '2026-10-11' }, // 5–9 Ekim
      { week: 5, start: '2026-10-12', end: '2026-10-18' }, // 12–16 Ekim
      { week: 6, start: '2026-10-19', end: '2026-10-25' }, // 19–23 Ekim
      { week: 7, start: '2026-10-26', end: '2026-11-01' }, // 26–30 Ekim
      { week: 8, start: '2026-11-02', end: '2026-11-08' }, // 2–6 Kasım
      { week: 9, start: '2026-11-09', end: '2026-11-15' }, // 9–13 Kasım
      { week: 10, start: '2026-11-16', end: '2026-11-29' }, // 1. Ara Tatil (16–20 Kasım) & 23–27 Kasım
      { week: 11, start: '2026-11-30', end: '2026-12-06' }, // 30 Kasım – 4 Aralık
      { week: 12, start: '2026-12-07', end: '2026-12-13' }, // 7–11 Aralık
      { week: 13, start: '2026-12-14', end: '2026-12-20' }, // 14–18 Aralık
      { week: 14, start: '2026-12-21', end: '2026-12-27' }, // 21–25 Aralık
      { week: 15, start: '2026-12-28', end: '2027-01-03' }, // 28 Aralık – 1 Ocak
      { week: 16, start: '2027-01-04', end: '2027-01-10' }, // 4–8 Ocak
      { week: 17, start: '2027-01-11', end: '2027-01-17' }, // 11–15 Ocak
      { week: 18, start: '2027-01-18', end: '2027-02-07' }, // 18–22 Ocak & Yarıyıl Tatili (25 Ocak – 5 Şubat)
      { week: 19, start: '2027-02-08', end: '2027-02-14' }, // 8–12 Şubat (2. Dönem Başlangıcı)
      { week: 20, start: '2027-02-15', end: '2027-02-21' }, // 15–19 Şubat
      { week: 21, start: '2027-02-22', end: '2027-02-28' }, // 22–26 Şubat
      { week: 22, start: '2027-03-01', end: '2027-03-14' }, // 1–5 Mart & 2. Ara Tatil (8–12 Mart)
      { week: 23, start: '2027-03-15', end: '2027-03-21' }, // 15–19 Mart
      { week: 24, start: '2027-03-22', end: '2027-03-28' }, // 22–26 Mart
      { week: 25, start: '2027-03-29', end: '2027-04-04' }, // 29 Mart – 2 Nisan
      { week: 26, start: '2027-04-05', end: '2027-04-11' }, // 5–9 Nisan
      { week: 27, start: '2027-04-12', end: '2027-04-18' }, // 12–16 Nisan
      { week: 28, start: '2027-04-19', end: '2027-04-25' }, // 19–23 Nisan
      { week: 29, start: '2027-04-26', end: '2027-05-02' }, // 26–30 Nisan
      { week: 30, start: '2027-05-03', end: '2027-05-09' }, // 3–7 Mayıs
      { week: 31, start: '2027-05-10', end: '2027-05-16' }, // 10–14 Mayıs
      { week: 32, start: '2027-05-17', end: '2027-05-23' }, // 20–21 Mayıs
      { week: 33, start: '2027-05-24', end: '2027-05-30' }, // 24–28 Mayıs
      { week: 34, start: '2027-05-31', end: '2027-06-06' }, // 31 Mayıs – 4 Haziran
      { week: 35, start: '2027-06-07', end: '2027-06-13' }, // 7–11 Haziran
      { week: 36, start: '2027-06-14', end: '2027-06-20' }, // 14–18 Haziran
      { week: 37, start: '2027-06-21', end: '2027-06-27' }, // 21–25 Haziran (Yıl Sonu)
    ];

    const matched = academicWeekRanges.find(r => isoDate >= r.start && isoDate <= r.end);
    if (matched) return matched.week;
    if (isoDate < '2026-09-14') return 1;
    return 37;
  };

  const defaultWeekNumber = getInitialWeekNumber();
  const [activeWeekNumber, setActiveWeekNumber] = useState<number>(defaultWeekNumber);

  const currentWeek = CURRICULUM_WEEKS.find(w => w.weekNumber === activeWeekNumber) || CURRICULUM_WEEKS[1];

  const handlePrev = () => {
    if (activeWeekNumber > 1) {
      setActiveWeekNumber(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (activeWeekNumber < CURRICULUM_WEEKS.length) {
      setActiveWeekNumber(prev => prev + 1);
    }
  };

  const handleResetToCurrent = () => {
    setActiveWeekNumber(defaultWeekNumber);
  };

  // Count materials for this week
  const weekMaterialCount = materials.filter(m => {
    const termMatch = currentWeek.term === 1 ? m.term === '1. Dönem' : m.term === '2. Dönem';
    const periodMatch = currentWeek.period === 1 ? m.period === '1. Ara' : m.period === '2. Ara';
    return termMatch && periodMatch && m.week === currentWeek.periodWeek;
  }).length;

  return (
    <section className="bg-white border-2 border-pink-200/90 rounded-3xl p-5 md:p-7 shadow-xs space-y-4 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-pink-100/50 via-purple-100/30 to-blue-100/40 rounded-full blur-2xl pointer-events-none -mr-16 -mt-16" />

      {/* Header with Title and Week Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10 pb-3 border-b border-pink-100">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-purple-900 border border-pink-200 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-[#EC4899]" />
              Yıllık Plan &bull; Bulunduğum Haftanın Kazanım Sayfası
            </span>
            {activeWeekNumber === defaultWeekNumber && (
              <span className="text-xs font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping inline-block" />
                <span>Bulunduğum Hafta (Aktif Ders)</span>
              </span>
            )}
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <span>📅 {currentWeek.weekNumber}. Hafta: {currentWeek.topicFramework}</span>
          </h3>
        </div>

        {/* Prev / Current / Next Controls */}
        <div className="flex items-center gap-1.5 bg-pink-50/60 p-1.5 rounded-2xl border border-pink-200 self-start sm:self-auto shrink-0">
          <button
            onClick={handlePrev}
            disabled={activeWeekNumber <= 1}
            className="p-1.5 rounded-xl hover:bg-white text-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
            title="Önceki Hafta"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleResetToCurrent}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeWeekNumber === defaultWeekNumber
                ? 'bg-gradient-to-r from-[#EC4899] to-[#3B82F6] text-white shadow-2xs'
                : 'bg-white text-slate-700 hover:bg-pink-100'
            }`}
            title="Bulunduğum haftaya git"
          >
            {activeWeekNumber}. Hafta {activeWeekNumber === defaultWeekNumber ? '(Bugün)' : ''}
          </button>

          <button
            onClick={handleNext}
            disabled={activeWeekNumber >= CURRICULUM_WEEKS.length}
            className="p-1.5 rounded-xl hover:bg-white text-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
            title="Sonraki Hafta"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Week Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative z-10">
        
        {/* Main Outcome Card */}
        <div className="lg:col-span-2 space-y-3.5">
          <div className="bg-gradient-to-br from-pink-50/50 via-purple-50/30 to-blue-50/40 p-4 sm:p-5 rounded-2xl border border-pink-200/80 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs font-black text-[#EC4899] uppercase tracking-wider">
                {currentWeek.learningArea}
              </span>
              <span className="text-xs font-bold text-slate-600 bg-white/90 px-2.5 py-0.5 rounded-lg border border-pink-100 shadow-2xs">
                {currentWeek.dates} &bull; {currentWeek.hours} Ders Saati
              </span>
            </div>

            {/* Outcome Code and Text */}
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="px-2 py-0.5 rounded-lg bg-gradient-to-r from-[#EC4899] to-[#3B82F6] text-white text-xs font-black shrink-0 mt-0.5 shadow-2xs">
                  {currentWeek.outcomeCode}
                </span>
                <h4 className="font-extrabold text-sm sm:text-base text-slate-800 leading-snug">
                  {currentWeek.outcomeText}
                </h4>
              </div>

              {/* Process components */}
              <div className="pt-2 border-t border-pink-100/80">
                <span className="text-[11px] font-black uppercase text-purple-900 block mb-1">
                  Öğrenme Süreci &amp; Ders Adımları:
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {currentWeek.processComponents}
                </p>
              </div>
            </div>
          </div>

          {/* Enrichment & Support */}
          {currentWeek.enrichmentAndSupport && (
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
              <span className="text-lg">💡</span>
              <div className="space-y-0.5">
                <span className="font-extrabold block text-amber-900">Farklılaştırma (Zenginleştirme &amp; Destekleme):</span>
                <span className="text-amber-800 leading-relaxed">{currentWeek.enrichmentAndSupport}</span>
              </div>
            </div>
          )}
        </div>

        {/* Secondary Info & Actions */}
        <div className="space-y-3 flex flex-col justify-between">
          <div className="space-y-2.5 bg-white p-3.5 rounded-2xl border border-pink-100 shadow-2xs text-xs">
            <div>
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Ölçme ve Değerlendirme</span>
              <span className="font-bold text-slate-800">{currentWeek.assessmentMethods}</span>
            </div>
            <div className="pt-1.5 border-t border-slate-100">
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Hedeflenen Değerler</span>
              <span className="font-extrabold text-[#EC4899]">{currentWeek.values}</span>
            </div>
            <div className="pt-1.5 border-t border-slate-100">
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Okuryazarlık Becerileri</span>
              <span className="text-slate-600 font-medium">{currentWeek.literacySkills}</span>
            </div>
            {currentWeek.socialEmotionalSkills && (
              <div className="pt-1.5 border-t border-slate-100">
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Sosyal-Duygusal Beceriler</span>
                <span className="text-purple-800 font-medium line-clamp-2">{currentWeek.socialEmotionalSkills}</span>
              </div>
            )}
            {currentWeek.specialDaysWeeks && (
              <div className="pt-1.5 border-t border-slate-100">
                <span className="text-pink-600 font-bold block text-[10px] uppercase">Belirli Günler &amp; Haftalar</span>
                <span className="font-extrabold text-purple-900">🎗️ {currentWeek.specialDaysWeeks}</span>
              </div>
            )}
          </div>

          {/* Quick Buttons */}
          <div className="space-y-2">
            <button
              onClick={() => onSelectWeek(currentWeek.term, currentWeek.period, currentWeek.periodWeek)}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] hover:opacity-95 text-white font-extrabold rounded-xl transition flex items-center justify-center gap-2 shadow-xs text-xs cursor-pointer"
            >
              <span>Haftanın Materyallerine Git ({weekMaterialCount})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onSelectTab('yillik-plan')}
                className="py-2 px-3 bg-pink-50 hover:bg-pink-100 text-purple-900 font-bold rounded-xl transition text-xs border border-pink-200 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-[#EC4899]" />
                <span>Tüm Yıllık Plan</span>
              </button>

              {onOpenAddModal && (
                <button
                  onClick={onOpenAddModal}
                  className="py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold rounded-xl transition text-xs border border-blue-200 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Ders Ekle</span>
                </button>
              )}
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
