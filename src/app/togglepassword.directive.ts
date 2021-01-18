import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';
@Directive({
  selector: '[appPassword]'
})
export class AppPasswordDirective implements OnInit {
  private _shown = false;
  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.setup();
  }
  ngOnInit() {
    // this.renderer.addClass(this.el.nativeElement, 'form-floating-label');
  }

  toggle(div: HTMLElement) {
    this._shown = !this._shown;
    if (this._shown) {
      // this.el.nativeElement.setAttribute('type', 'text');
      this.renderer.setAttribute(this.el.nativeElement, 'type', 'text');
      div.innerHTML =
      `<div class="show-password">
        <i class="icon-eye"></i>
      </div>`;
    } else {
      // this.el.nativeElement.setAttribute('type', 'password');
      this.renderer.setAttribute(this.el.nativeElement, 'type', 'password');
      div.innerHTML =
      `<div class="show-password">
        <i class="fas fa-eye-slash"></i>
      </div>`;
    }
  }
  setup() {
    const parent = this.el.nativeElement.parentNode;
    const div = document.createElement('div');
    div.innerHTML =
      `<div class="show-password">
        <i class="fas fa-eye-slash"></i>
      </div>`;
    div.addEventListener('click', (event) => {
      this.toggle(div);
    });
    parent.appendChild(div);
  }
}