import { useEffect } from 'react';

export function usePersistTable<T>(key: string, state: T): void {
  useEffect(() => {
    if (!key) return;

    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
}