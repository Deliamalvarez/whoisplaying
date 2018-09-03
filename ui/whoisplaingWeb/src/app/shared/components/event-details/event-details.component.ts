import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import { EventDetails } from '../../models/event-details';
import { Playing } from '../../models/responses';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  eventDetails: EventDetails;

  constructor(private route: ActivatedRoute,
              private router: Router, private eventService: EventService) { }

  ngOnInit() {
    let eventDetailSubscription = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.eventService.getEventDetails(params.get('id'));
      })
    )

    eventDetailSubscription.subscribe( response => {
      this.eventDetails = response as EventDetails;
    })
  }

  createTeams() {
    //TODO, CALL SERVICE
  }

  enableCreateButton() {
    return this.hasAccepted10() && !this.teamsCreated();
  }

  hasAccepted10(): boolean {
    return this.eventDetails.responses.filter(x => x.playing == Playing.yes).length >= 10;
  }

  teamsCreated(): boolean {
    return this.eventDetails.team1 && this.eventDetails.team1.length > 0 &&
    this.eventDetails.team2 && this.eventDetails.team2.length > 0;
  }

  enableConfirmCancelButtons(): boolean {
    return this.hasAccepted10() && this.teamsCreated();
  }

}
