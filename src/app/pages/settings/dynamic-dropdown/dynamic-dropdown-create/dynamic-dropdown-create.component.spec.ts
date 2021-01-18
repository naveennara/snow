import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDropdownCreateComponent } from './dynamic-dropdown-create.component';

describe('DynamicDropdownCreateComponent', () => {
  let component: DynamicDropdownCreateComponent;
  let fixture: ComponentFixture<DynamicDropdownCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDropdownCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDropdownCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
