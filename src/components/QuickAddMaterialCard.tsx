import React, { useState, useRef } from 'react';
import { Material, MaterialType } from '../types';
import { CURRICULUM_WEEKS } from '../data/curriculumData';
import { PlusCircle, UploadCloud, CheckCircle2, Sparkles, FolderPlus, Link2, Paperclip, FileCheck } from 'lucide-react';

interface QuickAddMaterialCardProps {
  onAddMaterial: (newMat: Material) => void;
}

export const QuickAddMaterialCard: React.FC<QuickAddMaterialCardProps> = ({ onAddMaterial }) => {
  const [selectedWeekKey, setSelectedWeekKey] = useState<string>('1-1-1'); // term-period-periodWeek
  const [title, setTitle] = useState('');
  const [type, setType] = useState<MaterialType>('sunum');
  const [fileFormat, setFileFormat] = useState('PPTX');
  const [fileSize, setFileSize] = useState('4.5 MB');
  const [description, setDescription] = useState('');
  const [directLinkUrl, setDirectLinkUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);

    // Auto-detect extension
    const nameParts = file.name.split('.');
    const ext = nameParts.length > 1 ? nameParts.pop()!.toUpperCase() : 'PDF';
    setFileFormat(ext);

    // Auto-detect file size
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    const sizeStr = file.size >= 1024 * 1024 ? `${sizeInMb} MB` : `${Math.round(file.size / 1024)} KB`;
    setFileSize(sizeStr);

    if (!title.trim()) {
      const cleanName = nameParts.join('.').replace(/[-_]/g, ' ');
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFileDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const [termStr, periodStr, periodWeekStr] = selectedWeekKey.split('-');
    const termNum = parseInt(termStr, 10) as 1 | 2;
    const periodNum = parseInt(periodStr, 10) as 1 | 2;
    const periodWeekNum = parseInt(periodWeekStr, 10);

    const weekData = CURRICULUM_WEEKS.find(
      w => w.term === termNum && w.period === periodNum && w.periodWeek === periodWeekNum
    );

    const termLabel: '1. Dönem' | '2. Dönem' = termNum === 1 ? '1. Dönem' : '2. Dönem';
    const periodLabel: '1. Ara' | '2. Ara' = periodNum === 1 ? '1. Ara' : '2. Ara';

    const finalDownloadUrl = directLinkUrl.trim()
      ? directLinkUrl.trim()
      : fileDataUrl || '#download-material';

    const newMaterial: Material = {
      id: `mat-${Date.now()}`,
      title: title.trim(),
      grade: '5. Sınıf',
      unit: weekData ? weekData.topicFramework : '5. Sınıf Bilişim Teknolojileri',
      term: termLabel,
      period: periodLabel,
      week: periodWeekNum,
      type: type,
      fileFormat: fileFormat.toUpperCase(),
      fileSize: fileSize,
      dateAdded: new Date().toISOString().split('T')[0],
      description: description.trim() || `${weekData ? weekData.topicFramework : 'Ders'} konusu için Hilal KURTOĞLU tarafından hazırlanan ders materyali.`,
      author: 'Hilal KURTOĞLU',
      tags: [weekData ? weekData.topicFramework : 'Bilişim', type, '5. Sınıf'],
      downloadUrl: finalDownloadUrl,
      fileName: uploadedFile ? uploadedFile.name : `${title.trim()}.${fileFormat.toLowerCase()}`,
      isExternalLink: Boolean(directLinkUrl.trim()),
      isFeatured: true
    };

    onAddMaterial(newMaterial);

    // Reset form
    setTitle('');
    setDescription('');
    setUploadedFile(null);
    setFileDataUrl('');
    setDirectLinkUrl('');
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsExpanded(false);
    }, 2500);

    // Smooth scroll down to Son Yüklenenler if visible
    const el = document.getElementById('son-yuklenenler-alani');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTypeChange = (newType: MaterialType) => {
    setType(newType);
    if (newType === 'sunum') setFileFormat('PPTX');
    else if (newType === 'dokuman') setFileFormat('PDF');
    else if (newType === 'video') setFileFormat('MP4');
    else if (newType === 'oyun') setFileFormat('HTML5');
    else if (newType === 'etkinlik') setFileFormat('PDF');
  };

  return (
    <div className="bg-white border-2 border-pink-200/90 rounded-3xl p-4 shadow-xs text-slate-800 transition">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-pink-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white flex items-center justify-center text-sm font-bold shadow-2xs">
            <UploadCloud className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-slate-800">
              Hızlı Materyal Yükle
            </h4>
            <p className="text-[10px] text-purple-700 font-medium">
              Menülere &amp; Haftalara Ders Ekle
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(prev => !prev)}
          className="text-xs font-bold text-purple-700 hover:text-pink-600 bg-pink-50 px-2.5 py-1 rounded-xl border border-pink-200 transition"
        >
          {isExpanded ? 'Daralt ▲' : '+ Aç / Ekle ▼'}
        </button>
      </div>

      {isSuccess && (
        <div className="my-3 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-xs font-bold text-emerald-800 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Materyal başarıyla menüye eklendi ve orta bölüme yansıtıldı!</span>
        </div>
      )}

      {/* Expandable Form Body */}
      {isExpanded ? (
        <form onSubmit={handleSubmit} className="mt-3 space-y-3">
          {/* Week Selection */}
          <div>
            <label className="block text-[11px] font-bold text-purple-900 mb-1">
              Hangi Menü / Haftaya Eklenecek?
            </label>
            <select
              value={selectedWeekKey}
              onChange={e => setSelectedWeekKey(e.target.value)}
              className="w-full text-xs font-semibold p-2 rounded-xl border border-pink-200 bg-pink-50/40 text-slate-800 focus:outline-none focus:border-purple-400"
            >
              <optgroup label="1. Dönem - 1. Ara (Haftalar 1 - 10)">
                {CURRICULUM_WEEKS.filter(w => w.term === 1 && w.period === 1).map(w => (
                  <option key={`1-1-${w.periodWeek}`} value={`1-1-${w.periodWeek}`}>
                    1. Dönem {w.periodWeek}. Hafta: {w.topicFramework.slice(0, 30)}...
                  </option>
                ))}
              </optgroup>
              <optgroup label="1. Dönem - 2. Ara (Haftalar 1 - 8)">
                {CURRICULUM_WEEKS.filter(w => w.term === 1 && w.period === 2).map(w => (
                  <option key={`1-2-${w.periodWeek}`} value={`1-2-${w.periodWeek}`}>
                    1. Dönem (2. Ara) {w.periodWeek}. Hafta: {w.topicFramework.slice(0, 30)}...
                  </option>
                ))}
              </optgroup>
              <optgroup label="2. Dönem - 1. Ara (Haftalar 1 - 10)">
                {CURRICULUM_WEEKS.filter(w => w.term === 2 && w.period === 1).map(w => (
                  <option key={`2-1-${w.periodWeek}`} value={`2-1-${w.periodWeek}`}>
                    2. Dönem {w.periodWeek}. Hafta: {w.topicFramework.slice(0, 30)}...
                  </option>
                ))}
              </optgroup>
              <optgroup label="2. Dönem - 2. Ara (Haftalar 1 - 9)">
                {CURRICULUM_WEEKS.filter(w => w.term === 2 && w.period === 2).map(w => (
                  <option key={`2-2-${w.periodWeek}`} value={`2-2-${w.periodWeek}`}>
                    2. Dönem (2. Ara) {w.periodWeek}. Hafta: {w.topicFramework.slice(0, 30)}...
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Material Title */}
          <div>
            <label className="block text-[11px] font-bold text-purple-900 mb-1">
              Materyal Başlığı *
            </label>
            <input
              type="text"
              required
              placeholder="Örn: Donanım Birimleri Sunusu"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full text-xs p-2 rounded-xl border border-pink-200 bg-white text-slate-800 focus:outline-none focus:border-purple-400"
            />
          </div>

          {/* Material Type Pills */}
          <div>
            <label className="block text-[11px] font-bold text-purple-900 mb-1">
              Materyal Türü
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-[10px] font-bold">
              {[
                { key: 'sunum', label: '📊 Sunum' },
                { key: 'dokuman', label: '📄 Belge' },
                { key: 'video', label: '🎬 Video' },
                { key: 'oyun', label: '🎮 Oyun' },
                { key: 'etkinlik', label: '🧩 Etkinlik' }
              ].map(item => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleTypeChange(item.key as MaterialType)}
                  className={`py-1.5 px-2 rounded-lg border text-center transition ${
                    type === item.key
                      ? 'bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white border-transparent shadow-2xs font-extrabold'
                      : 'bg-pink-50/50 text-slate-600 border-pink-200 hover:bg-pink-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Format / Description */}
          <div>
            <label className="block text-[11px] font-bold text-purple-900 mb-1">
              Kısa Açıklama (İsteğe bağlı)
            </label>
            <textarea
              rows={2}
              placeholder="Öğrenciler için kısa ders notu veya yönerge..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full text-xs p-2 rounded-xl border border-pink-200 bg-white text-slate-800 focus:outline-none focus:border-purple-400"
            />
          </div>

          {/* File Picker & Link Input */}
          <div className="space-y-2 p-2.5 bg-pink-50/50 rounded-xl border border-pink-200">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`w-full py-1.5 px-2.5 rounded-lg border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                uploadedFile
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-white hover:bg-pink-100/60 text-purple-900 border-pink-200'
              }`}
            >
              {uploadedFile ? (
                <>
                  <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="truncate">{uploadedFile.name} (Eklendi)</span>
                </>
              ) : (
                <>
                  <Paperclip className="w-3.5 h-3.5 text-[#EC4899]" />
                  <span>Cihazdan Dosya Seç (.pptx, .pdf...)</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-pink-200">
              <Link2 className="w-3 h-3 text-blue-500 shrink-0" />
              <input
                type="url"
                value={directLinkUrl}
                onChange={e => setDirectLinkUrl(e.target.value)}
                placeholder="Veya Drive/web bağlantısı..."
                className="w-full text-[11px] bg-transparent focus:outline-hidden text-slate-700 font-medium"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] hover:opacity-95 text-white font-black text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Menüye Yükle &amp; Ortaya Ekle</span>
          </button>
        </form>
      ) : (
        <div className="mt-2 text-center">
          <p className="text-[11px] text-slate-500 leading-snug">
            Zaman zaman haftalara sunum, etkinlik veya oyun eklemek için yukarıdaki <span className="font-bold text-purple-700">"+ Aç / Ekle"</span> butonunu kullanabilirsiniz.
          </p>
        </div>
      )}
    </div>
  );
};
