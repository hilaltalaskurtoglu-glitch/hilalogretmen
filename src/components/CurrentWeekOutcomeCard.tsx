import React, { useState } from 'react';
import { CURRICULUM_WEEKS } from '../data/curriculumData';
import { CurriculumWeek, Material } from '../types';
import { Calendar, ChevronLeft, ChevronRight, BookOpen, Layers, Award, Sparkles, PlusCircle, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

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
  // Determine current week by today's date, defaulting to week 2 (September 21-25, 2026)
  const defaultWeekNumber = 2;
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
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-100/50 via-purple-100/30 to-blue-100/40 rounded-full blur-2xl pointer-events-none -mr-16 -mt-16" />

      {/* Header with Title and Week Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10 pb-3 border-b border-pink-100">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-purple-900 border border-pink-200 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-[#EC4899]" />
              Yıllık Plan &bull; Bulunduğum Haftaya Ait Kazanım
            </span>
            {activeWeekNumber === defaultWeekNumber && (
              <span className="text-xs font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full animate-pulse">
                📍 Bu Hafta (Aktif Ders)
              </span>
            )}
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <span>📅 {currentWeek.weekNumber}. Hafta: {currentWeek.topicFramework}</span>
          </h3>
        </div>

        {/* Prev / Current / Next Controls */}
        <div className="flex items-center gap-1.5 bg-pink-50/60 p-1 rounded-2xl border border-pink-200 self-start sm:self-auto">
          <button
            onClick={handlePrev}
            disabled={activeWeekNumber <= 1}
            className="p-1.5 rounded-xl hover:bg-white text-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition"
            title="Önceki Hafta"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleResetToCurrent}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition ${
              activeWeekNumber === defaultWeekNumber
                ? 'bg-gradient-to-r from-[#EC4899] to-[#3B82F6] text-white shadow-2xs'
                : 'bg-white text-slate-700 hover:bg-pink-100'
            }`}
          >
            {activeWeekNumber}. Hafta {activeWeekNumber === defaultWeekNumber ? '(Bugün)' : ''}
          </button>

          <button
            onClick={handleNext}
            disabled={activeWeekNumber >= CURRICULUM_WEEKS.length}
            className="p-1.5 rounded-xl hover:bg-white text-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition"
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
          <div className="bg-gradient-to-br from-pink-50/50 via-purple-50/30 to-blue-50/40 p-4 rounded-2xl border border-pink-200/80 space-y-2.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs font-extrabold text-[#EC4899] uppercase tracking-wider">
                {currentWeek.learningArea}
              </span>
              <span className="text-xs font-bold text-slate-600 bg-white/90 px-2.5 py-0.5 rounded-lg border border-pink-100">
                {currentWeek.dates} &bull; {currentWeek.hours} Ders Saati
              </span>
            </div>

            {/* Outcome Code and Text */}
            <div className="space-y-1.5">
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
            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
              <span className="text-base">💡</span>
              <div>
                <span className="font-extrabold block">Farklılaştırma (Zenginleştirme &amp; Destekleme):</span>
                <span className="text-amber-900">{currentWeek.enrichmentAndSupport}</span>
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
              className="w-full py-2.5 px-4 bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] hover:opacity-95 text-white font-extrabold rounded-xl transition flex items-center justify-center gap-2 shadow-xs text-xs"
            >
              <span>Haftanın Materyallerine Git ({weekMaterialCount})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onSelectTab('yillik-plan')}
                className="py-2 px-3 bg-pink-50 hover:bg-pink-100 text-purple-900 font-bold rounded-xl transition text-xs border border-pink-200 flex items-center justify-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-[#EC4899]" />
                <span>Yıllık Plan</span>
              </button>

              {onOpenAddModal && (
                <button
                  onClick={onOpenAddModal}
                  className="py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold rounded-xl transition text-xs border border-blue-200 flex items-center justify-center gap-1.5"
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
