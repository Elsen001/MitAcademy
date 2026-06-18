import { Table, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { DataTableHeader } from './DataTableHeader';
import { DataTableToolbar } from './DataTableToolbar';
import { DataTablePagination } from './DataTablePagination';
import { useDataTableStates } from './DataTableStates';

import EyeIcon from './icons/eye.svg';
import UpdateIcon from './icons/update.svg';
import DeleteIcon from './icons/delete.svg';

interface ToothColor {
  key: string;
  id: number;
  name: string;
  note: string;
}

const ToothColorList = () => {
  const {
    selectedRowKeys,
    setSelectedRowKeys,
    isSearchOpen,
    toggleSearch,
    searchInputRef,
  } = useDataTableStates();

  const data: ToothColor[] = [
    { key: '1', id: 1, name: '3D', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { key: '2', id: 2, name: 'Classic', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { key: '3', id: 3, name: '3D', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { key: '4', id: 4, name: '3D', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { key: '5', id: 5, name: '3D', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  ];

  const columns: ColumnsType<ToothColor> = [
    {
      title: 'Ad',
      dataIndex: 'name',
      key: 'name',
      className: 'font-medium px-6',
    },
    {
      title: 'Qeyd',
      dataIndex: 'note',
      key: 'note',
      className: 'px-6 text-opacity-85',
    },
    {
      title: '',
      key: 'actions',
      className: 'px-6',
      render: (_, __, index) => {
        const isGradientRow = index % 2 === 1;
        const buttonBgClass = isGradientRow ? 'bg-transparent border-transparent' : 'bg-white border-slate-200';
        const iconColorClass = isGradientRow ? 'text-white' : 'text-[#004B87]';

        return (
          <Space size="small" className="flex justify-end gap-2">
            <button className={`w-[30px] h-[30px] flex items-center justify-center border rounded transition-colors ${buttonBgClass} ${iconColorClass}`}>
              <img src={EyeIcon} alt="Görüntülə" style={{ width: '16.67px', height: '15px' }} className="fill-current object-contain" />
            </button>
            <button className={`w-[30px] h-[30px] flex items-center justify-center border rounded transition-colors ${buttonBgClass} ${iconColorClass}`}>
              <img src={UpdateIcon} alt="Yenilə" style={{ width: '16.67px', height: '15px' }} className="fill-current object-contain" />
            </button>
            <button className={`w-[30px] h-[30px] flex items-center justify-center border rounded transition-colors ${buttonBgClass} ${iconColorClass} hover:bg-red-50`}>
              <img src={DeleteIcon} alt="Sil" style={{ width: '16.67px', height: '15px' }} className="fill-current object-contain" />
            </button>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen w-[1032px]">
      <div className="w-full mb-6">
        <DataTableHeader title="Diş rəng növləri" count={2} />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <button className="flex items-center gap-2 px-5 py-2.5 text-white font-medium rounded-lg bg-gradient-to-r from-[#196FB4] to-[#92DCF9] hover:opacity-90 active:scale-95 transition-all shadow-sm">
            Əlavə et <span className="text-lg leading-none">+</span>
          </button>
        </div>

        <DataTableToolbar
          selectedRowKeys={selectedRowKeys}
          isSearchOpen={isSearchOpen}
          toggleSearch={toggleSearch}
          searchInputRef={searchInputRef as React.RefObject<HTMLInputElement>}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden custom-gradient-table">
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys),
          }}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowClassName={(_, index) => (index % 2 === 1 ? 'gradient-row' : 'white-row')}
        />
      </div>

      <DataTablePagination />

      <style>{`
        /* Səhifələmə düymələrinin xüsusi ölçüləri (24x24, Radius: 3px) */
        .page-btn {
          width: 24px !important;
          height: 24px !important;
          padding: 0 !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          border-width: 1px !important;
          border-style: solid !important;
          border-radius: 3px !important;
          font-size: 11px !important;
          transition: all 0.2s ease;
        }

        .custom-gradient-table .ant-table-tbody > tr {
          height: 70px !important;
        }

        /* Başlıqların bütöv hamar qradiyenti */
        .custom-gradient-table .ant-table-thead > tr {
          background: linear-gradient(90deg, #469FF9 0%, #92DCF9 100%) !important;
        }
        .custom-gradient-table .ant-table-thead > tr > th {
          background: transparent !important;
          color: white !important;
          font-weight: 600;
          border-bottom: none;
        }

        /* Sətirlər üçün TƏKRARLANMAYAN bütöv qradiyent */
        .custom-gradient-table .gradient-row {
          background: linear-gradient(90deg, #469FF9 0%, #92DCF9 100%) !important;
        }
        
        .custom-gradient-table .gradient-row td {
          background: transparent !important; 
          background-image: none !important;
          color: white !important;
        }

        .custom-gradient-table .white-row td {
          background: white !important;
          color: #334155 !important;
        }

        /* Checkbox fərdiləşdirməsi */
        .ant-checkbox-checked .ant-checkbox-inner::after {
          transform: rotate(0deg) scale(1) !important;
          position: absolute;
          left: 3px !important;
          top: 6px !important;
          width: 8px !important;
          height: 2px !important;
          border: none !important;
          background-color: white !important;
        }
        
        .custom-gradient-table .gradient-row .ant-checkbox-checked .ant-checkbox-inner {
          background-color: white !important;
          border-color: white !important;
        }
        .custom-gradient-table .gradient-row .ant-checkbox-checked .ant-checkbox-inner::after {
          background-color: #469FF9 !important;
        }
      `}</style>
    </div>
  );
};

export default ToothColorList;
