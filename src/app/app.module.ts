import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ScreensaverComponent } from './screensaver/screensaver.component';
import { ReceivedMailsComponent } from './received-mails/received-mails.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AppRoutingModule } from './/app-routing.module';
import { MailComponent } from './components/mail/mail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewMailComponent } from './new-mail/new-mail.component';
import { UrlPipe } from './pipes/url.pipe';
import { AccountDetailsComponent } from './components/dashboard/account-details/account-details.component';
import { AccountNewComponent } from './components/dashboard/account-new/account-new.component';
import { MailPreviewComponent } from './received-mails/mail-preview/mail-preview.component';
import { MoreMailsComponent } from './received-mails/more-mails/more-mails.component';
import { MailSenderComponent } from './components/mail/mail-sender/mail-sender.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreensaverComponent,
    ReceivedMailsComponent,
    NavigationComponent,
    MailComponent,
    DashboardComponent,
    NewMailComponent,
    UrlPipe,
    AccountDetailsComponent,
    AccountNewComponent,
    MailPreviewComponent,
    MoreMailsComponent,
    MailSenderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
