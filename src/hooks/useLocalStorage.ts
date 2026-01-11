import { useState, useCallback } from 'react';
import { safeJsonParse } from '../lib/utils';
import { logger } from '../lib/logger';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? safeJsonParse(item, initialValue) : initialValue;
    } catch (error) {
      logger.warn(`Error reading localStorage key "${key}"`, { key, error });
      return initialValue;
    }
  });

  // Save to localStorage whenever value changes
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        logger.warn(`Error setting localStorage key "${key}"`, { key, error });
      }
    },
    [key, storedValue]
  );

  // Remove from localStorage
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      logger.warn(`Error removing localStorage key "${key}"`, { key, error });
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
