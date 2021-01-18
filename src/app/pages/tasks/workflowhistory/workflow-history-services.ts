import { Injectable } from '@angular/core';
import { ServerService } from '../../../server.service';

@Injectable({
  providedIn: 'root'
})
export class WorkflowHistoryService {
  constructor(private services: ServerService) { }

  getWorkflowHistory(url) {
    return  this.services.getServers(url, '');
  }

}
