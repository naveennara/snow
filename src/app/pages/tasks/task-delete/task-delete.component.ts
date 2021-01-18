import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { TasksService } from '../tasks.service';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { ToastrService } from 'ngx-toastr';
import * as Globals from '../../../globals';

@Component({
  selector: 'app-task-delete',
  templateUrl: './task-delete.component.html',
  styleUrls: ['./task-delete.component.css']
})
export class TaskDeleteComponent implements OnInit {
  @Output() notifyParentOnUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Input() taskId: string;
  gridView;
  taskKeys = Globals.allConstants.constantKeys;
  constructor(
    private service: TasksService,
    private commonservice: CommonService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.gridView = this.service.gridView;
  }
  confirmDelete(action: string) {
    if (action === 'Yes') {
      const url: string = Globals.urls.deleteTask + '/' +  this.service.taskId;
      this.service.deleteTask(url, this.service.taskId).subscribe(
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
  deleteTask() {
    this.service.taskId = this.taskId;
    this.commonservice.delete.next(true);
  }
}
