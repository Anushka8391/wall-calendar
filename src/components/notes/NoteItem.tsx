import { Note } from '../../types';
import { format } from 'date-fns';

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
}

export default function NoteItem({ note, onDelete }: NoteItemProps) {
  const createdAt = format(new Date(note.createdAt), 'MMM d, h:mm a');
  const noteLabel = note.date ? format(new Date(note.date), 'MMM d') : 'General';

  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-shadow duration-150 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-gray-700 leading-relaxed">{note.text}</p>
        <button
          onClick={() => onDelete(note.id)}
          aria-label="Delete note"
          className="text-gray-400 hover:text-red-500 transition-colors duration-150"
        >
          ✕
        </button>
      </div>

      <div className="mt-2 flex items-center justify-between gap-2 text-[10px] text-gray-400">
        <span>{createdAt}</span>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 uppercase tracking-[0.15em] text-[9px] font-semibold text-slate-500">
          {noteLabel}
        </span>
      </div>
    </div>
  );
}