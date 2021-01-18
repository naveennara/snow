import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAdminsUsersComponent } from './remove-admins-users.component';

describe('RemoveAdminsUsersComponent', () => {
  let component: RemoveAdminsUsersComponent;
  let fixture: ComponentFixture<RemoveAdminsUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveAdminsUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveAdminsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
