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
}

export const GAMES_REGISTRY: GameItem[] = [
  {
    id: 'yapay-zeka',
    title: 'Yapay Zekâ Temelleri – Bilgini Ölç',
    subtitle: 'BTY.5.1.4 Yapay Zekâ Kavramlarını Sorgulama',
    weekTag: '4. Hafta',
    description: 'Yapay zekânın ne olduğunu, nerelerde kullanıldığını, makine öğrenmesini ve güvenle nasıl kullanacağımızı 16 soruda sına. Anında açıklama ve dönütlerle öğren!',
    icon: '🤖',
    accentColor: 'blue',
    tags: ['Yapay Zekâ', 'Makine Öğrenmesi', 'BTY.5.1.4', 'Sesli Asistanlar', 'Etik ve Güvenlik', '4. Hafta'],
    features: [
      '16 Özgün Soru & Anında Açıklamalı Dönüt',
      'Kazanım: BTY.5.1.4 Yapay zekâ kavramlarını sorgulama',
      'Görsel İlerleme Çubuğu ve Doğru/Yanlış Takibi',
      'Sadece Yanlışları Yeniden Çözme (Akıllı Tekrar) Modu',
      'Klavye (A, B, C, D, 1-4, Enter) ve Dokunmatik Tahta Uyumlu'
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
