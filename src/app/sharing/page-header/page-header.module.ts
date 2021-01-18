import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header.component';
import { Routes, RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { SearchComponent } from './search/search.component';
import { SearchModule} from './search/search.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PageHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SearchModule
  ],
  exports: [PageHeaderComponent]
})
export class PageHeaderModule { }
