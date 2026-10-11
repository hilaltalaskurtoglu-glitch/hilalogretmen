import React, { useState } from 'react';
import { 
  CheckCircle2, 
  HelpCircle, 
  Brain, 
  Sparkles, 
  Play, 
  ExternalLink, 
  Download, 
  RotateCcw, 
  Trophy, 
  Layers, 
  BookOpen, 
  ArrowLeft,
  Maximize2,
  Calendar,
  Award
} from 'lucide-react';
import { YapayZekaGame } from './YapayZekaGame';
import { DigitalIdentityGame } from './DigitalIdentityGame';

interface TestItem {
  id: string;
  title: string;
  subtitle: string;
  weekTag: string;
  questionCount: number;
  outcomeCode: string;
  outcomeDesc: string;
  description: string;
  icon: string;
  color: 'indigo' | 'emerald' | 'amber' | 'teal';
  features: string[];
  htmlUrl?: string;
}

export const TESTS_LIST: TestItem[] = [
  {
    id: 'yapay-zeka',
    title: 'Yapay Zekâ Temelleri – Bilgini Ölç Testi',
    subtitle: '1. Dönem · 4. Hafta Konu Değerlendirme Testi',
    weekTag: '4. Hafta Testi',
    questionCount: 16,
    outcomeCode: 'BTY.5.1.4',
    outcomeDesc: 'Yapay zekâ ile ilgili temel kavramları ve özellikleri sorgulayabilme',
    description: 'Yapay zekânın tanımı, makine öğrenmesi, verinin önemi, sesli asistanlar, yüz tanıma, robotlar ve güvenli kullanım üzerine 16 sorudan oluşan kapsamlı online test.',
    icon: '🤖',
    color: 'indigo',
    htmlUrl: '/oyun-4-hafta-yapay-zeka.html',
    features: [
      '16 Özgün Soru ve Her Soru İçin Anında Eğitsel Açıklama',
      'Akıllı Tekrar Modu: Sadece Yanlış Yapılan Soruları Yeniden Çözme',
      'Görsel İlerleme Çubuğu ve Başarı Yüzdesi',
      'Klavyeden (A, B, C, D, 1-4, Enter) ve Dokunmatik Akıllı Tahtadan Çözülebilme',
      'Tamamlayınca Değerlendirme Karnesi ve Hilal Öğretmen Başarı Rozeti'
    ]
  },
  {
    id: 'dijital-vatandaslik',
    title: 'Dijital Kimlik & Siber Ayak İzi Testi',
    subtitle: '1. Dönem · 3. Hafta Konu Değerlendirme Testi',
    weekTag: '3. Hafta Testi',
    questionCount: 10,
    outcomeCode: 'BTY.5.1.3',
    outcomeDesc: 'Dijital kimlik ve ayak izi kavramlarını analiz edebilme',
    description: 'Dijital kimlik, arama motorlarındaki kalıcılık, kişisel verilerin korunması ve e-Devlet/EBA uygulamalarının güvenli kullanımı üzerine 10 soruluk test.',
    icon: '🆔',
    color: 'teal',
    features: [
      'Dijital Kimlik ve Sosyal Medya Paylaşımları',
      'Arama Motorlarında İz Silinmezliği Analizi',
      'Güçlü Şifre Oluşturma ve Hesap Güvenliği',
      'e-Devlet, EBA ve MHRS Hizmet Bilgisi'
    ]
  },
  {
    id: 'saglik-ergonomi',
    title: 'Bilişim Teknolojileri ve Ergonomi Testi',
    subtitle: '1. Dönem · 2. Hafta Konu Değerlendirme Testi',
    weekTag: '2. Hafta Testi',
    questionCount: 10,
    outcomeCode: 'BTY.5.1.2',
    outcomeDesc: 'Bilişim teknolojilerini kullanırken sağlığı koruma kurallarını uygulayabilme',
    description: 'Doğru oturuş, ekran mesafesi, 20-20-20 dinlenme kuralı ve bilgisayar başında sağlıklı çalışma alışkanlıkları üzerine test.',
    icon: '🖥️',
    color: 'emerald',
    features: [
      'İdeal Oturuş ve Koltuk Ayarları',
      'Ekran Uzaklığı ve 20-20-20 Göz Kuralı',
      'Klavye & Fare Tutuş Pozisyonları',
      'Laboratuvar Güvenlik Kuralları'
    ]
  }
];

interface TestsViewProps {
  onBackToHome?: () => void;
  onNavigateToMaterials?: () => void;
  initialTestId?: string;
}

export const TestsView: React.FC<TestsViewProps> = ({
  onBackToHome,
  onNavigateToMaterials,
  initialTestId = 'yapay-zeka'
}) => {
  const [activeTestId, setActiveTestId] = useState<string>(initialTestId);
  const [isFullscreenActive, setIsFullscreenActive] = useState<boolean>(false);

  const activeTest = TESTS_LIST.find(t => t.id === activeTestId) || TESTS_LIST[0];

  return (
    <div className="space-y-6">
      
      {/* 1. ÜST BİLGİ VE BAŞLIK ŞERİDİ */}
      <div className="bg-white/95 backdrop-blur-xs border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-900 bg-gradient-to-r from-indigo-100 to-sky-100 border border-indigo-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-indigo-600" />
                <span>Ölçme &amp; Değerlendirme Merkezi &bull; 5. Sınıf BTY</span>
              </span>
              <span className="text-xs font-bold text-slate-500 hidden sm:inline">
                Hilal KURTOĞLU Testleri
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2 flex items-center gap-2">
              <span>📝 Ders Testleri &amp; Bilgini Ölç</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Ders Materyalleri Kütüphanesine bağlı <strong>Online Testler Bölümü</strong>ndesiniz.
              Aşağıdaki testlerden birini seçerek bilginizi anında ölçebilir, yanlışlarınızı açıklamalı dönütlerle öğrenebilirsiniz.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {onNavigateToMaterials && (
              <button
                onClick={onNavigateToMaterials}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-bold text-xs transition cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Materyaller Kütüphanesi</span>
              </button>
            )}

            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Ana Sayfa</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. TEST SEÇİM SEKMELERİ (TEST SELECTOR CARDS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TESTS_LIST.map((t) => {
          const isSelected = activeTestId === t.id;
          return (
            <div
              key={t.id}
              onClick={() => setActiveTestId(t.id)}
              className={`p-4 sm:p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between shadow-2xs hover:shadow-md hover:-translate-y-0.5 ${
                isSelected
                  ? 'bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white border-indigo-400 shadow-sm'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${
                    isSelected ? 'bg-indigo-400 text-slate-950' : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {t.weekTag}
                  </span>
                  <span className="text-2xl">{t.icon}</span>
                </div>

                <h3 className={`font-black text-base sm:text-lg leading-snug ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                  {t.title}
                </h3>

                <p className={`text-xs line-clamp-2 ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                  {t.description}
                </p>
              </div>

              <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-bold ${
                isSelected ? 'border-white/15 text-indigo-200' : 'border-slate-100 text-slate-600'
              }`}>
                <span>{t.questionCount} Soru &bull; {t.outcomeCode}</span>
                <span className={`font-black ${isSelected ? 'text-amber-300' : 'text-indigo-600'}`}>
                  {isSelected ? '✓ Seçili Test' : 'Testi Seç →'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. AKTİF TEST ALANI (ACTIVE TEST VIEWER & INTERACTIVE SOLVER) */}
      <div className="bg-white border-2 border-indigo-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
        
        {/* Test Başlık ve Hızlı Eylemler Çubuğu */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-100 pb-5">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-2xl shadow-md shrink-0">
              {activeTest.icon}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-900 border border-indigo-200">
                  {activeTest.weekTag}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Kazanım: {activeTest.outcomeCode}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5">
                {activeTest.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {activeTest.outcomeDesc}
              </p>
            </div>
          </div>

          {/* Dış Bağlantılar (Ayrı Sekmede Aç, İndir) */}
          {activeTest.htmlUrl && (
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={activeTest.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-bold text-xs transition flex items-center gap-1.5 shadow-2xs"
                title="Testi bağımsız web sayfası olarak yeni sekmede aç"
              >
                <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
                <span>Web Sitesinde Aç</span>
              </a>

              <a
                href={activeTest.htmlUrl}
                download="4_Hafta_Yapay_Zeka_Testi.html"
                className="py-2 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center gap-1.5 shadow-2xs"
                title="Test HTML dosyasını bilgisayara indir"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                <span>İndir</span>
              </a>
            </div>
          )}
        </div>

        {/* Test Özellik Maddeleri */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
          {activeTest.features.map((feat, fIdx) => (
            <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* İnteraktif Test Çözücü Bileşeni */}
        <div className="pt-2">
          {activeTestId === 'yapay-zeka' ? (
            <YapayZekaGame />
          ) : (activeTestId === 'dijital-vatandaslik' || activeTestId === 'dijital-kimlik') ? (
            <DigitalIdentityGame />
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl mx-auto">
                📝
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-800">
                  {activeTest.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Bu konu testi hazırlanma aşamasındadır. Şu anda <strong>4. Hafta Yapay Zekâ Temelleri Testi</strong> aktiftir ve yukarıdan çözebilirsiniz.
                </p>
              </div>
              <button
                onClick={() => setActiveTestId('yapay-zeka')}
                className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs transition cursor-pointer shadow-xs inline-flex items-center gap-2"
              >
                <span>4. Hafta Yapay Zekâ Testine Git</span>
                <Brain className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
