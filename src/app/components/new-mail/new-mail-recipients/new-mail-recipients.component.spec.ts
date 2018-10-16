import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMailRecipientsComponent } from './new-mail-recipients.component';

describe('NewMailRecipientsComponent', () => {
  let component: NewMailRecipientsComponent;
  let fixture: ComponentFixture<NewMailRecipientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMailRecipientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMailRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
