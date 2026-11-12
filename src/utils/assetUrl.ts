/**
 * assetUrl.ts - Evrensel Varlık (Asset) Yolu Çözümleyici
 * 
 * Bu yardımcı fonksiyon, projenin hem Vercel kök dizininde (https://domain.vercel.app/)
 * hem de GitHub Pages alt dizininde (https://kullaniciadi.github.io/depo-adi/)
 * ve yerel geliştirme ortamında aynı kusursuzlukta çalışmasını sağlar.
 * 
 * Tüm resim, PDF, HTML oyunu ve indirme bağlantılarının 404 vermeden
 * tam adresle açılmasını ve indirilmesini garanti eder.
 */

export function getAssetUrl(url: string | null | undefined): string {
  if (!url) return '';

  // 1. Dış bağlantılar (http, https), data URL veya blob URL ise doğrudan döndür
  if (/^(https?:|data:|blob:)/i.test(url)) {
    return url;
  }

  // 2. Başındaki "./", "/", "public/" ve fazlalıkları temizle
  let cleanPath = url.replace(/^(\.\/|\/)+/, '').replace(/^public\//, '');

  // 3. Tarayıcı ortamında çalışırken
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    const pathname = window.location.pathname;

    // GitHub Pages veya herhangi bir alt dizinde çalışıp çalışmadığını tespit et:
    // Örneğin pathname "/bty-5-portali/index.html" veya "/bty-5-portali/" ise baseDir = "/bty-5-portali/"
    // Eğer kök dizindeyse (Vercel gibi: "/" veya "/index.html") baseDir = "/"
    let baseDir = '/';
    if (pathname && pathname !== '/') {
      const segments = pathname.split('/').filter(Boolean);
      // Eğer son segment bir dosya adı ise (.html, .htm vb.), onu klasör listesinden çıkar
      if (segments.length > 0 && segments[segments.length - 1].includes('.')) {
        segments.pop();
      }
      baseDir = segments.length > 0 ? `/${segments.join('/')}/` : '/';
    }

    // Eğer cleanPath zaten baseDir adıyla başlıyorsa (örn: repo-adi/resim.jpg), tekrar eklememek için temizle
    if (baseDir !== '/') {
      const rawBase = baseDir.replace(/^\/|\/$/g, '');
      if (cleanPath.startsWith(`${rawBase}/`)) {
        cleanPath = cleanPath.slice(rawBase.length + 1);
      }
    }

    return `${origin}${baseDir}${cleanPath}`;
  }

  // 4. SSR / Node ortamı geri dönüşü
  return `/${cleanPath}`;
}
