import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
//import {SelectionState} from "../core/model/selection-state";
@Injectable({
  providedIn: 'root'
})
export class RenderEventsService {

  constructor() { }
    // Observable string sources
    private insightsOpen = new Subject<boolean>();
 
    // Observable string streams
    insightsOpen$ = this.insightsOpen.asObservable();
    insightsResized$ = new BehaviorSubject<{ height: number, width: number }>(undefined);
 
    //currentSelection$ = new BehaviorSubject<SelectionState>({count: 0, nodes: [], linqsets: [], edges: []});
 
    // Service message commands
    insightOpen(open: boolean) {
        this.insightsOpen.next(open);
    }
 
    insightsResized({height, width}: { height: number, width: number }) {
        this.insightsResized$.next({height, width});
    }
 
    // onSelectedOnCanvas(selectionState: SelectionState) {
    //     this.currentSelection$.next(selectionState);
    // }
 
    // onSelectNone(){
    //     this.currentSelection$.next({count: 0, nodes: [], linqsets: [], edges: []});
    // }
}
