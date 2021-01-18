import { Component, OnInit, ViewChildren, QueryList, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { WorkflowManagementService } from '../workflow-management.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { WorkFlowLevelComponent } from '../work-flow-level/work-flow-level.component';
import { Router, ActivatedRoute } from '@angular/router';
import * as Globals from '../../../globals';
import * as CryptoJS from 'crypto-js';
import { CommonService } from '../../../sharing/sharing-module/common.service';

@Component({
  selector: 'app-work-flow-edit',
  templateUrl: './work-flow-edit.component.html',
  styleUrls: ['./work-flow-edit.component.css']
})
export class WorkFlowEditComponent implements OnInit, OnDestroy {
  @ViewChild(WorkFlowLevelComponent) child: WorkFlowLevelComponent;
  @ViewChildren(WorkFlowLevelComponent) children: QueryList<WorkFlowLevelComponent>;
  workflowForm: FormGroup;
  workflowFormSub: Subscription;
  editWorkflowData: Subscription;
  formInvalid: boolean = false;
  workflowList: FormArray;
  usersList: any[];
  editServiceData: any;
  viewType: string;
  workflowKeys: any;
  formSubmitted = false; 
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  showAlert = false;
  isDeleted: boolean;
  isWorkflowEditAllowed: any;
  deleteIndex: number;
  workflowId;
  constructor(
    private workflowService: WorkflowManagementService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private commonservice: CommonService,

  ) {
    this.workflowKeys = Globals.allConstants.constantKeys;
  }

  getGAsAndMods() {
    let dept: any;
    if (this.loginDetails.type === 0) {
        dept = this.loginDetails.username;
    } else {
        dept = this.loginDetails.accounts[0]._id;
    }
    const url: string = Globals.urls.getGroupAdminsnMods + '/' + dept;
    this.workflowService.getGAsAndMods(url, dept).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.usersList = res.data;
          this.viewType = 'edit';
        } else {
          this.toastr.error(res.message);
        }
      }
    );
  }
  

  previewWorkflow() {
    this.editWorkflowData = this.route.params.subscribe(params => {
      const id = params['workFlowId'];
      this.workflowService.editWorkflow(id).subscribe(
        (res: any) => {
          if (res.status === 200) {
            if (res.data.length > 0) {
              this.editServiceData = res.data;
              this.patchEditData(this.editServiceData);
              this.workflowList.disable();
            }
          } else {
            this.toastr.error(res.message);
          }
        }
      );
    });
  }

  ngOnInit() {
    this.revert();
    this.getGAsAndMods();
    this.route.params.subscribe(params => {
      this.workflowId = params['workFlowId'];
      });
      this.checkWFActive();

    this.workflowFormSub = this.workflowService.workflowForm$
    .subscribe(workflow => {
      this.workflowForm = workflow;
      this.workflowList = this.workflowForm.get('workflowList') as FormArray;
    });
    this.previewWorkflow();
    

  }
  checkWFActive(){
    const url: string = Globals.urls.checkForWorflowUpdate + '/' + this.workflowId;
    this.workflowService.checkWorkflow(url).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.isWorkflowEditAllowed = true;
        } else {
          this.isWorkflowEditAllowed = false;
          this.toastr.info(res.message);
        }
      }
    );
  }
  patchEditData(resData) {
    // Deep copy of Objects to avoid unexpected errors.
    const data = JSON.parse(JSON.stringify(resData));
    const workflowLevels = data[0].workflowList;
    const workflowName = data[0].workFlowInfo[0].workflowname;
    const control = this.workflowForm.controls['workflowList'] as FormArray;
    for (let i = control.length - 1; i >= 0; i--) {
      control.removeAt(i);
    }
    if (workflowLevels.length > 0) {
      workflowLevels.pop();
      workflowLevels.shift();
      workflowLevels.forEach(x => {
        this.workflowService.prepopEditData(x);
      });
      this.workflowForm.patchValue({ workflowname: workflowName });
    }
  }

  ngOnDestroy() {
    this.workflowFormSub.unsubscribe();
  }

  addWorkflowLevel() {
    this.workflowService.addWorkflowLevel();
  }
  saveWorkflowLevel(index: number) {
    const workflowlevels: WorkFlowLevelComponent[] = this.children.toArray();
    //workflowlevels[index + 1].edit();
    if(this.workflowForm.controls['workflowList']['controls'][index + 1].controls['from'].value ==  this.workflowForm.controls['workflowList']['controls'][index + 1].controls['to'].value){
      workflowlevels[index + 1].edit();

    }
    this.workflowForm.controls['workflowList']['controls'][index + 1].patchValue({from :this.workflowForm.controls['workflowList']['controls'][index].value['to']});
    
    this.showAlert = true;
  }
 
  confirmDelete(action:string) {
    if(action == 'Yes'){
      this.workflowService.deleteWorkflowLevel( this.deleteIndex);
      this.editServiceData[0].workflowList.splice( this.deleteIndex,1)
      this.showAlert = true;
      this.isDeleted = true;
      this.toastr.info(this.workflowKeys.workflowDeleteLevelMsg1+''+( this.deleteIndex +1)+this.workflowKeys.workflowDeleteLevelMsg2);
    }   
  }
  deleteWorkflowLevel(index: number) {
    this.deleteIndex = index;
    this.commonservice.delete.next(true);
  }

  updateWorkflow() {
    if (this.workflowList.length) {
    
    let workflowLevels = this.workflowForm.controls.workflowList.value;
    if(workflowLevels[0].from == undefined){
      this.toastr.warning(this.workflowKeys.saveWorkflowsMsg);
    }else{
    let validation = workflowLevels.filter(object=>object.from._id == object.to._id);
    if(validation.length){
      this.toastr.info(this.workflowKeys.workflowErrMsg);
    }else{
    workflowLevels.unshift({ 'from': null, 'to': workflowLevels[0].from });
    workflowLevels.push({ 'from': workflowLevels[workflowLevels.length - 1].to, 'to': null });
    const workflowList = [];
    this.editServiceData[0].workflowList.forEach((item, index) => {
      item['from'] = workflowLevels[index].from;
      item['to'] = workflowLevels[index].to;
      workflowList.push(item);
    });
    const data = { workflowList: workflowList,accountId : this.loginDetails.accounts[0]._id };
    if( this.isDeleted == true){
      data['isWorkflowLevelDeleted'] =true;
    }else{
      data['isWorkflowLevelDeleted'] =false;

    }
    data['workflowname'] = this.workflowForm.controls.workflowname.value;

    this.workflowService.updateWorkflow(data, this.editServiceData[0]._id).subscribe(
      (res: any) => {
        if (res.status === 201) {
          this.formSubmitted = true;
          this.toastr.success(res.message);
          this.router.navigate(['mainLayout/workFlowManagement']);
        } else {
          this.toastr.error(res.message);
        }
      }
    );
    }
  }
  } else {
    this.toastr.info(this.workflowKeys.workflowAtleastMsg);
    this.formInvalid = true;
  }
  }


  revert() {
    this.workflowForm = new FormGroup({
      workflowname: new FormControl(),
      workflowList: new FormArray([])
    });

    // this.workflowForm.reset({ workflowList: new WorkflowLevelForm(new WorkflowLevel()), workflowname: '' });
    const control = this.workflowForm.controls['workflowList'] as FormArray;
    for (let i = control.length - 1; i >= 0; i--) {
      control.removeAt(i);
    }
  }
  canDeactivate() {
    if (!this.formSubmitted && this.showAlert) {
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
