import { Checkbox, Dropdown } from 'antd';
import type { Key, RefObject } from 'react';

import SearchIcon from './icons/search.svg';
import UpIcon from './icons/up.svg';
import RefreshIcon from './icons/refresh.svg';
import ExportIcon from './icons/export.svg';
import DeleteHeaderIcon from './icons/deleteHeader.svg';

interface DataTableToolbarProps {
  selectedRowKeys: Key[];
  isSearchOpen: boolean;
  toggleSearch: () => void;
  searchInputRef: RefObject<HTMLInputElement>;
}

export function DataTableToolbar({
  selectedRowKeys,
  isSearchOpen,
  toggleSearch,
  searchInputRef,
}: DataTableToolbarProps) {
  const menuItems = [
    {
      key: 'a1',
      label: (
        <div className="flex items-center gap-2">
          <Checkbox checked className="text-slate-700 font-medium">
            A1
          </Checkbox>
        </div>
      ),
      className: 'hover:bg-slate-50 rounded',
    },
    {
      key: 'a2',
      label: (
        <div className="flex items-center gap-2">
          <Checkbox className="text-slate-600">A2</Checkbox>
        </div>
      ),
      className: 'hover:bg-slate-50 rounded',
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
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
          <img
            src={SearchIcon}
            alt="Axtar"
            style={{ width: '16.67px', height: '15px' }}
            className="object-contain"
          />
        </button>
      </div>

      <Dropdown menu={{ items: menuItems }} trigger={['click']}>
        <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors">
          Ad <img src={UpIcon} alt="Up" style={{ width: '16.67px', height: '15px' }} className="object-contain" />
        </button>
      </Dropdown>

      <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors">
        Təzələ <img src={RefreshIcon} alt="Təzələ" style={{ width: '16.67px', height: '15px' }} className="object-contain" />
      </button>

      <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors">
        Export <img src={ExportIcon} alt="Export" style={{ width: '16.67px', height: '15px' }} className="object-contain" />
      </button>

      <button
        disabled={selectedRowKeys.length === 0}
        className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-red-500 bg-white hover:bg-red-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
      >
        Sil <img src={DeleteHeaderIcon} alt="Sil" style={{ width: '16.67px', height: '15px' }} className="object-contain" />
      </button>
    </div>
  );
}
