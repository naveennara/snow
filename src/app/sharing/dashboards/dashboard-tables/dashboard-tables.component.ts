import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import * as Globals from '../../../globals';
import { DashboardsService } from '../dashboards.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-tables',
  templateUrl: './dashboard-tables.component.html',
  styleUrls: ['./dashboard-tables.component.css']
})
export class DashboardTablesComponent implements OnInit {
  @Input() selected;
  @Input() data;
  @Output() closeTable :  EventEmitter<any> = new EventEmitter<any>(); 
  noDataImg = Globals.noDataFound;
  constants = Globals.dashboardConstansts.dashboardkeys;
  tableData;
  limit =  10;
  keys: string[];
  constructor(private service:DashboardsService,private toastr: ToastrService) { }
 
  ngOnInit() {
    this.tableData = this.data[this.selected];
    if(this.tableData.length){
      this.keys = Object.keys(this.tableData[0]);
      this.keys = this.keys.filter(key => key != '_id' && key != '__v' && key != 'assignedTo'); 
    } 

  }
  
  releaseLicense(info) {
 
    let reqData = {};
    reqData['userId'] = info.assignedTo;
    reqData['deviceDetails'] = info.deviceDetails;
    reqData['time'] = info.loggedInTime;
    let url = Globals.urls.releaseUserLicense;
    this.service.releaseLicense(url,JSON.stringify(reqData)).subscribe(
      (res:any) => {
          if(res.status == 200){
            this.tableData = this.tableData.filter(data => data.assignedTo !== info.assignedTo &&  data.loggedInTime != info.loggedInTime);
            this.toastr.success(res.message);
         //  let index = this.tableData.find()
          }
          else{
              //swal(res.data.message);
          }
      }
    );
   
  }
  close(selected){
    this.closeTable.emit(selected);
  }
}
