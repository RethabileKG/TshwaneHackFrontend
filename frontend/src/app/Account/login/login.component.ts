import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { DialogService } from '../../Dialogs/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          console.log('Login successful', response);
          this.dialogService.showSuccess('Login successful!');
          this.router.navigate(['/dashboard']); // Navigate to dashboard on success
        },
        error => {
          console.error('Login error', error);
          this.dialogService.showError('Login failed. Please try again.');
          this.isLoading = false;
        }
      );
    } else {
      this.dialogService.showError('Please fill out all required fields correctly.');
    }
  }

  togglePasswordVisibility(event: Event) {
    this.showPassword = !this.showPassword;
  }

  navigateToRegister() {
    this.router.navigate(['/register']); // Navigate to RegisterComponent
  }
}
