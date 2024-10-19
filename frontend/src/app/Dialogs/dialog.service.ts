import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private confirmationSubject = new Subject<boolean>();
  private errorSubject = new Subject<boolean>();
  private successSubject = new Subject<boolean>();

  private confirmationVisible = false;
  private errorVisible = false;
  private successVisible = false;

  confirmationMessage: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor() {}

  // Show Confirmation Dialog
  confirm(message: string): Observable<boolean> {
    this.confirmationMessage = message;
    this.confirmationVisible = true;
    this.confirmationSubject = new Subject<boolean>();
    return this.confirmationSubject.asObservable();
  }

  // Show Error Dialog
  showError(message: string): Observable<boolean> {
    this.errorMessage = message;
    this.errorVisible = true;
    this.errorSubject = new Subject<boolean>();
    return this.errorSubject.asObservable();
  }

  // Show Success Dialog
  showSuccess(message: string): Observable<boolean> {
    this.successMessage = message;
    this.successVisible = true;
    this.successSubject = new Subject<boolean>();
    return this.successSubject.asObservable();
  }

  // Get visibility status
  getDialogVisibility(type: 'confirmation' | 'error' | 'success'): boolean {
    if (type === 'confirmation') return this.confirmationVisible;
    if (type === 'error') return this.errorVisible;
    if (type === 'success') return this.successVisible;
    return false;
  }

  // Confirmation Methods
  confirmAction(): void {
    this.confirmationVisible = false;
    this.confirmationSubject.next(true);
    this.confirmationSubject.complete();
  }

  cancelAction(): void {
    this.confirmationVisible = false;
    this.confirmationSubject.next(false);
    this.confirmationSubject.complete();
  }

  // Close Error Dialog
  closeError(): void {
    this.errorVisible = false;
    this.errorSubject.next(true);
    this.errorSubject.complete();
  }

  // Close Success Dialog
  closeSuccess(): void {
    this.successVisible = false;
    this.successSubject.next(true);
    this.successSubject.complete();
  }
}


