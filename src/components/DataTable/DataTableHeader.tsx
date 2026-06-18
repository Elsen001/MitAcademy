interface DataTableHeaderProps {
  title: string;
  count: number;
}

export function DataTableHeader({ title, count }: DataTableHeaderProps) {
  return (
    <h2 className="text-2xl font-semibold text-slate-800">
      {title} ({count})
    </h2>
  );
}
