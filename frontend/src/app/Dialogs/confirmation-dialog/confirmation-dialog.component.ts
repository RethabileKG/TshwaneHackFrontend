import { Component } from '@angular/core';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  constructor(public dialogService: DialogService) {}

  confirm(): void {
    this.dialogService.confirmAction();
  }

  cancel(): void {
    this.dialogService.cancelAction();
  }
}
