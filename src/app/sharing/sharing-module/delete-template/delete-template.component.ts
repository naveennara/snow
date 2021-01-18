import { Component, OnInit,Input,Output,EventEmitter,ChangeDetectionStrategy } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CommonService } from '../../../sharing/sharing-module/common.service';

@Component({
  selector: 'app-delete-template',
  templateUrl: './delete-template.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./delete-template.component.css']
})
export class DeleteTemplateComponent implements OnInit {

  constructor(public ngxSmartModalService: NgxSmartModalService,private commonservice:CommonService) { }
  @Input() openModal;
  @Output() deleteOrCancel : EventEmitter<any> = new EventEmitter<any>();
  ngOnInit() {
    this.commonservice.delete.subscribe((value)=>{
      if(value){
        this.ngxSmartModalService.getModal('deleteModel').open();
      }
    })
  }
  ngOnChanges(){
    if(this.openModal){
      this.ngxSmartModalService.getModal('deleteModel').open();
    }
  }
  confirmDelete(){
    this.ngxSmartModalService.getModal('deleteModel').close();
    this.deleteOrCancel.emit('Yes');
    
  }
  
}
