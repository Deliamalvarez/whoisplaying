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

  eventDetails: any;
  idEvent: string;

  constructor(private route: ActivatedRoute,
              private router: Router, private eventService: EventService) { }

  ngOnInit() {
    let eventDetailSubscription = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.idEvent = params.get('id');
        return this.eventService.getEventDetails(params.get('id'));
      })
    )

    eventDetailSubscription.subscribe( response => {
      this.eventDetails = response;
    })
  }

  createTeams() {
    this.eventService.createMatch(this.idEvent).subscribe(x => {
      this.router.navigate(['/events', this.idEvent]);
    });
  }
 

  teamsCreated(): boolean {    
    if(this.eventDetails && this.eventDetails.Teams) {
      return this.eventDetails.Teams.team1 && this.eventDetails.Teams.team1.length > 0 &&
      this.eventDetails.Teams.team2 && this.eventDetails.Teams.team2.length > 0;
    } else {
      return false;
    }        
  } 

  cancel() { }

}
