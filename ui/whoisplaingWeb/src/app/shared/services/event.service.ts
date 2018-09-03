import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';

import { EventDetails } from '../models/event-details';
import { Responses, Playing } from '../models/responses';
import { User } from '../models/user';

@Injectable()
export class EventService {

  constructor(private httpClient: HttpClient) { }

  getActiveEvents(): Observable<Event[]> {
    let e1 = new Event();
    e1.id = '1';
    e1.date = new Date();
    e1.name = 'Juego';
    let e2 = new Event();
    e2.id = '2';
    e2.date = new Date();
    e2.name = 'Fútbol';
    return Observable.of([e1, e2]);
  }

  getEventDetails(id: string): Observable<EventDetails> {
    const uri = `https://creategame.azurewebsites.net/api/gameDetail/${id}`;
    return this.httpClient.get(uri) as Observable<EventDetails>;
  }

}
