import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboaardPiechartsComponent } from './dashboaard-piecharts.component';

describe('DashboaardPiechartsComponent', () => {
  let component: DashboaardPiechartsComponent;
  let fixture: ComponentFixture<DashboaardPiechartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboaardPiechartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboaardPiechartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
