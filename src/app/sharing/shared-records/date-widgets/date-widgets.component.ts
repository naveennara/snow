import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-widgets',
  templateUrl: './date-widgets.component.html',
  styleUrls: ['./date-widgets.component.css']
})
export class DateWidgetsComponent implements OnInit {
  public params: any;

  constructor() { }
  agInit(params: any): void {
    this.params = params;
  }
  ngOnInit() {
  }

}
