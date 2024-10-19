import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from './Dialogs/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  isSidebarCollapsed = false;
  
  constructor(public router: Router, public dialogService: DialogService) {}

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}