import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { EventDetails } from '../models/event-details';
import { Responses, Playing } from '../models/responses';
import { User } from '../models/user';

@Injectable()
export class EventService {

  constructor() { }
  
  getActiveEvents(): Observable<Event[]> {    
    let e1 = new Event();
    e1.id = '1';
    e1.date = new Date();
    e1.name = "Juego";
    let e2 = new Event();
    e2.id = '2';
    e2.date = new Date();
    e2.name = "Fútbol";
    return Observable.of([e1, e2]);
  }

  getEventDetails(id: string): Observable<EventDetails> {
    let response = new Responses();
    response.name = 'Nombre';
    response.playing = Playing.yes;
    let e = new EventDetails();
    e.eventDateAndTime = new Date();
    e.location = "El galón";
    e.responses = [response, response, response,response,response,response,response,response,response,response];
    // e.responses = [response, response, response];
    let u1 = new User();
    u1.name = 'Delia';
    u1.email = 'adfa@sss.com';
    e.team1 = [u1];
    let u2 = new User();
    u2.name = 'Martín';
    e.team2 = [u2];
    return Observable.of(e);
  }

}
