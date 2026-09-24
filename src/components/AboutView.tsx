import React from 'react';
import { GraduationCap, Award, BookOpen, Heart, Mail, School, ShieldCheck, Sparkles, Monitor } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Teacher Profile Card */}
      <div className="bg-white border-2 border-pink-100 rounded-3xl p-6 md:p-10 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-pink-300 shadow-md shrink-0 bg-pink-50 p-1">
            <img
              src="/teacher_logo.png"
              alt="Hilal KURTOĞLU Logo"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-900 bg-gradient-to-r from-pink-100 to-blue-100 border border-pink-200 px-3 py-1 rounded-full">
                Portal Sahibi &bull; BÖTE Öğretmeni
              </span>
              <span className="text-xs font-bold text-[#EC4899] bg-pink-50 border border-pink-200 px-2.5 py-0.5 rounded-full">
                5. Sınıf BTY
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800">
              Hilal KURTOĞLU
            </h2>
            <p className="text-base md:text-lg font-bold bg-gradient-to-r from-[#EC4899] to-[#3B82F6] bg-clip-text text-transparent">
              Bilgisayar ve Öğretim Teknolojileri Öğretmeni
            </p>
            <p className="text-xs md:text-sm text-slate-600 flex items-center justify-center sm:justify-start gap-1.5 pt-1">
              <School className="w-4 h-4 text-[#EC4899]" />
              <span>Ahi Evran Ortaokulu &bull; Bilişim Teknolojileri ve Yazılım Zümresi</span>
            </p>
          </div>
        </div>

        {/* Vision Paragraph */}
        <div className="pt-6 border-t border-pink-100 space-y-4 text-sm md:text-base text-slate-700 leading-relaxed">
          <p>
            Sevgili Öğrencilerim, Değerli Velilerimiz ve Kıymetli Meslektaşlarım;
          </p>
          <p>
            Bu eğitim portalını, 5. sınıf <strong className="text-slate-900 font-extrabold">Bilişim Teknolojileri ve Yazılım</strong> dersinde işlediğimiz konuları hem okulda akıllı tahtalarımız üzerinden etkileşimli olarak işleyebilmek hem de ders dışında öğrencilerimizin ve velilerimizin istedikleri zaman güvenle erişebilmeleri amacıyla oluşturdum.
          </p>
          <p>
            Teknoloji çağında sadece tüketici değil; teknolojiyi üreten, algoritmik düşünebilen, dijital dünyada kendi mahremiyetini ve güvenliğini koruyabilen erdemli <strong className="text-[#EC4899] font-extrabold">"Bilişim Kahramanları"</strong> yetiştirmek en büyük gayemizdir.
          </p>
        </div>
      </div>

      {/* Portal Purpose & Features Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border-2 border-pink-100 p-6 rounded-3xl space-y-2 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-pink-100 to-pink-50 text-purple-900 flex items-center justify-center text-xl">
            🎒
          </div>
          <h3 className="font-extrabold text-base text-slate-800">Öğrencilerimiz İçin</h3>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            Ders sunumları, Bilişim Kahramanı eğitici oyunu, özet ders notları ve etkinlik kâğıtları ile keyifli ve kalıcı öğrenme.
          </p>
        </div>

        <div className="bg-white border-2 border-pink-100 p-6 rounded-3xl space-y-2 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-purple-100 to-purple-50 text-purple-900 flex items-center justify-center text-xl">
            👨‍👩‍👧‍👦
          </div>
          <h3 className="font-extrabold text-base text-slate-800">Velilerimiz İçin</h3>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            Haftalık yıllık plan takibi, güvenli internet rehberleri, ekran süresi ve dijital sağlık konusunda bilinçlendirici kaynaklar.
          </p>
        </div>

        <div className="bg-white border-2 border-pink-100 p-6 rounded-3xl space-y-2 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-100 to-blue-50 text-blue-900 flex items-center justify-center text-xl">
            🤝
          </div>
          <h3 className="font-extrabold text-base text-slate-800">Meslektaşlarımız İçin</h3>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            Ahi Evran Ortaokulu 2026-2027 yıllık planı, ders kazanım bileşenleri, ölçme-değerlendirme araçları ve paylaşılabilir zümre materyalleri.
          </p>
        </div>
      </div>

      {/* Tech and Design Standards */}
      <div className="bg-gradient-to-r from-pink-50 via-purple-50/50 to-blue-50 border-2 border-pink-200/80 p-6 md:p-8 rounded-3xl space-y-3 text-xs md:text-sm text-slate-700">
        <div className="font-extrabold text-slate-800 flex items-center gap-2 text-base">
          <Monitor className="w-5 h-5 text-[#EC4899]" />
          <span>Akıllı Tahta &amp; Mobil Uyumlu Tasarım</span>
        </div>
        <p className="leading-relaxed text-slate-600">
          Portal, sınıftaki etkileşimli akıllı tahtalarda parmak ve kalem dokunuşlarına uygun büyük butonlar, dokunmatik uyumlu kontroller ve pembe-mavi geçişli canlı renk paleti ile tasarlanmıştır. Telefon ve tabletlerde de duyarlı (responsive) 3 bölümlü yapısıyla akıcı biçimde çalışır.
        </p>
      </div>
    </div>
  );
};
