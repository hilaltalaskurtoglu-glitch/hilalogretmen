import React, { useState } from 'react';
import { LECTURE_NOTES } from '../data/lectureNotesData';
import { FileText, Printer, Search, Sparkles, BookOpen, CheckCircle2, Lightbulb } from 'lucide-react';

export const LectureNotesView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [termFilter, setTermFilter] = useState<'all' | '1. Dönem' | '2. Dönem'>('all');

  const filteredNotes = LECTURE_NOTES.filter(note => {
    if (termFilter !== 'all' && note.term !== termFilter) return false;
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      const match =
        note.title.toLowerCase().includes(q) ||
        note.unit.toLowerCase().includes(q) ||
        note.summary.toLowerCase().includes(q) ||
        note.keyPoints.some(k => k.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border-2 border-pink-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-900 bg-gradient-to-r from-pink-100 to-blue-100 border border-pink-200 px-3 py-1 rounded-full">
              Ders Takviyesi &bull; Hilal KURTOĞLU
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 mt-2">
              5. Sınıf Bilişim Teknolojileri ve Yazılım Ders Notları
            </h2>
            <p className="text-sm md:text-base text-slate-600 mt-1">
              Öğrencilerimiz için ünite özetleri, önemli kavramlar, sınav ipuçları ve akıllı tahta konu anlatım kartları.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="self-start md:self-auto px-4 py-2.5 bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] hover:opacity-95 text-white font-bold rounded-xl text-xs md:text-sm transition flex items-center gap-2 shadow-xs shrink-0 print:hidden"
          >
            <Printer className="w-4 h-4" />
            <span>Notları Yazdır / PDF</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="pt-4 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setTermFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs md:text-sm transition ${
                termFilter === 'all'
                  ? 'bg-gradient-to-r from-[#EC4899] to-[#3B82F6] text-white shadow-xs'
                  : 'bg-pink-50/50 text-slate-600 hover:bg-pink-100/60'
              }`}
            >
              Tüm Notlar ({LECTURE_NOTES.length})
            </button>
            <button
              onClick={() => setTermFilter('1. Dönem')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs md:text-sm transition ${
                termFilter === '1. Dönem'
                  ? 'bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white shadow-xs'
                  : 'bg-pink-50/50 text-slate-600 hover:bg-pink-100/60'
              }`}
            >
              1. Dönem Konuları
            </button>
            <button
              onClick={() => setTermFilter('2. Dönem')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs md:text-sm transition ${
                termFilter === '2. Dönem'
                  ? 'bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white shadow-xs'
                  : 'bg-pink-50/50 text-slate-600 hover:bg-pink-100/60'
              }`}
            >
              2. Dönem Konuları
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Konularda veya kavramlarda ara..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs md:text-sm rounded-xl border border-pink-200 bg-pink-50/30 focus:bg-white focus:outline-none focus:border-purple-400 text-slate-800"
            />
          </div>
        </div>
      </div>

      {/* Notes Cards */}
      <div className="space-y-6">
        {filteredNotes.map(note => (
          <div
            key={note.id}
            className="bg-white border-2 border-pink-100 hover:border-purple-300 rounded-3xl p-6 md:p-8 shadow-xs transition space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pink-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{note.icon}</span>
                <div>
                  <span className="text-xs font-bold text-[#EC4899] uppercase">
                    {note.term} &bull; {note.recommendedWeek}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-slate-800 leading-tight">
                    {note.title}
                  </h3>
                </div>
              </div>
              <span className="text-xs font-extrabold px-3 py-1 bg-gradient-to-r from-pink-50 to-blue-50 text-purple-900 border border-pink-200 rounded-full self-start sm:self-auto">
                {note.unit}
              </span>
            </div>

            <p className="text-sm md:text-base font-semibold text-slate-700 bg-pink-50/30 p-3.5 rounded-2xl border border-pink-100">
              {note.summary}
            </p>

            {/* Key Points */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                <span>📌</span>
                <span>Önemli Bilgiler &amp; Temel Kavramlar:</span>
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {note.keyPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className="bg-white p-3 rounded-2xl border border-pink-100 text-xs md:text-sm text-slate-700 leading-relaxed flex items-start gap-2.5 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#EC4899] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Custom Structured Sections (e.g. BİT'in Kullanım Alanları) */}
            {note.sections && note.sections.map((sec, secIdx) => (
              <div key={secIdx} className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                  <span>🌐</span>
                  <span>{sec.heading}:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2.5">
                  {sec.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="bg-gradient-to-br from-pink-50/40 via-white to-blue-50/40 p-3 rounded-2xl border border-pink-200/80 shadow-2xs flex flex-col justify-start"
                    >
                      <span className="font-extrabold text-xs sm:text-sm text-purple-950 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#EC4899]"></span>
                        {item.label}:
                      </span>
                      <span className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* BİT'in Faydaları Section */}
            {note.benefits && note.benefits.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <span>✨</span>
                  <span>BİT'in Temel Faydaları:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {note.benefits.map((benefit, benIdx) => (
                    <div
                      key={benIdx}
                      className="bg-emerald-50/60 border border-emerald-200 p-3 rounded-2xl flex items-center gap-2.5 text-xs sm:text-sm text-emerald-950 font-bold shadow-2xs"
                    >
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                        {benIdx + 1}
                      </span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Teacher Tip */}
            {note.tip && (
              <div className="bg-gradient-to-r from-pink-50 via-purple-50/40 to-blue-50 border border-pink-200 p-3.5 rounded-2xl text-xs md:text-sm text-purple-900 font-medium flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#EC4899] shrink-0" />
                <span>{note.tip}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
