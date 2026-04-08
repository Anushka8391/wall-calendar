

'use client';

import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useMonthTransition } from '@/hooks/useMonthTransition';
import { useDateRange } from '@/hooks/useDateRange';
import { useNotes } from '@/hooks/useNotes';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import AnimatedCalendarGrid from '@/components/calendar/AnimatedCalendarGrid';
import HeroImage from '@/components/calendar/HeroImage';
import NotesPanel from '@/components/notes/NotesPanel';

export default function Home() {
  const {
    currentMonth,
    direction,
    animKey,
    goForward,
    goBackward,
    goNextYear,
    goPrevYear,
  } = useMonthTransition(new Date());

  const { dateRange, handleDayClick, clearRange } = useDateRange();

  const {
    notes,
    addNote,
    deleteNote,
    getNotesForDate,
    getMonthlyNotes,
    getNoteDates,
  } = useNotes();

  return (
    <main className="calendar-bg min-h-screen flex items-center justify-center p-3 sm:p-6 md:p-10">

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-calendar overflow-hidden"
      >
        <div className="h-2.5 bg-gray-700" />

        <div className="flex flex-col md:flex-row">

          {/* LEFT IMAGE */}
          <div className="md:w-[45%]">
            <HeroImage
              month={currentMonth.getMonth()}
              monthName={format(currentMonth, 'MMMM')}
              year={currentMonth.getFullYear()}
              animKey={animKey}
            />
          </div>

          {/* RIGHT */}
          <div className="flex-1 flex flex-col">

            <CalendarHeader
              currentMonth={currentMonth}
              direction={direction}
              animKey={animKey}
              onPrevMonth={goBackward}
              onNextMonth={goForward}
              onPrevYear={goPrevYear}
              onNextYear={goNextYear}
            />

            <AnimatedCalendarGrid
              currentMonth={currentMonth}
              direction={direction}
              animKey={animKey}
              dateRange={dateRange}
              onDayClick={handleDayClick}
              noteDates={getNoteDates()}
            />

            <AnimatePresence>
              {dateRange.start && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mx-4"
                >
                  <div className="px-3 py-2 bg-blue-50 rounded-lg flex justify-between">
                    <p className="text-xs text-blue-700">
                      {format(dateRange.start, 'MMM d, yyyy')}
                    </p>
                    <button onClick={clearRange}>✕</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <NotesPanel
              dateRange={dateRange}
              notes={notes}
              onAddNote={addNote}
              onDeleteNote={deleteNote}
              getNotesForDate={getNotesForDate}
              getMonthlyNotes={getMonthlyNotes}
            />
          </div>
        </div>
      </motion.div>
    </main>
  );
}
