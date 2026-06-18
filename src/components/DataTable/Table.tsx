import React, { useState, useRef } from 'react';
import { Table, Checkbox, Space, Dropdown, Menu } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

// Sətir daxili (Actions) üçün SVG-lər
import EyeIcon from './icons/eye.svg';
import UpdateIcon from './icons/update.svg';
import DeleteIcon from './icons/delete.svg';

// Üst panel və Başlıqlar üçün xüsusi SVG-lər
import SearchIcon from './icons/search.svg';
import UpIcon from './icons/up.svg';
import RefreshIcon from './icons/refresh.svg';
import ExportIcon from './icons/export.svg';
import DeleteHeaderIcon from './icons/deleteHeader.svg';

interface ToothColor {
  key: string;
  id: number;
  name: string;
  note: string;
}

const ToothColorList: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

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

  const menu = (
    <Menu className="p-2 rounded-lg shadow-lg border border-slate-100">
      <Menu.Item key="a1" className="hover:bg-slate-50 rounded">
        <Checkbox checked className="text-slate-700 font-medium">A1</Checkbox>
      </Menu.Item>
      <Menu.Item key="a2" className="hover:bg-slate-50 rounded">
        <Checkbox className="text-slate-600">A2</Checkbox>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen w-[1032px]">
      <div className="w-full mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">Diş rəng növləri (2)</h2>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <button className="flex items-center gap-2 px-5 py-2.5 text-white font-medium rounded-lg bg-gradient-to-r from-[#196FB4] to-[#92DCF9] hover:opacity-90 active:scale-95 transition-all shadow-sm">
            Əlavə et <span className="text-lg leading-none">+</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Axtarış düyməsi */}
          <div className="flex items-center relative">
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder="Axtarış..." 
              className={`transition-all duration-300 ease-in-out border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white
                ${isSearchOpen ? 'w-44 pl-3 pr-8 py-1.5 opacity-100' : 'w-0 p-0 opacity-0 border-none'}`}
            />
            <button 
              onClick={toggleSearch}
              className={`text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center
                ${isSearchOpen ? 'absolute right-0 top-0 h-full p-2' : 'border border-slate-200 bg-white w-[34px] h-[34px]'}`}
            >
              <img src={SearchIcon} alt="Axtar" style={{ width: '16.67px', height: '15px' }} className="object-contain" />
            </button>
          </div>

          {/* Ad düyməsi */}
          <Dropdown overlay={menu} trigger={['click']}>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors">
              Ad <img src={UpIcon} alt="Up" style={{ width: '16.67px', height: '15px' }} className="object-contain" />
            </button>
          </Dropdown>

          {/* Təzələ düyməsi */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors">
            Təzələ <img src={RefreshIcon} alt="Təzələ" style={{ width: '16.67px', height: '15px' }} className="object-contain" />
          </button>
          
          {/* Export düyməsi */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors">
            Export <img src={ExportIcon} alt="Export" style={{ width: '16.67px', height: '15px' }} className="object-contain" />
          </button>

          {/* Sil düyməsi */}
          <button 
            disabled={selectedRowKeys.length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-red-500 bg-white hover:bg-red-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
          >
            Sil <img src={DeleteHeaderIcon} alt="Sil" style={{ width: '16.67px', height: '15px' }} className="object-contain" />
          </button>
        </div>
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
          rowClassName={(_, index) => index % 2 === 1 ? 'gradient-row' : 'white-row'}
        />
      </div>

      {/* Səhifələmə Paneli: 24px x 24px | Radius 3px | Active bg #196FB4 */}
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