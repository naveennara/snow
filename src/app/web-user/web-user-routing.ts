import {Route} from '@angular/router';
import { AssignmentListComponent} from './home/assignment-list/assignment-list.component';
import { HomeComponent} from './home/home.component';
export const webuserRoutes: Route[] = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: 'assignments', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)}
        ]
    }

];
