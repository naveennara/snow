import { ComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { WebuserHeaderComponent } from './components/webuser-header/webuser-header.component';
import { WebuserSideLayoutComponent } from './components/webuser-side-layout/webuser-side-layout.component';
import { HomeModule } from './home/home.module';
import { Routes, RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-tooltip-directive';
import { webuserRoutes } from './web-user-routing';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { DateAgoPipe } from './pipes/date-ago.pipe';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeModule,
    RouterModule.forChild(webuserRoutes),
    TooltipModule,
    ComponentsModule,
    NgxSmartModalModule.forRoot()
  ]
})
export class WebUserModule { }
