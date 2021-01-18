import { Injectable } from '@angular/core';
import { ServerService } from '../../../server.service';

@Injectable({
  providedIn: 'root'
})
export class WorkflowCycleService {
  constructor(private services: ServerService) { }

  acceptandrejectTask(url, data) {
    return  this.services.postServersMultipart(url, data);
  }

}
