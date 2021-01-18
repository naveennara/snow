import { Component, OnInit, Input, Output, EventEmitter,  OnChanges, SimpleChanges, SimpleChange} from '@angular/core';
import { TasksService } from '../../tasks/tasks.service';
import { WorkAssignmentsService } from '../work-assignments.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import * as Globals from '../../../globals';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-work-assignment-edit',
  templateUrl: './work-assignment-edit.component.html',
  styleUrls: ['./work-assignment-edit.component.css']
})
export class WorkAssignmentEditComponent implements OnChanges, OnInit {

  @Input() taskId;
  @Input() assignmentId;
  @Output() closeSideBar: EventEmitter<number> = new EventEmitter();
  taskBasicInfo: any;
  editWAData: any;
  usersList: any[];
  formsList: any[];
  assignKeys;
  constructor(
    private fb: FormBuilder,
    private taskService: TasksService,
    private workAssignmentService: WorkAssignmentsService,
    private toastr: ToastrService,
    private commonService: CommonService
  ) {this.assignKeys = Globals.allConstants.constantKeys; }
  editWorkAssignmentForm: FormGroup;
  frequencies: any[];
  userdropdownSettings: object;
  startMinDate: Date;
  startMaxDate: Date;
  endMinDate: Date;
  endMaxDate: Date;
  submitted = false;
  enableUsers = false;
  fileUploadEnable: boolean;
  recordsCount: number;
  formSubmitted = false;
  dateFormat  = Globals.dateFormats;
  disableUsers = true;
  globalInfo = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  get f() { return this.editWorkAssignmentForm.controls; }


  bsValueChange(value) {
    if ( value !== null ) {
      this.endMinDate.setDate(value.getDate() + 1);
      this.endMinDate.setMonth(value.getMonth());
      this.endMinDate.setFullYear(value.getFullYear());

    }
  }
  onItemSelect(item: any) {
    // console.log(item);
  }
  onSelectAll(items: any) {
    // console.log(items);
  }

  onItemDeSelect(item: any) {
    // console.log(item);
  }

  updateWorkAssignment() {
    this.submitted = true;
    if (this.editWorkAssignmentForm.invalid) {
      return;
    } else {
      type Data = {
        taskBasicInfo?: any;
        tasskAssignMents?: any;
      };
      const data = {} as Data;
      data['taskBasicInfo'] = JSON.parse(JSON.stringify(this.taskBasicInfo));
      data.taskBasicInfo['taskId'] = data.taskBasicInfo._id;
      delete data.taskBasicInfo._id;
      const workAssignment = Object.assign(this.editWAData, this.editWorkAssignmentForm.value);
      data['taskAssignment'] = workAssignment;
      this.workAssignmentService.updateWorkAssignments(data).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.formSubmitted = true;
            this.toastr.success(res.message);
            this.closeSideBarfn();
            this.commonService.refresh.next(this.taskBasicInfo._id);
          } else {
            this.toastr.error(res.message);
          }
        }
      );
    }
  }

  resetSideBar() {
    this.ngOnInit( );
  }

  ngOnChanges(changes: SimpleChanges) {
    const taskIdKey: SimpleChange = changes.taskId;
    this.taskId = taskIdKey.currentValue;
    this.loadTaskInfo(this.taskId); 
  }

  loadTaskInfo(taskId) {
    this.taskService.getTaskBasicInfo(taskId).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.taskBasicInfo = res.data;
          this.endMaxDate = new Date(this.taskBasicInfo.endDate);
          this.getUsersList();
          if (this.taskBasicInfo.isPrepopAttached === false) {
            this.enableUsers = true;
            this.fileUploadEnable = false;
            this.editWorkAssignmentForm.addControl('users', new FormControl({value: [],  disabled: true}, Validators.required));
          } else {
            this.enableUsers = false;
            this.fileUploadEnable = true;
            this.editWorkAssignmentForm.addControl('records', new FormControl({value: '',  disabled: true}, Validators.required));
          }
          this.workAssignmentService.previewWorkAssignments(this.assignmentId).subscribe(
            (result: any) => {
              if (result.status === 200) {
                this.editWAData = result.data;
                let userObj = [];
                for(let i of result.data.users){
                  let Obj =this.usersList.filter(obj=> obj._id == i );
                  userObj.push(Obj[0]);
                }
                result.data.users =  userObj;
                this.editWorkAssignmentForm.patchValue(result.data);
                const custObj = {_id: result.data.formId, name: result.data.formName};
                if(result.data.records){
                  this.recordsCount = result.data.records.length;

                }
                this.editWorkAssignmentForm.patchValue({
                  form: custObj,
                  records: this.recordsCount
                });
              }
            }
          );
          this.getCategoryForms();
        } else {
          this.toastr.error(res.message);
        }
      }
    );
  }

  ngOnInit() {
    this.editWorkAssignmentForm = this.fb.group({
      name: [{value: '',  disabled: true}, Validators.required],
      form:  [{value: '',  disabled: true}, Validators.required],
      formFrequency: [{value: '',  disabled: true}, Validators.required],
      startDate: [{value: '',  disabled: true}, Validators.required],
      endDate: [{value: ''}, Validators.required],
    });
    this.userdropdownSettings = this.taskService.userdropdownSettings;
    this.endMinDate = new Date();
    this.frequencies = ['Once', 'Daily', 'Weekly', 'Monthly', 'Yearly', 'All weather'];
    this.loadTaskInfo(this.taskId);
  }

  getUsersList() {
    const url: string = Globals.urls.getUser + '/' + this.taskBasicInfo.accountId;
    this.workAssignmentService.getUsersByDept(url).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.usersList = res.data;
        } else {
          this.toastr.error(res.message);
        }
      }
    );
  }

  getCategoryForms() {
    const data: any = {formsCategories: this.taskBasicInfo.formzCategory, accountId : this.taskBasicInfo.accountId};
    const url: string = Globals.urls.getFormszByCategory;
    this.workAssignmentService.getFormsByCat(url, data).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.formsList = res.data;
        } else {
          this.toastr.error(res.message);
        }
      }
    );
  }

  compare(val1, val2) {
    if (val1 !== undefined && val2 !== undefined) {
      return val1._id === val2._id;
    }
  }

  closeSideBarfn() {
    this.closeSideBar.emit();
    // have to close side bar here
   // this.canDeactivate();
  }
  canDeactivate() {
    if (!this.formSubmitted && this.editWorkAssignmentForm.dirty) {
      if (confirm(Globals.formExitMsg)) {
        this.closeSideBar.emit();
      } else {
        return false
      }

    } else {
      this.closeSideBar.emit();
    }
  }

}


