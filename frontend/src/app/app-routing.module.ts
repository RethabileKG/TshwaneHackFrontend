import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Account/register/register.component';
import { LoginComponent } from './Account/login/login.component';
import { ForgotPasswordComponent } from './Account/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Account/reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
 import { AboutComponent } from './about/about.component';
import { RewardsComponent } from './rewards/rewards.component';
import { ContactComponent } from './contact/contact.component';
import { FacilityComponent } from './facility/facility.component';




const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'reward', component: RewardsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'facility', component: FacilityComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
