import { Material } from '../types';

// Kullanıcı isteği doğrultusunda haftalara önceden ders materyali atanmamıştır.
// Öğretmen zaman zaman menülerden veya yükleme panelinden ekleme yaptıkça
// materyaller ilgili haftalara ve orta bölümdeki "Son Yüklenenler" alanına eklenecektir.
export const INITIAL_MATERIALS: Material[] = [
  {
    id: "mat-poster-6-hafta-bilgisayar-sistemleri",
    title: "6. HAFTA Bilgisayar Sistemlerinin Kullanımı (Afiş & Poster)",
    grade: "5. Sınıf",
    unit: "Bilgisayar Sistemlerinin Kullanımı ve Yönetimi",
    term: "1. Dönem",
    period: "1. Ara",
    week: 6,
    type: "dokuman",
    fileFormat: "PNG",
    fileSize: "A4 Ders Posteri",
    dateAdded: "2026-10-18",
    description: "6. HAFTA Bilgisayar Sistemlerinin Kullanımı ders afişi ve panosu. Donanım (iç-dış, giriş-çıkış-çift yönlü) ve Yazılım (işletim sistemleri, uygulama programları) bileşenleri ile veri akış ilişkisi.",
    author: "Hilal KURTOĞLU",
    tags: ["Poster", "Afiş", "6. Hafta", "Bilgisayar Sistemleri", "BTY.5.1.5", "Pano"],
    downloadUrl: "/poster_6_hafta_bilgisayar_sistemleri.png",
    previewUrl: "/poster_6_hafta_bilgisayar_sistemleri.png",
    fileName: "poster_6_hafta_bilgisayar_sistemleri.png",
    isFeatured: true
  },
  {
    id: "mat-not-6-hafta-bilgisayar-sistemleri",
    title: "6. Hafta Defter Notu: Bilgisayar Sistemlerini Çözümleyebilme",
    grade: "5. Sınıf",
    unit: "Bilgisayar Sistemlerinin Kullanımı ve Yönetimi",
    term: "1. Dönem",
    period: "1. Ara",
    week: 6,
    type: "dokuman",
    fileFormat: "PDF",
    fileSize: "Defter Notu / Özet",
    dateAdded: "2026-10-18",
    description: "Donanım (iç donanım, dış donanım; giriş, çıkış ve çift yönlü birimler) ve yazılım (işletim sistemi, uygulama yazılımları) temel bileşenleri ve aralarındaki veri akış ilişkileri.",
    author: "Hilal KURTOĞLU",
    tags: ["Ders Notu", "Donanım", "Yazılım", "6. Hafta", "BTY.5.1.5", "Bilgisayar Sistemleri"],
    downloadUrl: "/ders-notu-6-hafta-bilgisayar-sistemleri.html",
    previewUrl: "/ders-notu-6-hafta-bilgisayar-sistemleri.html",
    fileName: "ders-notu-6-hafta-bilgisayar-sistemleri.html",
    isFeatured: true
  },
  {
    id: "mat-game-6-hafta-donanim-avcisi",
    title: "6. Hafta Oyunu: Donanım Avcısı (İç & Dış Donanım Macerası)",
    grade: "5. Sınıf",
    unit: "Bilgisayar Sistemlerinin Kullanımı ve Yönetimi",
    term: "1. Dönem",
    period: "1. Ara",
    week: 6,
    type: "oyun",
    fileFormat: "HTML5",
    fileSize: "İnteraktif Web Oyunu",
    dateAdded: "2026-10-18",
    description: "Hilal Öğretmen tarafından hazırlanan; 1. Bölümde iç donanım parçalarını tanıma, 2. Bölümde 10 farklı giriş-çıkış birimini sürükle-bırak yöntemiyle sınıflandırma oyunu.",
    author: "Hilal KURTOĞLU",
    tags: ["Eğitsel Oyun", "Donanım Avcısı", "BTY.5.1.5", "6. Hafta", "Akıllı Tahta", "Giriş-Çıkış"],
    downloadUrl: "/oyun-6-hafta-donanim-avcisi.html",
    previewUrl: "/oyun-6-hafta-donanim-avcisi.html",
    fileName: "oyun-6-hafta-donanim-avcisi.html",
    interactiveGameKey: "donanim-avcisi",
    isFeatured: true
  },
  {
    id: "mat-not-4-hafta-yapay-zeka",
    title: "4. Hafta Defter Notu: Yapay Zekâda Temel Kavram ve Özellikler",
    grade: "5. Sınıf",
    unit: "Bilişim Teknolojilerinin Hayatımızdaki Yeri",
    term: "1. Dönem",
    period: "1. Ara",
    week: 4,
    type: "dokuman",
    fileFormat: "PDF",
    fileSize: "Defter Notu / Özet",
    dateAdded: "2026-10-11",
    description: "Yapay zekâ tanımı, günlük hayattaki kullanım alanları, insan zekâsı ile karşılaştırılması, John McCarthy ve yapay zekânın doğuşu, yapay zekâ öncüleri (Ada Lovelace, Alan Turing, Cahit Arf) ve teknolojiyi bilinçli kullanma rehberi.",
    author: "Hilal KURTOĞLU",
    tags: ["Ders Notu", "Yapay Zekâ", "Defter Notu", "4. Hafta", "BTY.5.1.4"],
    isFeatured: true
  },
  {
    id: "mat-game-yapay-zeka-kasifleri",
    title: "Yapay Zekâ Kaşifleri: 5 Görevli Bilişim Macerası",
    grade: "5. Sınıf",
    unit: "Bilişim Teknolojilerinin Hayatımızdaki Yeri",
    term: "1. Dönem",
    period: "1. Ara",
    week: 4,
    type: "oyun",
    fileFormat: "HTML5",
    fileSize: "5 Görevli Web Oyunu",
    dateAdded: "2026-10-11",
    description: "Hilal Öğretmen tarafından hazırlanan; 5 farklı eğitsel görevden oluşan (Yapay Zekâ mı/Değil mi, İnsan vs Yapay Zekâ, Alan Eşleştirme, Öncüler, Güvenli Kullanım) akıllı tahta ve tablet uyumlu 4. hafta macerası.",
    author: "Hilal KURTOĞLU",
    tags: ["Eğitsel Oyun", "Yapay Zekâ Kaşifleri", "BTY.5.1.4", "4. Hafta", "Akıllı Tahta"],
    interactiveGameKey: "yapay-zeka-kasifleri",
    isFeatured: true
  },
  {
    id: "mat-test-4-hafta-yapay-zeka",
    title: "4. Hafta Testi: Yapay Zekâ Temelleri – Bilgini Ölç (16 Soru)",
    grade: "5. Sınıf",
    unit: "Bilişim Teknolojilerinin Hayatımızdaki Yeri",
    term: "1. Dönem",
    period: "1. Ara",
    week: 4,
    type: "test",
    fileFormat: "HTML5",
    fileSize: "16 Soruluk Online Test",
    dateAdded: "2026-10-11",
    description: "Hilal Öğretmen tarafından hazırlanan; BTY.5.1.4 kazanımına uygun, yapay zekânın ne olduğu, nerelerde kullanıldığı, makine öğrenmesi ve güvenli kullanımı üzerine 16 soruluk anında açıklamalı online değerlendirme testi.",
    author: "Hilal KURTOĞLU",
    tags: ["Online Test", "Yapay Zekâ", "Bilgini Ölç", "BTY.5.1.4", "4. Hafta", "Testler"],
    interactiveGameKey: "yapay-zeka",
    isFeatured: true
  },
  {
    id: "mat-test-3-hafta-dijital-kimlik",
    title: "3. Hafta Testi: Dijital Kimlik & Siber Ayak İzi Testi",
    grade: "5. Sınıf",
    unit: "BİT Kullanımı ve Dijital Vatandaşlık",
    term: "1. Dönem",
    period: "1. Ara",
    week: 3,
    type: "test",
    fileFormat: "HTML5",
    fileSize: "10 Soruluk Değerlendirme Testi",
    dateAdded: "2026-10-11",
    description: "Hilal Öğretmen tarafından hazırlanan; BTY.5.1.3 kazanımına uygun, dijital kimlik, siber ayak izi, arama motorlarında kalıcılık, hesap güvenliği ve e-Devlet/EBA hizmetleri üzerine konu değerlendirme testi.",
    author: "Hilal KURTOĞLU",
    tags: ["Online Test", "Dijital Kimlik", "Siber Ayak İzi", "3. Hafta", "Testler", "BTY.5.1.3"],
    interactiveGameKey: "dijital-kimlik",
    isFeatured: true
  },
  {
    id: "mat-game-2",
    title: "Dijital Kimlik Kaşifi: Kimlik, Ayak İzi & Vatandaşlık Oyunu",
    grade: "5. Sınıf",
    unit: "BİT Kullanımı ve Dijital Vatandaşlık",
    term: "1. Dönem",
    period: "1. Ara",
    week: 3,
    type: "oyun",
    fileFormat: "HTML5",
    fileSize: "Etkileşimli Web Oyunu",
    dateAdded: "2026-09-26",
    description: "Hilal Öğretmen tarafından hazırlanan; Dijital Kimlik, Dijital Ayak İzi testleri ve Sağlık, Eğitim, e-Devlet alanlarına ait uygulamaları sürükle-bırak kategorilendirme oyunu.",
    author: "Hilal KURTOĞLU",
    tags: ["Eğitsel Oyun", "Dijital Kimlik", "Dijital Ayak İzi", "e-Devlet", "3. Hafta"],
    interactiveGameKey: "dijital-kimlik",
    isFeatured: true
  },
  {
    id: "mat-game-1",
    title: "Bilişim Kahramanı: Doğru ve Güvenli Teknoloji Macerası",
    grade: "5. Sınıf",
    unit: "Genel Eğitsel Oyun",
    type: "oyun",
    fileFormat: "HTML5",
    fileSize: "Etkileşimli Web Oyunu",
    dateAdded: "2026-09-15",
    description: "Hilal Öğretmen tarafından hazırlanan; Doğru Duruş, Klavye/Fare Kullanımı, Dosya Yönetimi, İnternet Güvenliği ve Dijital Görgü bölümlerinden oluşan akıllı tahta ve tablet uyumlu eğitsel macera oyunu.",
    author: "Hilal KURTOĞLU",
    tags: ["Eğitsel Oyun", "Akıllı Tahta", "Ergonomi", "Siber Güvenlik", "5. Sınıf"],
    interactiveGameKey: "bilisim-kahramani",
    isFeatured: true
  }
];

export const STORAGE_KEY_MATERIALS = "hilal_bty_materials_v3_clean_weeks";

export function loadStoredMaterials(): Material[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_MATERIALS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        // Ensure standard games from INITIAL_MATERIALS are present
        const existingIds = new Set(parsed.map((m: Material) => m.id));
        const missingDefaults = INITIAL_MATERIALS.filter(m => !existingIds.has(m.id));
        if (missingDefaults.length > 0) {
          const combined = [...missingDefaults, ...parsed];
          localStorage.setItem(STORAGE_KEY_MATERIALS, JSON.stringify(combined));
          return combined;
        }
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to load materials from localStorage:", e);
  }
  return INITIAL_MATERIALS;
}

export function saveStoredMaterials(materials: Material[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_MATERIALS, JSON.stringify(materials));
  } catch (e) {
    console.error("Failed to save materials to localStorage:", e);
  }
}

