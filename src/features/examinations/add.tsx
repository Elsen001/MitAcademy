import empty from './images/empty.png';
import { useState } from 'react';
import {
  Plus,
  X,
  Calendar,
  Trash2,
  Info
} from 'lucide-react';
import { storeExamination } from './api';

type FormFieldProps = {
  label: string;
  hasHighlight?: string;
  isSelect?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
};

const images = import.meta.glob('./tooth/*.png', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

const sortedImages = Object.entries(images)
  .sort(([a], [b]) => {
    const na = Number(a.match(/(\d+)\.png$/)?.[1] || 0);
    const nb = Number(b.match(/(\d+)\.png$/)?.[1] || 0);
    return na - nb;
  })
  .map(([, src], i) => ({ src, number: i + 1 }));

const topRow = sortedImages.slice(0, 16);
const bottomRow = sortedImages.slice(16, 32);

const initialFormState = {
  doctorId: '',
  patientId: '',
  referrerId: '',
  serviceId: '',
  price: '',
  discount: '',
  channelId: '',
  cabinetId: '',
  entryDate: '',
  note: '',
};

export default function DentalRegistration() {
  const [form, setForm] = useState(initialFormState);
  const [selectedTeeth, setSelectedTeeth] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateField = (key: keyof typeof initialFormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleTooth = (number: number) => {
    setSelectedTeeth((prev) =>
      prev.includes(number) ? prev.filter((n) => n !== number) : [...prev, number]
    );
  };

  const resetForm = () => {
    setForm(initialFormState);
    setSelectedTeeth([]);
    setErrorMessage(null);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setErrorMessage(null);
    try {
      await storeExamination({
        doctor_id: form.doctorId || undefined,
        patient_id: form.patientId || undefined,
        referrer_id: form.referrerId || undefined,
        service_id: form.serviceId || undefined,
        price: form.price || undefined,
        discount: form.discount || undefined,
        channel_id: form.channelId || undefined,
        cabinet_id: form.cabinetId || undefined,
        entry_date: form.entryDate || undefined,
        teeth: selectedTeeth,
        note: form.note || undefined,
      });
      resetForm();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Müayinə əlavə edilərkən xəta baş verdi';
      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
  };

  const FormField = ({ label, hasHighlight, isSelect = true, type = "text", value, onChange }: FormFieldProps) => (
    <div className="flex items-center gap-1 w-full">
      <div className="relative flex-grow">
        {isSelect ? (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-10 px-3 bg-white border border-[#cbd5e1] rounded-lg text-sm text-[#334155] appearance-none focus:outline-none focus:border-sky-500"
          >
            <option value="">{label}</option>
          </select>
        ) : (
          <input
            type={type}
            placeholder={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-10 px-3 bg-white border border-[#cbd5e1] rounded-lg text-sm text-[#334155] focus:outline-none focus:border-sky-500"
          />
        )}
        {hasHighlight && (
          <span className="absolute left-10 top-2.5 bg-yellow-300 text-transparent pointer-events-none opacity-50 px-1">
            {hasHighlight}
          </span>
        )}
      </div>
      <button type="button" className="flex items-center justify-center w-8 h-8 bg-sky-100 text-sky-600 rounded-md hover:bg-sky-200">
        <Plus size={16} />
      </button>
      <button
        type="button"
        onClick={() => onChange('')}
        className="flex items-center justify-center w-8 h-8 bg-white border border-slate-200 text-slate-400 rounded-md hover:bg-slate-50"
      >
        <X size={16} />
      </button>
    </div>
  );

  const ToothButton = ({ src, number }: { src: string; number: number }) => {
    const isSelected = selectedTeeth.includes(number);
    return (
      <button
        type="button"
        onClick={() => toggleTooth(number)}
        title={`Diş ${number}`}
        className={` relative rounded-md transition ${
          isSelected ? 'bg-sky-100 ring-2 ring-sky-500' : 'hover:bg-slate-400'
        }`}
      >
        <img src={src} className="h-[50px] w-auto object-contain" />
      </button>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] p-6 space-y-6">

      {errorMessage && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {/* ÜST QEYDİYYAT FORMASI */}
      <div className="bg-[#eef4fc] p-6 rounded-xl border border-[#dbeafe]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Sol Sütun - 1 */}
          <div className="space-y-4">
            <FormField label="Həkim" hasHighlight="m" value={form.doctorId} onChange={updateField('doctorId')} />
            <FormField label="Pasient" value={form.patientId} onChange={updateField('patientId')} />
            <FormField label="Göndərən şəxs" value={form.referrerId} onChange={updateField('referrerId')} />
            <FormField label="Xidmət" hasHighlight="t" value={form.serviceId} onChange={updateField('serviceId')} />
          </div>

          {/* Orta Sütun - 2 */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Qiymət"
                value={form.price}
                onChange={(e) => updateField('price')(e.target.value)}
                className="w-1/2 h-10 px-3 bg-white border border-slate-300 rounded-lg text-sm"
              />
              <input
                type="text"
                placeholder="Endirim"
                value={form.discount}
                onChange={(e) => updateField('discount')(e.target.value)}
                className="w-1/2 h-10 px-3 bg-white border border-slate-300 rounded-lg text-sm"
              />
              <button type="button" onClick={() => setForm((p) => ({ ...p, price: '', discount: '' }))} className="text-slate-400 p-2">
                <X size={18} />
              </button>
            </div>

            <div className="flex items-center gap-1">
              <select
                value={form.channelId}
                onChange={(e) => updateField('channelId')(e.target.value)}
                className="flex-grow h-10 px-3 bg-white border border-slate-300 rounded-lg text-sm"
              >
                <option value="">Çana seçimi</option>
              </select>
              <button type="button" onClick={() => updateField('channelId')('')} className="text-slate-400 p-2">
                <X size={18} />
              </button>
            </div>

            <div className="flex items-center gap-1">
              <select
                value={form.cabinetId}
                onChange={(e) => updateField('cabinetId')(e.target.value)}
                className="flex-grow h-10 px-3 bg-white border border-slate-300 rounded-lg text-sm"
              >
                <option value="">Kabinet</option>
              </select>
              <button type="button" onClick={() => updateField('cabinetId')('')} className="text-slate-400 p-2">
                <X size={18} />
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Giriş tarixi"
                value={form.entryDate}
                onChange={(e) => updateField('entryDate')(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-slate-300 rounded-lg text-sm"
              />
              <Calendar size={18} className="absolute right-3 top-2.5 text-slate-400" />
            </div>
          </div>

          {/* Sağ Sütun - Diş Chart Hissəsi */}
          <div className="flex flex-col gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-center min-h-[160px]">
              <div className="w-full space-y-3">
                <div className="grid grid-cols-16 ">
                  {topRow.map(({ src, number }) => (
                    <ToothButton key={number} src={src} number={number} />
                  ))}
                </div>
                <div className="grid grid-cols-16">
                  {bottomRow.map(({ src, number }) => (
                    <ToothButton key={number} src={src} number={number} />
                  ))}
                </div>
              </div>
            </div>
            {selectedTeeth.length > 0 && (
              <div className="text-xs text-slate-500">
                Seçilmiş dişlər: {selectedTeeth.sort((a, b) => a - b).join(', ')}
              </div>
            )}
            <textarea
              placeholder="Qeyd"
              value={form.note}
              onChange={(e) => updateField('note')(e.target.value)}
              className="w-full h-24 p-3 bg-white border border-slate-300 rounded-lg text-sm resize-none focus:outline-none focus:border-sky-500"
            ></textarea>
          </div>

        </div>

        {/* Düymələr */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={resetForm}
            disabled={submitting}
            className="px-8 py-2 border-2 border-sky-600 text-sky-600 rounded-lg font-medium hover:bg-sky-50 transition disabled:opacity-50"
          >
            Təmizlə
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="px-8 py-2 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition shadow-md shadow-sky-200 disabled:opacity-50"
          >
            {submitting ? 'Göndərilir...' : 'Təsdiq et'}
          </button>
        </div>
      </div>

      {/* AŞAĞI CƏDVƏL HİSSƏSİ — unchanged */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {/* ... keep your existing table block as-is ... */}
      </div>

    </div>
  );
}