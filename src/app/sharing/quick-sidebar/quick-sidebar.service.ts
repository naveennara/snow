import { Injectable } from '@angular/core';
import { ServerService } from '../../server.service';

@Injectable({
  providedIn: 'root'
})
export class QuickSidebarService {

  constructor(private services: ServerService) { }
  getTaskAcceptAndRejectForm(url) {
    return this.services.getServers(url, '');
  }
}
