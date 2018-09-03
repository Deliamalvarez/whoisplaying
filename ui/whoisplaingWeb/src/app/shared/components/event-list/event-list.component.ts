import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  eventList: Event[];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getActiveEvents().subscribe( result => {
      this.eventList = result;
    })
  }

}
