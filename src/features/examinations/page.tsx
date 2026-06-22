import { useEffect, useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  Calendar, 
  RotateCcw, 
  Download, 
  Printer, 
  Eye, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { fetchExaminations } from './api';
import type { Examination, ExaminationsResponse } from './types';

export default function ExaminationsTable() {
  const [records, setRecords] = useState<Examination[]>([]);
  const [totals, setTotals] = useState({
    total_price: 0,
    total_final_price: 0,
    total_payment: 0,
    total_debt: 0,
  });
  const [meta, setMeta] = useState({
    total: 0,
    limit: 0,
    page: 1,
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadExaminations() {
      try {
        const res: ExaminationsResponse = await fetchExaminations();
        setRecords(res.data.examinations as Examination[]);
        setTotals({
          total_price: res.data.total_price,
          total_final_price: res.data.total_final_price,
          total_payment: res.data.total_payment,
          total_debt: res.data.total_debt,
        });
        setMeta(res.meta);
      } catch (error: unknown) {
        const message =
          error && typeof error === 'object' && 'message' in error
            ? String((error as Record<string, unknown>).message)
            : 'Failed to load examinations';
        console.error('Failed to load examinations', error);
        setErrorMessage(message);
      } finally {
        setLoading(false);
      }
    }

    loadExaminations();
  }, []);

  const rows = records.length
    ? records
    : Array.from({ length: 7 }, (_, index) => ({
        id: index + 1,
      })) as Examination[];

  return (
    <div className="w-full bg-[#f8fafc] p-6 text-[#1e293b] font-sans antialiased">
      
      {/* Üst Filter və Başlıq Hissəsi */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        
        {/* Sol tərəf: Başlıq və say */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-[#0f172a]">Müayinələr</h1>
          <span className="bg-[#e2e8f0] text-[#475569] text-sm font-medium px-2.5 py-0.5 rounded-md">
            {meta.total}
          </span>
        </div>

        {/* Sağ tərəf: Filterlər və Düymələr */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Axtarış İkonu */}
          <button className="p-2 text-[#64748b] hover:bg-slate-200 rounded-lg transition">
            <Search size={20} />
          </button>

          {/* Pasient Dropdown */}
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#cbd5e1] rounded-lg text-sm font-medium text-[#334155] hover:bg-slate-50">
            Pasient
            <ChevronDown size={16} className="text-[#64748b]" />
          </button>

          {/* Tarix Aralığı Seçimi */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#cbd5e1] rounded-lg text-sm text-[#64748b]">
            <span>Başlama tarix</span>
            <span className="text-[#94a3b8]">→</span>
            <span>Bitmə tarixi</span>
            <Calendar size={16} className="ml-1 text-[#64748b]" />
          </div>

          {/* Sıfırla */}
          <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-[#cbd5e1] rounded-lg text-sm font-medium text-[#334155] hover:bg-slate-50">
            Sıfırla
            <RotateCcw size={15} className="text-[#64748b]" />
          </button>

          {/* Export */}
          <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-[#cbd5e1] rounded-lg text-sm font-medium text-[#334155] hover:bg-slate-50">
            Export
            <Download size={15} className="text-[#64748b]" />
          </button>

          {/* Çap et */}
          <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-[#cbd5e1] rounded-lg text-sm font-medium text-[#334155] hover:bg-slate-50">
            Çap
            <Printer size={15} className="text-[#64748b]" />
          </button>

        </div>
      </div>

      {errorMessage ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 mb-6">
          {errorMessage}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 mb-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm text-slate-500">Ümumi qiymət</div>
            <div className="mt-2 text-xl font-semibold text-slate-900">{totals.total_price}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm text-slate-500">Son qiymət</div>
            <div className="mt-2 text-xl font-semibold text-slate-900">{totals.total_final_price}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm text-slate-500">Ödəniş</div>
            <div className="mt-2 text-xl font-semibold text-slate-900">{totals.total_payment}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm text-slate-500">Borc</div>
            <div className="mt-2 text-xl font-semibold text-slate-900">{totals.total_debt}</div>
          </div>
        </div>
      )}

      {/* Cədvəl Konteyneri */}
      <div className="bg-[#eef4fc] rounded-xl border border-[#dbeafe] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed min-w-[1000px]">
            
            {/* Cədvəlin Başı */}
            <thead>
              <tr className="border-b border-[#dbeafe] text-xs font-semibold text-[#64748b]">
                <th className="w-12 py-4 px-4 text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
                </th>
                <th className="w-12 py-4 px-2">№</th>
                <th className="w-[40%] py-4 px-4">Pasient</th>
                <th className="w-[12%] py-4 px-4">Giriş tarixi</th>
                <th className="w-[12%] py-4 px-4">Ümumi ödəniş</th>
                <th className="w-[12%] py-4 px-4">Ümumi borc</th>
                <th className="w-[12%] py-4 px-4">Ümumi məbləğ</th>
                <th className="w-24 py-4 px-4"></th>
              </tr>
            </thead>

            {/* Cədvəlin Gövdəsi */}
            <tbody className="bg-white divide-y divide-[#f1f5f9] text-sm text-[#334155]">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    Yüklənir...
                  </td>
                </tr>
              ) : (
                rows.map((row, index) => {
                  const item = row as Record<string, any>;
                  return (
                    <tr key={index} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="py-4 px-4 text-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
                    </td>
                    <td className="py-4 px-2 font-medium text-[#64748b]">{item.id ?? index + 1}</td>
                    <td className="py-4 px-4 font-normal tracking-wide text-[#334155] truncate max-w-xs">
                      {String(item.patient ?? item.name ?? '')}
                    </td>
                    <td className="py-4 px-4 text-[#475569]">{String(item.entryDate ?? item.date ?? '')}</td>
                    
                    <td className="py-4 px-4">
                      <span className="inline-block bg-[#edf7ed] text-[#2e7d32] font-bold text-center px-2 py-0.5 rounded min-w-[20px]">
                        {String(item.payment ?? item.total_payment ?? 0)}
                      </span>
                    </td>
                    
                    <td className="py-4 px-4">
                      <span className="inline-block bg-[#fdeded] text-[#d32f2f] font-bold text-center px-2 py-0.5 rounded min-w-[20px]">
                        {String(item.debt ?? item.total_debt ?? 0)}
                      </span>
                    </td>
                    
                    <td className="py-4 px-4">
                      <span className="inline-block bg-[#fff4e5] text-[#ed6c02] font-bold text-center px-2 py-0.5 rounded min-w-[20px]">
                        {String(item.total ?? item.total_price ?? 0)}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-[#0284c7] border border-[#bae6fd] hover:bg-[#e0f2fe] rounded-md transition">
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 text-[#64748b] border border-[#e2e8f0] hover:bg-slate-100 rounded-md transition">
                          <Printer size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              }))}
            </tbody>

            {/* Cədvəlin Aşağı (Cəm) Hissəsi */}
            <tfoot>
              <tr className="bg-[#eef4fc] font-semibold text-sm text-[#0f172a]">
                <td colSpan={4} className="py-4 px-4 text-right pr-8 font-bold">Cəm:</td>
                <td className="py-4 px-4">
                  <span className="inline-block bg-[#e1f0e1] text-[#2e7d32] font-bold text-center px-2 py-0.5 rounded min-w-[20px]">
                    0
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-block bg-[#fbdbe0] text-[#d32f2f] font-bold text-center px-2 py-0.5 rounded min-w-[20px]">
                    0
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-block bg-[#ffe8cc] text-[#ed6c02] font-bold text-center px-2 py-0.5 rounded min-w-[20px]">
                    0
                  </span>
                </td>
                <td></td>
              </tr>
            </tfoot>

          </table>
        </div>
      </div>

      {/* Pagination (Səhifələmə) Hissəsi */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-4 text-sm text-[#64748b]">
        
        {/* Səhifə nömrələri */}
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-slate-200 rounded transition">
            <ChevronLeft size={16} />
          </button>
          
          <button className="w-7 h-7 flex items-center justify-center bg-[#0284c7] text-white rounded font-medium">1</button>
          <button className="w-7 h-7 flex items-center justify-center hover:bg-slate-200 rounded">2</button>
          <button className="w-7 h-7 flex items-center justify-center hover:bg-slate-200 rounded">3</button>
          <button className="w-7 h-7 flex items-center justify-center hover:bg-slate-200 rounded">4</button>
          <span className="px-1">...</span>
          <button className="w-7 h-7 flex items-center justify-center hover:bg-slate-200 rounded">40</button>

          <button className="p-1.5 hover:bg-slate-200 rounded transition">
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Səhifəyə keçid inputu */}
        <div className="flex items-center gap-2 bg-white border border-[#cbd5e1] rounded-lg px-3 py-1">
          <span>Səhifəyə keçin</span>
          <ChevronRight size={16} className="text-[#94a3b8]" />
        </div>

      </div>

    </div>
  );
}