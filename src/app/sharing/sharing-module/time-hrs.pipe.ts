import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeHrs'
})
export class TimeHrsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value){
      let val = value.split(':');
     return val[0];
    }else{
      return value;
    }
    
  }

}
