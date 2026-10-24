import React, { useState } from 'react';
import { ExternalLink, Sparkles, Cpu, Layers, HardDrive, CheckCircle2, Copy, Heart, UserCheck, Monitor } from 'lucide-react';

export const HardwareSimulationRecommendationCard: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const siteUrl = "https://donanim.vercel.app";

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(siteUrl);
      } else {
        const input = document.createElement('input');
        input.value = siteUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    } catch {
      // ignore
    }
  };

  return (
    <section className="bg-white border-2 border-cyan-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6 relative overflow-hidden">
      
      {/* Background soft glow decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-cyan-100/40 via-blue-100/20 to-purple-100/40 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

      {/* Top Header Badge Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-cyan-100 relative z-10">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-cyan-100 text-cyan-900 border border-cyan-200">
            <Sparkles className="w-3.5 h-3.5 text-cyan-700 animate-pulse" />
            Tavsiye Web Sitesi &bull; Eğitim Materyali
          </span>
          <span className="text-xs font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
            Donanım Simülasyonu
          </span>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
            5. Sınıf &bull; 6. Hafta
          </span>
        </div>

        {/* Quick External & Copy Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-900 font-bold text-xs border border-cyan-200 transition shadow-2xs cursor-pointer"
            title="Site bağlantısını kopyala"
          >
            {copiedLink ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Bağlantı Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-cyan-600" />
                <span>Link Kopyala</span>
              </>
            )}
          </button>

          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-xs transition shadow-2xs"
          >
            <span>Siteye Git</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Feature Banner */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Side: Information & Highlights (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border border-blue-200">
              🛠️ Etkileşimli Donanım Simülatörü
            </span>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              Tavsiye Web Sitesi: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">donanim.vercel.app</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Öğrencilerimizin bilgisayar kasası içindeki bileşenleri, montaj adımlarını ve iç donanım parçalarının çalışma mantığını birebir görerek deneyimlemesi için hazırlanmış harika bir <strong>donanım simülasyon sitesidir</strong>.
            </p>
          </div>

          {/* Key Simulation Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-cyan-50/60 border border-cyan-100">
              <div className="w-7 h-7 rounded-lg bg-cyan-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <strong className="text-slate-900 font-bold block">İç Donanım Deneyimi</strong>
                <span className="text-slate-600 text-[11px] leading-tight block">
                  İşlemci, Anakart, RAM ve Güç Kaynağının kasaya yerleştirilmesini simüle eder.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-blue-50/60 border border-blue-100">
              <div className="w-7 h-7 rounded-lg bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                <Monitor className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <strong className="text-slate-900 font-bold block">Görsel &amp; Pratik Öğrenme</strong>
                <span className="text-slate-600 text-[11px] leading-tight block">
                  Kabloların bağlanması, fan montajı ve donanım parçalarının yuvalarını gösterir.
                </span>
              </div>
            </div>
          </div>

          {/* Teacher Attribution & Thank-You Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50/90 via-orange-50/80 to-amber-50/90 border-2 border-amber-200 text-amber-950 space-y-2 shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-2xs font-bold text-xs">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <h4 className="font-black text-sm text-amber-900">
                Öğretmenimize Teşekkür &amp; Atıf
              </h4>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-amber-900/90 font-medium">
              Bu kıymetli donanım simülasyonu çalışmasından ve bilişim teknolojileri eğitimine sunduğu değerli katkılardan dolayı <strong className="text-amber-950 font-black underline decoration-amber-400 underline-offset-2">Mücahit Bozok</strong> öğretmenimize teşekkür eder, şükranlarımızı sunarız.
            </p>

            <div className="flex items-center justify-between text-[11px] text-amber-800/80 pt-1 border-t border-amber-200/80">
              <span className="font-bold flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-amber-700" />
                Emeği Geçen: Mücahit BOZOK Öğretmenimiz
              </span>
              <span className="font-semibold">Bilişim Teknolojileri Eğitimi</span>
            </div>
          </div>

          {/* Big Action Button */}
          <div className="pt-1">
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:opacity-95 text-white font-black text-xs sm:text-sm transition shadow-md shadow-blue-500/20"
            >
              <Cpu className="w-4 h-4" />
              <span>donanim.vercel.app Sitesini Ziyaret Et (Simülasyonu Başlat)</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Right Side: Interactive Visual Preview & Direct Link Card (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 rounded-3xl border-2 border-cyan-400/30 text-white space-y-4 shadow-xl relative overflow-hidden group">
          
          <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

          {/* Browser mockup header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="text-[11px] font-mono text-cyan-300 bg-white/10 px-3 py-1 rounded-full border border-white/15 truncate max-w-[200px]">
              donanim.vercel.app
            </div>
          </div>

          {/* Simulation Preview Card Content */}
          <div className="space-y-3 py-2 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-500 text-slate-950 flex items-center justify-center text-3xl mx-auto shadow-lg ring-4 ring-cyan-400/20">
              🖥️
            </div>

            <div className="space-y-1">
              <h5 className="font-black text-base sm:text-lg text-white">
                Donanım Simülasyonu
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Kendi bilgisayarını sanal ortamda topla, parçaların yerlerini ve işlevlerini keşfet!
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-white/10 text-cyan-200 text-[11px] font-bold border border-white/10">
                ⚡ Anakart &amp; CPU
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 text-cyan-200 text-[11px] font-bold border border-white/10">
                ⚡ RAM &amp; SSD
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 text-cyan-200 text-[11px] font-bold border border-white/10">
                ⚡ Ekran Kartı &amp; PSU
              </span>
            </div>
          </div>

          {/* Action button inside preview */}
          <div className="pt-2">
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-95 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Simülasyon Sitesine Bağlan</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="text-[10px] text-center text-slate-400 pt-1">
            Öğretmenimiz Mücahit Bozok tarafından geliştirilmiştir.
          </div>

        </div>

      </div>

    </section>
  );
};
