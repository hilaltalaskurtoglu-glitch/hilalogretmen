import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Quote, Sparkles, RefreshCw, Lightbulb, ShieldCheck, Heart, Coffee, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { EDUCATIONAL_QUOTES } from '../data/quotesData';
import { Material } from '../types';
import { QuickAddMaterialCard } from './QuickAddMaterialCard';

const BILISIM_TIPS = [
  {
    icon: '👀',
    title: '20-20-20 Göz Kuralı',
    desc: 'Bilgisayar başında her 20 dakikada bir, 20 saniye boyunca 20 fit (yaklaşık 6 metre) uzağa bakarak gözlerini dinlendir!'
  },
  {
    icon: '🔐',
    title: 'Güçlü Şifre Kalkanı',
    desc: 'Şifren en az 8 karakter olmalı; büyük-küçük harf, rakam ve sembol (!?#) içermeli. Asla doğum tarihini şifre yapma!'
  },
  {
    icon: '🛡️',
    title: 'Siber Nezaket ve Güvenlik',
    desc: 'Sanal dünyada da gerçek hayattaki gibi saygılı ol. Tanımadığın kişilerden gelen bağlantılara ve dosyalara tıklama!'
  },
  {
    icon: '💾',
    title: 'Düzenli Yedekleme',
    desc: 'Hazırladığın önemli ödev ve projeleri daima USB bellek veya bulut sürücüne yedeklemeyi unutma.'
  },
  {
    icon: '🪑',
    title: 'Doğru Oturuş Duruşu',
    desc: 'Sırtın dik, ekran göz hizanda ve ayakların yere tam basmalı. Bilgisayar karşısında kambur durma!'
  },
  {
    icon: '📜',
    title: 'Telif Hakkına Saygı',
    desc: 'İnternetten aldığın görsel ve bilgilerin kaynağını ödevlerinde mutlaka belirt, emeğe saygı göster!'
  }
];

interface RightSidebarPanelProps {
  smartboardMode?: boolean;
  onAddMaterial?: (newMat: Material) => void;
}

export const RightSidebarPanel: React.FC<RightSidebarPanelProps> = ({ smartboardMode, onAddMaterial }) => {
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());
  const [quoteIndex, setQuoteIndex] = useState<number>(() => Math.floor(Math.random() * EDUCATIONAL_QUOTES.length));
  const [tipIndex, setTipIndex] = useState<number>(0);
  const [isRotating, setIsRotating] = useState(false);

  // Calendar state for month navigation
  const [calendarViewDate, setCalendarViewDate] = useState<Date>(new Date());
  const [selectedDayNum, setSelectedDayNum] = useState<number>(new Date().getDate());

  // Live real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Quotes auto-rotation every 25 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % EDUCATIONAL_QUOTES.length);
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  const handleNextQuote = () => {
    setIsRotating(true);
    setQuoteIndex(prev => (prev + 1) % EDUCATIONAL_QUOTES.length);
    setTimeout(() => setIsRotating(false), 500);
  };

  const handleNextTip = () => {
    setTipIndex(prev => (prev + 1) % BILISIM_TIPS.length);
  };

  const activeQuote = EDUCATIONAL_QUOTES[quoteIndex] || EDUCATIONAL_QUOTES[0];
  const activeTip = BILISIM_TIPS[tipIndex];

  const formattedDate = currentDateTime.toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const formattedShortDay = currentDateTime.toLocaleDateString('tr-TR', {
    weekday: 'long'
  });

  const hours = String(currentDateTime.getHours()).padStart(2, '0');
  const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
  const seconds = String(currentDateTime.getSeconds()).padStart(2, '0');

  // Month navigation for calendar grid
  const viewYear = calendarViewDate.getFullYear();
  const viewMonth = calendarViewDate.getMonth();
  const viewMonthName = calendarViewDate.toLocaleDateString('tr-TR', { month: 'long' });

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay(); // 0 is Sunday
  // Convert to Monday-first (0 = Monday, ..., 6 = Sunday)
  const mondayFirstOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const isCurrentMonth =
    currentDateTime.getFullYear() === viewYear &&
    currentDateTime.getMonth() === viewMonth;
  const todayDateNum = currentDateTime.getDate();

  const handlePrevMonth = () => {
    setCalendarViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  const handleTodayClick = () => {
    setCalendarViewDate(new Date());
    setSelectedDayNum(currentDateTime.getDate());
  };

  return (
    <aside className="right-column-panel w-full lg:w-72 xl:w-80 space-y-4 shrink-0">
      
      {/* 1. TARİH, SAAT VE AYLIK TAKVİM (Mavi Vurgulu Gün ile Referans Görsel Düzeni) */}
      <div className="bg-gradient-to-br from-[#FDF2F8] via-[#F5F3FF] to-[#EFF6FF] border-2 border-pink-200/90 rounded-3xl p-4 sm:p-5 shadow-xs text-slate-800 space-y-3.5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-pink-200/60">
          <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-purple-900">
            <Clock className="w-4 h-4 text-[#EC4899] animate-spin-slow" />
            <span>Canlı Saat &amp; Takvim</span>
          </div>
          <span className="text-[10px] font-extrabold bg-gradient-to-r from-[#EC4899] to-[#3B82F6] text-white px-2.5 py-0.5 rounded-full shadow-2xs">
            BTY Dersi
          </span>
        </div>

        {/* Digital Clock Display */}
        <div className="text-center bg-white/95 backdrop-blur-xs rounded-2xl py-2.5 px-2 border border-pink-100 shadow-inner">
          <div className="font-mono font-black text-3xl sm:text-4xl tracking-wider flex items-center justify-center gap-1">
            <span className="text-[#DB2777]">{hours}</span>
            <span className="animate-pulse text-[#8B5CF6]">:</span>
            <span className="text-[#2563EB]">{minutes}</span>
            <span className="text-xl sm:text-2xl text-purple-600/80 font-semibold self-end mb-1">
              :{seconds}
            </span>
          </div>
          <p className="text-[11px] font-bold text-purple-700 mt-0.5">
            {formattedShortDay} &bull; Türkiye Saati
          </p>
        </div>

        {/* Interactive Mini Monthly Calendar (Current Day Highlighted in Blue as in User Image) */}
        <div className="bg-white/95 backdrop-blur-xs rounded-2xl p-3 border border-pink-100 shadow-2xs space-y-2">
          {/* Calendar Month Header */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevMonth}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 transition"
              title="Önceki Ay"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="text-center cursor-pointer" onClick={handleTodayClick} title="Bugüne Git">
              <span className="text-xs sm:text-sm font-black text-slate-800 capitalize">
                {viewMonthName} {viewYear}
              </span>
              <span className="block text-[10px] text-[#EC4899] font-bold">
                {isCurrentMonth ? 'Bugün' : 'Tıklayın'}
              </span>
            </div>

            <button
              onClick={handleNextMonth}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 transition"
              title="Sonraki Ay"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Days of Week (Pzt, Sal, Çar, Per, Cum, Cmt, Paz) */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black text-slate-400 uppercase pt-1">
            <span>Pzt</span>
            <span>Sal</span>
            <span>Çar</span>
            <span>Per</span>
            <span>Cum</span>
            <span className="text-pink-400">Cmt</span>
            <span className="text-pink-400">Paz</span>
          </div>

          {/* Calendar Day Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {/* Empty offset days */}
            {Array.from({ length: mondayFirstOffset }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-7 w-7" />
            ))}

            {/* Days in Month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const isToday = isCurrentMonth && dayNum === todayDateNum;
              const isSelected = dayNum === selectedDayNum;

              // Check if BTY lesson day (e.g. Wednesday/Thursday)
              const dateObj = new Date(viewYear, viewMonth, dayNum);
              const dayOfWeek = dateObj.getDay();
              const isLessonDay = dayOfWeek === 3 || dayOfWeek === 4; // Çarşamba/Perşembe

              return (
                <button
                  key={`day-${dayNum}`}
                  onClick={() => setSelectedDayNum(dayNum)}
                  className={`h-7 w-7 mx-auto rounded-xl flex items-center justify-center font-bold transition text-xs relative ${
                    isToday
                      ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-300 ring-offset-1 scale-105'
                      : isSelected
                      ? 'bg-purple-100 text-purple-900 border border-purple-300 font-extrabold'
                      : 'text-slate-700 hover:bg-pink-50 hover:text-purple-900'
                  }`}
                  title={`${dayNum} ${viewMonthName} ${isToday ? '(Bugün)' : ''}`}
                >
                  <span>{dayNum}</span>
                  {/* Lesson day dot indicator */}
                  {!isToday && isLessonDay && (
                    <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#EC4899]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Date Summary */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-600 font-medium">
              📅 {selectedDayNum} {viewMonthName} {viewYear}
            </span>
            <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
              {isCurrentMonth && selectedDayNum === todayDateNum ? 'Bugünün Dersi' : 'Ders Takvimi'}
            </span>
          </div>
        </div>

      </div>

      {/* 2. HIZLI MATERYAL YÜKLE (ÖĞRETMEN SEÇENEKLERİ) */}
      {onAddMaterial && (
        <QuickAddMaterialCard onAddMaterial={onAddMaterial} />
      )}

      {/* 3. GÜNÜN SÖZÜ BÖLÜMÜ (ROTATING INSPIRING QUOTES) */}
      <div className="bg-white border-2 border-pink-200/80 rounded-3xl p-4 sm:p-5 shadow-xs relative overflow-hidden">
        {/* Soft decorative glow */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-pink-200/40 via-purple-200/30 to-blue-200/40 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center justify-between pb-3 border-b border-pink-100">
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-purple-800">
            <Quote className="w-4 h-4 text-[#EC4899]" />
            <span>Günün İlham Verici Sözü</span>
          </div>
          <button
            onClick={handleNextQuote}
            className="p-1.5 rounded-xl bg-gradient-to-r from-pink-50 to-blue-50 hover:opacity-90 text-purple-800 transition border border-pink-200 flex items-center gap-1 text-[11px] font-bold"
            title="Yeni bir düşünür sözü oku"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Değiştir</span>
          </button>
        </div>

        <div className="mt-3.5 space-y-3">
          <div className="relative">
            <Quote className="w-8 h-8 text-pink-300/30 absolute -top-3 -left-2 -z-0" />
            <p className="text-xs sm:text-sm font-semibold text-slate-700 italic leading-relaxed relative z-10 pl-2">
              "{activeQuote.quote}"
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-xs text-purple-900">
                {activeQuote.author}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {activeQuote.title}
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-100 to-blue-100 text-purple-900 border border-pink-200">
              İlham
            </span>
          </div>
        </div>
      </div>

      {/* 4. GÜNÜN BİLİŞİM İPUCU */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50/40 to-pink-50 border-2 border-blue-200/80 rounded-3xl p-4 shadow-xs text-slate-800">
        <div className="flex items-center justify-between pb-2.5 border-b border-blue-200/60">
          <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-blue-900">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            <span>Günün Bilişim İpucu</span>
          </div>
          <button
            onClick={handleNextTip}
            className="text-[11px] font-bold text-blue-600 hover:text-pink-600 flex items-center gap-0.5 transition"
          >
            Sıradaki 👉
          </button>
        </div>

        <div className="mt-3 flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white text-2xl flex items-center justify-center shadow-xs shrink-0 border border-blue-200">
            {activeTip.icon}
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-blue-950">
              {activeTip.title}
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-snug">
              {activeTip.desc}
            </p>
          </div>
        </div>
      </div>

      {/* 5. ÖĞRETMEN ROZETİ & DERS BİLGİSİ */}
      <div className="bg-white border-2 border-pink-200/80 rounded-3xl p-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-pink-300 shadow-sm shrink-0 bg-pink-50 p-0.5 ring-2 ring-purple-100">
            <img
              src="/teacher_logo.png"
              alt="Hilal KURTOĞLU BTY Portalı"
              className="w-full h-full object-cover rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-[#EC4899]">
              Ders Öğretmeni
            </div>
            <div className="font-extrabold text-sm text-slate-800">
              Hilal KURTOĞLU
            </div>
            <div className="text-[11px] text-slate-500 font-semibold leading-tight">
              Bilgisayar ve Öğretim Teknolojileri Öğretmeni &bull; Ahi Evran OO
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-pink-100 text-[11px] text-slate-500 leading-relaxed flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-[#EC4899] shrink-0" />
          <span>Öğrencilerimiz için sevgi ve teknolojiyle hazırlandı.</span>
        </div>
      </div>

    </aside>
  );
};
