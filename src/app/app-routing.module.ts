import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReceivedMailsComponent } from './received-mails/received-mails.component';
const routes: Routes = [
  { path: '', redirectTo: '/inbox', pathMatch: 'full' },
  { path: 'inbox', component: ReceivedMailsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}
