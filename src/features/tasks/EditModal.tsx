import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { ad: string; muayineGorunsun: boolean }) => Promise<void>;
  initialAd: string;
}

export const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave, initialAd }) => {
  const [ad, setAd] = useState('');
  const [muayineGorunsun, setMuayineGorunsun] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal hər dəfə açılanda və ya fərqli sətir seçiləndə inputu doldurur
  useEffect(() => {
    if (isOpen) {
      setAd(initialAd);
      setMuayineGorunsun(false); // Ehtiyac varsa backend-dən gələn real dəyəri də ötürə bilərsiniz
    }
  }, [isOpen, initialAd]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ad.trim()) return;

    setIsSubmitting(true);
    try {
      await onSave({ ad, muayineGorunsun });
      onClose();
    } catch (error) {
      // Xəta idarəolunması ana komponentdədir
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs no-print">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Vəzifəni Yenilə</h2>
          <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Vəzifə Adı</label>
            <input
              type="text"
              required
              value={ad}
              onChange={(e) => setAd(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-hidden transition-colors text-slate-900"
              placeholder="Adı daxil edin..."
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="edit-muayine"
              checked={muayineGorunsun}
              onChange={(e) => setMuayineGorunsun(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            <label htmlFor="edit-muayine" className="text-sm font-medium text-slate-700 select-none cursor-pointer">
              Müayinədə görünsün
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Ləğv et
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !ad.trim()}
              className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 shadow-sm disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? 'Yenilənir...' : 'Yadda saxla'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};