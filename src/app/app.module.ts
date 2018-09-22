import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ScreensaverComponent } from './screensaver/screensaver.component';
import { ReceivedMailsComponent } from './received-mails/received-mails.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from './/app-routing.module';
import { MailComponent } from './mail/mail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewMailComponent } from './new-mail/new-mail.component';
import { UrlPipe } from './pipes/url.pipe';
import { AccountDetailsComponent } from './dashboard/account-details/account-details.component';
import { AccountNewComponent } from './dashboard/account-new/account-new.component';
import { MailPreviewComponent } from './received-mails/mail-preview/mail-preview.component';
import { MoreMailsComponent } from './received-mails/more-mails/more-mails.component';
import { CharacterPipe } from './pipes/character.pipe';

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
    CharacterPipe
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
