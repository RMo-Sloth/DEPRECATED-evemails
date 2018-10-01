import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedMailsComponent } from './received-mails.component';

describe('ReceivedMailsComponent', () => {
  let component: ReceivedMailsComponent;
  let fixture: ComponentFixture<ReceivedMailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedMailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedMailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
