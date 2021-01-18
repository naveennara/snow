import { Directive,HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTrimValues]'
})
export class TrimValuesDirective {

  constructor( private control : NgControl) { }
  @HostListener('blur', ['$event.target.value'])
  applyTrim(val: string) {
  this.writeValue(val.trim());
  }
 writeValue(value: any): void {
  if (typeof value === 'string') {
  value = value.trim();
  }
  this.control.control.setValue(value);
  }
  // @HostListener('ngModelChange',['$event']) onNgModelChange($event){
  //   this.control.control.setValue($event.trim());
  // }

}
