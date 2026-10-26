import React, { useState } from 'react';
import { 
  Download, 
  Maximize2, 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  FileText, 
  Image as ImageIcon, 
  X, 
  Sparkles,
  ChevronRight,
  ExternalLink,
  Layers,
  Award
} from 'lucide-react';
import { ComputerSystemHierarchy } from './ComputerSystemHierarchy';

export interface PosterItem {
  id: string;
  title: string;
  category: 'mufredat' | 'etkinlik' | 'pano';
  week?: string;
  badge: string;
  badgeColor: string;
  imageSrc: string;
  pdfSrc?: string;
  description: string;
  outcome?: string;
  date: string;
  isFeatured?: boolean;
  authorCredit?: string;
}

export const POSTERS_DATA: PosterItem[] = [
  {
    id: 'poster-secil-gokce-giris-cikis',
    title: 'Bilgisayar İçin Giriş-Çıkış Birimleri',
    category: 'mufredat',
    week: '6. Hafta',
    badge: 'Hazırlayan: Seçil GÖKÇE',
    badgeColor: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white',
    imageSrc: '/assets/aistudio/bilgisayar_i_in_giri____k___birimleri_87619813.jpg',
    description: 'Klavye, fare, dokunmatik ekran, monitör, yazıcı, tarayıcı, hoparlör, kulaklık, mikrofon ve modem gibi tüm giriş, çıkış ve çift yönlü birimleri açıklayan eğitsel infografik ders afişi. Hazırlayan: Seçil GÖKÇE.',
    outcome: 'BTY.5.1.5. Bilgisayar sistemlerinin temel bileşenlerini ve aralarındaki ilişkileri açıklar.',
    date: '2026-10-20',
    isFeatured: true,
    authorCredit: 'Seçil Gökçe hocamıza hazırladığı materyaller için teşekkür ederiz.'
  },
  {
    id: 'poster-secil-gokce-klavye-fare',
    title: 'Klavye Tuşları ve Fare Kullanım Rehberi',
    category: 'mufredat',
    week: '6. Hafta',
    badge: 'Hazırlayan: Seçil GÖKÇE',
    badgeColor: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
    imageSrc: '/assets/aistudio/fare-klavye_73015f07.jpg',
    description: 'Klavyenin 5 temel bölümü, tuşların görevleri (Shift, Caps Lock, Space, Backspace, Delete vb.), klavye kısayolları ve farenin bölümleri ile tıklama-sürükleme işlemlerini gösteren görsel kılavuz posteri. Hazırlayan: Seçil GÖKÇE.',
    outcome: 'BTY.5.1.5. Giriş-çıkış birimlerini ve klavye-fare işlevlerini doğru biçimde kullanır.',
    date: '2026-10-20',
    isFeatured: true,
    authorCredit: 'Seçil Gökçe hocamıza hazırladığı materyaller için teşekkür ederiz.'
  }
];

interface PostersViewProps {
  onSelectTab?: (tab: string) => void;
}

export const PostersView: React.FC<PostersViewProps> = ({ onSelectTab }) => {
  const [selectedPoster, setSelectedPoster] = useState<PosterItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'mufredat' | 'pano' | 'etkinlik'>('all');
  const [zoomLevel, setZoomLevel] = useState(1);

  const featuredPoster = POSTERS_DATA[0];

  const filteredPosters = POSTERS_DATA.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const openLightbox = (poster: PosterItem) => {
    setSelectedPoster(poster);
    setZoomLevel(1);
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setZoomLevel(1);

  // Robust Blob Download helper
  const handleDownloadFile = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(url, '_blank');
    }
  };

  // Robust Print helper
  const handlePrintPoster = (url: string, title: string) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${title} - Yazdır</title>
            <style>
              body { margin: 0; padding: 20px; display: flex; flex-direction: column; align-items: center; background: #fff; font-family: sans-serif; }
              img { max-width: 100%; height: auto; object-fit: contain; page-break-inside: avoid; }
              h2 { margin-bottom: 15px; color: #1e293b; text-align: center; }
              @media print {
                body { padding: 0; }
                button { display: none; }
              }
            </style>
          </head>
          <body>
            <h2>${title}</h2>
            <img src="${url}" alt="${title}" onload="window.print(); window.close();" />
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-white border-2 border-pink-200/90 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-pink-200/30 to-blue-200/30 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-100 to-blue-100 border border-pink-200 text-xs font-black text-purple-950 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#EC4899]" />
              <span>Görsel Öğrenme &bull; Seçil Gökçe Eğitsel Posterleri</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              Seçil Gökçe Öğretmenimizin Posterleri &amp; Pano Çalışmaları
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Bilişim Teknolojileri ve Yazılım dersi kazanımlarını destekleyen, sınıf panolarında ve akıllı tahtada kullanabileceğiniz yüksek çözünürlüklü ders posterleri.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => openLightbox(featuredPoster)}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-teal-600 via-emerald-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Giriş-Çıkış Afişini Büyüt</span>
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="mt-6 pt-4 border-t border-pink-100 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-teal-600 to-pink-600 text-white shadow-xs'
                : 'bg-pink-50/70 text-slate-700 hover:bg-pink-100/70'
            }`}
          >
            Tüm Posterler ({POSTERS_DATA.length})
          </button>
          <button
            onClick={() => setActiveCategory('mufredat')}
            className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeCategory === 'mufredat'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs'
                : 'bg-pink-50/70 text-slate-700 hover:bg-pink-100/70'
            }`}
          >
            Müfredat &amp; 6. Hafta
          </button>
        </div>
      </div>

      {/* Seçil Gökçe Öğretmenimize Teşekkür Kartı */}
      <div className="bg-gradient-to-r from-teal-50 via-purple-50 to-pink-50 border-2 border-teal-200/90 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 via-purple-500 to-pink-500 text-white flex items-center justify-center text-3xl shadow-md shrink-0">
          💐
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider bg-teal-600 text-white px-2.5 py-0.5 rounded-full">
              Özel Teşekkür &bull; Seçil GÖKÇE
            </span>
            <span className="text-xs font-bold text-teal-800">
              6. Hafta Eğitsel Posterleri
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-800">
            Seçil Gökçe hocamıza hazırladığı materyaller için teşekkür ederiz.
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
            Öğrencilerimizin görsel öğrenmelerini destekleyen harika <strong>Klavye Tuşları ve Fare</strong> ile <strong>Giriş-Çıkış Birimleri</strong> infografik afişleri için Seçil GÖKÇE öğretmenimize emeklerinden ötürü sonsuz teşekkürlerimizi sunarız.
          </p>
        </div>
      </div>

      {/* SEÇİL GÖKÇE POSTERLERİ LISTESİ (BAŞTA GÖRÜNSÜN) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-pink-100 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🖼️</span>
            <h3 className="text-lg sm:text-xl font-black text-slate-800">
              Seçil Gökçe Öğretmenimizin Eğitsel Posterleri
            </h3>
          </div>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            {filteredPosters.length} Afiş Hazır
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosters.map((poster) => (
            <div
              key={poster.id}
              className="bg-white rounded-3xl border-2 border-teal-300 ring-2 ring-teal-100 transition-all duration-300 hover:shadow-lg flex flex-col overflow-hidden group"
            >
              {/* Resim alanı */}
              <div 
                onClick={() => openLightbox(poster)}
                className="relative bg-slate-50 aspect-4/3 overflow-hidden cursor-pointer flex items-center justify-center p-3 border-b border-slate-100"
              >
                <img
                  src={poster.imageSrc}
                  alt={poster.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                
                <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${poster.badgeColor} shadow-xs`}>
                  {poster.badge}
                </span>

                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
                  <span className="px-3 py-1.5 rounded-full bg-white text-slate-900 font-bold text-xs flex items-center gap-1.5 shadow-md">
                    <ZoomIn className="w-3.5 h-3.5 text-[#EC4899]" />
                    <span>Büyüt</span>
                  </span>
                </div>
              </div>

              {/* Bilgi alanı */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h4 className="font-extrabold text-base text-slate-900 leading-snug group-hover:text-purple-900 transition-colors">
                    {poster.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {poster.description}
                  </p>
                  {poster.authorCredit && (
                    <div className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200/80 flex items-center gap-1.5">
                      <span>💐</span>
                      <span>{poster.authorCredit}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-pink-50 flex items-center justify-between gap-2">
                  <button
                    onClick={() => openLightbox(poster)}
                    className="flex-1 py-2 px-3 rounded-xl bg-pink-50 hover:bg-pink-100 text-purple-900 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#EC4899]" />
                    <span>İncele</span>
                  </button>

                  <button
                    onClick={() => handleDownloadFile(poster.imageSrc, `${poster.id}.png`)}
                    className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    title="Resmi İndir"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>İndir</span>
                  </button>

                  <button
                    onClick={() => handlePrintPoster(poster.imageSrc, poster.title)}
                    className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    title="Yazdır"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Yazdır</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
 
      {/* 6. Hafta Hiyerarşik Yapı ve Veri Akış Şeması Kartı */}
      <div className="bg-white border-2 border-indigo-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-100 pb-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
              Ders Materyali &bull; Akıllı Tahta Şeması
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-2">
              Bilgisayar Sistemlerinin Temel Bileşenleri &amp; Veri Akış İlişkisi
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              1. Donanım (İç Donanım &amp; Dış Donanım Birimleri) ve 2. Yazılım (İşletim Sistemi &amp; Uygulama Yazılımları) arasındaki 4 adımlı veri akış mekanizması.
            </p>
          </div>
        </div>

        <ComputerSystemHierarchy />
      </div>

      {/* LIGHTBOX / FULLSCREEN MODAL */}
      {selectedPoster && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col animate-in fade-in duration-200"
          onClick={() => setSelectedPoster(null)}
        >
          {/* Top Control Ribbon */}
          <div 
            className="p-3 sm:p-4 bg-slate-900/90 border-b border-white/10 flex items-center justify-between gap-3 text-white"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${selectedPoster.badgeColor}`}>
                {selectedPoster.badge}
              </span>
              <div className="min-w-0">
                <h3 className="font-extrabold text-sm sm:text-base text-white truncate">
                  {selectedPoster.title}
                </h3>
                {selectedPoster.authorCredit && (
                  <span className="text-[11px] font-bold text-teal-300 block truncate">
                    💐 {selectedPoster.authorCredit}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-white/10 rounded-xl p-1 border border-white/10">
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition text-white cursor-pointer"
                  title="Uzaklaştır"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold px-1.5 min-w-[44px] text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition text-white cursor-pointer"
                  title="Yakınlaştır"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition text-white text-xs font-bold cursor-pointer"
                  title="Sıfırla"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Download */}
              <button
                onClick={() => handleDownloadFile(selectedPoster.imageSrc, `${selectedPoster.id}.png`)}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">İndir</span>
              </button>

              <button
                onClick={() => handlePrintPoster(selectedPoster.imageSrc, selectedPoster.title)}
                className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Yazdır</span>
              </button>

              {/* Close */}
              <button
                onClick={() => setSelectedPoster(null)}
                className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/25 text-white transition cursor-pointer"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Zoomable Image Canvas */}
          <div 
            className="flex-1 overflow-auto flex items-center justify-center p-4"
            onClick={() => setSelectedPoster(null)}
          >
            <div 
              className="max-w-full max-h-full transition-transform duration-150 cursor-zoom-in"
              style={{ transform: `scale(${zoomLevel})` }}
              onClick={e => {
                e.stopPropagation();
                handleZoomIn();
              }}
            >
              <img
                src={selectedPoster.imageSrc}
                alt={selectedPoster.title}
                className="max-w-full max-h-[82vh] object-contain rounded-lg shadow-2xl bg-white"
              />
            </div>
          </div>

          {/* Bottom Info Bar */}
          <div 
            className="p-3 bg-slate-900/90 border-t border-white/10 text-center text-xs text-slate-300 max-w-4xl mx-auto w-full"
            onClick={e => e.stopPropagation()}
          >
            <p className="line-clamp-2 leading-relaxed">
              {selectedPoster.description}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
