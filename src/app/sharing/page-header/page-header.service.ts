import { Injectable } from '@angular/core';
import { ServerService } from '../../server.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PageHeaderService {
  breadCrumbRemove = false;
  constructor(private services: ServerService, private router: Router) { }
  search(url) {
    return  this.services.getServers(url, '');
  }
}
