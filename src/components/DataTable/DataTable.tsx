import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import type { ColumnDef } from '@tanstack/react-table';

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  state: any;
  setState: any;
};

export function DataTable<T>({
  data,
  columns,
  state,
  setState,
}: DataTableProps<T>) {
  const table = useReactTable<T>({
    data,
    columns,
    state,
    onStateChange: setState,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-auto rounded-xl border">
      <table className="w-full border-collapse">

        <thead className="sticky top-0 z-10">
          {table.getHeaderGroups().map(hg => (
            <tr
              key={hg.id}
              className="bg-gradient-to-r from-[#469FF9] to-[#92DCF9] text-white"
            >
              {hg.headers.map(header => (
                <th key={header.id} className="px-4 py-3 text-left">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row, i) => (
            <tr
              key={row.id}
              className={
                i % 2 === 0
                  ? 'bg-white'
                  : 'bg-gradient-to-r from-[#469FF9] to-[#92DCF9] text-white'
              }
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-3">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}