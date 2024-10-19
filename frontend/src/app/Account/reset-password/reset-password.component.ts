import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../Dialogs/dialog.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetData: any = {
    token: '',
    email: '',
    newPassword: '',
    confirmPassword: ''
  };
  errorMessage: string = '';

  constructor(
    private authService: AuthenticationService, 
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    // Capture the token from the URL as a raw string
    const rawToken = this.route.snapshot.queryParamMap.get('token') || '';
    
    // Replace any '+' with '%2B' to ensure correct token format
    this.resetData.token = rawToken.replace(/\+/g, '%2B');
    
    // Capture the email from the URL
    this.resetData.email = this.route.snapshot.queryParamMap.get('email') || '';
    
    console.log('Token from URL:', this.resetData.token);
    console.log('Email:', this.resetData.email); 
}

  
  resetPassword() {
    console.log('Reset Data:', this.resetData);

    if (this.resetData.newPassword !== this.resetData.confirmPassword) {
      this.errorMessage = "Passwords do not match.";
      // Show error dialog for password mismatch
      this.dialogService.showError('Passwords do not match.');
      return;
    }

    this.authService.resetPassword(this.resetData).subscribe(
      response => {
        console.log('Password reset successful', response);
        // Show success dialog
        this.dialogService.showSuccess('Password reset successful. You can now log in with your new password.');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Password reset error', error);
        this.errorMessage = "An error occurred while resetting the password.";
        // Show error dialog
        this.dialogService.showError('An error occurred while resetting the password. Please try again.');
      }
    );
  }
}






