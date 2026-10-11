import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Trophy, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Bot, 
  Lightbulb, 
  ExternalLink, 
  Download, 
  Compass, 
  Star, 
  Check, 
  X, 
  ShieldCheck, 
  Cpu, 
  BookOpen, 
  UserCheck, 
  HelpCircle,
  Award
} from 'lucide-react';

/* =========================================================
   TİPLER VE VERİ MODELLERİ
   ========================================================= */

interface StationSingleItem {
  t?: string; // Görev 1 & 2 soru cümlesi
  q?: string; // Görev 5 soru cümlesi
  a?: string; // Doğru anahtar ('yz' | 'no' | 'in' | 'both')
  o?: string[]; // Görev 5 seçenekleri (ilk seçenek doğru)
  e: string;  // Eğitsel dönüt açıklaması
}

interface StationPairItem {
  l: string;  // Sol etiket (Alan veya Bilim İnsanı)
  r: string;  // Sağ etiket (Örnek veya Katkı)
  e: string;  // Eğitsel dönüt açıklaması
}

interface StationDef {
  id: number;
  cls: string;
  badgeColor: string;
  bgGradient: string;
  borderColor: string;
  title: string;
  sub: string;
  icon: string;
  type: 'single' | 'match';
  mc?: boolean;
  choices?: { k: string; label: string; icon?: string }[];
  intro: string[];
  items?: StationSingleItem[];
  pairs?: StationPairItem[];
}

const CLASSIFY_YZ = [
  { k: 'yz', label: 'Yapay Zekâ', icon: '🤖' },
  { k: 'no', label: 'Yapay Zekâ Değil', icon: '⚙️' }
];

const CLASSIFY_IN = [
  { k: 'in', label: 'İnsan Zekâsı', icon: '🧠' },
  { k: 'yz', label: 'Yapay Zekâ', icon: '🤖' },
  { k: 'both', label: 'İkisi de', icon: '🤝' }
];

const STATIONS: StationDef[] = [
  {
    id: 1,
    cls: 'c1',
    badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
    bgGradient: 'from-sky-500/10 via-blue-500/5 to-cyan-500/10',
    borderColor: 'border-sky-400',
    title: 'Yapay Zekâ mı, Değil mi?',
    sub: 'Örnekleri doğru gruba ayır',
    icon: '⚡',
    type: 'single',
    choices: CLASSIFY_YZ,
    intro: [
      'Yapay zekâ, bilgisayarların ve makinelerin bazı görevleri insanlara benzer şekilde yapabilmesini sağlayan teknolojidir.',
      'Yapay zekâ verileri inceler, öğrenebilir, karar verebilir ve öneriler sunabilir.',
      'Sadece düğmeyle açılıp kapanan sıradan aletler öğrenmez ve karar vermez.'
    ],
    items: [
      { t: 'Telefonun yüzünü tanıyıp kilidi açması', a: 'yz', e: 'Yüz tanıma sistemleri, yüzü tanımayı öğrenmiş yapay zekâ ile çalışır.' },
      { t: 'Sesli asistanın sorunu duyup sesli cevap vermesi', a: 'yz', e: 'Sesli asistanlar konuşmayı anlayıp cevap üretmek için yapay zekâ kullanır.' },
      { t: 'Düğmeye basınca yanan sıradan lamba', a: 'no', e: 'Lamba sadece devreyi açıp kapatır. Öğrenmez, karar vermez.' },
      { t: 'İzlediklerine bakarak yeni video öneren uygulama', a: 'yz', e: 'Öneri sistemleri, senin izlediklerinden öğrenerek yeni öneriler sunar.' },
      { t: 'Kurularak çalışan mekanik çalar saat', a: 'no', e: 'Mekanik saat hep aynı şekilde çalışır. Veriden öğrenmez.' },
      { t: 'Engellere çarpmadan evi temizleyen robot süpürge', a: 'yz', e: 'Robot süpürge çevresini algılar ve nereye gideceğine kendisi karar verir.' },
      { t: 'Sadece sayıları toplayan basit hesap makinesi', a: 'no', e: 'Basit hesap makinesi sadece verilen işlemi yapar; öğrenmez ve karar vermez.' },
      { t: 'Trafiği bilip seni en kısa yola yönlendiren harita uygulaması', a: 'yz', e: 'Navigasyon uygulamaları trafik verilerini inceleyerek en iyi yolu önerir.' }
    ]
  },
  {
    id: 2,
    cls: 'c2',
    badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
    bgGradient: 'from-teal-500/10 via-emerald-500/5 to-cyan-500/10',
    borderColor: 'border-teal-400',
    title: 'İnsan mı, Yapay Zekâ mı?',
    sub: 'Özelliğin sahibini bul',
    icon: '🧠',
    type: 'single',
    choices: CLASSIFY_IN,
    intro: [
      'İnsan zekâsı ve yapay zekâ ikisi de öğrenebilir, karar verebilir ve sorun çözebilir.',
      'Duygular, hayal gücü ve yüksek yaratıcılık insana özgüdür.',
      'Çok hızlı hesap yapmak yapay zekânın güçlü yanıdır.'
    ],
    items: [
      { t: 'Hayal kurar.', a: 'in', e: 'Hayal gücü insana aittir. Yapay zekâ hayal kuramaz.' },
      { t: 'Çok hızlı hesap yapar.', a: 'yz', e: 'Yapay zekâ çok hızlı hesap yapar. İnsanlar daha yavaştır ama yaratıcıdır.' },
      { t: 'Öğrenebilir.', a: 'both', e: 'İnsan deneyimle, yapay zekâ verilerle öğrenir. İkisi de öğrenebilir!' },
      { t: 'Sevinir, üzülür; duyguları vardır.', a: 'in', e: 'Duygular insana özgüdür. Yapay zekânın duyguları yoktur.' },
      { t: 'Karar verebilir.', a: 'both', e: 'İnsan duygu ve bilgiyle, yapay zekâ bilgiyle karar verir. İkisi de karar verebilir.' },
      { t: 'Çok sayıda veriyi inceleyerek öğrenir.', a: 'yz', e: 'Yapay zekâ verilerle öğrenir. Ne kadar çok veri incelerse o kadar gelişir.' },
      { t: 'Hata yapabilir.', a: 'both', e: 'Hem insanlar hem de yapay zekâ hata yapabilir. Bu yüzden kontrol etmek önemlidir.' },
      { t: 'Yaratıcılığı çok yüksektir.', a: 'in', e: 'İnsanın yaratıcılığı yüksektir. Yapay zekânın yaratıcılığı sınırlıdır.' }
    ]
  },
  {
    id: 3,
    cls: 'c3',
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    bgGradient: 'from-indigo-500/10 via-purple-500/5 to-blue-500/10',
    borderColor: 'border-indigo-400',
    title: 'Yapay Zekâ Nerede?',
    sub: 'Alanı örneğiyle eşleştir',
    icon: '🗺️',
    type: 'match',
    intro: [
      'Yapay zekâ günlük hayatta pek çok yerde bize yardım eder.',
      'Tarım, eğitim, sağlık, ulaşım, eğlence ve güvenlik bunlardan bazılarıdır.',
      'Soldaki alana uyan örneği sağdan bul. Önce birine, sonra eşine dokun!'
    ],
    pairs: [
      { l: 'Tarım', r: 'Ürün verimini artıran izleme sistemleri', e: 'Tarımda yapay zekâ, ürün veriminin artmasına yardımcı olur.' },
      { l: 'Eğitim', r: 'Öğrencinin hızına göre çalışan uygulamalar', e: 'Eğitimde yapay zekâ, öğrencinin hızına göre çalışan uygulamalarda kullanılır.' },
      { l: 'Sağlık', r: 'Hastalıkları erken fark etmeye yardım eden sistemler', e: 'Sağlıkta yapay zekâ, hastalıkların erken fark edilmesine yardımcı olur.' },
      { l: 'Ulaşım', r: 'Yolu algılayarak giden sürücüsüz araçlar', e: 'Ulaşımda yapay zekâ, yolu algılayarak ilerleyen sürücüsüz araçlarda kullanılır.' },
      { l: 'Eğlence', r: 'Film ve video öneren sistemler', e: 'Eğlencede yapay zekâ, film ve video önerir.' },
      { l: 'Güvenlik', r: 'Kişiyi yüzünden tanıyan sistemler', e: 'Güvenlikte yapay zekâ, kişiyi yüzünden tanıyan sistemlerde kullanılır.' }
    ]
  },
  {
    id: 4,
    cls: 'c4',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    bgGradient: 'from-emerald-500/10 via-teal-500/5 to-green-500/10',
    borderColor: 'border-emerald-400',
    title: 'Yapay Zekânın Öncüleri',
    sub: 'Bilim insanını işiyle eşleştir',
    icon: '🚀',
    type: 'match',
    intro: [
      'Yapay zekâ fikri bir anda ortaya çıkmadı. Birçok bilim insanı katkı verdi.',
      'John McCarthy 1956’da “Yapay Zekâ” terimini kullandı ve yapay zekânın babası olarak bilinir.',
      'Cahit Arf, makine düşünmesi üzerine çalışmalar yapan Türk matematikçidir.'
    ],
    pairs: [
      { l: 'Ada Lovelace', r: 'İlk bilgisayar programcısı', e: 'Ada Lovelace, tarihteki ilk bilgisayar programcısı olarak kabul edilir.' },
      { l: 'Alan Turing', r: 'Turing Testi', e: 'Alan Turing “Makineler düşünebilir mi?” sorusunu ortaya attı ve Turing Testi ile tanınır.' },
      { l: 'John McCarthy', r: '“Yapay Zekâ” terimini kullandı', e: 'McCarthy, 1956’daki Dartmouth Konferansı’nda “Yapay Zekâ” terimini kullandı.' },
      { l: 'Marvin Minsky', r: 'Yapay zekâ laboratuvarı çalışmaları', e: 'Marvin Minsky, yapay zekâ laboratuvarı çalışmalarına ve sinir ağlarına öncülük etti.' },
      { l: 'Cahit Arf', r: 'Makine düşünmesini inceleyen Türk matematikçi', e: 'Cahit Arf, makinelerin düşünmesi üzerine ilk çalışmaları yapan dünyaca ünlü Türk matematikçidir.' }
    ]
  },
  {
    id: 5,
    cls: 'c5',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    bgGradient: 'from-amber-500/10 via-orange-500/5 to-yellow-500/10',
    borderColor: 'border-amber-400',
    title: 'Kaptan Sensin!',
    sub: 'Yapay zekâyı güvenli ve bilinçli kullan',
    icon: '🧭',
    type: 'single',
    mc: true,
    intro: [
      'Yapay zekâ güçlü bir araçtır ama hata yapabilir.',
      'Kişisel bilgilerimizi korumalı, aldığımız bilgileri kontrol etmeliyiz.',
      'Sürücü koltuğunda her zaman insan olmalı!'
    ],
    items: [
      {
        q: 'Bir yapay zekâ uygulamasına hangi bilgiyi asla yazmamalısın?',
        o: ['Şifremi ve ev adresimi', 'Matematikte çözemediğim bir soruyu', 'Merak ettiğim bir hayvanın adını'],
        e: 'Şifre, adres gibi kişisel bilgiler paylaşılmaz. Bilgilerimizin güvenliği çok önemlidir.'
      },
      {
        q: 'Yapay zekâ sana bir bilgi verdi ama doğru olduğundan emin değilsin. Ne yapmalısın?',
        o: ['Güvenilir kaynaklardan kontrol ederim', 'Hiç bakmadan ödevime yazarım', 'Herkese doğru diye anlatırım'],
        e: 'Yapay zekâ hata yapabilir. Doğru bilgi kullanmak için daima güvenilir kaynaklardan kontrol etmeliyiz.'
      },
      {
        q: 'Yapay zekâ hata yapabilir mi?',
        o: ['Evet, bazen yanlış sonuçlar üretebilir', 'Hayır, hiçbir zaman hata yapmaz', 'Sadece şarjı bitince hata yapar'],
        e: 'Yapay zekâ bazen hatalı veya taraflı sonuç üretebilir. Bu yüzden her zaman düşünerek kullanmalıyız.'
      },
      {
        q: 'Ödevini tamamen yapay zekâya yaptırırsan ne olur?',
        o: ['Kendim düşünmeyi ve öğrenmeyi azaltırım', 'Daha çok öğrenirim', 'Hiçbir şey değişmez'],
        e: 'Buna “tembellik tuzağı” denir. Yapay zekâ bir yardımcıdır; düşünen ve asıl öğrenen sensin.'
      },
      {
        q: 'Yapay zekâ doktorlara hastalığı anlamada yardım ediyor. Son kararı kim vermeli?',
        o: ['Uzman doktor ve dikkatli insanlar', 'Sadece yapay zekâ programı', 'Hiç kimse'],
        e: 'Yapay zekâ öneri sunar ve yardım eder ama son karar ve sorumluluk daima insandadır.'
      },
      {
        q: 'Geleceğin kaptanı olmak için en önemli şey nedir?',
        o: ['Yapay zekâyı bilinçli ve kontrollü kullanmayı öğrenmek', 'Yapay zekâdan korkup hiç kullanmamak', 'Her dediğine körü körüne inanmak'],
        e: 'Kontrol bizim elimizde! Yapay zekâyı iyi, etik ve güvenli kullanan insanlar geleceği şekillendirir.'
      }
    ]
  }
];

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface YapayZekaKasifleriGameProps {
  onBackToHome?: () => void;
}

export const YapayZekaKasifleriGame: React.FC<YapayZekaKasifleriGameProps> = ({ onBackToHome }) => {
  // Oyun içi ekran durumu
  const [currentView, setCurrentView] = useState<'map' | 'intro' | 'play' | 'result'>('map');
  const [activeStationIndex, setActiveStationIndex] = useState<number>(0);

  // Görev başarıları (5 istasyon)
  const [stationStats, setStationStats] = useState<{ stars: number; pts: number }[]>([
    { stars: 0, pts: 0 },
    { stars: 0, pts: 0 },
    { stars: 0, pts: 0 },
    { stars: 0, pts: 0 },
    { stars: 0, pts: 0 }
  ]);

  // Tek cevaplı soru istasyon durumu (Görev 1, 2, 5)
  const [singleOrder, setSingleOrder] = useState<number[]>([]);
  const [singleStepIndex, setSingleStepIndex] = useState<number>(0);
  const [singleCorrectCount, setSingleCorrectCount] = useState<number>(0);
  const [singleMarks, setSingleMarks] = useState<('ok' | 'bad')[]>([]);
  const [singlePickedIndex, setSinglePickedIndex] = useState<number | null>(null);
  const [singleOptions, setSingleOptions] = useState<{ label: string; ok: boolean; icon?: string }[]>([]);
  const [singleFeedback, setSingleFeedback] = useState<{ isOk: boolean; explanation: string } | null>(null);

  // Eşleştirme istasyon durumu (Görev 3, 4)
  const [matchLeftOrder, setMatchLeftOrder] = useState<number[]>([]);
  const [matchRightOrder, setMatchRightOrder] = useState<number[]>([]);
  const [matchSelected, setMatchSelected] = useState<{ side: 'left' | 'right'; idx: number } | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [matchWrongPair, setMatchWrongPair] = useState<{ leftIdx: number; rightIdx: number } | null>(null);
  const [matchWrongCount, setMatchWrongCount] = useState<number>(0);
  const [matchInfo, setMatchInfo] = useState<{ text: string; isSuccess?: boolean } | null>(null);

  // Sonuç ekranı bilgileri
  const [lastResult, setLastResult] = useState<{
    stationId: number;
    title: string;
    good: number;
    total: number;
    pts: number;
    stars: number;
  } | null>(null);

  // Toplam puan
  const totalScore = useMemo(() => {
    return stationStats.reduce((sum, s) => sum + s.pts, 0);
  }, [stationStats]);

  const allCompleted = useMemo(() => {
    return stationStats.every(s => s.stars > 0);
  }, [stationStats]);

  // =========================================================
  // GÖREV BAŞLATMA
  // =========================================================

  const handleOpenIntro = (index: number) => {
    setActiveStationIndex(index);
    setCurrentView('intro');
  };

  const handleStartPlaying = () => {
    const station = STATIONS[activeStationIndex];
    if (station.type === 'single') {
      const itemsCount = station.items?.length || 0;
      const order = shuffle(Array.from({ length: itemsCount }, (_, i) => i));
      setSingleOrder(order);
      setSingleStepIndex(0);
      setSingleCorrectCount(0);
      setSingleMarks([]);
      setSinglePickedIndex(null);
      setSingleFeedback(null);

      // İlk soruyu hazırla
      prepareSingleQuestion(0, order, station);
      setCurrentView('play');
    } else {
      // Eşleştirme oyunu
      const pairsCount = station.pairs?.length || 0;
      setMatchLeftOrder(shuffle(Array.from({ length: pairsCount }, (_, i) => i)));
      setMatchRightOrder(shuffle(Array.from({ length: pairsCount }, (_, i) => i)));
      setMatchSelected(null);
      setMatchedPairs([]);
      setMatchWrongPair(null);
      setMatchWrongCount(0);
      setMatchInfo({ text: 'Eşleştirmeye başla! Önce bir kutuya, sonra onun eşine dokun.' });
      setCurrentView('play');
    }
  };

  // Tek cevaplı soru oluşturucu
  const prepareSingleQuestion = (step: number, order: number[], station: StationDef) => {
    const itemIndex = order[step];
    const item = station.items![itemIndex];

    let opts: { label: string; ok: boolean; icon?: string }[] = [];
    if (station.mc && item.o) {
      // Çoktan seçmeli: ilk seçenek doğru, karıştır
      const raw = item.o.map((txt, idx) => ({ label: txt, ok: idx === 0 }));
      opts = shuffle(raw);
    } else if (station.choices) {
      opts = station.choices.map(c => ({
        label: c.label,
        ok: c.k === item.a,
        icon: c.icon
      }));
    }

    setSingleOptions(opts);
    setSinglePickedIndex(null);
    setSingleFeedback(null);
  };

  // Tek cevaplı soru seçimi
  const handleSinglePick = (chosenIndex: number) => {
    if (singlePickedIndex !== null) return; // Zaten cevaplandı

    const station = STATIONS[activeStationIndex];
    const itemIndex = singleOrder[singleStepIndex];
    const item = station.items![itemIndex];
    const chosen = singleOptions[chosenIndex];

    setSinglePickedIndex(chosenIndex);

    const isOk = chosen.ok;
    const newCorrect = isOk ? singleCorrectCount + 1 : singleCorrectCount;
    setSingleCorrectCount(newCorrect);

    const updatedMarks: ('ok' | 'bad')[] = [...singleMarks, isOk ? 'ok' : 'bad'];
    setSingleMarks(updatedMarks);

    setSingleFeedback({
      isOk,
      explanation: item.e
    });
  };

  // Tek cevaplı sonraki soruya geçiş
  const handleNextSingleQuestion = () => {
    const station = STATIONS[activeStationIndex];
    const total = singleOrder.length;
    const nextStep = singleStepIndex + 1;

    if (nextStep >= total) {
      // İstasyon bitti
      finishStation(activeStationIndex, singleCorrectCount, total);
    } else {
      setSingleStepIndex(nextStep);
      prepareSingleQuestion(nextStep, singleOrder, station);
    }
  };

  // =========================================================
  // EŞLEŞTİRME OYUNU MANTIĞI
  // =========================================================

  const handleTileClick = (side: 'left' | 'right', pairIndex: number) => {
    // Eşleşmişse işlem yapma
    if (matchedPairs.includes(pairIndex)) return;

    const station = STATIONS[activeStationIndex];
    const totalPairs = station.pairs?.length || 0;

    // Henüz seçim yoksa
    if (!matchSelected) {
      setMatchSelected({ side, idx: pairIndex });
      return;
    }

    // Aynı tarafa tekrar tıklandıysa seçimi güncelle
    if (matchSelected.side === side) {
      setMatchSelected({ side, idx: pairIndex });
      return;
    }

    // Farklı taraflara tıklandı -> Kontrol et
    const firstSide = matchSelected.side;
    const firstIdx = matchSelected.idx;
    const secondIdx = pairIndex;

    const leftIdx = firstSide === 'left' ? firstIdx : secondIdx;
    const rightIdx = firstSide === 'right' ? firstIdx : secondIdx;

    setMatchSelected(null);

    if (leftIdx === rightIdx) {
      // Doğru Eşleşme!
      const updated = [...matchedPairs, leftIdx];
      setMatchedPairs(updated);
      setMatchInfo({
        text: station.pairs![leftIdx].e,
        isSuccess: true
      });

      if (updated.length === totalPairs) {
        // Tüm çiftler tamamlandı!
        setTimeout(() => {
          const finalGood = Math.max(1, totalPairs - matchWrongCount);
          finishStation(activeStationIndex, finalGood, totalPairs);
        }, 1200);
      }
    } else {
      // Yanlış Eşleşme
      setMatchWrongCount(prev => prev + 1);
      setMatchWrongPair({ leftIdx, rightIdx });
      setMatchInfo({
        text: 'Bu iki kutu eşleşmiyor. Yeniden dene!',
        isSuccess: false
      });

      setTimeout(() => {
        setMatchWrongPair(null);
      }, 700);
    }
  };

  // =========================================================
  // İSTASYON TAMAMLAMA & YILDIZ HESAPLAMA
  // =========================================================

  const finishStation = (stationIdx: number, good: number, total: number) => {
    const ratio = good / total;
    const stars = ratio >= 0.85 ? 3 : ratio >= 0.6 ? 2 : 1;
    const pts = good * 10;

    setStationStats(prev => {
      const copy = [...prev];
      if (stars > copy[stationIdx].stars) copy[stationIdx].stars = stars;
      if (pts > copy[stationIdx].pts) copy[stationIdx].pts = pts;
      return copy;
    });

    setLastResult({
      stationId: STATIONS[stationIdx].id,
      title: STATIONS[stationIdx].title,
      good,
      total,
      pts,
      stars
    });

    setCurrentView('result');
  };

  const handleResetAll = () => {
    if (window.confirm('Yeni bir kaşif için tüm puanlar ve kazanılan yıldızlar sıfırlansın mı?')) {
      setStationStats([
        { stars: 0, pts: 0 },
        { stars: 0, pts: 0 },
        { stars: 0, pts: 0 },
        { stars: 0, pts: 0 },
        { stars: 0, pts: 0 }
      ]);
      setCurrentView('map');
    }
  };

  const activeStation = STATIONS[activeStationIndex];

  return (
    <div className="w-full space-y-4">

      {/* 1. ÜST PANEL & OYUN BİLGİLENDİRME ÇUBUĞU */}
      <div className="bg-gradient-to-r from-sky-900 via-indigo-950 to-slate-900 border-2 border-sky-400/40 rounded-3xl p-4 sm:p-5 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 text-white flex items-center justify-center text-2xl shrink-0 shadow-md border border-sky-300/40">
              🤖
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-sky-400 text-slate-950">
                  5. Sınıf &bull; 4. Hafta
                </span>
                <span className="text-xs font-bold text-sky-200">
                  BTY.5.1.4 Yapay Zekâ Temelleri
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5 flex items-center gap-2">
                <span>Yapay Zekâ Kaşifleri</span>
              </h2>
            </div>
          </div>

          {/* HUD & Hızlı Butonlar */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="text-xs text-sky-200 font-bold">Toplam Puan:</span>
              <span className="text-lg font-black text-yellow-300 flex items-center gap-1">
                <Trophy className="w-4 h-4 text-yellow-400 fill-current" />
                {totalScore}
              </span>
            </div>

            <button
              onClick={handleResetAll}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-slate-200 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
              title="Puanları sıfırla ve yeni oyuncu başlat"
            >
              <RotateCcw className="w-3.5 h-3.5 text-sky-300" />
              <span>Yeni Oyuncu</span>
            </button>

            <a
              href="/oyun-4-hafta-yapay-zeka-kasifleri.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-sky-500/30 hover:bg-sky-500/40 border border-sky-400/40 text-xs font-bold text-sky-200 hover:text-white transition flex items-center gap-1.5"
              title="Bağımsız Web Sitesi Olarak Aç"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Web Sitesinde Aç</span>
            </a>

            <a
              href="/oyun-4-hafta-yapay-zeka-kasifleri.html"
              download="Yapay_Zeka_Kasifleri_5Sinif_4Hafta.html"
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-slate-200 hover:text-white transition flex items-center gap-1.5"
              title="HTML dosyasını bilgisayara indir"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">İndir</span>
            </a>

            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 text-xs font-bold text-rose-200 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Çıkış</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 2. OYUN ALANI (DURUMA GÖRE EKRANLAR) */}

      {/* EKRAN A: GÖREV HARİTASI (MAP VIEW) */}
      {currentView === 'map' && (
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
          
          {/* Robot Karşılama Balonu */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200">
            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 text-5xl flex items-center justify-center animate-bounce">
              🤖
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-black text-slate-800">
                Merhaba Kaşif! Hangi göreve çıkıyorsun?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Aşağıdaki 5 görevden birini seç, soruları çöz, doğru eşleştirmeleri yap ve tüm yıldızları topla!
              </p>
            </div>
          </div>

          {/* 5 Görev Kartı Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STATIONS.map((st, idx) => {
              const stats = stationStats[idx];
              const isLocked = false;

              return (
                <div
                  key={st.id}
                  onClick={() => handleOpenIntro(idx)}
                  className={`p-5 rounded-3xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[170px] shadow-xs hover:shadow-md hover:-translate-y-1 ${
                    stats.stars > 0
                      ? 'bg-gradient-to-br from-white to-sky-50/50 border-sky-300'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`w-8 h-8 rounded-full border-2 font-black text-sm flex items-center justify-center ${st.badgeColor}`}>
                        {st.id}
                      </span>
                      <span className="text-2xl">{st.icon}</span>
                    </div>

                    <h4 className="text-base sm:text-lg font-black text-slate-800 leading-tight">
                      {st.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {st.sub}
                    </p>
                  </div>

                  {/* Yıldız Göstergesi & Puan */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map(starNum => (
                        <Star
                          key={starNum}
                          className={`w-4 h-4 ${
                            starNum <= stats.stars
                              ? 'text-yellow-400 fill-current'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    {stats.pts > 0 && (
                      <span className="text-xs font-black text-sky-600 bg-sky-50 px-2 py-0.5 rounded-lg border border-sky-200">
                        {stats.pts} Puan
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tamamlama Tebrik Afişi */}
          {allCompleted && (
            <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white shadow-md text-center space-y-2 animate-in fade-in duration-300">
              <div className="text-3xl">🎉 🌟 🤖</div>
              <h3 className="text-xl sm:text-2xl font-black">
                Tebrikler! Sen Gerçek Bir Yapay Zekâ Kaşifisin!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto">
                Tüm görevleri başarıyla tamamladın. Toplam puanın: <strong>{totalScore}</strong>.
                Unutma: Yapay zekâ güçlü bir yardımcıdır ama kaptan koltuğunda daima sen varsın!
              </p>
            </div>
          )}

        </div>
      )}

      {/* EKRAN B: GÖREV GİRİŞ EKRANI (INTRO) */}
      {currentView === 'intro' && (
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${activeStation.badgeColor}`}>
              Görev {activeStation.id}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
              {activeStation.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-bold">
              {activeStation.sub}
            </p>
          </div>

          {/* Hatırlayalım Listesi */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Önce Hatırlayalım:</span>
            </h4>
            <div className="space-y-2 pt-1">
              {activeStation.intro.map((tip, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 font-medium flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Eylemler */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleStartPlaying}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-black text-sm sm:text-base shadow-md transition-all hover:scale-102 cursor-pointer flex items-center gap-2"
            >
              <span>Görevi Başlat!</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentView('map')}
              className="py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Haritaya Dön</span>
            </button>
          </div>
        </div>
      )}

      {/* EKRAN C: OYUN SAHNESİ (PLAY VIEW) */}
      {currentView === 'play' && (
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-5">
          
          {/* Üst İlerleme Çubuğu */}
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center border ${activeStation.badgeColor}`}>
                {activeStation.id}
              </span>
              <span className="font-black text-sm sm:text-base text-slate-800">
                {activeStation.title}
              </span>
            </div>

            {activeStation.type === 'single' ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">
                  {singleStepIndex + 1} / {singleOrder.length}
                </span>
                <div className="flex gap-1">
                  {singleOrder.map((_, dotIdx) => {
                    const mark = singleMarks[dotIdx];
                    const isCurrent = dotIdx === singleStepIndex;
                    return (
                      <span
                        key={dotIdx}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          mark === 'ok'
                            ? 'bg-emerald-500'
                            : mark === 'bad'
                            ? 'bg-rose-500'
                            : isCurrent
                            ? 'bg-sky-500 ring-2 ring-sky-300'
                            : 'bg-slate-200'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl">
                Eşleşen: {matchedPairs.length} / {activeStation.pairs?.length}
              </span>
            )}
          </div>

          {/* OYUN TİPİ 1: TEK SEÇİMLİ VEYA ÇOKTAN SEÇMELİ (GÖREV 1, 2, 5) */}
          {activeStation.type === 'single' && (
            <div className="space-y-6">
              
              {/* Soru / İfade Kutusu */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-50 via-indigo-50 to-blue-50 border-2 border-sky-200 text-center space-y-2">
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wider block">
                  {activeStation.mc ? 'Soru' : 'Bu Örnek Hangisi?'}
                </span>
                <h4 className="text-lg sm:text-2xl font-black text-slate-800 leading-snug">
                  {activeStation.mc
                    ? activeStation.items![singleOrder[singleStepIndex]].q
                    : activeStation.items![singleOrder[singleStepIndex]].t}
                </h4>
              </div>

              {/* Seçenek Düğmeleri */}
              <div className={`grid gap-3 ${
                activeStation.mc 
                  ? 'grid-cols-1' 
                  : singleOptions.length === 3 
                  ? 'grid-cols-1 sm:grid-cols-3' 
                  : 'grid-cols-1 sm:grid-cols-2'
              }`}>
                {singleOptions.map((opt, optIdx) => {
                  const isPicked = singlePickedIndex === optIdx;
                  const isSubmitted = singlePickedIndex !== null;

                  let btnStyle = 'bg-slate-50 hover:bg-sky-50 border-slate-300 text-slate-800 hover:border-sky-400';
                  if (isSubmitted) {
                    if (opt.ok) {
                      btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300';
                    } else if (isPicked) {
                      btnStyle = 'bg-rose-100 border-rose-500 text-rose-950 ring-2 ring-rose-300';
                    } else {
                      btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isSubmitted}
                      onClick={() => handleSinglePick(optIdx)}
                      className={`p-4 sm:p-5 rounded-2xl border-2 font-black text-sm sm:text-base text-left transition-all flex items-center justify-between gap-3 shadow-2xs cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-center gap-2.5">
                        {opt.icon && <span className="text-xl">{opt.icon}</span>}
                        <span>{opt.label}</span>
                      </div>

                      {isSubmitted && (
                        <span>
                          {opt.ok ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          ) : isPicked ? (
                            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                          ) : null}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Açıklamalı Dönüt Paneli */}
              {singleFeedback && (
                <div className={`p-4 sm:p-5 rounded-2xl border-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-200 ${
                  singleFeedback.isOk
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}>
                  <div className="space-y-1">
                    <div className="font-black text-sm sm:text-base flex items-center gap-1.5">
                      {singleFeedback.isOk ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span>Doğru Cevap! Harikasın.</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-rose-600" />
                          <span>Bu sefer olmadı, hadi öğrenelim:</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                      {singleFeedback.explanation}
                    </p>
                  </div>

                  <button
                    onClick={handleNextSingleQuestion}
                    className="py-2.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm shrink-0 self-end sm:self-center transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{singleStepIndex === singleOrder.length - 1 ? 'Sonucu Gör' : 'Sıradaki Soru'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          )}

          {/* OYUN TİPİ 2: EŞLEŞTİRME OYUNU (GÖREV 3, 4) */}
          {activeStation.type === 'match' && (
            <div className="space-y-5">
              
              {/* İpucu */}
              <div className="p-3 rounded-xl bg-slate-100 text-slate-600 text-xs text-center font-bold">
                {activeStation.id === 3
                  ? 'Soldaki alana ve sağdaki örneğe tıkla. Doğruysa kutucuklar yeşile döner!'
                  : 'Sol taraftan bilim insanını, sağ taraftan katkısını seç. Doğru eşleşmeleri tamamla!'}
              </div>

              {/* İki Sütunlu Eşleştirme Izgarası */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* SOL SÜTUN (Kategoriler / Bilim İnsanları) */}
                <div className="space-y-2.5">
                  <div className="text-xs font-black uppercase tracking-wider text-slate-500 px-1">
                    {activeStation.id === 3 ? 'Kullanım Alanı' : 'Bilim İnsanı'}
                  </div>
                  {matchLeftOrder.map(idx => {
                    const item = activeStation.pairs![idx];
                    const isMatched = matchedPairs.includes(idx);
                    const isSelected = matchSelected?.side === 'left' && matchSelected?.idx === idx;
                    const isWrong = matchWrongPair?.leftIdx === idx;

                    return (
                      <button
                        key={idx}
                        disabled={isMatched}
                        onClick={() => handleTileClick('left', idx)}
                        className={`w-full p-4 rounded-2xl border-2 text-left font-black text-xs sm:text-sm transition-all shadow-2xs flex items-center justify-between cursor-pointer ${
                          isMatched
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-950 opacity-90 cursor-default'
                            : isWrong
                            ? 'bg-rose-100 border-rose-400 text-rose-950 animate-shake'
                            : isSelected
                            ? 'bg-sky-200 border-sky-600 text-sky-950 ring-2 ring-sky-300'
                            : 'bg-sky-50 hover:bg-sky-100/80 border-sky-200 text-sky-950'
                        }`}
                      >
                        <span>{item.l}</span>
                        {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      </button>
                    );
                  })}
                </div>

                {/* SAĞ SÜTUN (Örnekler / Katkılar) */}
                <div className="space-y-2.5">
                  <div className="text-xs font-black uppercase tracking-wider text-slate-500 px-1">
                    {activeStation.id === 3 ? 'Yapay Zekâ Örneği' : 'Çalışması & Katkısı'}
                  </div>
                  {matchRightOrder.map(idx => {
                    const item = activeStation.pairs![idx];
                    const isMatched = matchedPairs.includes(idx);
                    const isSelected = matchSelected?.side === 'right' && matchSelected?.idx === idx;
                    const isWrong = matchWrongPair?.rightIdx === idx;

                    return (
                      <button
                        key={idx}
                        disabled={isMatched}
                        onClick={() => handleTileClick('right', idx)}
                        className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm transition-all shadow-2xs flex items-center justify-between cursor-pointer ${
                          isMatched
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-950 opacity-90 cursor-default font-black'
                            : isWrong
                            ? 'bg-rose-100 border-rose-400 text-rose-950 animate-shake'
                            : isSelected
                            ? 'bg-teal-200 border-teal-600 text-teal-950 ring-2 ring-teal-300'
                            : 'bg-teal-50 hover:bg-teal-100/80 border-teal-200 text-teal-950'
                        }`}
                      >
                        <span className="leading-snug">{item.r}</span>
                        {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* Bilgilendirme ve Anlık Açıklama */}
              {matchInfo && (
                <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-2 ${
                  matchInfo.isSuccess
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-slate-100 border-slate-300 text-slate-700'
                }`}>
                  <Lightbulb className={`w-4 h-4 shrink-0 ${matchInfo.isSuccess ? 'text-emerald-600' : 'text-amber-500'}`} />
                  <span>{matchInfo.text}</span>
                </div>
              )}

            </div>
          )}

        </div>
      )}

      {/* EKRAN D: SONUÇ EKRANI (RESULT VIEW) */}
      {currentView === 'result' && lastResult && (
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-white flex items-center justify-center text-3xl mx-auto shadow-md">
            🏆
          </div>

          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              {lastResult.title}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
              Görev Başarıyla Tamamlandı!
            </h3>
          </div>

          {/* Yıldızlar */}
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map(stNum => (
              <Star
                key={stNum}
                className={`w-8 h-8 sm:w-10 sm:h-10 ${
                  stNum <= lastResult.stars
                    ? 'text-yellow-400 fill-current animate-pulse'
                    : 'text-slate-200'
                }`}
              />
            ))}
          </div>

          {/* İstatistik Kutusu */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-slate-500 block">Doğru Sayısı</span>
              <span className="text-lg sm:text-xl font-black text-slate-800">
                {lastResult.good} / {lastResult.total}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Kazanılan Puan</span>
              <span className="text-lg sm:text-xl font-black text-amber-600">
                +{lastResult.pts}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto font-medium">
            {lastResult.stars === 3
              ? 'Harikasın! Bu görevin tüm kazanımlarını ustalıkla kavradın.'
              : lastResult.stars === 2
              ? 'Çok iyi bir sonuç! Biraz daha pratikle 3 tam yıldızı da alabilirsin.'
              : 'Güzel başlangıç! Tekrar oynayarak yıldızlarını üçe çıkarabilirsin.'}
          </p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setCurrentView('map')}
              className="py-3 px-6 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black text-sm transition shadow-md cursor-pointer flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Haritaya Dön</span>
            </button>

            <button
              onClick={handleStartPlaying}
              className="py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Tekrar Oyna</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. ÖĞRETMEN VE KAZANIM ALTI BİLGİLENDİRMESİ */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-sky-600 shrink-0" />
          <span><strong>Kazanım:</strong> BTY.5.1.4 – Yapay zekâ ile ilgili temel kavramları ve özellikleri sorgulayabilme</span>
        </div>
        <div className="font-bold text-slate-600">
          Hilal KURTOĞLU &bull; Bilgisayar ve Öğretim Teknolojileri Öğretmeni
        </div>
      </div>

    </div>
  );
};
