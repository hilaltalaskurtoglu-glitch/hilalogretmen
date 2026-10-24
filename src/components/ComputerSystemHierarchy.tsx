import React from 'react';
import { 
  Cpu, 
  Layers, 
  HardDrive, 
  Monitor, 
  Keyboard, 
  Speaker, 
  Smartphone, 
  AppWindow, 
  ArrowRight, 
  ArrowDown, 
  Workflow, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2,
  Share2
} from 'lucide-react';

export const ComputerSystemHierarchy: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Üst Bilgilendirme */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50/60 to-purple-50 p-4 sm:p-5 rounded-2xl border-2 border-blue-200">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
          <span className="text-xs font-black uppercase tracking-wider text-blue-900">
            Hiyerarşik Sistem Şeması &bull; BTY.5.1.5
          </span>
        </div>
        <p className="text-xs sm:text-sm font-bold text-slate-800">
          Bir bilgisayar sistemi iki temel kısımdan oluşur: <strong>Donanım</strong> ve <strong>Yazılım</strong>.
        </p>
      </div>

      {/* 1. DONANIM BLOĞU */}
      <div className="bg-white rounded-3xl border-2 border-blue-300 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
          
          {/* 1. Donanım (Sol Ana Kutu) */}
          <div className="lg:col-span-4 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white p-5 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="space-y-2 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-[11px] font-black uppercase tracking-wider text-white">
                <Cpu className="w-3.5 h-3.5 text-cyan-300" />
                <span>1. Temel Bölüm</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                1. Donanım
              </h3>
              <span className="text-xs font-semibold text-cyan-200 block">
                (Fiziksel Bileşenler)
              </span>
              <p className="text-xs sm:text-sm text-blue-50 leading-relaxed pt-2 border-t border-white/20">
                Bilgisayarın dokunabildiğimiz, gözle görülen fiziksel parçalarıdır.
              </p>
            </div>

            <div className="hidden lg:flex items-center justify-end gap-1 text-cyan-200 text-xs font-bold pt-4">
              <span>Bileşenleri &rarr;</span>
            </div>
          </div>

          {/* Yanında: İç Donanım, Altında: Dış Donanım ve Birimleri */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Yanında: İÇ DONANIM */}
            <div className="bg-blue-50/80 border-2 border-blue-200 p-4 sm:p-5 rounded-2xl shadow-2xs space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                    İÇ
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-blue-950">
                    İç Donanım
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-100/80 border border-blue-300 px-2.5 py-0.5 rounded-full">
                  Kasa İçi Parçalar
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                Kasanın içinde yer alan ve sistemin çalışmasını sağlayan hayati parçalardır 
                <span className="font-bold text-slate-900 block mt-1 bg-white/80 p-2 rounded-xl border border-blue-200/60">
                  (İşlemci, Ana Kart, RAM Bellek, Sabit Disk/SSD, Güç Kaynağı).
                </span>
              </p>
            </div>

            {/* Onun Altına: DIŞ DONANIM */}
            <div className="bg-sky-50/70 border-2 border-sky-300 p-4 sm:p-5 rounded-2xl shadow-2xs space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                    DIŞ
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-sky-950">
                    Dış Donanım
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-sky-800 bg-sky-100 border border-sky-300 px-2.5 py-0.5 rounded-full">
                  İletişim &amp; Çevre Birimleri
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                Kasanın dışına bağlı olan ve bilgisayarla iletişim kurmamızı sağlayan birimlerdir:
              </p>

              {/* Dış donanımın altına: Giriş, Çıkış, Hem Giriş Hem Çıkış Birimleri */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                
                {/* 1. Giriş Birimleri */}
                <div className="bg-white p-3.5 rounded-xl border-2 border-emerald-200 shadow-2xs space-y-1.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-emerald-800 font-black text-xs sm:text-sm">
                      <Keyboard className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Giriş Birimleri</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Bilgisayara veri göndermemizi sağlar.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-emerald-100">
                    <span className="text-[11px] font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                      Klavye, Fare, Mikrofon
                    </span>
                  </div>
                </div>

                {/* 2. Çıkış Birimleri */}
                <div className="bg-white p-3.5 rounded-xl border-2 border-indigo-200 shadow-2xs space-y-1.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-indigo-800 font-black text-xs sm:text-sm">
                      <Monitor className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>Çıkış Birimleri</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Bilgisayarın işlediği bilgileri bize sunar.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-indigo-100">
                    <span className="text-[11px] font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded-md inline-block">
                      Monitör, Yazıcı, Hoparlör
                    </span>
                  </div>
                </div>

                {/* 3. Hem Giriş Hem Çıkış Birimleri */}
                <div className="bg-white p-3.5 rounded-xl border-2 border-purple-200 shadow-2xs space-y-1.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-purple-800 font-black text-xs sm:text-sm">
                      <Smartphone className="w-4 h-4 text-purple-600 shrink-0" />
                      <span>Hem Giriş Hem Çıkış</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Hem veri gönderen hem de sonuç sunan birimler.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-purple-100">
                    <span className="text-[11px] font-bold text-purple-900 bg-purple-50 px-2 py-0.5 rounded-md inline-block">
                      Dokunmatik Ekran, modem, usb bellek, taşınabilir harddisk, sd kart
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* 2. YAZILIM BLOĞU */}
      <div className="bg-white rounded-3xl border-2 border-purple-300 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
          
          {/* 2. Yazılım (Sol Ana Kutu) */}
          <div className="lg:col-span-4 bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600 text-white p-5 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="space-y-2 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-[11px] font-black uppercase tracking-wider text-white">
                <AppWindow className="w-3.5 h-3.5 text-pink-200" />
                <span>2. Temel Bölüm</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                2. Yazılım
              </h3>
              <span className="text-xs font-semibold text-pink-200 block">
                (Mantıksal Bileşenler)
              </span>
              <p className="text-xs sm:text-sm text-purple-50 leading-relaxed pt-2 border-t border-white/20">
                Dokunamadığımız, ekran üzerinde gördüğümüz ve donanımın çalışmasını sağlayan programlar bütünüdür.
              </p>
            </div>

            <div className="hidden lg:flex items-center justify-end gap-1 text-pink-200 text-xs font-bold pt-4">
              <span>Yazılım Türleri &rarr;</span>
            </div>
          </div>

          {/* Yanında: İşletim Sistemi Yazılımları, Altında: Uygulama Yazılımları */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Yanında: İŞLETİM SİSTEMİ YAZILIMLARI */}
            <div className="bg-purple-50/80 border-2 border-purple-200 p-4 sm:p-5 rounded-2xl shadow-2xs space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                    OS
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-purple-950">
                    İşletim Sistemi Yazılımları
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-purple-800 bg-purple-100 border border-purple-300 px-2.5 py-0.5 rounded-full">
                  Temel Sistem Yazılımı
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                Bilgisayarın açılmasını sağlayan ve diğer tüm programların çalışması için zemin hazırlayan temel yazılımdır
                <span className="font-bold text-slate-900 block mt-1 bg-white/80 p-2 rounded-xl border border-purple-200/60">
                  (Windows, macOS, Linux, Android, iOS, Pardus).
                </span>
              </p>
            </div>

            {/* Onun Altına: UYGULAMA YAZILIMLARI */}
            <div className="bg-pink-50/70 border-2 border-pink-200 p-4 sm:p-5 rounded-2xl shadow-2xs space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#EC4899] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                    APP
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-pink-950">
                    Uygulama Yazılımları
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-pink-800 bg-pink-100 border border-pink-300 px-2.5 py-0.5 rounded-full">
                  Özel Görev Programları
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                Belirli bir işi yapmak veya eğlenmek için kullandığımız programlardır
                <span className="font-bold text-slate-900 block mt-1 bg-white/80 p-2 rounded-xl border border-pink-200/60">
                  (İnternet tarayıcıları, oyunlar, ofis programları).
                </span>
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* 3. VERİ AKIŞ İLİŞKİSİ VE BİLEŞENLER ARASINDAKİ İLİŞKİLER */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-5 sm:p-7 shadow-md border-2 border-indigo-400/30 space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/15 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-xl bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
              <Workflow className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-cyan-300 block">
                b) Bileşenler Arasındaki İlişkiler
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Veri Akış İlişkisi
              </h3>
            </div>
          </div>
          <span className="text-xs font-bold bg-white/10 text-cyan-200 px-3 py-1 rounded-full self-start sm:self-auto border border-white/10">
            Adım Adım Bilgi İşleme Süreci
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
          Bilgisayar sistemleri, donanım ve yazılımın uyum içinde çalışmasıyla görevini yerine getirir.
        </p>

        {/* 1, 2, 3, 4 Numaralı Veri Akış Maddeleri */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          
          {/* Madde 1 */}
          <div className="bg-white/10 hover:bg-white/15 border border-white/15 p-4 rounded-2xl space-y-2 transition shadow-2xs">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                1
              </span>
              <span className="font-extrabold text-xs sm:text-sm text-cyan-200 uppercase tracking-wide">
                Veri Girişi &amp; Komut
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
              Kullanıcı, <strong>giriş birimleri</strong> (klavye, fare) aracılığıyla bilgisayara komut ve veri gönderir.
            </p>
          </div>

          {/* Madde 2 */}
          <div className="bg-white/10 hover:bg-white/15 border border-white/15 p-4 rounded-2xl space-y-2 transition shadow-2xs">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-blue-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                2
              </span>
              <span className="font-extrabold text-xs sm:text-sm text-blue-200 uppercase tracking-wide">
                İşleme &amp; Geçici Bellek
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
              Gönderilen bu veriler <strong>işlemci</strong> tarafından yorumlanır ve <strong>RAM bellekte</strong> geçici olarak işlenir.
            </p>
          </div>

          {/* Madde 3 */}
          <div className="bg-white/10 hover:bg-white/15 border border-white/15 p-4 rounded-2xl space-y-2 transition shadow-2xs">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-indigo-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                3
              </span>
              <span className="font-extrabold text-xs sm:text-sm text-indigo-200 uppercase tracking-wide">
                Depolama &amp; Çıkış Sunumu
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
              İşlenen sonuçlar kalıcı olarak <strong>sabit diskte</strong> saklanabilir veya <strong>çıkış birimleri</strong> (ekran, hoparlör) aracılığıyla kullanıcıya sunulur.
            </p>
          </div>

          {/* Madde 4 */}
          <div className="bg-white/10 hover:bg-white/15 border border-white/15 p-4 rounded-2xl space-y-2 transition shadow-2xs">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-purple-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                4
              </span>
              <span className="font-extrabold text-xs sm:text-sm text-purple-200 uppercase tracking-wide">
                İletişim &amp; Uyumlu Yönetim
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
              Tüm bu donanım birimlerinin birbiriyle haberleşmesini ve uyumlu çalışmasını <strong>ana kart</strong> ile <strong>işletim sistemi yazılımı</strong> sağlar.
            </p>
          </div>

        </div>

        {/* Donanım ve Yazılımın Birbirine Bağımlılığı Vurgu Kutusu */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-amber-300/40 text-xs sm:text-sm leading-relaxed space-y-1">
          <div className="flex items-center gap-2 text-amber-300 font-black">
            <span>💡</span>
            <span>Donanım ve Yazılımın Birbirine Bağımlılığı:</span>
          </div>
          <p className="text-slate-200">
            Donanım (kasa, ekran, işlemci) olmadan yazılım çalışamaz; yazılım (işletim sistemi) olmadan da donanım tek başına hiçbir şey yapamaz. 
            <strong className="text-amber-200"> Tıpkı insan bedenine (donanım) ruh ve akıl (yazılım) verilmesi gibi birbirini tamamlarlar.</strong>
          </p>
        </div>

      </div>
    </div>
  );
};
