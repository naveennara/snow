import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimming'
})
export class TrimmingPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let val = value.trim();
    return val;
  }

}
