import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { webUserConstants } from './../../webuser-constant';

@Component({
  selector: 'app-api-call-res',
  templateUrl: './api-call-res.component.html',
  styleUrls: ['./api-call-res.component.css']
})
export class ApiCallResComponent implements OnInit {

  constructor() { }
  @Input() errorType: number ;
  @Output() tryAgin = new EventEmitter();
  noDataFoundUrl = webUserConstants.serverNotReachable;
  ngOnInit() {
  }

  tryAginCall() {
    this.tryAgin.next();
  }
}
