import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ScreensaverComponent } from './screensaver/screensaver.component';
import { ReceivedMailsComponent } from './received-mails/received-mails.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from './/app-routing.module';
import { MailComponent } from './mail/mail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewMailComponent } from './new-mail/new-mail.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreensaverComponent,
    ReceivedMailsComponent,
    NavigationComponent,
    MailComponent,
    DashboardComponent,
    NewMailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
