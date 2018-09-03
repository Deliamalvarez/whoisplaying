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

  constructor(private eventService: EventService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    /*const eventDetailSubscription = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log(params.get('id'));
        return this.eventService.getEventDetails(params.get('id'));
      })
    );*/

    this.eventService.getEventDetails(id).subscribe(response => {
      this.eventDetail = response as EventDetails;
    });
  }

}
