import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQueComponent } from './my-que.component';

describe('MyQueComponent', () => {
  let component: MyQueComponent;
  let fixture: ComponentFixture<MyQueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyQueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
