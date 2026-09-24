import React from 'react';
import { Material } from '../types';
import { BilisimKahramaniGame } from './BilisimKahramaniGame';
import { CurrentWeekOutcomeCard } from './CurrentWeekOutcomeCard';
import { RecentUploadsSection } from './RecentUploadsSection';
import { Gamepad2, BookOpen, Layers, Sparkles, Calendar, ArrowRight, ShieldCheck, Cpu, Code2, Network, FileText, CheckCircle2 } from 'lucide-react';

interface HomeHeroViewProps {
  materials: Material[];
  onOpenMaterial: (mat: Material) => void;
  onSelectTab: (tab: string) => void;
  onOpenAddModal: () => void;
  onSelectWeek: (term: 1 | 2, period: 1 | 2, periodWeek: number) => void;
  onDeleteMaterial?: (id: string) => void;
}

export const HomeHeroView: React.FC<HomeHeroViewProps> = ({
  materials,
  onOpenMaterial,
  onSelectTab,
  onOpenAddModal,
  onSelectWeek,
  onDeleteMaterial
}) => {
  const quickUnits = [
    { title: "Bilişim Teknolojileri ve Sağlık", icon: "🖥️", term: 1, period: 1, week: 2, desc: "Doğru oturuş, ekran mesafesi ve 20-20-20 kuralı" },
    { title: "Donanım ve Yazılım Sistemleri", icon: "⚙️", term: 1, period: 1, week: 6, desc: "Kasa içi birimler, çevre aygıtları ve Pardus" },
    { title: "Dosya & Klasör Yönetimi", icon: "📁", term: 1, period: 1, week: 8, desc: "Dosya uzantıları, klasör hiyerarşisi ve sıkıştırma" },
    { title: "Bilgisayar Ağları (LAN/WAN)", icon: "🌐", term: 1, period: 2, week: 6, desc: "Ağ donanımları, internet ve doğru arama" },
    { title: "Siber Güvenlik & Parola", icon: "🔒", term: 2, period: 1, week: 2, desc: "Güçlü parola, mahremiyet ve siber zorbalık" },
    { title: "Yapay Zekâ Temelleri", icon: "🤖", term: 2, period: 1, week: 3, desc: "Makine öğrenmesi, kullanım alanları ve etik" },
    { title: "Problem Çözme & Algoritma", icon: "📐", term: 2, period: 2, week: 3, desc: "Günlük hayat adımları ve akış şeması şekilleri" },
    { title: "Scratch ile Blok Kodlama", icon: "🐱", term: 2, period: 2, week: 10, desc: "Kuklalar, döngüler, olaylar ve oyun tasarımı" },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. ORTA BÖLÜMDE ÜSTTE: BİLİŞİM KAHRAMANI OYUNU (Kullanıcı Talebi: "ana sayfada orta bölümde üstte bilişim kahramanı oyunu") */}
      <section id="egitici-oyunlar-bolumu" className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white/95 backdrop-blur-xs border-2 border-pink-200/90 rounded-3xl p-4 sm:p-5 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-purple-900 bg-gradient-to-r from-pink-100 to-blue-100 border border-pink-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5 text-[#EC4899]" />
                <span>Orta Bölüm &bull; Eğitsel Oyun Merkezi</span>
              </span>
              <span className="text-xs font-bold text-slate-500 hidden sm:inline">
                5. Sınıf BTY
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-1.5">
              🎮 Bilişim Kahramanı Eğitici Oyunu
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Akıllı tahtada ve bilgisayarda soruları çözün, puan toplayın ve Bilişim Kahramanı rozetlerinizi kazanın!
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold text-purple-900 bg-gradient-to-r from-pink-50 to-blue-50 px-3 py-1.5 rounded-xl border border-pink-200">
              Hilal KURTOĞLU Özel Eğitsel Oyunu
            </span>
          </div>
        </div>

        {/* Embedded Interactive Bilişim Kahramanı Game Component */}
        <BilisimKahramaniGame />
      </section>

      {/* 2. OYUNUN ALTINDA: YILLIK PLANIN BULUNDUĞUM HAFTAYA AİT KAZANIMI (Kullanıcı Talebi: "altında yıllık planın bulunduğum haftaya ait kazanımı") */}
      <CurrentWeekOutcomeCard
        onSelectWeek={onSelectWeek}
        onSelectTab={onSelectTab}
        onOpenAddModal={onOpenAddModal}
        materials={materials}
      />

      {/* 3. KAZANIMIN ALTINDA: SON EKLENEN İÇERİK (Kullanıcı Talebi: "onun altında da son eklenen içerik yer alsın") */}
      <RecentUploadsSection
        materials={materials}
        onOpenMaterial={onOpenMaterial}
        onOpenAddModal={onOpenAddModal}
        onDeleteMaterial={onDeleteMaterial}
        onPlayGame={() => {
          const gameEl = document.getElementById('egitici-oyunlar-bolumu');
          if (gameEl) gameEl.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 4. Müfredat Konularına Hızlı Erişim Kartları */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-800">
              📚 5. Sınıf Temel Öğrenme Alanları
            </h3>
            <p className="text-xs text-slate-600">
              Müfredattaki temel öğrenme alanlarına ve haftalık ders içeriklerine hızlı geçiş yapın.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('yillik-plan')}
            className="text-xs font-extrabold text-[#EC4899] hover:text-purple-700 transition flex items-center gap-1"
          >
            <span>Tüm Yıllık Plan &rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickUnits.map((u, i) => (
            <div
              key={i}
              onClick={() => onSelectWeek(u.term as any, u.period as any, u.week)}
              className="bg-white hover:bg-gradient-to-br hover:from-pink-50/50 hover:to-blue-50/50 border-2 border-pink-200/80 hover:border-purple-400 p-3.5 rounded-2xl cursor-pointer transition transform hover:-translate-y-0.5 shadow-2xs group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl group-hover:scale-110 transition">{u.icon}</span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-gradient-to-r from-pink-100 to-blue-100 text-purple-900 border border-pink-200">
                    {u.term}. Dönem
                  </span>
                </div>
                <h4 className="font-black text-xs sm:text-sm text-slate-800 group-hover:text-purple-700 leading-snug">
                  {u.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-snug">
                  {u.desc}
                </p>
              </div>

              <div className="pt-2 mt-2 border-t border-pink-100 flex items-center justify-between text-xs font-bold text-[#EC4899] group-hover:text-purple-600">
                <span>Haftaya Git &rarr;</span>
                <span className="text-slate-400 font-semibold text-[11px]">{u.week}. Hafta</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
