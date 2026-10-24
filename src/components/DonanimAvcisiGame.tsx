import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Download, 
  Cpu, 
  HardDrive, 
  Layers, 
  Sparkles, 
  Check, 
  Star,
  Maximize2
} from 'lucide-react';
import { getHardwareImageSrc } from '../data/hardwareImages';

interface Part {
  k: string;
  n: string;
  t: string;
  icon: string;
  detail: string;
}

interface IOItem {
  k: string;
  n: string;
  c: number; // 0: Giriş, 1: Çıkış, 2: Hem Giriş Hem Çıkış
  icon: string;
}

const PARTS: Part[] = [
  { 
    k: 'anakart', 
    n: 'Anakart', 
    t: 'Tüm parçaları birbirine bağlar ve haberleşmesini sağlar.',
    icon: '🔌',
    detail: 'Bilgisayarın omurgasıdır. İşlemci, RAM ve kartlar üzerine takılır.'
  },
  { 
    k: 'islemci', 
    n: 'İşlemci (CPU)', 
    t: 'Komutları işler ve hesaplar; bilgisayarın beynidir.',
    icon: '🧠',
    detail: 'Milyarlarca matematiksel işlemi saniyeler içinde çözer.'
  },
  { 
    k: 'ram', 
    n: 'RAM Bellek', 
    t: 'Çalışan program ve bilgileri geçici olarak tutar.',
    icon: '⚡',
    detail: 'Bilgisayar kapatılınca içindeki geçici bilgiler silinir.'
  },
  { 
    k: 'ssd', 
    n: 'Sabit Disk / SSD', 
    t: 'Dosyaları, fotoğrafları ve işletim sistemini kalıcı olarak depolar.',
    icon: '💽',
    detail: 'Bilgisayar kapansa bile bilgiler güvenle saklanmaya devam eder.'
  },
  { 
    k: 'gpu', 
    n: 'Ekran Kartı (GPU)', 
    t: 'Monitöre gönderilecek görüntü ve grafikleri işler.',
    icon: '🎮',
    detail: 'Oyunlar, videolar ve 3D çizimlerin akıcı görünmesini sağlar.'
  },
  { 
    k: 'guc', 
    n: 'Güç Kaynağı (PSU)', 
    t: 'Şehir elektriğini parçaların kullanabileceği voltaja çevirir.',
    icon: '🔋',
    detail: 'Tüm iç ve dış bileşenlere hayati elektrik enerjisi sağlar.'
  },
  { 
    k: 'fan', 
    n: 'Fan / Soğutma', 
    t: 'Kasa içindeki ve işlemcideki ısıyı azaltır, sistemi korur.',
    icon: '❄️',
    detail: 'Aşırı ısınmayı önleyerek donanımların yanmasını engeller.'
  }
];

const IO_ITEMS: IOItem[] = [
  { k: 'klavye', n: 'Klavye', c: 0, icon: '⌨️' },
  { k: 'fare', n: 'Fare (Mouse)', c: 0, icon: '🖱️' },
  { k: 'tarayici', n: 'Tarayıcı (Scanner)', c: 0, icon: '📠' },
  { k: 'mikrofon', n: 'Mikrofon', c: 0, icon: '🎙️' },
  { k: 'monitor', n: 'Monitör (Ekran)', c: 1, icon: '🖥️' },
  { k: 'yazici', n: 'Yazıcı (Printer)', c: 1, icon: '🖨️' },
  { k: 'hoparlor', n: 'Hoparlör', c: 1, icon: '🔊' },
  { k: 'kulaklik', n: 'Kulaklık', c: 1, icon: '🎧' },
  { k: 'dokunmatik', n: 'Dokunmatik Ekran', c: 2, icon: '📱' },
  { k: 'modem', n: 'Modem', c: 2, icon: '🌐' }
];

const CATEGORIES = [
  { id: 0, title: 'GİRİŞ BİRİMLERİ', sub: 'Bilgisayara veri ve komut gönderir', color: 'rose' },
  { id: 1, title: 'ÇIKIŞ BİRİMLERİ', sub: 'İşlenen bilgileri kullanıcıya sunar', color: 'blue' },
  { id: 2, title: 'HEM GİRİŞ HEM ÇIKIŞ', sub: 'İki yönlü çift taraflı veri alışverişi yapar', color: 'emerald' }
];

interface DonanimAvcisiGameProps {
  onBackToHome?: () => void;
}

export const DonanimAvcisiGame: React.FC<DonanimAvcisiGameProps> = () => {
  const [stage, setStage] = useState<'intro' | 'part1' | 'part2' | 'result'>('intro');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [part1Score, setPart1Score] = useState(0);

  // Part 2 state: Drag/Click Placement
  const [placedItems, setPlacedItems] = useState<{ item: IOItem; categoryId: number; isCorrect: boolean }[]>([]);
  const [selectedPoolItem, setSelectedPoolItem] = useState<IOItem | null>(null);

  // Shuffled questions for Part 1
  const shuffledParts = useMemo(() => {
    return [...PARTS].sort(() => 0.5 - Math.random());
  }, [stage === 'intro']);

  // Options for current question in Part 1
  const currentOptions = useMemo(() => {
    if (stage !== 'part1' || !shuffledParts[currentQIndex]) return [];
    const correct = shuffledParts[currentQIndex];
    const others = PARTS.filter(p => p.k !== correct.k).sort(() => 0.5 - Math.random()).slice(0, 3);
    return [correct, ...others].sort(() => 0.5 - Math.random());
  }, [stage, currentQIndex, shuffledParts]);

  // Remaining pool items for Part 2
  const remainingPool = useMemo(() => {
    const placedKeys = new Set(placedItems.map(p => p.item.k));
    return IO_ITEMS.filter(item => !placedKeys.has(item.k));
  }, [placedItems]);

  const handleStartGame = () => {
    setStage('part1');
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setPart1Score(0);
    setPlacedItems([]);
    setSelectedPoolItem(null);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = currentOptions[idx].k === shuffledParts[currentQIndex].k;
    if (isCorrect) {
      setPart1Score(prev => prev + 1);
    }
  };

  const handleNextPart1 = () => {
    if (currentQIndex + 1 < shuffledParts.length) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Go to Part 2
      setStage('part2');
      setSelectedPoolItem(null);
    }
  };

  const handlePlaceItem = (categoryId: number) => {
    if (!selectedPoolItem) return;
    const isCorrect = selectedPoolItem.c === categoryId;
    setPlacedItems(prev => [...prev, { item: selectedPoolItem, categoryId, isCorrect }]);
    setSelectedPoolItem(null);
  };

  const totalScore = useMemo(() => {
    const part2Correct = placedItems.filter(p => p.isCorrect).length;
    return part1Score + part2Correct;
  }, [part1Score, placedItems]);

  const maxTotalScore = PARTS.length + IO_ITEMS.length;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 text-white rounded-3xl p-4 sm:p-7 border-2 border-cyan-400/50 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-2xl shadow-md border border-cyan-300/40 shrink-0">
            💻
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-400 text-slate-950">
                5. Sınıf &bull; 6. Hafta Oyunu
              </span>
              <span className="text-xs font-bold text-cyan-200">
                BTY.5.1.5 Kazanımı
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5 flex items-center gap-2">
              <span>Donanım Avcısı</span>
            </h2>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href="/oyun-6-hafta-donanim-avcisi.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-cyan-200 hover:text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            title="Orijinal Web Oyunu HTML dosyasını yeni sekmede aç"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ayrı Sekmede Aç</span>
          </a>

          <a
            href="/oyun-6-hafta-donanim-avcisi.html"
            download="6_Hafta_Donanim_Avcisi_Oyunu.html"
            className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-slate-950 text-xs font-black transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            title="Oyunu bilgisayara indir"
          >
            <Download className="w-3.5 h-3.5" />
            <span>İndir</span>
          </a>
        </div>
      </div>

      {/* Progress & Stage Indicator Bar */}
      {stage !== 'intro' && stage !== 'result' && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-cyan-300">
              {stage === 'part1' ? `Bölüm 1: İç Donanım Tanıma (${currentQIndex + 1} / ${shuffledParts.length})` : `Bölüm 2: Giriş-Çıkış Eşleştirme (${placedItems.length} / ${IO_ITEMS.length})`}
            </span>
            <span className="text-amber-300 font-extrabold flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-current" />
              Skor: {totalScore} / {maxTotalScore}
            </span>
          </div>

          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div 
              className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 h-full rounded-full transition-all duration-300"
              style={{
                width: stage === 'part1'
                  ? `${((currentQIndex + 1) / (shuffledParts.length + IO_ITEMS.length)) * 100}%`
                  : `${((shuffledParts.length + placedItems.length) / (shuffledParts.length + IO_ITEMS.length)) * 100}%`
              }}
            />
          </div>
        </div>
      )}

      {/* STAGE 0: INTRO SCREEN */}
      {stage === 'intro' && (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 text-white flex items-center justify-center text-4xl mx-auto shadow-xl border border-white/20">
            🖥️
          </div>

          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-300">
              5. Sınıf Bilişim Teknolojileri &bull; 6. Hafta
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Donanım Avcısı Macerasına Hoş Geldin!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
              Bilgisayar sisteminin hayati parçalarını yakından tanı! İki aşamalı bu görevde iç donanım parçalarını tanımlayacak, ardından dış donanım birimlerini giriş ve çıkış kutularına yerleştireceksin.
            </p>
          </div>

          {/* Mission highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="font-extrabold text-cyan-300 text-xs flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                1. Bölüm: İç Donanım
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                İşlemci, RAM, Anakart ve diğer parçaların görevlerini test sorularıyla eşleştir.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="font-extrabold text-indigo-300 text-xs flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                2. Bölüm: Dış Donanım
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Klavye, monitör ve yazıcı gibi birimleri Giriş, Çıkış ve Hem Giriş-Çıkış kutularına sürükle-bırak.
              </p>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:opacity-95 text-slate-950 font-black text-sm transition shadow-lg shadow-cyan-500/20 inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Macerayı Başlat</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STAGE 1: İÇ DONANIM QUIZ */}
      {stage === 'part1' && shuffledParts[currentQIndex] && (
        <div className="space-y-6 max-w-3xl mx-auto">
          {/* Question Card */}
          <div className="bg-slate-900/80 border-2 border-cyan-400/40 rounded-3xl p-5 sm:p-7 space-y-5 shadow-lg">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                1. BÖLÜM &bull; İÇ DONANIM
              </span>
              <span className="text-xs text-slate-400 font-bold">
                Kasanın İçindeki Parçalar
              </span>
            </div>

            {/* Component Showcase */}
            <div className="flex flex-col sm:flex-row items-center gap-5 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-2 border-2 border-cyan-400/50 flex items-center justify-center shrink-0 shadow-lg">
                <img
                  src={getHardwareImageSrc(shuffledParts[currentQIndex].k)}
                  alt={shuffledParts[currentQIndex].n}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wide">
                  Hayati Donanım Parçası
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {shuffledParts[currentQIndex].n}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  {shuffledParts[currentQIndex].detail}
                </p>
              </div>
            </div>

            <p className="font-extrabold text-sm sm:text-base text-cyan-100">
              Görseldeki parça <strong className="text-cyan-300 underline underline-offset-4">{shuffledParts[currentQIndex].n}</strong>. Bu donanım parçasının temel görevi nedir?
            </p>

            {/* Multiple Choice Options */}
            <div className="space-y-3">
              {currentOptions.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = opt.k === shuffledParts[currentQIndex].k;
                let btnStyle = "bg-white/5 hover:bg-white/10 border-white/15 text-slate-200";

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-600/30 border-emerald-400 text-emerald-200 font-bold";
                  } else if (isSelected) {
                    btnStyle = "bg-rose-600/30 border-rose-400 text-rose-200 font-bold";
                  } else {
                    btnStyle = "bg-white/5 border-white/10 text-slate-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      {'ABCD'[idx]}
                    </span>
                    <span className="text-xs sm:text-sm leading-relaxed flex-1">
                      {opt.t}
                    </span>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback box */}
            {isAnswered && (
              <div className={`p-4 rounded-2xl border flex items-start gap-3 text-xs sm:text-sm leading-relaxed ${
                currentOptions[selectedOption!].k === shuffledParts[currentQIndex].k
                  ? 'bg-emerald-950/60 border-emerald-400/40 text-emerald-200'
                  : 'bg-rose-950/60 border-rose-400/40 text-rose-200'
              }`}>
                {currentOptions[selectedOption!].k === shuffledParts[currentQIndex].k ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <strong>
                    {currentOptions[selectedOption!].k === shuffledParts[currentQIndex].k ? 'Harika! Doğru Cevap.' : 'Dikkat!'}
                  </strong>{' '}
                  {shuffledParts[currentQIndex].n}: {shuffledParts[currentQIndex].t}
                </div>
              </div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextPart1}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-95 text-slate-950 font-black text-xs transition flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <span>{currentQIndex + 1 < shuffledParts.length ? 'Sonraki Parçaya Geç' : '2. Bölüme Başla'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* STAGE 2: DIŞ DONANIM GİRİŞ - ÇIKIŞ KATEGORİLENDİRME */}
      {stage === 'part2' && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              2. BÖLÜM &bull; DIŞ DONANIM
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Giriş - Çıkış Birimlerini Doğru Kutuya Bırak!
            </h3>
            <p className="text-xs text-slate-300 max-w-lg mx-auto">
              Aşağıdaki hazneden bir parçayı seçin, ardından yukarıdaki doğru kutuya tıklayarak yerleştirin.
            </p>
          </div>

          {/* 3 Target Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CATEGORIES.map(cat => {
              const placedInThisCat = placedItems.filter(p => p.categoryId === cat.id);
              return (
                <div
                  key={cat.id}
                  onClick={() => selectedPoolItem && handlePlaceItem(cat.id)}
                  className={`border-2 rounded-2xl p-4 transition min-h-[220px] flex flex-col justify-between ${
                    selectedPoolItem
                      ? 'border-dashed border-cyan-400 bg-cyan-950/30 hover:bg-cyan-900/40 cursor-pointer ring-2 ring-cyan-400/50'
                      : 'border-white/15 bg-white/5'
                  }`}
                >
                  <div className="space-y-1 text-center border-b border-white/10 pb-2.5">
                    <h4 className="font-black text-sm text-white">
                      {cat.title}
                    </h4>
                    <span className="block text-[11px] text-slate-300">
                      {cat.sub}
                    </span>
                  </div>

                  {/* Placed Items in this category */}
                  <div className="flex-1 py-3 flex flex-wrap content-start gap-2">
                    {placedInThisCat.map((p, idx) => (
                      <span
                        key={idx}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border ${
                          p.isCorrect
                            ? 'bg-emerald-950/70 border-emerald-400 text-emerald-200'
                            : 'bg-rose-950/70 border-rose-400 text-rose-200'
                        }`}
                      >
                        <img 
                          src={getHardwareImageSrc(p.item.k)} 
                          alt={p.item.n} 
                          className="w-5 h-5 object-contain bg-white rounded p-0.5" 
                        />
                        <span>{p.item.n}</span>
                        <span>{p.isCorrect ? '✓' : '✗'}</span>
                      </span>
                    ))}
                    {placedInThisCat.length === 0 && (
                      <div className="w-full text-center text-slate-400 text-xs py-6 italic">
                        {selectedPoolItem ? 'Buraya bırakmak için tıkla ⬇️' : 'Henüz parça yerleştirilmedi'}
                      </div>
                    )}
                  </div>

                  <div className="text-[10px] text-center font-bold text-cyan-300 border-t border-white/5 pt-1.5">
                    {placedInThisCat.length} parça eklendi
                  </div>
                </div>
              );
            })}
          </div>

          {/* Source Pool of Remaining Items */}
          <div className="bg-slate-900/90 border-2 border-indigo-400/40 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">
                📦 Yerleştirilecek Donanım Parçaları ({remainingPool.length} kaldı):
              </span>
              {selectedPoolItem && (
                <span className="text-xs text-amber-300 font-extrabold animate-pulse">
                  Seçildi: {selectedPoolItem.n} &bull; Şimdi yukarıdaki bir kutuya tıklayın!
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2.5 justify-center py-2">
              {remainingPool.map(item => {
                const isSelected = selectedPoolItem?.k === item.k;
                return (
                  <button
                    key={item.k}
                    onClick={() => setSelectedPoolItem(isSelected ? null : item)}
                    className={`px-3.5 py-2 rounded-xl border-2 transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                      isSelected
                        ? 'bg-cyan-400 text-slate-950 border-cyan-300 scale-105 font-black ring-4 ring-cyan-400/30'
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/20 font-bold'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-white p-0.5 flex items-center justify-center shrink-0">
                      <img src={getHardwareImageSrc(item.k)} alt={item.n} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xs sm:text-sm">{item.n}</span>
                  </button>
                );
              })}
            </div>

            {remainingPool.length === 0 && (
              <div className="text-center py-3 space-y-3">
                <div className="text-emerald-300 font-black text-sm flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4" />
                  Tüm parçalar yerleştirildi!
                </div>
                <button
                  onClick={() => setStage('result')}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:opacity-95 text-slate-950 font-black text-xs transition shadow-lg cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Sonuç Karnesini Gör</span>
                  <Trophy className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STAGE 3: RESULT SCREEN */}
      {stage === 'result' && (
        <div className="bg-slate-900/90 border-2 border-cyan-400/50 rounded-3xl p-6 sm:p-10 text-center space-y-6 max-w-xl mx-auto shadow-2xl">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center text-5xl mx-auto shadow-xl ring-8 ring-amber-400/20 animate-bounce">
            {totalScore >= 15 ? '🏅' : totalScore >= 11 ? '🌟' : totalScore >= 7 ? '👍' : '📘'}
          </div>

          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-300">
              Görev Tamamlandı
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {totalScore >= 15 
                ? 'Harika! Tam Bir Donanım Uzmanısın!'
                : totalScore >= 11
                ? 'Çok İyi! Donanım Parçalarını İyi Tanıyorsun.'
                : totalScore >= 7
                ? 'İyi Gidiyorsun! Biraz Daha Tekrar Edelim.'
                : 'Birlikte Tekrar Edelim, Bir Dahaki Sefere Daha İyi Olacak!'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              5. Sınıf &bull; 6. Hafta Bilgisayar Sistemleri – Donanım Avcısı Değerlendirmesi
            </p>
          </div>

          {/* Score details */}
          <div className="grid grid-cols-2 gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 text-xs">
            <div>
              <span className="block text-slate-400 font-medium">1. Bölüm (İç Donanım)</span>
              <strong className="text-lg text-cyan-300">{part1Score} / {PARTS.length}</strong>
            </div>
            <div>
              <span className="block text-slate-400 font-medium">2. Bölüm (Dış Donanım)</span>
              <strong className="text-lg text-indigo-300">
                {placedItems.filter(p => p.isCorrect).length} / {IO_ITEMS.length}
              </strong>
            </div>
          </div>

          <div className="text-xl sm:text-2xl font-black text-amber-300">
            Toplam Skor: {totalScore} / {maxTotalScore}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleStartGame}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-95 text-slate-950 font-black text-xs transition flex items-center gap-2 cursor-pointer shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Tekrar Oyna</span>
            </button>

            <a
              href="/oyun-6-hafta-donanim-avcisi.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition flex items-center gap-1.5"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Orijinal Web Sayfasında Aç</span>
            </a>
          </div>
        </div>
      )}

      {/* Footer Signature */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-medium">
        <span>Ahi Evran Ortaokulu &bull; BTY Dersi</span>
        <span className="text-cyan-300 font-bold">Hazırlayan: Hilal KURTOĞLU</span>
      </div>

    </div>
  );
};
