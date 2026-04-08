import { useState } from 'react';
import { isBefore } from 'date-fns';
import { DateRange } from '../types';

export function useDateRange() {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
  });

  function handleDayClick(day: Date) {
    const { start, end } = dateRange;

    if (!start) {
      setDateRange({ start: day, end: null });
      return;
    }

    if (start && !end) {
      if (isBefore(day, start)) {
        setDateRange({ start: day, end: start });
      } else {
        setDateRange({ start, end: day });
      }
      return;
    }

    setDateRange({ start: day, end: null });
  }

  function clearRange() {
    setDateRange({ start: null, end: null });
  }

  return { dateRange, handleDayClick, clearRange };
}