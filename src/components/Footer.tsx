import React from 'react';
import { Heart, School, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <>
      {/* Persistent Bottom-Right Signature Badge */}
      <div className="fixed bottom-4 right-4 z-30 hidden sm:block">
        <div className="bg-white/95 backdrop-blur-md border-2 border-pink-200 hover:border-purple-400 px-3 py-1.5 rounded-2xl shadow-md transition transform hover:-translate-y-0.5 text-right flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-pink-300 shadow-2xs shrink-0">
            <img
              src="/teacher_logo.png"
              alt="Hilal KURTOĞLU Logo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-left">
            <div className="text-xs font-black text-slate-800 leading-tight">Hilal KURTOĞLU</div>
            <div className="text-[10px] font-semibold text-purple-700">Bilgisayar ve Öğretim Teknolojileri Öğretmeni &bull; 5. Sınıf</div>
          </div>
        </div>
      </div>

      {/* Main Page Footer */}
      <footer className="mt-14 border-t-2 border-pink-100 bg-gradient-to-r from-pink-50/70 via-purple-50/50 to-blue-50/70 text-slate-600 text-xs py-7 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-pink-300 shadow-2xs shrink-0">
              <img
                src="/teacher_logo.png"
                alt="Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-0.5">
              <div className="font-black text-sm text-slate-800 flex items-center justify-center md:justify-start gap-1.5">
                <span>5. Sınıf Bilişim Dünyası &bull; Hilal KURTOĞLU</span>
              </div>
              <p className="text-xs text-slate-500">
                Ahi Evran Ortaokulu &bull; Bilişim Teknolojileri ve Yazılım Dersi Portalı
              </p>
            </div>
          </div>

          <div className="text-center md:text-right space-y-0.5">
            <div className="font-extrabold text-slate-800">
              Hilal KURTOĞLU &bull; Bilişim Teknolojileri ve Yazılım
            </div>
            <div className="text-[11px] text-purple-700 font-semibold">
              Bilişim Kahramanı Eğitsel Öğrenme Portalı &copy; 2026-2027
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
