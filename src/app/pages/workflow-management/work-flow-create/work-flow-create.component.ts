import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { WorkflowManagementService } from '../workflow-management.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { WorkflowLevelForm, WorkflowLevel } from '../work-flow-level';
import { Router } from '@angular/router';
import * as Globals from '../../../globals';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-work-flow-create',
  templateUrl: './work-flow-create.component.html',
  styleUrls: ['./work-flow-create.component.css']
})
export class WorkFlowCreateComponent implements OnInit, OnDestroy {
  workflowKeys: any;
  workflowForm: FormGroup;
  workflowFormSub: Subscription;
  formInvalid: boolean = false;
  workflowList: FormArray;
  enableAddNew: boolean = true;
  usersList: any[];
  viewType: string;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  formSubmitted = false;
  autoCompleteField = Globals.autoCompleteField;
  autoCompleteForm = Globals.autoCompleteForm;

  constructor(
    private workflowService: WorkflowManagementService,
    private toastr: ToastrService,
    private router: Router
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
          this.viewType = 'create';
        } else {
          this.toastr.warning(res.message);
        }
      }
    );
  }

  ngOnInit() {
    this.getGAsAndMods();
    this.workflowFormSub = this.workflowService.workflowForm$
    .subscribe(workflow => {
      this.workflowForm = workflow;
      this.workflowList = this.workflowForm.get('workflowList') as FormArray;
    });

    this.revert();
    this.addWorkflowLevel();
  }

  ngOnDestroy() {
    this.workflowFormSub.unsubscribe();
  }

  addWorkflowLevel() {
    this.workflowService.addWorkflowLevel();
    this.enableAddNew = false;
  }
  saveWorkflowLevel(enable: boolean) {
    this.enableAddNew = enable;
  }

  deleteWorkflowLevel(index: number) {
    this.workflowService.deleteWorkflowLevel(index);
    this.enableAddNew = true;
  }

  createWorkflow() {
    if (this.workflowList.length) {
      let workflowLevels = this.workflowForm.controls.workflowList.value;
      workflowLevels =  workflowLevels.filter(obj=>obj.from != obj.to);
      let validation = workflowLevels.filter(object=>object.from._id == object.to._id);
    if(validation.length){
      this.toastr.info(this.workflowKeys.workflowErrMsg);
    }else{
      const globalInfo = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
      const data: {[k: string]: any} = {};
      workflowLevels.unshift({'from': null,'to': workflowLevels[0].from});
      workflowLevels.push({'from': workflowLevels[workflowLevels.length - 1].to, 'to': null});
      data['accountId'] = globalInfo.accounts[0]._id;
      data['workflowname'] = this.workflowForm.controls.workflowname.value;
      data['workflowList'] = workflowLevels;
      this.workflowService.createWorkflow(data).subscribe(
        (res: any) => {
          if (res.status === 201) {
            this.formSubmitted = true;
            this.toastr.success(this.workflowKeys.workflowCreatedMsg);
            this.router.navigate(['mainLayout/workFlowManagement']);
          } else {
            this.toastr.warning(res.message);
          }
        }
      );
    }
      
    } else {
      this.toastr.info(this.workflowKeys.workflowAddMsg);
      this.formInvalid = true;
    }

  }
  revert() {
    this.workflowForm.reset({ workflowList: new WorkflowLevelForm(new WorkflowLevel()), workflowname: '' });
    const control = this.workflowForm.controls['workflowList'] as FormArray;
    for ( let i = control.length - 1; i >= 0; i--) {
        control.removeAt(i);
    }
  }
  canDeactivate() {
    if (!this.formSubmitted && this.workflowForm.dirty) {
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
