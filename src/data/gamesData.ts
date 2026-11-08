export interface GameItem {
  id: string;
  title: string;
  subtitle: string;
  weekTag: string;
  description: string;
  icon: string;
  accentColor: 'teal' | 'purple' | 'amber' | 'blue' | 'rose';
  tags: string[];
  features: string[];
  iframeUrl?: string;
}

export const GAMES_REGISTRY: GameItem[] = [
  {
    id: 'dosya-uzantisi-avcisi',
    title: '8. Hafta Dosya Uzantısı Avcısı',
    subtitle: '5. Sınıf · 8. Hafta – Dosya Türleri ve Uzantıları Avlama Oyunu',
    weekTag: '8. Hafta',
    description: 'Görsel, Ses, Video, Belge, Sunum, Elektronik Tablo, Sıkıştırılmış ve Program dosya uzantılarını (.jpg, .mp3, .mp4, .docx, .pptx, .xlsx, .zip, .exe) zamana ve canlara karşı avlayın!',
    icon: '🔎',
    accentColor: 'blue',
    iframeUrl: '/dosya-uzantisi-avcisi.html',
    tags: ['Dosya Uzantısı', 'Dosya Yönetimi', '8. Hafta', 'Eğitsel Oyun', 'Akıllı Tahta'],
    features: [
      '8 Farklı Dosya Kategorisi (Görsel, Ses, Video, Belge, Sunum, Tablo, Arşiv, Program)',
      'Çoktan Seçmeli Hızlı Kart Eşleme & Puanlama Sistemi',
      'Can Sayacı, Tur İlerleme Çubuğu ve Başarı Rozetleri',
      'Dokunmatik akıllı tahta ve tabletlerle %100 uyumlu'
    ]
  },
  {
    id: 'donanim-bulmaca-cengel',
    title: '6. Hafta Donanım Bulmacası Çengel Bulmaca',
    subtitle: 'Donanım Bulmacası ve Boşluk Doldurma Etkinliği (Çengel Bulmaca & Kavram Eşleştirme)',
    weekTag: '6. Hafta',
    description: 'İç ve dış donanım parçaları, giriş-çıkış birimleri ve temel donanım kavramlarını içeren interaktif çengel bulmaca ve sürükle-bırak boşluk doldurma etkinliği.',
    icon: '🧩',
    accentColor: 'teal',
    iframeUrl: '/donanim-bulmaca-bosluk-doldurma.html',
    tags: ['Çengel Bulmaca', 'Donanım', 'Boşluk Doldurma', '6. Hafta', 'Akıllı Tahta'],
    features: [
      '1. Bölüm: İnteraktif Çengel Bulmaca (Sanal Klavye, Yatay & Dikey İpuçları, Anında Kontrol)',
      '2. Bölüm: Sürükle-Bırak Boşluk Doldurma (Kelime Havuzu, Dokunmatik Eşleştirme)',
      '13 Temel Donanım ve Yazılım Kavramı',
      'Çözümü Göster ve Temizle Seçenekleri'
    ]
  },
  {
    id: 'donanim-avcisi',
    title: 'Donanım Avcısı',
    subtitle: '5. Sınıf · 6. Hafta – İç ve Dış Donanım Birimleri Macerası',
    weekTag: '6. Hafta',
    description: 'Bilgisayar sisteminin iç donanım parçalarını tanı, görevlerini eşleştir! Dış donanım birimlerini Giriş, Çıkış ve Hem Giriş Hem Çıkış kutularına sürükle-bırak yöntemiyle yerleştir, donanım uzmanı rozetini kazan!',
    icon: '💻',
    accentColor: 'teal',
    tags: ['Donanım Avcısı', 'İç Donanım', 'Dış Donanım', 'Giriş-Çıkış', '6. Hafta', 'BTY.5.1.5', 'Akıllı Tahta'],
    features: [
      '1. Bölüm: İç Donanım Parçaları Tanıma Testi (Anakart, CPU, RAM, SSD, GPU, Güç Kaynağı, Fan)',
      '2. Bölüm: Dış Donanım Sürükle-Bırak Eşleştirme (Giriş, Çıkış, Hem Giriş-Çıkış)',
      '10 Giriş-Çıkış Donanımı: Klavye, Fare, Tarayıcı, Mikrofon, Monitör, Yazıcı, Hoparlör, Kulaklık, Dokunmatik Ekran, Modem',
      'Dokunmatik akıllı tahta ve tabletlerle %100 uyumlu',
      '🏅 Donanım Uzmanı Başarı Madalyası ve Değerlendirme Karnesi'
    ]
  },
  {
    id: 'yapay-zeka-kasifleri',
    title: 'Yapay Zekâ Kaşifleri',
    subtitle: '5. Sınıf · 4. Hafta – 5 Görevli Yapay Zekâ Macerası',
    weekTag: '4. Hafta',
    description: 'Yapay zekânın temellerini 5 eğlenceli görevle keşfet! Yapay zekâ mı/değil mi sınıflandırması, insan vs makine karşılaştırması, alan eşleştirmeleri, öncü bilim insanları ve bilinçli kullanım görevlerini tamamla, kaşif rozetini kazan!',
    icon: '🤖',
    accentColor: 'blue',
    tags: ['Yapay Zekâ Kaşifleri', 'BTY.5.1.4', '4. Hafta', '5 Görev', 'Eşleştirme', 'Sınıflandırma', 'Akıllı Tahta'],
    features: [
      '1. Görev: Yapay Zekâ mı, Değil mi? (8 Örnek)',
      '2. Görev: İnsan mı, Yapay Zekâ mı? (Özellik Analizi)',
      '3. Görev: Yapay Zekâ Nerede? (Kullanım Alanları Eşleştirme)',
      '4. Görev: Yapay Zekânın Öncüleri (Turing, Arf, McCarthy, Lovelace)',
      '5. Görev: Kaptan Sensin! (Güvenli & Bilinçli Kullanım Soruları)'
    ]
  },
  {
    id: 'dijital-kimlik',
    title: 'Dijital Kimlik Kaşifi',
    subtitle: 'Dijital Kimlik, Ayak İzi & Vatandaşlık Uygulamaları',
    weekTag: '3. Hafta',
    description: 'Dijital kimlik kavramı, arama motorlarındaki kalıcılık, dijital ayak izi ve e-Devlet, Sağlık (MHRS), Eğitim (EBA) alanlarına ait uygulamaları sürükle-bırak kategorilendirme oyunu.',
    icon: '🆔',
    accentColor: 'teal',
    tags: ['Dijital Kimlik', 'Dijital Ayak İzi', 'e-Devlet', 'Sürükle-Bırak', '3. Hafta'],
    features: [
      '1. Bölüm: Dijital Kimlik çoktan seçmeli test',
      '2. Bölüm: Dijital Ayak İzi güvenlik testi',
      '3. Bölüm: Eğitim, Sağlık, E-Devlet uygulamalarını sürükle-bırak eşleştirme',
      'Dokunmatik tahta ve tablet uyumlu sürükleme',
      '🏅 Dijital Vatandaş Rozeti ve anlık değerlendirme'
    ]
  },
  {
    id: 'bilisim-kahramani',
    title: 'Bilişim Kahramanı',
    subtitle: 'Doğru & Güvenli Teknoloji Macerası',
    weekTag: 'Tüm Konular',
    description: '5 seviyeden oluşan kapsamlı macera: Bilgisayar ergonomisi ve duruş kuralları, donanım birimleri, dosya yönetimi, internet etiği ve siber güvenlik görevleri.',
    icon: '🎮',
    accentColor: 'purple',
    tags: ['Ergonomi', 'Donanım', 'Siber Güvenlik', '5 Seviyeli Macera', 'Tüm Konular'],
    features: [
      '1. Seviye: Ergonomi ve Sağlıklı Bilgisayar Kullanımı',
      '2. Seviye: İç ve Dış Donanım Birimleri',
      '3. Seviye: Dosya ve Klasör Düzeni',
      '4. Seviye: Güvenli Şifre ve İnternet Güvenliği',
      '5. Seviye: Dijital Görgü ve Netiket'
    ]
  }
];
