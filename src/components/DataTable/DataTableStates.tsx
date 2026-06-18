import { useRef, useState } from 'react';
import type { Key } from 'react';

export function useDataTableStates() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => {
      const next = !prev;
      if (!prev) {
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
      return next;
    });
  };

  return {
    selectedRowKeys,
    setSelectedRowKeys,
    isSearchOpen,
    toggleSearch,
    searchInputRef,
  };
}
