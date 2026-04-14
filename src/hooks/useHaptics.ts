import { useCallback } from 'react';

export function useHaptics() {
  const trigger = useCallback((type: 'light' | 'medium' | 'heavy') => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      switch (type) {
        case 'light':
          navigator.vibrate(10);
          break;
        case 'medium':
          navigator.vibrate(30);
          break;
        case 'heavy':
          navigator.vibrate([50, 50, 50]);
          break;
      }
    }
  }, []);

  return { trigger };
}
