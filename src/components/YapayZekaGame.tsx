import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Sparkles, Trophy, RotateCcw, ArrowRight, CheckCircle2, XCircle, Brain, Bot, Lightbulb, ExternalLink, Download, ArrowLeft } from 'lucide-react';

interface QuestionItem {
  q: string;
  o: string[];
  e: string;
}

const QUESTION_BANK: QuestionItem[] = [
  {
    q: "Yapay zekâ en kısa hangisiyle tanımlanır?",
    o: [
      "Bilgisayarların öğrenme, anlama ve karar verme gibi insana özgü işleri taklit etmesi",
      "Bilgisayarın internete daha hızlı bağlanması",
      "Ekranın daha parlak görünmesini sağlayan ayar",
      "Bilgisayardaki dosyaları klasörlere ayıran düğme"
    ],
    e: "Yapay zekâ, makinelerin insan zekâsına özgü görevleri (öğrenme, anlama, karar verme) yapabilmesini sağlayan teknolojidir."
  },
  {
    q: "Telefona “Yarın hava nasıl olacak?” diye sorduğumuzda cevap veren sesli asistan neyi kullanır?",
    o: [
      "Konuşmamızı anlayıp yorumlayan yapay zekâyı",
      "Sadece ekran parlaklığını",
      "Yalnızca şarj miktarını",
      "Telefonun kılıfındaki sensörü"
    ],
    e: "Sesli asistanlar, konuşmayı yazıya çevirip anlamını çözen yapay zekâ yöntemleriyle çalışır."
  },
  {
    q: "Makine öğrenmesi için hangisi doğrudur?",
    o: [
      "Bilgisayarın örnek verilerden kalıpları bulup zamanla daha iyi sonuç vermesidir.",
      "Bilgisayarın kendi kendine kablosuz bağlanmasıdır.",
      "Makinelerin yağlanarak daha hızlı çalışmasıdır.",
      "Bilgisayara her işi tek tek elle girmektir."
    ],
    e: "Makine öğrenmesinde bilgisayar, çok sayıda örnekten kalıplar çıkarır ve deneyimle gelişir."
  },
  {
    q: "Bir yapay zekânın kedi fotoğraflarını doğru tanıyabilmesi için en çok neye ihtiyacı vardır?",
    o: [
      "Çok sayıda kedi örneği (veri)",
      "Çok büyük bir klavye",
      "Renkli bir masa örtüsü",
      "Sürekli açık kalan bir hoparlör"
    ],
    e: "Yapay zekâ verilerle öğrenir. Ne kadar çok ve çeşitli örnek görürse o kadar iyi tanır."
  },
  {
    q: "Hangisinde yapay zekâ kullanılmaz?",
    o: [
      "Düğmesine basınca yanan sıradan bir el feneri",
      "Fotoğraftaki yüzleri otomatik bulan galeri",
      "Yazdıklarımızı tamamlayan klavye",
      "Müzik zevkimize göre liste hazırlayan uygulama"
    ],
    e: "Sıradan el feneri sadece devreyi açıp kapatır; öğrenmez, karar vermez, tahmin etmez."
  },
  {
    q: "Çeviri uygulamalarının cümleleri çevirirken yaptığı şey en çok hangisine benzer?",
    o: [
      "Cümlenin anlamını örneklerden öğrendiği kalıplara göre çözmeye",
      "Kelimeleri rastgele karıştırmaya",
      "Ekrana hazır bir resim koymaya",
      "Cümleyi silip yeniden yazmamızı beklemeye"
    ],
    e: "Modern çeviri uygulamaları, çok sayıda çeviri örneğinden öğrendiği kalıplarla anlamı yakalamaya çalışır."
  },
  {
    q: "Yapay zekâ ve robot için hangisi doğrudur?",
    o: [
      "Yapay zekâ bir yazılımdır; robotsuz da, örneğin telefonda çalışabilir.",
      "Yapay zekâ olması için mutlaka insana benzeyen bir robot gerekir.",
      "Her robot kesinlikle yapay zekâ kullanır.",
      "Yapay zekâ yalnızca fabrikalarda bulunur."
    ],
    e: "Yapay zekâ bir robotun “beyni” olabilir ama telefon, uygulama ve web sitelerinde de çalışır. Her robot da yapay zekâ içermez."
  },
  {
    q: "Bir yapay zekâ sistemi yanlış sonuç verirse bunun en olası nedeni hangisidir?",
    o: [
      "Eksik, hatalı veya dengesiz verilerle öğrenmiş olması",
      "Bilgisayarın şarjının dolu olması",
      "Ekranın temiz olması",
      "Klavyedeki tuşların sayısı"
    ],
    e: "Yapay zekâ verilerden öğrenir; veri eksik ya da hatalıysa sonuçlar da hatalı olabilir."
  },
  {
    q: "Hangisi insanın yapay zekâdan hâlâ çok daha iyi yaptığı şeydir?",
    o: [
      "Arkadaşının üzüntüsünü gerçekten hissedip onu teselli etmek",
      "Yüz binlerce sayfayı birkaç saniyede taramak",
      "Milyonlarca işlemi aynı anda saymak",
      "Aynı görevi yorulmadan binlerce kez tekrar etmek"
    ],
    e: "Gerçek duygu, empati ve içten dostluk insana özgüdür. Yapay zekâ duyguları taklit edebilir ama hissetmez."
  },
  {
    q: "Hangisi yapay zekânın insana göre güçlü olduğu bir alandır?",
    o: [
      "Çok büyük veri yığınlarını kısa sürede taramak",
      "Bir şiiri yaşadığı anılarla yazmak",
      "Bir hayvana şefkat göstermek",
      "Gerçekten korkmak ve cesaret toplamak"
    ],
    e: "Yapay zekâ, büyük miktardaki veriyi çok hızlı işleyip kalıpları bulmada çok başarılıdır."
  },
  {
    q: "Bir yapay zekâ uygulamasına asla yazmamamız gereken bilgi hangisidir?",
    o: [
      "Şifremiz, açık adresimiz ve kimlik numaramız",
      "Sevdiğimiz renk",
      "Çözmek istediğimiz bir matematik sorusu",
      "Merak ettiğimiz bir hayvan"
    ],
    e: "Kişisel ve gizli bilgiler başkalarının eline geçebilir. Şifre, adres ve kimlik bilgisi paylaşılmaz."
  },
  {
    q: "Yapay zekâdan aldığın bilgiyi ödevinde kullanmadan önce ne yapmalısın?",
    o: [
      "Güvenilir kaynaklardan kontrol edip kendi cümlelerimle yazmalıyım.",
      "Olduğu gibi kopyalayıp yapıştırmalıyım.",
      "Yalnızca ilk cevabı kullanmalıyım.",
      "Hiç okumadan öğretmenime vermeliyim."
    ],
    e: "Yapay zekâ yanılabilir. Bilgiyi kontrol etmek ve kendi anlayışınla yazmak hem doğruluğu hem öğrenmeyi sağlar."
  },
  {
    q: "Sosyal medyada gerçek gibi görünen ama çok şaşırtıcı bir fotoğraf gördün. İlk ne yapmalısın?",
    o: [
      "Yapay zekâyla üretilmiş olabileceğini düşünüp kaynağını araştırmalıyım.",
      "Hemen herkese göndermeliyim.",
      "Gördüğüm her fotoğrafın gerçek olduğunu kabul etmeliyim.",
      "Altına kişisel bilgilerimi yazmalıyım."
    ],
    e: "Yapay zekâ gerçeğe çok benzeyen sahte görseller üretebilir. Paylaşmadan önce kaynağı doğrulamak gerekir."
  },
  {
    q: "Hangisi eğitimde yapay zekâ kullanımına örnektir?",
    o: [
      "Öğrencinin eksik konularını bulup ona uygun sorular öneren uygulama",
      "Sınıfın duvarındaki saat",
      "Sınıfın kapısındaki asma kilit",
      "Defterin kareli olması"
    ],
    e: "Öğrenme uygulamaları, öğrencinin cevaplarını inceleyerek ona özel çalışma önerileri hazırlayabilir."
  },
  {
    q: "Fotoğraf çekerken telefonun yüzleri bulup netlemesinde hangi teknoloji vardır?",
    o: [
      "Görüntü tanıma yapan yapay zekâ",
      "Metin dosyası sıkıştırma",
      "Sesli kitap okuma",
      "Ağ kablosu yönlendirme"
    ],
    e: "Yüz algılama, yapay zekânın görüntü tanıma becerisine güzel bir örnektir."
  },
  {
    q: "Yapay zekâ önyargılı verilerle eğitilirse ne olabilir?",
    o: [
      "Bazı kişilere karşı adil olmayan kararlar verebilir.",
      "Daha da adil kararlar verir.",
      "Hiç çalışmaz ve ekran kararır.",
      "Kendiliğinden insan olur."
    ],
    e: "Veri dengesiz ise sonuç da dengesiz olabilir. Bu yüzden önemli kararlarda insan denetimi şarttır."
  }
];

const LETTERS = ['A', 'B', 'C', 'D'];

function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

interface YapayZekaGameProps {
  onBackToHome?: () => void;
}

export const YapayZekaGame: React.FC<YapayZekaGameProps> = ({ onBackToHome }) => {
  const [screen, setScreen] = useState<'start' | 'quiz' | 'result'>('start');
  const [order, setOrder] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [locked, setLocked] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [missedIndices, setMissedIndices] = useState<number[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<{ text: string; isCorrect: boolean }[]>([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  const startQuiz = useCallback((questionsList: number[]) => {
    const newOrder = [...questionsList];
    setOrder(newOrder);
    setCurrentIndex(0);
    setScore(0);
    setResults([]);
    setLocked(false);
    setSelectedOptionIndex(null);
    setScreen('quiz');
  }, []);

  // Prepare options for the current question
  useEffect(() => {
    if (screen === 'quiz' && order.length > 0 && currentIndex < order.length) {
      const qIndex = order[currentIndex];
      const qData = QUESTION_BANK[qIndex];
      // In QUESTION_BANK, option at index 0 is always the correct one
      const rawOpts = qData.o.map((opt, i) => ({
        text: opt,
        isCorrect: i === 0
      }));
      setShuffledOptions(shuffleArray(rawOpts));
      setLocked(false);
      setSelectedOptionIndex(null);
    }
  }, [screen, order, currentIndex]);

  const handleChoose = (idx: number) => {
    if (locked) return;
    setLocked(true);
    setSelectedOptionIndex(idx);

    const isOk = shuffledOptions[idx].isCorrect;
    const currentQuestionBankIndex = order[currentIndex];

    if (isOk) {
      setScore(prev => prev + 1);
      setMissedIndices(prev => prev.filter(q => q !== currentQuestionBankIndex));
    } else {
      setMissedIndices(prev => (prev.includes(currentQuestionBankIndex) ? prev : [...prev, currentQuestionBankIndex]));
    }

    setResults(prev => {
      const copy = [...prev];
      copy[currentIndex] = isOk;
      return copy;
    });
  };

  const handleNext = () => {
    if (!locked) return;
    if (currentIndex < order.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setScreen('result');
    }
  };

  // Keyboard shortcut listener for (A, B, C, D, 1, 2, 3, 4, Enter, Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (screen !== 'quiz') return;
      const key = e.key.toUpperCase();
      const numKey = parseInt(e.key, 10);

      if (!locked) {
        let optIndex = -1;
        if (key === 'A') optIndex = 0;
        else if (key === 'B') optIndex = 1;
        else if (key === 'C') optIndex = 2;
        else if (key === 'D') optIndex = 3;
        else if (numKey >= 1 && numKey <= 4) optIndex = numKey - 1;

        if (optIndex >= 0 && optIndex < shuffledOptions.length) {
          handleChoose(optIndex);
        }
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen, locked, shuffledOptions, currentIndex, order.length]);

  const currentQIndex = order[currentIndex];
  const currentQData = QUESTION_BANK[currentQIndex];

  // Evaluation summary for results screen
  const resultStats = useMemo(() => {
    const total = order.length;
    const pct = total > 0 ? score / total : 0;
    let title = '';
    let description = '';

    if (pct === 1) {
      title = 'Harika, hepsi doğru! 🎉';
      description = 'Yapay zekâ konusunda tam bir uzmansın. Şimdi bu bilgileri arkadaşlarına ve ailene de anlatabilirsin.';
    } else if (pct >= 0.75) {
      title = 'Çok iyi gidiyorsun! 🌟';
      description = 'Yapay zekânın temel kavramlarını büyük ölçüde kavramışsın. Kaçırdığın soruların açıklamalarına bir daha göz at.';
    } else if (pct >= 0.5) {
      title = 'İyi bir başlangıç! 👍';
      description = 'Bazı kavramları pekiştirmek çok faydalı olacaktır. Yanlışlarını tekrar çözerek eksiklerini tamamlayabilirsin.';
    } else {
      title = 'Bir tur daha deneyelim! 💪';
      description = 'Yapay zekâ yeni ve heyecan verici bir konu. Tekrar ettikçe çok daha kolay gelecektir. Açıklamaları okuyarak yeniden dene.';
    }

    return { title, description, pct, total };
  }, [score, order.length]);

  return (
    <div className="w-full bg-[#dcebf8] rounded-3xl p-3 sm:p-6 text-[#12305a] font-sans shadow-lg border-2 border-blue-200">
      
      {/* 1. Üst Bar: Ders, Sınıf ve Kazanım Bilgisi */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#12305a] text-white rounded-2xl shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-2xs">
            <Bot className="w-full h-full text-blue-600" />
          </div>
          <div>
            <div className="font-bold text-sm sm:text-base tracking-wide flex items-center gap-2">
              <span>Bilişim Teknolojileri ve Yazılım</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/40 text-blue-200 font-extrabold uppercase">
                5. Sınıf &bull; 4. Hafta
              </span>
            </div>
            <div className="text-xs text-blue-200/90 font-medium">
              Hilal KURTOĞLU &bull; Eğitsel Oyun
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
          <div className="text-right text-xs bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 text-white">
            <span className="font-extrabold text-amber-300">Kazanım: BTY.5.1.4</span>
            <div className="text-[10px] text-white/80">Yapay zekâ kavramlarını sorgulama</div>
          </div>

          <a
            href="/oyun-4-hafta-yapay-zeka.html"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition text-xs font-bold flex items-center gap-1"
            title="Ayrı Sayfada Aç"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="p-2 rounded-xl bg-rose-500/80 hover:bg-rose-500 text-white transition text-xs font-bold flex items-center gap-1"
              title="Kapat"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      {/* 2. Ana Oyun Alanı Paneli */}
      <main className="mt-5 max-w-4xl mx-auto">

        {/* EKRAN 1: BAŞLANGIÇ EKRANI */}
        {screen === 'start' && (
          <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border-b-8 border-[#4a8cc8] space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              <div className="md:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-extrabold border border-blue-200">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                  <span>4. Hafta İnteraktif Ders Oyunu</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-[#12305a] leading-tight">
                  Yapay zekâyı ne kadar tanıyorsun?
                </h1>

                <p className="text-sm sm:text-base text-[#3d5a80] leading-relaxed">
                  Yapay zekânın ne olduğunu, nerelerde kullanıldığını ve onu güvenle nasıl kullanacağımızı <strong>16 soruda</strong> sına. Her cevaptan sonra öğretmen açıklaması ve ipuçları seni bekliyor!
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="bg-[#e6f0fa] text-[#2b6aa8] text-xs font-bold px-3 py-1.5 rounded-full">
                    ✅ 16 Soru
                  </span>
                  <span className="bg-[#e6f0fa] text-[#2b6aa8] text-xs font-bold px-3 py-1.5 rounded-full">
                    🎯 4 Seçenek
                  </span>
                  <span className="bg-[#e6f0fa] text-[#2b6aa8] text-xs font-bold px-3 py-1.5 rounded-full">
                    💡 Anında Öğretmen Açıklaması
                  </span>
                  <span className="bg-[#e6f0fa] text-[#2b6aa8] text-xs font-bold px-3 py-1.5 rounded-full">
                    ⌨️ Klavye &amp; Akıllı Tahta Uyumlu
                  </span>
                </div>

                <div className="pt-3 flex items-center gap-3">
                  <button
                    onClick={() => {
                      setMissedIndices([]);
                      startQuiz(shuffleArray(QUESTION_BANK.map((_, i) => i)));
                    }}
                    className="px-6 sm:px-8 py-3.5 rounded-2xl bg-[#c8500a] hover:bg-[#b94709] active:translate-y-1 text-white font-black text-base sm:text-lg shadow-[0_6px_0_#8f3704] active:shadow-[0_1px_0_#8f3704] transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Brain className="w-5 h-5" />
                    <span>Teste Başla</span>
                  </button>

                  <a
                    href="/oyun-4-hafta-yapay-zeka.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs sm:text-sm border border-blue-200 transition flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-4 h-4 text-blue-600" />
                    <span>Tam Ekran / Yeni Sekme</span>
                  </a>
                </div>
              </div>

              {/* 16 Köşeli Büyük Yıldız Logo Rozeti */}
              <div className="md:col-span-4 flex items-center justify-center">
                <div
                  className="w-48 h-48 sm:w-56 sm:h-56 bg-[#4a8cc8] flex items-center justify-center relative shadow-lg"
                  style={{
                    clipPath: 'polygon(50% 0%, 61% 18%, 82% 18%, 82% 39%, 100% 50%, 82% 61%, 82% 82%, 61% 82%, 50% 100%, 39% 82%, 18% 82%, 18% 61%, 0% 50%, 18% 39%, 18% 18%, 39% 18%)'
                  }}
                >
                  <div
                    className="absolute inset-[12%] bg-white flex items-center justify-center shadow-inner"
                    style={{
                      clipPath: 'polygon(50% 0%, 61% 18%, 82% 18%, 82% 39%, 100% 50%, 82% 61%, 82% 82%, 61% 82%, 50% 100%, 39% 82%, 18% 82%, 18% 61%, 0% 50%, 18% 39%, 18% 18%, 39% 18%)'
                    }}
                  >
                    <span className="font-black text-4xl sm:text-6xl text-[#c8500a] tracking-tight">
                      YZ
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* EKRAN 2: SORU VE ŞIKLAR ALANI */}
        {screen === 'quiz' && currentQData && (
          <section className="bg-white rounded-3xl p-5 sm:p-8 shadow-md border-b-8 border-[#4a8cc8] space-y-5 animate-fadeIn">
            
            {/* 16 Dilimli İlerleme Çubuğu (Meter) */}
            <div className="flex gap-1.5">
              {order.map((_, i) => {
                let barClass = 'bg-[#cfe0f1]';
                if (i < currentIndex) {
                  barClass = results[i] ? 'bg-[#1b7f52]' : 'bg-[#b5301f]';
                } else if (i === currentIndex) {
                  barClass = 'bg-[#c8500a] animate-pulse';
                }
                return (
                  <i
                    key={i}
                    className={`flex-1 h-2.5 sm:h-3 rounded-full transition-all duration-200 ${barClass}`}
                  />
                );
              })}
            </div>

            {/* Soru Sayacı ve Skor */}
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#3d5a80]">
              <span className="bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
                Soru {currentIndex + 1} / {order.length}
              </span>
              <span className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-xl border border-emerald-200">
                ⭐ Doğru: {score}
              </span>
            </div>

            {/* Soru Metni */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#12305a] leading-snug pt-1">
              {currentQData.q}
            </h2>

            {/* 4 Şık (A, B, C, D) */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {shuffledOptions.map((opt, optIdx) => {
                let optStyle = 'bg-[#e6f0fa] hover:bg-[#d2e5f7] border-transparent shadow-[0_5px_0_#aac7e4] text-[#12305a]';
                let badgeStyle = 'bg-[#2b6aa8] text-white';
                let markIcon = '';

                if (locked) {
                  if (opt.isCorrect) {
                    optStyle = 'bg-[#e1f5ea] border-[#1b7f52] shadow-[0_5px_0_#9fd4b8] text-emerald-950 font-bold';
                    badgeStyle = 'bg-[#1b7f52] text-white';
                    markIcon = '✓';
                  } else if (selectedOptionIndex === optIdx) {
                    optStyle = 'bg-[#fbe7e3] border-[#b5301f] shadow-[0_5px_0_#eab3aa] text-rose-950 font-bold';
                    badgeStyle = 'bg-[#b5301f] text-white';
                    markIcon = '✗';
                  } else {
                    optStyle = 'opacity-50 bg-[#e6f0fa] border-transparent shadow-none text-slate-500';
                  }
                }

                return (
                  <li key={optIdx}>
                    <button
                      type="button"
                      disabled={locked}
                      onClick={() => handleChoose(optIdx)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border-3 flex items-center gap-3.5 transition-all text-sm sm:text-base font-bold min-h-[4.8em] cursor-pointer ${optStyle}`}
                    >
                      {/* Yıldız Şekilli Rozet Harfi (A, B, C, D) */}
                      <span
                        className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center font-black text-xs sm:text-sm shrink-0 shadow-2xs ${badgeStyle}`}
                        style={{
                          clipPath: 'polygon(50% 0%, 61% 18%, 82% 18%, 82% 39%, 100% 50%, 82% 61%, 82% 82%, 61% 82%, 50% 100%, 39% 82%, 18% 82%, 18% 61%, 0% 50%, 18% 39%, 18% 18%, 39% 18%)'
                        }}
                      >
                        {LETTERS[optIdx]}
                      </span>

                      <span className="flex-1 leading-snug">
                        {opt.text}
                      </span>

                      {markIcon && (
                        <span className="text-xl font-black shrink-0 px-1">
                          {markIcon}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Anında Dönüt ve Açıklama Kutusu */}
            {locked && (
              <div
                className={`p-4 sm:p-5 rounded-2xl border-l-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 animate-fadeIn ${
                  results[currentIndex]
                    ? 'bg-[#e1f5ea] border-[#1b7f52] text-[#1b7f52]'
                    : 'bg-[#fbe7e3] border-[#b5301f] text-[#b5301f]'
                }`}
              >
                <div className="space-y-1">
                  <div className="font-black text-base sm:text-lg flex items-center gap-2">
                    {results[currentIndex] ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Tebrikler, Doğru Cevap!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-600" />
                        <span>Bu sefer olmadı.</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                    <strong>💡 Açıklama:</strong> {currentQData.e}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl bg-[#c8500a] hover:bg-[#b94709] active:translate-y-1 text-white font-black text-sm sm:text-base shrink-0 shadow-[0_5px_0_#8f3704] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{currentIndex === order.length - 1 ? 'Sonucu Gör' : 'Sonraki Soru'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Klavye İpucu */}
            <div className="pt-2 text-center text-[11px] text-slate-400 font-medium">
              💡 İpucu: Şıkları klavyeden <kbd className="px-1.5 py-0.5 bg-slate-100 border rounded font-mono">A, B, C, D</kbd> ya da <kbd className="px-1.5 py-0.5 bg-slate-100 border rounded font-mono">1, 2, 3, 4</kbd> tuşlarıyla seçebilir; <kbd className="px-1.5 py-0.5 bg-slate-100 border rounded font-mono">Enter</kbd> ile sonraki soruya geçebilirsiniz.
            </div>

          </section>
        )}

        {/* EKRAN 3: SONUÇ VE SKOR DEĞERLENDİRME */}
        {screen === 'result' && (
          <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border-b-8 border-[#4a8cc8] space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Sonuç Yıldızı */}
              <div className="md:col-span-4 flex items-center justify-center">
                <div
                  className="w-48 h-48 sm:w-56 sm:h-56 bg-[#c8500a] flex items-center justify-center relative shadow-xl"
                  style={{
                    clipPath: 'polygon(50% 0%, 61% 18%, 82% 18%, 82% 39%, 100% 50%, 82% 61%, 82% 82%, 61% 82%, 50% 100%, 39% 82%, 18% 82%, 18% 61%, 0% 50%, 18% 39%, 18% 18%, 39% 18%)'
                  }}
                >
                  <div
                    className="absolute inset-[11%] bg-white flex flex-col items-center justify-center text-center p-2"
                    style={{
                      clipPath: 'polygon(50% 0%, 61% 18%, 82% 18%, 82% 39%, 100% 50%, 82% 61%, 82% 82%, 61% 82%, 50% 100%, 39% 82%, 18% 82%, 18% 61%, 0% 50%, 18% 39%, 18% 18%, 39% 18%)'
                    }}
                  >
                    <b className="font-black text-3xl sm:text-4xl text-[#12305a] leading-none">
                      {score} / {order.length}
                    </b>
                    <small className="text-xs font-extrabold text-[#3d5a80] mt-1 uppercase tracking-wider">
                      Doğru Cevap
                    </small>
                  </div>
                </div>
              </div>

              {/* Değerlendirme Mesajı ve Eylemler */}
              <div className="md:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-black border border-amber-200">
                  <Trophy className="w-4 h-4 text-amber-600" />
                  <span>Test Tamamlandı &bull; Başarı Oranı: %{Math.round(resultStats.pct * 100)}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-[#12305a] leading-tight">
                  {resultStats.title}
                </h2>

                <p className="text-sm sm:text-base text-[#3d5a80] leading-relaxed">
                  {resultStats.description}
                </p>

                {/* Kaçırılan Soruların Doğru Cevapları İnceleme Listesi */}
                {missedIndices.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Yanlış Yapılan Sorular ve Doğru Cevapları ({missedIndices.length}):</span>
                    </h4>
                    <ul className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {missedIndices.map((qIdx) => (
                        <li
                          key={qIdx}
                          className="bg-[#fbe7e3] border-l-4 border-[#b5301f] p-2.5 rounded-xl text-xs text-slate-800 space-y-0.5"
                        >
                          <div className="font-bold text-[#b5301f]">
                            {QUESTION_BANK[qIdx].q}
                          </div>
                          <div className="text-emerald-900 font-semibold">
                            ✓ Doğru Cevap: {QUESTION_BANK[qIdx].o[0]}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Butonlar */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      setMissedIndices([]);
                      startQuiz(shuffleArray(QUESTION_BANK.map((_, i) => i)));
                    }}
                    className="px-5 py-3 rounded-xl bg-[#c8500a] hover:bg-[#b94709] active:translate-y-1 text-white font-black text-sm shadow-[0_5px_0_#8f3704] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Baştan Başla (Tüm Sorular)</span>
                  </button>

                  {missedIndices.length > 0 && (
                    <button
                      onClick={() => {
                        const wrongSubset = [...missedIndices];
                        startQuiz(shuffleArray(wrongSubset));
                      }}
                      className="px-5 py-3 rounded-xl bg-[#e6f0fa] hover:bg-[#d6e7f7] active:translate-y-1 text-[#12305a] font-black text-sm shadow-[0_5px_0_#aac7e4] transition-all flex items-center gap-2 cursor-pointer border border-[#aac7e4]"
                    >
                      <span>Sadece Yanlışlarımı Çöz ({missedIndices.length})</span>
                    </button>
                  )}
                </div>

              </div>

            </div>
          </section>
        )}

      </main>

      {/* 3. İmza Altbilgisi */}
      <footer className="mt-5 pt-3 border-t border-blue-200/60 flex justify-end">
        <div className="text-center bg-white rounded-2xl px-5 py-2 shadow-xs border-b-4 border-[#4a8cc8]">
          <div className="font-extrabold text-sm text-[#12305a]">
            Hilal KURTOĞLU
          </div>
          <div className="text-[10px] font-bold text-[#3d5a80] uppercase tracking-wider">
            BİLGİSAYAR VE ÖĞRETİM TEKNOLOJİLERİ ÖĞRETMENİ
          </div>
        </div>
      </footer>

    </div>
  );
};
