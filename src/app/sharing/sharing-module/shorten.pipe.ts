import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText'
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, limit: number) {
    // NOTE: here limit is a parameter coming from HTML
    if (value.length > limit) {
      return value.substr(0, limit) + '...';
    }else if( value.toString().length > limit){
      return value.toString().substr(0, limit) + '...';
    }
    return value;
  }
}
