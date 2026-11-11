import { Material } from '../types';

// Kullanıcı isteği doğrultusunda haftalara önceden ders materyali atanmamıştır.
// Öğretmen zaman zaman menülerden veya yükleme panelinden ekleme yaptıkça
// materyaller ilgili haftalara ve orta bölümdeki "Son Yüklenenler" alanına eklenecektir.
export const INITIAL_MATERIALS: Material[] = [
  {
    id: "mat-poster-secil-gokce-giris-cikis",
    title: "Bilgisayar İçin Giriş-Çıkış Birimleri (Seçil GÖKÇE)",
    grade: "5. Sınıf",
    unit: "Bilgisayar Sistemlerinin Kullanımı ve Yönetimi",
    term: "1. Dönem",
    period: "1. Ara",
    week: 6,
    type: "dokuman",
    fileFormat: "JPG",
    fileSize: "A4 İnfografik Poster",
    dateAdded: "2026-10-20",
    description: "Klavye, fare, dokunmatik ekran, monitör, yazıcı, tarayıcı, hoparlör, kulaklık, mikrofon ve modem gibi giriş-çıkış birimleri afişi. Hazırlayan: Seçil GÖKÇE.",
    author: "Seçil GÖKÇE",
    tags: ["Poster", "Giriş-Çıkış", "6. Hafta", "Seçil Gökçe", "BTY.5.1.5"],
    downloadUrl: "./bilgisayar_icin_giris_cikis_birimleri.jpg",
    previewUrl: "./bilgisayar_icin_giris_cikis_birimleri.jpg",
    fileName: "Bilgisayar_Icin_Giris_Cikis_Birimleri_Posteri.jpg",
    isFeatured: true
  },
  {
    id: "mat-poster-secil-gokce-klavye-fare",
    title: "Klavye Tuşları ve Fare Kullanım Rehberi (Seçil GÖKÇE)",
    grade: "5. Sınıf",
    unit: "Bilgisayar Sistemlerinin Kullanımı ve Yönetimi",
    term: "1. Dönem",
    period: "1. Ara",
    week: 6,
    type: "dokuman",
    fileFormat: "JPG",
    fileSize: "A4 İnfografik Poster",
    dateAdded: "2026-10-20",
    description: "Klavyenin bölümleri, tuşların görevleri, klavye kısayolları ve farenin kullanımı infografik rehber posteri. Hazırlayan: Seçil GÖKÇE.",
    author: "Seçil GÖKÇE",
    tags: ["Poster", "Klavye", "Fare", "6. Hafta", "Seçil Gökçe", "BTY.5.1.5"],
    downloadUrl: "./fare-klavye.jpg",
    previewUrl: "./fare-klavye.jpg",
    fileName: "Klavye_Tuslari_ve_Fare_Kullanim_Rehberi_Posteri.jpg",
    isFeatured: true
  },
  {
    id: "mat-poster-6-hafta-temel-bilesenler",
    title: "6. Hafta-Bilgisayar sistemlerinin temel bileşenleri",
    grade: "5. Sınıf",
    unit: "Bilgisayar Sistemlerinin Kullanımı ve Yönetimi",
    term: "1. Dönem",
    period: "1. Ara",
    week: 6,
    type: "dokuman",
    fileFormat: "JPG",
    fileSize: "A4 Renkli Poster",
    dateAdded: "2026-10-25",
    description: "Donanım (iç-dış, giriş-çıkış-çift yönlü) ve Yazılım (işletim sistemi, uygulama yazılımları) bileşenleri ile veri akış ilişkisini gösteren 6. hafta ders posteri.",
    author: "Hilal KURTOĞLU & Mücahit BOZOK",
    tags: ["Poster", "6. Hafta", "Bilgisayar Sistemleri", "BTY.5.1.5", "Pano"],
    downloadUrl: "./bilgisayar_sistemlerinin_temel_bilesenleri.jpg",
    previewUrl: "./bilgisayar_sistemlerinin_temel_bilesenleri.jpg",
    fileName: "6_Hafta_Bilgisayar_Sistemlerinin_Temel_Bilesenleri_Posteri.jpg",
    isFeatured: true
  },
  {
    id: "mat-etkinlik-7-hafta-donanim-yazilim-bosluk-doldurma",
    title: "7. Hafta Donanım ve Yazılım Kavramları Etkinlik Kağıdı",
    grade: "5. Sınıf",
    unit: "Bilgisayar Sistemlerinin Kullanımı ve Yönetimi",
    term: "1. Dönem",
    period: "1. Ara",
    week: 7,
    type: "etkinlik",
    fileFormat: "HTML5 / A4",
    fileSize: "İnteraktif & Yazdırılabilir A4",
    dateAdded: "2026-10-25",
    description: "Donanım ve yazılım kavramları, iç donanım birimleri, işletim sistemleri ve Pardus üzerine 13 soruluk kelime havuzlu interaktif boşluk doldurma çalışma kâğıdı. Çözülebilir ve A4 olarak yazdırılabilir.",
    author: "Hilal KURTOĞLU",
    tags: ["Etkinlik Kâğıdı", "7. Hafta", "Boşluk Doldurma", "Donanım", "Yazılım", "Pardus", "BTY.5.1.5"],
    downloadUrl: "./bosluk-doldurma-etkinlik-kagidi.html",
    previewUrl: "./bosluk-doldurma-etkinlik-kagidi.html",
    fileName: "bosluk-doldurma-etkinlik-kagidi.html",
    isFeatured: true
  },
  {
    id: "mat-poster-secil-gokce-yazilim-nedir",
    title: "Yazılım Nedir? - Yazılım Türleri (Seçil GÖKÇE)",
    grade: "5. Sınıf",
    unit: "Bilgisayar Sistemlerinin Kullanımı ve Yönetimi",
    term: "1. Dönem",
    period: "1. Ara",
    week: 7,
    type: "dokuman",
    fileFormat: "JPG",
    fileSize: "A4 İnfografik Poster",
    dateAdded: "2026-10-28",
    description: "Yazılım kavramı, işletim sistemleri, uygulama yazılımları, programlama dilleri, işletim sisteminin 4 temel görevi, Windows ve Pardus infografik afişi. Hazırlayan: Seçil GÖKÇE.",
    author: "Seçil GÖKÇE",
    tags: ["Poster", "Yazılım Nedir", "İşletim Sistemi", "Pardus", "7. Hafta", "Seçil Gökçe", "BTY.5.1.5"],
    downloadUrl: "./yazilim_nedir_yazilim_turleri_secil_gokce.jpg",
    previewUrl: "./yazilim_nedir_yazilim_turleri_secil_gokce.jpg",
    fileName: "Yazilim_Nedir_Yazilim_Turleri_Posteri.jpg",
    isFeatured: true
  },
  {
    id: "mat-poster-secil-gokce-dosya-klasor",
    title: "Dosya ve Klasör Yönetimi (Seçil GÖKÇE)",
    grade: "5. Sınıf",
    unit: "Bilgisayar Sistemlerinin Kullanımı ve Yönetimi",
    term: "1. Dönem",
    period: "1. Ara",
    week: 8,
    type: "dokuman",
    fileFormat: "JPG",
    fileSize: "A4 İnfografik Poster",
    dateAdded: "2026-11-01",
    description: "Dosya ve klasör kavramları, görsel, ses, video, ofis, kurulum ve sıkıştırma dosya uzantıları ile doğru-yanlış etkinliğini içeren infografik ders afişi. Hazırlayan: Seçil GÖKÇE.",
    author: "Seçil GÖKÇE",
    tags: ["Poster", "Dosya ve Klasör", "Dosya Uzantıları", "8. Hafta", "Seçil Gökçe", "BTY.5.1.6"],
    downloadUrl: "./dosya_ve_klasor_yonetimi_secil_gokce.jpg",
    previewUrl: "./dosya_ve_klasor_yonetimi_secil_gokce.jpg",
    fileName: "Dosya_ve_Klasor_Yonetimi_Posteri.jpg",
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
    downloadUrl: "./oyun-6-hafta-donanim-avcisi.html",
    previewUrl: "./oyun-6-hafta-donanim-avcisi.html",
    fileName: "oyun-6-hafta-donanim-avcisi.html",
    interactiveGameKey: "donanim-avcisi",
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

export const STORAGE_KEY_MATERIALS = "hilal_bty_materials_v8_clean_portal";

const REMOVED_MATERIAL_IDS = new Set([
  'mat-not-6-hafta-bilgisayar-sistemleri',
  'mat-not-4-hafta-yapay-zeka'
]);

export function loadStoredMaterials(): Material[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_MATERIALS) || localStorage.getItem("hilal_bty_materials_v6_full_pack");
    if (saved) {
      let parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        // Strip out any removed defter notu items
        parsed = parsed.filter((m: Material) => !REMOVED_MATERIAL_IDS.has(m.id));
        // Ensure standard items from INITIAL_MATERIALS are present
        const existingIds = new Set(parsed.map((m: Material) => m.id));
        const missingDefaults = INITIAL_MATERIALS.filter(m => !existingIds.has(m.id));
        const combined = [...missingDefaults, ...parsed];
        localStorage.setItem(STORAGE_KEY_MATERIALS, JSON.stringify(combined));
        return combined;
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

