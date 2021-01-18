import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../tasks.service';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../categories/categories.service';
import { WorkflowManagementService } from '../../workflow-management/workflow-management.service';
import * as CryptoJS from 'crypto-js';
import * as Globals from '../../../globals';
import { CommonService } from '../../../sharing/sharing-module/common.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  createTaskForm: FormGroup;
  dropdownSettings: object;
  layerdropdownSettings: object; // added by narsi
  submitted = false;
  categoryList: any[];
  layerList: any[]; // added by narsi 
  workflowList: any[];
  usersList: any[];
  startMinDate: Date;
  startMaxDate: Date;
  endMinDate: Date;
  endMaxDate: Date;
  loginDetails: any;
  projectId: string;
  taskType: string;
  projectInfo: string;
  departmentID: string;
  workflowLevels = [{id:0,name:'Task Level'},{id:1,name:'Record Level'}];
  private sub: any;
  globalInfo = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  formSubmitted  = false;
  autoCompleteField = Globals.autoCompleteField;
  autoCompleteForm = Globals.autoCompleteForm;
  dateFormat  = Globals.dateFormats;
  taskKeys;
  getLayerDataa: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private services: TasksService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private categoryService: CategoriesService,
    private workflowService: WorkflowManagementService,
  ) { this.taskKeys  = Globals.allConstants.constantKeys; }
  createTask() {
    this.submitted = true;
    if (this.createTaskForm.invalid) {
      return;
    } else {
      const data = JSON.parse(JSON.stringify(this.createTaskForm.value));
      data['accountId'] = this.departmentID;
      data['userGroup'] = this.globalInfo.accounts;
      data['createdBy'] = this.globalInfo.username;
      data['statusOfTheTask'] = 'New';
      data['projectID'] = this.projectId;
      let arr = [];
      if (this.createTaskForm.value['formzCategory'].length > 0) {
        this.createTaskForm.value['formzCategory'].forEach((cat) => {
          arr.push(cat._id);
        });
      }
      data['formzCategory'] = arr;
      this.services.createTask(data).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.formSubmitted  = true;
            this.toastr.success(res.message);
            if (this.taskType === 'projectTask') {
              this.router.navigate(['/mainLayout/projectsTab/projectTasks', this.projectId]);
            } else {
              this.router.navigate(['mainLayout/tasks']);
            }
          } else {
            this.toastr.error(res.message);
          }
        }
      );
    }
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

  getListOfCategory() {
    this.loginDetails = this.globalInfo;
    const url = Globals.urls.getFormsCategoryForAccount + '/'+ this.departmentID;
    this.services.getCategories(url).subscribe(
      (res: any) => {
        if (res) {
          if (res.status === 200) {
            this.categoryList = res.data;
          } else {
            this.categoryList = [];
          }
        } else {
          this.categoryList = [];
        }
      }
    );
  }

  // getLayerData() {
  //   let url: string;
  //   url = Globals.urls.getAllLayers;
  //   this.services.getLayers(url).subscribe(
  //     (res: any) => {
  //       switch (res.status) {
  //         case 200:
  //           this.layerList = res.data;
  //           break;
  //         case 204:
  //           this.layerList = [];
  //           this.toastr.info(res.message);
  //           break;
  //         default:
  //           this.layerList = [];
  //           this.toastr.error(this.taskKeys['errorMsg']);
  //       }
  //     }
  //   )
  // }

  getWorkflowList() {
    let dept: any;
    dept = this.departmentID;
    this.workflowService.getWorkflowNames(dept).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.workflowList = res.data;
        } else {
          this.workflowList = [];
        }
      }
    );
  }
  get f() { return this.createTaskForm.controls; }

  bsValueChange(value) {
    if ( value !== null ) {
      this.endMinDate.setDate(value.getDate() + 1);
      this.endMinDate.setMonth(value.getMonth());
      this.endMinDate.setFullYear(value.getFullYear());
    }
  }
  endValueChange(value) {
    if ( value !== null ) {
      this.startMaxDate = new Date();
      this.startMaxDate.setDate(value.getDate());
      this.startMaxDate.setMonth(value.getMonth());
      this.startMaxDate.setFullYear(value.getFullYear());
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
  ngOnInit() {
    // narsi added start 
    
    this.getLayerData();
    this.layerdropdownSettings = this.services.layerdropdownSettings; // added by narsi
    this.dropdownSettings = this.services.dropdownSettings;
    this.endMinDate = new Date();
    this.getLayerData();
    this.layerdropdownSettings = this.services.layerdropdownSettings;
    this.createTaskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      formzCategory : [[], Validators.required],
      workflowName : [''],
      workflowLevel:[''],
      groupAdminId : [''],
      selectLayer : [[]]
    });
    this.sub = this.route.params.subscribe(params => {
      if (params['projectId']) {
        this.taskType = 'projectTask';
        this.projectId = params['projectId'];
        this.createTaskForm.get('groupAdminId').disable();
        this.services.getProjectInfo(this.projectId)
        .subscribe((res: any) => {
          if (res.status === 200) {
            this.projectInfo = res.data;
            this.departmentID = res.data.accountId;
            this.startMinDate = new Date(res.data.startDate);
            this.startMaxDate = new Date(res.data.endDate);
            this.endMaxDate = new Date(res.data.endDate);
            this.categoryList = res.data.category;
            this.getWorkflowList();
          } else {
            this.toastr.error(res.message);
          }
        });
      } else {
        this.taskType = 'task';
        this.projectId = null;
        this.departmentID = this.globalInfo.accounts[0]._id;
        this.startMinDate = new Date();
        this.getListOfCategory();
        this.getGAsAndMods();
        this.getWorkflowList();
        this.getLayerData();
      }
    });
  }

  goToTaskList() {
    if (this.taskType === 'projectTask') {
      this.router.navigate(['/mainLayout/projectsTab/projectTasks', this.projectId]);
    } else {
      this.router.navigate(['mainLayout/tasks']);
    }
  }
  workflowSelected(){
    this.createTaskForm.get('workflowLevel').setValidators([Validators.required]);
    this.createTaskForm.get('workflowLevel').updateValueAndValidity();
  }
  getLayerData() {
    let url: string;
    url = Globals.urls.getAllLayers;
    this.services.getLayers(url).subscribe(
      (res: any) => {
        switch (res.data.status) {
          case 200:
            this.layerList = res.data.data;
            break;
          case 204:
            this.layerList = [];
            this.toastr.info(res.data.message);
            break;
          default:
            this.layerList = [];
            this.toastr.error(this.taskKeys['errorMsg']);
        }
      }
    )
  }
  canDeactivate() {
    if (!this.formSubmitted && this.createTaskForm.dirty) {
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
