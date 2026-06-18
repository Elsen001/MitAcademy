import { LeftOutlined, RightOutlined } from '@ant-design/icons';

export function DataTablePagination() {
  return (
    <div className="mt-5 flex justify-end items-center gap-1.5 text-xs text-slate-600 select-none">
      <button className="page-btn text-slate-400 border-slate-200 bg-white opacity-50 cursor-not-allowed" disabled>
        <LeftOutlined style={{ fontSize: '10px' }} />
      </button>

      <button className="page-btn bg-[#196FB4] text-white border-[#196FB4] font-medium">1</button>
      <button className="page-btn border-slate-200 bg-white hover:bg-slate-50">2</button>
      <button className="page-btn border-slate-200 bg-white hover:bg-slate-50">3</button>
      <button className="page-btn border-slate-200 bg-white hover:bg-slate-50">4</button>
      <span className="w-6 text-center text-slate-400">...</span>
      <button className="page-btn border-slate-200 bg-white hover:bg-slate-50">40</button>

      <button className="page-btn border-slate-200 bg-white hover:bg-slate-50">
        <RightOutlined style={{ fontSize: '10px' }} />
      </button>

      <div className="flex items-center gap-2 ml-2 text-sm">
        <span>Səhifəyə keç</span>
      </div>
    </div>
  );
}
