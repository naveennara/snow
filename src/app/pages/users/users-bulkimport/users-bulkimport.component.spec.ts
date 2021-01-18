import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersBulkimportComponent } from './users-bulkimport.component';

describe('UsersBulkimportComponent', () => {
  let component: UsersBulkimportComponent;
  let fixture: ComponentFixture<UsersBulkimportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersBulkimportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersBulkimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
