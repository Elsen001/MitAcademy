import { 
  Plus, 
  X, 
  Calendar, 
  Trash2, 
  Info 
} from 'lucide-react';

type FormFieldProps = {
  label: string;
  hasHighlight?: string;
  isSelect?: boolean;
  type?: string;
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
  .map(([, src]) => src);

const topRow = sortedImages.slice(0, 16);
const bottomRow = sortedImages.slice(16, 32);

export default function DentalRegistration() {
  // Input/Select üçün təkrar istifadə edilə bilən komponent
  const FormField = ({ label, hasHighlight, isSelect = true, type = "text" }: FormFieldProps) => (
    <div className="flex items-center gap-1 w-full">
      <div className="relative flex-grow">
        {isSelect ? (
          <select className="w-full h-10 px-3 bg-white border border-[#cbd5e1] rounded-lg text-sm text-[#334155] appearance-none focus:outline-none focus:border-sky-500">
            <option>{label}</option>
          </select>
        ) : (
          <input 
            type={type}
            placeholder={label}
            className="w-full h-10 px-3 bg-white border border-[#cbd5e1] rounded-lg text-sm text-[#334155] focus:outline-none focus:border-sky-500" 
          />
        )}
        {/* Şəkildəki sarı highlight effekti */}
        {hasHighlight && (
          <span className="absolute left-10 top-2.5 bg-yellow-300 text-transparent pointer-events-none opacity-50 px-1">
            {hasHighlight}
          </span>
        )}
      </div>
      <button className="flex items-center justify-center w-8 h-8 bg-sky-100 text-sky-600 rounded-md hover:bg-sky-200">
        <Plus size={16} />
      </button>
      <button className="flex items-center justify-center w-8 h-8 bg-white border border-slate-200 text-slate-400 rounded-md hover:bg-slate-50">
        <X size={16} />
      </button>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] p-6 space-y-6">
      
      {/* ÜST QEYDİYYAT FORMASI */}
      <div className="bg-[#eef4fc] p-6 rounded-xl border border-[#dbeafe]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Sol Sütun - 1 */}
          <div className="space-y-4">
            <FormField label="Haki" hasHighlight="m" />
            <FormField label="Pasient" />
            <FormField label="Göndərən şəxs" />
            <FormField label="Xidmə" hasHighlight="t" />
          </div>

          {/* Orta Sütun - 2 */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <input type="text" placeholder="Qiymə" className="w-1/2 h-10 px-3 bg-white border border-slate-300 rounded-lg text-sm" />
              <input type="text" placeholder="Endirim" className="w-1/2 h-10 px-3 bg-white border border-slate-300 rounded-lg text-sm" />
              <button className="text-slate-400 p-2"><X size={18} /></button>
            </div>
            
            <div className="flex items-center gap-1">
               <select className="flex-grow h-10 px-3 bg-white border border-slate-300 rounded-lg text-sm">
                  <option>Çana seçi m</option>
               </select>
               <button className="text-slate-400 p-2"><X size={18} /></button>
            </div>

            <div className="flex items-center gap-1">
               <select className="flex-grow h-10 px-3 bg-white border border-slate-300 rounded-lg text-sm">
                  <option>Kabinet</option>
               </select>
               <button className="text-slate-400 p-2"><X size={18} /></button>
            </div>

            <div className="relative">
              <input type="text" placeholder="Giriş tarixi" className="w-full h-10 px-3 bg-white border border-slate-300 rounded-lg text-sm" />
              <Calendar size={18} className="absolute right-3 top-2.5 text-slate-400" />
            </div>
          </div>

          {/* Sağ Sütun - Diş SVG Hissəsi */}
          <div className="flex flex-col gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-center min-h-[160px]">
             <div className="w-full space-y-3">
  {/* 1–16 yuxarı sıra */}
  <div className="grid grid-cols-16 gap-1">
    {topRow.map((src, i) => (
      <img key={i} src={src} className="h-[50px] w-auto object-contain" />
    ))}
  </div>

  {/* 17–32 aşağı sıra */}
  <div className="grid grid-cols-16 gap-1">
    {bottomRow.map((src, i) => (
      <img key={i + 16} src={src} className="h-[50px] w-auto object-contain" />
    ))}
  </div>
</div>
            </div>
            <textarea 
              placeholder="Qeyd"
              className="w-full h-24 p-3 bg-white border border-slate-300 rounded-lg text-sm resize-none focus:outline-none focus:border-sky-500"
            ></textarea>
          </div>

        </div>

        {/* Düymələr */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-8 py-2 border-2 border-sky-600 text-sky-600 rounded-lg font-medium hover:bg-sky-50 transition">
            Əlavə et
          </button>
          <button className="px-8 py-2 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition shadow-md shadow-sky-200">
            Təsdiq et
          </button>
        </div>
      </div>

      {/* AŞAĞI CƏDVƏL HİSSƏSİ */}
      <div className=" bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto max-h-[420px] overflow-y-auto">
          <table className="w-full text-left border-collapse min-w-[1100px] text-sm">
            <thead>
              <tr className="bg-[#eef4fc] text-[#475569] text-[10px] font-semibold uppercase tracking-[0.12em]">
                <th className="py-2 px-2 w-5"><input type="checkbox" className="rounded border-slate-300" /></th>
                <th className="py-2 w-5 text-center">№</th>
                <th className="py-2 pl-2  whitespace-nowrap">Həkim</th>
                <th className="py-2  whitespace-nowrap">Pasient</th>
                <th className="py-2  whitespace-nowrap">Göndərən</th>
                <th className="py-2  whitespace-nowrap">Xidmət</th>
                <th className="py-2  whitespace-nowrap">Diş</th>
                <th className="py-2  whitespace-nowrap">Çana</th>
                <th className="py-2  whitespace-nowrap">Kabinet</th>
                <th className="py-2  whitespace-nowrap">Tarix</th>
                <th className="py-2  whitespace-nowrap">Qeyd</th>
                <th className="py-2  whitespace-nowrap">Qiymət</th>
                <th className="py-2  whitespace-nowrap">Endirim</th>
                <th className="py-2  whitespace-nowrap">Məbləğ</th>
                <th className="py-2  text-right">
                  <div className="py-2 bg-sky-100 text-sky-600 inline-block rounded-md cursor-pointer">
                    <Trash2 size={16} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Boş Məlumat Ekranı */}
              <tr>
                <td colSpan={15} className="py-24">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative">
                       <Info size={80} className="text-slate-100" />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-white shadow-lg shadow-yellow-100">
                             <span className="text-3xl font-bold">!</span>
                          </div>
                       </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-400">
                      Məlu<span className="bg-yellow-300 px-1">mat</span> yoxdur
                    </h3>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
