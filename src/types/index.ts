export type DateRange = {
  start: Date | null;
  end: Date | null;
};

export type Note = {
  id: string;
  text: string;
  date: string | null;
  createdAt: string;
};

export type DayCellState =
  | 'default'
  | 'today'
  | 'outside-month'
  | 'start'
  | 'end'
  | 'in-range';