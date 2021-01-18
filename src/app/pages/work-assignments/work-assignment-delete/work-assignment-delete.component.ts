import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WorkAssignmentsService } from '../work-assignments.service';
import * as Globals from '../../../globals';

@Component({
  selector: 'app-work-assignment-delete',
  templateUrl: './work-assignment-delete.component.html',
  styleUrls: ['./work-assignment-delete.component.css']
})
export class WorkAssignmentDeleteComponent implements OnInit {

  @Input() assignmentId: string;
  @Output() notifyParentOnUpdate: EventEmitter<any> = new EventEmitter<any>();
  assignKeys = Globals.allConstants.constantKeys;
  constructor(
    private toastr: ToastrService,
    private workAssignmentService: WorkAssignmentsService
  ) { }

  ngOnInit() {
  }
  deleteTaskAssignment() {
    this.workAssignmentService.deleteWorkAssignment(this.assignmentId).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.toastr.success(res.message);
          this.notifyParentOnUpdate.emit('success');
        } else {
          this.toastr.error(res.message);
        }
      }
    );
  }
}
