import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday,
} from 'date-fns';

/**
 * Returns a 6-row grid of dates for a given month.
 * Includes leading/trailing days from adjacent months to fill the grid.
 */
export function getCalendarDays(date: Date): Date[] {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);

  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  return eachDayOfInterval({ start: gridStart, end: gridEnd });
}

export function formatMonthYear(date: Date): string {
  return format(date, 'MMMM yyyy');
}

export function formatDay(date: Date): string {
  return format(date, 'd');
}

export function isCurrentMonth(day: Date, activeMonth: Date): boolean {
  return isSameMonth(day, activeMonth);
}

export function isDayToday(day: Date): boolean {
  return isToday(day);
}