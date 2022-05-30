import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShipmentComponent } from './my-shipment.component';

describe('MyShipmentComponent', () => {
  let component: MyShipmentComponent;
  let fixture: ComponentFixture<MyShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyShipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
