import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WorkflowConstants } from '../workflow-management-constant';
import * as Globals from '../../../globals';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-work-flow-level',
  templateUrl: './work-flow-level.component.html',
  styleUrls: ['./work-flow-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkFlowLevelComponent implements OnInit {

  @Input() workflowLevelForm: FormGroup;
  @Input() index: number;
  @Input() usersList: any[];
  @Input() viewType: string;
  @Input() isWorkflowEditAllowed:boolean;
  @Output() deleteWorkflowLevel: EventEmitter<number> = new EventEmitter();
  @Output() saveWorkflowLevel: EventEmitter<any> = new EventEmitter();
  workflowKeys: any;
  showButtons = true;
  constructor() {
    this.workflowKeys = WorkflowConstants.workflowKeys;
  }
  countries: any[];
  freezeWorkflow: boolean = false;
  ngOnInit() {
    if (this.viewType === 'edit') {
      this.freezeWorkflow = true;
      if(JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8)).privilege[Globals.Privileges['workflow']] == 0){
        this.showButtons = false; 
      }
    }
  }
  delete() {
    this.deleteWorkflowLevel.emit(this.index);
  }

  edit() {
    this.workflowLevelForm.controls['to'].enable();
    this.freezeWorkflow = false;
  }

  save() {
    this.freezeWorkflow = true;
    this.workflowLevelForm.disable();
    if (this.viewType === 'edit') {
      this.saveWorkflowLevel.emit(this.index);
    } else {
      this.saveWorkflowLevel.emit(true);
    }
  }
  compare(val1, val2) {
    if (val1&& val2) {
      return val1._id === val2._id;
    }
  }
}
