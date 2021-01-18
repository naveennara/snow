import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth-guard.service';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { AppComponent } from './app.component';
import { LoginAuthService } from './login-auth.service';
const appRoutes: Routes = [
  { path: '', component: AppComponent,canActivate:[LoginAuthService] },
  { path: 'login', component: LoginComponent },
  { path: 'changepassword', component: ChangepasswordComponent },
 
  {
    path: 'mainLayout', component: MainLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
     
      {
        path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
      },
      {
        path: 'categories', loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule),
      },
      {
        path: 'projectsTab', loadChildren: () => import('./pages/projects/projects.module').then(m => m.ProjectsModule),
      },
      {
        path: 'accounts', loadChildren: () => import('./pages/departments/departments.module').then(m => m.DepartmentsModule),
      },
      {
        path: 'administrators', loadChildren: () => import('./pages/administrators/administrators.module').then(m => m.AdministratorsModule),
      },
      {
        path: 'forms', loadChildren: () => import('./pages/forms/forms.module').then(m => m.FormszModule)
      },
      {
        path: 'templates', loadChildren: () => import('./pages/templates/templates.module').then(m => m.TemplatesModule)
      },
      { path: 'deviceManagement', loadChildren: () => import('./pages/device-management/device-management.module').then(m => m.DeviceManagementModule) },

      { path: 'workFlowManagement', loadChildren: () => import('./pages/workflow-management/workflow-management.module').then(m => m.WorkflowManagementModule) },

      {
        path: 'tasks', loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksModule)
      },
      {
        path: 'downloads', loadChildren: () => import('./pages/asyn-downloads/asyn-downloads.module').then(m => m.AsynDownloadsModule)
      },
      {
        path: 'approvals', loadChildren: () => import('./pages/approvals/approvals.module').then(m => m.ApprovalsModule)
      },
      {
        path: 'settings', loadChildren : () => import('./pages/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path:'licenses',loadChildren:() => import('./pages/license-management/license-management.module').then(m => m.LicenseManagementModule)
      },
      {
        path: 'mapLocations', loadChildren: () => import('./pages/map-locations/map-locations.module').then(m => m.MapLocationsModule)
      },
      {
        path: 'appSettings', loadChildren : () => import('./pages/app-settings/app-settings.module').then(m => m.AppSettingsModule)
      },
      { path: 'dataloader', loadChildren: () => import('./pages/dataloader/dataloader.module').then(m => m.DataLoaderModule) }
    ]
  },
  // ,
  // {
  //   path: 'webuser', loadChildren: './web-user/web-user.module#WebUserModule'
  // }
  {
    path: 'webuser', loadChildren: () => import('./web-user/web-user.module').then(m => m.WebUserModule)
  },
  {
    path : 'formLink/:id',  loadChildren: () => import('./web-user/form-link/form-link.module').then(m => m.FormLinkModule)
  }, {
    path: 'insuranceclaim', loadChildren: () => import('./pages/insurance-claim/insurance-claim.module').then(m => m.InsuranceClaimModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true ,scrollPositionRestoration: 'enabled'} )
  ],

  exports: [RouterModule]
})
export class AppRoutingModule {

}
