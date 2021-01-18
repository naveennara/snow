import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-breadcumb-layout',
  templateUrl: './breadcumb-layout.component.html',
  styleUrls: ['./breadcumb-layout.component.css']
})
export class BreadcumbLayoutComponent implements OnInit {
  @Input() isBreadCumItemsShow = false;
  @Input() breadCumpList: any[] = [];
    @Output() searchEvent: EventEmitter<any> = new EventEmitter<any>()

  constructor( public router: Router) {}
  ngOnInit() {
   }
   search(searchInput) {
    this.searchEvent.emit(searchInput);
  }
  goOnClick(index) {
    if (index === 0) {
      this.router.navigate([this.breadCumpList[0].state]);
    }
  }

}
