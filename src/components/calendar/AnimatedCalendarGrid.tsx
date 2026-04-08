'use client';

import { AnimatePresence, motion } from 'framer-motion';
import CalendarGrid from './CalendarGrid';
import { DateRange } from '@/types';

interface AnimatedCalendarGridProps {
  currentMonth: Date;
  direction: 'forward' | 'backward';
  animKey: number;
  dateRange: DateRange;
  onDayClick: (day: Date) => void;
  noteDates?: string[];
}

// Slides in from right (forward) or left (backward)
const variants = {
  enter: (dir: 'forward' | 'backward') => ({
    x: dir === 'forward' ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: 'forward' | 'backward') => ({
    x: dir === 'forward' ? -40 : 40,
    opacity: 0,
  }),
};

export default function AnimatedCalendarGrid({
  currentMonth,
  direction,
  animKey,
  dateRange,
  onDayClick,
  noteDates = [],
}: AnimatedCalendarGridProps) {
  return (
    // overflow-hidden clips the sliding grid so it doesn't bleed outside the card
    <div className="overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={animKey}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.22,
            ease: [0.25, 0.46, 0.45, 0.94], // custom ease — feels snappy
          }}
        >
          <CalendarGrid
            currentMonth={currentMonth}
            dateRange={dateRange}
            onDayClick={onDayClick}
            noteDates={noteDates}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}