import { Component } from '@angular/core';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent {

  constructor(public dialogService: DialogService) {}

  close(): void {
    this.dialogService.closeSuccess();
  }
}


