'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Note, DateRange } from '@/types';
import NoteItem from './NoteItem';
import { Plus, StickyNote, CalendarDays } from 'lucide-react';

interface NotesPanelProps {
  dateRange: DateRange;
  notes: Note[];
  onAddNote: (text: string, date: string | null) => void;
  onDeleteNote: (id: string) => void;
  getNotesForDate: (dateKey: string) => Note[];
  getMonthlyNotes: () => Note[];
}

type NoteTab = 'range' | 'monthly';

export default function NotesPanel({
  dateRange,
  notes,
  onAddNote,
  onDeleteNote,
  getNotesForDate,
  getMonthlyNotes,
}: NotesPanelProps) {
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState<NoteTab>('range');

  const dateKey = dateRange.start
    ? dateRange.start.toISOString().split('T')[0]
    : null;

  const rangeLabel = dateRange.start
    ? dateRange.end
      ? `${format(dateRange.start, 'MMM d')} – ${format(dateRange.end, 'MMM d')}`
      : format(dateRange.start, 'MMM d')
    : 'Date Notes';

  const rangeNotes = dateKey ? getNotesForDate(dateKey) : [];
  const monthlyNotes = getMonthlyNotes();

  const visibleNotes = activeTab === 'monthly' ? monthlyNotes : rangeNotes;
  const isDateTabDisabled = activeTab === 'range' && !dateKey;
  const totalNotes = notes.length;

  function handleAdd() {
    if (!inputText.trim() || isDateTabDisabled) return;
    onAddNote(inputText, activeTab === 'monthly' ? null : dateKey);
    setInputText('');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  }

  return (
    <div className="border-t border-gray-100 bg-gradient-to-b from-amber-50/40 to-white p-3 sm:p-4 flex flex-col gap-3">

      {/* Header row */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Notes
          </p>
          <p className="text-sm font-semibold text-gray-700">
            {activeTab === 'monthly' ? 'Monthly notes' : rangeLabel}
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-gray-500">
          <span>{totalNotes} total</span>
          <span>•</span>
          <span>{visibleNotes.length} shown</span>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5">
        <button
          onClick={() => setActiveTab('range')}
          className={
            `
              flex items-center gap-1
              text-[10px] sm:text-xs px-2 sm:px-3 py-1
              rounded-md font-medium transition-all duration-150
              ${activeTab === 'range'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
              }
            `
          }
        >
          <CalendarDays size={10} />
          <span className="hidden sm:inline">{dateKey ? 'Selected date' : 'Date'}</span>
        </button>

        <button
          onClick={() => setActiveTab('monthly')}
          className={
            `
              flex items-center gap-1
              text-[10px] sm:text-xs px-2 sm:px-3 py-1
              rounded-md font-medium transition-all duration-150
              ${activeTab === 'monthly'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
              }
            `
          }
        >
          <StickyNote size={10} />
          General
        </button>
      </div>

      {/* Input row */}
      <div className="flex gap-2 items-end">
        <textarea
          rows={2}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isDateTabDisabled}
          placeholder={
            activeTab === 'monthly'
              ? 'Add a monthly note...'
              : dateKey
              ? `Note for ${rangeLabel}...`
              : 'Select a date first...'
          }
          className="
            flex-1 text-xs sm:text-sm resize-none
            rounded-xl border border-gray-200
            px-3 py-2 bg-white
            placeholder:text-gray-300
            focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent
            disabled:bg-gray-50 disabled:cursor-not-allowed
            transition-all duration-200
            leading-relaxed
          "
        />
        <button
          onClick={handleAdd}
          disabled={!inputText.trim() || isDateTabDisabled}
          aria-label="Add note"
          className="
            p-2.5 rounded-xl
            transition-all duration-150
            touch-manipulation active:scale-90
            disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed
            enabled:bg-blue-600 enabled:text-white
            enabled:hover:bg-blue-700 enabled:shadow-sm enabled:shadow-blue-200
          "
        >
          <Plus size={15} />
        </button>
      </div>

      {/* Notes list */}
      <div className="notes-scroll max-h-28 sm:max-h-36 overflow-y-auto -mr-1 pr-1">
        {visibleNotes.length === 0 ? (
          <p className="text-[11px] text-gray-300 italic text-center py-4">
            {isDateTabDisabled
              ? 'Select a date to add notes'
              : 'No notes yet — add one above'
            }
          </p>
        ) : (
          visibleNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onDelete={onDeleteNote}
            />
          ))
        )}
      </div>
    </div>
  );
}