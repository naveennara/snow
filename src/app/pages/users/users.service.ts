import { Injectable } from '@angular/core';
import { ServerService } from '../../server.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  dropdownSettings= {
    singleSelection: true,
    idField: '_id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  userId:string;
  constructor(private services: ServerService, private router: Router) { }
  createUser(url, data) {
    return  this.services.postServersMultipart(url, data);
  }
  getUsers(url) {
    return  this.services.getServers(url, '');
  }
  xlsxtojsonuser(url, data) {
    return  this.services.postServersMultipart(url, data);
  }
  createUserFromFile(url,data){
    return  this.services.postServers(url, data);
  }
  editUrl(data){
    this.router.navigate(['/mainLayout/users/edit', data._id]);
  }
  editUser(url){
    return  this.services.getServers(url, '');
  }
  updateUser(url,data){
    return  this.services.postServersMultipart(url, data);
  }
  deleteUser(url){
    return this.services.postServers(url,[]);
  }
  getDepartments(url) {
    return  this.services.getServers(url, '');
  }
  getAllActivities(url){
    return this.services.getServers(url,'');
  }
  unlock(url,data){
    return  this.services.postServers(url,data)
  }
  resetPassword(url, data) {
    return this.services.postServers(url,data);
  }
  getUserTemplate(url){
    let deptsObservable: any;
    return  deptsObservable = new Observable(observer => {
      this.services.getServersExcel(url, '').subscribe(
        (res: any) => {
          if (res) {
            const excelFile = new Blob([res], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            const blobURL = window.URL.createObjectURL(excelFile);
            const anchor = document.createElement('a');
            anchor.download = 'UserCreation' + '.xlsx';
            anchor.href = blobURL;
            document.body.appendChild(anchor);
            anchor.click();
            setTimeout(function(){
              // For Firefox it is necessary to delay revoking the ObjectURL
              document.body.removeChild(anchor);
              window.URL.revokeObjectURL(blobURL);
            }, 100);
          } else {
          }
          observer.next('1');
        }

      );
    });
  }
}
