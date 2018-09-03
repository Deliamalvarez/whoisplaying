import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { EventDetails } from '../models/event-details';
import { Responses, Playing } from '../models/responses';
import { User } from '../models/user';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class EventService {

  constructor(private httpClient: HttpClient) { }

  getActiveEvents(): Observable<any[]> {

    let url:string =  'https://creategame.azurewebsites.net/api/gameList';

    return this.httpClient.get<any>(url,{ headers: new HttpHeaders().set('Content-Type', 'application/json') })
        .do(response => {          
          return response;
        })
  }

  getEventDetails(id: string): Observable<EventDetails> {
    console.log("Get Event details")
    const uri = `https://creategame.azurewebsites.net/api/gameDetail/${id}`;
        return this.httpClient.get<any>(uri,{ headers: new HttpHeaders().set('Content-Type', 'application/json') })
    .do(response => {     
      console.log("Response", response);     
      return response;
    })
  }

}
