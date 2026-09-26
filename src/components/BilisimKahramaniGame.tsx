import React, { useState, useEffect } from 'react';
import { Award, RotateCcw, Printer, Play, CheckCircle2, XCircle, Sparkles, Trophy, ArrowRight, Shield, Monitor, Keyboard, Folder, Users } from 'lucide-react';

interface Question {
  scenario: string;
  q: string;
  options: string[];
  correct: number;
  fb: string;
}

interface Level {
  name: string;
  icon: string;
  lucideIcon?: any;
  questions: Question[];
}

const GAME_LEVELS: Level[] = [
  {
    name: "Doğru Duruş ve Ekran Sağlığı",
    icon: "🖥️",
    questions: [
      {
        scenario: "🪑",
        q: "Bilgisayar başında otururken sırtımızı nasıl tutmalıyız?",
        options: ["Dik ve sandalyeye yaslanarak", "Öne doğru eğilerek", "Bacaklarımızı sandalyeye çekerek", "Yan yatarak"],
        correct: 0,
        fb: "Sırtımızı dik tutup sandalyeye yaslanmak omurgamızı korur ve daha rahat çalışmamızı sağlar."
      },
      {
        scenario: "👀",
        q: "Ekrana çok uzun süre bakan gözlerimiz yorulmasın diye ne yapmalıyız?",
        options: ["Işıkları tamamen kapatmalıyız", "Arada uzağa bakıp gözümüzü dinlendirmeliyiz", "Ekrana daha da yaklaşmalıyız", "Hiç göz kırpmamalıyız"],
        correct: 1,
        fb: "Her 20 dakikada bir, 20 saniye uzağa bakmak gözlerimizi dinlendirir. Buna 20-20-20 kuralı denir."
      },
      {
        scenario: "📏",
        q: "Ekranla aramızda olması gereken uzaklık hakkında hangisi doğrudur?",
        options: ["Ekrana burnumuz değecek kadar yakın olmalı", "Kol mesafesinde, rahat görebileceğimiz kadar olmalı", "Uzaklığın önemi yoktur", "Ekranı hiç görmeden kullanmalıyız"],
        correct: 1,
        fb: "Ekranla aramızda yaklaşık bir kol mesafesi (50-70 cm) bırakmak göz sağlığımız için en uygundur."
      },
      {
        scenario: "⏰",
        q: "Uzun süre bilgisayar kullanırken ne yapmak doğru olur?",
        options: ["Hiç ara vermeden kullanmaya devam etmek", "Belirli aralıklarla kalkıp kısa molalar vermek", "Işıkları kapatıp karanlıkta kullanmak", "Ekranı olabildiğince parlak yapmak"],
        correct: 1,
        fb: "Düzenli aralıklarla kalkıp esnemek, hem gözlerimizi hem de vücudumuzu dinlendirir."
      },
      {
        scenario: "💡",
        q: "Bilgisayar kullanırken ortamın ışığı nasıl olmalıdır?",
        options: ["Tamamen karanlık olmalı", "Ekranı yansıtmayacak, yeterli aydınlıkta olmalı", "Sadece ekran ışığı yeterlidir", "Işık hiç önemli değildir"],
        correct: 1,
        fb: "Odanın yeterince aydınlık olması, göz yorgunluğunu azaltır ve ekrandaki yansımayı engeller."
      }
    ]
  },
  {
    name: "Klavye ve Fare Kullanımı",
    icon: "⌨️",
    questions: [
      {
        scenario: "⌨️",
        q: "Klavyeyi kullanırken parmaklarımızı nasıl tutmalıyız?",
        options: ["Tüm parmaklarımızla tek bir tuşa basarak", "Doğru parmak konumunda, hafifçe kavisli tutarak", "Yumruk yaparak", "Bir elimizi hiç kullanmadan"],
        correct: 1,
        fb: "Parmakları doğru konumda ve hafif kavisli tutmak, daha hızlı ve yorulmadan yazmamızı sağlar."
      },
      {
        scenario: "🖱️",
        q: "Fareyi kullanırken bileğimizi nasıl tutmalıyız?",
        options: ["Masaya sert şekilde bastırarak", "Rahat ve düz bir şekilde, gereksiz gerginlik olmadan", "Havada tamamen boşta tutarak", "Fareyi sıkıca sıkarak"],
        correct: 1,
        fb: "Bileği rahat ve düz tutmak, uzun süreli kullanımda bilek ağrısı ve yorgunluğu önler."
      },
      {
        scenario: "🔠",
        q: "Bir yazıyı büyük harfle başlatmak için hangi tuşu kullanırız?",
        options: ["Ctrl", "Shift", "Alt", "Tab"],
        correct: 1,
        fb: "Shift tuşuna basılı tutarak harfe bastığımızda harf büyük çıkar. Tüm harfleri büyük yazmak içinse Caps Lock kullanılır."
      },
      {
        scenario: "📋",
        q: "Bir yazıyı kopyalamak için hangi kısayolu kullanırız?",
        options: ["Ctrl + C", "Ctrl + Z", "Ctrl + P", "Ctrl + S"],
        correct: 0,
        fb: "Ctrl + C kopyalama (Copy), Ctrl + V ise yapıştırma kısayoludur."
      },
      {
        scenario: "💾",
        q: "Üzerinde çalıştığımız bir dosyayı kaydetmek için hangi kısayolu kullanabiliriz?",
        options: ["Ctrl + S", "Ctrl + X", "Ctrl + A", "Ctrl + B"],
        correct: 0,
        fb: "Ctrl + S (Save) kısayolu, çalışmamızı hızlıca kaydetmemizi sağlar. Sık kaydetmek veri kaybını önler."
      }
    ]
  },
  {
    name: "Dosya ve Klasör Yönetimi",
    icon: "📁",
    questions: [
      {
        scenario: "🗂️",
        q: "Okul ödevlerimizi bilgisayarda düzenli tutmak için ne yapmalıyız?",
        options: ["Hepsini masaüstüne dağıtık şekilde bırakmalıyız", "Konularına göre klasörler oluşturup düzenlemeliyiz", "Dosyalara rastgele isimler vermeliyiz", "Hiç kaydetmemeliyiz"],
        correct: 1,
        fb: "Derslere ve konulara göre klasörler oluşturmak, aradığımız dosyayı saniyeler içinde bulmamızı sağlar."
      },
      {
        scenario: "🏷️",
        q: "Bir dosyaya isim verirken en doğru yaklaşım hangisidir?",
        options: ["'dosya1' gibi anlamsız bir isim vermek", "İçeriğini anlatan, anlaşılır bir isim vermek", "İsim vermeden kaydetmek", "Sadece sayı kullanmak"],
        correct: 1,
        fb: "İçeriği yansıtan anlaşılır isimler vermek, dosyanın ne olduğunu hemen anlamamızı sağlar."
      },
      {
        scenario: "🗑️",
        q: "Artık ihtiyacımız olmayan bir dosyayı sildiğimizde ilk olarak nereye gider?",
        options: ["Tamamen ve anında yok olur", "Geri Dönüşüm Kutusu'na gider", "Başka bir bilgisayara gider", "Otomatik olarak yazdırılır"],
        correct: 1,
        fb: "Silinen dosyalar geçici olarak Geri Dönüşüm Kutusu'nda saklanır; gerekirse oradan geri kurtarılabilir."
      },
      {
        scenario: "📤",
        q: "Bir dosyayı yanlışlıkla sildiysek ne yapabiliriz?",
        options: ["Hiçbir şey yapamayız", "Geri Dönüşüm Kutusu'ndan geri yükleyebiliriz", "Bilgisayarı kapatmalıyız", "Yeni bir bilgisayar almalıyız"],
        correct: 1,
        fb: "Geri Dönüşüm Kutusu'nu açıp dosyayı seçerek 'Geri Yükle' komutunu verebiliriz."
      },
      {
        scenario: "🧩",
        q: "Bir klasörün içine başka klasörler koymamızın faydası nedir?",
        options: ["Bilgisayarı yavaşlatır", "Dosyaları daha düzenli ve kategorili tutar", "Hiçbir faydası yoktur", "Dosyaları görünmez yapar"],
        correct: 1,
        fb: "Alt klasörler (Sub-folders) oluşturmak, çok sayıda belgeyi hiyerarşik biçimde sınıflandırmamızı sağlar."
      }
    ]
  },
  {
    name: "İnternette Güvenlik",
    icon: "🔒",
    questions: [
      {
        scenario: "🙈",
        q: "İnternette tanımadığımız biriyle konuşurken ne paylaşmamalıyız?",
        options: ["Sevdiğimiz oyunları", "Adres, telefon numarası gibi kişisel bilgileri", "Sevdiğimiz renkleri", "Hava durumu hakkındaki düşüncelerimizi"],
        correct: 1,
        fb: "Adres, telefon, TC kimlik ve okul bilgileri gibi kişisel veriler yabancılarla asla paylaşılmamalıdır!"
      },
      {
        scenario: "🔑",
        q: "Güçlü bir şifre nasıl olmalıdır?",
        options: ["Sadece adımızdan oluşmalı", "Harf, rakam ve sembol içeren, tahmin edilmesi zor olmalı", "123456 gibi basit olmalı", "Herkesle paylaşılmalı"],
        correct: 1,
        fb: "Güçlü şifreler büyük-küçük harf, sayı ve özel karakter içerir; doğum yılı gibi kolay tahminler içermez."
      },
      {
        scenario: "❗",
        q: "İnternette bizi rahatsız eden ya da korkutan bir durumla karşılaşırsak ne yapmalıyız?",
        options: ["Kimseye söylemeden devam etmeliyiz", "Hemen bir yetişkine (öğretmen/aile) haber vermeliyiz", "Karşımızdaki kişiyle buluşmayı kabul etmeliyiz", "Hesabımızı hiç kapatmamalıyız"],
        correct: 1,
        fb: "Güvenmediğimiz veya rahatsız edici bir durumda mutlaka ailemize ya da öğretmenimize haber vermeliyiz."
      },
      {
        scenario: "🌐",
        q: "İnternetten bilgi araştırırken nasıl bir kaynak kullanmalıyız?",
        options: ["İlk çıkan her siteye güvenmeliyiz", "Güvenilir ve doğruluğu bilinen kaynakları tercih etmeliyiz", "Kaynağın önemi yoktur", "Sadece sosyal medya yorumlarına bakmalıyız"],
        correct: 1,
        fb: "Bilimsel, resmî (.gov.tr, .edu.tr) ve güvenilir kaynakları tercih etmek en doğru bilgiyi sunar."
      },
      {
        scenario: "👤",
        q: "Sosyal medya veya oyun hesabı açarken kimin izni gereklidir?",
        options: ["Kimsenin izni gerekmez", "Ailemizin bilgisi ve izni gerekir", "Sadece arkadaşımızın izni yeterlidir", "Öğretmenin izni hiç gerekmez"],
        correct: 1,
        fb: "Çevrim içi hesaplar açmadan ve uygulamalar indirmeden önce ailemizin onayı şarttır."
      }
    ]
  },
  {
    name: "Dijital Görgü ve Paylaşım",
    icon: "🤝",
    questions: [
      {
        scenario: "💬",
        q: "İnternette ya da oyun içi sohbette birine mesaj yazarken nasıl olmalıyız?",
        options: ["Kaba ve alay edici olabiliriz, kimse görmez", "Karşımızdakine saygılı ve kibar olmalıyız", "İstediğimiz kelimeleri kullanabiliriz", "Sürekli büyük harfle bağırarak yazmalıyız"],
        correct: 1,
        fb: "Ekranın diğer tarafında gerçek bir insan olduğunu unutmadan daima nezaketli ve saygılı olmalıyız."
      },
      {
        scenario: "😢",
        q: "Bir arkadaşımızın internette alay edildiğini ya da kötü söz duyduğunu görürsek ne yapmalıyız?",
        options: ["İzleyip hiçbir şey yapmamalıyız", "Ona destek olmalı ve bir yetişkine haber vermeliyiz", "Biz de alaya katılmalıyız", "Durumu görmezden gelmeliyiz"],
        correct: 1,
        fb: "Siber zorbalığa tanık olduğumuzda sessiz kalmamalı, arkadaşımıza destek olmalı ve bir büyüğe bildirmeliyiz."
      },
      {
        scenario: "©️",
        q: "Başkasının çizdiği bir resmi ya da yazdığı bir yazıyı kendi ödevimiz gibi göstermek doğru mudur?",
        options: ["Evet, kimse anlamaz", "Hayır, başkasının emeğine saygı göstermeliyiz", "Sadece küçük ödevlerde olur", "Öğretmen izin verirse olur"],
        correct: 1,
        fb: "Başkalarının emek ürünlerini kaynak göstermeden sahiplenmek telif ihlalidir. Emeğe saygı esastır."
      },
      {
        scenario: "📸",
        q: "Bir arkadaşımızın fotoğrafını onun izni olmadan internette paylaşabilir miyiz?",
        options: ["Evet, istediğimiz zaman paylaşabiliriz", "Hayır, önce izin almalıyız", "Sadece gece paylaşırsak sorun olmaz", "Sadece gülümsüyorsa paylaşabiliriz"],
        correct: 1,
        fb: "Fotoğraf veya video paylaşmadan önce mutlaka ilgili kişinin ve ailesinin rızası alınmalıdır."
      },
      {
        scenario: "🎮",
        q: "Ekran başında geçirdiğimiz süre ile ilgili en doğru davranış hangisidir?",
        options: ["Aileyle belirlenen süreye uymak ve dengeli kullanmak", "Bütün gün ekran başında kalmak", "Hiç kural tanımamak", "Süreyi hiç düşünmemek"],
        correct: 0,
        fb: "Teknoloji kullanımını kitap okuma, spor ve aile zamanı ile dengelemek en sağlıklı yaklaşımdır."
      }
    ]
  }
];

export const BilisimKahramaniGame: React.FC<{ onBackToHome?: () => void }> = () => {
  const [screen, setScreen] = useState<'start' | 'game' | 'levelup' | 'final'>('start');
  const [levelIndex, setLevelIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [speech, setSpeech] = useState('Hazır mısın? Akıllı tahtaya dokunarak ya da fareyle doğru cevabı seç!');

  const maxScore = GAME_LEVELS.reduce((acc, l) => acc + l.questions.length * 10, 0);

  const correctSpeech = [
    "Harika, doğru cevap! 🎉",
    "Süpersin Bilişim Kahramanı! 🌟",
    "Aferin, tam isabet! ✅",
    "Bravo, teknolojiyi çok iyi biliyorsun! 💪"
  ];
  const wrongSpeech = [
    "Olsun, birlikte öğreniyoruz! 💡",
    "Açıklamayı dikkatlice oku, sıradakini yakalayacaksın! 📖",
    "Pes etmek yok, Bilişim Kahramanları öğrenerek güçlenir! 🙂"
  ];

  const currentLevel = GAME_LEVELS[levelIndex];
  const currentQ = currentLevel.questions[qIndex];

  const handleStart = (startLevelIdx = 0) => {
    setLevelIndex(startLevelIdx);
    setQIndex(0);
    setScore(startLevelIdx === 0 ? 0 : score);
    setSelectedOption(null);
    setHasAnswered(false);
    setSpeech('Hazır mısın? Doğru cevabı seç!');
    setScreen('game');
  };

  const handleAnswer = (optionIdx: number) => {
    if (hasAnswered) return;
    setSelectedOption(optionIdx);
    setHasAnswered(true);

    const isCorrect = optionIdx === currentQ.correct;
    if (isCorrect) {
      setScore(prev => prev + 10);
      setSpeech(correctSpeech[Math.floor(Math.random() * correctSpeech.length)]);
    } else {
      setSpeech(wrongSpeech[Math.floor(Math.random() * wrongSpeech.length)]);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setHasAnswered(false);
    if (qIndex + 1 < currentLevel.questions.length) {
      setQIndex(prev => prev + 1);
      setSpeech('Sıradaki soru geliyor, dikkatle incele!');
    } else {
      setScreen('levelup');
    }
  };

  const handleContinueNextLevel = () => {
    if (levelIndex + 1 < GAME_LEVELS.length) {
      setLevelIndex(prev => prev + 1);
      setQIndex(0);
      setSelectedOption(null);
      setHasAnswered(false);
      setSpeech('Yeni bölüme hoş geldin! Görevleri tamamlamaya devam et.');
      setScreen('game');
    } else {
      setScreen('final');
    }
  };

  const getRankTitle = (percentage: number) => {
    if (percentage >= 90) return "🌟 Efsanevi Bilişim Kahramanı";
    if (percentage >= 70) return "⚡ Usta Bilişim Kahramanı";
    if (percentage >= 50) return "🛡️ Bilişim Kalfası";
    return "🌱 Bilişim Çırağı";
  };

  const percentage = Math.round((score / maxScore) * 100);

  return (
    <div className="w-full max-w-5xl mx-auto my-2 bg-white rounded-3xl border-2 border-pink-200/90 shadow-lg overflow-hidden text-slate-800">
      {/* Top Header inside game frame */}
      <div className="bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-xs border border-white/40">
            🤖
          </div>
          <div>
            <div className="font-black text-base md:text-lg tracking-wide flex items-center gap-2">
              Bilişim Kahramanı Oyunu
              <span className="text-[11px] uppercase bg-white/25 text-white font-bold px-2 py-0.5 rounded-full border border-white/30">
                5. Sınıf
              </span>
            </div>
            <p className="text-[11px] text-pink-100 font-medium">Hilal KURTOĞLU &bull; Bilgisayar ve Öğretim Teknolojileri Öğretmeni</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="bg-white/20 backdrop-blur-xs border border-white/30 px-3.5 py-1.5 rounded-xl font-bold text-sm md:text-base flex items-center gap-1.5 text-white shadow-xs">
            <span>⭐ Puan:</span>
            <span className="text-yellow-200 text-lg font-black">{score}</span>
          </div>

          {screen !== 'start' && (
            <button
              onClick={() => setScreen('start')}
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 border border-white/30"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Menü
            </button>
          )}
        </div>
      </div>

      {/* Main Game Stage */}
      <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-b from-white via-pink-50/20 to-blue-50/30 min-h-[480px] flex flex-col justify-center">
        {/* START SCREEN */}
        {screen === 'start' && (
          <div className="max-w-3xl mx-auto w-full text-center space-y-5">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-blue-100 border-2 border-pink-200 text-purple-900 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black shadow-2xs">
              <Sparkles className="w-4 h-4 text-[#EC4899]" />
              Akıllı Tahta ve Bilgisayar Uyumlu Eğitici Görevler
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
              Bilişim Kahramanı Olmaya Hazır mısın? 🚀
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Soruları oku, teknolojiyi doğru, güvenli ve sağlıklı kullanmayı öğren. Rozetleri topla ve bölüm sonu başarı belgeni kazan!
            </p>

            {/* Name Input */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-pink-200 max-w-md mx-auto shadow-xs">
              <label htmlFor="student-name-input" className="block text-sm sm:text-base font-black text-slate-800 mb-1.5">
                Öğrenci Adı Soyadı:
              </label>
              <input
                id="student-name-input"
                type="text"
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
                placeholder="Adını buraya yazabilirsin..."
                className="w-full text-center text-base sm:text-lg font-bold py-2.5 px-4 rounded-xl border-2 border-pink-200 focus:border-[#EC4899] focus:outline-none text-slate-800 bg-pink-50/30"
                maxLength={30}
              />
            </div>

            {/* Section Direct Chips */}
            <div className="text-left">
              <p className="text-center text-xs sm:text-sm font-black text-purple-900 uppercase tracking-wider mb-2.5">
                İstediğin Bölümden Başlayabilirsin:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {GAME_LEVELS.map((lvl, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleStart(idx)}
                    className="flex items-center gap-3 p-3 bg-white hover:bg-gradient-to-r hover:from-pink-50/50 hover:to-blue-50/50 border-2 border-pink-200 hover:border-purple-400 rounded-2xl text-left transition transform hover:-translate-y-0.5 shadow-2xs group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition">{lvl.icon}</span>
                    <div className="flex-1">
                      <div className="font-black text-xs sm:text-sm text-slate-800 leading-tight">{lvl.name}</div>
                      <span className="text-[11px] font-bold text-[#EC4899]">Görevi Seç &rarr;</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleStart(0)}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] hover:opacity-95 text-white text-base sm:text-lg font-black rounded-2xl shadow-md hover:shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2.5 mx-auto"
              >
                <Play className="w-5 h-5 fill-current" />
                Maceraya 1. Bölümden Başla
              </button>
            </div>
          </div>
        )}

        {/* QUESTION / GAMEPLAY SCREEN */}
        {screen === 'game' && (
          <div className="w-full max-w-3xl mx-auto space-y-4 sm:space-y-5">
            {/* Level Selector Dots */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {GAME_LEVELS.map((lvl, idx) => {
                const isCurrent = idx === levelIndex;
                const isPassed = idx < levelIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setLevelIndex(idx);
                      setQIndex(0);
                      setSelectedOption(null);
                      setHasAnswered(false);
                    }}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base transition border-2 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white border-purple-500 scale-105 shadow-xs ring-4 ring-pink-300/40'
                        : isPassed
                        ? 'bg-[#10B981] text-white border-[#059669]'
                        : 'bg-white text-slate-700 border-pink-200 hover:border-purple-400'
                    }`}
                    title={lvl.name}
                  >
                    {lvl.icon}
                  </button>
                );
              })}
            </div>

            {/* Level Title & Question Number */}
            <div className="text-center">
              <span className="inline-block bg-gradient-to-r from-pink-100 to-blue-100 text-purple-900 font-black text-xs sm:text-sm px-3.5 py-1 rounded-full border border-pink-200">
                {currentLevel.icon} {currentLevel.name} &bull; Soru {qIndex + 1} / {currentLevel.questions.length}
              </span>
              {/* Progress bar */}
              <div className="w-full bg-pink-100 h-2.5 rounded-full overflow-hidden mt-2">
                <div
                  className="bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((qIndex + 1) / currentLevel.questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Mascot Robot Speech Box */}
            <div className="bg-white border-2 border-pink-200 rounded-2xl p-3 sm:p-4 flex items-center gap-3 shadow-xs">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#EC4899] to-[#3B82F6] text-white flex items-center justify-center text-2xl shrink-0 shadow-xs">
                🤖
              </div>
              <div className="bg-pink-50/60 border border-pink-200 px-3.5 py-2 rounded-xl text-purple-950 font-bold text-xs sm:text-sm md:text-base flex-1">
                {speech}
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white border-2 border-pink-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs space-y-4">
              <div className="text-center space-y-1.5">
                <div className="text-4xl">{currentQ.scenario}</div>
                <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-800 leading-snug">
                  {currentQ.q}
                </h3>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {currentQ.options.map((opt, optIdx) => {
                  const letters = ["A", "B", "C", "D"];
                  const isSelected = selectedOption === optIdx;
                  const isCorrect = optIdx === currentQ.correct;

                  let btnStyle = "bg-white border-2 border-pink-200/80 hover:bg-pink-50/50 hover:border-purple-400 text-slate-800";
                  if (hasAnswered) {
                    if (isCorrect) {
                      btnStyle = "bg-[#ECFDF5] border-2 border-[#10B981] text-[#065F46] shadow-xs";
                    } else if (isSelected && !isCorrect) {
                      btnStyle = "bg-[#FEF2F2] border-2 border-red-400 text-red-800";
                    } else {
                      btnStyle = "bg-slate-50 border-2 border-slate-200 text-slate-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={hasAnswered}
                      onClick={() => handleAnswer(optIdx)}
                      className={`p-3.5 sm:p-4 rounded-xl text-left font-bold text-sm sm:text-base transition flex items-center gap-2.5 active:scale-[0.98] ${btnStyle}`}
                    >
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                        hasAnswered && isCorrect ? 'bg-[#10B981] text-white' : 'bg-gradient-to-r from-pink-100 to-blue-100 text-purple-900 border border-pink-200'
                      }`}>
                        {letters[optIdx]}
                      </span>
                      <span className="flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next button */}
              {hasAnswered && (
                <div className="space-y-3 pt-2">
                  <div className={`p-3.5 rounded-xl text-xs sm:text-sm md:text-base font-semibold flex items-start gap-2.5 ${
                    selectedOption === currentQ.correct
                      ? 'bg-[#ECFDF5] text-[#065F46] border border-[#10B981]/40'
                      : 'bg-[#FEF2F2] text-red-800 border border-red-200'
                  }`}>
                    {selectedOption === currentQ.correct ? (
                      <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-black">
                        {selectedOption === currentQ.correct ? "Tebrikler, doğru cevap! 🎉" : `Doğru Cevap: ${currentQ.options[currentQ.correct]}`}
                      </p>
                      <p className="text-xs sm:text-sm mt-0.5 text-slate-700">{currentQ.fb}</p>
                    </div>
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-3.5 bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] hover:opacity-95 text-white text-base font-black rounded-xl shadow-xs transition flex items-center justify-center gap-2"
                  >
                    <span>{qIndex + 1 < currentLevel.questions.length ? "Sıradaki Soruya Geç" : "Bölümü Tamamla"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* LEVEL UP SCREEN */}
        {screen === 'levelup' && (
          <div className="max-w-md mx-auto w-full text-center bg-white p-6 sm:p-8 rounded-3xl border-2 border-pink-200 shadow-sm space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-pink-200 to-blue-200 border-4 border-white shadow-md flex items-center justify-center text-4xl">
              {currentLevel.icon}
            </div>

            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-purple-900 bg-gradient-to-r from-pink-100 to-blue-100 px-3 py-1 rounded-full border border-pink-200">
                Bölüm Başarıyla Bitti!
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-2">
                {currentLevel.name}
              </h3>
              <p className="text-sm text-slate-600 mt-1.5">
                Tebrikler! Bu bölümdeki tüm soruları tamamladın ve rozeti kazandın. Güncel Puanın: <span className="font-black text-[#EC4899]">{score}</span>
              </p>
            </div>

            <button
              onClick={handleContinueNextLevel}
              className="w-full py-3.5 bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] text-white text-base font-black rounded-xl shadow-xs transition flex items-center justify-center gap-2 hover:opacity-95"
            >
              <span>{levelIndex + 1 < GAME_LEVELS.length ? "Sonraki Bölüme Geç" : "Başarı Belgemi Gör"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* FINAL CERTIFICATE SCREEN */}
        {screen === 'final' && (
          <div className="max-w-2xl mx-auto w-full space-y-4">
            <div className="bg-white border-4 border-purple-500 p-6 sm:p-8 md:p-10 rounded-3xl text-center relative shadow-md space-y-4 print:border-2">
              <div className="flex items-center justify-center gap-2 text-purple-800 font-black text-xs tracking-widest uppercase">
                <Trophy className="w-4 h-4 text-[#EC4899]" />
                AHİ EVRAN ORTAOKULU &bull; BİLİŞİM TEKNOLOJİLERİ VE YAZILIM
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                BAŞARI BELGESİ
              </h2>

              <div className="py-2.5 border-y-2 border-dashed border-pink-200 space-y-1.5">
                <p className="text-xs font-semibold text-slate-500">Bu Belge;</p>
                <h3 className="text-2xl sm:text-3xl font-black text-purple-700">
                  {playerName.trim() || "Değerli Öğrencimiz"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                  5. Sınıf Bilişim Teknolojileri ve Yazılım dersi "Bilişim Kahramanı" eğitsel oyunundaki tüm görevleri başarıyla tamamlamıştır.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 flex-wrap">
                <div className="bg-gradient-to-r from-pink-100 to-blue-100 px-3.5 py-1.5 rounded-xl text-xs font-bold text-purple-900 border border-pink-200">
                  {getRankTitle(percentage)}
                </div>
                <div className="bg-[#ECFDF5] px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#065F46] border border-[#A7F3D0]">
                  Toplam Puan: {score} / {maxScore} (%{percentage})
                </div>
              </div>

              {/* Signatures */}
              <div className="pt-4 flex justify-between items-end text-left border-t border-pink-100">
                <div>
                  <div className="text-[11px] text-slate-400">Tarih:</div>
                  <div className="text-xs font-bold text-slate-800">{new Date().toLocaleDateString('tr-TR')}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-800">Hilal KURTOĞLU</div>
                  <div className="text-[11px] text-purple-700">Bilgisayar ve Öğretim Teknolojileri Öğretmeni</div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 print:hidden">
              <button
                onClick={() => window.print()}
                className="px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold rounded-xl flex items-center gap-2 shadow-xs transition text-sm"
              >
                <Printer className="w-4 h-4" />
                Belgeyi Yazdır
              </button>

              <button
                onClick={() => handleStart(0)}
                className="px-5 py-3 bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] hover:opacity-95 text-white font-bold rounded-xl flex items-center gap-2 shadow-xs transition text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                Yeniden Oyna
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer info inside game */}
      <div className="bg-gradient-to-r from-pink-50 to-blue-50 border-t border-pink-200 px-4 py-2.5 text-center text-xs text-purple-900 font-medium">
        5. Sınıf Bilişim Teknolojileri ve Yazılım &bull; Bilişim Kahramanı &bull; Hilal KURTOĞLU
      </div>
    </div>
  );
};
