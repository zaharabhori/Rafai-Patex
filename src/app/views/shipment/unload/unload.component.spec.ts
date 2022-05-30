import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloadComponent } from './unload.component';

describe('UnloadComponent', () => {
  let component: UnloadComponent;
  let fixture: ComponentFixture<UnloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
