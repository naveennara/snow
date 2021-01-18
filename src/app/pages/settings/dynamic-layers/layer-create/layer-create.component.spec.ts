import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerCreateComponent } from './layer-create.component';

describe('LayerCreateComponent', () => {
  let component: LayerCreateComponent;
  let fixture: ComponentFixture<LayerCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
