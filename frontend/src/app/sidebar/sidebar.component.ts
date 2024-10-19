import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef, Renderer2  } from '@angular/core';
import { AuthenticationService } from '../Account/authentication.service';
import { Router } from '@angular/router';
import { DialogService } from '../Dialogs/dialog.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userName: string | null = null;
  userRole: string | null = null;
  userProfileImage: string | null = null; // Add user profile image
  userStatusEmotion: string | null = null; // Add user status/emotion
  isUserOnline: boolean = false; // Declare the isUserOnline property
  isCollapsed = false;

  @Output() sidebarToggled = new EventEmitter<boolean>();
  @Output() themeChanged = new EventEmitter<string>();
  
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef; // Add this line

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public dialogService: DialogService,
    private renderer: Renderer2
  ) {}

  toggleTheme() {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    this.renderer.removeClass(document.body, `${currentTheme}-theme`);
    this.renderer.addClass(document.body, `${newTheme}-theme`);
    
    localStorage.setItem('theme', newTheme);
    this.themeChanged.emit(newTheme);
  }

  getCurrentTheme(): string {
    return localStorage.getItem('theme') || 'light';
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const firstName = decodedToken['FirstName'];
      const lastName = decodedToken['LastName'];
      this.userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
      this.userName = `${firstName} ${lastName}`;
      this.userProfileImage = decodedToken['ProfileImage'] || null; // Decode profile image
      this.userStatusEmotion = decodedToken['StatusEmotion'] || null; // Decode status emotion

      // Normalize IsOnline to a boolean
      const isOnlineValue = decodedToken['IsOnline'];
      this.isUserOnline = isOnlineValue === true || isOnlineValue === 'True' || isOnlineValue === 'true';

      console.log('IsOnline:', isOnlineValue, 'Evaluated:', this.isUserOnline);
    }
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggled.emit(this.isCollapsed);
  }

  confirmLogout() {
    this.dialogService.confirm('Are you sure you want to log out?').subscribe(
      (result: boolean) => {
        if (result) {
          this.authService.logout().subscribe(
            () => {
              localStorage.clear();
              this.router.navigate(['/login']).then(() => {
                window.location.reload();
              });
            },
            error => {
              console.error('Logout failed', error);
              this.dialogService.showError('Logout failed. Please try again.');
            }
          );
        }
      },
      error => {
        console.error('Dialog error', error);
        this.dialogService.showError('An error occurred. Please try again.');
      }
    );
  }

  // Trigger the file input dialog
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Set the base64 image string for preview
        this.userProfileImage = reader.result as string;
  
        // Extract Base64 string from the result (removing the `data:image/..` part)
        const base64Image = (this.userProfileImage.split(',')[1]);
  
        // Replace with the actual user ID you want to pass
        const userId = this.authService.getUserId(); // Assuming authService has a method to get the current user's ID
        
        if (userId) {
          // Prepare the DTO object
          const profileImageDto = {
            userId: userId,
            profileImageBase64: base64Image
          };
  
          // Call the API to upload the image
          this.authService.uploadProfileImage(profileImageDto).subscribe(
            response => {
              console.log('Profile image updated successfully');
            },
            error => {
              console.error('Error uploading profile image:', error);
            }
          );
        }
      };
  
      // Convert image file to base64 for preview
      reader.readAsDataURL(file);
    }
  }
  

}
