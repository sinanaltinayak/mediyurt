import { Component, OnInit } from '@angular/core';
import { AppModule } from 'src/app/app.module';

// Typescript file of the home component, this component is for displaying the home page
// and it has all the necessary operations for the page

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  gridColumns = 3;

  // image urls
  imageObject: Array<object> = [{
    image: '../../../assets/photos/home/6.jpg',
    thumbImage: '../../../assets/photos/home/6.jpg',
    alt: 'alt of image',
    title: 'Female Dorm - South Campus'
  }, {
    image: '../../../assets/photos/home/7.jpg',
    thumbImage: '../../../assets/photos/home/7.jpg',
    title: 'Female Dorm - South Campus',
    alt: 'Image alt',
  }, {
    image: '../../../assets/photos/home/1.jpg',
    thumbImage: '../../../assets/photos/home/1.jpg',
    title: 'Male Dorm - North Campus',
    alt: 'Image alt',
  }];

  
}
