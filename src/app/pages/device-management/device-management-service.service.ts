import { Injectable } from '@angular/core';
import { ServerService } from '../../server.service';
@Injectable({
  providedIn: 'root'
})
export class DeviceManagementServiceService {
  dropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  pendingDevices = false;
  deviceInfoId:string;
  constructor(private services: ServerService) { }
   getDeviceData(url) {
  return  this.services.getServers(url, '');
  }
  getDepartments(url) {
    return  this.services.getServers(url, '');
  }
  updateDeviceStatus(url, object) {
    return this.services.postServers(url, object);
  }
  deleteDeviceStatus(url) {
    return this.services.postServers(url, []);
  }
  getAllDeviceActivities(url) {
    return this.services.getServers(url, '');
  }
//   releaseLicense(url,data){
//     return  this.services.postServers(url,data)
//   }
}
