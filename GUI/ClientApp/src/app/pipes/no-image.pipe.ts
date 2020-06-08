import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform( image: string): string {
    console.log(image);
    if ( image ) {
      return image;
    } else {
      return 'assets/img/noimage.png';
    }
  }

}
