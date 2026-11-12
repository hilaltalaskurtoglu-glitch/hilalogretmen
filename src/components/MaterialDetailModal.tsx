import React, { useState } from 'react';
import { Material } from '../types';
import { downloadMaterialFile, copyMaterialShareLink, downloadBinaryBlob } from '../utils/downloadHelper';
import { getAssetUrl } from '../utils/assetUrl';
import { 
  X, 
  Download, 
  Play, 
  CheckCircle2, 
  Calendar, 
  User, 
  FileText, 
  Monitor, 
  Tag, 
  ExternalLink, 
  Copy, 
  Printer, 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Sparkles,
  Layers,
  Eye
} from 'lucide-react';

interface MaterialDetailModalProps {
  material: Material | null;
  onClose: () => void;
  onPlayGame: (key?: string) => void;
  onSelectTab?: (tab: string) => void;
}

export const MaterialDetailModal: React.FC<MaterialDetailModalProps> = ({
  material,
  onClose,
  onPlayGame,
  onSelectTab
}) => {
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeViewMode, setActiveViewMode] = useState<'content' | 'info'>('content');

  if (!material) return null;

  // Determine media type
  const isImage = 
    material.fileFormat === 'JPG' || 
    material.fileFormat === 'PNG' || 
    (material.downloadUrl && /\.(jpg|jpeg|png|webp)$/i.test(material.downloadUrl)) ||
    (material.previewUrl && /\.(jpg|jpeg|png|webp)$/i.test(material.previewUrl));

  const isHtml = 
    material.fileFormat === 'HTML5' || 
    material.fileFormat?.includes('HTML') ||
    (material.downloadUrl && material.downloadUrl.endsWith('.html'));

  const isPdf = 
    material.fileFormat === 'PDF' || 
    (material.downloadUrl && material.downloadUrl.endsWith('.pdf'));

  const isGame = material.type === 'oyun';
  const isActivity = material.type === 'etkinlik';
  const hasExternalLink = material.downloadUrl && (material.downloadUrl.startsWith('http://') || material.downloadUrl.startsWith('https://'));

  const rawSource = material.previewUrl || material.downloadUrl;
  const mediaSourceUrl = rawSource ? getAssetUrl(rawSource) : '';

  const handleDownload = async () => {
    // If it's an image, download via binary blob
    if (isImage && mediaSourceUrl) {
      const cleanExt = mediaSourceUrl.toLowerCase().endsWith('.png') ? 'png' : 'jpg';
      const cleanName = `${material.fileName || sanitizeFileName(material.title)}.${cleanExt}`;
      const res = await downloadBinaryBlob(mediaSourceUrl, cleanName);
      setDownloadMsg(res.message);
      setTimeout(() => setDownloadMsg(null), 4500);
      return;
    }

    // If it's a PDF, download via binary blob
    if (isPdf && mediaSourceUrl) {
      const cleanName = material.fileName || `${sanitizeFileName(material.title)}.pdf`;
      const res = await downloadBinaryBlob(mediaSourceUrl, cleanName);
      setDownloadMsg(res.message);
      setTimeout(() => setDownloadMsg(null), 4500);
      return;
    }

    const res = downloadMaterialFile(material);
    setDownloadMsg(res.message);
    setTimeout(() => {
      setDownloadMsg(null);
    }, 4500);
  };

  const handlePrint = () => {
    if (isImage && mediaSourceUrl) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${material.title} - Yazdır / PDF</title>
              <style>
                @page { size: auto; margin: 10mm; }
                body { margin: 0; padding: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: system-ui, sans-serif; background: #fff; }
                h2 { font-size: 16px; margin-bottom: 10px; color: #1e293b; text-align: center; }
                img { max-width: 100%; height: auto; max-height: 92vh; object-fit: contain; }
                @media print {
                  body { padding: 0; }
                  .no-print { display: none; }
                }
              </style>
            </head>
            <body>
              <div class="no-print" style="margin-bottom: 12px; text-align: center;">
                <button onclick="window.print()" style="padding: 8px 16px; background: #8b5cf6; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
                  Yazdır / PDF Olarak Kaydet
                </button>
              </div>
              <img src="${mediaSourceUrl}" alt="${material.title}" onload="window.print()" />
            </body>
          </html>
        `);
        printWindow.document.close();
      }
      return;
    }

    if (isHtml && mediaSourceUrl) {
      const win = window.open(mediaSourceUrl, '_blank');
      if (win) {
        setTimeout(() => win.print(), 800);
      }
      return;
    }

    window.print();
  };

  const handleCopyLink = async () => {
    const success = await copyMaterialShareLink(material);
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const sanitizeFileName = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[ğ]/g, 'g')
      .replace(/[ü]/g, 'u')
      .replace(/[ş]/g, 's')
      .replace(/[ı]/g, 'i')
      .replace(/[ö]/g, 'o')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9_-]/g, '_')
      .replace(/_+/g, '_');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`bg-white border-2 border-pink-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${
          isFullscreen 
            ? 'w-full h-full rounded-none border-none' 
            : 'max-w-6xl w-full h-[94vh] max-h-[94vh]'
        }`}
      >
        
        {/* ======================================================== */}
        {/* MODAL HEADER: Title, Badges & Control Actions           */}
        {/* ======================================================== */}
        <div className="bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] text-white p-4 sm:p-5 flex items-center justify-between gap-3 shrink-0 shadow-md">
          <div className="min-w-0 flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shrink-0">
              {isImage ? '🖼️' : isActivity ? '🧩' : isGame ? '🎮' : isPdf ? '📄' : '📁'}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-white/25 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  {material.grade} &bull; {material.unit}
                </span>
                <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {material.fileFormat} &bull; {material.fileSize}
                </span>
                {material.author && (
                  <span className="text-[11px] text-pink-100 font-bold hidden md:inline">
                    Hazırlayan: {material.author}
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-xl font-black text-white leading-tight truncate mt-0.5" title={material.title}>
                {material.title}
              </h3>
            </div>
          </div>

          {/* Top Right Action Ribbon */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* View Mode Switcher (if interactive/image) */}
            {(isImage || isHtml || isPdf) && (
              <div className="hidden sm:flex items-center bg-white/15 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveViewMode('content')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    activeViewMode === 'content'
                      ? 'bg-white text-purple-900 shadow-xs'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Tam Sayfa Görünüm
                </button>
                <button
                  type="button"
                  onClick={() => setActiveViewMode('info')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    activeViewMode === 'info'
                      ? 'bg-white text-purple-900 shadow-xs'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Açıklama &amp; Bilgi
                </button>
              </div>
            )}

            {/* Print / Save to PDF Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
              title="A4 Yazdır veya PDF Olarak Kaydet"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Yazdır / PDF</span>
            </button>

            {/* Primary Download Button */}
            <button
              type="button"
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-xl bg-white text-purple-900 hover:bg-pink-50 font-black text-xs transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              title="Dosyayı Bilgisayarına İndir"
            >
              <Download className="w-3.5 h-3.5 text-pink-600" />
              <span>{isImage ? 'JPG İndir' : isPdf ? 'PDF İndir' : 'İndir'}</span>
            </button>

            {/* External Tab Link */}
            {mediaSourceUrl && (
              <a
                href={mediaSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition flex items-center justify-center"
                title="Yeni Sekmede Tam Ekran Aç"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreen(prev => !prev)}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition flex items-center justify-center cursor-pointer"
              title={isFullscreen ? 'Normal Boyut' : 'Tam Ekran'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition flex items-center justify-center cursor-pointer ml-1"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Download notification alert */}
        {downloadMsg && (
          <div className="bg-emerald-500 text-white px-4 py-2 text-xs font-bold flex items-center justify-between shrink-0 animate-in fade-in duration-200">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{downloadMsg}</span>
            </span>
            <button onClick={() => setDownloadMsg(null)} className="text-white/80 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL BODY: Interactive Content / Image / Description    */}
        {/* ======================================================== */}
        <div className="flex-1 overflow-hidden flex flex-col bg-slate-900/5 relative">
          
          {/* VIEW MODE 1: FULL PAGE CONTENT (DEFAULT) */}
          {activeViewMode === 'content' && (
            <div className="flex-1 overflow-hidden flex flex-col h-full w-full">
              
              {/* A) RESİM / POSTER (JPG / PNG) GÖRÜNTÜLEYİCİ */}
              {isImage && mediaSourceUrl && (
                <div className="flex-1 flex flex-col overflow-hidden bg-slate-950 relative">
                  {/* Floating Zoom & Controls Toolbar */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 bg-slate-900/90 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-2xl flex items-center gap-2 shadow-lg">
                    <button
                      onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.5))}
                      className="p-1.5 rounded-lg hover:bg-white/20 transition cursor-pointer"
                      title="Uzaklaştır"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-bold px-1 min-w-[48px] text-center">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 3))}
                      className="p-1.5 rounded-lg hover:bg-white/20 transition cursor-pointer"
                      title="Yakınlaştır"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setZoomLevel(1)}
                      className="p-1.5 rounded-lg hover:bg-white/20 transition text-xs font-bold flex items-center gap-1 cursor-pointer"
                      title="Boyutu Sıfırla"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Sıfırla</span>
                    </button>
                  </div>

                  {/* Main Image Canvas */}
                  <div className="flex-1 overflow-auto flex items-center justify-center p-4">
                    <img
                      src={mediaSourceUrl}
                      alt={material.title}
                      style={{
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: 'center center',
                        transition: 'transform 0.15s ease-out'
                      }}
                      className="max-h-[82vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                    />
                  </div>
                </div>
              )}

              {/* B) ETKİNLİK KÂĞIDI & İNTERAKTİF HTML GÖRÜNTÜLEYİCİ */}
              {isHtml && mediaSourceUrl && (
                <div className="flex-1 flex flex-col overflow-hidden bg-slate-100 relative">
                  <iframe
                    src={mediaSourceUrl}
                    title={material.title}
                    className="w-full h-full border-none flex-1 bg-white"
                    sandbox="allow-scripts allow-same-origin allow-downloads allow-forms allow-modals"
                  />
                </div>
              )}

              {/* C) PDF BELGESİ GÖRÜNTÜLEYİCİ */}
              {isPdf && mediaSourceUrl && (
                <div className="flex-1 flex flex-col overflow-hidden bg-slate-100 relative">
                  <iframe
                    src={mediaSourceUrl}
                    title={material.title}
                    className="w-full h-full border-none flex-1 bg-white"
                  />
                </div>
              )}

              {/* D) DİĞER FORMATLAR / SİMÜLASYON / AÇIKLAMA */}
              {!isImage && !isHtml && !isPdf && (
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-white">
                  {/* Detailed Description */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-extrabold text-purple-900 uppercase tracking-wider">
                      Materyal Açıklaması &bull; İçerik
                    </h4>
                    <p className="text-sm md:text-base text-slate-700 leading-relaxed bg-pink-50/30 p-4 rounded-2xl border border-pink-100">
                      {material.description}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-pink-50 to-blue-50 border border-pink-200 p-5 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                      <Monitor className="w-4 h-4 text-[#EC4899]" />
                      <span>Akıllı Tahta &amp; Sınıf İçi Kullanım İpuçları</span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                      Bu materyal akıllı tahtada tam ekran modunda açılarak öğrencilerin bireysel ya da grup çalışmaları yapabilmesi için optimize edilmiştir.
                    </p>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* VIEW MODE 2: METADATA & INFORMATION PANEL */}
          {activeViewMode === 'info' && (
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-white">
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
            </div>
          )}

        </div>

        {/* ======================================================== */}
        {/* MODAL FOOTER BAR                                         */}
        {/* ======================================================== */}
        <div className="p-3 sm:p-4 bg-white border-t border-pink-100 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            onClick={handleCopyLink}
            className="px-3.5 py-2 rounded-xl border border-pink-200 bg-pink-50/50 hover:bg-pink-100/60 text-purple-900 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
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

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-pink-200 text-slate-600 font-bold text-xs hover:bg-pink-50/50 transition cursor-pointer"
            >
              Kapat
            </button>

            {hasExternalLink && (
              <a
                href={material.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition"
              >
                <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                <span>Bağlantıyı Aç</span>
              </a>
            )}

            {isGame && (
              <button
                onClick={() => {
                  onClose();
                  onPlayGame(material.interactiveGameKey);
                }}
                className="px-4 py-2 bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] hover:opacity-95 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-md transition cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Oyunu Oyna</span>
              </button>
            )}

            <button
              onClick={handleDownload}
              className="px-5 py-2 bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] hover:opacity-95 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-md transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isImage ? 'JPG Resmi İndir' : isPdf ? 'PDF Belgesi İndir' : `İndir (${material.fileFormat})`}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
