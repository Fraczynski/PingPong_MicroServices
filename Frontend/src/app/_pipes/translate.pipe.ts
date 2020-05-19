import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  transform(data: string): string {
    switch (data) {
      case 'Warning': {
        return 'Ostrzeżenie';
      }
      case 'Information': {
        return 'Informacja';
      }
      case 'Employee': {
        return 'Pracownik';
      }
      case 'Customer': {
        return 'Klient';
      }
      case 'Administrator': {
        return 'Administrator';
      }
      case 'Sunday': {
        return 'Niedziela';
      }
      case 'Monday': {
        return 'Poniedziałek';
      }
      case 'Tuesday': {
        return 'Wtorek';
      }
      case 'Wednesday': {
        return 'Środa';
      }
      case 'Thursday': {
        return 'Czwartek';
      }
      case 'Friday': {
        return 'Piątek';
      }
      case 'Saturday': {
        return 'Sobota';
      }
      case 'Cancelled': {
        return 'Anulowany';
      }
      case 'CustomerAbsence': {
        return 'Niebecność klienta';
      }
      case 'Convirmed': {
        return 'Potwierdzony';
      }
      case 'Active': {
        return 'Aktywny';
      }
      case 'Removed': {
        return 'Usunięty';
      }
      case 'Disabled': {
        return 'Niedostępny';
      }
    }
  }
}
