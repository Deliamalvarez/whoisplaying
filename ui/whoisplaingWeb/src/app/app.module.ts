import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { EventListComponent } from './shared/components/event-list/event-list.component';
import { EventComponent } from './shared/components/event/event.component';
import { EventService } from './shared/services/event.service';
import { HamburgerComponent } from './shared/components/hamburger/hamburger.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EventListComponent,
    EventComponent,
    HamburgerComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
