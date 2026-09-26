import React, { useState } from 'react';
import { Bell, Megaphone, Play, ExternalLink, Copy, CheckCircle2, ShieldCheck, HelpCircle, Calendar, User, Video, Info, Sparkles, BookOpen } from 'lucide-react';

export const AnnouncementsView: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [filterCategory, setFilterCategory] = useState<'all' | 'veli' | 'ogrenci' | 'genel'>('all');

  const youtubeVideoUrl = "https://www.youtube.com/watch?v=A5TWf-zeOvQ";
  const youtubeEmbedUrl = "https://www.youtube-nocookie.com/embed/A5TWf-zeOvQ";

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(youtubeVideoUrl);
      } else {
        const input = document.createElement('input');
        input.value = youtubeVideoUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    } catch {
      // ignore
    }
  };

  const otherAnnouncements = [
    {
      id: 'd-1',
      category: 'veli',
      title: '5. Sınıf Bilişim Teknolojileri ve Yazılım Dersi İhtiyaç Listesi ve Tavsiyeler',
      date: '2026-09-18',
      author: 'Hilal KURTOĞLU',
      summary: 'Derslerimizde akıllı tahta, okul bilgisayar laboratuvarı ve etkileşimli içerikler kullanılmaktadır. Öğrencilerimizin Scratch çalışmaları ve ders notlarını yedeklemesi için küçük bir USB bellek getirmeleri tavsiye edilir.',
      tag: 'Veli Bilgilendirme'
    },
    {
      id: 'd-2',
      category: 'ogrenci',
      title: 'Bilgisayar Laboratuvarı Güvenli ve Doğru Kullanım Kuralları',
      date: '2026-09-15',
      author: 'Hilal KURTOĞLU',
      summary: 'Laboratuvarımızda Pardus işletim sistemi ve akıllı tahta kullanılmaktadır. Donanımları temiz ve özenli kullanmak, bilgisayar başında dik oturmak (ergonomi) ve ders sonu oturumu kapatmak esastır.',
      tag: 'Öğrenci Rehberi'
    },
    {
      id: 'd-3',
      category: 'genel',
      title: 'EBA ve Dijital Eğitim Platformları Kullanımı Hakkında',
      date: '2026-09-12',
      author: 'Hilal KURTOĞLU',
      summary: 'Haftalık kazanım özetleri, çalışma yaprakları ve eğitsel oyunlar ders portalımız üzerinden ve EBA platformu eşliğinde düzenli olarak güncellenmektedir.',
      tag: 'Genel Duyuru'
    }
  ];

  const filteredAnnouncements = filterCategory === 'all'
    ? otherAnnouncements
    : otherAnnouncements.filter(a => a.category === filterCategory);

  return (
    <div className="space-y-6">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider border border-white/30">
            <Megaphone className="w-3.5 h-3.5 text-pink-200 animate-pulse" />
            <span>BTY Dersi Bilgilendirme ve Duyuru Panosu</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
            Duyurular &amp; Veli Rehberleri
          </h2>

          <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed">
            Hilal KURTOĞLU tarafından hazırlanan güncel ders duyuruları, EBA şifre alma kılavuzları, veli bilgilendirmeleri ve bilişim etkinlik takvimi.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-bold text-white/80">
            <span className="bg-white/15 px-3 py-1 rounded-xl border border-white/20">
              📌 Ahi Evran Ortaokulu 5. Sınıflar
            </span>
            <span className="bg-white/15 px-3 py-1 rounded-xl border border-white/20">
              🎯 2026-2027 Eğitim Öğretim Yılı
            </span>
          </div>
        </div>
      </div>

      {/* 2. ÖNE ÇIKAN DUYURU: EBA VELİ ŞİFRE KILAVUZU (YOUTUBE VİDEOLU) */}
      <section className="bg-white border-2 border-pink-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5 relative overflow-hidden">
        
        {/* Top Badges & Date */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-pink-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-50 text-red-700 border border-red-200">
                <Video className="w-3.5 h-3.5 text-red-600" />
                Öne Çıkan Video Kılavuz
              </span>
              <span className="text-xs font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                Veli &amp; Öğrenci Rehberi
              </span>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                EBA Giriş Sistemi
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 mt-2 flex items-center gap-2">
              <span>📹 EBA Veli Şifre Kılavuzu</span>
            </h3>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Güncel Kılavuz Video</span>
          </div>
        </div>

        {/* Video Player & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Responsive Video Player Container (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-md border-2 border-pink-200 group">
              <iframe
                src={youtubeEmbedUrl}
                title="EBA Veli Şifre Kılavuzu - Hilal Öğretmenim"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Video Action Controls (YouTube'da İzle & Bağlantı Kopyala) */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href={youtubeVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:opacity-95 text-white font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-2xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>YouTube'da Aç</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCopyLink}
                className="py-2.5 px-4 rounded-xl bg-pink-50 hover:bg-pink-100 text-purple-900 border border-pink-200 font-bold text-xs transition flex items-center gap-1.5 shadow-2xs"
                title="Video bağlantısını kopyala"
              >
                {copiedLink ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Bağlantı Kopyalandı!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#EC4899]" />
                    <span>Video Linkini Kopyala</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Step-by-Step Parent Guide Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-pink-50/50 via-purple-50/30 to-blue-50/50 p-5 rounded-2xl border-2 border-pink-200/80 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
                💡
              </div>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-slate-800">
                  Adım Adım Şifre Alma Adımları
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  Velilerimiz için hızlı ve güvenli işlem rehberi
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700 font-medium">
              <div className="flex items-start gap-2.5 bg-white/90 p-2.5 rounded-xl border border-pink-100 shadow-2xs">
                <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <p className="leading-snug">
                  <strong className="text-slate-900">eba.gov.tr</strong> adresine giderek sağ üstteki <span className="text-[#EC4899] font-bold">Giriş</span> butonuna tıklayın.
                </p>
              </div>

              <div className="flex items-start gap-2.5 bg-white/90 p-2.5 rounded-xl border border-pink-100 shadow-2xs">
                <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <p className="leading-snug">
                  Giriş ekranında <strong className="text-purple-900">"Veli Girişi"</strong> seçeneğini belirleyip velinin <strong>e-Devlet şifresi</strong> ile oturum açın.
                </p>
              </div>

              <div className="flex items-start gap-2.5 bg-white/90 p-2.5 rounded-xl border border-pink-100 shadow-2xs">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <p className="leading-snug">
                  Açılan panelde çocuğunuzun profilini seçin ve <strong className="text-blue-900">"Öğrenci İçin Tek Kullanımlık Şifre Oluştur"</strong> butonuna basın.
                </p>
              </div>

              <div className="flex items-start gap-2.5 bg-white/90 p-2.5 rounded-xl border border-pink-100 shadow-2xs">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <p className="leading-snug">
                  Oluşturulan geçici şifreyi öğrencinize verin. Öğrenci EBA'ya ilk giriş yaptığında <strong className="text-emerald-900">kendi kalıcı şifresini</strong> belirleyecektir.
                </p>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] leading-relaxed flex items-start gap-2">
              <span className="text-base shrink-0">⚠️</span>
              <span>
                <strong>Önemli Hatırlatma:</strong> Şifrenizi unutmanız halinde aynı veli adımlarını takip ederek istediğiniz zaman yeni bir tek kullanımlık şifre üretebilirsiniz.
              </span>
            </div>

            <div className="pt-1 text-[11px] text-slate-500 font-medium flex items-center justify-between">
              <span>Hazırlayan: Hilal KURTOĞLU</span>
              <span className="text-purple-700 font-bold">Bilgisayar ve Öğretim Teknolojileri Öğretmeni</span>
            </div>

          </div>

        </div>

      </section>

      {/* 3. DİĞER DERS VE OKUL DUYURULARI */}
      <section className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-800 flex items-center gap-2">
              <span>📋 Güncel Ders ve Okul Duyuruları</span>
            </h3>
            <p className="text-xs text-slate-600">
              5. Sınıf Bilişim Teknolojileri ve Yazılım dersi genel duyuruları ve bildirimleri.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-pink-200 shadow-2xs self-start sm:self-auto">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                filterCategory === 'all'
                  ? 'bg-gradient-to-r from-[#EC4899] to-[#3B82F6] text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-pink-50'
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setFilterCategory('veli')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                filterCategory === 'veli'
                  ? 'bg-gradient-to-r from-[#EC4899] to-[#3B82F6] text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-pink-50'
              }`}
            >
              Veli
            </button>
            <button
              onClick={() => setFilterCategory('ogrenci')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                filterCategory === 'ogrenci'
                  ? 'bg-gradient-to-r from-[#EC4899] to-[#3B82F6] text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-pink-50'
              }`}
            >
              Öğrenci
            </button>
          </div>
        </div>

        {/* Announcements List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className="bg-white border-2 border-pink-200/80 rounded-2xl p-4.5 shadow-2xs space-y-2.5 flex flex-col justify-between hover:border-purple-300 transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-pink-100 text-purple-900 border border-pink-200">
                    {ann.tag}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {ann.date}
                  </span>
                </div>

                <h4 className="font-extrabold text-sm text-slate-800 leading-snug">
                  {ann.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {ann.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-pink-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-bold text-[#EC4899]">{ann.author}</span>
                <span className="text-slate-400">BTY Dersi</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
