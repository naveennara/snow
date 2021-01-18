import { Component, OnInit, Input , EventEmitter, Output , OnChanges} from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { WorkflowHistoryService } from './workflow-history-services';
import * as Globals from '../../../globals';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-workflowhistory',
  templateUrl: './workflowhistory.component.html',
  styleUrls: ['./workflowhistory.component.css']
})
export class WorkflowhistoryComponent implements OnInit {
  @Input() recordId;
  @Output() closeModel: EventEmitter<any> = new EventEmitter<any>();
  historyData;
  myChunk;
  workflowHistory;
  workflowDirectionalIcons = Globals.svgIcons;
  viewHistoryIndex: any = null;
  selectedWorkFlow: any;
  Imgsrc = Globals.noDataFound;


  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private services: WorkflowHistoryService,
    private toastr: ToastrService,

  ) { }

  // tslint:disable-next-line:max-line-length
  ngOnInit() {
    this.getWorkflowHistory();
  }
  getWorkflowHistory(){
    const url = Globals.urls.getWorkflowHistoryForTask + '/' + this.recordId.id + "/" + this.recordId.level;
    this.services.getWorkflowHistory(url).subscribe((res: any) => {
      if (res.status === 200) {
       this.workflowHistory = res.data;
        //this.commonservice.workFlowHistory.next({data:res.data});
      } else {
        this.workflowHistory = [];
        //this.commonservice.workFlowHistory.next({data:[]});
      }
    });
  }
  ngOnChanges() {
    this.viewHistoryIndex = null;
    this.selectedWorkFlow = null;
    this.getWorkflowHistory();
  }
  getStatusType(status: any) {
    switch (status) {
      case 'accepted':
        return '3px solid #008000';
      case 'rejected':
        return '3px solid #FF0000';
        case 'started':
          return '3px solid #ffad46';
          case 'Data submitted':
          return '3px solid #ffad46';
          case 'completed':
          return '3px solid #A2A2A2';
    }
  }
  getStatusText(status: any) {
    switch (status) {
      case 'accepted':
        return {'color':'#008000'};
      case 'rejected':
        return {'color':'#FF0000'};
      case 'started':
        return {'color':'#ffad46'};
      case 'Data submitted':
          return {'color':'#ffad46'};
      case 'completed':
          return {'color':'#A2A2A2'};
    }
  }
  viewDetails(workflow,index){
    this.viewHistoryIndex = index;
    this.selectedWorkFlow = workflow;
  }
  closeDetails(){
    this.viewHistoryIndex = null;
    this.selectedWorkFlow = null;
  }
  getIndex(index: any) {
    switch (index) {
      case 0:
        return 'left';
      case 1:
        return 'left';
      case 2:
        return 'left';
    }
  }

  getMargin(index: any) {
    switch (index) {
      case 0:
        return '360px';
    }
  }

  confirmCloseModel1() {
    this.ngxSmartModalService.getModal('historyModel').close();
    this.closeModel.emit('Yes');
  }
  // workflowHistory() {
  //   const url = Globals.urls.getWorkflowHistory + '/' + this.taskId;
  //   this.services.getWorkflowHistory(url).subscribe(
  //     (res: any) => {
  //       switch (res.status) {
  //         case 200:
  //         this.historyData = this.chunkArray(res.data, 4);
  //         this.ngxSmartModalService.setModalData(this.historyData, 'historyModel');

  //         this.ngxSmartModalService.getModal('historyModel').open();

  //         break;
  //         case 204:
  //         this.toastr.info(res.message);
  //         break;
  //         default:
  //         this.toastr.error(res.message);
  //       }
  //       });

  // }
 chunkArray(myArray, chunk_size) {
    var index = 0;
    
    var indexArray = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    for (index = 0; index < arrayLength; index += chunk_size) {
      // indexArray++;
      // if (indexArray % 2 === 1) {
         this.myChunk = myArray.slice(index, index + chunk_size);

      // } else {
      //   this.myChunk = myArray.slice(index, index + chunk_size).reverse();
      // }
        // Do something if you want with the group
      tempArray.push(this.myChunk);
    }

    return tempArray;
}
}
