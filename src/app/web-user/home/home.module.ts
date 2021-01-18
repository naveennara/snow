import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';
import { assignmnetRooutes} from './home.routes';
import { WorkordersListComponent } from './workorders-list/workorders-list.component';
// import { FormComponent } from './form/form.component'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AssignmentHistoryComponent } from './assignment-history/assignment-history.component';
import { ComponentsModule } from '../components/components.module';
import { DateAgoPipe } from '../pipes/date-ago.pipe';
import { FormsListComponent } from './forms-list/forms-list.component';
import { WorkordersListViewComponent } from './workorders-list-view/workorders-list-view.component';

@NgModule({
  declarations: [AssignmentListComponent,
                WorkordersListComponent,
                AssignmentHistoryComponent,
                DateAgoPipe,
                FormsListComponent,
                WorkordersListViewComponent
              ],
  imports: [
    CommonModule,
    RouterModule.forChild(assignmnetRooutes),
    InfiniteScrollModule,
    ComponentsModule,
  ],
  exports: [InfiniteScrollModule]
})
export class HomeModule { }
