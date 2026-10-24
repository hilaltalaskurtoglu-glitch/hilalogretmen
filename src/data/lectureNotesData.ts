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
        icon: "🌐",
        badge: "Kullanım Alanları",
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
    recommendedWeek: "1. Hafta",
    icon: "🌟"
  },
  {
    id: "not-2-hafta-saglik",
    unit: "Bilişim Teknolojileri ve Sağlık",
    title: "Bilişim Teknolojilerinin Beden ve Ruh Sağlığına Etkileri",
    summary: "Bilgisayar kullanırken beden ve göz sağlığımızı korumak için dikkat edilmesi gereken ergonomi kuralları ile bilişim cihazlarını uzun süre kullanmanın ruhsal ve psikolojik etkileri.",
    sections: [
      {
        heading: "Bilgisayar Kullanırken Beden Sağlığı İçin",
        icon: "🪑",
        badge: "Beden Sağlığı & Ergonomi",
        points: [
          "Dik oturmalıyız.",
          "Kollar dirseklerden 90 derece kırılmalı.",
          "Bilekler klavye kullanırken desteklenmeli.",
          "Ekran göz hizasına gelmeli.",
          "Ayaklar yerle temas etmeli, yer ile temas etmediği durumda ayaklar desteklenmeli.",
          "Koltuk yüksekliği ayarlanabilir olmalı.",
          "Özellikle öğrenciler için her 30 dakikada bir 5-15 DK ara verilmeli.",
          "Ara verildiği sırada hareketli egzersiz yapılmalı. (Bisiklet sürme, yürüyüş, paten kaymak gibi)",
          "Yüksekliği, bel bölümü ayarlanabilir sandalye tercih edilmeli."
        ]
      },
      {
        heading: "Bilgisayar Kullanırken Göz Sağlığı İçin",
        icon: "👁️",
        badge: "Göz Sağlığı & Aydınlatma",
        points: [
          "Ekran 50-70 arasındaki uzaklıkta olmalı (50-70 cm).",
          "Ekranın üst bölümü ile göz aynı hizada olmalı.",
          "Ortamdaki aydınlığa dikkat edilmeli ve ekrana doğrudan özellikle gün ışığı gelmemeli.",
          "Ekran parlaklığı ayarlanmalı.",
          "Eğer gözlük kullanıyorsanız filtreli cam tercih edilmeli.",
          "15-20 dakikada bir gözler ekrandan daha uzakta bir yere 10 saniye bakarak dinlendirilmeli (Kitap okumak ya da televizyon izlemek gibi aktivitelerden kaçınılmalı)."
        ]
      },
      {
        heading: "Bilişim Cihazlarını Uzun Süre Kullanmanın Ruhsal ve Psikolojik Etkileri",
        icon: "🧠",
        badge: "Ruhsal ve Psikolojik Etkiler",
        points: [
          "Ailemizle ve arkadaşlarımızla iletişim sorunları",
          "Uykusuzluk",
          "Ekran bağımlılığı",
          "Sosyal Medya bağımlılığı",
          "Oyun bağımlılığı",
          "Dikkat kaybı",
          "Unutkanlık",
          "Özgüven eksikliği",
          "Başarının düşmesi",
          "Kişilik bozuklukları"
        ]
      }
    ],
    tip: "💡 Bilgisayar ve telefon karşısında doğru oturuş alışkanlığı kazanmak omurga ve göz sağlığımızı korur. Her 30 dakikada bir mola verip hareket etmek zihnimizi canlandırır ve okul başarımızı artırır.",
    term: "1. Dönem",
    recommendedWeek: "2. Hafta",
    icon: "🧘"
  },
  {
    id: "not-3-hafta-edevlet-dijital-vatandaslik",
    unit: "e-Devlet ve Dijital Yurttaşlık",
    title: "e-Devlet Nedir? & Dijital Vatandaşlığın 9 Boyutu",
    summary: "e-Devlet sistemi, e-Devlet sayesinde yapabildiğimiz işlemler, sağlık ve eğitim alanındaki e-hizmetler ile Dijital Vatandaşlığın 9 Boyutu.",
    keyPoints: [
      "e-Devlet Nedir?: e-Devlet, devletin sunduğu hizmetleri internet üzerinden yapabildiğimiz bir sistemdir. Yani devlet dairesine gitmeden, bilgisayar ya da telefonla birçok işlemi kolayca halledebiliriz."
    ],
    sections: [
      {
        heading: "e-Devlet Sayesinde Yapabildiklerimiz",
        icon: "🏛️",
        badge: "e-Devlet Hizmetleri",
        points: [
          "Kimlik bilgilerimizi görebiliriz (adres, nüfus kayıtları gibi)",
          "Okul bilgilerine ulaşabiliriz (mezuniyet belgesi, sınav sonuçları)",
          "Aile hekimini öğrenebiliriz",
          "Araç bilgilerini görebiliriz",
          "Vergi borcunu kontrol edebiliriz",
          "Devlete ait ücretsiz eğitim hizmetlerine dahil olabiliriz."
        ]
      },
      {
        heading: "Sağlık ve Eğitim Alanında Dijital Hizmetler",
        icon: "📱",
        badge: "Önemli Portallar",
        items: [
          { label: "Sağlık Alanında", text: "mhrs, alo182, e nabız" },
          { label: "Eğitim Alanında", text: "Eba, Mebi, e-okul, meb.gov.tr" }
        ]
      },
      {
        heading: "Dijital Vatandaşlığın 9 Boyutu",
        icon: "🌐",
        badge: "Dijital Yurttaşlık",
        points: [
          "1. Dijital Ticaret",
          "2. Dijital İletişim",
          "3. Dijital Okuryazarlık",
          "4. Dijital Etik",
          "5. Dijital Güvenlik",
          "6. Dijital Hak ve Sorumluluklar",
          "7. Dijital Sağlık",
          "8. Dijital Hukuk"
        ]
      }
    ],
    homework: "ÖDEV: Yukarıda yer alan Dijital Vatandaşlığın 9 boyutundan 1 tanesi için web sitemde yer alan ödev bölümündeki tanımları okuyun ve a4 kağıdında afiş çalışması yaparak haftaya getirin.",
    tip: "💡 e-Devlet sayesinde zamandan ve kâğıttan tasarruf ederiz. Dijital vatandaşlığın boyutlarını öğrenip uygulayarak interneti bilinçli, güvenli ve sorumluluk sahibi bir şekilde kullanmalıyız.",
    term: "1. Dönem",
    recommendedWeek: "3. Hafta",
    icon: "🏛️"
  },
  {
    id: "not-4-hafta-yapay-zeka",
    unit: "Bilişim Teknolojilerinin Hayatımızdaki Yeri",
    title: "YAPAY ZEKÂDA TEMEL KAVRAM VE ÖZELLİKLER",
    subtitle: "5. Sınıf Bilişim Teknolojileri ve Yazılım • Defter Notu",
    summary: "Yapay zekânın tanımı, temel özellikleri, günlük hayattaki kullanım alanları, insan zekâsı ile karşılaştırılması, John McCarthy ve yapay zekânın doğuşu, yapay zekâ öncüleri ve teknolojiyi bilinçli kullanma rehberi.",
    keyPoints: [
      "1. Yapay Zekâ Nedir?: Yapay zekâ, bilgisayarların ve makinelerin bazı görevleri insanlara benzer şekilde yapabilmesini sağlayan teknolojidir.",
      "Temel Özellikleri: Verileri analiz eder, öğrenebilir, karar verebilir, akıllı öneriler sunabilir.",
      "Bilinçli Kullanım İlkesi: Yapay zekâ bir araçtır; onu bilinçli ve sorumlu bir şekilde kullanmalıyız."
    ],
    sections: [
      {
        heading: "2. Günlük Hayatta Yapay Zekâ",
        icon: "📱",
        badge: "Uygulama & Görevleri",
        description: "Günlük yaşantımızda sıkça karşımıza çıkan akıllı sistemler:",
        table: {
          headers: ["Uygulama", "Ne yapar?"],
          rows: [
            ["Sesli asistan", "Sorularını dinler, sesli cevap verir."],
            ["Yüz tanıma", "Yüzünü tanıyarak telefonun kilidini açar."],
            ["Film / video öneri sistemi", "İzlediklerine bakarak yeni öneriler sunar."],
            ["Akıllı ev cihazları", "Evdeki bazı işleri bizim yerimize kolaylaştırır."],
            ["Robot süpürge", "Evi dolaşır, engellere çarpmadan temizler."],
            ["Navigasyon", "Trafiği bilip seni en kısa yoldan götürür."]
          ]
        }
      },
      {
        heading: "3. Yapay Zekâ ve İnsan Zekâsı Karşılaştırması",
        icon: "🧠",
        badge: "Ortak & Farklı Yönler",
        description: "Ortak özellikler: Öğrenebilirler, karar verebilirler, sorun çözebilirler, yeni şeyler keşfedebilirler.",
        table: {
          headers: ["Özellik", "İnsan Zekâsı", "Yapay Zekâ"],
          rows: [
            ["Hayal gücü", "Var", "Yok"],
            ["Duygular", "Var", "Yok"],
            ["Hızlı hesaplama", "Yavaş", "Çok hızlı"],
            ["Yaratıcılık", "Yüksek", "Sınırlı"]
          ]
        }
      },
      {
        heading: "4. John McCarthy ve Yapay Zekânın Doğuşu",
        icon: "💡",
        badge: "Tarihsel Dönüm Noktası",
        points: [
          "Yapay zekâ kavramını ilk ortaya atan Amerikalı bilim insanı John McCarthy’dir; “yapay zekânın babası” olarak bilinir.",
          "1956’daki Dartmouth Konferansı’nda “Yapay Zekâ” terimini kullandı.",
          "Bilgisayarların öğrenebileceğini, karar verebileceğini ve sorun çözebileceğini düşündü."
        ]
      },
      {
        heading: "5. Yapay Zekâ Öncüleri",
        icon: "🎓",
        badge: "Bilim İnsanları & Katkıları",
        description: "Yapay zekâ ve bilgisayar biliminin temellerini atan önemli bilim insanları:",
        table: {
          headers: ["Bilim insanı", "Katkısı"],
          rows: [
            ["Ada Lovelace", "İlk bilgisayar programcısı kabul edilir."],
            ["Alan Turing", "Turing Testi ile tanınır."],
            ["John McCarthy", "“Yapay Zekâ” terimini kullandı."],
            ["Marvin Minsky", "Yapay zekâ laboratuvarı çalışmalarına öncülük etti."],
            ["Cahit Arf", "Türk matematikçi; makine düşünmesi üzerine çalışmalar yaptı."]
          ]
        }
      },
      {
        heading: "6. Hayatımızı Nasıl Kolaylaştırır?",
        icon: "⚖️",
        badge: "Faydalar & Dikkat Edilecekler",
        columns: [
          {
            title: "Faydaları",
            badge: "Kolaylıklar",
            color: "green",
            points: [
              "İşleri daha hızlı yapmamıza yardımcı olur.",
              "Büyük verileri analiz eder.",
              "Akıllı öneriler sunar.",
              "Günlük hayatı kolaylaştırır."
            ]
          },
          {
            title: "Dikkat Edilmesi Gerekenler",
            badge: "Güvenlik & Sorumluluk",
            color: "amber",
            points: [
              "Bazen hatalı sonuçlar üretebilir.",
              "Kişisel veriler ve güvenlik sorunları olabilir.",
              "Teknolojiye bağımlılığı artırabilir."
            ]
          }
        ]
      }
    ],
    tip: "💡 Önemli İlke: Yapay zekâ bir araçtır; onu bilinçli ve sorumlu kullanmalıyız. Ödevlerimizde ve araştırmalarımızda güvenilir kaynaklardan teyit etmeli, kişisel verilerimizi korumalıyız.",
    homework: "📋 4. HAFTA ÖDEVİ - YAPAY ZEKÂNIN TEMELLERİ: 1. Yapay zekâ ile insan zekâsı arasındaki en temel fark sence nedir? 2. Sen bir yapay zekâ geliştiricisi olsaydın, hangi alanda çalışmak isterdin? Yapay zekâyı hangi sorunu çözmek için kullanırdın?",
    term: "1. Dönem",
    recommendedWeek: "4. Hafta",
    icon: "🤖"
  },
  {
    id: "not-6-hafta-bilgisayar-sistemleri",
    unit: "Bilgisayar Sistemlerinin Kullanımı ve Yönetimi",
    title: "5. Sınıf Ders Notu: Bilgisayar Sistemlerini Çözümleyebilme (BTY.5.1.5)",
    subtitle: "5. Sınıf Bilişim Teknolojileri ve Yazılım • 6. Hafta Ders Notu",
    summary: "Bir bilgisayar sistemi iki temel kısımdan oluşur: Donanım ve Yazılım.",
    sections: [
      {
        heading: "a) Bilgisayar Sistemlerinin Temel Bileşenleri",
        icon: "🖥️",
        badge: "BTY.5.1.5",
        description: "Bir bilgisayar sistemi iki temel kısımdan oluşur: Donanım ve Yazılım.",
        items: [
          {
            label: "1. Donanım (Fiziksel Bileşenler)",
            text: "Bilgisayarın dokunabildiğimiz, gözle görülen fiziksel parçalarıdır."
          },
          {
            label: "İç Donanım",
            text: "Kasanın içinde yer alan ve sistemin çalışmasını sağlayan hayati parçalardır (İşlemci, Ana Kart, RAM Bellek, Sabit Disk/SSD, Güç Kaynağı)."
          },
          {
            label: "Dış Donanım",
            text: "Kasanın dışına bağlı olan ve bilgisayarla iletişim kurmamızı sağlayan birimlerdir:"
          },
          {
            label: "Giriş Birimleri",
            text: "Bilgisayara veri göndermemizi sağlar (Klavye, Fare, Mikrofon)."
          },
          {
            label: "Çıkış Birimleri",
            text: "Bilgisayarın işlediği bilgileri bize sunar (Monitör, Yazıcı, Hoparlör)."
          },
          {
            label: "Hem Giriş Hem Çıkış Birimleri",
            text: "Dokunmatik Ekran, modem, usb bellek, taşınabilir harddisk, sd kart."
          },
          {
            label: "2. Yazılım (Mantıksal Bileşenler)",
            text: "Dokunamadığımız, ekran üzerinde gördüğümüz ve donanımın çalışmasını sağlayan programlar bütünüdür."
          },
          {
            label: "İşletim Sistemi Yazılımları",
            text: "Bilgisayarın açılmasını sağlayan ve diğer tüm programların çalışması için zemin hazırlayan temel yazılımdır (Windows, macOS, Linux, Android, iOS, Pardus)."
          },
          {
            label: "Uygulama Yazılımları",
            text: "Belirli bir işi yapmak veya eğlenmek için kullandığımız programlardır (İnternet tarayıcıları, oyunlar, ofis programları)."
          }
        ]
      },
      {
        heading: "b) Bilgisayar Sistemlerinin Temel Bileşenleri Arasındaki İlişkiler",
        icon: "⚙️",
        badge: "Veri Akış İlişkisi & Uyum",
        description: "Bilgisayar sistemleri, donanım ve yazılımın uyum içinde çalışmasıyla görevini yerine getirir.",
        points: [
          "Donanım ve Yazılımın Birbirine Bağımlılığı: Donanım (kasa, ekran, işlemci) olmadan yazılım çalışamaz; yazılım (işletim sistemi) olmadan da donanım tek başına hiçbir şey yapamaz. Tıpkı insan bedenine (donanım) ruh ve akıl (yazılım) verilmesi gibi birbirini tamamlarlar.",
          "Veri Akış İlişkisi - 1: Kullanıcı, giriş birimleri (klavye, fare) aracılığıyla bilgisayara komut ve veri gönderir.",
          "Veri Akış İlişkisi - 2: Gönderilen bu veriler işlemci tarafından yorumlanır ve RAM bellekte geçici olarak işlenir.",
          "Veri Akış İlişkisi - 3: İşlenen sonuçlar kalıcı olarak sabit diskte saklanabilir veya çıkış birimleri (ekran, hoparlör) aracılığıyla kullanıcıya sunulur.",
          "Veri Akış İlişkisi - 4: Tüm bu donanım birimlerinin birbiriyle haberleşmesini ve uyumlu çalışmasını ana kart ile işletim sistemi yazılımı sağlar."
        ]
      }
    ],
    term: "1. Dönem",
    recommendedWeek: "6. Hafta",
    icon: "💻"
  }
];
