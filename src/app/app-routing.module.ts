import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './Components/events/events.component';
import { LoginComponent } from './Components/login/login.component';
import { SpecialEventsComponent } from './Components/special-events/special-events.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '**', redirectTo: '/' },
  { path: '', pathMatch: 'full', component: EventsComponent },
  {
    path: 'special-events',
    component: SpecialEventsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
