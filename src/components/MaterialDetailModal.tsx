import React, { useState } from 'react';
import { Material } from '../types';
import { downloadMaterialFile, copyMaterialShareLink } from '../utils/downloadHelper';
import { X, Download, Play, CheckCircle2, Calendar, User, FileText, Monitor, Tag, ExternalLink, Link2, Copy } from 'lucide-react';

interface MaterialDetailModalProps {
  material: Material | null;
  onClose: () => void;
  onPlayGame: (key?: string) => void;
}

export const MaterialDetailModal: React.FC<MaterialDetailModalProps> = ({
  material,
  onClose,
  onPlayGame
}) => {
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!material) return null;

  const handleDownload = () => {
    const res = downloadMaterialFile(material);
    setDownloadMsg(res.message);
    setTimeout(() => {
      setDownloadMsg(null);
    }, 4500);
  };

  const handleCopyLink = async () => {
    const success = await copyMaterialShareLink(material);
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const isGame = material.type === 'oyun';
  const hasExternalLink = material.downloadUrl && (material.downloadUrl.startsWith('http://') || material.downloadUrl.startsWith('https://'));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white border-2 border-pink-100 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] text-white p-6 rounded-t-3xl flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/25 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase">
                {material.grade}
              </span>
              <span className="bg-white/20 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                {material.fileFormat} &bull; {material.fileSize}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
              {material.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition shrink-0"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-pink-50/40 rounded-2xl border border-pink-100 text-xs">
            <div>
              <span className="text-slate-500 font-semibold block">Hazırlayan</span>
              <span className="font-bold text-slate-800">{material.author}</span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">Tarih</span>
              <span className="font-bold text-slate-800">{material.dateAdded}</span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">Tür</span>
              <span className="font-bold text-purple-700 uppercase">{material.type}</span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">Ünite</span>
              <span className="font-bold text-blue-700 truncate block" title={material.unit}>{material.unit}</span>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-extrabold text-purple-900 uppercase tracking-wider">
              Materyal Açıklaması &bull; İçerik
            </h4>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed bg-white p-4 rounded-2xl border border-pink-100">
              {material.description}
            </p>
          </div>

          {/* Interactive Simulation / Preview Box */}
          <div className="bg-gradient-to-r from-pink-50 to-blue-50 border border-pink-200 p-4 md:p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
              <Monitor className="w-4 h-4 text-[#EC4899]" />
              <span>Akıllı Tahta &amp; Sınıf İçi Kullanım İpuçları</span>
            </div>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              Bu materyal akıllı tahtada tam ekran modunda açılarak öğrencilerin bireysel ya da grup çalışmaları yapabilmesi için optimize edilmiştir.
            </p>
          </div>

          {/* Tags */}
          {material.tags && material.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-3.5 h-3.5 text-purple-400" />
              {material.tags.map((tag, idx) => (
                <span key={idx} className="text-xs bg-pink-50/60 border border-pink-200 text-purple-800 px-2.5 py-1 rounded-lg font-semibold">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Download feedback */}
          {downloadMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-2xs animate-in fade-in duration-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{downloadMsg}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-pink-100 flex flex-wrap items-center justify-between gap-3">
            {/* Left group: Copy share link */}
            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-xl border border-pink-200 bg-pink-50/50 hover:bg-pink-100/60 text-purple-900 font-bold text-xs sm:text-sm transition flex items-center gap-1.5"
              title="Materyal Bağlantısını Kopyala"
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Bağlantı Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#EC4899]" />
                  <span>Bağlantıyı Kopyala</span>
                </>
              )}
            </button>

            {/* Right group: Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-pink-200 text-slate-600 font-bold text-xs sm:text-sm hover:bg-pink-50/50 transition"
              >
                Kapat
              </button>

              {hasExternalLink && (
                <a
                  href={material.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-800 font-bold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 transition"
                >
                  <ExternalLink className="w-4 h-4 text-blue-600" />
                  <span>Bağlantıyı Aç</span>
                </a>
              )}

              {isGame ? (
                <button
                  onClick={() => {
                    onClose();
                    onPlayGame(material.interactiveGameKey);
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] hover:opacity-95 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-md transition"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Oyunu Şimdi Başlat</span>
                </button>
              ) : (
                <button
                  onClick={handleDownload}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] hover:opacity-95 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-md transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Dosyayı İndir ({material.fileFormat})</span>
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
