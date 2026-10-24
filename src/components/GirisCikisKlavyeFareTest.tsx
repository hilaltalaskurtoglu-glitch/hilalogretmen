import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  ExternalLink, 
  Download, 
  Sparkles, 
  Trophy, 
  Award, 
  Maximize2,
  BookOpen,
  Keyboard,
  MousePointer
} from 'lucide-react';
import { 
  QUIZ_GIRIS_CIKIS_IMAGES, 
  QUIZ_GIRIS_CIKIS_QUESTIONS, 
  QuizQuestion 
} from '../data/quizGirisCikisData';

interface GirisCikisKlavyeFareTestProps {
  onBackToTests?: () => void;
}

export const GirisCikisKlavyeFareTest: React.FC<GirisCikisKlavyeFareTestProps> = ({ onBackToTests }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => [...QUIZ_GIRIS_CIKIS_QUESTIONS]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [missedQuestions, setMissedQuestions] = useState<QuizQuestion[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  // Shuffle questions helper
  const handleRestart = (shuffle = true) => {
    let list = [...QUIZ_GIRIS_CIKIS_QUESTIONS];
    if (shuffle) {
      for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
      }
    }
    setQuestions(list);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setMissedQuestions([]);
    setIsCompleted(false);
    setIsImageZoomed(false);
  };

  const currentQ = questions[currentIndex];

  const handleSelectOption = useCallback((idx: number) => {
    if (isAnswered || !currentQ) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.c;
    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      setMissedQuestions(prev => [...prev, currentQ]);
    }
  }, [isAnswered, currentQ]);

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsImageZoomed(false);
    } else {
      setIsCompleted(true);
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCompleted) return;

      if (!isAnswered) {
        if (e.key === 'a' || e.key === 'A' || e.key === '1') handleSelectOption(0);
        else if (e.key === 'b' || e.key === 'B' || e.key === '2') handleSelectOption(1);
        else if (e.key === 'c' || e.key === 'C' || e.key === '3') handleSelectOption(2);
        else if (e.key === 'd' || e.key === 'D' || e.key === '4') handleSelectOption(3);
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, isCompleted, handleSelectOption]);

  if (!currentQ && !isCompleted) return null;

  const currentImageBase64 = currentQ ? QUIZ_GIRIS_CIKIS_IMAGES[currentQ.i] : '';
  const currentImageSrc = currentImageBase64 ? `data:image/jpeg;base64,${currentImageBase64}` : '';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Info Banner */}
      <div className="bg-gradient-to-r from-teal-50 via-sky-50 to-blue-50 border-2 border-teal-200/80 rounded-3xl p-4 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider bg-teal-600 text-white px-2.5 py-0.5 rounded-full">
              6. Hafta Testi
            </span>
            <span className="text-xs font-bold text-teal-800">
              Giriş-Çıkış Birimleri, Klavye ve Fare
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 mt-1 flex items-center gap-2">
            <span>⌨️ Donanım &amp; Çevre Birimleri Testi</span>
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            5. Sınıf Bilişim Teknolojileri &bull; Hazırlayan: Seçil GÖKÇE &amp; Hilal KURTOĞLU
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/giris-cikis-klavye-fare-testi.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-teal-50 text-teal-900 border border-teal-300 font-bold text-xs transition flex items-center gap-1.5 shadow-2xs"
            title="Ayrı tam ekran sekmede aç"
          >
            <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
            <span className="hidden sm:inline">Yeni Sekmede Aç</span>
          </a>

          <a
            href="/giris-cikis-klavye-fare-testi.html"
            download="Giris_Cikis_Klavye_Fare_Testi.html"
            className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-2xs"
            title="HTML dosyasını bilgisayara indir"
          >
            <Download className="w-3.5 h-3.5" />
            <span>İndir</span>
          </a>
        </div>
      </div>

      {/* Test Runner or Result Screen */}
      {!isCompleted ? (
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-8 shadow-sm space-y-6">
          
          {/* Progress Bar & Counter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
                <span>Soru {currentIndex + 1} / {questions.length}</span>
              </span>
              <span className="text-teal-700 font-black">
                Doğru: {score}
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
              <div 
                className="bg-gradient-to-r from-teal-500 to-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question & Image Box */}
          <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-br from-slate-50 to-sky-50/50 p-4 sm:p-6 rounded-3xl border border-slate-200">
            {/* Visual Box with Zoom */}
            <div className="relative group shrink-0">
              <div 
                onClick={() => setIsImageZoomed(prev => !prev)}
                className="w-48 h-40 sm:w-60 sm:h-48 rounded-2xl bg-white p-2.5 border-3 border-teal-200 flex items-center justify-center shadow-xs cursor-pointer overflow-hidden group-hover:border-teal-400 transition"
                title="Görseli büyütmek için tıklayın"
              >
                <img 
                  src={currentImageSrc} 
                  alt="Soru Görseli"
                  className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
              <button
                onClick={() => setIsImageZoomed(true)}
                className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-slate-900/70 hover:bg-slate-900 text-white text-xs opacity-80 group-hover:opacity-100 transition"
                title="Tam Boyut İncele"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Question Text */}
            <div className="space-y-2 text-center md:text-left flex-1 min-w-0">
              <span className="inline-block text-[11px] font-black uppercase tracking-wider text-teal-800 bg-teal-100/80 px-2.5 py-0.5 rounded-full">
                Donanım &bull; Soru #{currentIndex + 1}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 leading-snug">
                {currentQ.q}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Görseli dikkatle inceleyiniz ve doğru olan seçeneği işaretleyiniz.
              </p>
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQ.o.map((optText, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isCorrect = optIdx === currentQ.c;
              
              let optStyle = "bg-slate-50 hover:bg-teal-50/70 border-slate-200 text-slate-700 hover:border-teal-300";

              if (isAnswered) {
                if (isCorrect) {
                  optStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400/40";
                } else if (isSelected) {
                  optStyle = "bg-rose-50 border-rose-500 text-rose-950 font-bold ring-2 ring-rose-400/40";
                } else {
                  optStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 text-left cursor-pointer shadow-2xs ${optStyle}`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 transition ${
                    isAnswered && isCorrect
                      ? 'bg-emerald-600 text-white'
                      : isAnswered && isSelected
                      ? 'bg-rose-600 text-white'
                      : 'bg-teal-600 text-white'
                  }`}>
                    {'ABCD'[optIdx]}
                  </span>
                  <span className="text-sm sm:text-base leading-snug pt-0.5">
                    {optText}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Answer Feedback Banner */}
          {isAnswered && (
            <div className={`p-4 rounded-2xl border-2 transition-all animate-in fade-in flex items-start gap-3 ${
              selectedOption === currentQ.c
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              {selectedOption === currentQ.c ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="text-sm sm:text-base leading-relaxed">
                <strong>
                  {selectedOption === currentQ.c ? 'Tebrikler, Doğru Cevap!' : 'Dikkat, Yanlış Cevap.'}
                </strong>{' '}
                {currentQ.e}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Klavyeden A, B, C, D tuşlarına veya Enter tuşuna basabilirsiniz.
            </span>

            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className={`px-7 py-3.5 rounded-2xl font-black text-sm transition-all flex items-center gap-2 cursor-pointer ml-auto shadow-sm ${
                isAnswered
                  ? 'bg-gradient-to-r from-teal-600 to-blue-600 hover:opacity-95 text-white shadow-teal-500/20'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
              }`}
            >
              <span>{currentIndex + 1 < questions.length ? 'Sonraki Soru' : 'Sonucu Gör'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        /* Result Screen */
        <div className="bg-white border-2 border-teal-200 rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-sm">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-400 text-slate-950 flex items-center justify-center text-5xl mx-auto shadow-lg ring-8 ring-amber-100 animate-bounce">
            {score / questions.length >= 0.9 ? '🏅' : score / questions.length >= 0.7 ? '🌟' : score / questions.length >= 0.5 ? '👍' : '📘'}
          </div>

          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Test Tamamlandı &bull; 6. Hafta
            </span>
            <div className="text-3xl sm:text-4xl font-black text-teal-700 pt-2">
              {score} / {questions.length} Doğru
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800">
              {score / questions.length >= 0.9 
                ? 'Harika! Tam bir donanım uzmanısın!'
                : score / questions.length >= 0.7
                ? 'Çok iyi! Konuyu iyi öğrenmişsin.'
                : score / questions.length >= 0.5
                ? 'İyi gidiyorsun! Biraz daha tekrar edelim.'
                : 'Hadi birlikte tekrar edelim, bir dahaki sefere daha iyi olacak!'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Başarı Oranı: %{Math.round((score / questions.length) * 100)} &bull; Kazanım: BTY.5.1.5
            </p>
          </div>

          {/* Missed Questions Review */}
          {missedQuestions.length > 0 && (
            <div className="text-left bg-rose-50/70 border-2 border-rose-200 rounded-2xl p-4 sm:p-5 space-y-2 max-w-2xl mx-auto">
              <div className="font-black text-sm text-rose-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-rose-600" />
                <span>Tekrar Edelim &amp; Öğrenelim ({missedQuestions.length} soru):</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pl-2">
                {missedQuestions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span><strong>{q.q}</strong>: {q.e}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleRestart(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Testi Tekrar Çöz (Karışık)</span>
            </button>

            <button
              onClick={() => handleRestart(false)}
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition flex items-center gap-2 border border-slate-300 cursor-pointer"
            >
              <span>Sırayla Çöz</span>
            </button>

            {onBackToTests && (
              <button
                onClick={onBackToTests}
                className="px-6 py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold text-xs sm:text-sm transition flex items-center gap-2 border border-indigo-200 cursor-pointer"
              >
                <span>Tüm Testlere Dön</span>
              </button>
            )}
          </div>

        </div>
      )}

      {/* Image Zoom Modal */}
      {isImageZoomed && currentQ && (
        <div 
          onClick={() => setIsImageZoomed(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="bg-white rounded-3xl p-5 max-w-lg w-full text-center space-y-3 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-bold text-xs text-slate-700">{currentQ.q}</span>
              <button onClick={() => setIsImageZoomed(false)} className="text-slate-500 hover:text-slate-800 font-black p-1">✕</button>
            </div>
            <div className="p-2 bg-slate-50 rounded-2xl flex items-center justify-center min-h-[260px]">
              <img src={currentImageSrc} alt={currentQ.q} className="max-w-full max-h-[360px] object-contain rounded-xl" />
            </div>
            <button 
              onClick={() => setIsImageZoomed(false)}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
