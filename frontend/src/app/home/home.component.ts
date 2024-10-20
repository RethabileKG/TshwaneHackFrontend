import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  previousScrollPosition = 0;
  
  // Define the array of images and their corresponding text
  imageSlides = [
    {
      image: 'assets/Images/union-buildings.png',  // Replace with actual image path
      title: 'Explore the Jacaranda City',
      description: 'Tshwane, or Pretoria, is known for its purple Jacaranda trees.'
    },
    {
      image: 'assets/Images/4741135.jpg',
      title: 'Union Buildings',
      description: 'The Union Buildings are one of the most iconic landmarks in Pretoria.'
    },
    {
      image: 'assets/Images/10527763.jpg',
      title: 'Botanical Gardens',
      description: 'Explore the lush and diverse plants at the National Botanical Gardens.'
    },
    {
      image: 'assets/Images/28495868.jpg',
      title: 'Vibrant Culture',
      description: 'Pretoria is rich with history and vibrant culture, offering many local attractions.'
    },
    {
      image: 'assets/Images/flowe.jpg',  // Add your fifth image path here
      title: 'Historic Landmarks',
      description: 'Pretoria is home to several historic landmarks that tell the story of South Africa.'
    }
  ];

  currentSlideIndex = 0;  // Start with the first slide

  constructor() {}

  ngOnInit(): void {
    this.startSlideShow();  // Start the slideshow when the component initializes
  }

  // Method to start the automatic slideshow
  startSlideShow() {
    setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  // Method to go to the next slide
  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.imageSlides.length;
  }

  // Method to manually change to a specific slide (optional)
  goToSlide(index: number) {
    this.currentSlideIndex = index;
  }
}
