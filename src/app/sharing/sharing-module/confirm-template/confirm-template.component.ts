import { Component, OnInit,Input,Output,EventEmitter,ChangeDetectionStrategy } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-confirm-template',
  templateUrl: './confirm-template.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./confirm-template.component.css']
})
export class ConfirmTemplateComponent implements OnInit {

  constructor(public ngxSmartModalService: NgxSmartModalService,private commonservice:CommonService) { }
  @Input() openModal;
  @Output() deleteOrCancel : EventEmitter<any> = new EventEmitter<any>();
  ngOnInit() {
    this.commonservice.delete.subscribe((value)=>{
      if(value){
        this.ngxSmartModalService.getModal('confirmModel').open();
      }
    })
  }
  ngOnChanges(){
    if(this.openModal){
      this.ngxSmartModalService.getModal('confirmModel').open();
    }
  }
  confirmDelete(){
    this.ngxSmartModalService.getModal('confirmModel').close();
    this.deleteOrCancel.emit('Yes');
    
  }
  
}
