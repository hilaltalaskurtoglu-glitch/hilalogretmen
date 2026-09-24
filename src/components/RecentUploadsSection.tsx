import React, { useState } from 'react';
import { Material } from '../types';
import { downloadMaterialFile } from '../utils/downloadHelper';
import { PlusCircle, ExternalLink, Download, Trash2, Calendar, FileText, Play, Tag, Sparkles, FolderPlus, CheckCircle2, Link2 } from 'lucide-react';

interface RecentUploadsSectionProps {
  materials: Material[];
  onOpenMaterial: (mat: Material) => void;
  onOpenAddModal: () => void;
  onDeleteMaterial?: (id: string) => void;
  onPlayGame?: (gameKey?: string) => void;
}

export const RecentUploadsSection: React.FC<RecentUploadsSectionProps> = ({
  materials,
  onOpenMaterial,
  onOpenAddModal,
  onDeleteMaterial,
  onPlayGame
}) => {
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const handleQuickDownload = (e: React.MouseEvent, mat: Material) => {
    e.stopPropagation();
    const res = downloadMaterialFile(mat);
    setDownloadToast(res.message);
    setTimeout(() => setDownloadToast(null), 4000);
  };
  // Filter out any standalone system game if we want to focus on uploaded educational materials,
  // or sort all materials by dateAdded descending
  const uploadedMaterials = materials.filter(m => m.id !== 'mat-game-1');

  const getTypeBadge = (type: Material['type']) => {
    switch (type) {
      case 'sunum':
        return { label: 'Sunum', icon: '📊', color: 'from-purple-100 to-indigo-100 text-purple-900 border-purple-200' };
      case 'dokuman':
        return { label: 'Doküman', icon: '📄', color: 'from-blue-100 to-sky-100 text-blue-900 border-blue-200' };
      case 'video':
        return { label: 'Video', icon: '🎬', color: 'from-pink-100 to-rose-100 text-pink-900 border-pink-200' };
      case 'oyun':
        return { label: 'Eğitsel Oyun', icon: '🎮', color: 'from-amber-100 to-pink-100 text-amber-900 border-amber-200' };
      case 'etkinlik':
        return { label: 'Etkinlik Kâğıdı', icon: '🧩', color: 'from-emerald-100 to-teal-100 text-emerald-900 border-emerald-200' };
      default:
        return { label: 'Materyal', icon: '📁', color: 'from-pink-100 to-blue-100 text-purple-900 border-pink-200' };
    }
  };

  return (
    <section id="son-yuklenenler-alani" className="space-y-4 pt-2">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/95 backdrop-blur-xs border-2 border-pink-200/90 rounded-3xl p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-purple-900 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 border border-pink-200 px-3 py-1 rounded-full">
              Orta Bölüm &bull; Dinamik Akış
            </span>
            <span className="text-xs font-bold text-slate-500">
              ({uploadedMaterials.length} materyal yüklendi)
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-1.5 flex items-center gap-2">
            <span>📥 Son Yüklenenler</span>
            <span className="text-xs font-bold text-pink-600 bg-pink-50 border border-pink-200 px-2.5 py-0.5 rounded-full">
              Haftalık Materyal Havuzu
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Hilal Öğretmen menülere ve haftalara materyal ekledikçe burada otomatik olarak en yeni yüklenenler listelenir.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="self-start sm:self-auto px-4 py-2.5 bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] hover:opacity-95 text-white font-extrabold text-xs sm:text-sm rounded-2xl transition flex items-center gap-2 shadow-xs shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Yeni Materyal Yükle</span>
        </button>
      </div>

      {/* Download Toast Notification */}
      {downloadToast && (
        <div className="p-3.5 bg-emerald-50 border-2 border-emerald-200 text-emerald-900 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-between gap-2 shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{downloadToast}</span>
          </div>
          <button
            onClick={() => setDownloadToast(null)}
            className="text-xs text-emerald-700 hover:text-emerald-900 font-extrabold px-2 py-0.5 rounded-lg hover:bg-emerald-100"
          >
            Tamam
          </button>
        </div>
      )}

      {/* Materials List or Empty State */}
      {uploadedMaterials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {uploadedMaterials.map((mat) => {
            const badge = getTypeBadge(mat.type);
            const isGame = mat.type === 'oyun';

            // Location information
            const locationStr = mat.term && mat.week 
              ? `${mat.term} • ${mat.week}. Hafta (${mat.unit || 'Ders Konusu'})`
              : mat.unit || '5. Sınıf Bilişim Teknolojileri';

            return (
              <div
                key={mat.id}
                className="bg-white border-2 border-pink-100 hover:border-purple-300 rounded-3xl p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Decorative subtle background corner tag */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pink-100/40 to-transparent pointer-events-none rounded-bl-full" />

                <div>
                  {/* Top row: Type badge, file format, delete */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-xl bg-gradient-to-r ${badge.color} border flex items-center gap-1.5 shadow-2xs`}>
                      <span>{badge.icon}</span>
                      <span>{badge.label}</span>
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                        {mat.fileFormat || 'DOSYA'}
                      </span>
                      {onDeleteMaterial && (
                        <button
                          onClick={() => {
                            if (window.confirm(`"${mat.title}" materyalini silmek istediğinize emin misiniz?`)) {
                              onDeleteMaterial(mat.id);
                            }
                          }}
                          className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
                          title="Materyali Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Menu / Week badge */}
                  <div className="mb-2">
                    <span className="text-[11px] font-bold text-purple-900 bg-pink-50/80 px-2.5 py-1 rounded-lg border border-pink-200 inline-block line-clamp-1">
                      📍 {locationStr}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-extrabold text-base text-slate-800 group-hover:text-purple-700 leading-snug line-clamp-2">
                    {mat.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {mat.description}
                  </p>
                </div>

                {/* Footer: Date, Author & Action */}
                <div className="pt-3.5 mt-3.5 border-t border-pink-100 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#EC4899]" />
                    <span>{mat.dateAdded}</span>
                  </div>

                  {isGame ? (
                    <button
                      onClick={() => onPlayGame ? onPlayGame(mat.interactiveGameKey) : onOpenMaterial(mat)}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] hover:opacity-95 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-2xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Oyunu Başlat</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => handleQuickDownload(e, mat)}
                        className="px-3 py-1.5 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 hover:opacity-95 text-white text-xs font-extrabold rounded-xl flex items-center gap-1 transition shadow-2xs"
                        title="Dosyayı doğrudan bilgisayarına indir"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>İndir</span>
                      </button>

                      <button
                        onClick={() => onOpenMaterial(mat)}
                        className="px-2.5 py-1.5 bg-pink-50 hover:bg-pink-100 text-purple-900 border border-pink-200 text-xs font-bold rounded-xl flex items-center gap-1 transition shadow-2xs"
                        title="Detayları incele ve bağlantıyı kopyala"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>İncele</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border-2 border-dashed border-pink-200 rounded-3xl p-8 text-center space-y-4 shadow-2xs">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-pink-100 to-blue-100 text-3xl flex items-center justify-center mx-auto border-2 border-pink-200 text-purple-700">
            📂
          </div>

          <div className="max-w-md mx-auto space-y-1.5">
            <h4 className="text-lg font-black text-slate-800">
              Henüz Yeni Ders Materyali Yüklenmedi
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Hilal Öğretmen olarak sol menüdeki haftalara veya sağ paneldeki <span className="font-bold text-purple-700">"Hızlı Materyal Yükle"</span> alanından dilediğiniz sunum, doküman, video ve etkinlikleri yükleyebilirsiniz.
            </p>
            <p className="text-xs text-purple-700 font-semibold pt-1">
              Menülere eklediğiniz her materyal anında bu bölümde "Son Yüklenenler" listesine eklenecektir.
            </p>
          </div>

          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] hover:opacity-95 text-white font-extrabold text-sm rounded-2xl shadow-xs transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>İlk Materyali Şimdi Yükle</span>
          </button>
        </div>
      )}
    </section>
  );
};
