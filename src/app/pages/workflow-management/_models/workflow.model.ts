import { WorkflowLevel } from '../work-flow-level/_models/workflowLevel.model';

export class Workflow {
    workflowname: string;
    workflowList: WorkflowLevel[];

    constructor(workflowname: string, workflowList?: WorkflowLevel[]) {
        this.workflowname = workflowname;
        this.workflowList = workflowList;
    }
}
