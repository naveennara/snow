import { FormArray, FormControl, Validators} from '@angular/forms';
import { Workflow } from './workflow.model';

export class WorkflowForm {
    workflowname = new FormControl();
    workflowList = new FormArray([]);

    constructor(workflow: Workflow) {
        if (workflow.workflowList) {
            this.workflowList.setValue(workflow.workflowList);
            this.workflowList.setValidators([Validators.required]);
        }
        this.workflowname.setValue(workflow.workflowname);
        this.workflowname.setValidators([Validators.required]);
    }
}
