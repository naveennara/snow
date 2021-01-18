import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common'
@Pipe({
  name: 'typeCheck'
})
export class TypeCheckPipe implements PipeTransform {
  time = ['loggedInTime','lastLoggedInTime'];
  constructor(public datepipe: DatePipe){}
  transform(value: any, args?: any): any {
    if(typeof(value) == 'object' && value!=null){
      let names = value.map(object => object.name)
      return names.toString();
    }
   else if(value!=null && value.includes(':') ){
     return this.datepipe.transform(value, 'dd-MM-yyyy,h:mm:ss a');;
   }
   else{
     return value;
   }
  }

}
