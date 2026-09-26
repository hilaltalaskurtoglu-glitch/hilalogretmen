import React, { useState, useRef } from 'react';
import { Award, RotateCcw, ArrowRight, CheckCircle2, XCircle, Sparkles, Smartphone, ShieldCheck, HeartPulse, GraduationCap, Building2 } from 'lucide-react';

interface StepMC {
  type: 'mc';
  badge: string;
  q: string;
  opts: string[];
  correct: number;
  feedbackOk: string;
  feedbackNo: string;
}

interface StepCategorize {
  type: 'categorize';
  badge: string;
  q: string;
  categories: string[];
  cards: { label: string; cat: number }[];
}

type GameStep = StepMC | StepCategorize;

const GAME_STEPS: GameStep[] = [
  {
    type: 'mc',
    badge: '1. Bölüm · Dijital Kimlik',
    q: 'Bir kişinin sosyal medya hesapları, oyun hesapları ve diğer çevrim içi platformlardaki kullanıcı adı, profil bilgileri ve paylaşımlarının bütününe ne denir?',
    opts: ['Dijital kimlik', 'Ekran süresi', 'Bulut bilişim', 'İşletim sistemi'],
    correct: 0,
    feedbackOk: 'Doğru! Dijital kimlik, çevrim içi ortamlarda seni temsil eden kullanıcı adı, profil bilgisi ve paylaşımların bütünüdür.',
    feedbackNo: 'Dijital kimlik; sosyal medya, oyun ve diğer platformlardaki kullanıcı adı, profil bilgisi ve paylaşımlarının tümüdür.'
  },
  {
    type: 'mc',
    badge: '1. Bölüm · Dijital Kimlik',
    q: 'Bir arama motoruna ad ve soyadını yazdığında karşına çıkan sonuçlarla ilgili en doğru ifade hangisidir?',
    opts: [
      'Dijital ortamda paylaşılan bilgiler internette uzun süre kalabilir ve herkes tarafından görülebilir.',
      'İnternete yüklenen her şey bir gün sonra otomatik olarak silinir.',
      'Sadece paylaşımı yapan kişi bu bilgileri görebilir.',
      'Arama motorları sadece resmi kurumların bilgilerini gösterir.'
    ],
    correct: 0,
    feedbackOk: 'Doğru! Bu kalıcılık ve görünürlük yüzünden paylaşım yaparken dikkatli olmak gerekir.',
    feedbackNo: 'Dijital ortamda paylaşılanlar uzun süre kalabilir ve pek çok kişi tarafından görülebilir — bu yüzden paylaşırken dikkatli olunmalıdır.'
  },
  {
    type: 'mc',
    badge: '2. Bölüm · Dijital Ayak İzi',
    q: 'Bir kişinin çevrim içi ortamda yaptığı aramalar, ziyaret ettiği siteler ve paylaşımlarıyla bilerek ya da bilmeden bıraktığı izlerin tümü nasıl adlandırılır?',
    opts: ['Dijital ayak izi', 'Donanım', 'Dosya uzantısı', 'Veri sıkıştırma'],
    correct: 0,
    feedbackOk: 'Doğru! Dijital ayak izi kalıcı olabilir; bu yüzden paylaşımlarda dikkatli davranmak önemlidir.',
    feedbackNo: 'Bu iz "dijital ayak izi" olarak adlandırılır ve kalıcı olabileceği için paylaşımlarda dikkatli olunmalıdır.'
  },
  {
    type: 'mc',
    badge: '2. Bölüm · Dijital Ayak İzi',
    q: 'Sosyal medyada gizlilik veya güvenlik ihlali ile karşılaşan bir öğrenci öncelikle kime/nereye başvurmalıdır?',
    opts: [
      'Aile bireyleri, öğretmenler veya okul rehberlik servisi gibi güvenilir kişilere',
      'Konuyu hiç kimseye söylemeden kendi başına çözmeye çalışmalı',
      'Sadece internetteki tanımadığı kişilere danışmalı',
      'Hesabını hemen tamamen silmeli, başka bir şey yapmamalı'
    ],
    correct: 0,
    feedbackOk: 'Doğru! Aile, öğretmenler, okul rehberlik servisi ve gerekirse BTK gibi güvenilir kaynaklara başvurulmalıdır.',
    feedbackNo: 'Böyle bir durumda aile bireyleri, öğretmenler, okul rehberlik servisi gibi güvenilir kişilere başvurulmalıdır.'
  },
  {
    type: 'categorize',
    badge: '3. Bölüm · Dijital Vatandaşlık Uygulamaları',
    q: 'Aşağıdaki dijital vatandaşlık uygulamalarını doğru kullanım alanına sürükleyip bırakın (veya tıklayarak yerleştirin).',
    categories: ['Eğitim', 'Sağlık', 'E-Devlet'],
    cards: [
      { label: "EBA'dan ders videosu izleme", cat: 0 },
      { label: 'Uzaktan öğretmenle ödev paylaşımı', cat: 0 },
      { label: 'MHRS ile doktor randevusu alma', cat: 1 },
      { label: 'Sağlık uygulamasından nabız takibi', cat: 1 },
      { label: "e-Devlet'ten nüfus kaydı sorgulama", cat: 2 },
      { label: 'Vergi işlemini online yapma', cat: 2 }
    ]
  }
];

export const DigitalIdentityGame: React.FC<{ onBackToHome?: () => void }> = ({ onBackToHome }) => {
  const [stepIdx, setStepIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [mcAnswered, setMcAnswered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Categorize step states
  const [placedCards, setPlacedCards] = useState<Array<{ label: string; targetCat: number; actualCat: number }>>([]);
  const [remainingCards, setRemainingCards] = useState<Array<{ label: string; cat: number }>>(() => {
    const catStep = GAME_STEPS[4] as StepCategorize;
    return [...catStep.cards];
  });
  const [selectedCardForTap, setSelectedCardForTap] = useState<{ label: string; cat: number } | null>(null);
  const [catCorrectCount, setCatCorrectCount] = useState(0);
  const [catFinished, setCatFinished] = useState(false);

  // Dragging states
  const [draggedCard, setDraggedCard] = useState<{ label: string; cat: number } | null>(null);
  const [hoveredCatIndex, setHoveredCatIndex] = useState<number | null>(null);

  const maxScore = 4 + 6; // 4 multiple choice + 6 categorized cards = 10

  const handleRestart = () => {
    setStepIdx(0);
    setScore(0);
    setSelectedOpt(null);
    setMcAnswered(false);
    setIsGameOver(false);
    const catStep = GAME_STEPS[4] as StepCategorize;
    setRemainingCards([...catStep.cards]);
    setPlacedCards([]);
    setSelectedCardForTap(null);
    setCatCorrectCount(0);
    setCatFinished(false);
  };

  const handleMCOptionClick = (optIdx: number, step: StepMC) => {
    if (mcAnswered) return;
    setSelectedOpt(optIdx);
    setMcAnswered(true);
    if (optIdx === step.correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextStep = () => {
    if (stepIdx < GAME_STEPS.length - 1) {
      setStepIdx(prev => prev + 1);
      setSelectedOpt(null);
      setMcAnswered(false);
    } else {
      setIsGameOver(true);
    }
  };

  // Place card in category (both drag and tap)
  const placeCardInCategory = (card: { label: string; cat: number }, targetCat: number) => {
    const isCorrect = card.cat === targetCat;
    if (isCorrect) {
      setScore(prev => prev + 1);
      setCatCorrectCount(prev => prev + 1);
    }

    setPlacedCards(prev => [...prev, { label: card.label, targetCat, actualCat: card.cat }]);
    const newRemaining = remainingCards.filter(c => c.label !== card.label);
    setRemainingCards(newRemaining);
    setSelectedCardForTap(null);

    if (newRemaining.length === 0) {
      setCatFinished(true);
    }
  };

  const currentStep = GAME_STEPS[stepIdx];
  const progressPercent = isGameOver ? 100 : Math.round((stepIdx / GAME_STEPS.length) * 100);

  const categoryIcons = [
    <GraduationCap key="edu" className="w-4 h-4 text-emerald-400" />,
    <HeartPulse key="health" className="w-4 h-4 text-rose-400" />,
    <Building2 key="gov" className="w-4 h-4 text-amber-400" />
  ];

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-teal-500/30 bg-[#12263a] text-[#eef3f7] font-sans">
      
      {/* Header */}
      <header className="p-4 sm:p-6 sm:px-8 flex items-center justify-between border-b border-white/10 bg-[#0d1b2a]/80 backdrop-blur-md">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Cyber Chip Graphic */}
          <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-[#4fd1c5] to-[#2a9d8f] relative shrink-0 shadow-md flex items-center justify-center border border-teal-300/40">
            <div className="w-7 h-5 border-2 border-[#0d1b2a]/60 rounded-xs flex items-center justify-center">
              <span className="text-[10px] font-black text-[#0d1b2a]">ID</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-2xl font-black tracking-wide text-white">
                Dijital Kimlik Kaşifi
              </h1>
              <span className="bg-teal-500/20 text-[#4fd1c5] border border-teal-500/40 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full">
                3. Hafta Özel Oyunu
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#a9c3d9] mt-0.5">
              5. Sınıf Bilişim Teknolojileri ve Yazılım &bull; Dijital Kimlik, Dijital Ayak İzi ve Vatandaşlık
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-teal-300 block font-bold">Hilal KURTOĞLU</span>
            <span className="text-[10px] text-slate-400">Öğretmen Oyunu</span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-6 sm:px-8 pt-4">
        <div className="flex justify-between items-center text-xs text-[#a9c3d9] mb-1.5 font-bold">
          <span>İlerleme: %{progressPercent}</span>
          <span>Puan: {score} / {maxScore}</span>
        </div>
        <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#4fd1c5] via-[#ffd166] to-[#4fd18a] transition-all duration-400"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="p-5 sm:p-8 min-h-[380px] flex flex-col justify-between">
        {!isGameOver ? (
          <div>
            {/* Step Badge */}
            <div className="mb-3">
              <span className="inline-block bg-[#173252] text-[#4fd1c5] border border-[#4fd1c5]/30 text-xs font-bold px-3 py-1 rounded-full">
                {currentStep.badge}
              </span>
            </div>

            {/* Question Text */}
            <h2 className="text-base sm:text-xl font-bold text-white mb-4 leading-relaxed">
              {currentStep.q}
            </h2>

            {/* MULTIPLE CHOICE STEP */}
            {currentStep.type === 'mc' && (
              <div className="space-y-3">
                <div className="grid gap-2.5">
                  {currentStep.opts.map((optText, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    const isCorrect = optIdx === currentStep.correct;

                    let btnClass = 'bg-[#173252] hover:border-[#4fd1c5] hover:translate-x-1 border-white/10 text-[#eef3f7]';
                    if (mcAnswered) {
                      if (isCorrect) {
                        btnClass = 'bg-emerald-950/70 border-emerald-400 text-emerald-200 ring-2 ring-emerald-500/40';
                      } else if (isSelected && !isCorrect) {
                        btnClass = 'bg-rose-950/70 border-rose-400 text-rose-200';
                      } else {
                        btnClass = 'opacity-40 bg-[#173252] border-white/5 text-slate-400';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleMCOptionClick(optIdx, currentStep)}
                        disabled={mcAnswered}
                        className={`text-left p-3.5 sm:p-4 rounded-xl border text-sm sm:text-base font-medium transition-all duration-200 flex items-start gap-3 cursor-pointer disabled:cursor-default ${btnClass}`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-black/30 border border-white/10 flex items-center justify-center shrink-0 text-xs font-bold text-[#4fd1c5]">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="flex-1">{optText}</span>
                        {mcAnswered && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        )}
                        {mcAnswered && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* MC Feedback */}
                {mcAnswered && (
                  <div
                    className={`mt-4 p-4 rounded-xl text-xs sm:text-sm leading-relaxed border animate-in fade-in duration-300 ${
                      selectedOpt === currentStep.correct
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                        : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                    }`}
                  >
                    <p className="font-bold flex items-center gap-1.5 mb-1">
                      {selectedOpt === currentStep.correct ? '🎉 Harika Cevap!' : '💡 Öğretmen Notu:'}
                    </p>
                    <p>
                      {selectedOpt === currentStep.correct
                        ? currentStep.feedbackOk
                        : currentStep.feedbackNo}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* CATEGORIZE STEP */}
            {currentStep.type === 'categorize' && (
              <div className="space-y-4">
                {/* Information hint */}
                <p className="text-xs text-[#a9c3d9] italic">
                  💡 İpucu: Bir karta dokunup ardından ilgili kutuya dokunarak yerleştirebilir veya doğrudan sürükleyebilirsiniz.
                </p>

                {/* 3 Categories Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentStep.categories.map((catName, catIdx) => {
                    const cardsInThisCat = placedCards.filter(p => p.targetCat === catIdx);
                    const isHovered = hoveredCatIndex === catIdx;
                    const isTapCandidate = selectedCardForTap !== null;

                    return (
                      <div
                        key={catIdx}
                        onDragOver={e => {
                          e.preventDefault();
                          setHoveredCatIndex(catIdx);
                        }}
                        onDragLeave={() => setHoveredCatIndex(null)}
                        onDrop={e => {
                          e.preventDefault();
                          setHoveredCatIndex(null);
                          if (draggedCard) {
                            placeCardInCategory(draggedCard, catIdx);
                            setDraggedCard(null);
                          }
                        }}
                        onClick={() => {
                          if (selectedCardForTap) {
                            placeCardInCategory(selectedCardForTap, catIdx);
                          }
                        }}
                        className={`rounded-2xl p-3 border-2 border-dashed min-h-[140px] flex flex-col transition-all duration-200 ${
                          isHovered
                            ? 'border-[#4fd1c5] bg-[#4fd1c5]/10 scale-[1.02]'
                            : isTapCandidate
                            ? 'border-teal-400/60 bg-[#173252] cursor-pointer hover:border-[#4fd1c5] hover:bg-[#1a3d66]'
                            : 'border-white/20 bg-[#173252]/60'
                        }`}
                      >
                        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                          <span className="font-extrabold text-[#ffd166] text-xs sm:text-sm flex items-center gap-1.5">
                            {categoryIcons[catIdx]}
                            <span>{catName}</span>
                          </span>
                          <span className="text-[10px] bg-white/10 text-slate-300 px-1.5 py-0.5 rounded-full font-bold">
                            {cardsInThisCat.length} kart
                          </span>
                        </div>

                        {/* Chips dropped into this category */}
                        <div className="flex-1 flex flex-col gap-1.5">
                          {cardsInThisCat.map((placed, pIdx) => {
                            const isCorrect = placed.actualCat === placed.targetCat;
                            return (
                              <div
                                key={pIdx}
                                className={`text-xs p-2 rounded-lg font-medium border flex items-center justify-between ${
                                  isCorrect
                                    ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200'
                                    : 'bg-rose-950/70 border-rose-500/50 text-rose-200'
                                }`}
                              >
                                <span>{placed.label}</span>
                                <span className="font-bold shrink-0 ml-1">
                                  {isCorrect ? '✓' : `(Doğrusu: ${currentStep.categories[placed.actualCat]})`}
                                </span>
                              </div>
                            );
                          })}

                          {cardsInThisCat.length === 0 && (
                            <div className="h-full flex items-center justify-center text-[11px] text-slate-400 text-center py-4">
                              {isTapCandidate ? 'Buraya eklemek için tıkla' : 'Kartları buraya bırakın'}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pool of remaining cards */}
                {remainingCards.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <span className="text-xs font-bold text-teal-300 block mb-2">
                      Sürükleyin veya Seçin ({remainingCards.length} kart kaldı):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {remainingCards.map((card, cIdx) => {
                        const isSelected = selectedCardForTap?.label === card.label;
                        return (
                          <div
                            key={cIdx}
                            draggable
                            onDragStart={() => setDraggedCard(card)}
                            onDragEnd={() => setDraggedCard(null)}
                            onClick={() => setSelectedCardForTap(isSelected ? null : card)}
                            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-grab active:cursor-grabbing select-none transition-all shadow-md flex items-center gap-2 ${
                              isSelected
                                ? 'bg-[#ffd166] text-[#0d1b2a] ring-3 ring-teal-400 scale-105'
                                : 'bg-[#ff8966] hover:bg-[#ff997a] text-[#0d1b2a]'
                            }`}
                          >
                            <span>📌</span>
                            <span>{card.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Categorize Feedback */}
                {catFinished && (
                  <div
                    className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed border animate-in fade-in duration-300 ${
                      catCorrectCount === currentStep.cards.length
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                        : 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                    }`}
                  >
                    <p className="font-bold mb-1">
                      {catCorrectCount === currentStep.cards.length
                        ? '🌟 Mükemmel Sınıflandırma!'
                        : '👏 Bölüm Tamamlandı!'}
                    </p>
                    <p>
                      Bu bölümde {currentStep.cards.length} dijital vatandaşlık uygulamasından {catCorrectCount} tanesini doğru kutuya yerleştirdiniz.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* FINAL SCREEN */
          <div className="text-center py-6 sm:py-10 space-y-4 animate-in zoom-in-95 duration-400">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto bg-gradient-to-tr from-[#ffd166] via-amber-400 to-yellow-300 flex items-center justify-center text-4xl sm:text-5xl shadow-xl shadow-amber-500/20 border-4 border-amber-200">
              🏅
            </div>
            
            <h3 className="text-xl sm:text-3xl font-black text-white">
              Dijital Vatandaş Rozetini Kazandınız!
            </h3>

            <div className="text-lg sm:text-xl font-bold text-[#4fd1c5]">
              Toplam Başarı: {score} / {maxScore} Doğru (%{Math.round((score / maxScore) * 100)})
            </div>

            <p className="text-xs sm:text-sm text-[#a9c3d9] max-w-lg mx-auto leading-relaxed">
              Tebrikler! Dijital kimliğinizi korumak ve dijital ayak izinizi bilinçli yönetmek, sorumlu bir dijital vatandaş olmanın en önemli adımıdır.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleRestart}
                className="bg-[#4fd1c5] hover:bg-[#38b2ac] text-[#0d1b2a] font-black px-6 py-3 rounded-xl transition text-sm flex items-center gap-2 shadow-lg shadow-teal-500/20 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Oyunu Tekrar Oyna</span>
              </button>

              {onBackToHome && (
                <button
                  onClick={onBackToHome}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3 rounded-xl border border-white/20 transition text-sm cursor-pointer"
                >
                  Ana Sayfaya Dön
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer Controls */}
      {!isGameOver && (
        <footer className="p-4 sm:p-6 sm:px-8 border-t border-white/10 bg-[#0d1b2a]/60 flex items-center justify-between gap-3">
          <button
            onClick={handleRestart}
            className="text-xs text-[#a9c3d9] hover:text-white transition flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Baştan Başla</span>
          </button>

          <button
            onClick={handleNextStep}
            disabled={currentStep.type === 'mc' ? !mcAnswered : !catFinished}
            className={`font-black px-6 py-2.5 rounded-xl text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed ${
              (currentStep.type === 'mc' ? mcAnswered : catFinished)
                ? 'bg-[#4fd1c5] hover:bg-[#38b2ac] text-[#0d1b2a] shadow-lg shadow-teal-500/20 scale-102'
                : 'bg-white/10 text-white/40 border border-white/5'
            }`}
          >
            <span>{stepIdx === GAME_STEPS.length - 1 ? 'Oyunu Bitir' : 'İleri'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </footer>
      )}
    </div>
  );
};
