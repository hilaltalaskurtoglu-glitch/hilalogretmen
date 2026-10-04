import React, { useState } from 'react';
import { ExternalLink, Download, ZoomIn, X, Code2, Sparkles, Key, FileCode, ChevronDown, ChevronUp, Bot, Brain, ShieldAlert, Smartphone, CheckCircle2 } from 'lucide-react';

export const CodeWeekAnnouncementCard: React.FC = () => {
  const [activeImageZoom, setActiveImageZoom] = useState<{ src: string; title: string } | null>(null);
  const [showAiGuideText, setShowAiGuideText] = useState(false);
  const [img1Error, setImg1Error] = useState(false);
  const [img2Error, setImg2Error] = useState(false);

  const poster1Src = img1Error
    ? '/src/assets/images/codeweek_poster_1791106855697.jpg'
    : '/codeweek_2026_poster.jpg?v=2026';

  const poster2Src = img2Error
    ? '/src/assets/images/kodlabuyu_ai_poster_1791106865308.jpg'
    : '/kodlabuyu_ai_poster.jpg?v=2026';

  const handleDownloadHtml = () => {
    const a = document.createElement('a');
    a.href = '/duyuru-avrupa-kod-haftasi-2026.html';
    a.download = 'duyuru-avrupa-kod-haftasi-2026.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadImage = (src: string, filename: string) => {
    const a = document.createElement('a');
    a.href = src;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section className="bg-white border-2 border-purple-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6 relative overflow-hidden">
      {/* Top Header Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-purple-100">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-100 text-purple-900 border border-purple-200">
            <Code2 className="w-3.5 h-3.5 text-purple-700" />
            CodeWeek 2026 &bull; Avrupa Kod Haftası
          </span>
          <span className="text-xs font-extrabold text-pink-700 bg-pink-50 border border-pink-200 px-2.5 py-0.5 rounded-full">
            10 &ndash; 25 Ekim 2026
          </span>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
            KodlaBüyü &amp; Yapay Zekâ
          </span>
        </div>

        {/* Quick HTML File & Download Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href="/duyuru-avrupa-kod-haftasi-2026.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs border border-purple-200 transition shadow-2xs"
            title="HTML Duyuru Dosyasını Yeni Sekmede Aç"
          >
            <FileCode className="w-3.5 h-3.5 text-purple-600" />
            <span>Orijinal HTML Aç</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <button
            onClick={handleDownloadHtml}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-95 text-white font-bold text-xs transition shadow-2xs"
            title="HTML Duyuru Dosyasını İndir"
          >
            <Download className="w-3.5 h-3.5" />
            <span>HTML İndir</span>
          </button>
        </div>
      </div>

      {/* Embedded HTML Styled Announcement Box */}
      <div className="max-w-[760px] mx-auto space-y-6">
        
        {/* 1. Top Banner (Matching the User's HTML style) */}
        <div className="bg-gradient-to-r from-[#6c3dd6] to-[#e94e9c] text-white rounded-2xl p-6 sm:p-7 shadow-lg space-y-2.5">
          <span className="inline-block bg-white/20 text-white px-3.5 py-1 rounded-full text-xs font-bold tracking-wider">
            📢 DUYURU
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
            Okulumuz Avrupa Kod Haftası 2026'ya Katılıyor!
          </h3>
          <p className="text-white/95 text-xs sm:text-sm leading-relaxed">
            Ahi Evran Ortaokulu olarak 10 – 25 Ekim 2026 tarihleri arasında düzenlenen <strong className="text-white font-extrabold">Avrupa Kod Haftası (EU Code Week) 2026</strong> etkinliklerine katılıyoruz. CodeWeek 2026 kapsamında öğrencilerimizi oyun, kodlama, tasarım ve üretimle buluşturuyoruz. <span className="font-bold underline decoration-pink-300">#oynakodlaüret</span>
          </p>
        </div>

        {/* 2. Poster Card 1 (Avrupa Kod Haftası 2026 Afişi) */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-md border-2 border-purple-100 group relative">
          <div className="p-3 bg-purple-50/60 border-b border-purple-100 flex items-center justify-between text-xs font-bold text-purple-900">
            <span className="flex items-center gap-1.5">
              🎨 <strong>Afiş 1:</strong> Ahi Evran Ortaokulu &bull; Avrupa Kod Haftası 2026
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveImageZoom({ src: poster1Src, title: 'Avrupa Kod Haftası 2026 Afişi' })}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-purple-100 text-purple-800 border border-purple-200 transition flex items-center gap-1"
                title="Büyüt"
              >
                <ZoomIn className="w-3.5 h-3.5 text-purple-600" />
                <span>Büyüt</span>
              </button>
              <button
                onClick={() => handleDownloadImage(poster1Src, 'avrupa-kod-haftasi-2026-afis.jpg')}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-purple-100 text-purple-800 border border-purple-200 transition flex items-center gap-1"
                title="Afişi İndir"
              >
                <Download className="w-3.5 h-3.5 text-pink-600" />
                <span>İndir</span>
              </button>
            </div>
          </div>

          <div
            className="relative overflow-hidden cursor-pointer bg-slate-50 min-h-[340px] flex items-center justify-center"
            onClick={() => setActiveImageZoom({ src: poster1Src, title: 'Avrupa Kod Haftası 2026 Afişi' })}
          >
            <img
              src={poster1Src}
              alt="Avrupa Kod Haftası 2026 Afişi"
              className="w-full h-auto object-contain max-h-[640px] mx-auto transition duration-300 group-hover:scale-[1.01]"
              referrerPolicy="no-referrer"
              onError={() => {
                if (!img1Error) setImg1Error(true);
              }}
            />
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition flex items-center justify-center pointer-events-none">
              <span className="bg-white/95 text-slate-800 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <ZoomIn className="w-4 h-4 text-purple-600" />
                Afişi Tam Ekran İncele
              </span>
            </div>
          </div>
        </div>

        {/* 3. Section Title with Dot */}
        <div className="flex items-center gap-2.5 pt-3">
          <span className="w-3 h-3 rounded-full bg-[#ffc94b] shrink-0 shadow-2xs" />
          <h4 className="text-base sm:text-lg font-black text-[#16213e]">
            KodlaBüyü Platformu ile Yapay Zekâ Öğreniyoruz
          </h4>
        </div>

        {/* 4. Poster Card 2 (KodlaBüyü Yapay Zekâ Afişi) */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-md border-2 border-purple-100 group">
          <div className="p-3 bg-purple-50/60 border-b border-purple-100 flex items-center justify-between text-xs font-bold text-purple-900">
            <span className="flex items-center gap-1.5">
              🤖 <strong>Afiş 2:</strong> KodlaBüyü &bull; Yapay Zekâ Geleceği Şekillendiriyor
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveImageZoom({ src: poster2Src, title: 'KodlaBüyü Yapay Zekâ Afişi' })}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-purple-100 text-purple-800 border border-purple-200 transition flex items-center gap-1"
                title="Büyüt"
              >
                <ZoomIn className="w-3.5 h-3.5 text-pink-600" />
                <span>Büyüt</span>
              </button>
              <button
                onClick={() => handleDownloadImage(poster2Src, 'kodlabuyu-yapay-zeka-afis.jpg')}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-purple-100 text-purple-800 border border-purple-200 transition flex items-center gap-1"
                title="Afişi İndir"
              >
                <Download className="w-3.5 h-3.5 text-purple-600" />
                <span>İndir</span>
              </button>
            </div>
          </div>

          <div
            className="relative overflow-hidden cursor-pointer bg-slate-50 min-h-[340px] flex items-center justify-center"
            onClick={() => setActiveImageZoom({ src: poster2Src, title: 'KodlaBüyü Yapay Zekâ Afişi' })}
          >
            <img
              src={poster2Src}
              alt="KodlaBüyü Yapay Zekâ Afişi"
              className="w-full h-auto object-contain max-h-[640px] mx-auto transition duration-300 group-hover:scale-[1.01]"
              referrerPolicy="no-referrer"
              onError={() => {
                if (!img2Error) setImg2Error(true);
              }}
            />
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition flex items-center justify-center pointer-events-none">
              <span className="bg-white/95 text-slate-800 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <ZoomIn className="w-4 h-4 text-pink-600" />
                Afişi Tam Ekran İncele
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-5 text-xs sm:text-sm text-[#4a4a63] leading-relaxed border-t border-slate-100 bg-slate-50/50">
            CodeWeek 2026 kapsamında KodlaBüyü platformu üzerinden <strong>"Yapay Zekâ Geleceği Şekillendiriyor"</strong> temalı içeriklerle öğrencilerimizle yapay zekânın ne olduğunu, nasıl çalıştığını ve güvenli kullanımını işleyeceğiz.
          </div>
        </div>

        {/* 5. İnteraktif Yapay Zekâ Afiş Metni & Okuma Rehberi (Expandable) */}
        <div className="bg-gradient-to-br from-purple-50/80 via-pink-50/50 to-blue-50/60 rounded-2xl border-2 border-purple-200/80 p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-extrabold text-sm sm:text-base text-slate-900">
                  Yapay Zekâ Afişi Bilgi Rehberi
                </h5>
                <p className="text-[11px] text-slate-600">
                  Afişteki temel kavramları ve güvenlik kurallarını detaylı okuyun
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAiGuideText(!showAiGuideText)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold transition flex items-center gap-1 shadow-2xs"
            >
              <span>{showAiGuideText ? 'Metni Gizle' : 'Metni İncele'}</span>
              {showAiGuideText ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showAiGuideText && (
            <div className="space-y-3.5 pt-2 border-t border-purple-100 text-xs text-slate-700 animate-fadeIn">
              
              {/* Question 1: YZ Nedir? */}
              <div className="bg-white/90 p-3.5 rounded-xl border border-purple-100 space-y-1">
                <div className="font-black text-purple-900 flex items-center gap-1.5 text-xs sm:text-sm">
                  <Sparkles className="w-4 h-4 text-pink-600" />
                  Yapay Zekâ (YZ) Nedir?
                </div>
                <p className="leading-relaxed">
                  Yapay zekâ bilgisayarların insanlar gibi öğrenmesini, düşünmesini ve karar vermesini sağlayan bir bilim ve teknoloji alanıdır. Kendisine gösterilen binlerce örnekten kalıpları fark ederek yeni durumlar hakkında tahmin yapmayı öğrenir. Duyguları ve hayalleri olmasa da resim tanıma, konuşma anlama ve sorun çözme gibi işlerde bize yardımcı olabilir.
                </p>
              </div>

              {/* 3 Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white/90 p-3 rounded-xl border border-purple-100 space-y-1">
                  <div className="font-bold text-blue-700 flex items-center gap-1 text-xs">
                    ⚙️ Nasıl Çalışır?
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-600">
                    Yapay zekâ, kendisine verilen çok sayıda veriyi inceleyerek bu verilerdeki örüntüleri (kalıpları) bulur ve öğrendiği bu kalıplara göre tahminler ya da kararlar üretir.
                  </p>
                </div>

                <div className="bg-white/90 p-3 rounded-xl border border-purple-100 space-y-1">
                  <div className="font-bold text-indigo-700 flex items-center gap-1 text-xs">
                    🏠 Nerelerde Kullanılır?
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-600">
                    Yapay zekâ, telefonlardan akıllı ev cihazlarına, oyunlardan sağlık ve tarıma kadar pek çok alanda insanlara yardımcı bir araç olarak kullanılır.
                  </p>
                </div>

                <div className="bg-white/90 p-3 rounded-xl border border-purple-100 space-y-1">
                  <div className="font-bold text-purple-700 flex items-center gap-1 text-xs">
                    📱 Hayatımızdaki Yeri Nedir?
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-600">
                    Sesli asistanlar, yüz tanıyan telefon kilitleri, video önerileri ve harita uygulamaları gibi pek çok şeyin arkasında, günlük hayatımıza sessizce eşlik eden bir yapay zekâ vardır.
                  </p>
                </div>
              </div>

              {/* Warning Card */}
              <div className="bg-rose-50/90 p-3.5 rounded-xl border border-rose-200 text-rose-950 space-y-1">
                <div className="font-black text-rose-800 flex items-center gap-1.5 text-xs">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  Yapay Zekâ Kullanırken Nelere Dikkat Etmeliyiz?
                </div>
                <p className="text-[11px] leading-relaxed">
                  Yapay zekânın verdiği bilgiler her zaman doğru olmayabilir; bu yüzden önemli bir bilgiyi paylaşmadan önce mutlaka kontrol etmeliyiz. Adını, adresini, fotoğraflarını ya da ailenle ilgili bilgileri hiçbir YZ uygulamasına izinsiz vermemelisin. YZ harika bir yardımcıdır ama son kararı her zaman bir insan, özellikle de velilerimiz ve öğretmenlerimiz vermelidir.
                </p>
                <div className="text-[10px] text-purple-800 font-bold pt-1">
                  🌐 Resmi Platform: <span className="underline">kodlabuyu.com</span>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* 6. Info Box (Gold border-left matching the HTML) */}
        <div className="bg-white rounded-2xl p-5 border-l-4 border-[#ffc94b] shadow-xs text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1">
          <div className="flex items-start gap-2.5">
            <span className="text-xl shrink-0">🔑</span>
            <div>
              <strong className="text-[#6c3dd6] font-black">5. Sınıf öğrencilerimizin dikkatine:</strong>{' '}
              KodlaBüyü platformuna giriş yapmanız için gerekli olan kullanıcı adı ve şifreleriniz, Bilişim Teknolojileri ve Yazılım dersimizde sınıfta dağıtılacaktır. Şifrenizi kaybetmemeniz ve kimseyle paylaşmamanız önemlidir.
            </div>
          </div>
        </div>

        {/* 7. Footer Signature */}
        <div className="text-center text-xs text-[#8a8aa0] pt-1 pb-2 font-medium">
          Ahi Evran Ortaokulu &bull; Bilişim Teknolojileri ve Yazılım Dersi &bull; Avrupa Kod Haftası 2026
        </div>

      </div>

      {/* Lightbox Zoom Modal */}
      {activeImageZoom && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5"
          onClick={() => setActiveImageZoom(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl p-2 sm:p-3 space-y-2 border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-2 pt-1 text-white">
              <span className="font-bold text-xs sm:text-sm truncate">
                {activeImageZoom.title}
              </span>
              <button
                onClick={() => setActiveImageZoom(null)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
                title="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="max-h-[82vh] overflow-auto flex items-center justify-center bg-black/40 rounded-xl p-1">
              <img
                src={activeImageZoom.src}
                alt={activeImageZoom.title}
                className="w-auto h-auto max-h-[80vh] max-w-full object-contain rounded-lg shadow-md"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex items-center justify-end gap-2 px-2 pb-1">
              <button
                onClick={() => handleDownloadImage(activeImageZoom.src, 'afis.jpg')}
                className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Afişi İndir</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
