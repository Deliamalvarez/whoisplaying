import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './shared/components/event-list/event-list.component';
import { EventDetailsComponent } from './shared/components/event-details/event-details.component';
import { EventNewComponent } from './shared/components/event-new/event-new.component';

const routes: Routes = [
  {path: 'events', component: EventListComponent},
  {path: 'events/new', component: EventNewComponent },
  {path: 'events/:id', component: EventDetailsComponent},
  {path: '', redirectTo: '/events', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
