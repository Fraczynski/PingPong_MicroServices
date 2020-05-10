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
// toastr
import { ToastrModule } from 'ngx-toastr';
// switch
import { UiSwitchModule } from 'ngx-ui-switch';
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
    RoomsManagerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    UiSwitchModule,
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
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
  ],
  providers: [ErrorInterceptorProvider],
  bootstrap: [AppComponent],
  entryComponents: [TableScheduleComponent, EditRoleComponent],
})
export class AppModule {}
