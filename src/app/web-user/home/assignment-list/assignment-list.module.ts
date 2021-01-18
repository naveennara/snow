import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    ComponentsModule
  ],
  exports: [InfiniteScrollModule]
})
export class AssignmentListModule { }
