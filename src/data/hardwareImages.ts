// Professional High-Quality SVG Hardware Illustrations for Donanım Avcısı Game

const createSvgDataUri = (svgString: string): string => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
};

// 1. ANAKART (Motherboard)
export const ANAKART_SVG = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 240" width="100%" height="100%">
  <defs>
    <linearGradient id="pcbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#064e3b"/>
      <stop offset="100%" stop-color="#022c22"/>
    </linearGradient>
    <linearGradient id="cpuSocket" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e2e8f0"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </linearGradient>
    <linearGradient id="heatsink" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#64748b"/>
      <stop offset="50%" stop-color="#94a3b8"/>
      <stop offset="100%" stop-color="#475569"/>
    </linearGradient>
    <pattern id="traces" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 0 10 L 20 10 M 10 0 L 10 20" stroke="#059669" stroke-width="0.7" fill="none" opacity="0.4"/>
    </pattern>
  </defs>
  <!-- PCB Base -->
  <rect x="10" y="10" width="280" height="220" rx="12" fill="url(#pcbGrad)" stroke="#10b981" stroke-width="2.5"/>
  <rect x="15" y="15" width="270" height="210" rx="8" fill="url(#traces)"/>

  <!-- I/O Ports Shield (Left) -->
  <rect x="10" y="40" width="25" height="110" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
  <rect x="15" y="50" width="15" height="12" rx="2" fill="#3b82f6"/>
  <rect x="15" y="70" width="15" height="12" rx="2" fill="#ef4444"/>
  <rect x="15" y="90" width="15" height="15" rx="2" fill="#10b981"/>
  <rect x="15" y="115" width="15" height="25" rx="2" fill="#f59e0b"/>

  <!-- CPU Socket & CPU Center -->
  <rect x="100" y="50" width="70" height="70" rx="6" fill="url(#cpuSocket)" stroke="#94a3b8" stroke-width="3"/>
  <rect x="110" y="60" width="50" height="50" rx="4" fill="#334155" stroke="#475569" stroke-width="1.5"/>
  <text x="135" y="88" font-family="sans-serif" font-size="10" font-weight="900" fill="#38bdf8" text-anchor="middle">LGA 1700</text>

  <!-- VRM Heatsinks -->
  <rect x="90" y="30" width="90" height="15" rx="3" fill="url(#heatsink)" stroke="#334155" stroke-width="1"/>
  <rect x="80" y="55" width="15" height="55" rx="3" fill="url(#heatsink)" stroke="#334155" stroke-width="1"/>

  <!-- RAM Slots (Right) -->
  <rect x="210" y="35" width="14" height="100" rx="3" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
  <rect x="230" y="35" width="14" height="100" rx="3" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
  <line x1="217" y1="40" x2="217" y2="130" stroke="#0f172a" stroke-width="2"/>
  <line x1="237" y1="40" x2="237" y2="130" stroke="#0f172a" stroke-width="2"/>

  <!-- PCIe Slots (Bottom) -->
  <rect x="50" y="155" width="150" height="12" rx="3" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <rect x="50" y="185" width="120" height="10" rx="3" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>

  <!-- Chipset Heatsink (Bottom Right) -->
  <rect x="200" y="155" width="60" height="50" rx="6" fill="url(#heatsink)" stroke="#334155" stroke-width="2"/>
  <circle cx="230" cy="180" r="16" fill="#1e293b" stroke="#94a3b8" stroke-width="2"/>
  <text x="230" y="184" font-family="sans-serif" font-size="10" font-weight="bold" fill="#38bdf8" text-anchor="middle">CHIPSET</text>

  <!-- Title Badge -->
  <rect x="85" y="210" width="130" height="18" rx="9" fill="#022c22" stroke="#10b981" stroke-width="1.5"/>
  <text x="150" y="223" font-family="sans-serif" font-size="10" font-weight="900" fill="#34d399" text-anchor="middle" letter-spacing="1">ANAKART (MOTHERBOARD)</text>
</svg>
`);

// 2. İŞLEMCİ (CPU Processor)
export const ISLEMCU_SVG = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 240" width="100%" height="100%">
  <defs>
    <linearGradient id="cpuGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="heatSpreader" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#cbd5e1"/>
      <stop offset="50%" stop-color="#94a3b8"/>
      <stop offset="100%" stop-color="#64748b"/>
    </linearGradient>
  </defs>
  <!-- Background glow -->
  <circle cx="150" cy="120" r="90" fill="#38bdf8" opacity="0.15" filter="blur(10px)"/>

  <!-- CPU Substrate PCB -->
  <rect x="65" y="35" width="170" height="170" rx="14" fill="#1e293b" stroke="#334155" stroke-width="3"/>

  <!-- Gold Pins Matrix Effect on Substrate -->
  <g fill="#fbbf24" opacity="0.7">
    <circle cx="85" cy="55" r="3"/><circle cx="105" cy="55" r="3"/><circle cx="125" cy="55" r="3"/><circle cx="145" cy="55" r="3"/><circle cx="165" cy="55" r="3"/><circle cx="185" cy="55" r="3"/><circle cx="205" cy="55" r="3"/>
    <circle cx="85" cy="185" r="3"/><circle cx="105" cy="185" r="3"/><circle cx="125" cy="185" r="3"/><circle cx="145" cy="185" r="3"/><circle cx="165" cy="185" r="3"/><circle cx="185" cy="185" r="3"/><circle cx="205" cy="185" r="3"/>
  </g>

  <!-- Metal Integrated Heat Spreader (IHS) -->
  <rect x="85" y="55" width="130" height="130" rx="8" fill="url(#heatSpreader)" stroke="#475569" stroke-width="2"/>
  <rect x="95" y="65" width="110" height="110" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1"/>

  <!-- CPU Branding & Text -->
  <rect x="105" y="85" width="90" height="70" rx="4" fill="#0f172a"/>
  <text x="150" y="110" font-family="sans-serif" font-size="16" font-weight="900" fill="#38bdf8" text-anchor="middle">CPU</text>
  <text x="150" y="130" font-family="sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">CORE i7</text>
  <text x="150" y="146" font-family="sans-serif" font-size="9" font-weight="700" fill="#94a3b8" text-anchor="middle">3.8 GHz • 16MB</text>

  <!-- Triangle Pin 1 Indicator -->
  <polygon points="95,65 110,65 95,80" fill="#475569"/>

  <!-- Title Badge -->
  <rect x="85" y="210" width="130" height="18" rx="9" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="150" y="223" font-family="sans-serif" font-size="10" font-weight="900" fill="#38bdf8" text-anchor="middle" letter-spacing="1">İŞLEMCİ (CPU)</text>
</svg>
`);

// 3. GÜÇ KAYNAĞI / PSU (Power Supply)
export const GUC_SVG = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 240" width="100%" height="100%">
  <defs>
    <linearGradient id="psuBody" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <radialGradient id="fanGrill" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </radialGradient>
  </defs>
  <!-- PSU Metallic Box -->
  <rect x="40" y="40" width="220" height="150" rx="10" fill="url(#psuBody)" stroke="#64748b" stroke-width="3"/>
  <rect x="50" y="50" width="200" height="130" rx="6" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>

  <!-- Large Cooling Fan Circle on Top/Side -->
  <circle cx="120" cy="115" r="50" fill="url(#fanGrill)" stroke="#475569" stroke-width="2"/>
  <!-- Fan Blades -->
  <g stroke="#94a3b8" stroke-width="2" stroke-linecap="round">
    <line x1="120" y1="115" x2="120" y2="70"/>
    <line x1="120" y1="115" x2="160" y2="95"/>
    <line x1="120" y1="115" x2="165" y2="125"/>
    <line x1="120" y1="115" x2="135" y2="155"/>
    <line x1="120" y1="115" x2="90" y2="150"/>
    <line x1="120" y1="115" x2="80" y2="105"/>
  </g>
  <circle cx="120" cy="115" r="10" fill="#38bdf8"/>

  <!-- AC Power Plug & Switch (Right) -->
  <rect x="195" y="65" width="45" height="40" rx="4" fill="#0f172a" stroke="#64748b" stroke-width="2"/>
  <rect x="205" y="75" width="25" height="20" rx="2" fill="#1e293b"/>
  <circle cx="217" cy="85" r="3" fill="#ef4444"/>

  <rect x="195" y="115" width="45" height="20" rx="4" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
  <text x="217" y="129" font-family="sans-serif" font-size="9" font-weight="900" fill="#38bdf8" text-anchor="middle">650W</text>

  <!-- Power Cables Bundling out (Bottom left) -->
  <path d="M 50 170 Q 30 170 20 200 L 45 200 Q 50 180 60 170 Z" fill="#ef4444"/>
  <path d="M 60 170 Q 40 170 30 205 L 55 205 Q 65 180 70 170 Z" fill="#f59e0b"/>
  <path d="M 70 170 Q 55 170 45 210 L 70 210 Q 75 185 80 170 Z" fill="#3b82f6"/>

  <!-- Title Badge -->
  <rect x="85" y="210" width="130" height="18" rx="9" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="150" y="223" font-family="sans-serif" font-size="10" font-weight="900" fill="#38bdf8" text-anchor="middle" letter-spacing="1">GÜÇ KAYNAĞI (PSU)</text>
</svg>
`);

// 4. FAN / SOĞUTMA (Cooler Fan)
export const FAN_SVG = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 240" width="100%" height="100%">
  <defs>
    <radialGradient id="fanGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- Background glow -->
  <circle cx="150" cy="115" r="80" fill="url(#fanGlow)" filter="blur(8px)"/>

  <!-- Outer Frame (Square) -->
  <rect x="65" y="30" width="170" height="170" rx="20" fill="#1e293b" stroke="#38bdf8" stroke-width="3"/>
  <rect x="75" y="40" width="150" height="150" rx="14" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>

  <!-- Mounting Screw Holes -->
  <circle cx="90" cy="55" r="6" fill="#334155" stroke="#64748b" stroke-width="1.5"/>
  <circle cx="210" cy="55" r="6" fill="#334155" stroke="#64748b" stroke-width="1.5"/>
  <circle cx="90" cy="175" r="6" fill="#334155" stroke="#64748b" stroke-width="1.5"/>
  <circle cx="210" cy="175" r="6" fill="#334155" stroke="#64748b" stroke-width="1.5"/>

  <!-- Circular Fan Housing -->
  <circle cx="150" cy="115" r="65" fill="#1e293b" stroke="#475569" stroke-width="2"/>

  <!-- Fan Blades (Rotating Curved Effect) -->
  <g fill="#38bdf8" opacity="0.85">
    <path d="M 150 115 Q 170 70 190 90 Q 170 115 150 115 Z"/>
    <path d="M 150 115 Q 195 135 180 160 Q 150 135 150 115 Z"/>
    <path d="M 150 115 Q 130 160 110 140 Q 130 115 150 115 Z"/>
    <path d="M 150 115 Q 105 95 120 70 Q 150 95 150 115 Z"/>
  </g>

  <!-- Center Hub / Motor -->
  <circle cx="150" cy="115" r="22" fill="#0f172a" stroke="#38bdf8" stroke-width="2.5"/>
  <circle cx="150" cy="115" r="8" fill="#38bdf8"/>

  <!-- Title Badge -->
  <rect x="85" y="210" width="130" height="18" rx="9" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="150" y="223" font-family="sans-serif" font-size="10" font-weight="900" fill="#38bdf8" text-anchor="middle" letter-spacing="1">FAN / SOĞUTMA</text>
</svg>
`);

// 5. RAM BELLEK (Memory Stick)
export const RAM_SVG = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 240" width="100%" height="100%">
  <defs>
    <linearGradient id="ramPCB" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#047857"/>
      <stop offset="100%" stop-color="#065f46"/>
    </linearGradient>
    <linearGradient id="goldPins" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="heatSpreaderRAM" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="50%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <!-- RAM Stick Body -->
  <rect x="50" y="60" width="200" height="110" rx="6" fill="url(#ramPCB)" stroke="#10b981" stroke-width="2.5"/>
  
  <!-- Metallic Heat Spreader Armor (RGB Black) -->
  <path d="M 50 140 L 50 66 C 50 62 54 60 58 60 L 242 60 C 246 60 250 62 250 66 L 250 140 Z" fill="url(#heatSpreaderRAM)" stroke="#38bdf8" stroke-width="2"/>
  <polygon points="110,60 120,90 140,90 130,60" fill="#38bdf8" opacity="0.3"/>
  <polygon points="160,60 170,90 190,90 180,60" fill="#38bdf8" opacity="0.3"/>

  <!-- RAM Brand & Badge -->
  <rect x="100" y="98" width="100" height="32" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="150" y="114" font-family="sans-serif" font-size="12" font-weight="900" fill="#38bdf8" text-anchor="middle">DDR5 RAM</text>
  <text x="150" y="126" font-family="sans-serif" font-size="8" font-weight="800" fill="#94a3b8" text-anchor="middle">16GB • 5600MHz</text>

  <!-- Gold Fingers Connector at Bottom -->
  <rect x="65" y="170" width="170" height="18" rx="2" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <rect x="70" y="173" width="160" height="12" fill="url(#goldPins)"/>
  <line x1="90" y1="173" x2="90" y2="185" stroke="#0f172a" stroke-width="1.5"/>
  <line x1="120" y1="173" x2="120" y2="185" stroke="#0f172a" stroke-width="1.5"/>
  <line x1="150" y1="173" x2="150" y2="185" stroke="#0f172a" stroke-width="1.5"/>
  <line x1="180" y1="173" x2="180" y2="185" stroke="#0f172a" stroke-width="1.5"/>
  <line x1="210" y1="173" x2="210" y2="185" stroke="#0f172a" stroke-width="1.5"/>

  <!-- Title Badge -->
  <rect x="85" y="210" width="130" height="18" rx="9" fill="#047857" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="150" y="223" font-family="sans-serif" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">RAM BELLEK</text>
</svg>
`);

// 6. EKRAN KARTI / GPU (Graphics Card)
export const GPU_SVG = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 240" width="100%" height="100%">
  <defs>
    <linearGradient id="gpuPCB" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <!-- GPU Shroud Body -->
  <rect x="25" y="55" width="250" height="120" rx="12" fill="url(#gpuPCB)" stroke="#3b82f6" stroke-width="3"/>

  <!-- PCIe Gold Finger Connector (Bottom Left) -->
  <rect x="55" y="175" width="110" height="16" rx="2" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <rect x="60" y="178" width="100" height="10" fill="url(#goldPins)"/>

  <!-- Dual Cooling Fans -->
  <circle cx="95" cy="115" r="42" fill="#0f172a" stroke="#3b82f6" stroke-width="2"/>
  <circle cx="95" cy="115" r="35" fill="#1e293b"/>
  <path d="M 95 115 L 95 85 M 95 115 L 125 125 M 95 115 L 65 125" stroke="#60a5fa" stroke-width="3" stroke-linecap="round"/>

  <circle cx="205" cy="115" r="42" fill="#0f172a" stroke="#3b82f6" stroke-width="2"/>
  <circle cx="205" cy="115" r="35" fill="#1e293b"/>
  <path d="M 205 115 L 205 85 M 205 115 L 235 125 M 205 115 L 175 125" stroke="#60a5fa" stroke-width="3" stroke-linecap="round"/>

  <!-- GPU Brand Badge / RGB Stripe -->
  <rect x="145" y="95" width="20" height="40" rx="3" fill="#3b82f6"/>

  <!-- Title Badge -->
  <rect x="85" y="210" width="130" height="18" rx="9" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="150" y="223" font-family="sans-serif" font-size="10" font-weight="900" fill="#60a5fa" text-anchor="middle" letter-spacing="1">EKRAN KARTI (GPU)</text>
</svg>
`);

// SSD SVG from before
export const SSD_IMAGE_SVG = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="100%" height="100%">
  <defs>
    <linearGradient id="ssdBody" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="labelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0369a1"/>
    </linearGradient>
    <linearGradient id="goldPin" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>
  <!-- SSD Metallic Enclosure Box -->
  <rect x="30" y="30" width="180" height="190" rx="14" fill="url(#ssdBody)" stroke="#38bdf8" stroke-width="3"/>
  <rect x="38" y="38" width="164" height="174" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  
  <!-- Screws at 4 corners -->
  <circle cx="50" cy="50" r="4" fill="#94a3b8" stroke="#334155" stroke-width="1.5"/>
  <circle cx="190" cy="50" r="4" fill="#94a3b8" stroke="#334155" stroke-width="1.5"/>
  <circle cx="50" cy="185" r="4" fill="#94a3b8" stroke="#334155" stroke-width="1.5"/>
  <circle cx="190" cy="185" r="4" fill="#94a3b8" stroke="#334155" stroke-width="1.5"/>
  
  <!-- SSD Label Badge -->
  <rect x="46" y="44" width="148" height="116" rx="10" fill="url(#labelGrad)" stroke="#38bdf8" stroke-width="2"/>
  <!-- Chip Icon & Brand -->
  <rect x="60" y="58" width="20" height="20" rx="4" fill="#0284c7" stroke="#7dd3fc" stroke-width="1.5"/>
  <rect x="65" y="63" width="10" height="10" fill="#ffffff" rx="1"/>
  <text x="88" y="73" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" fill="#e0f2fe" letter-spacing="1">SABİT DİSK</text>
  <!-- Main Bold SSD Typography -->
  <text x="120" y="112" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="2">SSD</text>
  <text x="120" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="700" fill="#7dd3fc" text-anchor="middle" letter-spacing="1">SOLID STATE DRIVE</text>
  <text x="120" y="146" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="600" fill="#bae6fd" text-anchor="middle">512 GB • SATA III 6Gb/s</text>
  <!-- Connector Plugs at Bottom -->
  <rect x="60" y="200" width="65" height="14" rx="2" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <rect x="66" y="203" width="53" height="6" fill="url(#goldPin)"/>
  <rect x="140" y="200" width="35" height="14" rx="2" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <rect x="145" y="203" width="25" height="6" fill="url(#goldPin)"/>
</svg>
`);

export const HARDWARE_IMAGES: Record<string, string> = {
  "anakart": ANAKART_SVG,
  "islemci": ISLEMCU_SVG,
  "ram": RAM_SVG,
  "ssd": SSD_IMAGE_SVG,
  "gpu": GPU_SVG,
  "guc": GUC_SVG,
  "fan": FAN_SVG
};

export const getHardwareImageSrc = (key: string): string => {
  return HARDWARE_IMAGES[key] || '';
};
