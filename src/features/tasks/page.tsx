import React, { useEffect, useMemo, useState } from 'react';
import { 
  Plus, 
  Search, 
  RotateCcw, 
  Download, 
  Printer, 
  Trash2, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Pencil,
  X 
} from 'lucide-react';
import apiClient from '@/lib/api-client';
import { showError, showSuccess } from '@/lib/toast';
import { AddModal } from './AddModal';
import { EditModal } from './EditModal';

interface RowData {
  id: number;
  no: number;
  ad: string;
}

interface Supplier {
  id: number;
  ad?: string;
  name?: string;
}

interface SupplierIndexResponse {
  message: string;
  data: {
    suppliers: Supplier[];
  };
  meta?: {
    total: number;
    limit: number;
    page: number;
  };
}

const TasksPage: React.FC = () => {
  const [data, setData] = useState<RowData[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Edit üçün state-lər
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRowToEdit, setSelectedRowToEdit] = useState<RowData | null>(null);

  // Axtarış üçün state-lər
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Axtarışa görə datanın filterlənməsi
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    return data.filter(row => 
      row.ad.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  
  const displayedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage]);

  const selectedAllCurrentPage =
    displayedRows.length > 0 && displayedRows.every(row => selectedIds.includes(row.id));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Məlumatların ilk yüklənməsi
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await apiClient.get<SupplierIndexResponse>('/supplier/index');
        const suppliers = response.data?.data?.suppliers ?? [];

        setData(
          suppliers.map((supplier, index) => ({
            id: supplier.id,
            no: index + 1,
            ad: supplier.name ?? supplier.ad ?? 'Naməlum',
          })),
        );
      } catch (error) {
        showError('Məlumat gətirilmədi');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  // Seçimlərin idarə olunması
  const toggleSelectAll = () => {
    if (selectedAllCurrentPage) {
      setSelectedIds(selectedIds.filter(id => !displayedRows.some(row => row.id === id)));
    } else {
      setSelectedIds([
        ...new Set([...selectedIds, ...displayedRows.map(row => row.id)]),
      ]);
    }
  };

  const toggleSelectRow = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleOpenEdit = (row: RowData) => {
    setSelectedRowToEdit(row);
    setIsEditModalOpen(true);
  };

  // 405 xətasının qarşısını almaq üçün POST olaraq tənzimləndi (Lazım gələrsə .put edə bilərsiniz)
  const handleUpdateSupplier = async (updatedData: { ad: string; muayineGorunsun: boolean }) => {
    if (!selectedRowToEdit) return;

    try {
      const requestBody = { 
        name: updatedData.ad, 
        muayineGorunsun: updatedData.muayineGorunsun 
      };
      
      const response = await apiClient.post(`/supplier/update/${selectedRowToEdit.id}`, requestBody);
      const updatedItem = response.data?.data?.supplier ?? response.data?.data ?? response.data;
      const finalAd = updatedItem?.name ?? updatedItem?.ad ?? updatedData.ad;

      setData((prev) =>
        prev.map((row) => (row.id === selectedRowToEdit.id ? { ...row, ad: finalAd } : row))
      );
      
      showSuccess('Vəzifə yeniləndi');
    } catch (error) {
      showError('Vəzifə yenilənərkən xəta baş verdi');
      throw error;
    }
  };

  const handleDeleteSingle = async (id: number) => {
    if (!window.confirm('Bu vəzifəni silmək istədiyinizdən əminsiniz?')) return;

    try {
      await apiClient.delete(`/supplier/delete/${id}`);
      setData((prev) => prev.filter((row) => row.id !== id));
      setSelectedIds((prev) => prev.filter((item) => item !== id));
      showSuccess('Vəzifə silindi');
    } catch (error) {
      showError('Vəzifə silinərkən xəta baş verdi');
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Seçilmiş ${selectedIds.length} vəzifəni silmək istədiyinizdən əminsiniz?`)) return;

    try {
      await Promise.all(
        selectedIds.map((id) => apiClient.delete(`/supplier/delete/${id}`))
      );
      setData((prev) => prev.filter((row) => !selectedIds.includes(row.id)));
      setSelectedIds([]);
      showSuccess('Seçilmiş vəzifələr silindi');
    } catch (error) {
      showError('Bəzi vəzifələr silinə bilmədi');
    }
  };

  const handleExport = () => {
    const exportItems = selectedIds.length > 0 
      ? data.filter(row => selectedIds.includes(row.id))
      : filteredData;

    if (exportItems.length === 0) {
      showError('Export ediləcək məlumat tapılmadı');
      return;
    }

    const csvContent = [
      ['№', 'Ad'],
      ...exportItems.map(row => [row.no, row.ad])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `vezifeler_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showSuccess('Məlumatlar export olundu');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setSearchQuery('');
    setIsSearchOpen(false);
    setSelectedIds([]);
    setCurrentPage(1);
  };

  return (
    <div className="w-full min-h-screen bg-[#f4f7f9] p-3 sm:p-6 font-sans text-[#1e293b]">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>

      {isLoading ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          <span className="text-lg font-medium text-[#0f172a]">Yüklənir...</span>
        </div>
      ) : (
        <div id="print-area" className="max-w-7xl mx-auto">
          {/* Başlıq */}
          <div className="mb-4 flex justify-between items-center">
            <h1 className="text-lg sm:text-xl font-bold text-[#0f172a]">Vəzifələr ({filteredData.length})</h1>
          </div>

          {/* Alətlər Paneli (Responsive Toolbar) */}
          <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-3 mb-4 no-print">
            {/* Əlavə et düyməsi - Mobildə tam genişlik */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#2b83c3] to-[#79c3e9] text-white px-5 py-2.5 rounded-lg font-medium shadow-sm hover:opacity-90 transition-opacity w-full lg:w-auto text-sm sm:text-base"
            >
              Əlavə et <Plus size={18} />
            </button>

            {/* Sağ tərəfdəki filtrlər - Mobildə Grid və ya çevik düzülüş */}
            <div className="grid grid-cols-2 sm:flex sm:items-center sm:flex-wrap gap-2 w-full lg:w-auto">
              
              {/* Animasiyalı Axtarış Paneli - Mobildə tam sətir tutur */}
              <div className="col-span-2 sm:col-span-1 flex items-center h-10 bg-white border border-gray-300 rounded-lg transition-all duration-300 overflow-hidden px-2 w-full sm:w-auto">
                <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-1 text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
                  <Search size={18} />
                </button>
                <div className={`transition-all duration-300 flex items-center ${isSearchOpen ? 'w-full sm:w-48 ml-2' : 'w-0'}`}>
                  {isSearchOpen && (
                    <>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentPage(1);
                        }}
                        placeholder="Axtar..."
                        className="w-full bg-transparent border-none text-sm outline-hidden pr-2 text-[#1e293b]"
                        autoFocus
                      />
                      {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
                          <X size={14} />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Ad Filter Dropdown */}
              <div className="flex items-center justify-between gap-1 border border-gray-300 rounded-lg px-3 py-2 bg-white cursor-pointer hover:bg-gray-50 h-10 text-sm">
                <span className="select-none">Ad</span>
                <ChevronDown size={16} className="text-gray-500" />
              </div>

              {/* Sıfırla */}
              <button onClick={handleReset} className="flex items-center justify-center gap-1 border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm hover:bg-gray-50 h-10">
                Sıfırla <RotateCcw size={14} />
              </button>

              {/* Export */}
              <button onClick={handleExport} className="flex items-center justify-center gap-1 border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm hover:bg-gray-50 h-10">
                Export <Download size={14} />
              </button>

              {/* Çap */}
              <button onClick={handlePrint} className="flex items-center justify-center gap-1 border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm hover:bg-gray-50 h-10">
                Çap <Printer size={14} />
              </button>

              {/* Toplu Sil */}
              <button 
                onClick={handleDeleteSelected}
                disabled={selectedIds.length === 0}
                className={`col-span-2 sm:col-span-1 flex items-center justify-center gap-1 border rounded-lg px-3 py-2 text-sm h-10 transition-colors ${
                  selectedIds.length > 0 
                    ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' 
                    : 'bg-white text-gray-400 border-gray-300 cursor-not-allowed opacity-60'
                }`}
              >
                Sil <Trash2 size={14} />
              </button>
            </div>
          </div>

          {/* Modallar */}
          <AddModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSave={async ({ ad, muayineGorunsun }) => {
              try {
                const requestBody = { name: ad, muayineGorunsun };
                const response = await apiClient.post('/supplier/store', requestBody);
                const createdItem = response.data?.data?.supplier ?? response.data?.data ?? response.data;
                
                setData((prev) => [
                  {
                    id: createdItem?.id ?? Date.now(),
                    no: 1,
                    ad: createdItem?.name ?? createdItem?.ad ?? ad,
                  },
                  ...prev.map((row) => ({ ...row, no: row.no + 1 })),
                ]);
                setCurrentPage(1);
                showSuccess('Vəzifə əlavə edildi');
              } catch (error) {
                showError('Vəzifə əlavə edilərkən xəta baş verdi');
              }
            }}
          />

          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedRowToEdit(null);
            }}
            initialAd={selectedRowToEdit?.ad ?? ''}
            onSave={handleUpdateSupplier}
          />

          {/* Cədvəl Konteyneri - overflow-x-auto mobildə sürüşdürməni təmin edir */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden w-full overflow-x-auto chunk-table">
            <table className="w-full border-collapse text-left min-w-[500px] sm:min-w-full">
              <thead>
                <tr className="bg-[#e0f0ff] border-b border-[#cbd5e1]">
                  <th className="p-3 sm:p-4 w-12 sm:w-16 text-center no-print">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded text-[#2b83c3] focus:ring-[#2b83c3] cursor-pointer"
                      checked={selectedAllCurrentPage}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="p-3 sm:p-4 w-16 sm:w-20 font-medium text-[#475569] border-r border-[#cbd5e1] text-sm sm:text-base">№</th>
                  <th className="p-3 sm:p-4 font-medium text-[#475569] text-sm sm:text-base">Ad</th>
                  <th className="p-3 sm:p-4 w-24 sm:w-32 no-print"></th>
                </tr>
              </thead>

              <tbody>
                {displayedRows.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center p-8 text-gray-400 text-sm">Məlumat tapılmadı</td>
                  </tr>
                ) : (
                  displayedRows.map((row) => {
                    const isSelected = selectedIds.includes(row.id);
                    return (
                      <tr 
                        key={row.id} 
                        className={`border-b border-[#e2e8f0] transition-colors ${
                          isSelected ? 'bg-[#0f213a] text-[#38bdf8]' : 'bg-white text-[#1e293b]'
                        }`}
                      >
                        <td className="p-3 sm:p-4 text-center no-print">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded cursor-pointer"
                            checked={isSelected}
                            onChange={() => toggleSelectRow(row.id)}
                          />
                        </td>
                        <td className={`p-3 sm:p-4 border-r font-medium text-sm sm:text-base ${isSelected ? 'border-[#1e3a5f]' : 'border-[#e2e8f0]'}`}>{row.no}</td>
                        <td className="p-3 sm:p-4 font-medium text-sm sm:text-base break-all">{row.ad}</td>

                        <td className="p-3 sm:p-4 text-right no-print">
                          <div className="flex justify-end gap-1.5 sm:gap-2">
                            <button 
                              onClick={() => handleOpenEdit(row)}
                              className={`p-1.5 rounded border transition-colors ${
                                isSelected 
                                  ? 'border-[#1e3a5f] text-[#38bdf8] hover:bg-[#153054]' 
                                  : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              <Pencil size={15} />
                            </button>
                            <button 
                              onClick={() => handleDeleteSingle(row.id)}
                              className={`p-1.5 rounded border transition-colors ${
                                isSelected 
                                  ? 'border-[#1e3a5f] text-[#38bdf8] hover:bg-[#153054]' 
                                  : 'border-gray-300 text-red-500 hover:bg-red-50 hover:border-red-200'
                              }`}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Peycinasiya (Responsive Pagination) */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4 text-sm text-gray-600 no-print w-full">
            <div className="flex items-center gap-1 order-2 md:order-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200 bg-white"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Kiçik ekranlarda çox sayda səhifə düyməsi sıxlıq yaratmasın deyə sadələşdirilib */}
              <div className="flex items-center gap-1 max-w-[200px] sm:max-w-none overflow-x-auto px-1">
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 shrink-0 rounded flex items-center justify-center font-medium transition text-xs sm:text-sm ${
                        page === currentPage
                          ? 'bg-[#2b83c3] text-white'
                          : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200 bg-white"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="text-xs sm:text-sm text-slate-500 order-1 md:order-2 text-center md:text-right w-full md:w-auto">
              {`Səhifə ${currentPage} / ${totalPages} — Toplam ${filteredData.length} sətir`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;