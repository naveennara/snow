import { Directive,ElementRef, HostListener  } from '@angular/core';
import { NgControl } from "@angular/forms";
@Directive({
  selector: '[appCalendar]'
})
export class CalendarDirective {

  upper;
  constructor(private el: ElementRef, private control : NgControl) {

  }

  @HostListener('ngModelChange',['$event']) onNgModelChange($event){
    if(this.el.nativeElement.value != ''){
     if(new Date($event).getHours() != 0){
      this.upper = this.el.nativeElement.value;
      const finalDate = new Date($event.setHours(0, 0, 0, 0));
      this.control.control.setValue(finalDate)

     }else if(new Date($event).getHours() == 0 && this.upper != this.el.nativeElement.value){
      this.upper = this.el.nativeElement.value;
      const finalDate = new Date($event);
      this.control.control.setValue(finalDate);

     }
    //console.log(new Date($event.setHours(0, 0, 0, 0)).toUTCString())
    //this.control.control.setValue(upper);
  }
}
}
