import React, { useState, useRef } from 'react';
import { Material, MaterialType } from '../types';
import { X, UploadCloud, PlusCircle, CheckCircle2, Link2, FileCheck, Paperclip, FileText } from 'lucide-react';

interface AddMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMaterial: (newMat: Material) => void;
  defaultTerm?: '1. Dönem' | '2. Dönem';
  defaultPeriod?: '1. Ara' | '2. Ara';
  defaultWeek?: number;
}

export const AddMaterialModal: React.FC<AddMaterialModalProps> = ({
  isOpen,
  onClose,
  onAddMaterial,
  defaultTerm,
  defaultPeriod,
  defaultWeek
}) => {
  const [title, setTitle] = useState('');
  const [grade, setGrade] = useState('5. Sınıf');
  const [unit, setUnit] = useState('İnternette Güvenlik');
  const [type, setType] = useState<MaterialType>('sunum');
  const [fileFormat, setFileFormat] = useState('PPTX');
  const [fileSize, setFileSize] = useState('4.5 MB');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('5. Sınıf, BTY, Ders Materyali');
  const [term, setTerm] = useState<'1. Dönem' | '2. Dönem'>(defaultTerm || '1. Dönem');
  const [period, setPeriod] = useState<'1. Ara' | '2. Ara'>(defaultPeriod || '1. Ara');
  const [week, setWeek] = useState<number>(defaultWeek || 1);
  const [errorMsg, setErrorMsg] = useState('');

  // File upload and direct link states
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState<string>('');
  const [directLinkUrl, setDirectLinkUrl] = useState<string>('');
  const [isReadingFile, setIsReadingFile] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync default values when modal opens
  React.useEffect(() => {
    if (isOpen) {
      if (defaultTerm) setTerm(defaultTerm);
      if (defaultPeriod) setPeriod(defaultPeriod);
      if (defaultWeek) setWeek(defaultWeek);
    }
  }, [isOpen, defaultTerm, defaultPeriod, defaultWeek]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    processSelectedFile(file);
  };

  const processSelectedFile = (file: File) => {
    setUploadedFile(file);
    setIsReadingFile(true);

    // Auto-detect extension
    const nameParts = file.name.split('.');
    const ext = nameParts.length > 1 ? nameParts.pop()!.toUpperCase() : 'PDF';
    setFileFormat(ext);

    // Auto-detect file size
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    const sizeStr = file.size >= 1024 * 1024 ? `${sizeInMb} MB` : `${Math.round(file.size / 1024)} KB`;
    setFileSize(sizeStr);

    // Auto-fill title if empty
    if (!title.trim()) {
      const cleanName = nameParts.join('.').replace(/[-_]/g, ' ');
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }

    // Auto-select type based on extension
    const extLower = ext.toLowerCase();
    if (['pptx', 'ppt', 'key'].includes(extLower)) setType('sunum');
    else if (['pdf', 'docx', 'doc', 'txt'].includes(extLower)) setType('dokuman');
    else if (['mp4', 'avi', 'mov', 'webm'].includes(extLower)) setType('video');
    else if (['html', 'htm', 'sb3', 'zip'].includes(extLower)) setType('oyun');

    // Read as Data URL so anyone can download the actual file!
    const reader = new FileReader();
    reader.onload = () => {
      setFileDataUrl(reader.result as string);
      setIsReadingFile(false);
    };
    reader.onerror = () => {
      setIsReadingFile(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Lütfen materyal başlığını giriniz.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Lütfen materyal hakkında kısa bir açıklama giriniz.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    // Determine download URL: direct web link OR uploaded file Data URL
    const finalDownloadUrl = directLinkUrl.trim()
      ? directLinkUrl.trim()
      : fileDataUrl || '#download-material';

    const newMaterial: Material = {
      id: `mat-${Date.now()}`,
      title: title.trim(),
      grade,
      unit,
      term,
      period,
      week: Number(week) || 1,
      type,
      fileFormat: fileFormat.toUpperCase(),
      fileSize: fileSize || '3.2 MB',
      dateAdded: new Date().toISOString().split('T')[0],
      description: description.trim(),
      author: 'Hilal KURTOĞLU',
      tags: tags.length > 0 ? tags : ['BTY', grade],
      downloadUrl: finalDownloadUrl,
      fileName: uploadedFile ? uploadedFile.name : `${title.trim()}.${fileFormat.toLowerCase()}`,
      isExternalLink: Boolean(directLinkUrl.trim())
    };

    onAddMaterial(newMaterial);
    onClose();

    // Reset fields
    setTitle('');
    setDescription('');
    setUploadedFile(null);
    setFileDataUrl('');
    setDirectLinkUrl('');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white border-2 border-[#cfe6f5] rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] text-white p-6 rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">
              📤
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Yeni Ders Materyali Yükle</h3>
              <p className="text-xs text-pink-100">Öğretmen: Hilal KURTOĞLU &bull; 5. Sınıf BTY Portalı</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4 text-xs md:text-sm">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl font-semibold">
              {errorMsg}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block font-bold text-[#1B4965] mb-1">
              Materyal Başlığı *
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ör: İnternette Güvenlik ve Güçlü Şifreler Sunumu"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#cfe6f5] bg-[#F4F9FD] focus:bg-white focus:outline-none focus:border-[#2E6F95] font-medium"
              required
            />
          </div>

          {/* Row: Grade & Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#1B4965] mb-1">
                Sınıf Düzeyi
              </label>
              <select
                value={grade}
                onChange={e => setGrade(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#cfe6f5] bg-[#F4F9FD] focus:outline-none focus:border-[#2E6F95] font-semibold text-[#123353]"
              >
                <option value="5. Sınıf">5. Sınıf</option>
                <option value="6. Sınıf">6. Sınıf</option>
                <option value="Tüm Düzeyler">Tüm Düzeyler</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#1B4965] mb-1">
                Ünite / Konu
              </label>
              <input
                type="text"
                value={unit}
                onChange={e => setUnit(e.target.value)}
                placeholder="Ör: İnternette Güvenlik, Donanım, Scratch"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#cfe6f5] bg-[#F4F9FD] focus:outline-none focus:border-[#2E6F95]"
              />
            </div>
          </div>

          {/* Row: Term, Period & Week */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block font-bold text-[#1B4965] mb-1">Dönem</label>
              <select
                value={term}
                onChange={e => setTerm(e.target.value as any)}
                className="w-full px-2.5 py-2 rounded-xl border border-[#cfe6f5] bg-[#F4F9FD] text-xs font-semibold"
              >
                <option value="1. Dönem">1. Dönem</option>
                <option value="2. Dönem">2. Dönem</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#1B4965] mb-1">Ara</label>
              <select
                value={period}
                onChange={e => setPeriod(e.target.value as any)}
                className="w-full px-2.5 py-2 rounded-xl border border-[#cfe6f5] bg-[#F4F9FD] text-xs font-semibold"
              >
                <option value="1. Ara">1. Ara</option>
                <option value="2. Ara">2. Ara</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#1B4965] mb-1">Hafta (1-10)</label>
              <input
                type="number"
                min={1}
                max={10}
                value={week}
                onChange={e => setWeek(Number(e.target.value))}
                className="w-full px-2.5 py-2 rounded-xl border border-[#cfe6f5] bg-[#F4F9FD] text-xs font-semibold text-center"
              />
            </div>
          </div>

          {/* Row: Material Type & Format */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#1B4965] mb-1">
                Materyal Türü
              </label>
              <select
                value={type}
                onChange={e => setType(e.target.value as MaterialType)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#cfe6f5] bg-[#F4F9FD] font-semibold text-[#123353]"
              >
                <option value="sunum">Sunum (pptx/pdf)</option>
                <option value="oyun">Etkileşimli Oyun (html)</option>
                <option value="dokuman">Belge / Ders Notu (docx/pdf)</option>
                <option value="video">Eğitici Video</option>
                <option value="etkinlik">Ödev / Etkinlik Kâğıdı</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#1B4965] mb-1">
                Dosya Formatı / Boyut
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={fileFormat}
                  onChange={e => setFileFormat(e.target.value)}
                  placeholder="PPTX, PDF..."
                  className="w-1/2 px-3 py-2 rounded-xl border border-[#cfe6f5] bg-[#F4F9FD] font-bold text-center"
                />
                <input
                  type="text"
                  value={fileSize}
                  onChange={e => setFileSize(e.target.value)}
                  placeholder="4.5 MB"
                  className="w-1/2 px-3 py-2 rounded-xl border border-[#cfe6f5] bg-[#F4F9FD] text-center"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-[#1B4965] mb-1">
              Açıklama &bull; Kazanım Detayı *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Öğrenciler ve meslektaşlar için materyalin içeriğini ve derste nasıl kullanılacağını açıklayınız..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#cfe6f5] bg-[#F4F9FD] focus:bg-white focus:outline-none focus:border-[#2E6F95]"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block font-bold text-[#1B4965] mb-1">
              Etiketler (Virgülle ayırınız)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              placeholder="Siber Güvenlik, Şifre, 5. Sınıf, Etkinlik"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#cfe6f5] bg-[#F4F9FD]"
            />
          </div>

          {/* Real File Upload & Download Link Section */}
          <div className="space-y-3 p-4 bg-gradient-to-br from-pink-50/70 via-purple-50/40 to-blue-50/70 rounded-2xl border-2 border-pink-200">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs text-purple-950 flex items-center gap-1.5">
                <Paperclip className="w-4 h-4 text-[#EC4899]" />
                <span>Dosya Yükle veya Doğrudan İndirme Bağlantısı Ekle</span>
              </span>
              <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-pink-100">
                Öğrenciler Tek Tıkla İndirir
              </span>
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pptx,.ppt,.pdf,.docx,.doc,.txt,.zip,.rar,.mp4,.sb3,.html,.png,.jpg"
            />

            {/* Drag & drop / Clickable upload box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition ${
                uploadedFile
                  ? 'border-emerald-400 bg-emerald-50/60'
                  : 'border-pink-300 hover:border-purple-400 bg-white/80 hover:bg-white'
              }`}
            >
              {uploadedFile ? (
                <div className="flex items-center justify-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="font-extrabold text-xs text-slate-800 truncate">
                      {uploadedFile.name}
                    </div>
                    <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{fileSize} &bull; İndirilebilir bağlantı hazır! Değiştirmek için tıklayınız</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <UploadCloud className="w-7 h-7 mx-auto text-[#EC4899] animate-bounce" />
                  <p className="font-extrabold text-xs text-purple-900">
                    Bilgisayarınızdan / Telefonunuzdan Dosya Seçin
                  </p>
                  <p className="text-[11px] text-slate-500">
                    PowerPoint (.pptx), PDF, Word (.docx), Scratch (.sb3) veya Video seçin
                  </p>
                </div>
              )}
            </div>

            {/* Direct Web URL Link Input */}
            <div className="pt-2 border-t border-pink-200/80">
              <label className="block font-bold text-[#1B4965] text-xs mb-1 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Veya Doğrudan İndirme / Paylaşım Bağlantısı (URL):</span>
              </label>
              <input
                type="url"
                value={directLinkUrl}
                onChange={e => setDirectLinkUrl(e.target.value)}
                placeholder="Ör: https://drive.google.com/... veya https://eba.gov.tr/..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-pink-200 bg-white focus:outline-hidden focus:border-purple-500 font-mono text-slate-700"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Google Drive, EBA, Canva veya web bağlantısı girerseniz, öğrenciler bu bağlantıya tıklayarak doğrudan indirebilir veya açabilir.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-pink-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-pink-200 text-slate-600 font-bold hover:bg-pink-50/50 transition"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] hover:opacity-95 text-white font-extrabold rounded-xl transition shadow-xs flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Materyali Yayınla</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
