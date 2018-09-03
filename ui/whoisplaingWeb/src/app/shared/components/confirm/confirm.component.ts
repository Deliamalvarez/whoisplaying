import { EventService } from './../../services/event.service';
import { Component, OnInit } from '@angular/core';
import { EventDetails } from '../../models/event-details';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  eventDetail: EventDetails;

  responseCode: string;
  eventId: string;

  constructor(private eventService: EventService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.responseCode = this.route.snapshot.paramMap.get('responseCode');

    this.eventService.getEventDetails(this.eventId).subscribe(response => {
      this.eventDetail = response as EventDetails;
    });
  }

  confirm() {
    this.sendConfirmation({ 'isPlaying': 'yes' });
  }

  cancel() {
    this.sendConfirmation({ 'isPlaying': 'no' });
  }

  sendConfirmation(body) {
    this.eventService.confirmGameParticipant(this.eventId, this.responseCode, body).subscribe(
      data => {
        return this.router.navigate(['/']);
      }
    );
  }

}
