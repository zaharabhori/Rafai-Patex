import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookShipmentComponent } from './book-shipment.component';

describe('BookShipmentComponent', () => {
  let component: BookShipmentComponent;
  let fixture: ComponentFixture<BookShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookShipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
