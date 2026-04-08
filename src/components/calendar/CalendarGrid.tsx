import { isSameDay, isWithinInterval } from 'date-fns';
import { getCalendarDays, isCurrentMonth } from '@/utils/calendar';
import { DateRange, DayCellState } from '@/types';
import DayCell from './DayCell';

interface CalendarGridProps {
  currentMonth: Date;
  dateRange: DateRange;
  onDayClick: (day: Date) => void;
  noteDates: string[];
}

// ✅ IST FIX FUNCTION
function getISTToday() {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
}


function getDayCellState(
  day: Date,
  currentMonth: Date,
  dateRange: DateRange
): DayCellState {

  if (!isCurrentMonth(day, currentMonth)) return 'outside-month';

  const { start, end } = dateRange;

  if (start && isSameDay(day, start)) return 'start';
  if (end && isSameDay(day, end)) return 'end';

  if (start && end && isWithinInterval(day, { start, end })) return 'in-range';

  const today = getISTToday();

  if (isSameDay(day, today)) return 'today';

  return 'default';
}

export default function CalendarGrid({
  currentMonth,
  dateRange,
  onDayClick,
  noteDates = [],
}: CalendarGridProps) {

  const days = getCalendarDays(currentMonth);

  return (
    <div className="grid grid-cols-7 gap-y-1 px-4 pb-4">
      {days.map((day) => {

        const state = getDayCellState(day, currentMonth, dateRange);

        const hasNote = noteDates.includes(
          day.toISOString().split('T')[0]
        );

        return (
          <DayCell
            key={day.toISOString()}
            day={day}
            state={state}
            onClick={onDayClick}
            hasNote={hasNote}
          />
        );
      })}
    </div>
  );
}