import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithErrorMessagesComponent } from './with-error-messages.component';

describe('WithErrorMessagesComponent', () => {
  let component: WithErrorMessagesComponent;
  let fixture: ComponentFixture<WithErrorMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithErrorMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithErrorMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
