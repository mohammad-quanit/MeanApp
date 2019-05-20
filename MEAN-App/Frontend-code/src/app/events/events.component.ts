import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events = [];
  constructor(private eventService: EventsService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(
      res => this.events = res,
      err => console.log(err.error)
    );
  }

}
