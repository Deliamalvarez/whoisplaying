import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { EventListComponent } from './shared/components/event-list/event-list.component';
import { EventComponent } from './shared/components/event/event.component';
import { EventService } from './shared/services/event.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { EventDetailsComponent } from './shared/components/event-details/event-details.component';
import { PlayingPipe } from './shared/pipes/playing.pipe';
import { HamburgerComponent } from './shared/components/hamburger/hamburger.component';
import { ConfirmComponent } from './shared/components/confirm/confirm.component';
import { HttpClientModule } from '@angular/common/http';
import { EventNewComponent } from './shared/components/event-new/event-new.component';
import { UserService } from './shared/services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EventListComponent,
    EventComponent,
    EventDetailsComponent,
    PlayingPipe,
    HamburgerComponent,
    ConfirmComponent, 
    EventNewComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    EventService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
