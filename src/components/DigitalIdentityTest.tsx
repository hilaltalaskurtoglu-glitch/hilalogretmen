import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Trophy, BookOpen, ExternalLink, Download } from 'lucide-react';

interface Question {
  q: string;
  o: string[];
  c: number;
  e: string;
}

const QUESTIONS: Question[] = [
  {
    q: "Bir kişinin internetteki kullanıcı adı, profil bilgileri ve paylaşımlarının bütününe ne denir?",
    o: ["Dijital ayak izi", "Dijital kimlik", "Ekran süresi", "Bulut depolama"],
    c: 1,
    e: "Dijital kimlik; çevrim içi ortamda bizi temsil eden kullanıcı adı, profil bilgisi ve paylaşımların bütünüdür."
  },
  {
    q: "Aşağıdakilerden hangisi dijital kimliğimizin bir parçasıdır?",
    o: ["Çantamızdaki defter", "Oyun hesabındaki kullanıcı adımız ve profil fotoğrafımız", "Sınıftaki sıramız", "Okul formamız"],
    c: 1,
    e: "Sosyal medya, oyun ve diğer platformlardaki kullanıcı adı, fotoğraf ve paylaşımlar dijital kimliğimizi oluşturur."
  },
  {
    q: "Yaptığımız aramalar, gezdiğimiz siteler ve paylaşımlarımızla çevrim içi ortamda bıraktığımız izlere ne denir?",
    o: ["Dijital ayak izi", "İşletim sistemi", "Dosya uzantısı", "Yazılım güncellemesi"],
    c: 0,
    e: "Bilerek ya da bilmeyerek bıraktığımız bu izlere dijital ayak izi denir."
  },
  {
    q: "İnternette bir şey paylaşmadan önce neden iki kez düşünmeliyiz?",
    o: [
      "Paylaşımlar bir gün sonra kendiliğinden silinir.",
      "Paylaşımlar yalnızca bizim görebileceğimiz yerde durur.",
      "Paylaşımlar uzun süre kalabilir ve birçok kişi tarafından görülebilir.",
      "Paylaşımların hiçbir etkisi olmaz."
    ],
    c: 2,
    e: "Dijital ortamdaki paylaşımlar kalıcı olabilir ve çok kişi görebilir. Bu yüzden paylaşmadan önce düşünmeliyiz."
  },
  {
    q: "Aşağıdakilerden hangisi en güçlü şifredir?",
    o: ["123456", "okulum", "ahmet2014", "Mv7!kT#92q"],
    c: 3,
    e: "Güçlü şifre; büyük-küçük harf, rakam ve özel karakter içerir ve kişisel bilgi barındırmaz."
  },
  {
    q: "Giriş şifreni kiminle paylaşmalısın?",
    o: ["En yakın arkadaşımla", "Sınıftaki herkesle", "Kimseyle paylaşmamalıyım", "Oyunda tanıştığım biriyle"],
    c: 2,
    e: "Şifre kişiseldir. Arkadaşlarımızla bile paylaşmamalıyız."
  },
  {
    q: "Tanımadığın biri mesaj atıp ev adresini ve telefon numaranı isterse ne yapmalısın?",
    o: [
      "Hemen verirsin",
      "Vermez, ailene veya öğretmenine haber verirsin",
      "Sadece adresini verirsin",
      "Mesajı cevaplayıp onunla sohbet edersin"
    ],
    c: 1,
    e: "Kişisel bilgiler tanımadığımız kişilerle paylaşılmaz. Güvendiğimiz bir yetişkine haber vermeliyiz."
  },
  {
    q: "Bir yapay zekâ uygulamasına adını, adresini, fotoğraflarını veya ailenle ilgili bilgileri vermek için ne yapmalısın?",
    o: [
      "İstediği her şeyi vermeliyim",
      "Arkadaşlarım veriyorsa vermeliyim",
      "İzinsiz hiçbir bilgi vermemeliyim",
      "Sadece fotoğraf vermem yeterli"
    ],
    c: 2,
    e: "Bu bilgileri hiçbir yapay zekâ uygulamasına izinsiz vermemeliyiz. Son karar her zaman yetişkinlerindir (aile ve öğretmenler)."
  },
  {
    q: "EBA ile ders videosu izlemek hangi dijital vatandaşlık uygulama alanına girer?",
    o: ["Sağlık", "Alışveriş", "Eğitim", "E-Devlet"],
    c: 2,
    e: "EBA bir eğitim uygulamasıdır. MHRS sağlık, e-Devlet ise kamu hizmetleri alanına girer."
  },
  {
    q: "Sosyal medyada seni rahatsız eden bir durumla ya da güvenlik sorunuyla karşılaşırsan ne yapmalısın?",
    o: [
      "Kimseye söylemeden kendim çözerim",
      "Güvendiğim aile bireyine, öğretmenime veya rehber öğretmenime başvururum",
      "İnternetteki yabancılara danışırım",
      "Hiçbir şey yapmam"
    ],
    c: 1,
    e: "Böyle bir durumda aile, öğretmen veya okul rehberlik servisi gibi güvenilir kişilere başvurmalıyız."
  }
];

const LETTERS = ['A', 'B', 'C', 'D'];

interface DigitalIdentityTestProps {
  onBack?: () => void;
}

export const DigitalIdentityTest: React.FC<DigitalIdentityTestProps> = ({ onBack }) => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUESTIONS[index];
  const progressPercent = ((index) / QUESTIONS.length) * 100;

  const handlePick = (k: number) => {
    if (isAnswered) return;
    setSelectedOption(k);
    setIsAnswered(true);
    if (k === currentQ.c) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (index + 1 < QUESTIONS.length) {
      setIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsFinished(false);
  };

  const getMedalInfo = () => {
    if (score >= 9) return { medal: '🏅', msg: 'Harika! Tam bir dijital kimlik uzmanısın!' };
    if (score >= 7) return { medal: '🌟', msg: 'Çok iyi! Dijital kimliğini iyi koruyorsun.' };
    if (score >= 5) return { medal: '👍', msg: 'İyi gidiyorsun! Konuyu biraz daha tekrar edelim.' };
    return { medal: '📘', msg: 'Hadi birlikte konuyu tekrar edelim, bir dahaki sefere daha iyi olacak!' };
  };

  return (
    <div className="bg-white border-2 border-teal-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-5">
      {/* Üst Şerit */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-teal-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-teal-100 text-teal-900 border border-teal-200">
              3. Hafta Testi
            </span>
            <span className="text-xs font-bold text-slate-500">
              Kazanım: BTY.5.1.3
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5">
            Dijital Kimlik &amp; Siber Ayak İzi Testi
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            5. Sınıf Bilişim Teknolojileri ve Yazılım Dersi
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isFinished && (
            <span className="px-4 py-1.5 rounded-full bg-teal-50 border-2 border-teal-400 font-black text-sm text-teal-900">
              {index + 1} / {QUESTIONS.length}
            </span>
          )}

          <a
            href="/test-3-hafta-dijital-kimlik.html"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            title="Ayrı sekmede tam sayfa aç"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="/test-3-hafta-dijital-kimlik.html"
            download="3_Hafta_Dijital_Kimlik_Testi.html"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            title="HTML dosyasını indir"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* İlerleme Çubuğu */}
      <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
        <div
          className="h-full bg-gradient-to-r from-teal-400 to-sky-500 transition-all duration-300"
          style={{ width: `${isFinished ? 100 : progressPercent}%` }}
        />
      </div>

      {/* Test Gövdesi veya Sonuç */}
      {!isFinished ? (
        <div className="space-y-5 pt-2">
          {/* Soru Kutusu */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-teal-50/50 to-sky-50/50 border border-teal-200">
            <h4 className="text-lg sm:text-xl font-black text-slate-800 leading-snug">
              {currentQ.q}
            </h4>
          </div>

          {/* Şıklar */}
          <div className="grid grid-cols-1 gap-3">
            {currentQ.o.map((optText, k) => {
              const isCorrectAnswer = k === currentQ.c;
              const isChosen = selectedOption === k;

              let btnStyle = 'bg-white hover:bg-teal-50/50 border-slate-200 text-slate-800 hover:border-teal-400';
              if (isAnswered) {
                if (isCorrectAnswer) {
                  btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300';
                } else if (isChosen) {
                  btnStyle = 'bg-rose-100 border-rose-500 text-rose-950 ring-2 ring-rose-300';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={k}
                  disabled={isAnswered}
                  onClick={() => handlePick(k)}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 font-bold text-sm sm:text-base text-left transition-all flex items-center gap-3.5 cursor-pointer ${btnStyle}`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                    isAnswered && isCorrectAnswer
                      ? 'bg-emerald-600 text-white'
                      : isAnswered && isChosen
                      ? 'bg-rose-600 text-white'
                      : 'bg-teal-600 text-white'
                  }`}>
                    {LETTERS[k]}
                  </span>
                  <span className="flex-1">{optText}</span>
                  {isAnswered && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isChosen && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Dönüt Kutusu */}
          {isAnswered && (
            <div className={`p-4 rounded-2xl border-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in duration-200 ${
              selectedOption === currentQ.c
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}>
              <div className="space-y-1">
                <div className="font-black text-sm flex items-center gap-1.5">
                  {selectedOption === currentQ.c ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Doğru!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Yanlış.</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-medium opacity-90 leading-relaxed">
                  {currentQ.e}
                </p>
              </div>

              <button
                onClick={handleNext}
                className="py-2.5 px-6 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-black text-xs sm:text-sm shrink-0 self-end sm:self-center transition shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>{index === QUESTIONS.length - 1 ? 'Sonucu Gör' : 'Sonraki Soru'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Bitiş / Sonuç Ekranı */
        <div className="text-center py-6 space-y-4 animate-in fade-in duration-200">
          <div className="text-6xl animate-bounce">
            {getMedalInfo().medal}
          </div>
          <div className="space-y-1">
            <h4 className="text-2xl sm:text-3xl font-black text-teal-900">
              Puanınız: {score} / {QUESTIONS.length}
            </h4>
            <p className="text-sm sm:text-base text-slate-700 font-bold max-w-md mx-auto">
              {getMedalInfo().msg}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={handleReset}
              className="py-3 px-6 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black text-sm transition shadow-md flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Testi Tekrar Çöz</span>
            </button>
            {onBack && (
              <button
                onClick={onBack}
                className="py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition cursor-pointer"
              >
                Testler Listesine Dön
              </button>
            )}
          </div>
        </div>
      )}

      {/* Dipnot */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
        <span>Kazanım: BTY.5.1.3 – Dijital kimlik ve ayak izi kavramlarını analiz edebilme</span>
        <span className="font-bold text-teal-800">Hilal KURTOĞLU &bull; BTY Öğretmeni</span>
      </div>
    </div>
  );
};
