'use client';

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { formatMonthYear } from '@/utils/calendar';

interface CalendarHeaderProps {
  currentMonth: Date;
  direction?: 'forward' | 'backward';
  animKey?: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onPrevYear: () => void;
  onNextYear: () => void;
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarHeader({
  currentMonth,
  direction,
  animKey,
  onPrevMonth,
  onNextMonth,
  onPrevYear,
  onNextYear,
}: CalendarHeaderProps) {
  return (
    <div className="px-3 sm:px-5 pt-4 pb-2">
      <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
        <div className="flex items-center gap-1">
          <button
            onClick={onPrevYear}
            aria-label="Previous year"
            className="
              p-2 rounded-full
              hover:bg-gray-100 active:bg-gray-200
              active:scale-90 transition-all duration-150
              touch-manipulation
            "
          >
            <ChevronsLeft size={16} className="text-gray-500" />
          </button>
          <button
            onClick={onPrevMonth}
            aria-label="Previous month"
            className="
              p-2 rounded-full
              hover:bg-gray-100 active:bg-gray-200
              active:scale-90 transition-all duration-150
              touch-manipulation
            "
          >
            <ChevronLeft size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Animated month label */}
        <div className="overflow-hidden h-6 flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.h2
              key={animKey}
              custom={direction}
              initial={{ y: direction === 'forward' ? 12 : -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: direction === 'forward' ? -12 : 12, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="
                text-sm sm:text-base font-bold
                tracking-widest uppercase
                text-gray-700 font-sans
                whitespace-nowrap
              "
            >
              {formatMonthYear(currentMonth)}
            </motion.h2>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onNextMonth}
            aria-label="Next month"
            className="
              p-2 rounded-full
              hover:bg-gray-100 active:bg-gray-200
              active:scale-90 transition-all duration-150
              touch-manipulation
            "
          >
            <ChevronRight size={16} className="text-gray-500" />
          </button>
          <button
            onClick={onNextYear}
            aria-label="Next year"
            className="
              p-2 rounded-full
              hover:bg-gray-100 active:bg-gray-200
              active:scale-90 transition-all duration-150
              touch-manipulation
            "
          >
            <ChevronsRight size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Day labels — static, no animation needed */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="
              text-center text-[9px] sm:text-[10px]
              font-bold tracking-wider uppercase
              text-gray-400 py-1
            "
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}