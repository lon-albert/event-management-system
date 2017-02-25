import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  addEvent(event): Observable<any> {
    return this.http.post('/api/event', JSON.stringify(event), this.options);
  }

  editEvent(event): Observable<any> {
    return this.http.put(`/api/event/${event._id}`, JSON.stringify(event), this.options);
  }

  deleteEvent(event): Observable<any> {
    return this.http.delete(`/api/event/${event._id}`, this.options);
  }

  register(user: any): Observable<any> {
    return this.http.post('/api/register', JSON.stringify(user), this.options);
  }

  login(user): Observable<any> {
    return this.http.post('/api/login', JSON.stringify(user), this.options);
  }

  getEvents(): Observable<any> {
    return this.http.get('/api/events').map(res => res.json());
  }

  getFrontEvents(): Observable<any> {
    return this.http.get('/api/front/events').map(res => res.json());
  }

  getUserEvents(user): Observable<any> {
    return this.http.get(`/api/user/${user._id}/events/`).map(res => res.json());
  }

  getEvent(event_id: any) {
    return this.http.get(`/api/event/${event_id}`).map(res => res.json());
  }

  addComment(comment: any) {
    return this.http.post('/api/comment', JSON.stringify(comment), this.options);
  }

  getComments(event_id: any) {
    return this.http.get(`/api/comments/${event_id}`).map(res => res.json());
  }

  deleteComment(comment: any) {
    return this.http.delete(`/api/event/${comment._id}`, this.options);
  }
}
