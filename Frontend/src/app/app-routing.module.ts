import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { RoomsViewComponent } from './rooms-view/rooms-view.component';
import { UserReservationsComponent } from './user-reservations/user-reservations.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'rooms-view', component: RoomsViewComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-reservations', component: UserReservationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
