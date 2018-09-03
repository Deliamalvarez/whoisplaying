import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { EventListComponent } from './shared/components/event-list/event-list.component';
import { EventComponent } from './shared/components/event/event.component';
import { EventService } from './shared/services/event.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { EventDetailsComponent } from './shared/components/event-details/event-details.component';
import { PlayingPipe } from './shared/pipes/playing.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EventListComponent,
    EventComponent,
    EventDetailsComponent,
    PlayingPipe,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule
  ],
  providers: [
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
