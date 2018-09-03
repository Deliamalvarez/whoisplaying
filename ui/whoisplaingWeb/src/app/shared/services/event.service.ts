import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class EventService {

  constructor() { }
  
  getActiveEvents(): Observable<Event[]> {    
    let e1 = new Event();
    e1.date = new Date();
    e1.name = "Juego";
    let e2 = new Event();
    e2.date = new Date();
    e2.name = "Fútbol";
    return Observable.of([e1, e2]);
  }

}
