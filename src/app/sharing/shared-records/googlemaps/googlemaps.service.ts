import { Injectable } from '@angular/core';
import { ServerService } from '../../../server.service';

@Injectable({
  providedIn: 'root'
})
export class GooglemapsService {

  constructor(private services: ServerService) { }
  getFormData(url){
    return  this.services.getServers(url, '');
  }
}
