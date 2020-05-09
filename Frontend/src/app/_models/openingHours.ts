import { WeekDay } from '@angular/common';

export interface OpeningHours {
  dayOfWeek: WeekDay;
  start: number;
  end: number;
  open: boolean;
}
