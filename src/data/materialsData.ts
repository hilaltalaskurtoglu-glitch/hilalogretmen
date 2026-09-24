import { Material } from '../types';

// Kullanıcı isteği doğrultusunda haftalara önceden ders materyali atanmamıştır.
// Öğretmen zaman zaman menülerden veya yükleme panelinden ekleme yaptıkça
// materyaller ilgili haftalara ve orta bölümdeki "Son Yüklenenler" alanına eklenecektir.
export const INITIAL_MATERIALS: Material[] = [
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

