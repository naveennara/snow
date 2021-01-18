import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerCompComponent } from './layer-comp.component';

describe('LayerCompComponent', () => {
  let component: LayerCompComponent;
  let fixture: ComponentFixture<LayerCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
