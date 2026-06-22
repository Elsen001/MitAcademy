import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { ad: string; muayineGorunsun: boolean }) => Promise<void>;
}

export const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, onSave }) => {
  const [ad, setAd] = useState('');
  const [muayineGorunsun, setMuayineGorunsun] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ad.trim()) return;

    setIsSubmitting(true);
    console.log('AddModal handleSave', { ad, muayineGorunsun });

    try {
      await onSave({ ad, muayineGorunsun });
      setAd('');
      setMuayineGorunsun(false);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Modal Backdrop (Arxa fon qaraltısı)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#858d93]/80 p-4 backdrop-blur-xs">
      
      {/* Modal Kartı */}
      <div className="w-full max-w-[580px] bg-white rounded-xl shadow-xl overflow-hidden font-sans border border-[#e2e8f0]">
        
        {/* Modal Başlığı (Header) */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#f1f5f9]">
          <h2 className="text-xl font-semibold text-[#0f2d4a]">Əlavə et</h2>
          <button 
            onClick={onClose}
            className="text-[#0f2d4a] hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Gövdəsi (Form) */}
        <form onSubmit={handleSave}>
          <div className="p-6 space-y-5">
            {/* Ad İnput Sahəsi */}
            <div className="space-y-2">
              <label htmlFor="ad" className="block text-sm font-medium text-[#0f2d4a]">
                Ad
              </label>
              <input
                id="ad"
                type="text"
                value={ad}
                onChange={(e) => setAd(e.target.value)}
                placeholder="Adı daxil edin"
                className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#e0f2fe] rounded-lg text-sm text-[#0f2d4a] placeholder-gray-400 focus:outline-hidden focus:border-[#bde4ff] focus:bg-white transition-all"
                autoComplete="off"
              />
            </div>

            {/* Checkbox Sahəsi */}
            <div className="flex items-center gap-3 py-1">
              <input
                id="muayine"
                type="checkbox"
                checked={muayineGorunsun}
                onChange={(e) => setMuayineGorunsun(e.target.checked)}
                className="w-5 h-5 rounded border-[#e2e8f0] bg-[#f8fafc] text-[#1d70b8] focus:ring-[#1d70b8] cursor-pointer"
              />
              <label 
                htmlFor="muayine" 
                className="text-sm text-[#0f2d4a] cursor-pointer select-none"
              >
                Müayinələrdə görünsün
              </label>
            </div>
          </div>

          {/* Modal Altlığı (Footer Buttons) */}
          <div className="flex justify-end gap-3 px-6 py-5 border-t border-[#f1f5f9]">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-[#e2e8f0] text-sm font-medium text-gray-500 rounded-lg bg-white hover:bg-gray-50 transition-colors"
            >
              Ləğv et
            </button>
            <button
              type="submit"
              disabled={!ad.trim() || isSubmitting}
              className="px-6 py-2.5 bg-[#1d70b8] text-sm font-medium text-white rounded-lg hover:bg-[#175994] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Yüklənir...' : 'Yadda saxla'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};