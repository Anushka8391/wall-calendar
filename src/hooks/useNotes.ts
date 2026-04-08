import { useState, useEffect } from 'react';
import { Note } from '../types';

const STORAGE_KEY = 'wall-calendar-notes';

function generateId(): string {
  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function getStoredNotes(): Note[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    console.warn('Error loading notes');
    return [];
  }
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(getStoredNotes);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      console.warn('Error saving notes');
    }
  }, [notes]);

  function addNote(text: string, date: string | null) {
    if (!text.trim()) return;

    const newNote: Note = {
      id: generateId(),
      text: text.trim(),
      date,
      createdAt: new Date().toISOString(),
    };

    setNotes((prev) => [newNote, ...prev]);
  }

  function deleteNote(id: string) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  function getNotesForDate(dateKey: string) {
    return notes.filter((n) => n.date === dateKey);
  }

  function getMonthlyNotes() {
    return notes.filter((n) => n.date === null);
  }

  function getNoteDates() {
    return notes
      .filter((n) => n.date !== null)
      .map((n) => n.date as string);
  }

  return {
    notes,
    addNote,
    deleteNote,
    getNotesForDate,
    getMonthlyNotes,
    getNoteDates,
  };
}