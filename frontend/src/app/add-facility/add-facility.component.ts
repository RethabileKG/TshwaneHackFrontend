import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacilityService } from '../services/facility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-facility',
  templateUrl: './add-facility.component.html',
  styleUrls: ['./add-facility.component.scss']
})
export class AddFacilityComponent {
  facilityForm: FormGroup;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private facilityService: FacilityService,
    private router: Router
  ) {
    this.facilityForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      pricePerHour: [null, [Validators.required, Validators.min(0)]],
      capacity: [null, [Validators.required, Validators.min(1)]],
      address: ['', Validators.required],
      imageURL: ['']
    });
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;

      // Preview the image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.facilityForm.valid) {
        const formData = new FormData();
        formData.append('name', this.facilityForm.get('name')?.value);
        formData.append('description', this.facilityForm.get('description')?.value);
        formData.append('type', this.facilityForm.get('type')?.value);
        formData.append('pricePerHour', this.facilityForm.get('pricePerHour')?.value);
        formData.append('capacity', this.facilityForm.get('capacity')?.value);
        formData.append('address', this.facilityForm.get('address')?.value);

        // Append the image file to FormData
        if (this.selectedImage) {
            formData.append('image', this.selectedImage, this.selectedImage.name);
        }

        // Send the FormData to the backend
        this.facilityService.createFacility(formData).subscribe(
            (response) => {
                console.log('Facility created successfully', response);
                this.router.navigate(['/facilities']);
            },
            (error) => {
                console.error('Error creating facility', error);
            }
        );
    }
}
}
