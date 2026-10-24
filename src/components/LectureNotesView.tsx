import React, { useState } from 'react';
import { LECTURE_NOTES } from '../data/lectureNotesData';
import { FileText, Printer, Search, Sparkles, BookOpen, CheckCircle2, Lightbulb, ClipboardCheck, ArrowRight, Gamepad2, ExternalLink, Download } from 'lucide-react';
import { ComputerSystemHierarchy } from './ComputerSystemHierarchy';

interface LectureNotesViewProps {
  onSelectTab?: (tab: string) => void;
  selectedNoteId?: string | null;
}

export const LectureNotesView: React.FC<LectureNotesViewProps> = ({ onSelectTab, selectedNoteId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [termFilter, setTermFilter] = useState<'all' | '1. Dönem' | '2. Dönem'>('all');

  // If a note was selected from the dropdown menu, smoothly scroll to it
  React.useEffect(() => {
    if (selectedNoteId) {
      setTimeout(() => {
        const el = document.getElementById(`lecture-note-${selectedNoteId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          el.classList.add('ring-4', 'ring-purple-400', 'ring-offset-2');
          setTimeout(() => {
            el.classList.remove('ring-4', 'ring-purple-400', 'ring-offset-2');
          }, 2500);
        }
      }, 100);
    }
  }, [selectedNoteId]);

  const filteredNotes = LECTURE_NOTES.filter(note => {
    if (termFilter !== 'all' && note.term !== termFilter) return false;
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      const match =
        note.title.toLowerCase().includes(q) ||
        note.unit.toLowerCase().includes(q) ||
        note.summary.toLowerCase().includes(q) ||
        (note.subtitle && note.subtitle.toLowerCase().includes(q)) ||
        (note.keyPoints && note.keyPoints.some(k => k.toLowerCase().includes(q))) ||
        (note.sections && note.sections.some(s =>
          s.heading.toLowerCase().includes(q) ||
          (s.description && s.description.toLowerCase().includes(q)) ||
          (s.items && s.items.some(i => i.label.toLowerCase().includes(q) || i.text.toLowerCase().includes(q))) ||
          (s.points && s.points.some(p => p.toLowerCase().includes(q))) ||
          (s.table && (s.table.headers.some(h => h.toLowerCase().includes(q)) || s.table.rows.some(r => r.some(c => c.toLowerCase().includes(q))))) ||
          (s.columns && s.columns.some(c => c.title.toLowerCase().includes(q) || c.points.some(p => p.toLowerCase().includes(q))))
        ));
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
            id={`lecture-note-${note.id}`}
            className="scroll-mt-24 bg-white border-2 border-pink-100 hover:border-purple-300 rounded-3xl p-6 md:p-8 shadow-xs transition space-y-4"
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
                  {note.subtitle && (
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      {note.subtitle}
                    </p>
                  )}
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
            {note.keyPoints && note.keyPoints.length > 0 && (
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
            )}

            {/* 6. Hafta Hiyerarşik Şeması veya Diğer Notların Bölümleri */}
            {note.id === 'not-6-hafta-bilgisayar-sistemleri' ? (
              <ComputerSystemHierarchy />
            ) : (
              note.sections && note.sections.map((sec, secIdx) => (
              <div key={secIdx} className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                    <span>{sec.icon || '🌐'}</span>
                    <span>{sec.heading}:</span>
                  </h4>
                  {sec.badge && (
                    <span className="text-[11px] font-bold text-pink-700 bg-pink-50 border border-pink-200 px-3 py-0.5 rounded-full">
                      {sec.badge}
                    </span>
                  )}
                </div>

                {/* Section Description */}
                {sec.description && (
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {sec.description}
                  </p>
                )}

                {/* If section has a table */}
                {sec.table && (
                  <div className="overflow-x-auto rounded-2xl border-2 border-pink-100/90 shadow-2xs">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 text-white">
                          {sec.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="py-2.5 px-4 font-black tracking-wide border-r last:border-r-0 border-white/20">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-pink-100 bg-white">
                        {sec.table.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className={`transition hover:bg-pink-50/40 ${rIdx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'}`}
                          >
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`py-2.5 px-4 text-slate-800 leading-relaxed border-r last:border-r-0 border-pink-50 ${
                                  cIdx === 0 ? 'font-bold text-slate-900 sm:w-1/3' : 'font-medium'
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* If section has columns (e.g. Faydaları vs Dikkat Edilmesi Gerekenler) */}
                {sec.columns && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sec.columns.map((col, colIdx) => {
                      const isGreen = col.color === 'green';
                      return (
                        <div
                          key={colIdx}
                          className={`p-4 rounded-2xl border-2 space-y-2.5 shadow-2xs ${
                            isGreen
                              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                              : 'bg-amber-50/70 border-amber-200 text-amber-950'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 border-b pb-2 border-current/20">
                            <span className="font-black text-xs sm:text-sm uppercase tracking-wide flex items-center gap-1.5">
                              {isGreen ? '✨' : '⚠️'} {col.title}
                            </span>
                            {col.badge && (
                              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                isGreen ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
                              }`}>
                                {col.badge}
                              </span>
                            )}
                          </div>
                          <ul className="space-y-1.5">
                            {col.points.map((pt, ptIdx) => (
                              <li key={ptIdx} className="text-xs sm:text-sm font-medium flex items-start gap-2 leading-relaxed">
                                <span className="font-bold text-base leading-none mt-0.5">•</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* If section has items (label + text pairs) */}
                {sec.items && sec.items.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2.5">
                    {sec.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="bg-gradient-to-br from-pink-50/40 via-white to-blue-50/40 p-3.5 rounded-2xl border border-pink-200/80 shadow-2xs flex flex-col justify-start"
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
                )}

                {/* If section has points (bullet list) */}
                {sec.points && sec.points.length > 0 && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {sec.points.map((point, ptIdx) => (
                      <li
                        key={ptIdx}
                        className="bg-gradient-to-br from-pink-50/20 via-white to-purple-50/20 p-3 rounded-2xl border border-pink-100 hover:border-pink-300 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-2.5 shadow-2xs transition"
                      >
                        <span className="w-5 h-5 rounded-full bg-pink-100 text-[#EC4899] font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          •
                        </span>
                        <span className="font-medium text-slate-800">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )))}

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

            {/* Homework Assignment Highlight Box */}
            {note.homework && (
              <div className="bg-gradient-to-r from-yellow-100 via-amber-100 to-yellow-200 border-2 border-amber-400 p-4 rounded-2xl shadow-2xs space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-950 bg-amber-300/80 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                    <ClipboardCheck className="w-3.5 h-3.5" />
                    <span>Haftalık Ödev Görevi</span>
                  </span>
                  {onSelectTab && (
                    <button
                      onClick={() => onSelectTab('odev')}
                      className="text-xs font-black text-amber-950 bg-white hover:bg-amber-50 border border-amber-300 px-3 py-1.5 rounded-xl shadow-2xs transition flex items-center gap-1"
                    >
                      <span>Ödev Sekmesini Aç</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-black text-slate-900 leading-relaxed">
                  {note.homework}
                </p>
              </div>
            )}

            {/* 4. Hafta Eğitsel Oyun ve Web Sitesi Bağlantı Alanı */}
            {note.id === 'not-4-hafta-yapay-zeka' && (
              <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 text-white p-5 rounded-2xl shadow-md border border-blue-400/30 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-400 text-slate-950">
                        🎮 4. Hafta Eğitsel Ders Oyunu
                      </span>
                      <span className="text-xs text-blue-200 font-bold">BTY.5.1.4 Kazanımı</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-black text-white">
                      Yapay Zekâ Temelleri – Bilgini Ölç (16 Soru)
                    </h4>
                    <p className="text-xs text-slate-300">
                      Öğrendiğiniz kavramları ve makine öğrenmesi kurallarını bu interaktif web oyunuyla hemen test edin!
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {onSelectTab && (
                      <button
                        onClick={() => onSelectTab('oyunlar')}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-95 text-slate-950 font-black text-xs transition shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <Gamepad2 className="w-4 h-4" />
                        <span>Oyunu Başlat</span>
                      </button>
                    )}
                    <a
                      href="/oyun-4-hafta-yapay-zeka.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition flex items-center gap-1.5"
                      title="Orijinal Web Oyunu HTML dosyasını yeni sekmede aç"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-300" />
                      <span>Web Sitesinde Oyna</span>
                    </a>
                    <a
                      href="/ders-notu-4-hafta-yapay-zeka.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition flex items-center gap-1.5"
                      title="Defter Notunu HTML Belgesi Olarak Aç / Yazdır"
                    >
                      <FileText className="w-3.5 h-3.5 text-pink-300" />
                      <span>HTML Notu Aç / Yazdır</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* 6. Hafta Donanım Avcısı Eğitsel Oyun ve Web Sitesi Bağlantı Alanı */}
            {note.id === 'not-6-hafta-bilgisayar-sistemleri' && (
              <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-teal-950 text-white p-5 rounded-2xl shadow-md border border-cyan-400/30 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-400 text-slate-950">
                        🎮 6. Hafta Eğitsel Ders Oyunu
                      </span>
                      <span className="text-xs text-cyan-200 font-bold">BTY.5.1.5 Kazanımı</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-black text-white">
                      Donanım Avcısı: İç ve Dış Donanım Macerası
                    </h4>
                    <p className="text-xs text-slate-300">
                      İç donanım parçalarını tanı, görevlerini eşleştir ve giriş-çıkış birimlerini sürükle-bırak kategorilerine ayır!
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {onSelectTab && (
                      <button
                        onClick={() => onSelectTab('oyunlar')}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 hover:opacity-95 text-slate-950 font-black text-xs transition shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <Gamepad2 className="w-4 h-4" />
                        <span>Oyunu Başlat</span>
                      </button>
                    )}
                    <a
                      href="/oyun-6-hafta-donanim-avcisi.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition flex items-center gap-1.5"
                      title="Orijinal Donanım Avcısı HTML dosyasını yeni sekmede aç"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-300" />
                      <span>Web Sitesinde Oyna</span>
                    </a>
                    <a
                      href="/ders-notu-6-hafta-bilgisayar-sistemleri.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition flex items-center gap-1.5"
                      title="6. Hafta Defter Notunu HTML Belgesi Olarak Aç / Yazdır"
                    >
                      <FileText className="w-3.5 h-3.5 text-pink-300" />
                      <span>HTML Notu Aç / Yazdır</span>
                    </a>
                    <a
                      href="/assets/aistudio/6.Hafta_Ders_Notu__1__107d93b2.pdf"
                      download="6.Hafta_Ders_Notu_BTY_5_1_5.pdf"
                      className="px-3.5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 font-bold text-xs transition flex items-center gap-1.5"
                      title="Orijinal PDF Belgesini İndir"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-300" />
                      <span>PDF İndir</span>
                    </a>
                  </div>
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

            {/* Teacher Footer Signature */}
            <div className="pt-2 border-t border-pink-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span className="text-[#EC4899] font-bold">5. Sınıf BTY Defter Notu</span>
              <span className="text-purple-900 font-extrabold">Hilal KURTOĞLU &bull; Bilgisayar ve Öğretim Teknolojileri Öğretmeni</span>
            </div>
          </div>
        ))}

        {filteredNotes.length === 0 && (
          <div className="bg-white border-2 border-pink-100 rounded-3xl p-10 text-center space-y-3 shadow-xs">
            <span className="text-4xl block">📝</span>
            <h3 className="text-lg font-black text-slate-800">Henüz Not Bulunamadı</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Arama kriterlerinize veya seçtiğiniz döneme ait henüz ders notu eklenmemiştir.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
