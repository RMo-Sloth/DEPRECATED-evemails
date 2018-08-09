import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import{ MailComponent } from './mail/mail.component'
import { ReceivedMailsComponent } from './received-mails/received-mails.component';
import{ DashboardComponent } from './dashboard/dashboard.component'

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: ':account_id/inbox', component: ReceivedMailsComponent },
  { path: ':account_id/mail/:mail_id', component: MailComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}
