import { WeekDay } from '@angular/common';

export interface OpeningHours {
  dayOfWeek: WeekDay;
  start: Date;
  end: Date;
  open: boolean;
}
