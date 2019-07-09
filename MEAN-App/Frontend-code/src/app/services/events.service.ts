import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private eventsURL = '/api/events';
  private specialURL = '/api/special';

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any>(this.eventsURL);
  }

  getSpecialEvents() {
    return this.http.get<any>(this.specialURL);
  }
}
