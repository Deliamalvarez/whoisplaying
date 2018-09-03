import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Event } from '../models/event';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

import { Responses, Playing } from '../models/responses';
import { User } from '../models/user';

@Injectable()
export class UserService {
    constructor(private httpClient: HttpClient) { }

    getUsers(): Observable<any> {
    const getUserUrl =  "https://creategame.azurewebsites.net/api/userList";
    
            return this.httpClient.get<any>(getUserUrl, {
                headers: new HttpHeaders().set('Content-Type', 'application/json')})
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError);
            }

            private handleError(err: HttpErrorResponse) {
                console.log(err);
                  console.error(err.message);
                  return Observable.throw(err);
              }
    

}