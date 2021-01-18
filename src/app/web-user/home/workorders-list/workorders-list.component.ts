import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { webUserConstants } from '../../webuser-constant';


@Component({
  selector: 'app-workorders-list',
  templateUrl: './workorders-list.component.html',
  styleUrls: ['./workorders-list.component.css']
})
export class WorkordersListComponent implements OnInit {
  breadCumbs: any[] ;
  constructor(public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params.actionPage === webUserConstants.actionPageForAssignmnets) {
      this.breadCumbs =  [ {name: 'Assignments', state: 'webuser/assignments'},
      {name: 'workOrders', state: ''}];
    } else {
      this.breadCumbs = [ {name: 'Forms', state: 'webuser/assignments/forms'},
      {name: 'workOrders', state: ''}];
    }

  }

  goToForm() {

    // tslint:disable-next-line:max-line-length
    this.router.navigate(['webuser/assignments/workorders/record',
    this.activatedRoute.snapshot.params.formId,
    this.activatedRoute.snapshot.params.assignmentId,
    this.activatedRoute.snapshot.params.taskId,
    webUserConstants.nullString,
    webUserConstants.formFillActionType,
    this.activatedRoute.snapshot.params.actionPage,
    webUserConstants.nullString
  ]);

  }

  gotoAssignmnets() {
    this.router.navigate(['webuser/assignments']);
  }

}
