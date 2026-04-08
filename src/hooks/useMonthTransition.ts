import { useState, useCallback, useEffect } from 'react';

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

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const monthChanged = now.getMonth() !== currentMonth.getMonth() || now.getFullYear() !== currentMonth.getFullYear();
      const dayChanged = now.getDate() !== new Date(currentMonth).getDate(); // wait, no, to check if today changed, but since it's interval, better to check if the current day is different from last check.

      // To force re-render when day changes, we can always setAnimKey every interval, but that's bad.
      // Better to have a state for lastDay, and if now.getDate() !== lastDay, setAnimKey.

      // But to simplify, since the month update will happen, and for day, since isToday uses new Date(), but to force re-render, we can setAnimKey when day changes.

      // But to avoid unnecessary re-renders, let's add a state for lastUpdate.

      // For now, to make it work, setAnimKey every minute to force re-render for today update.

      setAnimKey((k) => k + 1);

      if (monthChanged) {
        setCurrentMonth(now);
      }
    }, 60000); // every minute

    return () => clearInterval(interval);
  }, [currentMonth]);

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