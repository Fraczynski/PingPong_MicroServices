// angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
// ngx-bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale, plLocale } from 'ngx-bootstrap/chronos';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AlertModule } from 'ngx-bootstrap/alert';

// toastr
import { ToastrModule } from 'ngx-toastr';
// file upload
import { FileUploadModule } from 'ng2-file-upload';
// fontawesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// switch
import { UiSwitchModule } from 'ngx-ui-switch';
// charts
import { ChartsModule } from 'ng2-charts';
// components
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { RoomsViewComponent } from './rooms-view/rooms-view.component';
import { TableScheduleComponent } from './table-schedule/table-schedule.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserReservationsComponent } from './user-reservations/user-reservations.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { EditRoleComponent } from './admin/edit-role/edit-role.component';
import { TranslatePipe } from './_pipes/translate.pipe';
import { RoomsManagerComponent } from './admin/rooms-manager/rooms-manager.component';
import { OpeningHoursComponent } from './admin/opening-hours/opening-hours.component';
import { EnumToArrayPipe } from './_pipes/enumToArray.pipe';
import { ReservationsListComponent } from './admin/reservations-list/reservations-list.component';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { AddReservationModalComponent } from './admin/add-reservation-modal/add-reservation-modal.component';
import { AddSpecialOpeningHoursModalComponent } from './admin/add-special-opening-hours-modal/add-special-opening-hours-modal.component';
import { AddClosingDayModalComponent } from './admin/add-closing-day-modal/add-closing-day-modal.component';
import { AddRoomModalComponent } from './admin/add-room-modal/add-room-modal.component';
import { EditRoomModalComponent } from './admin/edit-room-modal/edit-room-modal.component';
import { HomePageManagerComponent } from './admin/home-page-manager/home-page-manager.component';
import { PhotosManagerComponent } from './admin/photos-manager/photos-manager.component';
import { ReportsComponent } from './admin/reports/reports.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}
defineLocale('pl', plLocale);

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    RegisterComponent,
    HomeComponent,
    RoomsViewComponent,
    TableScheduleComponent,
    UserReservationsComponent,
    AdminPanelComponent,
    UserListComponent,
    EditRoleComponent,
    TranslatePipe,
    EnumToArrayPipe,
    RoomsManagerComponent,
    OpeningHoursComponent,
    ReservationsListComponent,
    HasRoleDirective,
    AddReservationModalComponent,
    AddSpecialOpeningHoursModalComponent,
    AddClosingDayModalComponent,
    EditRoomModalComponent,
    AddRoomModalComponent,
    HomePageManagerComponent,
    PhotosManagerComponent,
    ReportsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    UiSwitchModule.forRoot({
      color: 'rgb(102, 153, 255)',
    }),
    FontAwesomeModule,
    FileUploadModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5100'],
        blacklistedRoutes: ['localhost:5100/api/auth'],
      },
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    // ngx-bootstrap
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    TimepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ChartsModule,
  ],
  providers: [ErrorInterceptorProvider, TranslatePipe],
  bootstrap: [AppComponent],
  entryComponents: [
    TableScheduleComponent,
    EditRoleComponent,
    AddReservationModalComponent,
    AddSpecialOpeningHoursModalComponent,
    AddClosingDayModalComponent,
    EditRoomModalComponent,
    AddRoomModalComponent,
  ],
})
export class AppModule {}
