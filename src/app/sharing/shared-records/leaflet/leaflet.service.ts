import { Injectable } from '@angular/core';
import { ServerService } from '../../../server.service';

@Injectable({
  providedIn: 'root'
})
export class LeafletService {

  constructor(private services: ServerService) { }
  getFormData(url){
    return  this.services.getServers(url, '');
  }
  getLayersByTaskId(url){
    return this.services.getServers(url, '');
  }
}
