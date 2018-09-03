import { Injectable } from '@angular/core';
import { Event, NewGame } from '../models/event';
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

  createGame(game:NewGame): Observable<any> {
    const body: string = JSON.stringify(game);
    const uri = "https://creategame.azurewebsites.net/api/createGame";
    return this.httpClient.post<any>(uri, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .do(response => console.log(JSON.stringify(response)))
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err.message);
    return Observable.throw(err);
}
}
