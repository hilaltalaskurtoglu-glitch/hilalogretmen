import { Material } from '../types';

// Kullanıcı isteği doğrultusunda haftalara önceden ders materyali atanmamıştır.
// Öğretmen zaman zaman menülerden veya yükleme panelinden ekleme yaptıkça
// materyaller ilgili haftalara ve orta bölümdeki "Son Yüklenenler" alanına eklenecektir.
export const INITIAL_MATERIALS: Material[] = [
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

