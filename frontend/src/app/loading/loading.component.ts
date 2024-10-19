import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']  // Corrected to styleUrls (plural)
})
export class LoadingComponent {
  @Input() isLoading: boolean = false;  // Accepts isLoading from the parent component
}
