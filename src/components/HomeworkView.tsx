import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, 
  Sparkles, 
  Printer, 
  BookOpen, 
  FileText, 
  Palette, 
  CheckCircle2, 
  Lightbulb, 
  Calendar, 
  Share2, 
  Download,
  AlertCircle,
  ShieldCheck,
  Brain,
  Cpu,
  Bot,
  Heart,
  Save,
  RotateCcw,
  Check,
  ChevronRight,
  Stethoscope,
  Leaf,
  GraduationCap,
  Rocket,
  Accessibility,
  Wheat,
  Car,
  Compass,
  ExternalLink
} from 'lucide-react';

interface HomeworkViewProps {
  onSelectTab?: (tab: string) => void;
}

export const HomeworkView: React.FC<HomeworkViewProps> = ({ onSelectTab }) => {
  // Seçili ödev haftası (Varsayılan: 8. Hafta - Açık Uçlu Sorular)
  const [activeHomeworkWeek, setActiveHomeworkWeek] = useState<8 | 4 | 3>(8);

  // 8. Hafta Açık Uçlu Sorular Form State (localStorage destekli)
  const [week8Answers, setWeek8Answers] = useState<Record<number, string>>(() => {
    const saved: Record<number, string> = {};
    for (let i = 1; i <= 10; i++) {
      saved[i] = localStorage.getItem(`bty_homework_w8_q${i}`) || '';
    }
    return saved;
  });

  // 4. Hafta Öğrenci Form State (localStorage destekli)
  const [studentName, setStudentName] = useState(() => localStorage.getItem('bty_homework_name') || '');
  const [studentClass, setStudentClass] = useState(() => localStorage.getItem('bty_homework_class') || '');
  const [studentNumber, setStudentNumber] = useState(() => localStorage.getItem('bty_homework_no') || '');
  const [q1Answer, setQ1Answer] = useState(() => localStorage.getItem('bty_homework_q1') || '');
  const [q2Answer, setQ2Answer] = useState(() => localStorage.getItem('bty_homework_q2') || '');
  const [selectedField, setSelectedField] = useState<string>(() => localStorage.getItem('bty_homework_field') || '');
  const [isSaved, setIsSaved] = useState(false);

  // 3. Hafta Dijital Vatandaşlık Boyut Seçimi
  const [selectedDimension, setSelectedDimension] = useState<number | null>(null);

  // 8. Hafta Soruları Veri Seti (İpuçsuz, sade açık uçlu sorular)
  const week8Questions = [
    { num: 1, question: "Silme işlemi yapan tuşların adlarını yazınız." },
    { num: 2, question: "ESC tuşu ne işe yarar?" },
    { num: 3, question: "Klavyedeki en uzun tuşun adını ve görevini yazınız." },
    { num: 4, question: "CapsLock ışığı yanıyorsa klavyedeki harf tuşları nasıl yazar?" },
    { num: 5, question: "Shift ve AltGr tuşlarının yazım açısından kullanılması hakkında bilgi veriniz." },
    { num: 6, question: "Farenin tekerleği ne işe yarar?" },
    { num: 7, question: "İşletim sistemi hakkında bilgi veriniz." },
    { num: 8, question: "Mobil işletim sistemlerinden 2 tanesinin adını yazınız." },
    { num: 9, question: "İşletim sisteminin görevlerinden 3 tanesini yazınız." },
    { num: 10, question: "Pardus işletim sistemi hakkında araştırma yapınız ve hakkında 4 ayrı bilgi veriniz." }
  ];

  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // 8. Hafta Kusursuz A4 Yazdırma Fonksiyonu
  const handlePrintWeek8 = () => {
    handleSaveWeek8();

    const printWin = window.open('', '_blank');
    if (printWin) {
      const qHtml = week8Questions.map(q => {
        const studentAns = week8Answers[q.num]?.trim();
        return `
          <div style="border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 12px; margin-bottom: 12px; page-break-inside: avoid; background: #fff;">
            <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
              <span style="background: #4f46e5; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 10pt; font-weight: bold; flex-shrink: 0;">${q.num}</span>
              <span style="font-size: 11pt; font-weight: bold; color: #0f172a; line-height: 1.4;">${q.num}. Soru: ${q.question}</span>
            </div>
            <div style="margin-left: 32px; min-height: 60px;">
              ${studentAns ? `
                <div style="background: #f8fafc; border: 1px solid #94a3b8; border-radius: 6px; padding: 10px; font-size: 10.5pt; color: #1e293b; white-space: pre-wrap; line-height: 1.5;">${escapeHtml(studentAns)}</div>
              ` : `
                <div style="border: 1px dashed #cbd5e1; border-radius: 6px; padding: 8px 12px;">
                  <div style="border-bottom: 1px solid #e2e8f0; height: 24px;"></div>
                  <div style="border-bottom: 1px solid #e2e8f0; height: 24px;"></div>
                  <div style="border-bottom: 1px solid #e2e8f0; height: 24px;"></div>
                </div>
              `}
            </div>
          </div>
        `;
      }).join('');

      printWin.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>8. Hafta Ödevi Açık Uçlu Sorular - Hilal KURTOĞLU</title>
          <style>
            @page { size: A4 portrait; margin: 12mm 10mm; }
            body { font-family: system-ui, -apple-system, sans-serif; color: #0f172a; margin: 0; padding: 12px; background: #fff; }
            @media print {
              .no-print { display: none !important; }
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="no-print" style="margin-bottom: 15px; text-align: center;">
            <button onclick="window.print()" style="padding: 10px 24px; background: #4f46e5; color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 12pt; cursor: pointer;">
              🖨️ Yazdır / PDF Olarak Kaydet
            </button>
          </div>
          <div style="border: 2px solid #4f46e5; border-radius: 12px; padding: 14px; margin-bottom: 14px; background: #f8fafc;">
            <h1 style="font-size: 15pt; font-weight: 800; color: #3730a3; margin: 0 0 4px 0; text-align: center;">5. Sınıf Bilişim Teknolojileri ve Yazılım Dersi</h1>
            <div style="font-size: 11pt; font-weight: 700; color: #4338ca; text-align: center; margin-bottom: 10px;">8. Hafta Ödevi: Açık Uçlu Sorular &bull; Öğretmen: Hilal KURTOĞLU</div>
            <div style="display: flex; justify-content: space-between; border-top: 1px dashed #cbd5e1; padding-top: 8px; font-size: 10pt; font-weight: bold; color: #1e293b; flex-wrap: wrap; gap: 8px;">
              <span>Öğrenci: ${studentName ? escapeHtml(studentName) : '...................................................'}</span>
              <span>Sınıf: ${studentClass ? escapeHtml(studentClass) : '..........'}</span>
              <span>No: ${studentNumber ? escapeHtml(studentNumber) : '..........'}</span>
              <span>Tarih: ${new Date().toLocaleDateString('tr-TR')}</span>
            </div>
          </div>
          <div style="background: #fef3c7; border: 1.5px solid #f59e0b; border-radius: 8px; padding: 10px 14px; margin-bottom: 14px; font-size: 10pt; font-weight: bold; color: #92400e;">
            ⚠️ Önemli Not: Öğrencilerin soruları defterlerine çözmeleri ya da site üzerinde cevaplayarak çıktı almaları ve derse getirmeleri gerekmektedir.
          </div>
          ${qHtml}
          <div style="text-align: center; font-size: 9pt; color: #64748b; margin-top: 16px; border-top: 1px solid #e2e8f0; padding-top: 8px;">
            Ahi Evran Ortaokulu &bull; Bilişim Teknolojileri ve Yazılım &bull; Hilal KURTOĞLU
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() { window.print(); }, 350);
            };
          </script>
        </body>
        </html>
      `);
      printWin.document.close();
    } else {
      window.print();
    }
  };

  // 8. Hafta Otomatik / Manuel Kaydetme
  const handleSaveWeek8 = () => {
    localStorage.setItem('bty_homework_name', studentName);
    localStorage.setItem('bty_homework_class', studentClass);
    localStorage.setItem('bty_homework_no', studentNumber);
    Object.entries(week8Answers).forEach(([k, v]) => {
      localStorage.setItem(`bty_homework_w8_q${k}`, v);
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleClearWeek8 = () => {
    if (window.confirm('8. Hafta cevaplarınızı temizlemek istediğinize emin misiniz?')) {
      const empty: Record<number, string> = {};
      for (let i = 1; i <= 10; i++) {
        empty[i] = '';
        localStorage.removeItem(`bty_homework_w8_q${i}`);
      }
      setWeek8Answers(empty);
    }
  };

  // Otomatik / Manuel Kaydetme
  const handleSaveDraft = () => {
    localStorage.setItem('bty_homework_name', studentName);
    localStorage.setItem('bty_homework_class', studentClass);
    localStorage.setItem('bty_homework_no', studentNumber);
    localStorage.setItem('bty_homework_q1', q1Answer);
    localStorage.setItem('bty_homework_q2', q2Answer);
    localStorage.setItem('bty_homework_field', selectedField);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleClearDraft = () => {
    if (window.confirm('Cevaplarınızı temizlemek istediğinize emin misiniz?')) {
      setQ1Answer('');
      setQ2Answer('');
      setSelectedField('');
      localStorage.removeItem('bty_homework_q1');
      localStorage.removeItem('bty_homework_q2');
      localStorage.removeItem('bty_homework_field');
    }
  };

  const handlePrint = () => {
    // Önce güncel bilgileri kaydet
    localStorage.setItem('bty_homework_name', studentName);
    localStorage.setItem('bty_homework_class', studentClass);
    localStorage.setItem('bty_homework_no', studentNumber);
    localStorage.setItem('bty_homework_q1', q1Answer);
    localStorage.setItem('bty_homework_q2', q2Answer);
    localStorage.setItem('bty_homework_field', selectedField);

    try {
      // Tarayıcı yazdırma penceresini aç
      window.print();
    } catch (e) {
      console.error('Yazdırma hatası:', e);
      // Alternatif olarak bağımsız sayfayı yeni pencerede aç
      window.open('/odev-4-hafta-yapay-zeka.html', '_blank');
    }
  };

  // 4. Hafta İlham Verici Yapay Zekâ Alanları
  const aiFields = [
    {
      id: 'saglik',
      title: 'Sağlık & Tıp',
      icon: '🏥',
      desc: 'Hastalıkların erken teşhisi, yeni aşı ve ilaçların geliştirilmesi, robotik ameliyatlar.',
      example: 'Örn: Röntgen ve MR filmlerini saniyeler içinde tarayarak doktorlara yardımcı olan sistemler.'
    },
    {
      id: 'cevre',
      title: 'Çevre & İklim Koruma',
      icon: '🌍',
      desc: 'Küresel ısınma ile mücadele, denizlerdeki plastikleri toplayan otonom robotlar, orman yangını tespiti.',
      example: 'Örn: Orman yangını dumanını uydu görüntülerinden 30 saniyede tespit eden erken uyarı sistemi.'
    },
    {
      id: 'egitim',
      title: 'Eğitim & Öğrenme',
      icon: '🎓',
      desc: 'Her öğrencinin öğrenme hızına ve ilgi alanına göre ders anlatan kişiselleştirilmiş sabırlı öğretmen asistanı.',
      example: 'Örn: Zorlanılan konuları tespit edip eğlenceli oyunlarla anlatan akıllı çalışma arkadaşı.'
    },
    {
      id: 'uzay',
      title: 'Uzay & Gezegen Keşfi',
      icon: '🚀',
      desc: 'Mars ve derin uzayda insanların gidemediği tehlikeli ortamlarda karar verebilen uzay araçları.',
      example: 'Örn: Mars yüzeyindeki engelleri kendi algılayıp güvenli rota çizen gezgin robotlar.'
    },
    {
      id: 'engelsiz',
      title: 'Engelsiz Yaşam',
      icon: '🤝',
      desc: 'Görme, işitme ve bedensel engelli bireylerin günlük hayatını kolaylaştıran sesli ve görsel asistanlar.',
      example: 'Örn: Görme engelliler için çevredeki nesneleri ve yazıları kulağına sesli anlatan akıllı gözlük.'
    },
    {
      id: 'tarim',
      title: 'Akıllı Tarım & Gıda',
      icon: '🌾',
      desc: 'Su israfını önleyen, kuraklığı tahmin eden ve sadece zararlı otları hedefleyen çevreci tarım sistemleri.',
      example: 'Örn: Bitkilerin su ve mineral ihtiyacını anlık analiz edip damlama sulamayı yöneten sistem.'
    },
    {
      id: 'ulasim',
      title: 'Ulaşım & Akıllı Şehir',
      icon: '🚗',
      desc: 'Trafik kazalarını sıfıra indiren sürücüsüz araçlar, ambulanslara anında yeşil ışık yakan akıllı kavşaklar.',
      example: 'Örn: Yoğun saatlerde trafik ışıklarını yapay zekâ ile ayarlayarak tıkanıklığı önleyen sistem.'
    },
    {
      id: 'guvenlik',
      title: 'Siber Güvenlik & Afet',
      icon: '🛡️',
      desc: 'Deprem, sel gibi afetlerde enkaz altındaki sesleri tespit eden veya internet dolandırıcılıklarını engelleyen yazılımlar.',
      example: 'Örn: Deprem sonrası dronlarla termal görüntü taraması yapıp canlıları bulan arama-kurtarma YZ\'si.'
    }
  ];

  // 3. Hafta Dijital Vatandaşlık Boyutları
  const dimensions = [
    {
      id: 1,
      title: "Dijital Ticaret",
      icon: "🛍️",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50 border-pink-200 text-pink-950",
      desc: "İnternetten alışveriş yaparken doğru adımları izleyerek hem alışveriş hem satış işlemlerini güvenle tamamlamak.",
      posterTip: "Güvenli alışveriş siteleri, 3D Secure, yeşil kilit simgesi ve sahte sitelerden korunma konulu bir afiş tasarlayabilirsiniz.",
      slogan: "Güvenli tıkla, bilinçli alışveriş yap!"
    },
    {
      id: 2,
      title: "Dijital İletişim",
      icon: "💬",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 border-blue-200 text-blue-950",
      desc: "E-posta, mesaj ve sosyal medyada nazik, açık ve sorumlu bir dil kullanmak. Bilişim teknolojileri cihazları üzerinden iletişim kurabilmek.",
      posterTip: "Nezaket kuralları (netiket), siber zorbalık yapmamak ve empati kurmak üzerine bir afiş çizebilirsiniz.",
      slogan: "Klavyenin başında da gerçek bir insan var; nazik ol!"
    },
    {
      id: 3,
      title: "Dijital Okuryazarlık",
      icon: "📚",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50 border-purple-200 text-purple-950",
      desc: "İnternette doğru bilgi kaynaklarını bulup yanlış veya eksik bilgileri ayırt edebilmek. Dijital ürünler geliştirebilmek.",
      posterTip: "Doğru bilgiye ulaşma, sahte haberleri (fake news) ayırt etme ve güvenilir arama motoru kullanımı afişi yapabilirsiniz.",
      slogan: "Her gördüğüne inanma, kaynağını sorgula!"
    },
    {
      id: 4,
      title: "Dijital Etik",
      icon: "🤝",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50 border-emerald-200 text-emerald-950",
      desc: "Çevrimiçi ortamda adil, dürüst ve başkalarının haklarına saygılı davranmak.",
      posterTip: "Sanal ortamda dürüstlük, başkalarının şifresini izinsiz kullanmama ve saygılı davranış afişi hazırlayabilirsiniz.",
      slogan: "Gerçek hayatta suç olan sanal hayatta da yanlıştır!"
    },
    {
      id: 5,
      title: "Dijital Güvenlik",
      icon: "🔒",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50 border-amber-200 text-amber-950",
      desc: "Şifrelerini güçlü tutmak, virüs ve dolandırıcılık tuzaklarına karşı önlem almak. Dijital dünyada güvenliğini sağlayabilmek.",
      posterTip: "Güçlü şifre kuralları (büyük harf, rakam, sembol), virüslerden korunma ve kişisel bilgileri gizli tutma afişi çizebilirsiniz.",
      slogan: "Güçlü şifre, sağlam kilit!"
    },
    {
      id: 6,
      title: "Dijital Hak ve Sorumluluklar",
      icon: "🛡️",
      color: "from-violet-500 to-purple-600",
      bgColor: "bg-violet-50 border-violet-200 text-violet-950",
      desc: "İnternette nelerin yapılabileceğini ve nelerin yasak olduğunu bilmek; kendi haklarını savunmak ve başkalarının haklarına saygı göstermek.",
      posterTip: "Fikir özgürlüğü, özel hayatın gizliliği ve dijital ortamdaki haklarımızı anlatan renkli bir afiş hazırlayabilirsiniz.",
      slogan: "Haklarını bil, sorumluluklarını unutma!"
    },
    {
      id: 7,
      title: "Dijital Sağlık",
      icon: "🧘",
      color: "from-teal-500 to-emerald-600",
      bgColor: "bg-teal-50 border-teal-200 text-teal-950",
      desc: "Ekran başında geçirdiğin zamanı dengede tutmak; göz, boyun ve ruh sağlığını koruyacak alışkanlıklar geliştirmek.",
      posterTip: "20-20-20 kuralı, doğru oturuş pozisyonu, ekran süresi ve dijital detoks afişi yapabilirsiniz.",
      slogan: "Ekranı kapat, hayata ve sağlığına zaman ayır!"
    },
    {
      id: 8,
      title: "Dijital Hukuk",
      icon: "⚖️",
      color: "from-red-500 to-rose-600",
      bgColor: "bg-rose-50 border-rose-200 text-rose-950",
      desc: "İnternette fotoğraf, video veya yazı paylaşırken telif haklarına ve yasalara uymak.",
      posterTip: "Telif hakkı, korsan yazılım indirmeme ve bilişim suçları üzerine bilgilendirici bir afiş çizebilirsiniz.",
      slogan: "Emeğe saygı duy, telif haklarına uy!"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. ÜST BİLGİ VE BAŞLIK BANNERI */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 rounded-3xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider border border-white/30">
            <ClipboardCheck className="w-3.5 h-3.5 text-amber-200" />
            <span>Haftalık Ders Ödevleri &bull; Hilal KURTOĞLU</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
            📋 5. Sınıf BTY Ödev Köşesi
          </h2>

          <p className="text-white/95 text-xs sm:text-sm md:text-base leading-relaxed">
            Ders içi kazanımlarımızı pekiştirmek için verilen haftalık araştırma, düşünce, tasarım ve proje ödevlerini bu alandan takip edebilir ve çıktısını alabilirsiniz.
          </p>

          {/* HAFTA SEÇİCİ SEKMELER */}
          <div className="pt-3 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveHomeworkWeek(8)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 shadow-sm cursor-pointer ${
                activeHomeworkWeek === 8
                  ? 'bg-white text-purple-950 ring-2 ring-white/80 shadow-md scale-102'
                  : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
              }`}
            >
              <span>⌨️</span>
              <span>8. Hafta Ödevi: Açık Uçlu Sorular</span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider">
                GÜNCEL &bull; AKTİF
              </span>
            </button>

            <button
              onClick={() => setActiveHomeworkWeek(4)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 shadow-sm cursor-pointer ${
                activeHomeworkWeek === 4
                  ? 'bg-white text-orange-950 ring-2 ring-white/80 shadow-md scale-102'
                  : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
              }`}
            >
              <span>🧠</span>
              <span>4. Hafta Ödevi: Yapay Zekâ</span>
            </button>

            <button
              onClick={() => setActiveHomeworkWeek(3)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 shadow-sm cursor-pointer ${
                activeHomeworkWeek === 3
                  ? 'bg-white text-orange-950 ring-2 ring-white/80 shadow-md scale-102'
                  : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
              }`}
            >
              <span>🎨</span>
              <span>3. Hafta Ödevi: Dijital Vatandaşlık</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 8. HAFTA ÖDEVİ: AÇIK UÇLU SORULAR                                         */}
      {/* ========================================================================= */}
      {activeHomeworkWeek === 8 && (
        <section className="bg-white border-2 border-purple-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
          
          {/* Başlık Çubuğu ve Yazdırma / Kaydetme Eylemleri */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-100">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 text-purple-950 border border-purple-300">
                  ⭐ 8. Hafta Aktif Ödevi
                </span>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                  1. Dönem &bull; 8. Hafta
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  Açık Uçlu Defter Soruları
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mt-2 flex items-center gap-2.5">
                <span>⌨️</span>
                <span>8. HAFTA ÖDEVİ: AÇIK UÇLU SORULAR</span>
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                Klavye Tuşları, Fare Kullanımı, İşletim Sistemleri ve Pardus Araştırması
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap print:hidden">
              <button
                onClick={handleSaveWeek8}
                className="py-2 px-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold text-xs transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
                title="Yazdıklarınızı tarayıcıda saklar"
              >
                {isSaved ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Save className="w-3.5 h-3.5 text-emerald-600" />}
                <span>{isSaved ? 'Kaydedildi!' : 'Taslağı Kaydet'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrintWeek8}
                className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:opacity-95 text-white font-black text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                title="Yazdırma veya PDF olarak kaydetme penceresini açar"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Ödevi Yazdır / PDF Al</span>
              </button>
            </div>
          </div>

          {/* ÖĞRETMENİN ÖDEV TALİMATI VE ZORUNLU NOT KUTUSU */}
          <div className="bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-200 border-2 border-amber-400/90 p-5 rounded-2xl shadow-xs space-y-2.5 text-slate-900">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-amber-900 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                📌
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-amber-950">
                Öğretmenin Ödev Talimatı &bull; Hilal KURTOĞLU
              </span>
            </div>
            <p className="text-sm sm:text-base md:text-lg font-black leading-snug text-slate-950">
              Sevgili öğrenciler, bu hafta dersimizde Klavye Tuşları ve Görevleri, Fare Kullanımı, İşletim Sistemi kavramı ve yerli işletim sistemimiz Pardus'u öğrendik. Aşağıdaki 10 açık uçlu soruyu dikkatlice okuyup cevaplayınız.
            </p>
            <div className="p-3 bg-amber-300/60 rounded-xl border border-amber-400 flex items-center gap-2 text-xs sm:text-sm font-black text-amber-950">
              <span className="text-base">⚠️</span>
              <span>Önemli Not: Öğrencilerin soruları defterlerine çözmeleri ya da site üzerinde cevaplayarak çıktı almaları ve derse getirmeleri gerekmektedir.</span>
            </div>
          </div>

          {/* 10 AÇIK UÇLU SORU LİSTESİ - İPUÇSUZ, ALT ALTA TEK CEVAP KUTUSU */}
          <div className="space-y-4">
            {week8Questions.map((q) => (
              <div
                key={q.num}
                className="bg-slate-50/70 border-2 border-purple-100 hover:border-purple-300 rounded-2xl p-5 space-y-3.5 transition"
              >
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs mt-0.5">
                    {q.num}
                  </span>
                  <div className="space-y-1 flex-1">
                    <span className="text-[11px] font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full inline-block">
                      Açık Uçlu Soru
                    </span>
                    <h4 className="text-sm sm:text-base md:text-lg font-black text-slate-900 leading-snug">
                      {q.num}. {q.question}
                    </h4>
                  </div>
                </div>

                {/* Tek Cevaplama Kutusu - İpucu Yok */}
                <div className="space-y-1.5">
                  <label htmlFor={`w8-q${q.num}`} className="block text-xs font-black text-slate-800">
                    ✍️ {q.num}. Soru Cevabı:
                  </label>
                  <textarea
                    id={`w8-q${q.num}`}
                    rows={3}
                    value={week8Answers[q.num] || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setWeek8Answers(prev => ({ ...prev, [q.num]: val }));
                    }}
                    placeholder="Cevabınızı buraya yazınız..."
                    className="w-full p-3 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-xs sm:text-sm text-slate-800 leading-relaxed bg-white transition"
                  />
                  <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                    <span>Defterinize veya bu kutucuğa yazıp çıktı alabilirsiniz.</span>
                    <span>{(week8Answers[q.num] || '').length} karakter</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ÖĞRENCİ BİLGİLERİ VE TESLİM FORMU KARTI */}
          <div className="bg-gradient-to-br from-purple-50/70 via-indigo-50/50 to-pink-50/70 p-5 sm:p-6 rounded-2xl border-2 border-purple-200/80 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
                  📝
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Öğrenci Bilgileri &amp; Ödev Çıktı Formu
                  </h4>
                  <p className="text-xs text-slate-600">
                    Çıktı almak isterseniz adınızı, sınıfınızı ve numaranızı yazınız.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 print:hidden">
                <button
                  type="button"
                  onClick={handleClearWeek8}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Temizle</span>
                </button>
                <button
                  type="button"
                  onClick={handleSaveWeek8}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-2xs cursor-pointer"
                >
                  <Save className="w-3 h-3" />
                  <span>{isSaved ? 'Kaydedildi!' : 'Cevapları Sakla'}</span>
                </button>
              </div>
            </div>

            {/* Öğrenci Bilgi Girişleri */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Adın ve Soyadın:
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Örn: Mehmet Demir"
                  className="w-full p-2.5 rounded-xl border border-purple-200 bg-white text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Sınıfın ve Şuben:
                </label>
                <input
                  type="text"
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  placeholder="Örn: 5-B"
                  className="w-full p-2.5 rounded-xl border border-purple-200 bg-white text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Okul Numaran:
                </label>
                <input
                  type="text"
                  value={studentNumber}
                  onChange={(e) => setStudentNumber(e.target.value)}
                  placeholder="Örn: 254"
                  className="w-full p-2.5 rounded-xl border border-purple-200 bg-white text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
            </div>

            {/* Büyük Yazdırma Butonu ve Defter Hatırlatması */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-purple-200/80">
              <div className="text-xs text-slate-700 space-y-0.5">
                <span className="font-black text-amber-900 block">
                  ⚠️ Önemli Not: Öğrencilerin soruları defterlerine çözmeleri ya da site üzerinde cevaplayarak çıktı almaları ve derse getirmeleri gerekmektedir.
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Öğretmen: Hilal KURTOĞLU &bull; Değerlendirme: Defter Kontrolü ve Derste Sözlü Yanıtlama
                </span>
              </div>

              <div className="flex items-center gap-2 print:hidden">
                <button
                  type="button"
                  onClick={handlePrintWeek8}
                  className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:opacity-95 text-white font-black text-xs sm:text-sm transition flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Ödev Sorularını Yazdır / PDF Al</span>
                </button>
              </div>
            </div>
          </div>

          {/* DERS NOTLARINA HIZLI GEÇİŞ LİNKİ */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 font-semibold border-t border-purple-100 gap-2 print:hidden">
            <span>💡 Cevapları ararken 7. Hafta Klavye Tuşları &amp; Yazılım ve İşletim Sistemi ders notlarına göz atabilirsiniz.</span>
            {onSelectTab && (
              <button
                onClick={() => onSelectTab('ders-notlari')}
                className="text-purple-700 hover:underline font-bold flex items-center gap-1 cursor-pointer shrink-0"
              >
                <span>7. Hafta Ders Notlarını Aç</span>
                <span>&rarr;</span>
              </button>
            )}
          </div>

        </section>
      )}

      {/* ========================================================================= */}
      {/* 2. AKTİF ÖDEV KARTI: 4. HAFTA - YAPAY ZEKÂNIN TEMELLERİ                    */}
      {/* ========================================================================= */}
      {activeHomeworkWeek === 4 && (
        <section className="bg-white border-2 border-orange-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
          
          {/* Başlık Çubuğu ve Yazdırma / Kaydetme Eylemleri */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-orange-100">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 text-orange-950 border border-orange-300">
                  ⭐ 4. Hafta Aktif Ödevi
                </span>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                  1. Dönem &bull; 4. Hafta
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  Araştırma &amp; Yaratıcı Düşünce
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mt-2 flex items-center gap-2.5">
                <span>🧠</span>
                <span>4. HAFTA ÖDEVİ: YAPAY ZEKÂNIN TEMELLERİ</span>
              </h3>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
              <button
                onClick={handleSaveDraft}
                className="py-2 px-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold text-xs transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
                title="Yazdıklarınızı tarayıcıda saklar"
              >
                {isSaved ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Save className="w-3.5 h-3.5 text-emerald-600" />}
                <span>{isSaved ? 'Kaydedildi!' : 'Taslağı Kaydet'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                title="Tarayıcı yazdırma veya PDF olarak kaydetme penceresini açar"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Ödevi Yazdır / PDF Al</span>
              </button>

              <a
                href="/odev-4-hafta-yapay-zeka.html"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  localStorage.setItem('bty_homework_name', studentName);
                  localStorage.setItem('bty_homework_class', studentClass);
                  localStorage.setItem('bty_homework_no', studentNumber);
                  localStorage.setItem('bty_homework_q1', q1Answer);
                  localStorage.setItem('bty_homework_q2', q2Answer);
                }}
                className="py-2 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-900 border border-orange-200 font-bold text-xs transition flex items-center gap-1 shadow-2xs"
                title="Ödev formunu ayrı sayfada açar ve yazdırır"
              >
                <ExternalLink className="w-3.5 h-3.5 text-orange-600" />
                <span>Yeni Sekmede Aç</span>
              </a>
            </div>
          </div>

          {/* ÖĞRETMENİN ÖDEV TALİMATI KUTUSU */}
          <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 border-2 border-amber-400/90 p-5 rounded-2xl shadow-xs space-y-2.5 text-slate-900">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-amber-900 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                📌
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-amber-950">
                Öğretmenin Ödev Talimatı &bull; Hilal KURTOĞLU
              </span>
            </div>
            <p className="text-sm sm:text-base md:text-lg font-black leading-snug text-slate-950">
              Sevgili öğrenciler, bu hafta dersimizde Yapay Zekânın Temellerini, insan zekâsı ile benzer ve farklı yönlerini öğrendik. Aşağıdaki 2 temel soruyu dikkatlice okuyup kendi düşüncelerinizle cevaplayınız.
            </p>
            <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              Cevaplarınızı doğrudan aşağıdaki kutucuklara yazarak <strong>"Ödevi Yazdır / PDF Al"</strong> düğmesinden çıktı alabilir ya da özenle ödev defterinize yazarak haftaya Bilişim dersine getirebilirsiniz.
            </p>
          </div>

          {/* SORU 1: İNSAN ZEKÂSI VS YAPAY ZEKA */}
          <div className="bg-slate-50/70 border-2 border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs mt-0.5">
                1
              </span>
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full inline-block">
                  Karşılaştırma &amp; Analiz
                </span>
                <h4 className="text-base sm:text-lg md:text-xl font-black text-slate-900 leading-snug">
                  1. Yapay zekâ ile insan zekâsı arasındaki en temel fark sence nedir?
                </h4>
              </div>
            </div>

            {/* Düşünce Rehberi & İpuçları Kutusu */}
            <div className="bg-white border border-purple-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black text-purple-900">
                <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Düşünürken Sana Yardımcı Olacak İpuçları:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-pink-50/60 border border-pink-100 space-y-1">
                  <div className="font-bold text-pink-900 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-pink-600" />
                    <span>İnsan Zekâsı Özellikleri:</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-[11px]">
                    Duygular (sevgi, üzüntü, heyecan), empati kurabilme, vicdan ve ahlak, bilinç, kendi kendine amaç belirleme, hayal gücü ve sezgiler.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-100 space-y-1">
                  <div className="font-bold text-blue-900 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-blue-600" />
                    <span>Yapay Zekâ Özellikleri:</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-[11px]">
                    Büyük verilerle eğitilme, çok hızlı hesaplama, kalıpları ezberleyip tahmin etme, yorulmama; fakat duygu, his ve bilince sahip olmama.
                  </p>
                </div>
              </div>
            </div>

            {/* Soru 1 Cevap Yazma Alanı */}
            <div className="space-y-1.5">
              <label htmlFor="q1-textarea" className="block text-xs font-black text-slate-800">
                ✍️ 1. Soru İçin Cevabın:
              </label>
              <textarea
                id="q1-textarea"
                rows={4}
                value={q1Answer}
                onChange={(e) => setQ1Answer(e.target.value)}
                placeholder="Örnek: Bence en temel fark insanların hisleri, empati yeteneği ve vicdanı olmasıdır. Yapay zekâ çok hızlı bilgi işleyebilir ama insan gibi sevinemez veya üzülemez..."
                className="w-full p-3.5 rounded-xl border-2 border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-xs sm:text-sm text-slate-800 leading-relaxed bg-white transition"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                <span>Düşüncelerini kendi cümlelerinle özgürce ifade et.</span>
                <span>{q1Answer.length} karakter</span>
              </div>
            </div>
          </div>

          {/* SORU 2: SEN BİR YAPAY ZEKÂ GELİŞTİRİCİSİ OLSAYDIN... */}
          <div className="bg-slate-50/70 border-2 border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs mt-0.5">
                2
              </span>
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full inline-block">
                  Gelecek Vizyonu &amp; Problem Çözme
                </span>
                <h4 className="text-base sm:text-lg md:text-xl font-black text-slate-900 leading-snug">
                  2. Sen bir yapay zekâ geliştiricisi olsaydın, hangi alanda çalışmak isterdin? Yapay zekâyı hangi sorunu çözmek için kullanırdın?
                </h4>
              </div>
            </div>

            {/* İlham Verici Çalışma Alanları (Tıklanabilir Seçim Kartları) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Çalışmak İstediğin Alanı Seç veya İlham Al:</span>
                </span>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  Aşağıdaki alanlardan birini seçerek başlayabilirsin
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {aiFields.map((field) => {
                  const isCurrent = selectedField === field.title;
                  return (
                    <button
                      key={field.id}
                      type="button"
                      onClick={() => {
                        const newTitle = isCurrent ? '' : field.title;
                        setSelectedField(newTitle);
                        if (!q2Answer.includes(field.title) && newTitle) {
                          setQ2Answer(prev => 
                            prev 
                              ? `${prev}\n\n[Çalışmak İstediğim Alan: ${field.title}]` 
                              : `[Çalışmak İstediğim Alan: ${field.title}]\n\nBu alanda yapay zekâyı şu sorunu çözmek için kullanırdım: `
                          );
                        }
                      }}
                      className={`text-left p-3 rounded-xl border-2 transition flex flex-col justify-between space-y-1.5 cursor-pointer ${
                        isCurrent
                          ? 'border-orange-500 bg-orange-50 shadow-sm ring-2 ring-orange-300'
                          : 'border-slate-200 hover:border-orange-300 bg-white hover:bg-orange-50/20'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xl">{field.icon}</span>
                        {isCurrent && (
                          <span className="text-[10px] font-black bg-orange-500 text-white px-2 py-0.2 rounded-full">
                            Seçildi ✓
                          </span>
                        )}
                      </div>
                      <div className="font-black text-xs text-slate-900 leading-tight">
                        {field.title}
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">
                        {field.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Soru 2 Cevap Yazma Alanı */}
            <div className="space-y-1.5">
              <label htmlFor="q2-textarea" className="block text-xs font-black text-slate-800">
                ✍️ 2. Soru İçin Cevabın:
              </label>
              <textarea
                id="q2-textarea"
                rows={5}
                value={q2Answer}
                onChange={(e) => setQ2Answer(e.target.value)}
                placeholder="Örnek: Ben bir yapay zekâ geliştiricisi olsaydım çevre ve iklim alanında çalışmak isterdim. Okyanuslardaki plastik çöpleri tespit edip toplayan ve deniz canlılarına zarar vermeyen akıllı deniz temizleme robotları geliştirirdim. Böylece..."
                className="w-full p-3.5 rounded-xl border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-xs sm:text-sm text-slate-800 leading-relaxed bg-white transition"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                <span>Hangi sorunu nasıl çözeceğini ayrıntılı anlatabilirsin.</span>
                <span>{q2Answer.length} karakter</span>
              </div>
            </div>
          </div>

          {/* ÖĞRENCİ BİLGİLERİ VE ÇIKTI / TESLİM FORMU KARTI */}
          <div className="bg-gradient-to-br from-amber-50/70 via-orange-50/50 to-pink-50/70 p-5 sm:p-6 rounded-2xl border-2 border-orange-200/80 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
                  📝
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Öğrenci Bilgileri &amp; Ödev Çıktı Formu
                  </h4>
                  <p className="text-xs text-slate-600">
                    Yazdırmadan önce adını, sınıfını ve numaranı yazmayı unutma!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClearDraft}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Temizle</span>
                </button>
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-2xs cursor-pointer"
                >
                  <Save className="w-3 h-3" />
                  <span>{isSaved ? 'Kaydedildi!' : 'Cevapları Sakla'}</span>
                </button>
              </div>
            </div>

            {/* Öğrenci Bilgi Girişleri */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Adın ve Soyadın:
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Örn: Ayşe Yılmaz"
                  className="w-full p-2.5 rounded-xl border border-orange-200 bg-white text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Sınıfın ve Şuben:
                </label>
                <input
                  type="text"
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  placeholder="Örn: 5-A"
                  className="w-full p-2.5 rounded-xl border border-orange-200 bg-white text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Okul Numaran:
                </label>
                <input
                  type="text"
                  value={studentNumber}
                  onChange={(e) => setStudentNumber(e.target.value)}
                  placeholder="Örn: 142"
                  className="w-full p-2.5 rounded-xl border border-orange-200 bg-white text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
            </div>

            {/* Büyük Yazdırma Butonu */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-orange-200/80">
              <div className="text-xs text-slate-600 space-y-0.5">
                <span className="font-bold text-slate-800 block">
                  📅 Teslim Tarihi: Bir sonraki Bilişim Teknolojileri ve Yazılım dersinde
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Öğretmen: Hilal KURTOĞLU &bull; Puan Değeri: 100 Puan
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-xs sm:text-sm transition flex items-center gap-2 shadow-sm cursor-pointer"
                  title="Yazdırma veya PDF olarak kaydetme iletişim kutusunu açar"
                >
                  <Printer className="w-4 h-4" />
                  <span>A4 Ödev Formunu Yazdır / PDF Al</span>
                </button>

                <a
                  href="/odev-4-hafta-yapay-zeka.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    localStorage.setItem('bty_homework_name', studentName);
                    localStorage.setItem('bty_homework_class', studentClass);
                    localStorage.setItem('bty_homework_no', studentNumber);
                    localStorage.setItem('bty_homework_q1', q1Answer);
                    localStorage.setItem('bty_homework_q2', q2Answer);
                  }}
                  className="py-2.5 px-3.5 rounded-xl bg-white hover:bg-orange-50 text-orange-950 border border-orange-300 font-bold text-xs sm:text-sm transition flex items-center gap-1.5 shadow-2xs"
                  title="Ödev formunu ayrı sayfada tam ekran açar ve oradan yazdırabilirsiniz"
                >
                  <ExternalLink className="w-4 h-4 text-orange-600" />
                  <span>Ayrı Sekmede Aç / Yazdır</span>
                </a>
              </div>
            </div>
          </div>

          {/* DERS NOTLARINA HIZLI GEÇİŞ LİNKİ */}
          <div className="pt-2 flex items-center justify-between text-xs text-slate-600 font-semibold border-t border-orange-100">
            <span>💡 Hazırlanırken 4. Hafta ders notuna göz atmak ister misin?</span>
            {onSelectTab && (
              <button
                onClick={() => onSelectTab('ders-notlari')}
                className="text-orange-600 hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>4. Hafta Yapay Zekâ Ders Notuna Git</span>
                <span>&rarr;</span>
              </button>
            )}
          </div>

        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. ÖNCEKİ ÖDEV KARTI: 3. HAFTA - DİJİTAL VATANDAŞLIĞIN 9 BOYUTU AFİŞİ       */}
      {/* ========================================================================= */}
      {activeHomeworkWeek === 3 && (
        <section className="bg-white border-2 border-pink-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
          
          {/* Ödev Başlığı ve Yazdırma Butonu */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-pink-100">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-300">
                  📁 3. Hafta Ödevi (Önceki Hafta)
                </span>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                  Dijital Yurttaşlık
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 mt-2">
                3.HAFTA Ödev - DİJİTAL VATANDAŞLIĞIN 9 BOYUTU (A4 AFİŞ)
              </h3>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={handlePrint}
                className="py-2.5 px-4 rounded-xl bg-pink-50 hover:bg-pink-100 text-purple-900 border border-pink-200 font-bold text-xs transition flex items-center gap-2 shadow-2xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-[#EC4899]" />
                <span>Ödevi Yazdır</span>
              </button>
            </div>
          </div>

          {/* ÖĞRETMENİN ÖDEV TALİMATI VURGU KUTUSU */}
          <div className="bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-300 border-2 border-amber-400 p-5 rounded-2xl shadow-xs space-y-2 text-slate-900">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-amber-900 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                📌
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-amber-950">
                Öğretmenin Ödev Talimatı &bull; Hilal KURTOĞLU
              </span>
            </div>
            <p className="text-sm sm:text-base md:text-lg font-black leading-snug text-slate-950">
              ÖDEV: Yukarıda yer alan Dijital Vatandaşlığın 9 boyutundan 1 tanesi için web sitemde yer alan ödev bölümündeki tanımları okuyun ve A4 kağıdında afiş çalışması yaparak haftaya getirin.
            </p>
          </div>

          {/* DİJİTAL VATANDAŞLIĞIN 9 BOYUTU VE TANIMLARI LİSTESİ */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-base sm:text-lg text-slate-800 flex items-center gap-2">
                <span>📖</span>
                <span>Afiş İçin Seçeceğiniz Boyutlar ve Tanımları:</span>
              </h4>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                Aşağıdaki 8 boyuttan birini seçerek afiş hazırlayın
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {dimensions.map((dim) => {
                const isSelected = selectedDimension === dim.id;
                return (
                  <div
                    key={dim.id}
                    onClick={() => setSelectedDimension(isSelected ? null : dim.id)}
                    className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between space-y-3 ${
                      isSelected 
                        ? 'border-purple-500 bg-purple-50/50 shadow-sm ring-2 ring-purple-300' 
                        : 'border-pink-100 hover:border-pink-300 bg-white hover:bg-pink-50/20 shadow-2xs'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{dim.icon}</span>
                          <h5 className="font-black text-sm sm:text-base text-slate-900">
                            {dim.id}. {dim.title}
                          </h5>
                        </div>
                        <span className="text-[11px] font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">
                          Seçilebilir
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium pl-1">
                        {dim.desc}
                      </p>
                    </div>

                    {/* Afiş İpucu & Slogan Kutusu */}
                    <div className="pt-2 border-t border-slate-100 text-xs space-y-1">
                      <div className="text-purple-900 font-semibold flex items-start gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-[#EC4899] shrink-0 mt-0.5" />
                        <span><strong>Afiş Fikri:</strong> {dim.posterTip}</span>
                      </div>
                      <div className="text-amber-800 font-bold bg-amber-50 p-2 rounded-xl border border-amber-200/70">
                        🎯 Slogan Önerisi: "{dim.slogan}"
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AFİŞ ÇALIŞMASI HAZIRLAMA REHBERİ & PÜF NOKTALARI */}
          <div className="bg-gradient-to-br from-pink-50/70 via-purple-50/50 to-blue-50/70 p-5 sm:p-6 rounded-2xl border-2 border-pink-200/80 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white flex items-center justify-center font-black text-base shrink-0 shadow-2xs">
                🎨
              </div>
              <div>
                <h4 className="font-extrabold text-base text-slate-800">
                  Afiş Hazırlarken Dikkat Edilecek Püf Noktalar
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  Ödevinizi hazırlarken aşağıdaki adımları takip ederek tam puan alabilirsiniz!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-pink-100 shadow-2xs space-y-1">
                <span className="font-black text-slate-800 block text-sm flex items-center gap-1.5">
                  <span>📄</span> 1. A4 Kâğıdı
                </span>
                <p className="text-slate-600 leading-snug">
                  Standart beyaz A4 kâğıdı kullanın. Dilerseniz yatay veya dikey olarak çalışabilirsiniz.
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-pink-100 shadow-2xs space-y-1">
                <span className="font-black text-slate-800 block text-sm flex items-center gap-1.5">
                  <span>✏️</span> 2. Büyük ve Net Başlık
                </span>
                <p className="text-slate-600 leading-snug">
                  Seçtiğiniz boyutun adını (örneğin "Dijital Güvenlik") kâğıdın en üstüne dikkat çekici ve renkli yazın.
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-pink-100 shadow-2xs space-y-1">
                <span className="font-black text-slate-800 block text-sm flex items-center gap-1.5">
                  <span>🖍️</span> 3. Çizim veya Resim
                </span>
                <p className="text-slate-600 leading-snug">
                  Konuyu anlatan renkli bir çizim yapın, dergilerden görsel yapıştırın veya semboller çizin.
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-pink-100 shadow-2xs space-y-1">
                <span className="font-black text-slate-800 block text-sm flex items-center gap-1.5">
                  <span>✍️</span> 4. İsim ve Sınıf
                </span>
                <p className="text-slate-600 leading-snug">
                  Kâğıdın sağ alt köşesine veya arkasına Adınızı, Soyadınızı, Sınıfınızı ve Numaranızı yazmayı unutmayın.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-600 font-semibold border-t border-pink-200">
              <span>📅 Teslim Tarihi: Tamamlandı &bull; Arşiv Ödevi</span>
              {onSelectTab && (
                <button
                  onClick={() => onSelectTab('ders-notlari')}
                  className="text-[#EC4899] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>3. Hafta Ders Notuna Geri Dön</span>
                  <span>&rarr;</span>
                </button>
              )}
            </div>
          </div>

        </section>
      )}

    </div>
  );
};
