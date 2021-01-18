import { FormsListComponent } from './forms-list/forms-list.component';
import { AssignmentHistoryComponent } from './assignment-history/assignment-history.component';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';
import { Route } from '@angular/router';
import { WorkordersListComponent } from './workorders-list/workorders-list.component';
import { FormComponent } from './form/form.component';
import { WorkordersListViewComponent } from './workorders-list-view/workorders-list-view.component';
export const assignmnetRooutes: Route[] = [
    {path: '', component: AssignmentListComponent},
    {path: 'forms', component: FormsListComponent},
    {path: 'workorders/:formId/:assignmentId/:taskId/:actionPage', component: WorkordersListComponent},
    {path: 'workorders/record/:formId/:assignmentId/:taskId/:recordId/:actionType/:actionPage/:_id',
    loadChildren: () => import('./form/form.module').then(m => m.FormModule)},
    {path: 'history/:id/:actionPage', component: AssignmentHistoryComponent},
    {path: 'workorderslist/:assignmentId/:formId/:taskId/:actionPage', component: WorkordersListViewComponent}

];
