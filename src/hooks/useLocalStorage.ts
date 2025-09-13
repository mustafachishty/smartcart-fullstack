import { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = loadFromLocalStorage<T>(key);
    return item !== null ? item : initialValue;
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      saveToLocalStorage(key, valueToStore);
    } catch (error) {
      console.error('Error in useLocalStorage setValue:', error);
    }
  };

  useEffect(() => {
    const item = loadFromLocalStorage<T>(key);
    if (item !== null) {
      setStoredValue(item);
    }
  }, [key]);

  return [storedValue, setValue] as const;
}