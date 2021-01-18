import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import * as Globals from '../../../globals';
import { DashboardsService } from '../dashboards.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard-feed',
  templateUrl: './dashboard-feed.component.html',
  styleUrls: ['./dashboard-feed.component.css']
})
export class DashboardFeedComponent implements OnInit {
  @Input() selected;
  @Input() data;
  @Output() closeShowFeed :  EventEmitter<any> = new EventEmitter<any>(); 
  constants = Globals.dashboardConstansts.dashboardkeys;
  feedData;
  noDataImg = Globals.noDataFound;
  constructor() { }

  ngOnInit() {
    this.feedData = this.data[this.selected] ;
  }
  close(selected){
    this.closeShowFeed.emit(selected);
  }
}
