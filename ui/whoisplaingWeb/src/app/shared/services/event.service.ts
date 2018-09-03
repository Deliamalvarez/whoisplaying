import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { EventDetails } from '../models/event-details';
import { Responses, Playing } from '../models/responses';
import { User } from '../models/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class EventService {

  constructor(private httpClient: HttpClient) { }
  
  getActiveEvents(): Observable<any[]> {   
    
    let url:string =  'https://creategame.azurewebsites.net/api/gameList';

    return this.httpClient.get<any>(url,{
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        })
        .do(response => {          
          return response;
        })   
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
