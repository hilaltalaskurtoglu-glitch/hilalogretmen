import React, { useState } from 'react';
import { CURRICULUM_WEEKS, CURRICULUM_METADATA, HOLIDAY_PERIODS } from '../data/curriculumData';
import { Printer, Search, Calendar, ChevronRight, LayoutGrid, Table as TableIcon, Sparkles, CheckCircle2 } from 'lucide-react';

interface CurriculumViewProps {
  onSelectWeek: (term: 1 | 2, period: 1 | 2, periodWeek: number) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({ onSelectWeek }) => {
  const [termFilter, setTermFilter] = useState<'all' | '1' | '2'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredWeeks = CURRICULUM_WEEKS.filter(w => {
    if (termFilter === '1' && w.term !== 1) return false;
    if (termFilter === '2' && w.term !== 2) return false;
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      const match =
        w.topicFramework.toLowerCase().includes(q) ||
        w.learningArea.toLowerCase().includes(q) ||
        w.outcomeCode.toLowerCase().includes(q) ||
        w.outcomeText.toLowerCase().includes(q) ||
        w.dates.toLowerCase().includes(q) ||
        (w.specialDaysWeeks && w.specialDaysWeeks.toLowerCase().includes(q)) ||
        (w.enrichmentAndSupport && w.enrichmentAndSupport.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border-2 border-pink-100 rounded-3xl p-5 md:p-8 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-pink-100 to-blue-100 text-purple-900 border border-pink-200">
                <Calendar className="w-3.5 h-3.5 text-[#EC4899]" />
                {CURRICULUM_METADATA.academicYear} Resmî Yıllık Plan
              </span>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                Şubeler: {CURRICULUM_METADATA.classes}
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 leading-tight">
              {CURRICULUM_METADATA.schoolName}
            </h2>
            <p className="text-base sm:text-lg font-bold text-purple-900 mt-0.5">
              {CURRICULUM_METADATA.courseName}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Öğretmen: <span className="font-bold text-slate-800">{CURRICULUM_METADATA.teacher.name}</span> &bull; Haftalık {CURRICULUM_METADATA.weeklyHours} Ders Saati &bull; Toplam 37 Hafta
            </p>
          </div>

          <div className="flex items-center gap-2.5 print:hidden flex-wrap">
            {/* Toggle Table / Cards */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  viewMode === 'cards'
                    ? 'bg-white text-purple-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Kart Görünümü</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  viewMode === 'table'
                    ? 'bg-white text-purple-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>MEB Tablosu</span>
              </button>
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] hover:opacity-95 text-white font-bold rounded-xl text-xs sm:text-sm transition flex items-center gap-2 shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Yazdır / PDF</span>
            </button>
          </div>
        </div>

        {/* Holiday Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-pink-100 text-xs">
          {HOLIDAY_PERIODS.map((holiday, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-gradient-to-r from-pink-50/70 to-blue-50/70 border border-pink-200 flex items-center gap-2 text-slate-700"
            >
              <span className="text-base">🏖️</span>
              <div>
                <span className="font-extrabold text-purple-950 block">{holiday.title}</span>
                <span className="text-[11px] text-slate-500 font-medium">{holiday.dates}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="pt-3 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
            <button
              onClick={() => setTermFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs md:text-sm transition whitespace-nowrap ${
                termFilter === 'all'
                  ? 'bg-gradient-to-r from-[#EC4899] to-[#3B82F6] text-white shadow-xs'
                  : 'bg-pink-50/50 text-slate-600 hover:bg-pink-100/60'
              }`}
            >
              Tüm Yıl (37 Hafta)
            </button>
            <button
              onClick={() => setTermFilter('1')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs md:text-sm transition whitespace-nowrap ${
                termFilter === '1'
                  ? 'bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white shadow-xs'
                  : 'bg-pink-50/50 text-slate-600 hover:bg-pink-100/60'
              }`}
            >
              1. Dönem (18 Hafta)
            </button>
            <button
              onClick={() => setTermFilter('2')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs md:text-sm transition whitespace-nowrap ${
                termFilter === '2'
                  ? 'bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white shadow-xs'
                  : 'bg-pink-50/50 text-slate-600 hover:bg-pink-100/60'
              }`}
            >
              2. Dönem (19 Hafta)
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Konu, kazanım veya hafta ara..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs md:text-sm rounded-xl border border-pink-200 bg-pink-50/30 focus:bg-white focus:outline-hidden focus:border-purple-400 text-slate-800"
            />
          </div>
        </div>
      </div>

      {/* VIEW 1: OFFICIAL MEB TABLE VIEW */}
      {viewMode === 'table' ? (
        <div className="bg-white border-2 border-pink-200 rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-pink-100 via-purple-50 to-blue-100 text-slate-800 border-b border-pink-200 text-[11px] font-black uppercase">
                  <th className="p-3 border-r border-pink-200/80 shrink-0">Hafta &bull; Ay</th>
                  <th className="p-3 border-r border-pink-200/80">Tarih</th>
                  <th className="p-3 border-r border-pink-200/80 text-center w-12">Saat</th>
                  <th className="p-3 border-r border-pink-200/80">Öğrenme Alanı &bull; İçerik Çerçevesi</th>
                  <th className="p-3 border-r border-pink-200/80">Öğrenme Çıktıları &bull; Süreç</th>
                  <th className="p-3 border-r border-pink-200/80">Ölçme &amp; Değerlendirme</th>
                  <th className="p-3 border-r border-pink-200/80">Değerler &amp; Beceriler</th>
                  <th className="p-3 border-r border-pink-200/80">Belirli Günler &bull; Farklılaştırma</th>
                  <th className="p-3 text-center print:hidden">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-100">
                {filteredWeeks.map((week) => (
                  <tr key={week.weekNumber} className="hover:bg-pink-50/30 transition">
                    <td className="p-3 border-r border-pink-100 font-extrabold text-slate-800 whitespace-nowrap">
                      <div>{week.weekNumber}. Hafta</div>
                      <div className="text-[10px] text-[#EC4899] uppercase font-bold">{week.month}</div>
                      <div className="text-[10px] text-slate-400">{week.term}.D - {week.period}.Ara</div>
                    </td>

                    <td className="p-3 border-r border-pink-100 font-bold text-slate-700 whitespace-nowrap">
                      {week.dates}
                    </td>

                    <td className="p-3 border-r border-pink-100 text-center font-black text-slate-800">
                      {week.hours}
                    </td>

                    <td className="p-3 border-r border-pink-100 max-w-xs">
                      <div className="font-extrabold text-purple-950 text-xs">{week.topicFramework}</div>
                      <div className="text-[10px] text-[#EC4899] font-bold mt-0.5">{week.learningArea}</div>
                    </td>

                    <td className="p-3 border-r border-pink-100 max-w-sm space-y-1">
                      <div className="font-bold text-slate-800 flex items-start gap-1">
                        <span className="px-1.5 py-0.5 bg-blue-100 text-blue-900 rounded font-black text-[10px] shrink-0">
                          {week.outcomeCode}
                        </span>
                        <span>{week.outcomeText}</span>
                      </div>
                      <div className="text-[11px] text-slate-600 line-clamp-2">
                        {week.processComponents}
                      </div>
                    </td>

                    <td className="p-3 border-r border-pink-100 text-[11px] text-slate-700 max-w-[140px]">
                      {week.assessmentMethods}
                    </td>

                    <td className="p-3 border-r border-pink-100 text-[11px] max-w-[140px] space-y-1">
                      <div><strong className="text-purple-900">Değerler:</strong> {week.values}</div>
                      <div className="text-[10px] text-slate-500">{week.socialEmotionalSkills}</div>
                    </td>

                    <td className="p-3 border-r border-pink-100 text-[11px] max-w-[160px] space-y-1">
                      {week.specialDaysWeeks && (
                        <div className="font-bold text-pink-700 bg-pink-50 p-1 rounded border border-pink-200">
                          🎗️ {week.specialDaysWeeks}
                        </div>
                      )}
                      {week.enrichmentAndSupport && (
                        <div className="text-[10px] text-slate-600 line-clamp-2">
                          {week.enrichmentAndSupport}
                        </div>
                      )}
                    </td>

                    <td className="p-3 text-center print:hidden">
                      <button
                        onClick={() => onSelectWeek(week.term, week.period, week.periodWeek)}
                        className="p-1.5 text-purple-700 hover:bg-pink-100 rounded-lg transition"
                        title="Hafta Detayına Git"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* VIEW 2: WEEK-BY-WEEK CARD VIEW */
        <div className="space-y-3">
          {filteredWeeks.map((week) => (
            <div
              key={week.weekNumber}
              className="bg-white border-2 border-pink-100 hover:border-purple-300 rounded-2xl p-4 md:p-5 shadow-xs transition"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                
                {/* Left Column: Dates & Badges */}
                <div className="lg:w-1/4 shrink-0 space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white text-xs font-black px-2.5 py-1 rounded-lg">
                      {week.term}. Dönem &bull; {week.period}. Ara &bull; {week.periodWeek}. Hafta
                    </span>
                    <span className="bg-gradient-to-r from-pink-50 to-blue-50 text-purple-900 border border-pink-200 text-xs font-bold px-2 py-1 rounded-lg">
                      Genel: {week.weekNumber}. Hafta
                    </span>
                  </div>

                  <div className="font-extrabold text-slate-800 text-base">
                    {week.dates}
                  </div>
                  <div className="text-xs text-slate-500 font-semibold">
                    {week.month} &bull; {week.hours} Ders Saati
                  </div>

                  {week.specialDaysWeeks && (
                    <div className="bg-pink-50 text-purple-900 border border-pink-200 text-xs px-2.5 py-1 rounded-lg font-bold inline-block">
                      🎗️ {week.specialDaysWeeks}
                    </div>
                  )}
                </div>

                {/* Middle Column: Topics & Outcomes */}
                <div className="lg:w-2/4 space-y-2">
                  <div>
                    <div className="text-[11px] font-bold text-[#EC4899] uppercase tracking-wider">
                      {week.learningArea}
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-800 mt-0.5">
                      {week.topicFramework}
                    </h3>
                  </div>

                  <div className="bg-pink-50/30 border border-pink-100 p-3 rounded-xl space-y-1">
                    <div className="flex items-start gap-2">
                      <span className="bg-gradient-to-r from-[#EC4899] to-[#3B82F6] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm shrink-0 mt-0.5">
                        {week.outcomeCode}
                      </span>
                      <p className="text-xs md:text-sm font-semibold text-slate-800">
                        {week.outcomeText}
                      </p>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1 border-t border-pink-100">
                      <span className="font-bold text-slate-800">Süreç: </span>
                      {week.processComponents}
                    </p>
                  </div>

                  {week.enrichmentAndSupport && (
                    <div className="text-xs text-purple-900 bg-gradient-to-r from-pink-50 to-blue-50 border border-pink-200 px-3 py-1.5 rounded-lg">
                      ✨ {week.enrichmentAndSupport}
                    </div>
                  )}
                </div>

                {/* Right Column: Values, Skills & Action Button */}
                <div className="lg:w-1/4 shrink-0 flex flex-col justify-between items-start lg:items-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-pink-100">
                  <div className="space-y-1 text-xs text-left lg:text-right">
                    <div>
                      <span className="font-bold text-slate-700">Ölçme: </span>
                      <span className="text-slate-500">{week.assessmentMethods}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">Değerler: </span>
                      <span className="text-[#8B5CF6] font-semibold">{week.values}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectWeek(week.term, week.period, week.periodWeek)}
                    className="w-full lg:w-auto px-4 py-2 bg-gradient-to-r from-pink-50 to-blue-50 hover:from-[#EC4899] hover:to-[#3B82F6] text-purple-900 hover:text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 border border-pink-200 group shadow-2xs"
                  >
                    <span>Haftalık İçeriği &amp; Materyalleri Gör</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Official Signatures Box from user's Annual Plan */}
      <div className="bg-white border-2 border-pink-200 rounded-3xl p-6 md:p-8 text-center space-y-4 shadow-xs">
        <p className="text-xs text-slate-600 max-w-3xl mx-auto italic leading-relaxed">
          {CURRICULUM_METADATA.legalNote}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row justify-around items-center gap-6 border-t border-pink-100">
          <div className="text-center">
            <div className="font-extrabold text-base text-purple-950">{CURRICULUM_METADATA.teacher.name}</div>
            <div className="text-xs font-semibold text-[#EC4899]">{CURRICULUM_METADATA.teacher.title}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Ahi Evran Ortaokulu</div>
          </div>

          <div className="text-center">
            <div className="font-extrabold text-base text-purple-950">{CURRICULUM_METADATA.principal.name}</div>
            <div className="text-xs font-semibold text-[#3B82F6]">{CURRICULUM_METADATA.principal.title}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Ahi Evran Ortaokulu</div>
          </div>
        </div>
      </div>

    </div>
  );
};
