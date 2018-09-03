import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NewGame } from '../../models/event';
import { forEach } from '@angular/router/src/utils/collection';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-new',
  templateUrl: './event-new.component.html',
  styleUrls: ['./event-new.component.scss']
})
export class EventNewComponent implements OnInit {

  constructor(private userService: UserService, private eventService: EventService, private router: Router) { }

  nombre:string = '';
  email:string = '';
  location: string = '';
  fecha:Date;

  users:any;

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    })
  }

  addEvent() {
    let newGame = new NewGame();
    newGame.Email = this.email;

    if(this.fecha){
      newGame.EventDateAndTime = new Date(this.fecha);
    }
    newGame.Location = this.location;
    newGame.Name = this.nombre;
    newGame.ResponseUrl = "click";
    newGame.Invitees = [];
    
    this.users.forEach(item => {
      if (item.Required){
        newGame.Invitees.push({Name: item.Name, Email: item.Email})
      }
    })
    console.log(newGame);
    this.eventService.createGame(newGame).subscribe(item =>{
      console.log(item);
      if (item) {
      this.router.navigate(['/events', item.Id]);
      } else {
        this.router.navigate(['/events']);
      }
    })
  }

}
