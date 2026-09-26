export type MaterialType = 'oyun' | 'sunum' | 'dokuman' | 'video' | 'etkinlik';

export interface Material {
  id: string;
  title: string;
  grade: string; // e.g. "5. Sınıf"
  unit: string;  // e.g. "İnternette Güvenlik"
  term?: '1. Dönem' | '2. Dönem';
  period?: '1. Ara' | '2. Ara';
  week?: number; // 1 - 37
  type: MaterialType;
  fileFormat: string; // 'PPTX' | 'PDF' | 'HTML' | 'DOCX' | 'MP4' | 'PNG'
  fileSize?: string;
  dateAdded: string;
  description: string;
  author: string;
  tags: string[];
  downloadUrl?: string;
  previewUrl?: string;
  fileName?: string;
  isExternalLink?: boolean;
  interactiveGameKey?: 'bilisim-kahramani' | string;
  isFeatured?: boolean;
}

export interface CurriculumWeek {
  term: 1 | 2;
  period: 1 | 2; // 1 = 1. Ara dönemi, 2 = 2. Ara dönemi
  periodWeek: number; // 1 to 10
  weekNumber: number; // 1 to 37 (overall academic year)
  month: string;
  dates: string;
  hours: number;
  learningArea: string; // ÖĞRENME ALANI (e.g. BİLİŞİM TEKNOLOJİLERİNİN HAYATIMIZDAKİ YERİ)
  topicFramework: string; // İÇERİK ÇERÇEVESİ (e.g. Bilişim Teknolojilerinin Sınıflandırılması)
  outcomeCode: string; // e.g. BTY.5.1.1
  outcomeText: string;
  processComponents: string;
  assessmentMethods: string;
  socialEmotionalSkills: string;
  values: string;
  literacySkills: string;
  specialDaysWeeks?: string;
  enrichmentAndSupport?: string;
  schoolBasedPlan?: string;
}

export interface EducationalQuote {
  id: number;
  quote: string;
  author: string;
  title: string;
}

export interface LectureNote {
  id: string;
  unit: string;
  title: string;
  summary: string;
  keyPoints?: string[];
  sections?: {
    heading: string;
    icon?: string;
    badge?: string;
    items?: { label: string; text: string }[];
    points?: string[];
  }[];
  benefits?: string[];
  homework?: string;
  tip?: string;
  term: '1. Dönem' | '2. Dönem';
  recommendedWeek: string;
  icon: string;
}
