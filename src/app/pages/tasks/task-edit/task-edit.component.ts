import { Component, OnInit, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../tasks.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkflowManagementService } from '../../workflow-management/workflow-management.service';
import * as Globals from '../../../globals';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  editTaskForm: FormGroup;
  dropdownSettings: object;
  private sub: any;
  submitted = false;
  categoryList: any[];
  workflowList: any[];
  usersList: any[];
  startMinDate: Date;
  startMaxDate: Date;
  endMinDate: Date;
  endMaxDate: Date;
  taskId: string;
  workflowLevels = [{id:0,name:'Task Level'},{id:1,name:'Record Level'}];
  formSubmitted = false;
  // loginDetails: any;
  // @Input() taskId;
  taskData: any;
  public enabled = true;
  projectId: string;
  taskType: string;
  projectInfo: string;
  taskTypeTitle: string;
  departmentID: string;
  statusList = Object.assign([],Globals.taskStatus);
  dateFormat  = Globals.dateFormats;
  taskKeys;
  // public buttonName: any = 'Edit';
  globalInfo = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  msgStatus: string;
  layerdropdownSettings: object;
  layersList: any[];
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private services: TasksService,
    private router: Router,
    private workflowService: WorkflowManagementService
  ) {this.taskKeys  = Globals.allConstants.constantKeys;}

  updateTask() {
    this.submitted = true;
    if (this.editTaskForm.invalid) {
      return;
    } else {
      const obj = JSON.parse(JSON.stringify(this.editTaskForm.value));
      const data = Object.assign(this.taskData, obj);
      let arr = [];
      if (this.editTaskForm.value['formzCategory'].length > 0) {
        this.editTaskForm.value['formzCategory'].forEach((cat) => {
          arr.push(cat._id);
        });
      }
      data['formzCategory'] = arr;
      if (this.editTaskForm.value['selectLayer'].length > 0) {
        data['selectLayer'] = this.editTaskForm.value['selectLayer'].map(obj=> obj._id)
      }
      this.services.updateTask(data).subscribe((res: any) => {
        if (res.status === 200) {
          this.formSubmitted = true;
          this.toastr.success(res.message);
          if (this.taskType === 'projectTask') {
            this.router.navigate(['/mainLayout/projectsTab/projectTasks', this.projectId]);
          } else {
            this.router.navigate(['mainLayout/tasks']);
          }
        } else {
          this.toastr.error(res.message);
        }
      });
    }
  }

  getCategoryList() {
    let dept: any;
    dept = this.departmentID;
    const url = Globals.urls.getFormsCategoryForAccount +'/'+  dept;
    this.services.getCategories(url).subscribe((res: any) => {
      if (res) {
        if (res.status === 200) {
          this.categoryList = res.data;
          // this.editTaskForm.
          if (this.taskData.formzCategory.length) {
            let category =[];
            for( let i of this.taskData.formzCategory){
              this.categoryList.filter(cat => {
                if (cat._id === i) {
                  category.push(cat);
                }
              });
            }
            
            this.editTaskForm.patchValue({ formzCategory: category });
          }
        } else {
          this.categoryList = [];
        }
      } else {
        this.categoryList = [];
      }
    });
  }

  getGAsAndMods() {
    let dept: any;
    if (this.globalInfo.type === 0) {
        dept = this.globalInfo.username;
    } else {
        dept = this.departmentID;
    }
    const url: string = Globals.urls.getGroupAdminsByDept + '/' + dept;
    this.services.getGAsAndMods(url, dept).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.usersList = res.data;
        } else {
         this.toastr.info(res.message);
        }
      }
    );
  }

  getWorkflowList() {
    let dept: any;
    dept = this.departmentID;
    this.workflowService.getWorkflowNames(dept).subscribe((res: any) => {
      if (res.status === 200) {
        this.workflowList = res.data;
      } else {
        this.workflowList = [];
      }
    });
  }
  get f() {
    return this.editTaskForm.controls;
  }

  bsValueChange(value) {
    if (value !== null) {
      this.endMinDate.setDate(value.getDate() + 1);
      this.endMinDate.setMonth(value.getMonth());
      this.endMinDate.setFullYear(value.getFullYear());

    }
  }

  ngOnInit() {
    //this.statusList = Globals.taskStatus;
    this.editTaskForm = this.formBuilder.group({
      name: [{ value: '', disabled: true }, Validators.required],
      description: [{ value: '' }],
      startDate: [{ value: '', disabled: true }, Validators.required],
      endDate: ['', Validators.required],
      formzCategory: ['', Validators.required],
      workflowName: [{ value: '', disabled: true }],
      workflowLevel:[{value: '', disabled: true }],
      groupAdminId: [''],
      statusOfTheTask: [{ value: '' }],
      selectLayer : [],
    });
    if(this.globalInfo.type === 1 && this.globalInfo.privilege[Globals.Privileges['tasks']] == 0){
      this.editTaskForm.disable();
    }
    this.layerdropdownSettings = this.services.layerdropdownSettings;
    // this.getLayersList();
    this.sub = this.route.params.subscribe(params => {
      this.taskId = params['taskId'];
      this.services.getTaskInfo(this.taskId).subscribe((res: any) => {
        if (res.status === 200) {
          this.taskData = Object.assign({},res.data);
          this.projectId = res.data.projectID;

          this.dropdownSettings = this.services.dropdownSettings;
          this.endMinDate = new Date();
          
          if (this.projectId != null) {
            this.taskType = 'projectTask';
            this.services.getProjectInfo(this.projectId)
            .subscribe((result: any) => {
              if (result.status === 200) {
                this.projectInfo = result.data;
                this.departmentID = result.data.accountId;
                this.endMaxDate = new Date(res.data.endDate);
                this.categoryList = result.data.category;
                this.getWorkflowList();
                // this.getLayersList();
                if (this.taskData.formzCategory.length) {
                  const category = this.categoryList.filter(cat => {
                    if (cat._id === this.taskData.formzCategory[0]) {
                      return cat;
                    }
                  });
                  this.editTaskForm.patchValue({ formzCategory: category });
                }
                this.editTaskForm.get('groupAdminId').disable();

              } else {
                this.toastr.error(result.message);
              }
            });
          } else {
            this.departmentID = this.globalInfo.accounts[0]._id;
            this.getWorkflowList();
            this.getCategoryList();
            this.getGAsAndMods();
            this.getLayersList();
            this.taskType = 'task';
          }
          if(!res.data.workflowName){
            let index = this.statusList.indexOf(Globals.taskStatusObject.workflowCycleStarted)
            this.statusList.splice(index,1);
          }
          this.editTaskForm.patchValue(res.data);
          if (((this.globalInfo.type === 3) && (this.projectId == null)) || ((this.globalInfo.type === 1) && (this.projectId != null))) {
            this.enabled = false;
            this.editTaskForm.get('description').disable();
            this.editTaskForm.get('endDate').disable();
            this.editTaskForm.get('groupAdminId').disable();
            this.editTaskForm.get('statusOfTheTask').disable();
            this.taskTypeTitle = 'Task Preview';
          } else {
            let today = new Date();
            if(new Date(res.data.startDate) > today ){
              this.editTaskForm.get('statusOfTheTask').disable();
              this.msgStatus = "Task haven't started, cannot change status";
            }
            else if(res.data.workflowLevel == 1){
              //this.statusList.splice(4,1);
              let index = this.statusList.indexOf(Globals.taskStatusObject.workflowCycleStarted)
              this.statusList.splice(index,1);
              // this.editTaskForm.get('statusOfTheTask').disable();
              // this.msgStatus = 'In Record level workflow, cannot change status';
            }
            this.taskTypeTitle = 'Edit Task';
          }
        } else {
          this.toastr.error(res.message);
        }
      });
    });
  }

  goToTaskList() {
    if (this.taskType === 'projectTask') {
      this.router.navigate(['/mainLayout/projectsTab/projectTasks', this.projectId]);
    } else {
      this.router.navigate(['mainLayout/tasks']);
    }
  }
  getLayersList() {
    const url = Globals.urls.getAllLayers;
    this.services.getLayers(url).subscribe((res: any) => {
      if (res) {
        if (res.data.status === 200) {
          this.layersList = res.data.data;
          if (this.taskData.selectLayer.length) {
            let layers =[];
            for( let i of this.taskData.selectLayer){
              this.layersList.filter(select => {
                if (select._id === i) {
                  layers.push(select);
                }
              });
            }
            this.editTaskForm.patchValue({ selectLayer: layers });
          }
        } else {
          this.layersList = [];
        }
      } else {
        this.layersList = [];
      }
    });
  }

  canDeactivate() {
    if (!this.formSubmitted && this.editTaskForm.touched) {
      if (confirm(Globals.formExitMsg)) {
        return true
      } else {
        return false
      }

    } else {
      return true;
    }
  }

}
