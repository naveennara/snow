import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardsComponent } from './dashboards.component';
import { ToggleFullscreenDirective } from './fullscreen.directive';
import { DashboardTablesComponent } from './dashboard-tables/dashboard-tables.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { DatePipe } from '@angular/common';
import { DashboaardPiechartsComponent } from './dashboaard-piecharts/dashboaard-piecharts.component'
import { ChartsModule } from 'ng2-charts';
import { SharingModuleModule } from '../sharing-module/sharing-module.module';
import { DashboardFeedComponent } from './dashboard-feed/dashboard-feed.component';

@NgModule({
  declarations: [DashboardsComponent, ToggleFullscreenDirective, DashboardTablesComponent,  DashboaardPiechartsComponent, DashboardFeedComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    ChartsModule,
    SharingModuleModule
  ],
  exports:[DashboardsComponent],
  providers: [DatePipe]
})
export class DashboardsModule { }
