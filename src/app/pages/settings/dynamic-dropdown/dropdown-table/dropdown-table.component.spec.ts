import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownTableComponent } from './dropdown-table.component';

describe('DropdownTableComponent', () => {
  let component: DropdownTableComponent;
  let fixture: ComponentFixture<DropdownTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
