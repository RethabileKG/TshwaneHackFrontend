import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { DialogService } from '../../Dialogs/dialog.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendResetLink() {
    if (this.forgotPasswordForm.invalid) {
      this.dialogService.showError('Please enter a valid email address.');
      return;
    }

    const email = this.forgotPasswordForm.value.email;
    this.authService.forgotPassword({ email }).subscribe(
      response => {
        console.log('Password reset link sent', response);
        this.dialogService.showSuccess('Password reset link has been sent to your email.');
      },
      error => {
        console.error('Error sending password reset link', error);
        this.dialogService.showError('Failed to send password reset link. Please try again.');
      }
    );
  }
}


