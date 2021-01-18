
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowCycleComponent } from './workflow-cycle.component';
import { DynamicFormModule } from '../../forms/dynamic-form/dynamic-form.module';

@NgModule({
    declarations: [
        WorkflowCycleComponent
    ],
    imports: [
        CommonModule,
        DynamicFormModule
    ],
    exports: [
        WorkflowCycleComponent
    ]
})
// tslint:disable-next-line:class-name
export class workflowCycleModule {}
