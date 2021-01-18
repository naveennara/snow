import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nofdays'
})
export class NofdaysPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(args.includes('Pending')){
      let date = new Date();
      let diffc =  new Date(value).getTime() - date.getTime();
    //getTime() function used to convert a date into milliseconds. This is needed in order to perform calculations.
   
    return Math.round(Math.abs(diffc/(1000*60*60*24)));
    }else{
      return 'N/A';
    }
   
  }

}
