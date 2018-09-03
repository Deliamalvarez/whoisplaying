import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss']
})
export class HamburgerComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
  }
  newEvent() {
    this.router.navigate(['/events/new']);
  }

}
