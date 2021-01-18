import { Injectable } from '@angular/core';
import * as Globals from '../../globals';
import { Router } from '@angular/router';
import { ServerService } from '../../server.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { WorkflowForm, Workflow } from './_models';
import { NotEqual } from './work-flow-level';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class WorkflowManagementService {
    private workflowForm: BehaviorSubject<
    FormGroup | undefined
  > = new BehaviorSubject(this.fb.group(new WorkflowForm(new Workflow(''))));
  workflowForm$: Observable<FormGroup> = this.workflowForm.asObservable();
    globalInfo: any = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
    workflowServiceData: any;
    workflowId: string;
    constructor(private fb: FormBuilder, private services: ServerService, private router: Router) { }

    getWorkflows(url) {
         return this.services.getServers(url, '');
    }

    getWorkflowNames(dept) {
      const url: string = Globals.urls.deptWiseWorkFlowNames + '/' + dept;
      return this.services.getServers(url, dept);
    }

    addWorkflowLevel() {
        const currentWorkflow = this.workflowForm.getValue();
        const currentWorkflowLevels = currentWorkflow.get('workflowList') as FormArray;
        if (currentWorkflowLevels.value.length > 0) {
            const currentTo = currentWorkflowLevels.value[currentWorkflowLevels.value.length - 1].to;
            currentWorkflowLevels.push(
                this.fb.group({
                    'from': [{value: currentTo, disabled: true}, Validators.required],
                    'to': ['', Validators.required]
                }, {validator: NotEqual('from', 'to')})
            );
        } else {
            currentWorkflowLevels.push(
                this.fb.group({
                    'from': ['', Validators.required],
                    'to': ['', Validators.required]
                }, {validator: NotEqual('from', 'to')})
            );
        }
        this.workflowForm.next(currentWorkflow);
    }

    prepopEditData(obj) {
        const currentWorkflow = this.workflowForm.getValue();
        const currentWorkflowLevels = currentWorkflow.get('workflowList') as FormArray;
        currentWorkflowLevels.push(
            this.fb.group({
                'from': [obj.from, Validators.required],
                'to': [obj.to, Validators.required]
            }, {validator: NotEqual('from', 'to')})
        );
        this.workflowForm.next(currentWorkflow);
    }

    deleteWorkflowLevel(i: number) {
        const currentWorkflow = this.workflowForm.getValue();
        const currentWorkflowLevels = currentWorkflow.get('workflowList') as FormArray;
        function replaceAt(array, index, value) {
            const ret = array.slice(0);
            ret[index] = value;
            return ret;
        }
        if ((i !== 0) && (i !== (currentWorkflowLevels.value.length - 1))) {
            const newArray = replaceAt(
                currentWorkflowLevels.value,
                i + 1,
                {from: currentWorkflowLevels.value[i - 1].to, to: currentWorkflowLevels.value[i + 1].to}
            );
            currentWorkflowLevels.setValue(newArray);
        }
        //     currentWorkflowLevels.splice(i, 1);
        // } else {

        currentWorkflowLevels.removeAt(i);
        this.workflowForm.next(currentWorkflow);
    }

    getGAsAndMods(url, dept) {
        return this.services.getServers(url, dept);
    }


    createWorkflow(data) {
        const url: string = Globals.urls.createWorkFlow;
        return this.services.postServers(url, data);
    }

    updateWorkflow(data, id) {
        const url: string = Globals.urls.updateWorkFlow + '/' + id;
        return this.services.postServers(url, data);
    }
    gotoWorkflow(data) {
        this.workflowServiceData = data;
        this.router.navigate(['/mainLayout/workFlowManagement/edit', data._id]);
    }
    editWorkflow(id) {
        const url: string = Globals.urls.getWorkFlowData + '/' + id;
        return this.services.getServers(url, id);
    }
    checkWorkflow(url) {
        return this.services.getServers(url, '');
    }

    deleteWorkflow(id) {
        const url: string = Globals.urls.deleteWorkflowData + '/' + id;
        return this.services.postServers(url, []);
    }

}
