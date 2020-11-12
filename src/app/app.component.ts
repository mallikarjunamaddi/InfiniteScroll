import { Component } from '@angular/core';

import { DataService } from './data.service';
import { ImageString } from './models/ImageString';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  image: string;
  pageSize: number = 6;
  imageList:string[] = [];
  imageStrings: ImageString[] = [];

  constructor(private dataService: DataService) {
    this.getImageStrings(1, this.pageSize);
  }

  getImageStrings(pageIndex: number, pageSize: number) {
    this.dataService.getImageStrings(pageIndex, pageSize).subscribe((data) => {
        try {
          if(data) {
            this.imageStrings = this.imageStrings.concat(data);
            this.imageStrings.forEach(imageString => {
              this.getImage(imageString.strValue)
            });
          } 
        } catch(error) {
            console.error(error);
        }
    });
  }

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
  
}
