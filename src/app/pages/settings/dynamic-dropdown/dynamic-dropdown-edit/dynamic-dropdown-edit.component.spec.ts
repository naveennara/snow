import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDropdownEditComponent } from './dynamic-dropdown-edit.component';

describe('DynamicDropdownEditComponent', () => {
  let component: DynamicDropdownEditComponent;
  let fixture: ComponentFixture<DynamicDropdownEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDropdownEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDropdownEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
