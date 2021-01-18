import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as Globals from '../../../globals';
import {WorkflowManagementService} from '../workflow-management.service';
import { CommonService } from '../../../sharing/sharing-module/common.service';

@Component({
  selector: 'app-workflow-delete',
  templateUrl: './workflow-delete.component.html',
  styleUrls: ['./workflow-delete.component.css']
})
export class WorkflowDeleteComponent implements OnInit {
  @Output() notifyParentOnUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Input() workflowId: string;
  openModal = false;
  workflowKeys = Globals.allConstants.constantKeys;
  constructor(private services: WorkflowManagementService, private toastr: ToastrService,private commonservice:CommonService) { }
  
  confirmDelete(action:string) {
    if(action == 'Yes'){
      this.services.deleteWorkflow(this.services.workflowId).subscribe(
      (res: any) => {
        if ( res.status === 200) {
          this.openModal = false;
          this.toastr.success(res.message);
          this.notifyParentOnUpdate.emit('success');
        } else {
          this.toastr.error(res.message);
          this.notifyParentOnUpdate.emit('Failed');
        }
      });
    } else {
      //this.openModal = false;
    }
  }
  deleteWorkflow() {
    this.services.workflowId = this.workflowId;
    this.commonservice.delete.next(true);
    this.openModal = true;
  }
  ngOnInit() {
  }

}

