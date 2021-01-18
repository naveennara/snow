import { FormControl, Validators, FormGroup } from '@angular/forms';
import { WorkflowLevel } from './workflowLevel.model';

export class WorkflowLevelForm {
  from = new FormControl();
  to = new FormControl();

  constructor(
    workflowLevel: WorkflowLevel
  ) {
    this.from.setValue(workflowLevel.from);
    this.from.setValidators([Validators.required]);
    this.to.setValue(workflowLevel.to);
    this.to.setValidators([Validators.required]);
  }
}

export function NotEqual(from: string, to: string) {
  return (group: FormGroup): {[key: string]: any} => {
    if (group.controls.from) {
      const from = group.controls['from'];
      const to = group.controls['to'];
      if(from.value &&  to.value){
        if (from.value._id === to.value._id) {
          let errors = group.controls['to'].errors;
          if (!errors) {
            errors = {};
          }
          errors['areEqual'] = true;
          group.controls['to'].setErrors(errors);
          return group;
        }
      }
      
    }
  };
}
