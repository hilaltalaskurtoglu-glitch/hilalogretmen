import React, { useState } from 'react';
import { CurriculumWeek, Material } from '../types';
import { CURRICULUM_WEEKS } from '../data/curriculumData';
import { downloadMaterialFile } from '../utils/downloadHelper';
import { Calendar, BookOpen, Download, Play, FileText, CheckCircle2, ArrowLeft, ArrowRight, Sparkles, Gamepad2, Layers, ExternalLink } from 'lucide-react';

interface WeekDetailViewProps {
  term: 1 | 2;
  period: 1 | 2;
  periodWeek: number;
  allMaterials: Material[];
  onOpenMaterial: (mat: Material) => void;
  onNavigateWeek: (term: 1 | 2, period: 1 | 2, periodWeek: number) => void;
  onBackToPlan: () => void;
}

export const WeekDetailView: React.FC<WeekDetailViewProps> = ({
  term,
  period,
  periodWeek,
  allMaterials,
  onOpenMaterial,
  onNavigateWeek,
  onBackToPlan
}) => {
  const currentWeek = CURRICULUM_WEEKS.find(
    w => w.term === term && w.period === period && w.periodWeek === periodWeek
  );

  if (!currentWeek) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-[#cfe6f5] text-center space-y-4">
        <p className="text-base text-[#385777]">Seçilen haftaya ait bilgi bulunamadı.</p>
        <button
          onClick={onBackToPlan}
          className="px-4 py-2 bg-[#2E6F95] text-white rounded-xl font-bold text-sm"
        >
          Yıllık Plana Dön
        </button>
      </div>
    );
  }

  // Find linked materials for this week or general topic
  const linkedMaterials = allMaterials.filter(
    m => (m.week === currentWeek.weekNumber) ||
         (m.term === `${term}. Dönem` && m.period === `${period}. Ara` && m.week === periodWeek) ||
         (m.unit && currentWeek.topicFramework.toLowerCase().includes(m.unit.toLowerCase().slice(0, 5)))
  );

  // Previous and next week calculations
  const currentIndex = CURRICULUM_WEEKS.findIndex(w => w.weekNumber === currentWeek.weekNumber);
  const prevWeek = currentIndex > 0 ? CURRICULUM_WEEKS[currentIndex - 1] : null;
  const nextWeek = currentIndex < CURRICULUM_WEEKS.length - 1 ? CURRICULUM_WEEKS[currentIndex + 1] : null;

  return (
    <div className="space-y-6">
      {/* Top Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border-2 border-pink-100 p-4 rounded-2xl shadow-xs">
        <button
          onClick={onBackToPlan}
          className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-purple-700 hover:text-pink-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tüm Yıllık Plana Dön</span>
        </button>

        <div className="flex items-center gap-2">
          {prevWeek && (
            <button
              onClick={() => onNavigateWeek(prevWeek.term, prevWeek.period, prevWeek.periodWeek)}
              className="px-3 py-1.5 bg-pink-50/50 hover:bg-pink-100/70 text-purple-900 text-xs font-bold rounded-xl border border-pink-200 flex items-center gap-1 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Önceki Hafta</span>
            </button>
          )}

          {nextWeek && (
            <button
              onClick={() => onNavigateWeek(nextWeek.term, nextWeek.period, nextWeek.periodWeek)}
              className="px-3 py-1.5 bg-pink-50/50 hover:bg-pink-100/70 text-purple-900 text-xs font-bold rounded-xl border border-pink-200 flex items-center gap-1 transition"
            >
              <span>Sonraki Hafta</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Hero Card for Selected Week */}
      <div className="bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] text-white p-6 md:p-8 rounded-3xl shadow-md space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-white/20 backdrop-blur-xs text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            {term}. Dönem &bull; {period}. Ara &bull; {periodWeek}. Hafta
          </span>
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
            Tarih: {currentWeek.dates}
          </span>
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
            {currentWeek.hours} Ders Saati
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
          {currentWeek.topicFramework}
        </h2>

        <div className="text-xs md:text-sm text-pink-100 font-medium">
          Öğrenme Alanı: <span className="text-white font-bold">{currentWeek.learningArea}</span>
        </div>
      </div>

      {/* Syllabus Details Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Outcome & Process (2 cols) */}
        <div className="lg:col-span-2 bg-white border-2 border-pink-100 rounded-3xl p-6 shadow-xs space-y-4">
          <div>
            <div className="text-xs font-bold text-[#EC4899] uppercase tracking-wider mb-1">
              Öğrenme Çıktısı &bull; Kazanım
            </div>
            <div className="flex items-start gap-2.5 bg-pink-50/40 border border-pink-100 p-4 rounded-2xl">
              <span className="bg-gradient-to-r from-[#EC4899] to-[#3B82F6] text-white font-black text-xs px-2.5 py-1 rounded-lg shrink-0 mt-0.5">
                {currentWeek.outcomeCode}
              </span>
              <p className="text-base font-extrabold text-slate-800 leading-relaxed">
                {currentWeek.outcomeText}
              </p>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-purple-900 uppercase tracking-wider mb-1">
              Ders Süreç Bileşenleri &amp; Etkinlikler
            </div>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed bg-pink-50/30 p-4 rounded-2xl border border-pink-100">
              {currentWeek.processComponents}
            </p>
          </div>

          {currentWeek.enrichmentAndSupport && (
            <div className="bg-gradient-to-r from-pink-50 to-blue-50 border border-pink-200 p-4 rounded-2xl text-xs md:text-sm text-purple-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-sm">
                <Sparkles className="w-4 h-4 text-[#EC4899]" />
                Farklılaştırma (Zenginleştirme ve Destekleme):
              </div>
              <p>{currentWeek.enrichmentAndSupport}</p>
            </div>
          )}
        </div>

        {/* Competencies & Values (1 col) */}
        <div className="bg-white border-2 border-pink-100 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-slate-800 border-b border-pink-100 pb-2">
            Programlar Arası Bileşenler
          </h3>

          <div className="space-y-3 text-xs md:text-sm">
            <div>
              <span className="block text-[11px] font-bold text-purple-900 uppercase">Sosyal-Duygusal Beceriler</span>
              <p className="font-semibold text-slate-700 mt-0.5">{currentWeek.socialEmotionalSkills}</p>
            </div>

            <div>
              <span className="block text-[11px] font-bold text-purple-900 uppercase">Kök Değerler</span>
              <p className="font-bold text-[#8B5CF6] mt-0.5">{currentWeek.values}</p>
            </div>

            <div>
              <span className="block text-[11px] font-bold text-purple-900 uppercase">Okuryazarlık Becerileri</span>
              <p className="font-semibold text-slate-700 mt-0.5">{currentWeek.literacySkills}</p>
            </div>

            <div>
              <span className="block text-[11px] font-bold text-purple-900 uppercase">Ölçme ve Değerlendirme</span>
              <p className="font-semibold text-slate-700 mt-0.5">{currentWeek.assessmentMethods}</p>
            </div>

            {currentWeek.specialDaysWeeks && (
              <div className="bg-pink-50 border border-pink-200 p-2.5 rounded-xl text-purple-900 font-bold text-xs">
                🎗️ {currentWeek.specialDaysWeeks}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Linked Materials for this week */}
      <div className="bg-white border-2 border-pink-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-slate-800">
              Bu Haftaya Ait Ders Materyalleri &amp; Etkinlikler
            </h3>
            <p className="text-xs md:text-sm text-slate-500">
              Hilal Öğretmen tarafından yüklenen sunum, doküman, video ve oyunlar.
            </p>
          </div>
        </div>

        {linkedMaterials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {linkedMaterials.map(mat => (
              <div
                key={mat.id}
                onClick={() => onOpenMaterial(mat)}
                className="bg-white hover:bg-gradient-to-br hover:from-pink-50/50 hover:to-blue-50/50 border-2 border-pink-100 hover:border-purple-300 p-4 rounded-2xl cursor-pointer transition transform hover:-translate-y-0.5 shadow-xs flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">
                      {mat.type === 'oyun' && '🎮'}
                      {mat.type === 'sunum' && '📊'}
                      {mat.type === 'dokuman' && '📄'}
                      {mat.type === 'video' && '🎬'}
                      {mat.type === 'etkinlik' && '🧩'}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-pink-50 border border-pink-200 text-purple-900 rounded-full uppercase">
                      {mat.fileFormat}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm md:text-base text-slate-800 group-hover:text-purple-700 leading-snug">
                    {mat.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">
                    {mat.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-pink-100 flex items-center justify-between text-xs font-bold">
                  <span className="text-[#EC4899] group-hover:text-purple-700 transition">İncele &rarr;</span>
                  <div className="flex items-center gap-1.5">
                    {mat.type !== 'oyun' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadMaterialFile(mat);
                        }}
                        className="px-2.5 py-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-95 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 transition shadow-2xs"
                        title="Dosyayı doğrudan indir"
                      >
                        <Download className="w-3 h-3" />
                        <span>İndir</span>
                      </button>
                    )}
                    <span className="text-slate-400 font-normal text-[11px]">{mat.fileSize}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-pink-50/30 border border-dashed border-pink-200 rounded-2xl p-6 text-center space-y-2">
            <p className="text-sm font-semibold text-slate-700">
              Bu hafta için henüz doğrudan etiketlenmiş bağımsız bir dosya bulunmuyor.
            </p>
            <p className="text-xs text-slate-500">
              Genel 5. sınıf materyalleri kütüphanesinden dilediğiniz sunum ve çalışma kâğıtlarına erişebilir veya yeni materyal yükleyebilirsiniz.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
