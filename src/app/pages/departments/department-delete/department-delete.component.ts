import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DepartmentsService } from '../departments.service';
import * as Globals from '../../../globals';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../sharing/sharing-module/common.service';


@Component({
  selector: 'app-department-delete',
  templateUrl: './department-delete.component.html',
  styleUrls: ['./department-delete.component.css']
})
export class DepartmentDeleteComponent implements OnInit {
  @Output() notifyParentOnUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Input() deparmentId: string;
  deptKeys = Globals.allConstants.constantKeys;
  constructor(private services: DepartmentsService, private toastr: ToastrService, private commonservice:CommonService) { }
  deleteDepartment(){
    this.services.deparmentId = this.deparmentId;
    this.commonservice.delete.next(true);

  }
  confirmDelete(action:string) {
    if(action == 'Yes'){
      const url: string = Globals.urls.deleteDepartment + '/' + this.services.deparmentId;
      this.services.deleteDepartment(url).subscribe(
      (res: any) => {
        if ( res.status === 200) {
          this.toastr.success(res.message);
          this.notifyParentOnUpdate.emit('1');
        } else {
          this.toastr.error(res.message);
          this.notifyParentOnUpdate.emit('0');
        }
      });
    }  
  }
  ngOnInit() {
    
      
    
  }

}
