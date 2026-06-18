import type { ColumnDef } from '@tanstack/react-table';
import type { ToothColor } from './types';

export const columns: ColumnDef<ToothColor>[] = [
  {
    accessorKey: 'name',
    header: 'Ad',
  },
  {
    accessorKey: 'note',
    header: 'Qeyd',
  },
  {
    id: 'actions',
    header: '',
    cell: () => (
      <div className="flex gap-2">
        👁 ✏️ 🗑 💳
      </div>
    ),
  },
];