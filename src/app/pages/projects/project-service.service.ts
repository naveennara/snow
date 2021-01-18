import { Injectable } from '@angular/core';
import * as Globals from '../../globals';
import { ServerService } from '../../server.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  dropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettings1 = {
    singleSelection: true,
    idField: '_id',
    textField: 'username',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  categoriesObservable;
  projectId:string;
  gridView;
  constructor(private services: ServerService, private router: Router) { }
  getCategories(url) {
    // return this.services.getServers(url, '');
    return  this.categoriesObservable = new Observable(observer => {
      let categoriesList: any[];
      this.services.getServers(url, '').subscribe(
        (res: any) => {
          if (res) {
            switch (res.status) {
              case 200:
              categoriesList = res.data;
              break;
              case 204:
              categoriesList = [];
            }
          } else {
            categoriesList = [];
          }
          observer.next(categoriesList);
        }

      );

    });
  }
  getGroupAdminList(user) {
    const url: string = Globals.urls.getGroupAdminsByDept + '/' + user;
    return  this.categoriesObservable = new Observable(observer => {
      let groupAdminsList: any[];
      this.services.getServers(url, user).subscribe(
        (res: any) => {
          if (res) {
            switch (res.status) {
              case 200:
              groupAdminsList = res.data;
              break;
              case 204:
              groupAdminsList = [];
            }
          } else {
            groupAdminsList = [];
          }
          observer.next(groupAdminsList);
        }

      );

    });

  }
  createProject(url, data) {
    return  this.services.postServers(url, data);
  }
  getProjects(url) {
    return  this.services.getServers(url, '');
  }
  editURL(data) {
    this.router.navigate(['/mainLayout/projectsTab/projects/edit', data._id]);
  }
  editProject(url) {
    return  this.services.getServers(url, '');
  }
  updateProject(url, data) {
    return  this.services.postServers(url, data);
  }
  deleteProject(url) {
    return this.services.postServers(url, []);
  }

  getProjectTasks(projectId) {
    this.router.navigate(['/mainLayout/projectsTab/projectTasks', projectId]);
  }
}
