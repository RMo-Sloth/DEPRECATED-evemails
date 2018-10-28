import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { BannerComponent } from './components/banner/banner.component';
import { ReceivedMailsComponent } from './components/mails/received-mails.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AppRoutingModule } from './app-routing.module';
import { MailComponent } from './components/mail/mail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewMailComponent } from './components/new-mail/new-mail.component';
import { UrlPipe } from './pipes/url.pipe';
import { AccountDetailsComponent } from './components/dashboard/account-details/account-details.component';
import { AccountNewComponent } from './components/dashboard/account-new/account-new.component';
import { MailPreviewComponent } from './components/mails/mail-preview/mail-preview.component';
import { MoreMailsComponent } from './components/mails/more-mails/more-mails.component';
import { MailSenderComponent } from './components/mail/mail-sender/mail-sender.component';
import { NewMailRecipientsComponent } from './components/new-mail/new-mail-recipients/new-mail-recipients.component';
import { IsInSameCorporationPipe } from './pipes/is-in-same-corporation.pipe';
import { IsSelfPipe } from './pipes/is-self.pipe';
import { IsInSameAlliancePipe } from './pipes/is-in-same-alliance.pipe';
import { CharacterSelectionComponent } from './components/character-selection/character-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
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
    MailSenderComponent,
    NewMailRecipientsComponent,
    IsInSameCorporationPipe,
    IsSelfPipe,
    IsInSameAlliancePipe,
    CharacterSelectionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
