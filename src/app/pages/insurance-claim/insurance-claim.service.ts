import { Injectable } from '@angular/core';
import { ServerService } from '../../server.service';

@Injectable({
  providedIn: 'root'
})
export class InsuranceClaimService {

  constructor(private services: ServerService,) { }
  getClaimDetails(url) {
    return  this.services.getServers(url, '');
  }
}
