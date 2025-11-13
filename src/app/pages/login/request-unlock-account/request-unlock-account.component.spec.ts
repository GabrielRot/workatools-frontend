import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestUnlockAccountComponent } from './request-unlock-account.component';

describe('RequestUnlockAccountComponent', () => {
  let component: RequestUnlockAccountComponent;
  let fixture: ComponentFixture<RequestUnlockAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestUnlockAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestUnlockAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
