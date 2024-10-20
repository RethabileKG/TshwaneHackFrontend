import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { DialogService } from '../../Dialogs/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;
  showPassword: boolean = false;  // Property to control password visibility

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    // Clear the token when the component is initialized (e.g., after logout)
    localStorage.removeItem('token');

    // Initialize the form with validation rules
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Method to toggle password visibility
  togglePasswordVisibility(event: any): void {
    this.showPassword = event.target.checked;
  }

  // Method to handle login
  login() {
    // Prevent duplicate login attempts while loading
    if (this.isLoading) return;

    // If the form is invalid, show an error message
    if (this.loginForm.invalid) {
      this.dialogService.showError('Please fill in the form correctly.');
      return;
    }

    // Show the spinner and start the login process
    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe(
      response => {
        // On success, hide the spinner and save the token
        this.isLoading = false;
        localStorage.setItem('token', response.token);
        console.log('Login successful');
        this.dialogService.showSuccess('Login successful.');

        // Determine the user's role and navigate to the appropriate page
        const userRole = this.authService.getUserRole();
        if (userRole === 'Admin') {
          this.router.navigate(['/booking']);
        } else {
          this.router.navigate(['/booking']);
        }
      },
      error => {
        // On error, hide the spinner and show an error message
        this.isLoading = false;
        console.error('Login error', error);
        this.dialogService.showError('Login failed. Please check your credentials and try again.');
      }
    );
  }
}
