import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot ,CanDeactivate} from '@angular/router';
import { Observable } from 'rxjs';
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
@Injectable({
  providedIn: 'root'
})

export class DeactivateGuardService implements CanDeactivate<CanComponentDeactivate>{
  component: Object;
  route: ActivatedRouteSnapshot;
  constructor() { }
  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
