import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { RoomsViewComponent } from './rooms-view/rooms-view.component';
import { UserReservationsComponent } from './user-reservations/user-reservations.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AuthGuard } from './_guards/auth.guard';
import { ReportsComponent } from './admin/reports/reports.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'rooms-view', component: RoomsViewComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-reservations', component: UserReservationsComponent, canActivate: [AuthGuard] },
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard], data: { role: 'Employee' } },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard], data: { role: 'Administrator' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
