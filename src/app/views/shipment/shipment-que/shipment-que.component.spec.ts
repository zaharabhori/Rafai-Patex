import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentQueComponent } from './shipment-que.component';

describe('ShipmentQueComponent', () => {
  let component: ShipmentQueComponent;
  let fixture: ComponentFixture<ShipmentQueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentQueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentQueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
