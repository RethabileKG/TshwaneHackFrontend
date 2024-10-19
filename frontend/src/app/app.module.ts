import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { FullCalendarModule } from '@fullcalendar/angular'; 

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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FullCalendarModule,
    MatPaginatorModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    DialogService,
    provideAnimationsAsync()  // Add DialogService here
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


