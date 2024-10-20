import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { FullCalendarModule } from '@fullcalendar/angular'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';
import { ForgotPasswordComponent } from './Account/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Account/reset-password/reset-password.component';
import { JwtInterceptor } from './Auth/jwt.interceptor';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SuccessDialogComponent } from './Dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './Dialogs/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from './Dialogs/confirmation-dialog/confirmation-dialog.component';
import { DialogService } from './Dialogs/dialog.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoadingComponent } from './loading/loading.component';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { PaymentReturnComponent } from './payment-return/payment-return.component';
import { FacilityComponent } from './facility/facility.component';
import { HeaderComponent } from './header/header.component';
import { ServicesComponent } from './services/services.component';
import { RewardsComponent } from './rewards/rewards.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { AddFacilityComponent } from './add-facility/add-facility.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SidebarComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    LoadingComponent,
    HomeComponent,
    BookingComponent,
    PaymentReturnComponent,
    FacilityComponent,
    HeaderComponent,
    ServicesComponent,
    RewardsComponent,
    ContactComponent,
    AboutComponent,
    AddFacilityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FullCalendarModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    DialogService,
    provideAnimationsAsync()  // Add DialogService here
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


