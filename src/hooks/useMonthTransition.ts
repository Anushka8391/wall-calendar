import { useState, useCallback } from 'react';

type Direction = 'forward' | 'backward';

export function useMonthTransition(initial: Date) {
  const [currentMonth, setCurrentMonth] = useState(initial);
  const [direction, setDirection]       = useState<Direction>('forward');
  const [animKey, setAnimKey]           = useState(0); // forces remount on change

  const goForward = useCallback(() => {
    setDirection('forward');
    setCurrentMonth((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
    setAnimKey((k) => k + 1);
  }, []);

  const goBackward = useCallback(() => {
    setDirection('backward');
    setCurrentMonth((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
    setAnimKey((k) => k + 1);
  }, []);

  const goNextYear = useCallback(() => {
    setDirection('forward');
    setCurrentMonth((prev) => {
      const d = new Date(prev);
      d.setFullYear(d.getFullYear() + 1);
      return d;
    });
    setAnimKey((k) => k + 1);
  }, []);

  const goPrevYear = useCallback(() => {
    setDirection('backward');
    setCurrentMonth((prev) => {
      const d = new Date(prev);
      d.setFullYear(d.getFullYear() - 1);
      return d;
    });
    setAnimKey((k) => k + 1);
  }, []);

  return {
    currentMonth,
    direction,
    animKey,
    goForward,
    goBackward,
    goNextYear,
    goPrevYear,
  };
}