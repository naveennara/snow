import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  editActivated = new Subject();
  showCreate = new Subject();
  editProperties = new Subject();
  editPropertiesWithTypeChange = new BehaviorSubject(false);
  recordsView = new Subject();
  deleteWidget = new Subject();
  headerSelection = new Subject();
  search = new Subject();
  openSideBar = new Subject();
  refresh = new Subject();
  openSideBarWorkflow = new Subject<any>();
  modifiedWidgetValues = new Subject();
  //sendProjectID = new BehaviorSubject({});
  formOpen =  new BehaviorSubject({});
  hideCreate = new Subject();
  updateBreadCrumb = new BehaviorSubject({});
  delete = new Subject();
  showWA = new BehaviorSubject({});
  filterList = new BehaviorSubject({});
  updateBreadCrumbOnBack = new Subject();
  callGetForms = new Subject();
  formEdit = new Subject();
  dashboard = new Subject();
 // showAttachments = new Subject();
  approvalsCount = new Subject();
  photoOnmap = new Subject();
  attachmentDone = new Subject();
  attachmnetCount = new Subject();
  sketching = new Subject();
  appVersionHistory = new Subject();
  locations = new Subject();
  geoTaggedImagesList = new Subject();
  devicesPending = new Subject();
  workFlowHistory = new Subject();
  configSettings= new Subject();

}
