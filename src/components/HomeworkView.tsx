import React, { useState } from 'react';
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
  Globe,
  MessageSquare,
  Scale,
  HeartPulse,
  ShoppingBag,
  Award
} from 'lucide-react';

interface HomeworkViewProps {
  onSelectTab?: (tab: string) => void;
}

export const HomeworkView: React.FC<HomeworkViewProps> = ({ onSelectTab }) => {
  const [selectedDimension, setSelectedDimension] = useState<number | null>(null);

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Başlık ve Üst Bilgi Kartı */}
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
            Ders içi kazanımlarımızı pekiştirmek için verilen haftalık araştırma, tasarım ve afiş ödevlerini bu alandan takip edebilirsiniz.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-bold">
            <span className="bg-white/20 px-3 py-1 rounded-xl border border-white/30 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>1. Dönem &bull; 3. Hafta Ödevi</span>
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-xl border border-white/30 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" />
              <span>A4 Kâğıdında Afiş Çalışması</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. AKTİF ÖDEV KARTI (3. HAFTA: DİJİTAL VATANDAŞLIĞIN 9 BOYUTU) */}
      <section className="bg-white border-2 border-pink-200/90 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
        
        {/* Ödev Başlığı ve Yazdırma Butonu */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-pink-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 border border-amber-300">
                ⭐ 3. Hafta Aktif Ödevi
              </span>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                Dijital Yurttaşlık
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 mt-2">
              3.HAFTA Ödev - DİJİTAL VATANDAŞLIĞIN 9 BOYUTU
            </h3>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handlePrint}
              className="py-2.5 px-4 rounded-xl bg-pink-50 hover:bg-pink-100 text-purple-900 border border-pink-200 font-bold text-xs transition flex items-center gap-2 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-[#EC4899]" />
              <span>Ödevi Yazdır</span>
            </button>
          </div>
        </div>

        {/* ÖĞRETMENİN ÖDEV TALİMATI VURGU KUTUSU (PDF İLE BİREBİR) */}
        <div className="bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-300 border-2 border-amber-400 p-5 rounded-2xl shadow-xs space-y-2 text-slate-900">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-amber-900 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
              📌
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-amber-950">
              Öğretmenin Ödev Talimatı
            </span>
          </div>
          <p className="text-sm sm:text-base md:text-lg font-black leading-snug text-slate-950">
            ÖDEV: Yukarıda yer alan Dijital Vatandaşlığın 9 boyutundan 1 tanesi için web sitemde yer alan ödev bölümündeki tanımları okuyun ve A4 kağıdında afiş çalışması yaparak haftaya getirin.
          </p>
        </div>

        {/* DİJİTAL VATANDAŞLIĞIN 9 BOYUTU VE TANIMLARI LİSTESİ (PDF İLE BİREBİR) */}
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

        {/* 3. AFİŞ ÇALIŞMASI HAZIRLAMA REHBERİ & PÜF NOKTALARI */}
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
            <span>📅 Teslim Tarihi: Bir sonraki Bilişim dersinde</span>
            {onSelectTab && (
              <button
                onClick={() => onSelectTab('ders-notlari')}
                className="text-[#EC4899] hover:underline font-bold flex items-center gap-1"
              >
                <span>3. Hafta Ders Notuna Geri Dön</span>
                <span>&rarr;</span>
              </button>
            )}
          </div>
        </div>

      </section>

    </div>
  );
};
