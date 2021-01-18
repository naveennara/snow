
import { Directive, HostListener, ElementRef, Input } from '@angular/core';
@Directive({
  selector: '[appSpecialCharacter]'
})
export class SpecialCharacterDirective {

  regexStr = '^[a-zA-Z0-9_.@ -]*$';
 // @Input() isAlphaNumeric: boolean;
  @Input() value: string;

  constructor(private el: ElementRef) { }

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    if ( new RegExp(this.regexStr).test(event.key)) {
      this.validateFields(event);
  }else{
        return new RegExp(this.regexStr).test(event.key);
  }
    }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  validateFields(event) {
    setTimeout(() => {

      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z0-9_.@-]/g, ' ').replace(/\s\s+/g, ' ');
      event.preventDefault();

    }, 100)
  }

}