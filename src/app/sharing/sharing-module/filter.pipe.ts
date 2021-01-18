import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter',
  pure:false
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string, propName: string): any {
    // parameter-1 : Array of items
    // parameter-2 : typed value
    // parameter-3 : property of array to find
    // if (value.length === 0 || filterString === '' || filterString === undefined) {
    //   return value;
    // }else{
    //   let resultArray = [];
    // for (let item of value) {
    //   if (item[propName] && (item[propName].toLowerCase()).includes(filterString.toLowerCase())) {
    //     resultArray.push(item)
    //   }
    // }
    // return resultArray;
    // }
    if (!value || !filterString || filterString === '') {
      return value;
  }
  // filter items array, items which match and return true will be
  // kept, false will be filtered out
  return value.filter(item => item[propName].toLowerCase().indexOf(filterString.toLowerCase()) !== -1);
  }
}