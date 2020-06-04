import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform( image: string): string {
    if ( image ) {
      return image;
    } else {
      return 'assets/img/noimage.png';
    }
  }

}
