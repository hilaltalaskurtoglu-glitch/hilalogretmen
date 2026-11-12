import { Material } from '../types';
import { getAssetUrl } from './assetUrl';

/**
 * Downloads a file via binary fetch to Blob to prevent SPA html routing corruption
 */
export async function downloadBinaryBlob(url: string, filename: string): Promise<{ success: boolean; message: string }> {
  const resolvedUrl = getAssetUrl(url);
  try {
    const res = await fetch(resolvedUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => window.URL.revokeObjectURL(blobUrl), 2000);
    return { success: true, message: `"${filename}" başarıyla bilgisayarınıza indirildi!` };
  } catch (err) {
    console.error('Blob download error:', err);
    window.open(resolvedUrl, '_blank');
    return { success: true, message: 'Dosya yeni sekmede açıldı!' };
  }
}

/**
 * Handles real downloading of any material (user uploaded Data URLs, external links, or generated document packages)
 */
export function downloadMaterialFile(material: Material): { success: boolean; message: string } {
  try {
    const fileName = material.fileName || `${sanitizeFileName(material.title)}.${(material.fileFormat || 'pdf').toLowerCase()}`;

    // 1. If it's an external web link (e.g., Google Drive, EBA, Canva, OneDrive, etc.)
    if (material.downloadUrl && (material.downloadUrl.startsWith('http://') || material.downloadUrl.startsWith('https://'))) {
      const win = window.open(material.downloadUrl, '_blank');
      if (win) {
        return { success: true, message: 'Bağlantı yeni sekmede açıldı ve indirme başlatıldı!' };
      }
      const a = document.createElement('a');
      a.href = material.downloadUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return { success: true, message: 'İndirme bağlantısı açıldı!' };
    }

    // 1.5. If it's a direct local asset or document file in the portal
    const rawAssetUrl = material.downloadUrl || material.previewUrl;
    if (rawAssetUrl && !rawAssetUrl.startsWith('data:')) {
      downloadBinaryBlob(rawAssetUrl, fileName || material.fileName || 'materyal_dosyasi');
      return { success: true, message: `"${fileName}" başarıyla bilgisayarınıza indirildi!` };
    }

    // Special: 4. Hafta Defter Notu HTML Dosyası
    if (material.id === 'mat-not-4-hafta-yapay-zeka') {
      const a = document.createElement('a');
      a.href = getAssetUrl('ders-notu-4-hafta-yapay-zeka.html');
      a.download = '4_Hafta_Yapay_Zeka_Ders_Notu.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return { success: true, message: '"4. Hafta Defter Notu" HTML dosyası başarıyla indirildi!' };
    }

    // Special: 4. Hafta Yapay Zekâ Web Oyunu HTML Dosyası
    if (material.id === 'mat-game-3' || material.interactiveGameKey === 'yapay-zeka') {
      const a = document.createElement('a');
      a.href = getAssetUrl('oyun-4-hafta-yapay-zeka.html');
      a.download = '4_Hafta_Yapay_Zeka_Oyunu.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return { success: true, message: '"Yapay Zekâ Bilgini Ölç" oyun dosyası başarıyla indirildi!' };
    }

    // 2. If it's a real base64/Data URL (from user uploaded file)
    if (material.downloadUrl && (material.downloadUrl.startsWith('data:') || material.downloadUrl.startsWith('blob:'))) {
      const a = document.createElement('a');
      a.href = material.downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return { success: true, message: `"${fileName}" başarıyla bilgisayarınıza indirildi!` };
    }

    // 3. If it's a default portal material without a direct file attached yet,
    // generate a rich formatted lesson package document so the download never fails!
    const documentContent = `===============================================================
AHİ EVRAN ORTAOKULU - 5. SINIF BİLİŞİM TEKNOLOJİLERİ VE YAZILIM
DERS MATERYALİ VE ÇALIŞMA FORMU
Öğretmen: Hilal KURTOĞLU
Tarih: ${material.dateAdded}
===============================================================

MATERYAL BAŞLIĞI: ${material.title}
DERS DÜZEYİ: ${material.grade}
ÜNİTE / ÖĞRENME ALANI: ${material.unit}
DÖNEM / HAFTA: ${material.term || '1. Dönem'} - ${material.period || '1. Ara'} (${material.week || 1}. Hafta)
TÜR / FORMAT: ${material.type.toUpperCase()} (${material.fileFormat})
DOSYA BOYUTU: ${material.fileSize || 'Standard'}

---------------------------------------------------------------
İÇERİK VE KAZANIM AÇIKLAMASI:
---------------------------------------------------------------
${material.description}

---------------------------------------------------------------
ÖĞRENCİ VE ÖĞRETMEN UYGULAMA İPUÇLARI:
---------------------------------------------------------------
1. Bu ders materyali akıllı tahta ve öğrenci bilgisayarlarıyla tam uyumludur.
2. Öğrencilerin bireysel veya takım halinde inceleyip etkinlikleri tamamlaması önerilir.
3. İlgili ünite için haftalık yıllık plandaki kazanım göstergelerini takip ediniz.

Etiketler: ${material.tags.join(', ')}

Hilal KURTOĞLU &bull; Bilişim Teknolojileri ve Yazılım Dersi Portalı
Ahi Evran Ortaokulu &copy; 2026-2027
`;

    const blob = new Blob([documentContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sanitizeFileName(material.title)}_ders_materyali.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return { success: true, message: `"${material.title}" materyal belgesi başarıyla indirildi!` };
  } catch (err) {
    console.error('Download error:', err);
    return { success: false, message: 'Dosya indirilirken bir hata oluştu.' };
  }
}

/**
 * Copies the material download link or sharing url to clipboard
 */
export async function copyMaterialShareLink(material: Material): Promise<boolean> {
  try {
    const textToCopy = material.downloadUrl && material.downloadUrl.startsWith('http')
      ? material.downloadUrl
      : `${window.location.origin}/#materyal-${material.id}`;

    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(textToCopy);
      return true;
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch {
    return false;
  }
}

function sanitizeFileName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[ğ]/g, 'g')
    .replace(/[ü]/g, 'u')
    .replace(/[ş]/g, 's')
    .replace(/[ı]/g, 'i')
    .replace(/[ö]/g, 'o')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9_-]/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 50);
}
