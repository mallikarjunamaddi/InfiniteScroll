import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { DataService } from './data.service';
import { ImageString } from './models/ImageString';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  image: string;
  pageSize: number = 9;
  imageList:string[] = [];
  imageStrings: ImageString[] = [];
  isDataAvailable: boolean = true;

  constructor(private dataService: DataService, private spinner: NgxSpinnerService) {
    this.getImageStrings(1, this.pageSize);
  }

  // To Fetch image's names
  getImageStrings(pageIndex: number, pageSize: number) {
    this.dataService.getImageStrings(pageIndex, pageSize).subscribe((data) => {
        try {
          if(data.length > 0) {
            this.imageStrings = this.imageStrings.concat(data);
            this.imageStrings.forEach(imageString => {
              this.getImage(imageString.strValue)
            });
            this.spinner.hide();
          } else {
            this.isDataAvailable = false;
          }
        } catch(error) {
            console.error(error);
        }
    });
  }

  // To fetch image string (in base64 format)
  getImage(imageName: string) {
    this.dataService.getImage(imageName).subscribe((image) => {
      try {
        if(image) {
          this.imageList.push(image);
        }
      } catch(error) {
        console.error(error);
      }
    });
  }

  onScroll() {
    // if data is avialable in last iteration
    // then check for further data.
    if(this.isDataAvailable) {
      this.spinner.show();
      let index = this.imageStrings.length / this.pageSize + 1;
      console.log("Page Index:", index, "list Length", this.imageStrings.length)
      this.getImageStrings(index, this.pageSize);
    }
  }
}
