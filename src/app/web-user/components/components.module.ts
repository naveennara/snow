import { WebuserSideLayoutComponent } from './webuser-side-layout/webuser-side-layout.component';
import { WebuserHeaderComponent } from './webuser-header/webuser-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitSuccessComponent } from './submit-success/submit-success.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { LargeTextElipsePipe } from './webuser-header/large-text-elipse.pipe';
import { BreadcumbLayoutComponent } from './breadcumb-layout/breadcumb-layout.component';
import { InfoModelComponent } from './info-model/info-model.component';
import { SideBarMenuComponent } from './side-bar-menu/side-bar-menu.component';
import { NoDataFoundComponent } from './no-data-found/no-data-found.component';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { ApiCallResComponent } from './api-call-res/api-call-res.component';
import { WebUserHeaderRightMenuComponent } from './web-user-header-right-menu/web-user-header-right-menu.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpecialCharacterDirective } from './directives/special-character.directive';
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  declarations: [
    WebuserHeaderComponent,
    WebuserSideLayoutComponent,
    LargeTextElipsePipe,
    BreadcumbLayoutComponent,
    InfoModelComponent,
    SideBarMenuComponent,
    NoDataFoundComponent,
    PageLoaderComponent,
    ApiCallResComponent,
    WebUserHeaderRightMenuComponent,
    SearchComponent,
    SpecialCharacterDirective
    ],
  imports: [
    CommonModule,
    NgxSmartModalModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule
  ],
  exports: [
            WebuserHeaderComponent,
            WebuserSideLayoutComponent,
            BreadcumbLayoutComponent,
            InfoModelComponent,
            SideBarMenuComponent,
            NoDataFoundComponent,
            PageLoaderComponent,
            ApiCallResComponent,
            WebUserHeaderRightMenuComponent,
            SearchComponent,
            SpecialCharacterDirective
          ]
})
export class ComponentsModule { }
