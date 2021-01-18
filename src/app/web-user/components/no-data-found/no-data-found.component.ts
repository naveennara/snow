import { Component, OnInit } from '@angular/core';
import { webUserConstants } from './../../webuser-constant';

@Component({
  selector: 'app-no-data-found',
  templateUrl: './no-data-found.component.html',
  styleUrls: ['./no-data-found.component.css']
})
export class NoDataFoundComponent implements OnInit {
  constructor() { }
  noDataFoundUrl = webUserConstants.noDataFound;
  ngOnInit() {
  }

}
