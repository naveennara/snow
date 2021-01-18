import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'}

)
export class DataService {

  private messageSource = new BehaviorSubject(JSON);
  private fileSource = new BehaviorSubject(JSON);
  private mappingDataToMigrate = new BehaviorSubject(JSON);
  private helpInput = new BehaviorSubject(JSON);
  private disableMapping = new BehaviorSubject<boolean>(true);
  private subject = new Subject<any>();


  currentMessage = this.messageSource.asObservable();
  currentFiles = this.fileSource.asObservable();
  currentMappingData = this.mappingDataToMigrate.asObservable();
  currentHelpInput = this.helpInput.asObservable();
  currentMappingBtnstate = this.disableMapping.asObservable();
  
  
  constructor() { }

  sendClickEvent() {
    this.subject.next();
    console.log('in data');
  }

  getClickEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }

  changeMessage(message: JSON) {
    this.messageSource.next(message)
  }

  changeFilesSource(files: JSON) {
    this.fileSource.next(files)
  }

  changeMappingData(mappingdata : JSON) {
    this.mappingDataToMigrate.next(mappingdata)
  }

  changeHelpInput(help:JSON){
    this.helpInput.next(help)
  }

  
  changeMappingBtnState(disable){
    this.disableMapping.next(disable);
  }

}