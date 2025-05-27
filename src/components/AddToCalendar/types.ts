export interface CalendarEvent {
  title: string;
  description: string;
  start: Date;
  end: Date | null;
  location: string;
  timezone: string;
}
