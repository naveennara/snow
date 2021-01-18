import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortingTableComponent } from './sorting-table.component';
import { SharingModuleModule } from '../sharing-module/sharing-module.module';

@NgModule({
  declarations: [SortingTableComponent],
  imports: [
    CommonModule,
    SharingModuleModule
  ],
  exports: [
    SortingTableComponent
  ]
})
export class SortingTableModule { }
