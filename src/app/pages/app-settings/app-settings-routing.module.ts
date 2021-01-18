import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppsettingsComponent } from './appsettings/appsettings.component';
import { AuthGuard } from '../../auth-guard.service';
import { SettingsComponent } from './components/settings/settings.component';


const routes: Routes = [
  {path: '', component: AppsettingsComponent,
  children: [{path: '', component: SettingsComponent }
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppSettingsRoutingModule { }
