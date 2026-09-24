import { LectureNote } from '../types';

export const LECTURE_NOTES: LectureNote[] = [
  {
    id: "not-0-bit-giris",
    unit: "Bilişim Teknolojilerinin Hayatımızdaki Yeri",
    title: "Bilişim Teknolojilerinin Hayatımızdaki Yeri (Temel Kavramlar & BİT)",
    summary: "Bilgi, iletişim, bilişim ve teknoloji kavramları; BİT'in 10 temel kullanım alanı ve hayatımıza sağladığı 5 büyük fayda.",
    keyPoints: [
      "Bilgi: Gözlem, öğrenme ve araştırma yoluyla elde edilen gerçeklerdir.",
      "İletişim: Duygu, düşünce ve bilgilerin göndericiden alıcıya aktarılma sürecidir.",
      "Bilişim: Bilgiyi toplamak, düzenlemek, saklamak, işlemek ve ihtiyacımız olduğunda tekrar kullanmak için yaptığımız her şeydir.",
      "Teknoloji: İnsanların hayatını kolaylaştırmak amacıyla geliştirdiği araç gereçlerle bunlara ilişkin bilgilerin tümü.",
      "Bilişim Teknolojileri: Bilgiyi çok daha hızlı ve kolay bir şekilde yönetmemizi sağlayan akıllı araçlar ve yöntemlerdir. Hayatımızı kolaylaştıran dijital sihirli değnekler gibidirler.",
      "Donanım: Bilgisayarın elle tutulabilen fiziksel parçaları.",
      "Yazılım: Donanıma ne yapacağını söyleyen programlar.",
      "İnternet: Dünyadaki bilgisayarları birbirine bağlayan büyük ağ."
    ],
    sections: [
      {
        heading: "BİT'in Kullanım Alanları",
        items: [
          { label: "Günlük Yaşamda", text: "Televizyon, Fotoğraf Makinesi, Cep Telefonu örnek verilebilir." },
          { label: "Eğitim Alanında", text: "Akıllı Tahtalar, EBA, E-Okul, çevrimiçi ders." },
          { label: "Sağlık Alanında", text: "Röntgen Cihazı, MR, Randevu Sistemleri." },
          { label: "Ulaşım Alanında", text: "Online bilet alımları, Navigasyon, akıllı trafik." },
          { label: "Güvenlik Alanında", text: "Güvenlik Kameraları, X-Ray Cihazları, alarm sistemleri, kimlik doğrulama." },
          { label: "Bankacılık ve Alışveriş Alanında", text: "Havale, EFT, ATM, Mobil Bankacılık, POS Cihazları, Online alışveriş siteleri." },
          { label: "İletişim Alanında", text: "Cep Telefonları, E-postalar, Sesli ve görüntülü görüşme." },
          { label: "Sinema ve Televizyon Alanında", text: "Özellikle 3 Boyutlu Animasyon filmleri, Yeşil Perde Teknolojisi." },
          { label: "Mühendislik ve Mimarlık Alanında", text: "Robotlar, otomasyon sistemleri." },
          { label: "Üretim Sanayi Alanında", text: "Fabrikalarda bulunan üretim teknolojileri, e-ticaret." }
        ]
      }
    ],
    benefits: [
      "Hayatımızı kolaylaştırır.",
      "Bilgiye hızlı erişimi sağlar.",
      "İletişim ve hızlı haberleşmeyi sağlar.",
      "Maliyetleri azaltır, verimliliği arttırır.",
      "Zamandan tasarruf sağlar."
    ],
    tip: "💡 Bilişim Teknolojileri (BİT), hayatımızın her anında kullandığımız akıllı dijital araçlardır. Hem okulda hem evde zamandan tasarruf etmemizi ve bilgiye saniyeler içinde ulaşmamızı sağlar.",
    term: "1. Dönem",
    recommendedWeek: "1. ve 2. Hafta",
    icon: "🌟"
  },
  {
    id: "not-1",
    unit: "Bilişim Teknolojilerine Giriş ve Ergonomi",
    title: "1. Ünite: Bilişim Teknolojileri ve Dijital Sağlık",
    summary: "Teknolojinin doğru kullanımı, fiziksel duruş kuralları ve 20-20-20 dinlenme yöntemi.",
    keyPoints: [
      "Bilişim: Bilgi ile iletişim teknolojilerinin bir araya gelerek hayatımızı kolaylaştıran dijital araçlar bütünüdür.",
      "Ergonomi ve Oturuş: Sandalyede dik oturmalı, sırt desteklenmeli ve ayaklar yere tam basmalıdır.",
      "Ekran Mesafesi: Göz ile ekran arasında 50-70 cm (yaklaşık bir kol mesafesi) olmalıdır. Ekranın tepe noktası göz hizasında veya biraz altında bulunmalıdır.",
      "20-20-20 Kuralı: Ekrana bakarken her 20 dakikada bir, en az 20 saniye boyunca 20 feet (yaklaşık 6 metre) uzağa bakarak göz kaslarımızı dinlendirmeliyiz."
    ],
    tip: "💡 Akıllı tahtada ve evde bilgisayar kullanırken ortamın çok karanlık olmamasına ve ekranın yansıma yapmamasına dikkat ediniz.",
    term: "1. Dönem",
    recommendedWeek: "1. ve 2. Hafta",
    icon: "🖥️"
  },
  {
    id: "not-2",
    unit: "Donanım ve Yazılım Sistemleri",
    title: "2. Ünite: Bilgisayar Sistemlerinin Temel Bileşenleri",
    summary: "İç donanım parçaları, giriş/çıkış çevre birimleri ve sistem/uygulama yazılımları.",
    keyPoints: [
      "Donanım (Hardware): Bilgisayarı oluşturan gözle görülebilen ve elle tutulabilen tüm fiziksel parçalardır.",
      "İç Donanımlar: Anakart (parçaları birbirine bağlar), İşlemci / CPU (bilgisayarın beyni), RAM Bellek (geçici hafıza), Sabit Disk / SSD (kalıcı depolama hafızası).",
      "Giriş Birimleri: Bilgisayara dışarıdan bilgi/komut girmemizi sağlar (Klavye, Fare, Mikrofon, Tarayıcı, Kamera).",
      "Çıkış Birimleri: Bilgisayardaki işlem sonuçlarını kullanıcıya aktarır (Monitör/Ekran, Hoparlör, Yazıcı, Kulaklık).",
      "Yazılım (Software): Donanımın çalışmasını sağlayan programlar ve komutlar bütünüdür. İşletim sistemleri (Windows, Pardus, Android) ve uygulama yazılımları (Office, Paint, Tarayıcı) olarak ayrılır."
    ],
    tip: "🇹🇷 PARDUS, TÜBİTAK tarafından geliştirilen yerli ve millî özgür işletim sistemimizdir.",
    term: "1. Dönem",
    recommendedWeek: "6. ve 7. Hafta",
    icon: "⚙️"
  },
  {
    id: "not-3",
    unit: "Dosya ve Klasör Yönetimi",
    title: "3. Ünite: Dosya Yapısı, Uzantılar ve Düzen",
    summary: "Dosya adlandırma ilkeleri, popüler dosya uzantıları ve klasör ağacı yapısı.",
    keyPoints: [
      "Dosya Yapısı: DosyaAdı . Uzantı (Örneğin: odev.docx). Dosya adı içeriği anlatmalı, uzantı ise dosyanın türünü belirtir.",
      "Metin Dosyaları: .txt (Not Defteri), .docx (Word belgesi), .pdf (Taşınabilir Belge Formatı).",
      "Görsel Dosyaları: .jpg, .png (şeffaf arka plan destekler), .gif (hareketli resim).",
      "Ses ve Video: .mp3 / .wav (ses), .mp4 / .avi (video).",
      "Sıkıştırılmış Dosyalar: .zip, .rar (boyutu küçültür ve birden fazla dosyayı paketler).",
      "Geri Dönüşüm Kutusu: Silinen dosyalar kalıcı olarak silinmeden önce buraya taşınır; 'Geri Yükle' seçeneği ile kurtarılabilir."
    ],
    tip: "📂 Dosyalarınızı 'Adsız', 'Dosya1' yerine '5A_Hilal_Bilisim_Sunum.pptx' şeklinde isimlendirirseniz aradığınızda saniyeler içinde bulursunuz.",
    term: "1. Dönem",
    recommendedWeek: "8. Hafta",
    icon: "📁"
  },
  {
    id: "not-4",
    unit: "Bilgisayar Ağları ve İletişim",
    title: "4. Ünite: Ağ Türleri ve İnternet Dünyası",
    summary: "Yerel ve geniş alan ağları (LAN, WAN), modem ve doğru arama teknikleri.",
    keyPoints: [
      "Bilgisayar Ağı: İki veya daha fazla bilgisayarın bilgi ve donanım paylaşımı amacıyla birbirine bağlanmasıdır.",
      "LAN (Yerel Alan Ağı): Bir oda, okul laboratuvarı veya tek bir bina içerisindeki bilgisayarların oluşturduğu ağdır.",
      "WAN (Geniş Alan Ağı): Ülkeleri ve kıtaları birbirine bağlayan dünya çapındaki en büyük ağdır (İnternet bir WAN ağıdır).",
      "Ağ Donanımları: Modem (internet sinyalini çözer), Dağıtıcı/Anahtar (Switch - ağdaki cihazları birbirine bağlar), Ethernet kablosu ve Wi-Fi.",
      "Arama Yöntemleri: Arama motorlarında çift tırnak (\"...\") kullanarak tam kelime grubu araması yapabilir, güvenilir (.gov.tr, .edu.tr) kaynakları tercih etmeliyiz."
    ],
    tip: "🌐 İnternette araştırma yaparken tek bir siteyle yetinmeyip en az 2-3 farklı güvenilir kaynaktan bilginin doğruluğunu teyit etmeliyiz.",
    term: "1. Dönem",
    recommendedWeek: "15., 16. ve 17. Hafta",
    icon: "🌐"
  },
  {
    id: "not-5",
    unit: "Bilişim Etiği ve Siber Güvenlik",
    title: "5. Ünite: Güvenli İnternet ve Dijital Ayak İzi",
    summary: "Güçlü parola kuralları, siber zorbalıkla mücadele, telif hakları ve dijital nezaket.",
    keyPoints: [
      "Dijital Ayak İzi: İnternette gezindiğimizde, yorum yaptığımızda, beğendiğimizde veya arama yaptığımızda arkamızda bıraktığımız tüm izlerdir.",
      "Güçlü Parola İlkeleri: En az 8-12 karakterden oluşmalı; büyük harf, küçük harf, rakam ve özel işaret (@, #, !, ?) içermelidir. Doğum tarihi veya isim gibi kolay tahmin edilir bilgiler kullanılmamalıdır.",
      "Kişisel Bilgilerin Mahremiyeti: TC kimlik no, ev adresi, telefon numarası, okul adı ve şifreler internette tanımadığımız kişilerle asla paylaşılmamalıdır.",
      "Siber Zorbalık: İnternet ortamında birini kasıtlı olarak üzmek, tehdit etmek veya dışlamaktır. Karşılaşıldığında cevap verilmemeli, ekran görüntüsü alınmalı ve derhal öğretmen/aile ile paylaşılmalıdır.",
      "Telif Hakkı ve Emeğe Saygı: Başkalarının hazırladığı eserleri (metin, resim, kod) izin almadan ve kaynak göstermeden kendi eserimizmiş gibi kullanmamalıyız."
    ],
    tip: "🔒 Şifreniz tıpkı evinizin anahtarı gibidir; en yakın arkadaşınız dahi olsa sadece sizde kalmalıdır!",
    term: "2. Dönem",
    recommendedWeek: "19. ve 20. Hafta",
    icon: "🛡️"
  },
  {
    id: "not-6",
    unit: "Yapay Zekâ ve Geleceğin Teknolojileri",
    title: "6. Ünite: Yapay Zekâ Temelleri ve Etik",
    summary: "Yapay zekâ nedir, makine öğrenmesi nasıl çalışır ve etik kullanım prensipleri.",
    keyPoints: [
      "Yapay Zekâ (YZ / AI): İnsan zekâsına benzer şekilde öğrenme, problem çözme, karar verme ve kalıpları tanıma yeteneğine sahip bilgisayar sistemleridir.",
      "Kullanım Alanları: Sesli asistanlar (Siri, Google Asistan), yüz tanıma sistemleri, harita rotası hesaplama, otomatik çeviri araçları ve öneri algoritmaları.",
      "İstem (Prompt) Yazma: Yapay zekâya açık, net ve bağlam içeren komutlar vermek en doğru sonucu elde etmemizi sağlar.",
      "Etik ve Doğruluk: Yapay zekâ bazen yanlış veya uydurma bilgi üretebilir (halüsinasyon). Üretilen her bilgiyi eleştirel gözle kontrol etmeliyiz."
    ],
    tip: "🤖 Yapay zekâ bir sihir değil, büyük veri ve algoritmalarla çalışan güçlü bir yardımcı araçtır.",
    term: "2. Dönem",
    recommendedWeek: "4., 21. ve 22. Hafta",
    icon: "🤖"
  },
  {
    id: "not-7",
    unit: "Problem Çözme ve Algoritma",
    title: "7. Ünite: Algoritmik Düşünme ve Akış Şemaları",
    summary: "Problem adımları, algoritma kuralları ve standart akış şeması geometrik şekilleri.",
    keyPoints: [
      "Problem: Çözülmesi gereken, sonucunda hedefe ulaşılan durum veya güçlüklerdir.",
      "Algoritma: Bir problemin çözümü için adım adım izlenen, başlangıcı ve bitişi belli olan mantıksal yoldur.",
      "Algoritma Özellikleri: Adımlar net olmalı, sırası karışmamalı ve mutlaka 'Başla' ile başlayıp 'Bitir' ile sonlanmalıdır.",
      "Akış Şeması Şekilleri:",
      "• Elips: Başla ve Bitir adımlarını gösterir.",
      "• Paralelkenar: Kullanıcıdan veri girişini temsil eder.",
      "• Dikdörtgen: İşlem, hesaplama ve atama adımlarını ifade eder.",
      "• Eşkenar Dörtgen (Baklava): Karar verme ve şart (Eğer-İse) durumlarını sorgular.",
      "• Oklar (Akış Çizgileri): İşlemlerin hangi yöne akacağını gösterir."
    ],
    tip: "📐 Günlük hayatta ayakkabı bağlamaktan kek tarifine kadar her planlı iş aslında bir algoritmadır!",
    term: "2. Dönem",
    recommendedWeek: "25. - 29. Hafta",
    icon: "📐"
  },
  {
    id: "not-8",
    unit: "Scratch ile Blok Kodlama",
    title: "8. Ünite: Blok Tabanlı Programlama (Scratch)",
    summary: "Kuklalar, sahneler, döngüler, değişkenler ve etkileşimli oyun mekanikleri.",
    keyPoints: [
      "Scratch: MIT tarafından çocuklar ve gençler için geliştirilmiş, renkli blokları sürükleyip bırakarak çalışan görsel bir kodlama ortamıdır.",
      "Kukla (Sprite): Sahne üzerinde hareket eden, konuşan ve komutları yerine getiren karakterlerdir (Örn: Scratch Kedisi).",
      "Sahne (Backdrop): Oyunun veya animasyonun arka plan görselidir.",
      "Olay Blokları (Sarı): Bir kodun ne zaman çalışacağını başlatır (Örn: 'Yeşil bayrağa tıklandığında', 'boşluk tuşuna basılınca').",
      "Hareket Blokları (Mavi): Kuklanın koordinat düzleminde (X ve Y) yürümesini, dönmesini ve zıplamasını sağlar.",
      "Kontrol Blokları (Turuncu): '10 defa tekrarla', 'sürekli tekrarla' döngüleri ve 'eğer ... ise' şart bloklarını içerir.",
      "Algılama Blokları (Açık Mavi): 'Fareye değdi mi?', 'Rengine dokundu mu?' gibi durumları test eder."
    ],
    tip: "🐱 Scratch'te kod yazarken blokları tıpkı Lego parçaları gibi birbirine kenetleyerek hayalinizdeki oyunu oluşturabilirsiniz!",
    term: "2. Dönem",
    recommendedWeek: "31. - 37. Hafta",
    icon: "🐱"
  }
];
