import React, { useState } from 'react';
import { Material } from '../types';
import { BilisimKahramaniGame } from './BilisimKahramaniGame';
import { DigitalIdentityGame } from './DigitalIdentityGame';
import { CurrentWeekOutcomeCard } from './CurrentWeekOutcomeCard';
import { RecentUploadsSection } from './RecentUploadsSection';
import { Gamepad2, BookOpen, Layers, Sparkles, Calendar, ArrowRight, ShieldCheck, Cpu, Code2, Network, FileText, CheckCircle2, Megaphone, Maximize2, Printer, ChevronRight, Bookmark } from 'lucide-react';
import { GAMES_REGISTRY } from '../data/gamesData';
import { LECTURE_NOTES } from '../data/lectureNotesData';

interface HomeHeroViewProps {
  materials: Material[];
  onOpenMaterial: (mat: Material) => void;
  onSelectTab: (tab: string) => void;
  onOpenAddModal: () => void;
  onSelectWeek: (term: 1 | 2, period: 1 | 2, periodWeek: number) => void;
  onDeleteMaterial?: (id: string) => void;
  onSelectGame?: (gameId: string) => void;
}

export const HomeHeroView: React.FC<HomeHeroViewProps> = ({
  materials,
  onOpenMaterial,
  onSelectTab,
  onOpenAddModal,
  onSelectWeek,
  onDeleteMaterial,
  onSelectGame
}) => {
  const [activeHomeGame, setActiveHomeGame] = useState<'dijital-kimlik' | 'bilisim-kahramani'>('dijital-kimlik');

  // Son eklenen ders notunu al (en son eklenen veya en güncel ünite ders notu)
  const latestLectureNote = LECTURE_NOTES[LECTURE_NOTES.length - 1];

  // Öğretmenin yüklediği son doküman/sunum/not varsa tespit et
  const latestUploadedNote = materials.find(m => m.type === 'dokuman' || m.type === 'sunum' || m.type === 'etkinlik');

  const handleLaunchGameFullscreen = (gameId: string) => {
    if (onSelectGame) {
      onSelectGame(gameId);
    } else {
      onSelectTab('oyunlar');
    }
  };

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
      
      {/* 1. EN ÜSTTE: BULUNDUĞUM HAFTANIN YILLIK PLAN KAZANIM SAYFASI (Kullanıcı İsteği) */}
      <CurrentWeekOutcomeCard
        onSelectWeek={onSelectWeek}
        onSelectTab={onSelectTab}
        onOpenAddModal={onOpenAddModal}
        materials={materials}
      />

      {/* 2. ALTINDA: SON EKLENEN DERS NOTU */}
      <section className="bg-white border-2 border-pink-200/90 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-pink-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-purple-900 border border-purple-200 shadow-2xs">
                <Bookmark className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>📝 Son Eklenen Ders Notu</span>
              </span>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                {latestLectureNote.recommendedWeek} &bull; {latestLectureNote.unit}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-1.5">
              {latestLectureNote.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {latestLectureNote.summary}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            <button
              onClick={() => onSelectTab('ders-notlari')}
              className="px-4 py-2 bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] hover:opacity-95 text-white font-extrabold text-xs sm:text-sm rounded-xl transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Notu Oku &rarr;</span>
            </button>
            <button
              onClick={() => onSelectTab('ders-notlari')}
              className="p-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-purple-900 border border-pink-200 text-xs font-bold transition cursor-pointer"
              title="Tüm Ders Notlarını Listele"
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Son Eklenen Ders Notu Özet Kartı */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {latestLectureNote.sections && latestLectureNote.sections.length > 0 ? (
            latestLectureNote.sections.slice(0, 2).map((section, idx) => (
              <div key={idx} className="bg-pink-50/40 border border-pink-100 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-slate-800">
                  <span className="text-base">{section.icon || '📌'}</span>
                  <span>{section.heading}</span>
                </div>
                {section.points ? (
                  <ul className="text-xs text-slate-600 space-y-1 pl-4 list-disc">
                    {section.points.slice(0, 3).map((p, pIdx) => (
                      <li key={pIdx} className="leading-snug">{p}</li>
                    ))}
                  </ul>
                ) : section.items ? (
                  <ul className="text-xs text-slate-600 space-y-1">
                    {section.items.slice(0, 3).map((item, iIdx) => (
                      <li key={iIdx} className="flex items-center gap-1.5 leading-snug">
                        <span className="font-bold text-slate-700">{item.label}:</span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))
          ) : latestLectureNote.keyPoints ? (
            <div className="md:col-span-2 bg-pink-50/40 border border-pink-100 rounded-2xl p-4 space-y-2">
              <span className="text-xs font-black text-slate-800 block">📌 Önemli Noktalar:</span>
              <ul className="text-xs text-slate-600 space-y-1 pl-4 list-disc">
                {latestLectureNote.keyPoints.slice(0, 3).map((kp, kpIdx) => (
                  <li key={kpIdx} className="leading-snug">{kp}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* Tip / Öğretmen Notu & Yüklenen Materyal Bilgisi */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
          <div className="text-slate-600 font-medium bg-amber-50/80 border border-amber-200/90 px-3.5 py-2 rounded-xl w-full sm:w-auto">
            {latestLectureNote.tip}
          </div>
          {latestUploadedNote && (
            <button
              onClick={() => onOpenMaterial(latestUploadedNote)}
              className="shrink-0 text-xs font-bold text-purple-700 hover:text-pink-600 flex items-center gap-1.5 cursor-pointer underline"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ek Belge: {latestUploadedNote.title}</span>
            </button>
          )}
        </div>
      </section>

      {/* 3. ALTINDA: EĞİTSEL OYUN BÖLÜMÜ (DİJİTAL KİMLİK KAŞİFİ & BİLİŞİM KAHRAMANI - TAM EKRAN VE OYNAMA ALANI) */}
      <section id="egitici-oyunlar-bolumu" className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/95 backdrop-blur-xs border-2 border-pink-200/90 rounded-3xl p-4 sm:p-5 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-purple-900 bg-gradient-to-r from-pink-100 to-blue-100 border border-pink-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5 text-[#EC4899]" />
                <span>Eğitsel Ders Oyunu &bull; Aktif Bölüm</span>
              </span>
              <span className="text-xs font-bold text-slate-500 hidden sm:inline">
                5. Sınıf BTY
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-1.5">
              🎮 Eğitsel Ders Oyunları
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {activeHomeGame === 'dijital-kimlik'
                ? 'Son Eklenen Oyun: 3. Hafta Dijital Kimlik, Dijital Ayak İzi ve Vatandaşlık Uygulamaları interaktif oyunu.'
                : 'Tüm üniteleri kapsayan 5 seviyeli Bilişim Kahramanı macera ve rozet oyunu.'}
            </p>
          </div>

          {/* Quick Game Switcher Buttons & Fullscreen Action */}
          <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-auto">
            <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              {GAMES_REGISTRY.map(game => (
                <button
                  key={game.id}
                  onClick={() => setActiveHomeGame(game.id as 'dijital-kimlik' | 'bilisim-kahramani')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                    activeHomeGame === game.id
                      ? game.accentColor === 'teal'
                        ? 'bg-gradient-to-r from-teal-700 to-[#12263a] text-white shadow-xs'
                        : 'bg-gradient-to-r from-pink-600 to-purple-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{game.icon} {game.title}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-black ${
                    game.accentColor === 'teal' ? 'bg-teal-400 text-slate-950' : 'bg-pink-100 text-pink-700'
                  }`}>
                    {game.weekTag}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => handleLaunchGameFullscreen(activeHomeGame)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs transition shadow-xs cursor-pointer"
              title="Seçili oyunu tam ekran aç"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Tam Ekran Oyna</span>
            </button>
          </div>
        </div>

        {/* Embedded Active Game Component */}
        {activeHomeGame === 'dijital-kimlik' ? (
          <DigitalIdentityGame />
        ) : (
          <BilisimKahramaniGame />
        )}
      </section>

      {/* 4. Duyurular ve Ödev Hızlı Bilgilendirme Şeritleri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div
          onClick={() => onSelectTab('duyurular')}
          className="cursor-pointer bg-gradient-to-r from-red-50 via-pink-50 to-blue-50 border-2 border-pink-200 hover:border-pink-300 rounded-2xl p-3 px-4 flex items-center justify-between gap-3 shadow-2xs transition group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white flex items-center justify-center shrink-0 text-sm shadow-2xs">
              📢
            </span>
            <div className="min-w-0">
              <span className="text-xs font-black text-slate-800 block truncate group-hover:text-purple-700">
                EBA Veli Şifre Kılavuzu Yayında!
              </span>
              <span className="text-[11px] text-slate-500 block truncate">
                e-Devlet üzerinden tek kullanımlık EBA şifresi videosu.
              </span>
            </div>
          </div>
          <span className="shrink-0 text-xs font-bold text-rose-600 group-hover:translate-x-0.5 transition flex items-center gap-1">
            <span>İzle</span>
            <span>&rarr;</span>
          </span>
        </div>

        <div
          onClick={() => onSelectTab('odev')}
          className="cursor-pointer bg-gradient-to-r from-amber-50 via-orange-50 to-pink-50 border-2 border-amber-300 hover:border-amber-400 rounded-2xl p-3 px-4 flex items-center justify-between gap-3 shadow-2xs transition group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white flex items-center justify-center shrink-0 text-sm shadow-2xs">
              📋
            </span>
            <div className="min-w-0">
              <span className="text-xs font-black text-slate-800 block truncate group-hover:text-amber-800">
                3. Hafta Ödevi: Dijital Vatandaşlık Afişi
              </span>
              <span className="text-[11px] text-slate-500 block truncate">
                Tanımları oku, seçtiğin boyut için A4 afiş çalışması yap.
              </span>
            </div>
          </div>
          <span className="shrink-0 text-xs font-bold text-amber-700 group-hover:translate-x-0.5 transition flex items-center gap-1">
            <span>Ödev</span>
            <span>&rarr;</span>
          </span>
        </div>
      </div>

      {/* 5. SON YÜKLENEN DİĞER MATERYALLER (Öğretmen menülerden ekledikçe güncellenir) */}
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

      {/* 6. Müfredat Konularına Hızlı Erişim Kartları */}
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
            className="text-xs font-extrabold text-[#EC4899] hover:text-purple-700 transition flex items-center gap-1 cursor-pointer"
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
