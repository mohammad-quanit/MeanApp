import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents = [];
  constructor(private eventService: EventsService) { }

  ngOnInit() {
    this.eventService.getSpecialEvents().subscribe(
      res => this.specialEvents = res,
      err => console.log(err.error)
    );
  }

}
