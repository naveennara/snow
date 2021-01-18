import { Injectable } from '@angular/core';
import { ServerService } from '../../server.service';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class MapLocationsService {

  constructor(private services: ServerService,private toastr: ToastrService) { }
  public getUserLocations(url): any {
    let userObservable;
    return userObservable = new Observable(observer => {
      let userLocation: any[];
      this.services.getServers(url, '').subscribe(
        (res: any) => {
          if (res) {
            switch (res.status) {
              case 200:
                userLocation= res.data;
              break;
              case 204:
                this.toastr.info(res.message);
                userLocation =[];
            }
          } else {
            userLocation = [];
          }
          observer.next(userLocation);
        }

      );

    });
  }
  
}
