import React, { useState } from 'react';
import { Material, MaterialType } from '../types';
import { downloadMaterialFile } from '../utils/downloadHelper';
import { Search, Filter, Play, Download, ExternalLink, Sparkles, Tag, PlusCircle, Layers, Calendar, User, CheckCircle2 } from 'lucide-react';

interface MaterialsLibraryProps {
  materials: Material[];
  onOpenMaterial: (mat: Material) => void;
  onOpenAddModal: () => void;
  onPlayGame: (gameKey?: string) => void;
}

export const MaterialsLibrary: React.FC<MaterialsLibraryProps> = ({
  materials,
  onOpenMaterial,
  onOpenAddModal,
  onPlayGame
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedUnit, setSelectedUnit] = useState<string>('all');

  // Extract unique units for filter dropdown
  const units = Array.from(new Set(materials.map(m => m.unit))).filter(Boolean);

  const filteredMaterials = materials.filter(mat => {
    if (selectedType !== 'all' && mat.type !== selectedType) return false;
    if (selectedUnit !== 'all' && mat.unit !== selectedUnit) return false;
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      const match =
        mat.title.toLowerCase().includes(q) ||
        mat.description.toLowerCase().includes(q) ||
        mat.unit.toLowerCase().includes(q) ||
        mat.tags.some(t => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const getTypeIcon = (type: MaterialType) => {
    switch (type) {
      case 'oyun': return '🎮';
      case 'sunum': return '📊';
      case 'dokuman': return '📄';
      case 'video': return '🎬';
      case 'etkinlik': return '🧩';
      default: return '📁';
    }
  };

  const getTypeName = (type: MaterialType) => {
    switch (type) {
      case 'oyun': return 'Eğitsel Oyun';
      case 'sunum': return 'Ders Sunumu';
      case 'dokuman': return 'Belge / Kılavuz';
      case 'video': return 'Eğitici Video';
      case 'etkinlik': return 'Etkinlik / Kâğıt';
      default: return 'Materyal';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls Card */}
      <div className="bg-white border-2 border-pink-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-900 bg-gradient-to-r from-pink-100 to-blue-100 border border-pink-200 px-3 py-1 rounded-full">
              Hilal KURTOĞLU Ders Deposu
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 mt-1.5">
              Ders Materyalleri Kütüphanesi
            </h2>
            <p className="text-sm md:text-base text-slate-600 mt-1">
              5. Sınıf Bilişim Teknolojileri ve Yazılım dersi için hazırlanan sunumlar, oyunlar, videolar ve dokümanlar.
            </p>
          </div>

          <button
            onClick={onOpenAddModal}
            className="self-start md:self-auto px-5 py-3 bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] hover:opacity-95 text-white font-bold rounded-2xl transition flex items-center gap-2 shadow-sm shrink-0"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Yeni Materyal Ekle</span>
          </button>
        </div>

        {/* Search & Filters Bar */}
        <div className="pt-4 border-t border-pink-100 space-y-4">
          {/* Top filter row: Type pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition whitespace-nowrap ${
                selectedType === 'all'
                  ? 'bg-gradient-to-r from-[#EC4899] to-[#3B82F6] text-white shadow-xs'
                  : 'bg-pink-50/50 text-slate-600 hover:bg-pink-100/60'
              }`}
            >
              Tüm Türler ({materials.length})
            </button>
            <button
              onClick={() => setSelectedType('oyun')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                selectedType === 'oyun'
                  ? 'bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white shadow-xs'
                  : 'bg-pink-50/50 text-slate-600 hover:bg-pink-100/60'
              }`}
            >
              <span>🎮 Oyunlar</span>
            </button>
            <button
              onClick={() => setSelectedType('sunum')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                selectedType === 'sunum'
                  ? 'bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white shadow-xs'
                  : 'bg-pink-50/50 text-slate-600 hover:bg-pink-100/60'
              }`}
            >
              <span>📊 Sunumlar (pptx/pdf)</span>
            </button>
            <button
              onClick={() => setSelectedType('dokuman')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                selectedType === 'dokuman'
                  ? 'bg-gradient-to-r from-[#EC4899] to-[#3B82F6] text-white shadow-xs'
                  : 'bg-pink-50/50 text-slate-600 hover:bg-pink-100/60'
              }`}
            >
              <span>📄 Belgeler (docx/pdf)</span>
            </button>
            <button
              onClick={() => setSelectedType('video')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                selectedType === 'video'
                  ? 'bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white shadow-xs'
                  : 'bg-pink-50/50 text-slate-600 hover:bg-pink-100/60'
              }`}
            >
              <span>🎬 Videolar</span>
            </button>
            <button
              onClick={() => setSelectedType('etkinlik')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                selectedType === 'etkinlik'
                  ? 'bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white shadow-xs'
                  : 'bg-pink-50/50 text-slate-600 hover:bg-pink-100/60'
              }`}
            >
              <span>🧩 Etkinlik Kâğıtları</span>
            </button>
          </div>

          {/* Search bar & Unit Dropdown */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Materyal adı, konu veya etiket ara..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-pink-200 bg-pink-50/30 text-sm focus:bg-white focus:outline-none focus:border-purple-400 text-slate-800"
              />
            </div>

            <div className="w-full sm:w-64 shrink-0">
              <select
                aria-label="Üniteye Göre Filtrele"
                value={selectedUnit}
                onChange={e => setSelectedUnit(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 bg-pink-50/30 text-xs md:text-sm font-semibold text-slate-700 focus:outline-none focus:border-purple-400"
              >
                <option value="all">Tüm Üniteler</option>
                {units.map((u, i) => (
                  <option key={i} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Materials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMaterials.map(mat => {
          const isGame = mat.type === 'oyun';
          return (
            <div
              key={mat.id}
              className="bg-white border-2 border-pink-100 hover:border-purple-300 rounded-3xl p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                {/* Header: Icon, format & type */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-50 to-blue-50 border border-pink-200 flex items-center justify-center text-2xl group-hover:scale-110 transition shrink-0">
                    {getTypeIcon(mat.type)}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-pink-50 text-purple-900 border border-pink-200">
                      {mat.fileFormat}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">
                      {mat.fileSize}
                    </span>
                  </div>
                </div>

                {/* Badges: Grade & Unit */}
                <div className="flex items-center gap-1.5 flex-wrap mb-2">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-pink-100/70 text-pink-700">
                    {mat.grade}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100/70 text-blue-800 truncate max-w-[200px]">
                    {mat.unit}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-extrabold text-slate-800 group-hover:text-purple-700 leading-snug">
                  {mat.title}
                </h3>

                {/* Description */}
                <p className="text-xs md:text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {mat.description}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-1.5 flex-wrap mt-3 pt-2">
                  {mat.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-medium text-slate-600 bg-pink-50/50 px-2 py-0.5 rounded-md border border-pink-100">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 mt-4 border-t border-pink-100 flex items-center justify-between gap-2">
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#EC4899]" />
                  <span>{mat.dateAdded}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {isGame ? (
                    <button
                      onClick={() => onPlayGame(mat.interactiveGameKey)}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] hover:opacity-95 text-white text-xs font-bold rounded-xl flex items-center gap-1 transition shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Oyunu Oyna</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadMaterialFile(mat);
                        }}
                        className="px-3 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-95 text-white text-xs font-bold rounded-xl flex items-center gap-1 transition shadow-2xs"
                        title="Dosyayı doğrudan bilgisayarına indir"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>İndir</span>
                      </button>

                      <button
                        onClick={() => onOpenMaterial(mat)}
                        className="px-3 py-1.5 bg-pink-50 hover:bg-pink-100 text-purple-900 border border-pink-200 text-xs font-bold rounded-xl flex items-center gap-1 transition shadow-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Detay</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="bg-white border border-[#cfe6f5] rounded-3xl p-12 text-center space-y-3">
          <p className="text-base font-bold text-[#1B4965]">Aradığınız kriterlere uygun materyal bulunamadı.</p>
          <p className="text-xs text-[#385777]">Filtreleri sıfırlayarak tekrar deneyebilir veya yeni bir materyal yükleyebilirsiniz.</p>
          <button
            onClick={() => { setSelectedType('all'); setSelectedUnit('all'); setSearchTerm(''); }}
            className="px-4 py-2 bg-[#EAF6FF] text-[#2E6F95] font-bold text-xs rounded-xl"
          >
            Filtreleri Temizle
          </button>
        </div>
      )}
    </div>
  );
};
