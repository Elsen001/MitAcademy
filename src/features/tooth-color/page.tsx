import { useEffect, useState } from 'react';
import { DataTable } from '@/components/DataTable/DataTable';
import { columns } from './columns';
import { useServerTable } from '@/hooks/useServerTable';
import { fetchToothColors } from './api';
import type { ToothColor } from './types';

export default function ToothColorPage() {
  const tableState = useServerTable();

  const [data, setData] = useState<ToothColor[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);

    const res = await fetchToothColors({
      pageIndex: tableState.pagination.pageIndex,
      pageSize: tableState.pagination.pageSize,
      search: tableState.globalFilter,
    });

    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [tableState.pagination, tableState.globalFilter]);

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen">

      <h2 className="text-2xl font-semibold mb-4">
        Diş rəng növləri
      </h2>

      <DataTable
        data={data}
        columns={columns}
        state={tableState}
        setState={() => {}}
      />

      {loading && (
        <div className="mt-4 text-slate-500">
          Loading...
        </div>
      )}
    </div>
  );
}