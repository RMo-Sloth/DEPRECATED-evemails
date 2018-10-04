import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import{ MailComponent } from './components/mail/mail.component'
import { ReceivedMailsComponent } from './components/mails/received-mails.component';
import{ DashboardComponent } from './components/dashboard/dashboard.component'
import{ NewMailComponent } from './components/new-mail/new-mail.component'

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: ':account_id/inbox', component: ReceivedMailsComponent },
  // TEMP: temporary duplicated ReceivedMailsComponent routing
  { path: ':account_id/mails', component: ReceivedMailsComponent },
  { path: ':account_id/mails/:mail_id', component: MailComponent },
  { path: ':account_id/new-mail', component: NewMailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}
