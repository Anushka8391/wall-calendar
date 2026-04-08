'use client';

import { motion } from 'framer-motion';
import { formatDay } from '@/utils/calendar';
import { DayCellState } from '@/types';

interface DayCellProps {
  day: Date;
  state: DayCellState;
  onClick: (day: Date) => void;
  hasNote?: boolean;
}

export default function DayCell({
  day,
  state,
  onClick,
  hasNote = false,
}: DayCellProps) {
  const label     = formatDay(day);
  const isOutside = state === 'outside-month';
  const isStart   = state === 'start';
  const isEnd     = state === 'end';
  const isInRange = state === 'in-range';
  const isToday   = state === 'today';
  const isSelected = isStart || isEnd;

  return (
    <div
      className={`
        relative flex items-center justify-center h-9 sm:h-10
        ${isInRange ? 'bg-blue-50' : ''}
        ${isStart   ? 'bg-gradient-to-r from-transparent to-blue-50' : ''}
        ${isEnd     ? 'bg-gradient-to-l from-transparent to-blue-50' : ''}
        transition-colors duration-200 ease-out
      `}
    >
      <motion.button
        onClick={() => !isOutside && onClick(day)}
        disabled={isOutside}
        aria-label={day.toDateString()}
        // Scale pop on selection
        animate={isSelected ? { scale: [1, 1.18, 1] } : { scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        whileTap={!isOutside ? { scale: 0.85 } : {}}
        className={`
          relative z-10
          w-8 h-8 sm:w-9 sm:h-9
          flex items-center justify-center
          text-xs sm:text-sm font-medium
          rounded-full select-none
          touch-manipulation
          transition-colors duration-150
          ${isOutside  ? 'text-gray-200 cursor-default' : 'cursor-pointer'}
          ${isSelected
            ? 'bg-blue-600 text-white shadow-day-selected'
            : ''
          }
          ${isToday && !isSelected
            ? 'ring-2 ring-blue-400 ring-offset-1 text-blue-600 font-bold'
            : ''
          }
          ${isInRange && !isSelected
            ? 'text-blue-700 hover:bg-blue-100'
            : ''
          }
          ${!isOutside && !isSelected && !isInRange && !isToday
            ? 'text-gray-700 hover:bg-gray-100'
            : ''
          }
        `}
      >
        {label}

        {/* Note dot — pops in when added */}
        {hasNote && !isOutside && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            className={`
              absolute bottom-0.5 left-1/2 -translate-x-1/2
              w-1 h-1 rounded-full
              ${isSelected ? 'bg-white' : 'bg-amber-400'}
            `}
          />
        )}
      </motion.button>
    </div>
  );
}