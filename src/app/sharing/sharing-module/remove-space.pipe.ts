import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpace'
})
export class RemoveSpacePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(typeof(value) == 'string'){
      return value.replace(/\s/g, '');;

    }else{
      return value;
    }
  }

}
